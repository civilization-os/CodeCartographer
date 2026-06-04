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
export const RESULT_DIFF_SCHEMA_VERSION = 1;

export interface ResultJsonInput {
  result: AnalysisResult;
  overview: SemanticOverview;
  quality: QualitySummary;
  docs: string[];
}

export interface ResultJsonWriteResult {
  resultPath: string;
  diffPath: string;
  changeSummaryPath: string;
}

interface ResultDiff {
  schemaVersion: number;
  generatedAt: string;
  baseline: boolean;
  fromGeneratedAt?: string;
  toGeneratedAt: string;
  summary: {
    addedFiles: number;
    removedFiles: number;
    modifiedFiles: number;
    addedMethods: number;
    removedMethods: number;
    modifiedMethods: number;
    addedEntrypoints: number;
    removedEntrypoints: number;
    addedResources: number;
    removedResources: number;
    addedBusinessFlows: number;
    removedBusinessFlows: number;
    qualityScoreBefore?: number;
    qualityScoreAfter?: number;
  };
  changes: {
    files: ChangeSet<FileDiffEntry>;
    methods: ChangeSet<MethodDiffEntry>;
    entrypoints: ChangeSet<EntrypointDiffEntry>;
    resources: ChangeSet<string>;
    businessFlows: ChangeSet<string>;
  };
}

interface ChangeSet<T> {
  added: T[];
  removed: T[];
  modified: T[];
}

interface FileDiffEntry {
  path: string;
  language?: string;
  bytes?: number;
  beforeBytes?: number;
  afterBytes?: number;
}

interface MethodDiffEntry {
  key: string;
  name: string;
  modulePath: string;
  className?: string;
  signature?: string;
}

interface EntrypointDiffEntry {
  key: string;
  methodName: string;
  modulePath: string;
  kind: string;
  protocol?: string;
  method?: string;
  path?: string;
}

export async function writeResultJson(input: ResultJsonInput): Promise<ResultJsonWriteResult> {
  const outputDir = path.join(input.result.rootPath, ".see-code");
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, "result.json");
  const diffPath = path.join(outputDir, "result-diff.json");
  const changeSummaryPath = path.join(input.result.rootPath, "docs", "CHANGE_SUMMARY.md");
  const previous = await readJson(outputPath);
  const next = toResultJson(input);
  const diff = buildResultDiff(previous, next);

  await fs.mkdir(path.dirname(changeSummaryPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await fs.writeFile(diffPath, `${JSON.stringify(diff, null, 2)}\n`, "utf8");
  await fs.writeFile(changeSummaryPath, `${renderChangeSummary(diff).trim()}\n`, "utf8");

  return {
    resultPath: outputPath,
    diffPath,
    changeSummaryPath
  };
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
    scan: result.scan,
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
    resources: classUnit.resources,
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

async function readJson(filePath: string): Promise<Record<string, unknown> | undefined> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8")) as Record<string, unknown>;
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

function buildResultDiff(
  previous: Record<string, unknown> | undefined,
  next: Record<string, unknown>
): ResultDiff {
  if (!previous) {
    return emptyBaselineDiff(next);
  }

  const fileChanges = diffByKey(
    files(previous),
    files(next),
    (file) => file.path,
    (file) => stableStringify(file)
  );
  const methodChanges = diffByKey(
    methods(previous),
    methods(next),
    (method) => method.key,
    (method) => stableStringify(method.fingerprint)
  );
  const entrypointChanges = diffByKey(
    entrypoints(previous),
    entrypoints(next),
    (entrypoint) => entrypoint.key,
    (entrypoint) => stableStringify(entrypoint)
  );
  const resourceChanges = diffByKey(
    resources(previous),
    resources(next),
    (resource) => resource,
    (resource) => resource
  );
  const businessFlowChanges = diffByKey(
    businessFlows(previous),
    businessFlows(next),
    (flow) => flow,
    (flow) => flow
  );

  return {
    schemaVersion: RESULT_DIFF_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    baseline: false,
    fromGeneratedAt: stringField(previous, "generatedAt"),
    toGeneratedAt: stringField(next, "generatedAt") ?? "",
    summary: {
      addedFiles: fileChanges.added.length,
      removedFiles: fileChanges.removed.length,
      modifiedFiles: fileChanges.modified.length,
      addedMethods: methodChanges.added.length,
      removedMethods: methodChanges.removed.length,
      modifiedMethods: methodChanges.modified.length,
      addedEntrypoints: entrypointChanges.added.length,
      removedEntrypoints: entrypointChanges.removed.length,
      addedResources: resourceChanges.added.length,
      removedResources: resourceChanges.removed.length,
      addedBusinessFlows: businessFlowChanges.added.length,
      removedBusinessFlows: businessFlowChanges.removed.length,
      qualityScoreBefore: qualityScore(previous),
      qualityScoreAfter: qualityScore(next)
    },
    changes: {
      files: fileChanges,
      methods: methodChanges,
      entrypoints: entrypointChanges,
      resources: resourceChanges,
      businessFlows: businessFlowChanges
    }
  };
}

function emptyBaselineDiff(next: Record<string, unknown>): ResultDiff {
  return {
    schemaVersion: RESULT_DIFF_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    baseline: true,
    toGeneratedAt: stringField(next, "generatedAt") ?? "",
    summary: {
      addedFiles: 0,
      removedFiles: 0,
      modifiedFiles: 0,
      addedMethods: 0,
      removedMethods: 0,
      modifiedMethods: 0,
      addedEntrypoints: 0,
      removedEntrypoints: 0,
      addedResources: 0,
      removedResources: 0,
      addedBusinessFlows: 0,
      removedBusinessFlows: 0,
      qualityScoreAfter: qualityScore(next)
    },
    changes: {
      files: emptyChangeSet(),
      methods: emptyChangeSet(),
      entrypoints: emptyChangeSet(),
      resources: emptyChangeSet(),
      businessFlows: emptyChangeSet()
    }
  };
}

function diffByKey<T>(
  previousItems: T[],
  nextItems: T[],
  keyFn: (item: T) => string,
  fingerprintFn: (item: T) => string
): ChangeSet<T> {
  const previous = new Map(previousItems.map((item) => [keyFn(item), item]));
  const next = new Map(nextItems.map((item) => [keyFn(item), item]));
  const added: T[] = [];
  const removed: T[] = [];
  const modified: T[] = [];

  for (const [key, item] of next) {
    const previousItem = previous.get(key);
    if (!previousItem) {
      added.push(item);
      continue;
    }
    if (fingerprintFn(previousItem) !== fingerprintFn(item)) {
      modified.push(item);
    }
  }

  for (const [key, item] of previous) {
    if (!next.has(key)) {
      removed.push(item);
    }
  }

  return { added, removed, modified };
}

function emptyChangeSet<T>(): ChangeSet<T> {
  return {
    added: [],
    removed: [],
    modified: []
  };
}

function files(result: Record<string, unknown>): FileDiffEntry[] {
  return arrayField(result, "files").map((file) => {
    const record = objectRecord(file);
    return {
      path: String(record.relativePath ?? ""),
      language: stringValue(record.language),
      bytes: numberValue(record.bytes)
    };
  }).filter((file) => file.path);
}

function methods(result: Record<string, unknown>): Array<MethodDiffEntry & { fingerprint: Record<string, unknown> }> {
  return arrayField(result, "methods").map((method) => {
    const record = objectRecord(method);
    const modulePath = String(record.modulePath ?? "");
    const className = stringValue(record.className);
    const name = String(record.name ?? "");
    const signature = stringValue(record.signature);
    return {
      key: [modulePath, className ?? "", name, signature ?? ""].join("#"),
      name,
      modulePath,
      className,
      signature,
      fingerprint: {
        summary: record.summary,
        calls: record.calls,
        resources: record.resources,
        frameworkHints: record.frameworkHints,
        entrypointHints: record.entrypointHints,
        semantic: record.semantic
      }
    };
  }).filter((method) => method.name && method.modulePath);
}

function entrypoints(result: Record<string, unknown>): EntrypointDiffEntry[] {
  return methods(result).flatMap((method) => {
    const methodRecord = arrayField(result, "methods")
      .map(objectRecord)
      .find((item) => {
        const key = [
          String(item.modulePath ?? ""),
          stringValue(item.className) ?? "",
          String(item.name ?? ""),
          stringValue(item.signature) ?? ""
        ].join("#");
        return key === method.key;
      });

    return arrayField(methodRecord ?? {}, "entrypointHints").map((hint) => {
      const hintRecord = objectRecord(hint);
      const kind = String(hintRecord.kind ?? "unknown");
      const protocol = stringValue(hintRecord.protocol);
      const httpMethod = stringValue(hintRecord.method);
      const routePath = stringValue(hintRecord.path);
      return {
        key: [method.key, kind, protocol ?? "", httpMethod ?? "", routePath ?? ""].join("#"),
        methodName: method.name,
        modulePath: method.modulePath,
        kind,
        protocol,
        method: httpMethod,
        path: routePath
      };
    });
  });
}

function resources(result: Record<string, unknown>): string[] {
  return arrayField(result, "resources")
    .map((resource) => String(objectRecord(resource).name ?? ""))
    .filter(Boolean)
    .sort();
}

function businessFlows(result: Record<string, unknown>): string[] {
  const overview = objectField(result, "semanticOverview");
  return arrayField(overview, "businessFlows")
    .map((flow) => String(objectRecord(flow).name ?? ""))
    .filter(Boolean)
    .sort();
}

function renderChangeSummary(diff: ResultDiff): string {
  if (diff.baseline) {
    return [
      "# Change Summary",
      "",
      "This is the first structured analysis baseline. Future runs will compare against this result.",
      "",
      "## Quality",
      "",
      `- Current score: ${diff.summary.qualityScoreAfter ?? "unknown"}/100`
    ].join("\n");
  }

  return [
    "# Change Summary",
    "",
    `Compared previous result \`${diff.fromGeneratedAt ?? "unknown"}\` with current result \`${diff.toGeneratedAt}\`.`,
    "",
    "## Summary",
    "",
    `- Files: +${diff.summary.addedFiles} / -${diff.summary.removedFiles} / ~${diff.summary.modifiedFiles}`,
    `- Methods: +${diff.summary.addedMethods} / -${diff.summary.removedMethods} / ~${diff.summary.modifiedMethods}`,
    `- Entrypoints: +${diff.summary.addedEntrypoints} / -${diff.summary.removedEntrypoints}`,
    `- Resources: +${diff.summary.addedResources} / -${diff.summary.removedResources}`,
    `- Business flows: +${diff.summary.addedBusinessFlows} / -${diff.summary.removedBusinessFlows}`,
    `- Quality: ${diff.summary.qualityScoreBefore ?? "unknown"}/100 -> ${diff.summary.qualityScoreAfter ?? "unknown"}/100`,
    "",
    "## Added Methods",
    "",
    renderMethodList(diff.changes.methods.added),
    "",
    "## Removed Methods",
    "",
    renderMethodList(diff.changes.methods.removed),
    "",
    "## Modified Methods",
    "",
    renderMethodList(diff.changes.methods.modified),
    "",
    "## Entrypoints",
    "",
    renderEntrypointList("Added", diff.changes.entrypoints.added),
    "",
    renderEntrypointList("Removed", diff.changes.entrypoints.removed),
    "",
    "## Resources",
    "",
    renderStringChange("Added", diff.changes.resources.added),
    "",
    renderStringChange("Removed", diff.changes.resources.removed)
  ].join("\n");
}

function renderMethodList(methods: MethodDiffEntry[]): string {
  if (methods.length === 0) {
    return "- 无";
  }
  return methods.slice(0, 50).map((method) =>
    `- ${method.modulePath}: ${method.className ? `${method.className}#` : ""}${method.name}`
  ).join("\n");
}

function renderEntrypointList(label: string, entrypoints: EntrypointDiffEntry[]): string {
  if (entrypoints.length === 0) {
    return `- ${label}: 无`;
  }
  return entrypoints.slice(0, 50).map((entrypoint) =>
    `- ${label}: ${entrypoint.modulePath}: ${entrypoint.methodName} (${entrypoint.kind}${entrypoint.path ? ` ${entrypoint.path}` : ""})`
  ).join("\n");
}

function renderStringChange(label: string, values: string[]): string {
  if (values.length === 0) {
    return `- ${label}: 无`;
  }
  return values.slice(0, 50).map((value) => `- ${label}: ${value}`).join("\n");
}

function qualityScore(result: Record<string, unknown>): number | undefined {
  return numberValue(objectField(result, "quality").score);
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  return stringValue(record[key]);
}

function objectField(record: Record<string, unknown>, key: string): Record<string, unknown> {
  return objectRecord(record[key]);
}

function arrayField(record: Record<string, unknown>, key: string): unknown[] {
  const value = record[key];
  return Array.isArray(value) ? value : [];
}

function objectRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (typeof value === "object" && value !== null) {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
