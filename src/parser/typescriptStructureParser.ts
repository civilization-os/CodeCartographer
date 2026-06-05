import fs from "node:fs/promises";
import ts from "typescript";
import type {
  ClassUnit,
  EntrypointHint,
  FrameworkHint,
  MethodUnit,
  MethodParameter,
  ModuleUnit,
  SourceFileInfo,
  SourceLocation
} from "../core/types.js";
import { stableId } from "../utils/path.js";

export async function parseTypeScriptModule(
  file: SourceFileInfo
): Promise<ModuleUnit> {
  const sourceText = await fs.readFile(file.absolutePath, "utf8");
  const scriptKind = file.language === "typescript" ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(
    file.relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

  const imports = extractImports(sourceFile);
  const classes: ClassUnit[] = [];
  const moduleMethods: MethodUnit[] = [];

  function visit(node: ts.Node): void {
    if (ts.isClassDeclaration(node) && node.name) {
      classes.push(extractClassUnit(sourceFile, node, file.relativePath));
      return;
    }

    if (ts.isFunctionDeclaration(node) && node.name) {
      moduleMethods.push(extractFunctionUnit(sourceFile, node, file.relativePath));
      return;
    }

    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.initializer &&
          (ts.isArrowFunction(declaration.initializer) ||
            ts.isFunctionExpression(declaration.initializer))
        ) {
          moduleMethods.push(
            extractVariableFunctionUnit(
              sourceFile,
              declaration.name.text,
              declaration.initializer,
              file.relativePath
            )
          );
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(sourceFile, visit);

  const methods = [...moduleMethods, ...classes.flatMap((item) => item.methods)];
  return {
    id: stableId("module", file.relativePath),
    path: file.relativePath,
    language: file.language,
    imports,
    classes,
    methods,
    summary: summarizeModule(file.relativePath, classes, moduleMethods, imports)
  };
}

function extractImports(sourceFile: ts.SourceFile): string[] {
  const imports: string[] = [];

  sourceFile.forEachChild((node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    }

    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    }
  });

  return [...new Set(imports)].sort();
}

function extractClassUnit(
  sourceFile: ts.SourceFile,
  node: ts.ClassDeclaration,
  modulePath: string
): ClassUnit {
  const className = node.name?.text ?? "AnonymousClass";
  const methods: MethodUnit[] = [];

  for (const member of node.members) {
    if (
      (ts.isMethodDeclaration(member) || ts.isConstructorDeclaration(member)) &&
      member.body
    ) {
      const methodName = ts.isConstructorDeclaration(member)
        ? "constructor"
        : member.name.getText(sourceFile);
      methods.push(
        extractCallableUnit(sourceFile, member, modulePath, methodName, className)
      );
    }
  }

  return {
    id: stableId("class", modulePath, className),
    name: className,
    modulePath,
    location: getLocation(sourceFile, node),
    methods,
    resources: [],
    summary: `${className} 暴露 ${methods.length} 个方法。`
  };
}

function extractFunctionUnit(
  sourceFile: ts.SourceFile,
  node: ts.FunctionDeclaration,
  modulePath: string
): MethodUnit {
  return extractCallableUnit(sourceFile, node, modulePath, node.name?.text ?? "anonymous");
}

function extractVariableFunctionUnit(
  sourceFile: ts.SourceFile,
  name: string,
  node: ts.ArrowFunction | ts.FunctionExpression,
  modulePath: string
): MethodUnit {
  return extractCallableUnit(sourceFile, node, modulePath, name);
}

function extractCallableUnit(
  sourceFile: ts.SourceFile,
  node:
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.ArrowFunction
    | ts.FunctionExpression,
  modulePath: string,
  name: string,
  className?: string
): MethodUnit {
  const calls = extractCalls(sourceFile, node);
  const resources = extractResources(sourceFile, node);
  const signature = buildSignature(sourceFile, node, name);
  const frameworkHints = extractFrameworkHints(sourceFile, node);
  const entrypointHints = extractEntrypointHints(sourceFile, node, name);

  return {
    id: stableId("method", modulePath, className ?? "module", name, String(node.pos)),
    name,
    signature,
    className,
    modulePath,
    location: getLocation(sourceFile, node),
    language: isJavaScriptFile(sourceFile.fileName) ? "javascript" : "typescript",
    parameters: extractParameters(sourceFile, node),
    returnType: extractReturnType(sourceFile, node),
    visibility: extractVisibility(node),
    modifiers: extractModifiers(sourceFile, node),
    annotations: extractAnnotations(sourceFile, node),
    isAsync: hasModifier(node, ts.SyntaxKind.AsyncKeyword),
    isStatic: hasModifier(node, ts.SyntaxKind.StaticKeyword),
    calls,
    resources,
    frameworkHints,
    entrypointHints,
    summary: summarizeMethod(name, calls, resources),
    source: node.getText(sourceFile)
  };
}

function buildSignature(
  sourceFile: ts.SourceFile,
  node:
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.ArrowFunction
    | ts.FunctionExpression,
  name: string
): string {
  const parameters = node.parameters.map((param) => param.getText(sourceFile)).join(", ");
  const returnType = "type" in node && node.type ? `: ${node.type.getText(sourceFile)}` : "";
  return `${name}(${parameters})${returnType}`;
}

function extractParameters(
  sourceFile: ts.SourceFile,
  node:
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.ArrowFunction
    | ts.FunctionExpression
): MethodParameter[] {
  return node.parameters.map((param) => ({
    name: param.name.getText(sourceFile),
    type: param.type?.getText(sourceFile),
    optional: Boolean(param.questionToken),
    defaultValue: param.initializer?.getText(sourceFile)
  }));
}

function extractReturnType(
  sourceFile: ts.SourceFile,
  node:
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.ArrowFunction
    | ts.FunctionExpression
): string | undefined {
  if (ts.isConstructorDeclaration(node)) {
    return undefined;
  }
  return node.type?.getText(sourceFile);
}

function extractModifiers(sourceFile: ts.SourceFile, node: ts.Node): string[] {
  if (!ts.canHaveModifiers(node)) {
    return [];
  }

  return ts.getModifiers(node)?.map((modifier) => modifier.getText(sourceFile)) ?? [];
}

function extractAnnotations(sourceFile: ts.SourceFile, node: ts.Node): string[] {
  if (!ts.canHaveDecorators(node)) {
    return [];
  }

  return ts.getDecorators(node)?.map((decorator) => decorator.getText(sourceFile)) ?? [];
}

function extractVisibility(node: ts.Node): MethodUnit["visibility"] {
  if (hasModifier(node, ts.SyntaxKind.PublicKeyword)) {
    return "public";
  }
  if (hasModifier(node, ts.SyntaxKind.ProtectedKeyword)) {
    return "protected";
  }
  if (hasModifier(node, ts.SyntaxKind.PrivateKeyword)) {
    return "private";
  }
  return "unknown";
}

function hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean {
  if (!ts.canHaveModifiers(node)) {
    return false;
  }

  return ts.getModifiers(node)?.some((modifier) => modifier.kind === kind) ?? false;
}

function extractCalls(sourceFile: ts.SourceFile, root: ts.Node): string[] {
  const calls = new Set<string>();

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      calls.add(formatCallExpression(sourceFile, node.expression));
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(root, visit);
  return [...calls].sort();
}

function formatCallExpression(
  sourceFile: ts.SourceFile,
  expression: ts.LeftHandSideExpression
): string {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }

  if (ts.isPropertyAccessExpression(expression)) {
    const owner = expression.expression;
    if (
      ts.isIdentifier(owner) ||
      owner.kind === ts.SyntaxKind.ThisKeyword ||
      owner.kind === ts.SyntaxKind.SuperKeyword ||
      ts.isPropertyAccessExpression(owner)
    ) {
      return expression.getText(sourceFile);
    }

    return expression.name.text;
  }

  if (ts.isElementAccessExpression(expression)) {
    return expression.argumentExpression?.getText(sourceFile) ?? expression.getText(sourceFile);
  }

  return expression.getText(sourceFile);
}

function extractResources(sourceFile: ts.SourceFile, root: ts.Node): string[] {
  const resources = new Set<string>();

  function visit(node: ts.Node): void {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text;
      if (/^https?:\/\//.test(text)) {
        resources.add(`HTTP:${text}`);
      }
      if (/^[A-Z0-9_]{3,}$/.test(text) && text.includes("_")) {
        resources.add(`ENV:${text}`);
      }
      if (text.length > 4 && !text.startsWith(".") && /\.(json|md|txt|yml|yaml|sql)$/.test(text)) {
        resources.add(`FILE:${text}`);
      }
    }

    if (
      ts.isPropertyAccessExpression(node) &&
      node.getText(sourceFile).startsWith("process.env.")
    ) {
      resources.add(`ENV:${node.name.text}`);
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(root, visit);
  return [...resources].sort();
}

function extractFrameworkHints(sourceFile: ts.SourceFile, root: ts.Node): FrameworkHint[] {
  const hints: FrameworkHint[] = [];

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      const expressionText = node.expression.getText(sourceFile);
      const route = parseHttpRouteCall(sourceFile, node);
      if (route) {
        hints.push({
          kind: "http_route",
          framework: "express-compatible",
          value: route.path,
          metadata: {
            method: route.method
          }
        });
      }

      if (expressionText === "fetch") {
        const firstArg = node.arguments[0];
        hints.push({
          kind: "http_client",
          framework: "fetch",
          value: firstArg ? literalText(sourceFile, firstArg) ?? firstArg.getText(sourceFile) : undefined
        });
      }

      if (expressionText === "cron.schedule") {
        hints.push({
          kind: "scheduled_job",
          framework: "node-cron",
          value: literalText(sourceFile, node.arguments[0])
        });
      }

      if (expressionText === "setInterval" || expressionText === "setTimeout") {
        hints.push({
          kind: "scheduled_job",
          framework: "node-timer",
          value: expressionText
        });
      }
    }

    if (
      ts.isPropertyAccessExpression(node) &&
      node.getText(sourceFile).startsWith("process.env.")
    ) {
      hints.push({
        kind: "environment",
        framework: "node",
        value: node.name.text
      });
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(root, visit);
  return dedupeHints(hints);
}

function extractEntrypointHints(
  sourceFile: ts.SourceFile,
  root: ts.Node,
  name: string
): EntrypointHint[] {
  const hints: EntrypointHint[] = [];

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      const route = parseHttpRouteCall(sourceFile, node);
      if (route) {
        hints.push({
          kind: "http_route",
          protocol: "http",
          method: route.method,
          path: route.path,
          source: "framework",
          description: `${route.method.toUpperCase()} ${route.path}`
        });
      }

      const expressionText = node.expression.getText(sourceFile);
      if (expressionText === "cron.schedule") {
        hints.push({
          kind: "scheduled_job",
          protocol: "timer",
          source: "framework",
          description: "node-cron scheduled job"
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(root, visit);

  if (name === "main") {
    hints.push({
      kind: "cli",
      protocol: "cli",
      source: "heuristic",
      description: "main function"
    });
  }

  return dedupeEntrypoints(hints);
}

function parseHttpRouteCall(
  sourceFile: ts.SourceFile,
  node: ts.CallExpression
): { method: string; path: string } | undefined {
  if (!ts.isPropertyAccessExpression(node.expression)) {
    return undefined;
  }

  const method = node.expression.name.text.toLowerCase();
  if (!["get", "post", "put", "patch", "delete", "all", "use"].includes(method)) {
    return undefined;
  }

  const owner = node.expression.expression.getText(sourceFile);
  if (!["app", "router", "server"].includes(owner) && !owner.endsWith("Router")) {
    return undefined;
  }

  const routePath = literalText(sourceFile, node.arguments[0]);
  if (!routePath) {
    return undefined;
  }

  return {
    method,
    path: routePath
  };
}

function literalText(sourceFile: ts.SourceFile, node: ts.Node | undefined): string | undefined {
  if (!node) {
    return undefined;
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return node.getText(sourceFile);
}

function dedupeHints(hints: FrameworkHint[]): FrameworkHint[] {
  return dedupeBy(hints, (hint) =>
    [hint.kind, hint.framework ?? "", hint.value ?? "", JSON.stringify(hint.metadata ?? {})].join(":")
  );
}

function dedupeEntrypoints(hints: EntrypointHint[]): EntrypointHint[] {
  return dedupeBy(hints, (hint) =>
    [hint.kind, hint.protocol ?? "", hint.method ?? "", hint.path ?? "", hint.description ?? ""].join(":")
  );
}

function dedupeBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

function getLocation(sourceFile: ts.SourceFile, node: ts.Node): SourceLocation {
  const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

  return {
    file: sourceFile.fileName,
    startLine: start.line + 1,
    endLine: end.line + 1
  };
}

function summarizeMethod(name: string, calls: string[], resources: string[]): string {
  const parts = [`${name} 定义一个可调用单元`];
  if (calls.length > 0) {
    parts.push(`调用 ${calls.slice(0, 5).join(", ")}`);
  }
  if (resources.length > 0) {
    parts.push(`访问 ${resources.slice(0, 5).join(", ")}`);
  }
  return `${parts.join("；")}。`;
}

function isJavaScriptFile(fileName: string): boolean {
  return [".js", ".jsx", ".mjs", ".cjs"].some((extension) => fileName.endsWith(extension));
}

function summarizeModule(
  modulePath: string,
  classes: ClassUnit[],
  methods: MethodUnit[],
  imports: string[]
): string {
  return `${modulePath} 包含 ${classes.length} 个类、${methods.length} 个模块级方法和 ${imports.length} 个导入。`;
}
