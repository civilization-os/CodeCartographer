import { z } from "zod";
import type { MethodSemantic, MethodUnit, ModuleUnit } from "../core/types.js";
import type { ModelConfig } from "./modelConfig.js";
import { createChatModel, type ChatModel } from "./modelFactory.js";
import { MethodSemanticCache } from "./methodSemanticCache.js";

const methodSemanticSchema = z.object({
  summary: z.string().min(1),
  responsibilities: z.array(z.string()).default([]),
  sideEffects: z.array(z.string()).default([]),
  dataAndResources: z.array(z.string()).default([]),
  confidence: z.enum(["low", "medium", "high"]).default("medium")
});

type LlmMethodSemantic = z.infer<typeof methodSemanticSchema>;

export async function enrichModulesWithMethodSemantics(
  modules: ModuleUnit[],
  config: ModelConfig,
  options: { rootPath?: string } = {}
): Promise<ModuleUnit[]> {
  const model = createChatModel(config);
  if (!model) {
    return modules;
  }

  const methods = modules.flatMap((module) => module.methods);
  const cache =
    config.cacheEnabled && options.rootPath
      ? await MethodSemanticCache.open(options.rootPath)
      : undefined;

  const uncachedMethods: MethodUnit[] = [];
  for (const method of methods) {
    const cached = cache?.get(method, config);
    if (cached) {
      method.semantic = cached;
      method.summary = cached.summary;
    } else {
      uncachedMethods.push(method);
    }
  }

  const methodsToAnalyze =
    config.limit === undefined ? uncachedMethods : uncachedMethods.slice(0, config.limit);

  await mapWithConcurrency(methodsToAnalyze, config.concurrency, async (method) => {
    try {
      const semantic = await analyzeMethodWithLlm(method, model);
      method.semantic = {
        ...semantic,
        analyzer: "llm"
      };
      method.summary = semantic.summary;
      cache?.set(method, config, method.semantic);
    } catch (error) {
      const fallback = heuristicSemantic(method);
      method.semantic = {
        ...fallback,
        summary: `${fallback.summary} LLM analysis failed: ${formatError(error)}`
      };
    }
  });

  if (cache && methodsToAnalyze.length > 0) {
    await cache.save();
  }

  for (const module of modules) {
    module.summary = summarizeModuleFromMethods(module);
    for (const classUnit of module.classes) {
      classUnit.summary = `${classUnit.name} 暴露 ${classUnit.methods.length} 个方法。 ${classUnit.methods.map((method) => method.summary).join(" ")}`.trim();
    }
  }

  return modules;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function attachHeuristicSemantics(modules: ModuleUnit[]): ModuleUnit[] {
  for (const method of modules.flatMap((module) => module.methods)) {
    method.semantic = heuristicSemantic(method);
  }
  return modules;
}

async function analyzeMethodWithLlm(
  method: MethodUnit,
  model: ChatModel
): Promise<MethodSemantic> {
  const response = await model.invoke(buildPrompt(method));
  const parsed = parseModelResponse(response);
  return {
    ...parsed,
    analyzer: "llm"
  };
}

function parseModelResponse(response: unknown): Omit<MethodSemantic, "analyzer"> {
  const content = extractContent(response);
  const json = extractJsonObject(content);
  const parsed = methodSemanticSchema.parse(JSON.parse(json));
  return normalizeSemantic(parsed);
}

function extractContent(response: unknown): string {
  if (typeof response === "string") {
    return response;
  }

  if (typeof response === "object" && response !== null && "content" in response) {
    const content = (response as { content: unknown }).content;
    if (typeof content === "string") {
      return content;
    }
    if (Array.isArray(content)) {
      return content
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (typeof item === "object" && item !== null && "text" in item) {
            const text = (item as { text: unknown }).text;
            return typeof text === "string" ? text : "";
          }
          return "";
        })
        .join("\n");
    }
  }

  return String(response);
}

function extractJsonObject(content: string): string {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return content.slice(start, end + 1);
  }

  throw new Error(`LLM response did not contain a JSON object: ${content.slice(0, 200)}`);
}

function normalizeSemantic(value: LlmMethodSemantic): Omit<MethodSemantic, "analyzer"> {
  return {
    summary: value.summary.trim(),
    responsibilities: value.responsibilities.map((item) => item.trim()).filter(Boolean),
    sideEffects: value.sideEffects.map((item) => item.trim()).filter(Boolean),
    dataAndResources: value.dataAndResources.map((item) => item.trim()).filter(Boolean),
    confidence: value.confidence
  };
}

function buildPrompt(method: MethodUnit): string {
  return `You are analyzing a code repository for engineering documentation.

Return only one valid JSON object. Do not include markdown fences or commentary.

Schema:
{
  "summary": "One concise engineering sentence in Chinese describing what this method does.",
  "responsibilities": ["Concrete responsibilities inferred from the code."],
  "sideEffects": ["State changes, writes, network calls, process exits, or empty array."],
  "dataAndResources": ["Databases, files, HTTP endpoints, queues, env vars, or empty array."],
  "confidence": "low | medium | high"
}

Method:
- Module: ${method.modulePath}
- Name: ${method.className ? `${method.className}#` : ""}${method.name}
- Signature: ${method.signature}
- Parameters: ${method.parameters.map((param) => `${param.name}${param.type ? `: ${param.type}` : ""}`).join(", ") || "None"}
- Return type: ${method.returnType ?? "None"}
- Modifiers: ${method.modifiers.join(", ") || "None"}
- Annotations/decorators: ${method.annotations.join(", ") || "None"}
- Entrypoint hints: ${method.entrypointHints.map((hint) => hint.description ?? hint.kind).join(", ") || "None"}
- Framework hints: ${method.frameworkHints.map((hint) => `${hint.kind}${hint.value ? `=${hint.value}` : ""}`).join(", ") || "None"}
- Calls: ${method.calls.join(", ") || "None"}
- Detected resources: ${method.resources.join(", ") || "None"}

Source:
\`\`\`
${trimSource(method.source ?? "", 5000)}
\`\`\``;
}

function heuristicSemantic(method: MethodUnit): MethodSemantic {
  return {
    summary: method.summary,
    responsibilities: [method.signature],
    sideEffects: method.calls.filter((call) =>
      /save|create|update|delete|publish|send|write|insert|exit/i.test(call)
    ),
    dataAndResources: method.resources,
    confidence: "low",
    analyzer: "heuristic"
  };
}

function summarizeModuleFromMethods(module: ModuleUnit): string {
  const methodCount = module.methods.length;
  const firstSummaries = module.methods.slice(0, 3).map((method) => method.summary);
  const details = firstSummaries.length > 0 ? ` 关键方法：${firstSummaries.join(" ")}` : "";
  return `${module.path} 包含 ${module.classes.length} 个类、${methodCount} 个方法单元和 ${module.imports.length} 个导入。${details}`;
}

function trimSource(source: string, maxLength: number): string {
  if (source.length <= maxLength) {
    return source;
  }

  return `${source.slice(0, maxLength)}\n/* truncated */`;
}

async function mapWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  });

  await Promise.all(workers);
}
