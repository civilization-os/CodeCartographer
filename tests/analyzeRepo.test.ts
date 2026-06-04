import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeRepo } from "../src/analyzer/analyzeRepo.js";
import { generateDocs } from "../src/docs/docsGenerator.js";
import type { ModelConfig } from "../src/llm/modelConfig.js";
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
  const outputPath = await writeResultJson({
    result,
    overview: generatedDocs.overview,
    quality: generatedDocs.quality,
    docs: generatedDocs.written
  });
  const json = JSON.parse(await fs.readFile(outputPath, "utf8")) as {
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
