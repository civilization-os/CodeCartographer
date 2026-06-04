import type { ClassUnit, MethodParameter, MethodUnit, ModuleUnit } from "../core/types.js";
import { stableId } from "../utils/path.js";

interface RepositoryClassRef {
  module: ModuleUnit;
  classUnit: ClassUnit;
  entityName?: string;
}

interface RepositoryOperationRef {
  repositoryName: string;
  operation: string;
}

export function addSyntheticRepositoryMethods(modules: ModuleUnit[]): ModuleUnit[] {
  const repositories = indexRepositoryClasses(modules);
  const existingMethods = new Set(
    modules
      .flatMap((module) => module.methods)
      .map((method) => method.className ? `${method.className}.${method.name}` : method.name)
  );
  const operations = collectRepositoryOperations(modules, repositories);

  for (const operationRef of operations) {
    const repository = repositories.get(operationRef.repositoryName);
    if (!repository) {
      continue;
    }
    const methodKey = `${operationRef.repositoryName}.${operationRef.operation}`;
    if (existingMethods.has(methodKey)) {
      continue;
    }

    const method = buildSyntheticRepositoryMethod(repository, operationRef.operation);
    repository.classUnit.methods.push(method);
    repository.module.methods.push(method);
    existingMethods.add(methodKey);
  }

  return modules;
}

function indexRepositoryClasses(modules: ModuleUnit[]): Map<string, RepositoryClassRef> {
  const repositories = new Map<string, RepositoryClassRef>();

  for (const module of modules) {
    for (const classUnit of module.classes) {
      if (!classUnit.resources.includes(`REPOSITORY:${classUnit.name}`)) {
        continue;
      }

      repositories.set(classUnit.name, {
        module,
        classUnit,
        entityName: classUnit.resources
          .find((resource) => resource.startsWith("ENTITY:"))
          ?.slice("ENTITY:".length)
      });
    }
  }

  return repositories;
}

function collectRepositoryOperations(
  modules: ModuleUnit[],
  repositories: Map<string, RepositoryClassRef>
): RepositoryOperationRef[] {
  const operations = new Map<string, RepositoryOperationRef>();

  for (const method of modules.flatMap((module) => module.methods)) {
    for (const call of method.calls) {
      const operation = parseRepositoryCall(call);
      if (operation && repositories.has(operation.repositoryName)) {
        operations.set(`${operation.repositoryName}.${operation.operation}`, operation);
      }
    }

    for (const resource of method.resources) {
      const operation = parseRepositoryResource(resource);
      if (operation && repositories.has(operation.repositoryName)) {
        operations.set(`${operation.repositoryName}.${operation.operation}`, operation);
      }
    }
  }

  return [...operations.values()].sort((a, b) =>
    `${a.repositoryName}.${a.operation}`.localeCompare(`${b.repositoryName}.${b.operation}`)
  );
}

function parseRepositoryCall(call: string): RepositoryOperationRef | undefined {
  const match = /^([A-Za-z_$][\w$]*(?:Repository|Repo|Dao|Mapper))\.([A-Za-z_$][\w$]*)$/.exec(call);
  if (!match || !repositoryOperationIntent(match[2])) {
    return undefined;
  }
  return {
    repositoryName: match[1],
    operation: match[2]
  };
}

function parseRepositoryResource(resource: string): RepositoryOperationRef | undefined {
  const match = /^DB_(?:READ|WRITE|DELETE):([A-Za-z_$][\w$]*(?:Repository|Repo|Dao|Mapper))\.([A-Za-z_$][\w$]*)$/.exec(resource);
  if (!match || !repositoryOperationIntent(match[2])) {
    return undefined;
  }
  return {
    repositoryName: match[1],
    operation: match[2]
  };
}

function buildSyntheticRepositoryMethod(
  repository: RepositoryClassRef,
  operation: string
): MethodUnit {
  const intent = repositoryOperationIntent(operation);
  const resources = [
    intent ? `${intent}:${repository.classUnit.name}.${operation}` : undefined,
    ...repository.classUnit.resources
  ].filter((resource): resource is string => Boolean(resource));

  return {
    id: stableId("method", repository.classUnit.modulePath, repository.classUnit.name, operation, "synthetic"),
    name: operation,
    signature: `${operation}(${syntheticParameters(operation, repository.entityName).map((parameter) =>
      `${parameter.type ?? "unknown"} ${parameter.name}`
    ).join(", ")})${syntheticReturnType(operation, repository.entityName) ? `: ${syntheticReturnType(operation, repository.entityName)}` : ""}`,
    className: repository.classUnit.name,
    modulePath: repository.classUnit.modulePath,
    location: repository.classUnit.location,
    language: "java",
    parameters: syntheticParameters(operation, repository.entityName),
    returnType: syntheticReturnType(operation, repository.entityName),
    visibility: "public",
    modifiers: ["synthetic"],
    annotations: [],
    isAsync: false,
    isStatic: false,
    calls: [],
    resources: [...new Set(resources)].sort(),
    frameworkHints: [
      {
        kind: "persistence",
        framework: "spring-data",
        value: repository.classUnit.name
      }
    ],
    entrypointHints: [],
    summary: `${repository.classUnit.name}#${operation} 表示 Spring Data 继承或派生的仓储操作。`
  };
}

function syntheticParameters(operation: string, entityName: string | undefined): MethodParameter[] {
  if (/^(save|create|insert|update|merge|persist|delete|remove)$/i.test(operation)) {
    return [
      {
        name: "entity",
        type: entityName ?? "Object"
      }
    ];
  }
  if (/^(findById|getById|deleteById|existsById)$/i.test(operation)) {
    return [
      {
        name: "id",
        type: "ID"
      }
    ];
  }
  return [];
}

function syntheticReturnType(operation: string, entityName: string | undefined): string | undefined {
  if (/^(save|create|insert|update|merge|persist)$/i.test(operation)) {
    return entityName ?? "Object";
  }
  if (/^(findById|getById)$/i.test(operation)) {
    return `Optional<${entityName ?? "Object"}>`;
  }
  if (/^(findAll|readAll|listAll)$/i.test(operation)) {
    return `Iterable<${entityName ?? "Object"}>`;
  }
  if (/^(count)$/i.test(operation)) {
    return "long";
  }
  if (/^(exists|existsById)$/i.test(operation)) {
    return "boolean";
  }
  if (/^(delete|remove|deleteById)$/i.test(operation)) {
    return "void";
  }
  return undefined;
}

function repositoryOperationIntent(operation: string): string | undefined {
  if (/^(find|get|read|query|count|exists|search|load)/i.test(operation)) {
    return "DB_READ";
  }
  if (/^(save|create|insert|update|merge|persist)/i.test(operation)) {
    return "DB_WRITE";
  }
  if (/^(delete|remove)/i.test(operation)) {
    return "DB_DELETE";
  }
  return undefined;
}
