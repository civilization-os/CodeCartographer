export type SourceLanguage =
  | "typescript"
  | "javascript"
  | "java"
  | "markdown"
  | "json"
  | "unknown";

export type UnitLevel = "method" | "class" | "module" | "resource";

export type RelationKind =
  | "calls"
  | "reads"
  | "writes"
  | "publishes"
  | "consumes"
  | "deletes"
  | "depends_on"
  | "contains";

export interface SourceFileInfo {
  absolutePath: string;
  relativePath: string;
  language: SourceLanguage;
  bytes: number;
}

export interface SourceLocation {
  file: string;
  startLine: number;
  endLine: number;
}

export interface MethodUnit {
  id: string;
  name: string;
  signature: string;
  className?: string;
  modulePath: string;
  location: SourceLocation;
  language: SourceLanguage;
  parameters: MethodParameter[];
  returnType?: string;
  visibility?: "public" | "protected" | "private" | "package" | "unknown";
  modifiers: string[];
  annotations: string[];
  isAsync: boolean;
  isStatic: boolean;
  calls: string[];
  resources: string[];
  frameworkHints: FrameworkHint[];
  entrypointHints: EntrypointHint[];
  summary: string;
  source?: string;
  semantic?: MethodSemantic;
}

export interface MethodParameter {
  name: string;
  type?: string;
  optional?: boolean;
  defaultValue?: string;
}

export interface FrameworkHint {
  kind:
    | "http_route"
    | "http_client"
    | "message_consumer"
    | "message_producer"
    | "scheduled_job"
    | "persistence"
    | "environment"
    | "framework"
    | "unknown";
  framework?: string;
  name?: string;
  value?: string;
  metadata?: Record<string, string>;
}

export interface EntrypointHint {
  kind: "http_route" | "message_consumer" | "scheduled_job" | "cli" | "test" | "unknown";
  protocol?: "http" | "message" | "timer" | "cli" | "test" | "unknown";
  method?: string;
  path?: string;
  source: "syntax" | "framework" | "heuristic";
  description?: string;
}

export interface MethodSemantic {
  summary: string;
  responsibilities: string[];
  sideEffects: string[];
  dataAndResources: string[];
  confidence: "low" | "medium" | "high";
  analyzer: "heuristic" | "llm";
}

export interface ClassUnit {
  id: string;
  name: string;
  modulePath: string;
  location: SourceLocation;
  methods: MethodUnit[];
  resources: string[];
  summary: string;
}

export interface ModuleUnit {
  id: string;
  path: string;
  language: SourceLanguage;
  classes: ClassUnit[];
  methods: MethodUnit[];
  imports: string[];
  summary: string;
}

export interface ResourceNode {
  id: string;
  name: string;
  kind: "file" | "database" | "http" | "message" | "env" | "unknown";
}

export interface RelationEdge {
  from: string;
  to: string;
  kind: RelationKind;
  weight: number;
  label?: string;
}

export interface RelationGraph {
  nodes: Array<{
    id: string;
    label: string;
    level: UnitLevel;
  }>;
  edges: RelationEdge[];
}

export interface AnalysisResult {
  rootPath: string;
  scannedAt: string;
  model?: ModelRuntimeInfo;
  modelConfig?: unknown;
  scan?: ScanRuntimeInfo;
  files: SourceFileInfo[];
  modules: ModuleUnit[];
  methods: MethodUnit[];
  classes: ClassUnit[];
  resources: ResourceNode[];
  graph: RelationGraph;
}

export interface ScanRuntimeInfo {
  exclude: string[];
  maxFileBytes: number;
  configPath?: string;
}

export type ModelProvider =
  | "none"
  | "openai"
  | "deepseek"
  | "anthropic"
  | "openai-compatible"
  | "anthropic-compatible";

export interface ModelRuntimeInfo {
  enabled: boolean;
  provider: ModelProvider;
  model?: string;
  baseUrl?: string;
  limit?: number;
  cacheEnabled?: boolean;
}

export interface BusinessFlowCandidate {
  name: string;
  entrypoint: MethodUnit;
  entrypointHint: EntrypointHint;
  steps: MethodUnit[];
  resources: string[];
}
