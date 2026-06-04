import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { AnalysisResult } from "../core/types.js";
import { createChatModel } from "../llm/modelFactory.js";
import type { ModelConfig } from "../llm/modelConfig.js";
import type { SemanticOverview } from "./semanticAggregator.js";

const NARRATIVE_VERSION = "project-narrative-v1";

const narrativeSchema = z.object({
  projectOverview: z.object({
    purpose: z.string(),
    operatingModel: z.array(z.string()).default([]),
    keyCapabilities: z.array(z.string()).default([])
  }),
  architecture: z.object({
    summary: z.string(),
    layers: z.array(z.object({
      name: z.string(),
      modules: z.array(z.string()).default([]),
      responsibility: z.string()
    })).default([]),
    criticalPaths: z.array(z.string()).default([])
  }),
  flows: z.array(z.object({
    name: z.string(),
    narrative: z.string(),
    steps: z.array(z.string()).default([])
  })).default([]),
  risksAndBoundaries: z.array(z.string()).default([])
});

export type ProjectNarrative = z.infer<typeof narrativeSchema>;

export async function composeProjectNarrative(
  result: AnalysisResult,
  overview: SemanticOverview,
  config?: ModelConfig
): Promise<ProjectNarrative> {
  const fallback = fallbackNarrative(result, overview);
  if (!config?.enabled || !config.apiKey) {
    return fallback;
  }

  const narrativeConfig: ModelConfig = {
    ...config,
    maxTokens: Math.max(config.maxTokens, 2200),
    temperature: Math.min(config.temperature, 0.2)
  };
  const model = createChatModel(narrativeConfig);
  if (!model) {
    return fallback;
  }

  const context = buildNarrativeContext(result, overview);
  const cache = config.cacheEnabled ? await NarrativeCache.open(result.rootPath) : undefined;
  const cached = cache?.get(context, narrativeConfig);
  if (cached) {
    return cached;
  }

  try {
    const response = await model.invoke(buildNarrativePrompt(context));
    const parsed = parseNarrativeResponse(response);
    cache?.set(context, narrativeConfig, parsed);
    await cache?.save();
    return parsed;
  } catch {
    return fallback;
  }
}

function fallbackNarrative(
  result: AnalysisResult,
  overview: SemanticOverview
): ProjectNarrative {
  return {
    projectOverview: {
      purpose: overview.purpose,
      operatingModel: [
        "CLI 接收目标仓库路径和模型配置。",
        "扫描器收集受支持的源文件，并排除生成目录、缓存目录和用户配置的排除项。",
        "解析适配器把不同语言的源文件转换为统一的模块、类和方法单元。",
        "语义分析器为方法补充摘要、职责、资源和框架线索。",
        "关系图构建器和文档聚合器生成工程文档与结构化结果。"
      ],
      keyCapabilities: overview.moduleGroups
        .filter((group) => group.responsibilities.length > 0)
        .map((group) => `${group.name}: ${group.responsibilities[0]}`)
    },
    architecture: {
      summary: overview.purpose,
      layers: overview.moduleGroups.map((group) => ({
        name: group.name,
        modules: group.modules.map((module) => module.path),
        responsibility: group.responsibilities[0] ?? group.summary
      })),
      criticalPaths: overview.hotMethods
        .slice(0, 6)
        .map((method) => `${method.modulePath}#${method.name}: ${method.summary}`)
    },
    flows: overview.businessFlows.map((flow) => ({
      name: flow.name,
      narrative: `${flow.name} 从 ${flow.entrypoint.modulePath}:${flow.entrypoint.location.startLine} 入口开始，并沿已解析的内部调用边展开。`,
      steps: flow.steps.map((method) => `${method.name}: ${method.summary}`)
    })),
    risksAndBoundaries: [
      "调用图解析是静态分析结果，不执行完整类型推断。",
      "业务流依赖框架入口提示，未识别入口的流程不会被强行生成。",
      "当前 TypeScript 和 JavaScript 解析通过 TypeScript compiler AST 适配器完成。"
    ]
  };
}

function buildNarrativeContext(
  result: AnalysisResult,
  overview: SemanticOverview
): Record<string, unknown> {
  return {
    metrics: {
      files: result.files.length,
      modules: result.modules.length,
      methods: result.methods.length,
      classes: result.classes.length,
      resources: result.resources.map((resource) => resource.name)
    },
    moduleGroups: overview.moduleGroups.map((group) => ({
      name: group.name,
      modules: group.modules.map((module) => module.path),
      responsibilities: group.responsibilities.slice(0, 6)
    })),
    entrypoints: overview.businessFlows.map((flow) => ({
      name: flow.name,
      kind: flow.entrypointHint.kind,
      protocol: flow.entrypointHint.protocol,
      method: flow.entrypointHint.method,
      path: flow.entrypointHint.path,
      steps: flow.steps.map((method) => ({
        name: method.className ? `${method.className}#${method.name}` : method.name,
        module: method.modulePath,
        summary: method.summary
      }))
    })),
    hotMethods: overview.hotMethods.slice(0, 12).map((method) => ({
      name: method.className ? `${method.className}#${method.name}` : method.name,
      module: method.modulePath,
      summary: method.summary
    })),
    boundaries: [
      "Static call graph without full type inference.",
      "Framework-aware business flow generation depends on entrypoint hints.",
      "Current implementation supports TypeScript and JavaScript through one parser adapter; Java is planned as another adapter."
    ]
  };
}

function buildNarrativePrompt(context: Record<string, unknown>): string {
  return `You are writing concise engineering documentation for a code repository.

Return only valid JSON. Do not include markdown fences.
Write in Chinese. Use concrete engineering language. Avoid phrases like "可能", "推测", "AI认为", "根据上下文".

Schema:
{
  "projectOverview": {
    "purpose": "One paragraph describing what the project does.",
    "operatingModel": ["How the system works end to end."],
    "keyCapabilities": ["Concrete capabilities."]
  },
  "architecture": {
    "summary": "One paragraph architecture summary.",
    "layers": [
      {"name": "Layer name", "modules": ["module paths"], "responsibility": "What this layer owns."}
    ],
    "criticalPaths": ["Important method or module paths."]
  },
  "flows": [
    {"name": "Flow name", "narrative": "Flow narrative.", "steps": ["Step descriptions."]}
  ],
  "risksAndBoundaries": ["Current technical boundaries."]
}

Context:
${JSON.stringify(context, null, 2)}`;
}

function parseNarrativeResponse(response: unknown): ProjectNarrative {
  const content = extractContent(response);
  const json = extractJsonObject(content);
  return narrativeSchema.parse(JSON.parse(json));
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
  throw new Error("Narrative response did not contain a JSON object.");
}

class NarrativeCache {
  private readonly entries = new Map<string, ProjectNarrative>();

  private constructor(private readonly filePath: string) {}

  static async open(rootPath: string): Promise<NarrativeCache> {
    const cache = new NarrativeCache(path.join(rootPath, ".see-code", "cache", "project-narratives.json"));
    await cache.load();
    return cache;
  }

  get(context: Record<string, unknown>, config: ModelConfig): ProjectNarrative | undefined {
    return this.entries.get(cacheKey(context, config));
  }

  set(context: Record<string, unknown>, config: ModelConfig, narrative: ProjectNarrative): void {
    this.entries.set(cacheKey(context, config), narrative);
  }

  async save(): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(
      this.filePath,
      `${JSON.stringify({ version: 1, entries: Object.fromEntries(this.entries) }, null, 2)}\n`,
      "utf8"
    );
  }

  private async load(): Promise<void> {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as { entries?: Record<string, ProjectNarrative> };
      for (const [key, value] of Object.entries(parsed.entries ?? {})) {
        this.entries.set(key, value);
      }
    } catch (error) {
      if (!isMissingFile(error)) {
        throw error;
      }
    }
  }
}

function cacheKey(context: Record<string, unknown>, config: ModelConfig): string {
  return hash(JSON.stringify({
    version: NARRATIVE_VERSION,
    provider: config.provider,
    model: config.model,
    baseUrl: config.baseUrl,
    context
  }));
}

function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function isMissingFile(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === "ENOENT"
  );
}
