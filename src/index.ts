import path from "node:path";
import { analyzeRepo } from "./analyzer/analyzeRepo.js";
import { generateDocs } from "./docs/docsGenerator.js";
import { loadModelConfig, type ModelConfig } from "./llm/modelConfig.js";
import { writeResultJson } from "./output/resultJsonWriter.js";

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((arg) => arg !== "--");
  const { command, targetPath, modelConfig } = parseArgs(args);

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command !== "analyze") {
    throw new Error(`Unknown command: ${command}`);
  }

  const rootPath = path.resolve(targetPath);
  const result = await analyzeRepo(rootPath, { modelConfig });
  const generatedDocs = await generateDocs(result);
  const output = await writeResultJson({
    result,
    overview: generatedDocs.overview,
    quality: generatedDocs.quality,
    docs: generatedDocs.written
  });

  console.log(`Analyzed ${result.files.length} files.`);
  console.log(`Extracted ${result.classes.length} classes and ${result.methods.length} method units.`);
  console.log(`Built graph with ${result.graph.nodes.length} nodes and ${result.graph.edges.length} edges.`);
  console.log(
    result.model?.enabled
      ? `LLM semantic analyzer: ${result.model.provider} / ${result.model.model}`
      : "LLM semantic analyzer: disabled, using heuristic summaries."
  );
  console.log(`Generated result JSON: ${output.resultPath}`);
  console.log(`Generated result diff: ${output.diffPath}`);
  console.log(`Generated change summary: ${output.changeSummaryPath}`);
  console.log("Generated docs:");
  for (const file of generatedDocs.written) {
    console.log(`- ${file}`);
  }
}

function parseArgs(args: string[]): {
  command: string;
  targetPath: string;
  modelConfig: ModelConfig;
} {
  const positional: string[] = [];
  const overrides: NodeJS.ProcessEnv = {};

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
      case "--api-key":
        overrides.SEE_CODE_LLM_API_KEY = requireValue(arg, next);
        index += 1;
        break;
      case "--llm-limit":
        overrides.SEE_CODE_LLM_LIMIT = requireValue(arg, next);
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
      default:
        positional.push(arg);
        break;
    }
  }

  const [command = "analyze", targetPath = "."] = positional;
  return {
    command,
    targetPath,
    modelConfig: loadModelConfig({ ...process.env, ...overrides })
  };
}

function requireValue(flag: string, value: string | undefined): string {
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp(): void {
  console.log(`see-code

Usage:
  pnpm analyze -- <repo-path>
  pnpm dev -- analyze <repo-path>

LLM providers:
  --provider none|deepseek|openai|anthropic|openai-compatible|anthropic-compatible
  --model <model-name>
  --base-url <compatible-api-base-url>
  --api-key <key>
  --llm-limit <count>    Max uncached methods to send to the LLM in this run
  --no-llm-cache         Disable MethodUnit semantic cache
  --llm                 Shortcut for --provider deepseek
  --no-llm              Disable LLM calls

Environment:
  SEE_CODE_LLM_PROVIDER=deepseek
  SEE_CODE_LLM_MODEL=deepseek-chat
  SEE_CODE_LLM_API_KEY=...
  SEE_CODE_LLM_BASE_URL=https://api.deepseek.com
  SEE_CODE_LLM_LIMIT=10
  SEE_CODE_LLM_CACHE=1
`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
