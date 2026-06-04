import path from "node:path";
import type { AnalysisResult, ScanRuntimeInfo } from "../core/types.js";
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
import {
  DEFAULT_MAX_FILE_BYTES,
  DEFAULT_SCAN_EXCLUDE,
  scanRepo,
  type ScanRepoOptions
} from "../scanner/repoScanner.js";
import { addSyntheticRepositoryMethods } from "./syntheticRepositoryMethods.js";

export interface AnalyzeRepoOptions {
  modelConfig?: ModelConfig;
  scanConfig?: ScanRepoOptions;
  configPath?: string;
}

export async function analyzeRepo(
  rootPath: string,
  options: AnalyzeRepoOptions = {}
): Promise<AnalysisResult> {
  const absoluteRoot = path.resolve(rootPath);
  const modelConfig = options.modelConfig ?? loadModelConfig();
  const scan = buildScanRuntimeInfo(options.scanConfig, options.configPath);
  const files = await scanRepo(absoluteRoot, options.scanConfig);
  let modules = attachHeuristicSemantics(addSyntheticRepositoryMethods(await parseModules(files)));
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
    scan,
    files,
    modules,
    methods,
    classes,
    resources,
    graph
  };
}

function buildScanRuntimeInfo(
  scanConfig: ScanRepoOptions | undefined,
  configPath: string | undefined
): ScanRuntimeInfo {
  return {
    exclude: [...DEFAULT_SCAN_EXCLUDE, ...(scanConfig?.exclude ?? [])],
    maxFileBytes: scanConfig?.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES,
    configPath
  };
}
