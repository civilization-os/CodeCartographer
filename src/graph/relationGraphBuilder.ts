import type {
  MethodUnit,
  ModuleUnit,
  RelationEdge,
  RelationGraph,
  ResourceNode
} from "../core/types.js";
import { stableId } from "../utils/path.js";

export function buildRelationGraph(
  modules: ModuleUnit[],
  resources: ResourceNode[]
): RelationGraph {
  const nodes = new Map<RelationGraph["nodes"][number]["id"], RelationGraph["nodes"][number]>();
  const edges: RelationEdge[] = [];
  const methods = modules.flatMap((module) => module.methods);
  const methodNameIndex = buildMethodNameIndex(methods);

  for (const module of modules) {
    nodes.set(module.id, {
      id: module.id,
      label: module.path,
      level: "module"
    });

    for (const classUnit of module.classes) {
      nodes.set(classUnit.id, {
        id: classUnit.id,
        label: classUnit.name,
        level: "class"
      });
      edges.push({
        from: module.id,
        to: classUnit.id,
        kind: "contains",
        weight: 1
      });

      for (const resource of classUnit.resources) {
        const resourceId = stableId("resource", resource);
        nodes.set(resourceId, {
          id: resourceId,
          label: resource,
          level: "resource"
        });
        edges.push({
          from: classUnit.id,
          to: resourceId,
          kind: "depends_on",
          weight: 2,
          label: resource
        });
      }
    }

    for (const method of module.methods) {
      nodes.set(method.id, {
        id: method.id,
        label: method.className ? `${method.className}#${method.name}` : method.name,
        level: "method"
      });
      edges.push({
        from: method.className
          ? stableId("class", method.modulePath, method.className)
          : module.id,
        to: method.id,
        kind: "contains",
        weight: 1
      });

      for (const call of method.calls) {
        const target = resolveCallTarget(call, methodNameIndex);
        if (!target) {
          continue;
        }
        edges.push({
          from: method.id,
          to: target.id,
          kind: "calls",
          weight: scoreCall(call),
          label: call
        });
      }

      for (const resource of method.resources) {
        const resourceId = stableId("resource", resource);
        nodes.set(resourceId, {
          id: resourceId,
          label: resource,
          level: "resource"
        });
        edges.push({
          from: method.id,
          to: resourceId,
          kind: relationKindForResource(resource),
          weight: 2,
          label: resource
        });
      }
    }
  }

  for (const resource of resources) {
    nodes.set(resource.id, {
      id: resource.id,
      label: resource.name,
      level: "resource"
    });
  }

  return {
    nodes: [...nodes.values()],
    edges: dedupeEdges(edges)
  };
}

export function extractResources(modules: ModuleUnit[]): ResourceNode[] {
  const resources = new Map<string, ResourceNode>();

  for (const classUnit of modules.flatMap((module) => module.classes)) {
    for (const resource of classUnit.resources) {
      const id = stableId("resource", resource);
      resources.set(id, {
        id,
        name: resource,
        kind: resourceKind(resource)
      });
    }
  }

  for (const method of modules.flatMap((module) => module.methods)) {
    for (const resource of method.resources) {
      const id = stableId("resource", resource);
      resources.set(id, {
        id,
        name: resource,
        kind: resourceKind(resource)
      });
    }
  }

  return [...resources.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function buildMethodNameIndex(methods: MethodUnit[]): Map<string, MethodUnit[]> {
  const index = new Map<string, MethodUnit[]>();

  for (const method of methods) {
    const keys = new Set([
      method.name,
      method.className ? `${method.className}.${method.name}` : method.name,
      method.className ? `${method.className}#${method.name}` : method.name
    ]);

    for (const key of keys) {
      const existing = index.get(key) ?? [];
      existing.push(method);
      index.set(key, existing);
    }
  }

  return index;
}

function resolveCallTarget(
  call: string,
  index: Map<string, MethodUnit[]>
): MethodUnit | undefined {
  const direct = index.get(call);
  if (direct?.length === 1) {
    return direct[0];
  }

  if (call.includes(".")) {
    return undefined;
  }

  const lastSegment = call.split(".").at(-1);
  if (!lastSegment) {
    return undefined;
  }

  const byName = index.get(lastSegment);
  return byName?.length === 1 ? byName[0] : undefined;
}

function scoreCall(call: string): number {
  if (/save|create|update|delete|publish|send|write|insert/i.test(call)) {
    return 3;
  }
  if (/log|debug|trace/i.test(call)) {
    return 0.2;
  }
  return 1;
}

function resourceKind(resource: string): ResourceNode["kind"] {
  if (resource.startsWith("HTTP:")) {
    return "http";
  }
  if (resource.startsWith("ENV:")) {
    return "env";
  }
  if (
    resource.startsWith("ENTITY:") ||
    resource.startsWith("REPOSITORY:") ||
    resource.startsWith("TABLE:") ||
    resource.startsWith("DB_READ:") ||
    resource.startsWith("DB_WRITE:") ||
    resource.startsWith("DB_DELETE:")
  ) {
    return "database";
  }
  if (resource.startsWith("FILE:")) {
    return "file";
  }
  return "unknown";
}

function relationKindForResource(resource: string): RelationEdge["kind"] {
  if (resource.startsWith("HTTP:")) {
    return "depends_on";
  }
  if (resource.startsWith("DB_WRITE:")) {
    return "writes";
  }
  if (resource.startsWith("DB_DELETE:")) {
    return "deletes";
  }
  return "reads";
}

function dedupeEdges(edges: RelationEdge[]): RelationEdge[] {
  const seen = new Set<string>();
  const result: RelationEdge[] = [];

  for (const edge of edges) {
    const key = `${edge.from}->${edge.to}:${edge.kind}:${edge.label ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(edge);
    }
  }

  return result;
}
