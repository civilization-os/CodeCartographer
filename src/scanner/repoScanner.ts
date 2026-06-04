import fs from "node:fs/promises";
import path from "node:path";
import type { SourceFileInfo, SourceLanguage } from "../core/types.js";
import { toPosixPath } from "../utils/path.js";

const IGNORED_DIRS = new Set([
  ".git",
  ".see-code",
  "node_modules",
  "dist",
  "docs",
  "build",
  "coverage",
  ".next",
  ".turbo",
  ".cache",
  "target",
  "__pycache__"
]);

const MAX_FILE_BYTES = 1024 * 1024;

export async function scanRepo(rootPath: string): Promise<SourceFileInfo[]> {
  const absoluteRoot = path.resolve(rootPath);
  const files: SourceFileInfo[] = [];

  async function walk(currentPath: string): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          await walk(absolutePath);
        }
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const stat = await fs.stat(absolutePath);
      if (stat.size > MAX_FILE_BYTES) {
        continue;
      }

      const language = detectLanguage(entry.name);
      if (language === "unknown") {
        continue;
      }

      files.push({
        absolutePath,
        relativePath: toPosixPath(path.relative(absoluteRoot, absolutePath)),
        language,
        bytes: stat.size
      });
    }
  }

  await walk(absoluteRoot);
  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
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
