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
        (incoming.get(method.id) ?? 0) === 0 &&
        (outgoing.get(method.id) ?? 0) >= 1
    )
    .sort((a, b) => (outgoing.get(b.id) ?? 0) - (outgoing.get(a.id) ?? 0))
    .slice(0, 12)
    .map((method) => ({
      method,
      fanOut: outgoing.get(method.id) ?? 0,
      reason: "没有已解析的内部调用者，并且至少存在一个已解析的下游调用。"
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
  if (module.language === "java") {
    return inferJavaGroupName(parts);
  }
  if (parts[0] === "src" && parts.length > 2) {
    return parts[1];
  }
  if (parts[0] === "src") {
    return "Application";
  }
  return "Project Files";
}

function inferJavaGroupName(parts: string[]): string {
  for (let index = 0; index < parts.length - 3; index += 1) {
    const isJavaSourceRoot =
      parts[index] === "src" &&
      (parts[index + 1] === "main" || parts[index + 1] === "test") &&
      parts[index + 2] === "java";
    if (!isJavaSourceRoot) {
      continue;
    }

    const packageParts = parts.slice(index + 3, -1);
    if (packageParts.length > 0) {
      return packageParts.at(-1) ?? "Java";
    }
    return parts[index + 1] === "test" ? "Java Tests" : "Java Application";
  }

  return parts.length > 1 ? parts[parts.length - 2] : "Java";
}

function inferPurpose(modules: ModuleUnit[]): string {
  const sourceModules = modules.filter((module) => module.methods.length > 0);
  const methods = sourceModules.flatMap((module) => module.methods);

  if (methods.length === 0) {
    return "该仓库包含项目文档和配置文件。";
  }

  const languages = new Set(sourceModules.map((module) => module.language));
  const imports = modules.flatMap((module) => module.imports);
  const resources = collectResourceNames(modules);
  const entityNames = resources
    .filter((resource) => resource.startsWith("ENTITY:"))
    .map((resource) => resource.slice("ENTITY:".length))
    .filter((name) => !["BaseEntity", "NamedEntity"].includes(name));
  const repositoryCount = resources.filter((resource) => resource.startsWith("REPOSITORY:")).length;
  const databaseCount = resources.filter((resource) =>
    /^(DB_READ|DB_WRITE|DB_DELETE|ENTITY|REPOSITORY|TABLE):/.test(resource)
  ).length;
  const httpEntrypointCount = methods.filter((method) =>
    method.entrypointHints.some((hint) => hint.kind === "http_route")
  ).length;
  const cliEntrypointCount = methods.filter((method) =>
    method.entrypointHints.some((hint) => hint.kind === "cli")
  ).length;
  const hasSpring = imports.some((item) => item.startsWith("org.springframework")) ||
    methods.some((method) => method.frameworkHints.some((hint) => hint.framework?.startsWith("spring")));
  const domainGroups = [...new Set(modules.map(inferGroupName))]
    .filter((name) => !["Configuration", "Documentation", "Project Files", "Java Application"].includes(name))
    .slice(0, 5);
  const domainSubject = entityNames.length > 0
    ? `${formatChineseList(entityNames.slice(0, 5))} 等领域对象`
    : `${formatChineseList(domainGroups)} 等模块`;

  if (languages.has("java") && (hasSpring || httpEntrypointCount > 0)) {
    const persistence = databaseCount > 0
      ? `，并通过 ${repositoryCount > 0 ? `${repositoryCount} 个仓储接口和 ` : ""}${databaseCount} 个数据库资源完成持久化访问`
      : "";
    return `该仓库是一个 Java/Spring Web 应用，围绕${domainSubject}提供 ${httpEntrypointCount} 个 HTTP 入口、控制器流程和业务交互${persistence}。`;
  }

  if (languages.has("java")) {
    return `该仓库是一个 Java 工程，围绕 ${domainSubject} 组织类、方法和资源访问逻辑。`;
  }

  if (languages.has("typescript") || languages.has("javascript")) {
    const entrypointText = cliEntrypointCount > 0
      ? `，包含 ${cliEntrypointCount} 个 CLI 入口`
      : "";
    return `该仓库是一个 TypeScript/JavaScript 工程，围绕 ${formatChineseList(domainGroups)} 等模块组织源码结构、调用关系和资源访问${entrypointText}。`;
  }

  return `该仓库包含 ${formatChineseList([...languages])} 源码，当前扫描到 ${methods.length} 个方法单元和 ${resources.length} 个资源。`;
}

function collectResourceNames(modules: ModuleUnit[]): string[] {
  return [
    ...new Set([
      ...modules.flatMap((module) => module.classes).flatMap((classUnit) => classUnit.resources),
      ...modules.flatMap((module) => module.methods).flatMap((method) => method.resources)
    ])
  ].sort();
}

function formatChineseList(items: string[]): string {
  if (items.length === 0) {
    return "核心";
  }
  return items.join("、");
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
