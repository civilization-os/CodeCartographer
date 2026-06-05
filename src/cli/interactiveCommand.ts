import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { loadProjectConfig } from "../config/projectConfig.js";
import { loadModelConfig } from "../llm/modelConfig.js";
import { runAnalyzeCommand } from "./analyzeCommand.js";
import { normalizeProvider } from "./args.js";
import { runDoctorCommand } from "./doctorCommand.js";
import { runInitCommand } from "./initCommand.js";

export async function runInteractiveCommand(): Promise<void> {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("CodeCartographer interactive setup");
    const targetPath = await ask(rl, "Project path", ".");
    const provider = normalizeProvider(await ask(
      rl,
      "LLM provider (none/deepseek/openai/openai-compatible/anthropic/anthropic-compatible)",
      "none"
    ));
    const envOverrides: NodeJS.ProcessEnv = {
      SEE_CODE_LLM_PROVIDER: provider
    };

    if (provider !== "none") {
      envOverrides.SEE_CODE_LLM_MODEL = await ask(rl, "Model", defaultModel(provider));
      const baseUrl = await ask(rl, "Base URL (blank for provider default)", "");
      if (baseUrl) {
        envOverrides.SEE_CODE_LLM_BASE_URL = baseUrl;
      }
      const noProxy = await ask(rl, "No proxy hosts (blank to use environment)", "");
      if (noProxy) {
        envOverrides.SEE_CODE_NO_PROXY = noProxy;
        envOverrides.NO_PROXY = noProxy;
        envOverrides.no_proxy = noProxy;
      }
      const limit = await ask(rl, "LLM method limit for this run (blank for unlimited)", "");
      if (limit) {
        envOverrides.SEE_CODE_LLM_LIMIT = limit;
      }

      const modelConfig = loadModelConfig({ ...process.env, ...envOverrides });
      if (!modelConfig.enabled && await askYesNo(rl, "No API key detected. Enter one for this run?", false)) {
        console.log("The key will only be used by this process and will not be written to config.");
        envOverrides.SEE_CODE_LLM_API_KEY = await askSecret(rl, "API key");
      }
    }

    const projectConfig = await loadProjectConfig(targetPath);
    if (!projectConfig.configPath && await askYesNo(rl, "Create see-code.config.json?", true)) {
      await runInitCommand({
        targetPath,
        provider,
        model: envOverrides.SEE_CODE_LLM_MODEL,
        baseUrl: envOverrides.SEE_CODE_LLM_BASE_URL,
        noProxy: envOverrides.SEE_CODE_NO_PROXY,
        excludes: [],
        force: false
      });
    }

    if (await askYesNo(rl, "Run doctor before analysis?", true)) {
      await runDoctorCommand({
        targetPath,
        envOverrides
      });
    }

    if (await askYesNo(rl, "Run analysis now?", true)) {
      await runAnalyzeCommand({
        targetPath,
        envOverrides
      });
    } else {
      console.log("Next command:");
      console.log(`  codecartographer analyze ${targetPath}`);
    }
  } finally {
    rl.close();
  }
}

async function askSecret(
  rl: readline.Interface,
  question: string
): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY || !process.stdin.setRawMode) {
    return ask(rl, question, "");
  }

  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    const stdout = process.stdout;
    let value = "";

    const cleanup = (): void => {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdout.write("\n");
    };
    const finish = (): void => {
      cleanup();
      resolve(value);
    };
    const onData = (chunk: Buffer): void => {
      const text = chunk.toString("utf8");
      for (const char of text) {
        if (char === "\u0003") {
          cleanup();
          reject(new Error("Interrupted."));
          return;
        }
        if (char === "\r" || char === "\n") {
          finish();
          return;
        }
        if (char === "\u007f" || char === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }
        value += char;
        stdout.write("*");
      }
    };

    stdout.write(`${question}: `);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function ask(
  rl: readline.Interface,
  question: string,
  defaultValue: string
): Promise<string> {
  const suffix = defaultValue ? ` (${defaultValue})` : "";
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || defaultValue;
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

function defaultModel(provider: string): string {
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
    default:
      return "";
  }
}
