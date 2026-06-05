import type { ModelProvider } from "../core/types.js";

export type CliCommand = "interactive" | "analyze" | "init" | "doctor" | "help";

export interface CliOptions {
  command: CliCommand;
  targetPath: string;
  envOverrides: NodeJS.ProcessEnv;
  force: boolean;
  yes: boolean;
  interactive: boolean;
  excludes: string[];
  maxFileBytes?: number;
}

const COMMANDS = new Set(["analyze", "init", "doctor", "help"]);

export function parseCliArgs(rawArgs: string[]): CliOptions {
  const args = rawArgs.filter((arg) => arg !== "--");
  const positional: string[] = [];
  const overrides: NodeJS.ProcessEnv = {};
  const excludes: string[] = [];
  let force = false;
  let yes = false;
  let interactive = true;
  let maxFileBytes: number | undefined;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    switch (arg) {
      case "--provider":
        overrides.SEE_CODE_LLM_PROVIDER = requireValue(arg, next);
        index += 1;
        break;
      case "--model":
        overrides.SEE_CODE_LLM_MODEL = requireValue(arg, next);
        index += 1;
        break;
      case "--base-url":
        overrides.SEE_CODE_LLM_BASE_URL = requireValue(arg, next);
        index += 1;
        break;
      case "--no-proxy": {
        const noProxy = requireValue(arg, next);
        overrides.SEE_CODE_NO_PROXY = noProxy;
        overrides.NO_PROXY = noProxy;
        overrides.no_proxy = noProxy;
        index += 1;
        break;
      }
      case "--api-key":
        overrides.SEE_CODE_LLM_API_KEY = requireValue(arg, next);
        index += 1;
        break;
      case "--llm-limit":
        overrides.SEE_CODE_LLM_LIMIT = requireValue(arg, next);
        index += 1;
        break;
      case "--max-file-bytes":
        maxFileBytes = parsePositiveInteger(arg, requireValue(arg, next));
        index += 1;
        break;
      case "--exclude":
        excludes.push(requireValue(arg, next));
        index += 1;
        break;
      case "--no-llm-cache":
        overrides.SEE_CODE_LLM_CACHE = "0";
        break;
      case "--llm":
        overrides.SEE_CODE_LLM_PROVIDER = "deepseek";
        break;
      case "--no-llm":
        overrides.SEE_CODE_LLM_PROVIDER = "none";
        break;
      case "--force":
        force = true;
        break;
      case "--yes":
      case "-y":
        yes = true;
        interactive = false;
        break;
      case "--no-interactive":
        interactive = false;
        break;
      case "--help":
      case "-h":
        positional.push("help");
        break;
      default:
        positional.push(arg);
        break;
    }
  }

  if (args.length === 0) {
    return {
      command: "interactive",
      targetPath: ".",
      envOverrides: overrides,
      force,
      yes,
      interactive,
      excludes,
      maxFileBytes
    };
  }

  const [first, second] = positional;
  const command = commandFrom(first);
  const targetPath = command === "interactive"
    ? first ?? "."
    : second ?? ".";

  return {
    command,
    targetPath,
    envOverrides: overrides,
    force,
    yes,
    interactive,
    excludes,
    maxFileBytes
  };
}

export function normalizeProvider(value: string | undefined): ModelProvider {
  switch (value) {
    case "none":
    case "openai":
    case "deepseek":
    case "anthropic":
    case "openai-compatible":
    case "anthropic-compatible":
      return value;
    case undefined:
    case "":
      return "none";
    default:
      throw new Error(`Unsupported provider: ${value}`);
  }
}

function commandFrom(value: string | undefined): CliCommand {
  if (!value) {
    return "interactive";
  }
  if (COMMANDS.has(value)) {
    return value as CliCommand;
  }
  return "analyze";
}

function requireValue(flag: string, value: string | undefined): string {
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function parsePositiveInteger(flag: string, value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${flag} requires a positive integer.`);
  }
  return parsed;
}
