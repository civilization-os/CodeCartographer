#!/usr/bin/env node
import { runAnalyzeCommand } from "./cli/analyzeCommand.js";
import { parseCliArgs, normalizeProvider } from "./cli/args.js";
import { runDoctorCommand } from "./cli/doctorCommand.js";
import { runInitCommand } from "./cli/initCommand.js";
import { runInteractiveCommand } from "./cli/interactiveCommand.js";

async function main(): Promise<void> {
  const options = parseCliArgs(process.argv.slice(2));

  switch (options.command) {
    case "interactive":
      await runInteractiveCommand();
      return;
    case "analyze":
      await runAnalyzeCommand({
        targetPath: options.targetPath,
        envOverrides: options.envOverrides
      });
      return;
    case "init":
      await runInitCommand({
        targetPath: options.targetPath,
        provider: normalizeProvider(options.envOverrides.SEE_CODE_LLM_PROVIDER),
        model: options.envOverrides.SEE_CODE_LLM_MODEL,
        baseUrl: options.envOverrides.SEE_CODE_LLM_BASE_URL,
        noProxy: options.envOverrides.SEE_CODE_NO_PROXY,
        excludes: options.excludes,
        maxFileBytes: options.maxFileBytes,
        force: options.force
      });
      return;
    case "doctor":
      await runDoctorCommand({
        targetPath: options.targetPath,
        envOverrides: options.envOverrides
      });
      return;
    case "help":
      printHelp();
      return;
  }
}

function printHelp(): void {
  console.log(`CodeCartographer

Usage:
  codecartographer
  codecartographer analyze [repo-path] [options]
  codecartographer init [repo-path] [options]
  codecartographer doctor [repo-path] [options]

Commands:
  analyze              Analyze a repository and generate docs plus .see-code JSON.
  init                 Create a safe see-code.config.json without API keys.
  doctor               Check target path, config, and local LLM settings.
  help                 Show this help.

Analyze options:
  --provider none|deepseek|openai|anthropic|openai-compatible|anthropic-compatible
  --model <model-name>
  --base-url <compatible-api-base-url>
  --no-proxy <hosts>        Comma-separated hosts that should bypass proxies
  --api-key <key>
  --llm-limit <count>       Max uncached methods to send to the LLM in this run
  --no-llm-cache            Disable MethodUnit semantic cache
  --llm                     Shortcut for --provider deepseek
  --no-llm                  Disable LLM calls

Init options:
  --provider <provider>     Store non-sensitive provider defaults
  --model <model-name>      Store non-sensitive model default
  --base-url <url>          Store non-sensitive compatible API base URL
  --no-proxy <hosts>        Store non-sensitive proxy bypass hosts
  --exclude <glob>          Add a project exclude rule; repeatable
  --max-file-bytes <bytes>  Set scan file size limit
  --force                   Overwrite existing see-code.config.json

Environment:
  SEE_CODE_LLM_PROVIDER=deepseek
  SEE_CODE_LLM_MODEL=deepseek-chat
  SEE_CODE_LLM_API_KEY=...
  SEE_CODE_LLM_BASE_URL=https://api.deepseek.com
  SEE_CODE_NO_PROXY=localhost,127.0.0.1,.internal
  SEE_CODE_LLM_LIMIT=10
  SEE_CODE_LLM_CACHE=1
`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
