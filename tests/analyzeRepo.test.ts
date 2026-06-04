import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeRepo } from "../src/analyzer/analyzeRepo.js";
import { loadProjectConfig } from "../src/config/projectConfig.js";
import { generateDocs } from "../src/docs/docsGenerator.js";
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
  assert.deepEqual(result.classes.map((classUnit) => classUnit.name), ["OrderController"]);

  const create = result.methods.find((method) => method.name === "create");
  assert.ok(create);
  assert.equal(create.language, "java");
  assert.equal(create.returnType, "OrderDto");
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
