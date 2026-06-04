import type {
  AnalysisResult,
  BusinessFlowCandidate,
  MethodUnit,
  ModuleUnit,
  RelationEdge
} from "../core/types.js";

export interface SemanticOverview {
  purpose: string;
  moduleGroups: ModuleGroup[];
  entrypoints: EntrypointSummary[];
  flows: FlowSummary[];
  businessFlows: BusinessFlowCandidate[];
  resourceUsage: ResourceUsageSummary[];
  hotMethods: MethodUnit[];
  callEdges: RelationEdge[];
}

export interface ModuleGroup {
  name: string;
  modules: ModuleUnit[];
  summary: string;
  responsibilities: string[];
}

export interface EntrypointSummary {
  method: MethodUnit;
  fanOut: number;
  reason: string;
}

export interface FlowSummary {
  name: string;
  entrypoint: MethodUnit;
  steps: MethodUnit[];
  resources: string[];
}

export interface ResourceUsageSummary {
  resource: string;
  methods: MethodUnit[];
}

export function buildSemanticOverview(result: AnalysisResult): SemanticOverview {
  const callEdges = result.graph.edges.filter((edge) => edge.kind === "calls");
  const methodById = new Map(result.methods.map((method) => [method.id, method]));
  const incoming = countEdges(callEdges, "to");
  const outgoing = countEdges(callEdges, "from");

  const entrypoints = result.methods
    .filter(
      (method) =>
        !method.className &&
        (incoming.get(method.id) ?? 0) === 0 &&
        (outgoing.get(method.id) ?? 0) >= 2
    )
    .sort((a, b) => (outgoing.get(b.id) ?? 0) - (outgoing.get(a.id) ?? 0))
    .slice(0, 12)
    .map((method) => ({
      method,
      fanOut: outgoing.get(method.id) ?? 0,
      reason: "没有已解析的内部调用者，并且存在已解析的下游调用。"
    }));

  const hotMethods = result.methods
    .filter((method) => (incoming.get(method.id) ?? 0) + (outgoing.get(method.id) ?? 0) > 0)
    .sort(
      (a, b) =>
        (incoming.get(b.id) ?? 0) +
        (outgoing.get(b.id) ?? 0) -
        ((incoming.get(a.id) ?? 0) + (outgoing.get(a.id) ?? 0))
    )
    .slice(0, 12);

  return {
    purpose: inferPurpose(result.modules),
    moduleGroups: groupModules(result.modules),
    entrypoints,
    flows: buildFlows(entrypoints, callEdges, methodById),
    businessFlows: buildBusinessFlows(result.methods, callEdges, methodById),
    resourceUsage: buildResourceUsage(result.methods),
    hotMethods,
    callEdges
  };
}

function buildBusinessFlows(
  methods: MethodUnit[],
  callEdges: RelationEdge[],
  methodById: Map<string, MethodUnit>
): BusinessFlowCandidate[] {
  const outgoing = new Map<string, RelationEdge[]>();
  for (const edge of callEdges) {
    outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge]);
  }

  return methods
    .flatMap((method) =>
      method.entrypointHints.map((hint) => {
        const steps = walkFlow(method, outgoing, methodById);
        const resources = [
          ...new Set([
            ...steps.flatMap((step) => step.resources),
            ...steps.flatMap((step) =>
              step.frameworkHints
                .filter((frameworkHint) => frameworkHint.value)
                .map((frameworkHint) => `${frameworkHint.kind}:${frameworkHint.value}`)
            )
          ])
        ].sort();

        return {
          name: hint.description ?? formatMethodName(method),
          entrypoint: method,
          entrypointHint: hint,
          steps,
          resources
        };
      })
    )
    .slice(0, 20);
}

function groupModules(modules: ModuleUnit[]): ModuleGroup[] {
  const groups = new Map<string, ModuleUnit[]>();

  for (const module of modules) {
    const groupName = inferGroupName(module);
    groups.set(groupName, [...(groups.get(groupName) ?? []), module]);
  }

  return [...groups.entries()]
    .map(([name, groupModules]) => ({
      name,
      modules: groupModules,
      summary: summarizeGroup(name, groupModules),
      responsibilities: summarizeResponsibilities(groupModules)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function inferGroupName(module: ModuleUnit): string {
  const parts = module.path.split("/");
  if (module.path === "package.json" || module.path.endsWith("config.json")) {
    return "Configuration";
  }
  if (module.language === "markdown") {
    return "Documentation";
  }
  if (parts[0] === "src" && parts.length > 2) {
    return parts[1];
  }
  if (parts[0] === "src") {
    return "Application";
  }
  return "Project Files";
}

function inferPurpose(modules: ModuleUnit[]): string {
  const sourceModules = modules.filter((module) => module.methods.length > 0);
  const methodSummaries = sourceModules
    .flatMap((module) => module.methods)
    .slice(0, 8)
    .map((method) => method.summary);

  if (methodSummaries.length === 0) {
    return "该仓库包含项目文档和配置文件。";
  }

  return "该仓库实现代码分析与文档生成流水线：扫描源文件、抽取模块和方法结构、增强方法语义、构建关系图，并写出工程文档。";
}

function summarizeGroup(name: string, modules: ModuleUnit[]): string {
  const methodCount = modules.reduce((sum, module) => sum + module.methods.length, 0);
  const classCount = modules.reduce((sum, module) => sum + module.classes.length, 0);
  return `${name} 区域包含 ${modules.length} 个模块、${classCount} 个类和 ${methodCount} 个方法单元。`;
}

function summarizeResponsibilities(modules: ModuleUnit[]): string[] {
  return modules
    .flatMap((module) => module.methods)
    .slice(0, 5)
    .map((method) => method.summary);
}

function buildFlows(
  entrypoints: EntrypointSummary[],
  callEdges: RelationEdge[],
  methodById: Map<string, MethodUnit>
): FlowSummary[] {
  const outgoing = new Map<string, RelationEdge[]>();
  for (const edge of callEdges) {
    outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge]);
  }

  return entrypoints.slice(0, 8).map((entrypoint) => {
    const steps = walkFlow(entrypoint.method, outgoing, methodById);
    const resources = [...new Set(steps.flatMap((method) => method.resources))].sort();
    return {
      name: formatMethodName(entrypoint.method),
      entrypoint: entrypoint.method,
      steps,
      resources
    };
  });
}

function walkFlow(
  entrypoint: MethodUnit,
  outgoing: Map<string, RelationEdge[]>,
  methodById: Map<string, MethodUnit>
): MethodUnit[] {
  const steps: MethodUnit[] = [];
  const seen = new Set<string>();
  const queue = [entrypoint.id];

  while (queue.length > 0 && steps.length < 10) {
    const id = queue.shift();
    if (!id || seen.has(id)) {
      continue;
    }
    seen.add(id);

    const method = methodById.get(id);
    if (method) {
      steps.push(method);
    }

    for (const edge of outgoing.get(id) ?? []) {
      if (!seen.has(edge.to)) {
        queue.push(edge.to);
      }
    }
  }

  return steps;
}

function buildResourceUsage(methods: MethodUnit[]): ResourceUsageSummary[] {
  const usage = new Map<string, MethodUnit[]>();

  for (const method of methods) {
    for (const resource of method.resources) {
      if (isInternalResource(resource)) {
        continue;
      }
      usage.set(resource, [...(usage.get(resource) ?? []), method]);
    }
  }

  return [...usage.entries()]
    .map(([resource, resourceMethods]) => ({
      resource,
      methods: resourceMethods
    }))
    .sort((a, b) => a.resource.localeCompare(b.resource));
}

export function isInternalResource(resource: string): boolean {
  return resource === "FILE:method-semantics.json" || resource.includes(".see-code");
}

function countEdges(
  edges: RelationEdge[],
  key: "from" | "to"
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const edge of edges) {
    counts.set(edge[key], (counts.get(edge[key]) ?? 0) + 1);
  }
  return counts;
}

export function formatMethodName(method: MethodUnit): string {
  return method.className ? `${method.className}#${method.name}` : method.name;
}
