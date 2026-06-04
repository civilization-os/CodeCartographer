import { z } from "zod";
import type { ModelProvider, ModelRuntimeInfo } from "../core/types.js";

const modelProviderSchema = z.enum([
  "none",
  "openai",
  "deepseek",
  "anthropic",
  "openai-compatible",
  "anthropic-compatible"
]);

export interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  maxRetries: number;
  timeoutMs: number;
  concurrency: number;
  limit?: number;
  cacheEnabled: boolean;
  enabled: boolean;
}

export function loadModelConfig(env: NodeJS.ProcessEnv = process.env): ModelConfig {
  const provider = modelProviderSchema.parse(
    env.SEE_CODE_LLM_PROVIDER ?? env.LLM_PROVIDER ?? "none"
  );

  const model = env.SEE_CODE_LLM_MODEL ?? defaultModel(provider);
  const baseUrl = env.SEE_CODE_LLM_BASE_URL ?? defaultBaseUrl(provider);
  const apiKey = getApiKey(provider, env);

  return {
    provider,
    model,
    apiKey,
    baseUrl,
    temperature: parseNumber(env.SEE_CODE_LLM_TEMPERATURE, 0.1),
    maxTokens: parseInteger(env.SEE_CODE_LLM_MAX_TOKENS, 700),
    maxRetries: parseInteger(env.SEE_CODE_LLM_MAX_RETRIES, 2),
    timeoutMs: parseInteger(env.SEE_CODE_LLM_TIMEOUT_MS, 60_000),
    concurrency: parseInteger(env.SEE_CODE_LLM_CONCURRENCY, 2),
    limit: parseOptionalInteger(env.SEE_CODE_LLM_LIMIT),
    cacheEnabled: env.SEE_CODE_LLM_CACHE !== "0" && env.SEE_CODE_LLM_CACHE !== "false",
    enabled: provider !== "none" && Boolean(apiKey)
  };
}

export function toModelRuntimeInfo(config: ModelConfig): ModelRuntimeInfo {
  return {
    enabled: config.enabled,
    provider: config.provider,
    model: config.provider === "none" ? undefined : config.model,
    baseUrl: config.baseUrl,
    limit: config.limit,
    cacheEnabled: config.cacheEnabled
  };
}

function defaultModel(provider: ModelProvider): string {
  switch (provider) {
    case "openai":
      return "gpt-4o-mini";
    case "deepseek":
      return "deepseek-chat";
    case "anthropic":
      return "claude-3-5-haiku-latest";
    case "openai-compatible":
    case "anthropic-compatible":
      return "local-model";
    case "none":
      return "";
  }
}

function defaultBaseUrl(provider: ModelProvider): string | undefined {
  switch (provider) {
    case "deepseek":
      return "https://api.deepseek.com";
    default:
      return undefined;
  }
}

function getApiKey(provider: ModelProvider, env: NodeJS.ProcessEnv): string | undefined {
  const genericKey = env.SEE_CODE_LLM_API_KEY ?? env.LLM_API_KEY;
  if (genericKey) {
    return genericKey;
  }

  switch (provider) {
    case "openai":
    case "openai-compatible":
      return env.OPENAI_API_KEY;
    case "deepseek":
      return env.DEEPSEEK_API_KEY;
    case "anthropic":
    case "anthropic-compatible":
      return env.ANTHROPIC_API_KEY;
    case "none":
      return undefined;
  }
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseInteger(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseOptionalInteger(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}
