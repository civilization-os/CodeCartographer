import fs from "node:fs/promises";
import path from "node:path";
import type {
  AnalysisResult,
  BusinessFlowCandidate,
  ClassUnit,
  MethodUnit,
  ModuleUnit
} from "../core/types.js";
import type { QualitySummary } from "../docs/qualityReport.js";
import {
  formatMethodName,
  type EntrypointSummary,
  type FlowSummary,
  type SemanticOverview
} from "../docs/semanticAggregator.js";
import { toPosixPath } from "../utils/path.js";

export const RESULT_JSON_SCHEMA_VERSION = 1;

export interface ResultJsonInput {
  result: AnalysisResult;
  overview: SemanticOverview;
  quality: QualitySummary;
  docs: string[];
}

export async function writeResultJson(input: ResultJsonInput): Promise<string> {
  const outputDir = path.join(input.result.rootPath, ".see-code");
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, "result.json");
  await fs.writeFile(outputPath, `${JSON.stringify(toResultJson(input), null, 2)}\n`, "utf8");
  return outputPath;
}

function toResultJson(input: ResultJsonInput): Record<string, unknown> {
  const { result, overview, quality, docs } = input;
  const sourceFiles = result.files.filter((file) =>
    ["typescript", "javascript", "java"].includes(file.language)
  );

  return {
    schemaVersion: RESULT_JSON_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    rootPath: result.rootPath,
    scannedAt: result.scannedAt,
    model: result.model,
    stats: {
      files: result.files.length,
      sourceFiles: sourceFiles.length,
      modules: result.modules.length,
      classes: result.classes.length,
      methods: result.methods.length,
      resources: result.resources.length,
      graphNodes: result.graph.nodes.length,
      graphEdges: result.graph.edges.length,
      businessFlows: overview.businessFlows.length,
      staticExecutionFlows: overview.flows.length
    },
    docs: docs.map((docPath) => toPosixPath(path.relative(result.rootPath, docPath))),
    files: result.files,
    modules: result.modules.map(serializeModule),
    classes: result.classes.map(serializeClass),
    methods: result.methods.map(serializeMethod),
    resources: result.resources,
    graph: result.graph,
    semanticOverview: {
      purpose: overview.purpose,
      moduleGroups: overview.moduleGroups.map((group) => ({
        name: group.name,
        summary: group.summary,
        modules: group.modules.map((module) => module.path),
        responsibilities: group.responsibilities
      })),
      entrypoints: overview.entrypoints.map(serializeEntrypoint),
      executionFlows: overview.flows.map(serializeFlow),
      businessFlows: overview.businessFlows.map(serializeBusinessFlow),
      resourceUsage: overview.resourceUsage.map((item) => ({
        resource: item.resource,
        methods: item.methods.map(methodRef)
      })),
      hotMethods: overview.hotMethods.map(methodRef)
    },
    quality
  };
}

function serializeModule(module: ModuleUnit): Record<string, unknown> {
  return {
    id: module.id,
    path: module.path,
    language: module.language,
    imports: module.imports,
    summary: module.summary,
    classIds: module.classes.map((classUnit) => classUnit.id),
    methodIds: module.methods.map((method) => method.id)
  };
}

function serializeClass(classUnit: ClassUnit): Record<string, unknown> {
  return {
    id: classUnit.id,
    name: classUnit.name,
    modulePath: classUnit.modulePath,
    location: classUnit.location,
    summary: classUnit.summary,
    methodIds: classUnit.methods.map((method) => method.id)
  };
}

function serializeMethod(method: MethodUnit): Record<string, unknown> {
  return {
    id: method.id,
    name: method.name,
    signature: method.signature,
    className: method.className,
    modulePath: method.modulePath,
    location: method.location,
    language: method.language,
    parameters: method.parameters,
    returnType: method.returnType,
    visibility: method.visibility,
    modifiers: method.modifiers,
    annotations: method.annotations,
    isAsync: method.isAsync,
    isStatic: method.isStatic,
    calls: method.calls,
    resources: method.resources,
    frameworkHints: method.frameworkHints,
    entrypointHints: method.entrypointHints,
    summary: method.summary,
    semantic: method.semantic
  };
}

function serializeEntrypoint(entrypoint: EntrypointSummary): Record<string, unknown> {
  return {
    method: methodRef(entrypoint.method),
    fanOut: entrypoint.fanOut,
    reason: entrypoint.reason
  };
}

function serializeFlow(flow: FlowSummary): Record<string, unknown> {
  return {
    name: flow.name,
    entrypoint: methodRef(flow.entrypoint),
    steps: flow.steps.map(methodRef),
    resources: flow.resources
  };
}

function serializeBusinessFlow(flow: BusinessFlowCandidate): Record<string, unknown> {
  return {
    name: flow.name,
    entrypoint: methodRef(flow.entrypoint),
    entrypointHint: flow.entrypointHint,
    steps: flow.steps.map(methodRef),
    resources: flow.resources
  };
}

function methodRef(method: MethodUnit): Record<string, unknown> {
  return {
    id: method.id,
    name: formatMethodName(method),
    modulePath: method.modulePath,
    location: method.location
  };
}
