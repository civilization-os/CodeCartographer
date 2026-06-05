import fs from "node:fs/promises";
import path from "node:path";
import { loadProjectConfig, PROJECT_CONFIG_FILE } from "../config/projectConfig.js";
import { loadModelConfig } from "../llm/modelConfig.js";

export interface DoctorCommandOptions {
  targetPath: string;
  envOverrides?: NodeJS.ProcessEnv;
}

interface DoctorCheck {
  label: string;
  status: "ok" | "warn" | "fail";
  detail: string;
}

export async function runDoctorCommand(options: DoctorCommandOptions): Promise<void> {
  const checks = await collectDoctorChecks(options);

  console.log("CodeCartographer doctor");
  for (const check of checks) {
    console.log(`${formatStatus(check.status)} ${check.label}: ${check.detail}`);
  }

  if (checks.some((check) => check.status === "fail")) {
    process.exitCode = 1;
  }
}

export async function collectDoctorChecks(options: DoctorCommandOptions): Promise<DoctorCheck[]> {
  const rootPath = path.resolve(options.targetPath);
  const checks: DoctorCheck[] = [];

  checks.push({
    label: "Target path",
    status: await isDirectory(rootPath) ? "ok" : "fail",
    detail: rootPath
  });

  let projectConfig;
  try {
    projectConfig = await loadProjectConfig(rootPath);
    checks.push({
      label: PROJECT_CONFIG_FILE,
      status: projectConfig.configPath ? "ok" : "warn",
      detail: projectConfig.configPath ?? "not found; defaults will be used"
    });
  } catch (error) {
    checks.push({
      label: PROJECT_CONFIG_FILE,
      status: "fail",
      detail: error instanceof Error ? error.message : String(error)
    });
    projectConfig = { config: {}, configPath: undefined };
  }

  const env = { ...process.env, ...(options.envOverrides ?? {}) };
  const modelConfig = loadModelConfig(env, projectConfig.config.llm);
  checks.push({
    label: "LLM provider",
    status: modelConfig.provider === "none" ? "warn" : "ok",
    detail: modelConfig.provider === "none"
      ? "disabled; heuristic summaries will be used"
      : `${modelConfig.provider} / ${modelConfig.model}`
  });
  checks.push({
    label: "LLM API key",
    status: modelConfig.provider === "none" || modelConfig.enabled ? "ok" : "warn",
    detail: modelConfig.provider === "none"
      ? "not required"
      : modelConfig.enabled
        ? "present in environment or CLI override"
        : "missing; set SEE_CODE_LLM_API_KEY or provider-specific API key"
  });
  checks.push({
    label: "LLM cache",
    status: "ok",
    detail: modelConfig.cacheEnabled ? "enabled" : "disabled"
  });
  checks.push({
    label: "No proxy",
    status: "ok",
    detail: modelConfig.noProxy ? modelConfig.noProxy : "not configured"
  });

  checks.push({
    label: "Output directories",
    status: "ok",
    detail: "docs/ and .see-code/ will be created during analysis"
  });

  return checks;
}

async function isDirectory(filePath: string): Promise<boolean> {
  try {
    return (await fs.stat(filePath)).isDirectory();
  } catch {
    return false;
  }
}

function formatStatus(status: DoctorCheck["status"]): string {
  switch (status) {
    case "ok":
      return "[OK]";
    case "warn":
      return "[WARN]";
    case "fail":
      return "[FAIL]";
  }
}
