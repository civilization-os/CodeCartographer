import fs from "node:fs/promises";
import type {
  ClassUnit,
  EntrypointHint,
  FrameworkHint,
  MethodParameter,
  MethodUnit,
  ModuleUnit,
  SourceFileInfo,
  SourceLocation
} from "../core/types.js";
import { stableId } from "../utils/path.js";

interface LineIndex {
  starts: number[];
}

interface JavaClassBlock {
  name: string;
  kind: string;
  annotations: string[];
  declaration: string;
  start: number;
  bodyStart: number;
  end: number;
}

interface JavaMethodBlock {
  name: string;
  signature: string;
  annotations: string[];
  modifiers: string[];
  visibility: MethodUnit["visibility"];
  parameters: MethodParameter[];
  returnType?: string;
  isStatic: boolean;
  start: number;
  bodyStart: number;
  end: number;
}

const MODIFIER_WORDS = new Set([
  "public",
  "protected",
  "private",
  "abstract",
  "static",
  "final",
  "synchronized",
  "native",
  "strictfp",
  "default",
  "transient",
  "volatile"
]);

const CONTROL_WORDS = new Set([
  "if",
  "for",
  "while",
  "switch",
  "catch",
  "try",
  "do",
  "else",
  "synchronized"
]);

const HTTP_MAPPING_METHODS = new Map<string, string>([
  ["GetMapping", "get"],
  ["PostMapping", "post"],
  ["PutMapping", "put"],
  ["PatchMapping", "patch"],
  ["DeleteMapping", "delete"]
]);

export async function parseJavaModule(file: SourceFileInfo): Promise<ModuleUnit> {
  const sourceText = await fs.readFile(file.absolutePath, "utf8");
  const masked = maskJavaSource(sourceText);
  const lineIndex = buildLineIndex(sourceText);
  const imports = extractImports(sourceText);
  const classBlocks = extractClassBlocks(sourceText, masked);
  const classes = classBlocks.map((classBlock) =>
    extractClassUnit(sourceText, masked, lineIndex, file.relativePath, classBlock)
  );
  const methods = classes.flatMap((classUnit) => classUnit.methods);

  return {
    id: stableId("module", file.relativePath),
    path: file.relativePath,
    language: "java",
    imports,
    classes,
    methods,
    summary: `${file.relativePath} 包含 ${classes.length} 个 Java 类型、${methods.length} 个方法单元和 ${imports.length} 个导入。`
  };
}

function extractImports(sourceText: string): string[] {
  const imports = new Set<string>();
  const importPattern = /^\s*import\s+(?:static\s+)?([^;]+);/gm;
  for (const match of sourceText.matchAll(importPattern)) {
    imports.add(match[1].trim());
  }
  return [...imports].sort();
}

function extractClassBlocks(sourceText: string, masked: string): JavaClassBlock[] {
  const classBlocks: JavaClassBlock[] = [];
  const pattern =
    /((?:\s*@[A-Za-z_$][\w$]*(?:\s*\([^)]*\))?\s*)*)((?:(?:public|protected|private|abstract|final|static|sealed|strictfp)\s+)*)(class|interface|enum|record)\s+([A-Za-z_$][\w$]*)[^{};]*\{/g;

  for (const match of masked.matchAll(pattern)) {
    const start = match.index ?? 0;
    const bodyStart = start + match[0].lastIndexOf("{");
    const end = findMatchingBrace(masked, bodyStart);
    if (end === -1) {
      continue;
    }

    const declarationText = sourceText.slice(start, bodyStart);
    classBlocks.push({
      name: match[4],
      kind: match[3],
      annotations: extractAnnotations(declarationText),
      declaration: declarationText.replace(/\s+/g, " ").trim(),
      start,
      bodyStart,
      end
    });
  }

  return classBlocks;
}

function extractClassUnit(
  sourceText: string,
  masked: string,
  lineIndex: LineIndex,
  modulePath: string,
  classBlock: JavaClassBlock
): ClassUnit {
  const methodBlocks = extractMethodBlocks(sourceText, masked, classBlock);
  const classRoutePrefix = requestMappingPath(classBlock.annotations) ?? "";
  const resources = extractClassResources(classBlock);
  const methods = methodBlocks.map((methodBlock) =>
    buildMethodUnit(sourceText, masked, lineIndex, modulePath, classBlock, methodBlock, classRoutePrefix)
  );

  return {
    id: stableId("class", modulePath, classBlock.name),
    name: classBlock.name,
    modulePath,
    location: locationFromOffsets(modulePath, lineIndex, classBlock.start, classBlock.end),
    methods,
    resources,
    summary: summarizeClass(classBlock, methods.length, resources)
  };
}

function extractClassResources(classBlock: JavaClassBlock): string[] {
  const resources = new Set<string>();

  if (
    hasAnnotation(classBlock.annotations, "Entity") ||
    hasAnnotation(classBlock.annotations, "MappedSuperclass") ||
    hasAnnotation(classBlock.annotations, "Embeddable")
  ) {
    resources.add(`ENTITY:${classBlock.name}`);
  }

  const tableName =
    annotationAttribute(annotationByName(classBlock.annotations, "Table") ?? "", "name") ??
    annotationAttribute(annotationByName(classBlock.annotations, "Table") ?? "", "value");
  if (tableName) {
    resources.add(`TABLE:${tableName}`);
  }

  if (
    /Repository$|Dao$|Mapper$/.test(classBlock.name) ||
    /\b(?:JpaRepository|CrudRepository|PagingAndSortingRepository|Repository)\s*</.test(classBlock.declaration)
  ) {
    resources.add(`REPOSITORY:${classBlock.name}`);
    const repositoryEntity = /(?:JpaRepository|CrudRepository|PagingAndSortingRepository|Repository)\s*<\s*([A-Za-z_$][\w$]*)/.exec(
      classBlock.declaration
    )?.[1];
    if (repositoryEntity) {
      resources.add(`ENTITY:${repositoryEntity}`);
    }
  }

  return [...resources].sort();
}

function extractMethodBlocks(
  sourceText: string,
  masked: string,
  classBlock: JavaClassBlock
): JavaMethodBlock[] {
  const methods: JavaMethodBlock[] = [];
  let depth = 0;
  let statementStart = classBlock.bodyStart + 1;

  for (let index = classBlock.bodyStart + 1; index < classBlock.end; index += 1) {
    const char = masked[index];

    if (char === "{") {
      if (depth === 0) {
        const headerText = sourceText.slice(statementStart, index);
        const headerMasked = masked.slice(statementStart, index);
        const parsed = parseMethodHeader(headerText, headerMasked, classBlock.name);
        if (parsed) {
          const methodEnd = findMatchingBrace(masked, index);
          if (methodEnd !== -1) {
            methods.push({
              ...parsed,
              start: statementStart + leadingWhitespaceLength(sourceText.slice(statementStart, index)),
              bodyStart: index,
              end: methodEnd
            });
            index = methodEnd;
            statementStart = methodEnd + 1;
            continue;
          }
        }
      }
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth <= 0) {
        depth = 0;
        statementStart = index + 1;
      }
      continue;
    }

    if (depth === 0 && char === ";") {
      statementStart = index + 1;
    }
  }

  return methods;
}

function parseMethodHeader(
  headerText: string,
  headerMasked: string,
  className: string
): Omit<JavaMethodBlock, "start" | "bodyStart" | "end"> | undefined {
  const annotations = extractAnnotations(headerText, headerMasked);
  const headerWithoutAnnotations = stripAnnotations(headerMasked)
    .replace(/\s+/g, " ")
    .trim();
  if (!headerWithoutAnnotations || headerWithoutAnnotations.includes("=")) {
    return undefined;
  }

  const openParen = headerWithoutAnnotations.indexOf("(");
  const closeParen = headerWithoutAnnotations.lastIndexOf(")");
  if (openParen === -1 || closeParen === -1 || closeParen < openParen) {
    return undefined;
  }

  const beforeParen = headerWithoutAnnotations.slice(0, openParen).trim();
  const nameMatch = /([A-Za-z_$][\w$]*)$/.exec(beforeParen);
  if (!nameMatch || CONTROL_WORDS.has(nameMatch[1])) {
    return undefined;
  }

  const name = nameMatch[1];
  const prefix = beforeParen.slice(0, nameMatch.index).trim();
  if (/\b(class|interface|enum|record|new)\b/.test(prefix)) {
    return undefined;
  }

  const modifiers = extractModifiers(prefix);
  const visibility = extractVisibility(modifiers);
  const returnType = name === className ? undefined : extractReturnType(prefix, modifiers);
  if (name !== className && !returnType) {
    return undefined;
  }

  const parametersText = headerWithoutAnnotations.slice(openParen + 1, closeParen);
  const parameters = parseParameters(parametersText);

  return {
    name,
    signature: `${name}(${parametersText.trim()})${returnType ? `: ${returnType}` : ""}`,
    annotations,
    modifiers,
    visibility,
    parameters,
    returnType,
    isStatic: modifiers.includes("static")
  };
}

function buildMethodUnit(
  sourceText: string,
  masked: string,
  lineIndex: LineIndex,
  modulePath: string,
  classBlock: JavaClassBlock,
  methodBlock: JavaMethodBlock,
  classRoutePrefix: string
): MethodUnit {
  const bodySource = sourceText.slice(methodBlock.bodyStart + 1, methodBlock.end);
  const bodyMasked = masked.slice(methodBlock.bodyStart + 1, methodBlock.end);
  const annotations = [...classBlock.annotations, ...methodBlock.annotations];
  const calls = extractCalls(bodyMasked);
  const resources = extractResources(bodySource, annotations);
  const frameworkHints = extractFrameworkHints(
    classBlock,
    methodBlock,
    bodyMasked,
    annotations,
    classRoutePrefix,
    resources
  );
  const entrypointHints = extractEntrypointHints(methodBlock, frameworkHints);

  return {
    id: stableId("method", modulePath, classBlock.name, methodBlock.name, String(methodBlock.start)),
    name: methodBlock.name,
    signature: methodBlock.signature,
    className: classBlock.name,
    modulePath,
    location: locationFromOffsets(modulePath, lineIndex, methodBlock.start, methodBlock.end),
    language: "java",
    parameters: methodBlock.parameters,
    returnType: methodBlock.returnType,
    visibility: methodBlock.visibility,
    modifiers: methodBlock.modifiers,
    annotations: methodBlock.annotations,
    isAsync: false,
    isStatic: methodBlock.isStatic,
    calls,
    resources,
    frameworkHints,
    entrypointHints,
    summary: summarizeMethod(methodBlock.name, calls, resources, frameworkHints),
    source: sourceText.slice(methodBlock.start, methodBlock.end + 1).trim()
  };
}

function extractCalls(bodyMasked: string): string[] {
  const calls = new Set<string>();
  const callPattern = /\b(?:new\s+)?([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)\s*\(/g;

  for (const match of bodyMasked.matchAll(callPattern)) {
    const call = match[1].replace(/\s*\.\s*/g, ".");
    const lastPart = call.split(".").at(-1) ?? call;
    if (!CONTROL_WORDS.has(call) && !CONTROL_WORDS.has(lastPart) && !MODIFIER_WORDS.has(call)) {
      calls.add(call);
    }
  }

  return [...calls].sort();
}

function extractResources(bodySource: string, annotations: string[]): string[] {
  const resources = new Set<string>();
  const combined = `${annotations.join("\n")}\n${bodySource}`;

  for (const value of extractStringLiterals(combined)) {
    if (/^https?:\/\//.test(value)) {
      resources.add(`HTTP:${value}`);
    }
    if (/^[A-Z0-9_]{3,}$/.test(value) && value.includes("_")) {
      resources.add(`ENV:${value}`);
    }
    if (value.length > 4 && /\.(json|md|txt|yml|yaml|sql|properties)$/.test(value)) {
      resources.add(`FILE:${value}`);
    }
    if (/\b(select|insert|update|delete)\b/i.test(value) && /\b(from|into|table|set)\b/i.test(value)) {
      resources.add(`SQL:${value.slice(0, 120)}`);
    }
  }

  for (const match of combined.matchAll(/System\.getenv\s*\(\s*"([^"]+)"\s*\)/g)) {
    resources.add(`ENV:${match[1]}`);
  }

  for (const match of combined.matchAll(/\$\{([A-Za-z0-9_.-]+)(?::[^}]*)?}/g)) {
    resources.add(`ENV:${match[1]}`);
  }

  return [...resources].sort();
}

function extractFrameworkHints(
  classBlock: JavaClassBlock,
  methodBlock: JavaMethodBlock,
  bodyMasked: string,
  annotations: string[],
  classRoutePrefix: string,
  resources: string[]
): FrameworkHint[] {
  const hints: FrameworkHint[] = [];
  const route = routeFromAnnotations(methodBlock.annotations, classRoutePrefix);
  if (route) {
    hints.push({
      kind: "http_route",
      framework: "spring-web",
      value: route.path,
      metadata: {
        method: route.method
      }
    });
  }

  const scheduled = annotationByName(methodBlock.annotations, "Scheduled");
  if (scheduled) {
    hints.push({
      kind: "scheduled_job",
      framework: "spring-scheduling",
      value: firstAnnotationString(scheduled) ?? annotationAttribute(scheduled, "cron") ?? scheduled
    });
  }

  const listener = ["KafkaListener", "RabbitListener", "JmsListener"]
    .map((name) => annotationByName(methodBlock.annotations, name))
    .find(Boolean);
  if (listener) {
    hints.push({
      kind: "message_consumer",
      framework: listener.includes("KafkaListener") ? "spring-kafka" : "spring-messaging",
      value: firstAnnotationString(listener) ?? annotationAttribute(listener, "topics") ?? listener
    });
  }

  if (
    hasAnnotation(annotations, "Repository") ||
    hasAnnotation(annotations, "Entity") ||
    hasAnnotation(methodBlock.annotations, "Query") ||
    /\b(save|findBy|findAll|delete|query|executeUpdate)\s*\(/.test(bodyMasked) ||
    /Repository$|Dao$|Mapper$/.test(classBlock.name)
  ) {
    hints.push({
      kind: "persistence",
      framework: "java-persistence",
      value: classBlock.name
    });
  }

  if (annotations.some((annotation) => annotation.includes("@Value")) || bodyMasked.includes("System.getenv")) {
    hints.push({
      kind: "environment",
      framework: "java",
      value:
        resources.find((resource) => resource.startsWith("ENV:"))?.slice("ENV:".length) ??
        annotations.find((annotation) => annotation.includes("@Value"))
    });
  }

  return dedupeHints(hints);
}

function extractEntrypointHints(
  methodBlock: JavaMethodBlock,
  frameworkHints: FrameworkHint[]
): EntrypointHint[] {
  const hints: EntrypointHint[] = [];

  for (const frameworkHint of frameworkHints) {
    if (frameworkHint.kind === "http_route") {
      hints.push({
        kind: "http_route",
        protocol: "http",
        method: frameworkHint.metadata?.method,
        path: frameworkHint.value,
        source: "framework",
        description: `${frameworkHint.metadata?.method?.toUpperCase() ?? "HTTP"} ${frameworkHint.value ?? ""}`.trim()
      });
    }
    if (frameworkHint.kind === "scheduled_job") {
      hints.push({
        kind: "scheduled_job",
        protocol: "timer",
        source: "framework",
        description: "Spring scheduled job"
      });
    }
    if (frameworkHint.kind === "message_consumer") {
      hints.push({
        kind: "message_consumer",
        protocol: "message",
        path: frameworkHint.value,
        source: "framework",
        description: frameworkHint.value ?? "Spring message listener"
      });
    }
  }

  if (hasAnnotation(methodBlock.annotations, "Test")) {
    hints.push({
      kind: "test",
      protocol: "test",
      source: "framework",
      description: "Java test method"
    });
  }

  if (methodBlock.name === "main" && methodBlock.isStatic) {
    hints.push({
      kind: "cli",
      protocol: "cli",
      source: "heuristic",
      description: "Java main method"
    });
  }

  return dedupeEntrypoints(hints);
}

function routeFromAnnotations(
  annotations: string[],
  classRoutePrefix: string
): { method: string; path: string } | undefined {
  for (const annotation of annotations) {
    const name = annotationName(annotation);
    if (!name) {
      continue;
    }

    const directMethod = HTTP_MAPPING_METHODS.get(name);
    if (directMethod) {
      return {
        method: directMethod,
        path: joinRoutePaths(classRoutePrefix, firstAnnotationString(annotation) ?? annotationAttribute(annotation, "path") ?? "")
      };
    }

    if (name === "RequestMapping") {
      return {
        method: requestMappingMethod(annotation),
        path: joinRoutePaths(classRoutePrefix, firstAnnotationString(annotation) ?? annotationAttribute(annotation, "path") ?? "")
      };
    }
  }

  return undefined;
}

function requestMappingPath(annotations: string[]): string | undefined {
  const annotation = annotations.find((item) => annotationName(item) === "RequestMapping");
  if (!annotation) {
    return undefined;
  }

  return firstAnnotationString(annotation) ?? annotationAttribute(annotation, "path") ?? annotationAttribute(annotation, "value");
}

function requestMappingMethod(annotation: string): string {
  const requestMethod = /RequestMethod\.([A-Z]+)/.exec(annotation)?.[1];
  return requestMethod?.toLowerCase() ?? "all";
}

function joinRoutePaths(prefix: string, path: string): string {
  const joined = [prefix, path]
    .filter(Boolean)
    .join("/")
    .replace(/\/+/g, "/");
  return joined.startsWith("/") ? joined : `/${joined}`;
}

function parseParameters(parametersText: string): MethodParameter[] {
  return splitTopLevel(parametersText, ",")
    .map((parameter) => parameter.trim())
    .filter(Boolean)
    .map((parameter) => {
      const cleaned = stripAnnotations(parameter)
        .replace(/\bfinal\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const parts = cleaned.split(" ");
      const name = parts.pop() ?? cleaned;
      return {
        name: name.replace(/\[\]$/, ""),
        type: parts.join(" ").replace(/\s*\.\.\.\s*$/, "...")
      };
    });
}

function extractModifiers(prefix: string): string[] {
  return prefix
    .split(/\s+/)
    .filter((part) => MODIFIER_WORDS.has(part));
}

function extractVisibility(modifiers: string[]): MethodUnit["visibility"] {
  if (modifiers.includes("public")) {
    return "public";
  }
  if (modifiers.includes("protected")) {
    return "protected";
  }
  if (modifiers.includes("private")) {
    return "private";
  }
  return "package";
}

function extractReturnType(prefix: string, modifiers: string[]): string | undefined {
  let value = prefix.trim();
  for (const modifier of modifiers) {
    value = value.replace(new RegExp(`\\b${modifier}\\b`, "g"), " ");
  }
  value = value.replace(/\s+/g, " ").trim();
  return value || undefined;
}

function extractAnnotations(text: string, maskedText = text): string[] {
  const annotations: string[] = [];
  const pattern = /@[A-Za-z_$][\w$]*(?:\s*\([^)]*\))?/g;
  for (const match of maskedText.matchAll(pattern)) {
    const start = match.index ?? 0;
    annotations.push(text.slice(start, start + match[0].length).replace(/\s+/g, " ").trim());
  }
  return annotations;
}

function stripAnnotations(text: string): string {
  return text.replace(/@[A-Za-z_$][\w$]*(?:\s*\([^)]*\))?/g, " ");
}

function hasAnnotation(annotations: string[], name: string): boolean {
  return annotations.some((annotation) => annotationName(annotation) === name);
}

function annotationByName(annotations: string[], name: string): string | undefined {
  return annotations.find((annotation) => annotationName(annotation) === name);
}

function annotationName(annotation: string): string | undefined {
  return /^@([A-Za-z_$][\w$]*)/.exec(annotation)?.[1];
}

function firstAnnotationString(annotation: string): string | undefined {
  return /"([^"]+)"/.exec(annotation)?.[1];
}

function annotationAttribute(annotation: string, name: string): string | undefined {
  return new RegExp(`\\b${name}\\s*=\\s*(?:\\{\\s*)?"([^"]+)"`).exec(annotation)?.[1];
}

function splitTopLevel(value: string, separator: string): string[] {
  const result: string[] = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "<" || char === "(" || char === "[") {
      depth += 1;
    } else if (char === ">" || char === ")" || char === "]") {
      depth -= 1;
    } else if (char === separator && depth === 0) {
      result.push(value.slice(start, index));
      start = index + 1;
    }
  }

  result.push(value.slice(start));
  return result;
}

function extractStringLiterals(value: string): string[] {
  const strings: string[] = [];
  const pattern = /"((?:\\.|[^"\\])*)"/g;
  for (const match of value.matchAll(pattern)) {
    strings.push(match[1].replace(/\\"/g, '"'));
  }
  return strings;
}

function maskJavaSource(sourceText: string): string {
  const chars = sourceText.split("");
  let index = 0;

  while (index < chars.length) {
    const char = chars[index];
    const next = chars[index + 1];

    if (char === "/" && next === "/") {
      chars[index] = " ";
      chars[index + 1] = " ";
      index += 2;
      while (index < chars.length && chars[index] !== "\n") {
        chars[index] = " ";
        index += 1;
      }
      continue;
    }

    if (char === "/" && next === "*") {
      chars[index] = " ";
      chars[index + 1] = " ";
      index += 2;
      while (index < chars.length && !(chars[index] === "*" && chars[index + 1] === "/")) {
        if (chars[index] !== "\n") {
          chars[index] = " ";
        }
        index += 1;
      }
      if (index < chars.length) {
        chars[index] = " ";
        chars[index + 1] = " ";
        index += 2;
      }
      continue;
    }

    if (char === "\"" || char === "'") {
      const quote = char;
      index += 1;
      while (index < chars.length) {
        if (chars[index] === "\\") {
          chars[index] = " ";
          if (chars[index + 1] && chars[index + 1] !== "\n") {
            chars[index + 1] = " ";
          }
          index += 2;
          continue;
        }
        if (chars[index] === quote) {
          index += 1;
          break;
        }
        if (chars[index] !== "\n") {
          chars[index] = " ";
        }
        index += 1;
      }
      continue;
    }

    index += 1;
  }

  return chars.join("");
}

function findMatchingBrace(value: string, openIndex: number): number {
  let depth = 0;
  for (let index = openIndex; index < value.length; index += 1) {
    if (value[index] === "{") {
      depth += 1;
    }
    if (value[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }
  return -1;
}

function buildLineIndex(sourceText: string): LineIndex {
  const starts = [0];
  for (let index = 0; index < sourceText.length; index += 1) {
    if (sourceText[index] === "\n") {
      starts.push(index + 1);
    }
  }
  return { starts };
}

function locationFromOffsets(
  file: string,
  lineIndex: LineIndex,
  startOffset: number,
  endOffset: number
): SourceLocation {
  return {
    file,
    startLine: lineNumberAt(lineIndex, startOffset),
    endLine: lineNumberAt(lineIndex, endOffset)
  };
}

function lineNumberAt(lineIndex: LineIndex, offset: number): number {
  let low = 0;
  let high = lineIndex.starts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (lineIndex.starts[mid] <= offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return high + 1;
}

function leadingWhitespaceLength(value: string): number {
  return /^\s*/.exec(value)?.[0].length ?? 0;
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

function summarizeClass(
  classBlock: JavaClassBlock,
  methodCount: number,
  resources: string[]
): string {
  const parts = [`${classBlock.name} 是 ${classBlock.kind}，包含 ${methodCount} 个方法`];
  if (resources.length > 0) {
    parts.push(`关联 ${resources.slice(0, 5).join(", ")}`);
  }
  return `${parts.join("，")}。`;
}

function summarizeMethod(
  name: string,
  calls: string[],
  resources: string[],
  frameworkHints: FrameworkHint[]
): string {
  const parts = [`${name} 定义 Java 方法单元`];
  if (frameworkHints.length > 0) {
    parts.push(`识别到 ${frameworkHints.map((hint) => hint.kind).join(", ")} 框架线索`);
  }
  if (calls.length > 0) {
    parts.push(`调用 ${calls.slice(0, 5).join(", ")}`);
  }
  if (resources.length > 0) {
    parts.push(`访问 ${resources.slice(0, 5).join(", ")}`);
  }
  return `${parts.join("；")}。`;
}
