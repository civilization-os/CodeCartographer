import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeRepo } from "../src/analyzer/analyzeRepo.js";
import { loadProjectConfig } from "../src/config/projectConfig.js";
import { generateDocs, matchingNarrativeFlow } from "../src/docs/docsGenerator.js";
import { buildSemanticOverview } from "../src/docs/semanticAggregator.js";
import { loadModelConfig, type ModelConfig } from "../src/llm/modelConfig.js";
import {
  RESULT_JSON_SCHEMA_VERSION,
  writeResultJson
} from "../src/output/resultJsonWriter.js";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(testDir, "fixtures");

const noLlmConfig: ModelConfig = {
  provider: "none",
  model: "",
  temperature: 0.1,
  maxTokens: 700,
  maxRetries: 0,
  timeoutMs: 1_000,
  concurrency: 1,
  cacheEnabled: true,
  enabled: false
};

test("analyzes TypeScript fixtures without LLM calls", async () => {
  const result = await analyzeRepo(path.join(fixturesDir, "typescript-basic"), {
    modelConfig: noLlmConfig
  });

  assert.equal(result.files.length, 1);
  assert.equal(result.files[0].language, "typescript");

  const methodNames = result.methods.map((method) => method.name).sort();
  assert.deepEqual(methodNames, [
    "createOrder",
    "main",
    "normalizeOrder",
    "persistOrder",
    "registerRoutes"
  ]);

  const registerRoutes = result.methods.find((method) => method.name === "registerRoutes");
  assert.ok(registerRoutes);
  assert.deepEqual(registerRoutes.entrypointHints[0], {
    kind: "http_route",
    protocol: "http",
    method: "post",
    path: "/orders",
    source: "framework",
    description: "POST /orders"
  });

  const createOrder = result.methods.find((method) => method.name === "createOrder");
  assert.ok(createOrder);
  assert.ok(createOrder.calls.includes("persistOrder"));
  assert.ok(createOrder.resources.includes("HTTP:https://payments.example.com/charge"));

  const callEdges = result.graph.edges.filter((edge) => edge.kind === "calls");
  assert.ok(callEdges.some((edge) => edge.label === "persistOrder"));
});

test("analyzes Java Spring fixtures without LLM calls", async () => {
  const result = await analyzeRepo(path.join(fixturesDir, "java-spring"), {
    modelConfig: noLlmConfig
  });

  assert.equal(result.files.length, 1);
  assert.equal(result.files[0].language, "java");
  assert.deepEqual(result.classes.map((classUnit) => classUnit.name), [
    "OrderController",
    "OrderEntity",
    "OrderRepository",
    "OrderService"
  ]);

  const create = result.methods.find((method) => method.name === "create");
  assert.ok(create);
  assert.equal(create.language, "java");
  assert.equal(create.returnType, "OrderDto");
  assert.ok(create.calls.includes("validateAndCreate"));
  assert.ok(create.resources.includes("ENV:ORDER_TOPIC"));
  assert.ok(
    create.frameworkHints.some(
      (hint) =>
        hint.kind === "http_route" &&
        hint.framework === "spring-web" &&
        hint.value === "/api/orders" &&
        hint.metadata?.method === "post"
    )
  );
  assert.ok(
    create.entrypointHints.some(
      (hint) => hint.kind === "http_route" && hint.method === "post" && hint.path === "/api/orders"
    )
  );

  const reconcile = result.methods.find((method) => method.name === "reconcile");
  assert.ok(reconcile);
  assert.ok(reconcile.entrypointHints.some((hint) => hint.kind === "scheduled_job"));

  const consume = result.methods.find((method) => method.name === "consume");
  assert.ok(consume);
  assert.ok(consume.entrypointHints.some((hint) => hint.kind === "message_consumer" && hint.path === "order-events"));

  const loadOrderContext = result.methods.find((method) => method.name === "loadOrderContext");
  assert.ok(loadOrderContext);
  assert.deepEqual(loadOrderContext.annotations, [
    "@ModelAttribute(\"orderContext\")",
    "@PathVariable(\"orderId\")"
  ]);
  assert.ok(!loadOrderContext.frameworkHints.some((hint) => hint.kind === "http_route"));
  assert.ok(!loadOrderContext.entrypointHints.some((hint) => hint.kind === "http_route"));
  assert.ok(!result.methods.some((method) => method.name === "orderId"));

  const callEdges = result.graph.edges.filter((edge) => edge.kind === "calls");
  assert.ok(callEdges.some((edge) => edge.label === "validateAndCreate"));

  const validateAndCreate = result.methods.find((method) => method.name === "validateAndCreate");
  assert.ok(validateAndCreate);
  assert.ok(validateAndCreate.calls.includes("OrderService.create"));
  assert.ok(validateAndCreate.resources.includes("DB_WRITE:OrderRepository.save"));
  assert.ok(validateAndCreate.resources.includes("REPOSITORY:OrderRepository"));
  assert.ok(validateAndCreate.resources.includes("ENTITY:OrderEntity"));
  assert.ok(validateAndCreate.resources.includes("TABLE:orders"));
  assert.ok(
    result.graph.edges.some(
      (edge) => edge.from === validateAndCreate.id && edge.kind === "writes" && edge.label === "DB_WRITE:OrderRepository.save"
    )
  );
  assert.ok(
    result.graph.edges.some(
      (edge) => edge.from === validateAndCreate.id && edge.kind === "calls" && edge.label === "OrderService.create"
    )
  );

  const loadOrder = result.methods.find((method) => method.name === "loadOrder");
  const findByExternalId = result.methods.find((method) => method.className === "OrderRepository" && method.name === "findByExternalId");
  assert.ok(loadOrder);
  assert.ok(findByExternalId);
  assert.ok(loadOrder.calls.includes("OrderRepository.findByExternalId"));
  assert.ok(loadOrder.resources.includes("DB_READ:OrderRepository.findByExternalId"));
  assert.ok(
    result.graph.edges.some(
      (edge) => edge.from === loadOrder.id && edge.to === findByExternalId.id && edge.kind === "calls"
    )
  );

  const entityClass = result.classes.find((classUnit) => classUnit.name === "OrderEntity");
  const repositoryClass = result.classes.find((classUnit) => classUnit.name === "OrderRepository");
  assert.ok(entityClass);
  assert.ok(repositoryClass);
  assert.deepEqual(entityClass.resources, ["ENTITY:OrderEntity", "TABLE:orders"]);
  assert.deepEqual(repositoryClass.resources, ["ENTITY:OrderEntity", "REPOSITORY:OrderRepository"]);
  assert.ok(result.resources.some((resource) => resource.name === "ENTITY:OrderEntity" && resource.kind === "database"));
  assert.ok(result.resources.some((resource) => resource.name === "REPOSITORY:OrderRepository" && resource.kind === "database"));
  assert.ok(
    result.graph.edges.some(
      (edge) => edge.from === repositoryClass.id && edge.kind === "depends_on" && edge.label === "REPOSITORY:OrderRepository"
    )
  );
});

test("groups Java modules by package area instead of source set", async () => {
  const result = await analyzeRepo(path.join(fixturesDir, "java-spring"), {
    modelConfig: noLlmConfig
  });
  const overview = buildSemanticOverview(result);
  const groupNames = overview.moduleGroups.map((group) => group.name);

  assert.ok(groupNames.includes("acme"));
  assert.ok(!groupNames.includes("main"));
});

test("builds static execution flows from Java class methods", async () => {
  const result = await analyzeRepo(path.join(fixturesDir, "java-spring"), {
    modelConfig: noLlmConfig
  });
  const overview = buildSemanticOverview(result);
  const createFlow = overview.flows.find((flow) => flow.name === "OrderController#create");

  assert.ok(createFlow);
  assert.deepEqual(createFlow.steps.map((method) => `${method.className}#${method.name}`), [
    "OrderController#create",
    "OrderController#validateAndCreate",
    "OrderService#create"
  ]);
});

test("localizes fallback generated docs without LLM", async () => {
  const fixturePath = path.join(fixturesDir, "java-spring");
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-localized-docs-"));
  await fs.cp(fixturePath, tempRoot, { recursive: true });

  const result = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const generatedDocs = await generateDocs(result);
  const overviewDocPath = generatedDocs.written.find((docPath) => docPath.endsWith("PROJECT_OVERVIEW.md"));
  const businessFlowsPath = generatedDocs.written.find((docPath) => docPath.endsWith("BUSINESS_FLOWS.md"));
  assert.ok(overviewDocPath);
  assert.ok(businessFlowsPath);

  const combinedDocs = [
    await fs.readFile(overviewDocPath, "utf8"),
    await fs.readFile(businessFlowsPath, "utf8")
  ].join("\n");

  assert.match(combinedDocs, /Java\/Spring Web 应用/);
  assert.match(combinedDocs, /外部请求从/);
  assert.match(combinedDocs, /数据库相关资源/);
  assert.doesNotMatch(combinedDocs, /代码分析与文档生成流水线/);
  assert.doesNotMatch(combinedDocs, /CLI 接收目标仓库路径和模型配置/);
  assert.doesNotMatch(combinedDocs, /The CLI receives/);
  assert.doesNotMatch(combinedDocs, /starts at/);
  assert.doesNotMatch(combinedDocs, /expands through resolved call edges/);
});

test("matches LLM business flow narratives by name only", () => {
  const narrative = {
    flows: [
      {
        name: "GET /owners",
        narrative: "owners list narrative",
        steps: ["owners list step"]
      }
    ]
  };

  assert.equal(matchingNarrativeFlow("GET /owners/new", narrative), undefined);
  assert.equal(matchingNarrativeFlow("GET /owners", narrative)?.narrative, "owners list narrative");
});

test("keeps module docs focused on high-signal methods", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-module-doc-limit-"));
  await fs.mkdir(path.join(tempRoot, "src"), { recursive: true });
  await fs.writeFile(
    path.join(tempRoot, "src/app.ts"),
    `
export function registerRoutes(app: { get(path: string, handler: unknown): void }): void {
  app.get("/items", listItems);
}

export function listItems(): string[] {
  process.env.ITEMS_TABLE;
  return [];
}

export function method01(): void {}
export function method02(): void {}
export function method03(): void {}
export function method04(): void {}
export function method05(): void {}
export function method06(): void {}
export function method07(): void {}
export function method08(): void {}
export function method09(): void {}
export function method10(): void {}
`,
    "utf8"
  );

  const result = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const generatedDocs = await generateDocs(result);
  const modulesDocPath = generatedDocs.written.find((docPath) => docPath.endsWith("MODULES.md"));
  assert.ok(modulesDocPath);

  const modulesDoc = await fs.readFile(modulesDocPath, "utf8");
  assert.match(modulesDoc, /### Key Method Units/);
  assert.match(modulesDoc, /显示 8\/12 个高信号方法/);
  assert.match(modulesDoc, /完整方法级结构、调用和语义见 `.see-code\/result.json`/);
  assert.match(modulesDoc, /registerRoutes/);
  assert.match(modulesDoc, /listItems/);
  assert.doesNotMatch(modulesDoc, /\| method09 \|/);
  assert.equal(result.methods.length, 12);
});

test("handles document-only fixtures", async () => {
  const result = await analyzeRepo(path.join(fixturesDir, "docs-only"), {
    modelConfig: noLlmConfig
  });

  assert.deepEqual(
    result.files.map((file) => file.language).sort(),
    ["json", "markdown"]
  );
  assert.equal(result.methods.length, 0);
  assert.equal(result.classes.length, 0);
  assert.equal(result.resources.length, 0);
});

test("writes structured result JSON for analyzer output", async () => {
  const fixturePath = path.join(fixturesDir, "java-spring");
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-result-json-"));
  await fs.cp(fixturePath, tempRoot, { recursive: true });

  const result = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const generatedDocs = await generateDocs(result);
  const output = await writeResultJson({
    result,
    overview: generatedDocs.overview,
    quality: generatedDocs.quality,
    docs: generatedDocs.written
  });
  const json = JSON.parse(await fs.readFile(output.resultPath, "utf8")) as {
    schemaVersion: number;
    stats: {
      methods: number;
      businessFlows: number;
    };
    docs: string[];
    methods: Array<{
      name: string;
      source?: string;
      resources: string[];
      frameworkHints: Array<{
        kind: string;
        value?: string;
        metadata?: Record<string, string>;
      }>;
      entrypointHints: Array<{
        kind: string;
        path?: string;
      }>;
    }>;
    semanticOverview: {
      businessFlows: Array<{
        name: string;
        resources: string[];
      }>;
    };
    quality: {
      score: number;
      methodUnits: number;
    };
  };

  assert.equal(json.schemaVersion, RESULT_JSON_SCHEMA_VERSION);
  assert.equal(json.stats.methods, result.methods.length);
  assert.equal(json.quality.methodUnits, result.methods.length);
  assert.ok(json.quality.score >= 60);
  assert.ok(json.docs.includes("docs/QUALITY_REPORT.md"));

  const create = json.methods.find((method) => method.name === "create");
  assert.ok(create);
  assert.equal(create.source, undefined);
  assert.ok(create.resources.includes("ENV:ORDER_TOPIC"));
  assert.ok(
    create.frameworkHints.some(
      (hint) => hint.kind === "http_route" && hint.value === "/api/orders" && hint.metadata?.method === "post"
    )
  );

  assert.ok(
    json.methods.some((method) =>
      method.entrypointHints.some((hint) => hint.kind === "message_consumer" && hint.path === "order-events")
    )
  );
  assert.ok(json.semanticOverview.businessFlows.length >= 3);
});

test("writes result diff against the previous structured output", async () => {
  const fixturePath = path.join(fixturesDir, "typescript-basic");
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-result-diff-"));
  await fs.cp(fixturePath, tempRoot, { recursive: true });

  const firstResult = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const firstDocs = await generateDocs(firstResult);
  const firstOutput = await writeResultJson({
    result: firstResult,
    overview: firstDocs.overview,
    quality: firstDocs.quality,
    docs: firstDocs.written
  });
  const baselineDiff = JSON.parse(await fs.readFile(firstOutput.diffPath, "utf8")) as {
    baseline: boolean;
  };
  assert.equal(baselineDiff.baseline, true);

  await fs.appendFile(
    path.join(tempRoot, "src/app.ts"),
    `

export function cancelOrder(id: string): string {
  process.env.ORDER_CANCEL_TOPIC;
  return id;
}
`,
    "utf8"
  );

  const secondResult = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const secondDocs = await generateDocs(secondResult);
  const secondOutput = await writeResultJson({
    result: secondResult,
    overview: secondDocs.overview,
    quality: secondDocs.quality,
    docs: secondDocs.written
  });
  const diff = JSON.parse(await fs.readFile(secondOutput.diffPath, "utf8")) as {
    baseline: boolean;
    summary: {
      addedMethods: number;
      modifiedFiles: number;
      addedResources: number;
    };
    changes: {
      methods: {
        added: Array<{
          name: string;
        }>;
      };
      resources: {
        added: string[];
      };
    };
  };
  const changeSummary = await fs.readFile(secondOutput.changeSummaryPath, "utf8");

  assert.equal(diff.baseline, false);
  assert.equal(diff.summary.addedMethods, 1);
  assert.equal(diff.summary.modifiedFiles, 1);
  assert.equal(diff.summary.addedResources, 1);
  assert.ok(diff.changes.methods.added.some((method) => method.name === "cancelOrder"));
  assert.ok(diff.changes.resources.added.includes("ENV:ORDER_CANCEL_TOPIC"));
  assert.match(changeSummary, /cancelOrder/);
});

test("loads minimal project config for scan and non-sensitive LLM defaults", async () => {
  const fixturePath = path.join(fixturesDir, "typescript-basic");
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-config-"));
  await fs.cp(fixturePath, tempRoot, { recursive: true });
  await fs.mkdir(path.join(tempRoot, "generated"), { recursive: true });
  await fs.writeFile(
    path.join(tempRoot, "generated/ignored.ts"),
    "export function ignoredGeneratedMethod(): void {}\n",
    "utf8"
  );
  await fs.writeFile(
    path.join(tempRoot, "see-code.config.json"),
    JSON.stringify({
      scan: {
        exclude: ["generated/**"],
        maxFileBytes: 4096
      },
      llm: {
        provider: "deepseek",
        model: "deepseek-chat",
        limit: 7,
        cache: false
      }
    }, null, 2),
    "utf8"
  );

  const projectConfig = await loadProjectConfig(tempRoot);
  const modelConfig = loadModelConfig({}, projectConfig.config.llm);
  const result = await analyzeRepo(tempRoot, {
    modelConfig,
    scanConfig: projectConfig.config.scan,
    configPath: projectConfig.configPath
  });

  assert.equal(modelConfig.provider, "deepseek");
  assert.equal(modelConfig.model, "deepseek-chat");
  assert.equal(modelConfig.limit, 7);
  assert.equal(modelConfig.cacheEnabled, false);
  assert.equal(modelConfig.enabled, false);
  assert.ok(projectConfig.configPath?.endsWith("see-code.config.json"));
  assert.equal(result.scan?.maxFileBytes, 4096);
  assert.ok(result.scan?.exclude.includes("generated/**"));
  assert.ok(!result.files.some((file) => file.relativePath.includes("generated")));
});

test("rejects API keys in project config", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-config-secret-"));
  await fs.writeFile(
    path.join(tempRoot, "see-code.config.json"),
    JSON.stringify({
      llm: {
        provider: "deepseek",
        apiKey: "sk-should-not-be-here-but-this-is-a-test-placeholder"
      }
    }),
    "utf8"
  );

  await assert.rejects(
    () => loadProjectConfig(tempRoot),
    /must not contain API keys/
  );
});
