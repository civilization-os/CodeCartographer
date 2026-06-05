import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  loadProjectConfig,
  PROJECT_CONFIG_FILE,
  type ProjectConfig
} from "../config/projectConfig.js";
import { createChatModel } from "../llm/modelFactory.js";
import {
  applyModelNetworkEnv,
  loadModelConfig,
  type ModelConfig
} from "../llm/modelConfig.js";

export interface ModelTestCommandOptions {
  targetPath: string;
  envOverrides?: NodeJS.ProcessEnv;
  yes?: boolean;
  interactive?: boolean;
}

export async function runModelTestCommand(options: ModelTestCommandOptions): Promise<void> {
  const rootPath = path.resolve(options.targetPath);
  const projectConfig = await loadProjectConfig(rootPath);
  const env = { ...process.env, ...(options.envOverrides ?? {}) };
  const modelConfig = loadModelConfig(env, projectConfig.config.llm);

  console.log("Testing model connection...");
  console.log(`Provider: ${modelConfig.provider}`);
  console.log(`Model: ${modelConfig.model || "not configured"}`);
  console.log(`Base URL: ${modelConfig.baseUrl ?? "provider default"}`);
  console.log(`No proxy: ${modelConfig.noProxy ?? "not configured"}`);

  if (modelConfig.provider === "none") {
    throw new Error("LLM provider is disabled. Set --provider or SEE_CODE_LLM_PROVIDER before testing.");
  }
  if (!modelConfig.enabled) {
    throw new Error("LLM API key is missing. Set --api-key, SEE_CODE_LLM_API_KEY, or a provider-specific API key.");
  }

  applyModelNetworkEnv(modelConfig);
  const model = createChatModel(modelConfig);
  if (!model) {
    throw new Error(`Unsupported or disabled provider: ${modelConfig.provider}`);
  }

  const startedAt = Date.now();
  const response = await model.invoke("Reply with exactly: OK");
  console.log(`Connection OK (${Date.now() - startedAt} ms).`);
  console.log(`Response preview: ${previewResponse(response)}`);

  if (shouldSave(options)) {
    await saveModelDefaults(rootPath, projectConfig.config, modelConfig);
    console.log(`Saved non-sensitive model defaults to ${path.join(rootPath, PROJECT_CONFIG_FILE)}`);
    return;
  }

  if (options.interactive === false) {
    return;
  }

  const rl = readline.createInterface({ input, output });
  try {
    if (await askYesNo(rl, `Save non-sensitive model defaults to ${PROJECT_CONFIG_FILE}?`, true)) {
      await saveModelDefaults(rootPath, projectConfig.config, modelConfig);
      console.log(`Saved non-sensitive model defaults to ${path.join(rootPath, PROJECT_CONFIG_FILE)}`);
    }
  } finally {
    rl.close();
  }
}

function shouldSave(options: ModelTestCommandOptions): boolean {
  return options.yes === true;
}

async function saveModelDefaults(
  rootPath: string,
  existingConfig: ProjectConfig,
  modelConfig: ModelConfig
): Promise<void> {
  const configPath = path.join(rootPath, PROJECT_CONFIG_FILE);
  const llm: ProjectConfig["llm"] = {
    ...(existingConfig.llm ?? {}),
    provider: modelConfig.provider,
    model: modelConfig.model,
    cache: modelConfig.cacheEnabled
  };

  if (modelConfig.baseUrl) {
    llm.baseUrl = modelConfig.baseUrl;
  } else {
    delete llm.baseUrl;
  }
  if (modelConfig.noProxy) {
    llm.noProxy = modelConfig.noProxy;
  } else {
    delete llm.noProxy;
  }

  const nextConfig: ProjectConfig = {
    ...existingConfig,
    llm
  };

  await fs.mkdir(rootPath, { recursive: true });
  await fs.writeFile(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
}

function previewResponse(response: unknown): string {
  if (typeof response === "string") {
    return truncate(response);
  }
  if (isMessageLike(response) && typeof response.content === "string") {
    return truncate(response.content);
  }
  return truncate(JSON.stringify(response));
}

function isMessageLike(value: unknown): value is { content: unknown } {
  return typeof value === "object" && value !== null && "content" in value;
}

function truncate(value: string | undefined): string {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  return text.length > 120 ? `${text.slice(0, 117)}...` : text;
}

async function askYesNo(
  rl: readline.Interface,
  question: string,
  defaultValue: boolean
): Promise<boolean> {
  const answer = (await rl.question(`${question} (${defaultValue ? "Y/n" : "y/N"}): `)).trim().toLowerCase();
  if (!answer) {
    return defaultValue;
  }
  return answer === "y" || answer === "yes";
}
