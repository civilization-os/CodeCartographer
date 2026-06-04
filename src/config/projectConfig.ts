import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const projectConfigSchema = z.object({
  scan: z.object({
    exclude: z.array(z.string().min(1)).optional(),
    maxFileBytes: z.number().int().positive().optional()
  }).optional(),
  llm: z.object({
    provider: z.enum([
      "none",
      "openai",
      "deepseek",
      "anthropic",
      "openai-compatible",
      "anthropic-compatible"
    ]).optional(),
    model: z.string().min(1).optional(),
    baseUrl: z.string().min(1).optional(),
    limit: z.number().int().nonnegative().optional(),
    cache: z.boolean().optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().int().positive().optional(),
    maxRetries: z.number().int().nonnegative().optional(),
    timeoutMs: z.number().int().positive().optional(),
    concurrency: z.number().int().positive().optional()
  }).strict().optional()
}).strict();

export type ProjectConfig = z.infer<typeof projectConfigSchema>;

export interface LoadedProjectConfig {
  config: ProjectConfig;
  configPath?: string;
}

export const PROJECT_CONFIG_FILE = "see-code.config.json";

export async function loadProjectConfig(rootPath: string): Promise<LoadedProjectConfig> {
  const configPath = path.join(rootPath, PROJECT_CONFIG_FILE);
  let raw: string;

  try {
    raw = await fs.readFile(configPath, "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return {
        config: {}
      };
    }
    throw error;
  }

  const parsed = JSON.parse(raw) as unknown;
  rejectSensitiveKeys(parsed);

  return {
    config: projectConfigSchema.parse(parsed),
    configPath
  };
}

function rejectSensitiveKeys(value: unknown): void {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return;
  }

  if ("apiKey" in value || "api_key" in value || "key" in value) {
    throw new Error(`${PROJECT_CONFIG_FILE} must not contain API keys. Use CLI flags or environment variables instead.`);
  }

  for (const child of Object.values(value)) {
    rejectSensitiveKeys(child);
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
