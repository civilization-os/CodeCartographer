import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import type { BaseMessage } from "@langchain/core/messages";
import { applyModelNetworkEnv, type ModelConfig } from "./modelConfig.js";

export interface ChatModel {
  invoke(input: string | BaseMessage[]): Promise<unknown>;
}

export function createChatModel(config: ModelConfig): ChatModel | undefined {
  if (!config.enabled || !config.apiKey) {
    return undefined;
  }

  applyModelNetworkEnv(config);

  if (
    config.provider === "openai" ||
    config.provider === "deepseek" ||
    config.provider === "openai-compatible"
  ) {
    return new ChatOpenAI({
      model: config.model,
      apiKey: config.apiKey,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      maxRetries: config.maxRetries,
      timeout: config.timeoutMs,
      configuration: config.baseUrl ? { baseURL: config.baseUrl } : undefined
    });
  }

  if (
    config.provider === "anthropic" ||
    config.provider === "anthropic-compatible"
  ) {
    return new ChatAnthropic({
      model: config.model,
      apiKey: config.apiKey,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      maxRetries: config.maxRetries,
      anthropicApiUrl: config.baseUrl
    });
  }

  return undefined;
}
