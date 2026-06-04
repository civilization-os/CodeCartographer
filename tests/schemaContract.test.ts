import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeRepo } from "../src/analyzer/analyzeRepo.js";
import { generateDocs } from "../src/docs/docsGenerator.js";
import type { ModelConfig } from "../src/llm/modelConfig.js";
import { writeResultJson } from "../src/output/resultJsonWriter.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesRoot = path.join(repoRoot, "tests", "fixtures");

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

interface JsonSchema {
  required?: string[];
  properties?: Record<string, JsonSchema>;
  const?: unknown;
  type?: string;
  not?: JsonSchema;
}

test("generated structured outputs satisfy the published schema contracts", async () => {
  const resultSchema = await readJson<JsonSchema>("schema/result.schema.json");
  const diffSchema = await readJson<JsonSchema>("schema/result-diff.schema.json");
  const generated = await generateFixtureOutput();
  const result = await readJsonAt<Record<string, unknown>>(generated.resultPath);
  const diff = await readJsonAt<Record<string, unknown>>(generated.diffPath);

  assertSchema(result, resultSchema, "result");
  assertSchema(diff, diffSchema, "resultDiff");
  assert.equal(result.schemaVersion, 1);
  assert.equal(diff.schemaVersion, 1);
  assert.ok(Array.isArray(result.methods));
  assert.ok(result.methods.every((method) => !("source" in objectRecord(method))));
});

test("schema contracts expose stable top-level consumer fields", async () => {
  const resultSchema = await readJson<JsonSchema>("schema/result.schema.json");
  const diffSchema = await readJson<JsonSchema>("schema/result-diff.schema.json");

  assert.deepEqual(resultSchema.required, [
    "schemaVersion",
    "generatedAt",
    "rootPath",
    "scannedAt",
    "stats",
    "docs",
    "files",
    "modules",
    "classes",
    "methods",
    "resources",
    "graph",
    "semanticOverview",
    "quality"
  ]);
  assert.deepEqual(diffSchema.required, [
    "schemaVersion",
    "generatedAt",
    "baseline",
    "toGeneratedAt",
    "summary",
    "changes"
  ]);
});

async function readJson<T>(relativePath: string): Promise<T> {
  return readJsonAt(path.join(repoRoot, relativePath));
}

async function readJsonAt<T>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
}

async function generateFixtureOutput(): Promise<{ resultPath: string; diffPath: string }> {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "see-code-schema-contract-"));
  await fs.cp(path.join(fixturesRoot, "java-spring"), tempRoot, { recursive: true });

  const result = await analyzeRepo(tempRoot, {
    modelConfig: noLlmConfig
  });
  const docs = await generateDocs(result);

  return writeResultJson({
    result,
    overview: docs.overview,
    quality: docs.quality,
    docs: docs.written
  });
}

function assertSchema(value: unknown, schema: JsonSchema, pathLabel: string): void {
  if (schema.const !== undefined) {
    assert.deepEqual(value, schema.const, `${pathLabel} must equal schema const`);
  }

  if (schema.type) {
    assert.equal(typeOf(value), schema.type, `${pathLabel} must be ${schema.type}`);
  }

  if (schema.required) {
    const record = objectRecord(value);
    for (const key of schema.required) {
      assert.ok(key in record, `${pathLabel}.${key} is required`);
    }
  }

  if (schema.not?.required) {
    const record = objectRecord(value);
    for (const key of schema.not.required) {
      assert.ok(!(key in record), `${pathLabel}.${key} must not be present`);
    }
  }

  const record = objectRecord(value);
  for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
    if (key in record) {
      assertSchema(record[key], childSchema, `${pathLabel}.${key}`);
    }
  }
}

function objectRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function typeOf(value: unknown): string {
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
}
