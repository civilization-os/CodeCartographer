import path from "node:path";
import { analyzeRepo } from "../analyzer/analyzeRepo.js";
import { loadProjectConfig } from "../config/projectConfig.js";
import { generateDocs } from "../docs/docsGenerator.js";
import { loadModelConfig } from "../llm/modelConfig.js";
import { writeResultJson } from "../output/resultJsonWriter.js";

export interface AnalyzeCommandOptions {
  targetPath: string;
  envOverrides?: NodeJS.ProcessEnv;
}

export async function runAnalyzeCommand(options: AnalyzeCommandOptions): Promise<void> {
  const rootPath = path.resolve(options.targetPath);
  const projectConfig = await loadProjectConfig(rootPath);
  const modelConfig = loadModelConfig(
    { ...process.env, ...(options.envOverrides ?? {}) },
    projectConfig.config.llm
  );
  const result = await analyzeRepo(rootPath, {
    modelConfig,
    scanConfig: projectConfig.config.scan,
    configPath: projectConfig.configPath
  });
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
  console.log(`Quality score: ${generatedDocs.quality.score}/100`);
  console.log(`Documentation entry: ${path.join(rootPath, "docs", "README.md")}`);
  console.log(`Quality report: ${path.join(rootPath, "docs", "human", "QUALITY_REPORT.md")}`);
  console.log(`Project config: ${projectConfig.configPath ?? "not found"}`);
  console.log(`Generated result JSON: ${output.resultPath}`);
  console.log(`Generated result diff: ${output.diffPath}`);
  console.log(`Generated change summary: ${output.changeSummaryPath}`);
  console.log("Generated docs:");
  for (const file of generatedDocs.written) {
    console.log(`- ${file}`);
  }
}
