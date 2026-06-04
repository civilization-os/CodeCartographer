import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseCliArgs } from "../src/cli/args.js";
import { collectDoctorChecks } from "../src/cli/doctorCommand.js";
import { writeProjectConfig } from "../src/cli/initCommand.js";

test("parses default invocation as interactive CLI", () => {
  const options = parseCliArgs([]);

  assert.equal(options.command, "interactive");
  assert.equal(options.targetPath, ".");
});

test("parses analyze flags into environment overrides", () => {
  const options = parseCliArgs([
    "analyze",
    "sample-repo",
    "--provider",
    "deepseek",
    "--model",
    "deepseek-chat",
    "--llm-limit",
    "5",
    "--no-llm-cache"
  ]);

  assert.equal(options.command, "analyze");
  assert.equal(options.targetPath, "sample-repo");
  assert.equal(options.envOverrides.SEE_CODE_LLM_PROVIDER, "deepseek");
  assert.equal(options.envOverrides.SEE_CODE_LLM_MODEL, "deepseek-chat");
  assert.equal(options.envOverrides.SEE_CODE_LLM_LIMIT, "5");
  assert.equal(options.envOverrides.SEE_CODE_LLM_CACHE, "0");
});

test("writes safe project config without API keys", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "codecartographer-init-"));
  const configPath = await writeProjectConfig({
    targetPath: tempRoot,
    provider: "deepseek",
    model: "deepseek-chat",
    excludes: ["generated/**"],
    maxFileBytes: 4096
  });
  const configText = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(configText) as {
    scan: {
      exclude: string[];
      maxFileBytes: number;
    };
    llm: {
      provider: string;
      model: string;
      cache: boolean;
      apiKey?: string;
    };
  };

  assert.equal(config.scan.maxFileBytes, 4096);
  assert.deepEqual(config.scan.exclude, ["generated/**"]);
  assert.equal(config.llm.provider, "deepseek");
  assert.equal(config.llm.model, "deepseek-chat");
  assert.equal(config.llm.cache, true);
  assert.equal(config.llm.apiKey, undefined);
  await assert.rejects(
    () => writeProjectConfig({
      targetPath: tempRoot,
      provider: "none"
    }),
    /already exists/
  );
});

test("doctor reports missing LLM API key without printing secrets", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "codecartographer-doctor-"));
  const checks = await collectDoctorChecks({
    targetPath: tempRoot,
    envOverrides: {
      SEE_CODE_LLM_PROVIDER: "deepseek",
      SEE_CODE_LLM_MODEL: "deepseek-chat"
    }
  });
  const apiKeyCheck = checks.find((check) => check.label === "LLM API key");

  assert.equal(apiKeyCheck?.status, "warn");
  assert.match(apiKeyCheck?.detail ?? "", /missing/);
  assert.doesNotMatch(JSON.stringify(checks), /sk-/);
});
