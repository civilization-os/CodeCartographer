import path from "node:path";
import type { AnalysisResult } from "../core/types.js";
import {
  buildRelationGraph,
  extractResources
} from "../graph/relationGraphBuilder.js";
import {
  attachHeuristicSemantics,
  enrichModulesWithMethodSemantics
} from "../llm/methodSemanticAnalyzer.js";
import { loadModelConfig, toModelRuntimeInfo, type ModelConfig } from "../llm/modelConfig.js";
import { parseModules } from "../parser/moduleParser.js";
import { scanRepo } from "../scanner/repoScanner.js";

export interface AnalyzeRepoOptions {
  modelConfig?: ModelConfig;
}

export async function analyzeRepo(
  rootPath: string,
  options: AnalyzeRepoOptions = {}
): Promise<AnalysisResult> {
  const absoluteRoot = path.resolve(rootPath);
  const modelConfig = options.modelConfig ?? loadModelConfig();
  const files = await scanRepo(absoluteRoot);
  let modules = attachHeuristicSemantics(await parseModules(files));
  if (modelConfig.enabled) {
    modules = await enrichModulesWithMethodSemantics(modules, modelConfig, {
      rootPath: absoluteRoot
    });
  }
  const methods = modules.flatMap((module) => module.methods);
  const classes = modules.flatMap((module) => module.classes);
  const resources = extractResources(modules);
  const graph = buildRelationGraph(modules, resources);

  return {
    rootPath: absoluteRoot,
    scannedAt: new Date().toISOString(),
    model: toModelRuntimeInfo(modelConfig),
    modelConfig,
    files,
    modules,
    methods,
    classes,
    resources,
    graph
  };
}
