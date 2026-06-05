import fs from "node:fs/promises";
import path from "node:path";
import { PROJECT_CONFIG_FILE, type ProjectConfig } from "../config/projectConfig.js";
import type { ModelProvider } from "../core/types.js";
import { DEFAULT_MAX_FILE_BYTES } from "../scanner/repoScanner.js";

export interface InitCommandOptions {
  targetPath: string;
  provider: ModelProvider;
  model?: string;
  baseUrl?: string;
  noProxy?: string;
  excludes?: string[];
  maxFileBytes?: number;
  force?: boolean;
}

export async function runInitCommand(options: InitCommandOptions): Promise<void> {
  const configPath = await writeProjectConfig(options);
  console.log(`Wrote ${configPath}`);
  console.log("API keys are intentionally not stored. Use environment variables or --api-key at run time.");
}

export async function writeProjectConfig(options: InitCommandOptions): Promise<string> {
  const rootPath = path.resolve(options.targetPath);
  const configPath = path.join(rootPath, PROJECT_CONFIG_FILE);
  await fs.mkdir(rootPath, { recursive: true });

  if (!options.force && await exists(configPath)) {
    throw new Error(`${PROJECT_CONFIG_FILE} already exists. Use --force to overwrite it.`);
  }

  const config = buildProjectConfig(options);
  await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  return configPath;
}

export function buildProjectConfig(options: InitCommandOptions): ProjectConfig {
  const llm: ProjectConfig["llm"] = {
    provider: options.provider,
    cache: true
  };

  if (options.provider !== "none") {
    if (options.model) {
      llm.model = options.model;
    }
    if (options.baseUrl) {
      llm.baseUrl = options.baseUrl;
    }
    if (options.noProxy) {
      llm.noProxy = options.noProxy;
    }
  }

  return {
    scan: {
      exclude: options.excludes ?? [],
      maxFileBytes: options.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES
    },
    llm
  };
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
