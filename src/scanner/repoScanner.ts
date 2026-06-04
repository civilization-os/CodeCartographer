import fs from "node:fs/promises";
import path from "node:path";
import type { SourceFileInfo, SourceLanguage } from "../core/types.js";
import { toPosixPath } from "../utils/path.js";

export const DEFAULT_SCAN_EXCLUDE = [
  ".git/**",
  ".see-code/**",
  "node_modules/**",
  "dist/**",
  "docs/**",
  "build/**",
  "coverage/**",
  ".next/**",
  ".turbo/**",
  ".cache/**",
  "target/**",
  "__pycache__/**"
];

export const DEFAULT_MAX_FILE_BYTES = 1024 * 1024;

export interface ScanRepoOptions {
  exclude?: string[];
  maxFileBytes?: number;
}

export async function scanRepo(
  rootPath: string,
  options: ScanRepoOptions = {}
): Promise<SourceFileInfo[]> {
  const absoluteRoot = path.resolve(rootPath);
  const files: SourceFileInfo[] = [];
  const exclude = [...DEFAULT_SCAN_EXCLUDE, ...(options.exclude ?? [])];
  const maxFileBytes = options.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES;

  async function walk(currentPath: string): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentPath, entry.name);
      const relativePath = toPosixPath(path.relative(absoluteRoot, absolutePath));
      if (matchesAnyExclude(relativePath, entry.name, exclude)) {
        continue;
      }

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const stat = await fs.stat(absolutePath);
      if (stat.size > maxFileBytes) {
        continue;
      }

      const language = detectLanguage(entry.name);
      if (language === "unknown") {
        continue;
      }

      files.push({
        absolutePath,
        relativePath,
        language,
        bytes: stat.size
      });
    }
  }

  await walk(absoluteRoot);
  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function matchesAnyExclude(relativePath: string, baseName: string, patterns: string[]): boolean {
  return patterns.some((pattern) => matchesExclude(relativePath, baseName, pattern));
}

function matchesExclude(relativePath: string, baseName: string, pattern: string): boolean {
  const normalized = toPosixPath(pattern).replace(/^\/+/, "");
  if (!normalized) {
    return false;
  }
  if (!normalized.includes("*")) {
    return relativePath === normalized ||
      relativePath.startsWith(`${normalized}/`) ||
      baseName === normalized;
  }

  const regex = new RegExp(`^${escapeRegex(normalized)
    .replace(/\\\*\\\*/g, ".*")
    .replace(/\\\*/g, "[^/]*")}$`);
  return regex.test(relativePath);
}

function escapeRegex(value: string): string {
  return value.replace(/[|\\{}()[\]^$+?.*]/g, "\\$&");
}

function detectLanguage(fileName: string): SourceLanguage {
  const ext = path.extname(fileName).toLowerCase();

  switch (ext) {
    case ".ts":
    case ".tsx":
      if (fileName.endsWith(".d.ts")) {
        return "unknown";
      }
      return "typescript";
    case ".js":
    case ".jsx":
    case ".mjs":
    case ".cjs":
      return "javascript";
    case ".java":
      return "java";
    case ".md":
      return "markdown";
    case ".json":
      return "json";
    default:
      return "unknown";
  }
}
