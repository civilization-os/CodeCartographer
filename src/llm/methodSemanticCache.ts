import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { MethodSemantic, MethodUnit } from "../core/types.js";
import type { ModelConfig } from "./modelConfig.js";

interface CacheFile {
  version: 1;
  entries: Record<string, MethodSemantic>;
}

const PROMPT_VERSION = "method-semantic-v2";

export class MethodSemanticCache {
  private readonly entries = new Map<string, MethodSemantic>();

  private constructor(private readonly filePath: string) {}

  static async open(rootPath: string): Promise<MethodSemanticCache> {
    const filePath = path.join(rootPath, ".see-code", "cache", "method-semantics.json");
    const cache = new MethodSemanticCache(filePath);
    await cache.load();
    return cache;
  }

  get(method: MethodUnit, config: ModelConfig): MethodSemantic | undefined {
    return this.entries.get(cacheKey(method, config));
  }

  set(method: MethodUnit, config: ModelConfig, semantic: MethodSemantic): void {
    this.entries.set(cacheKey(method, config), semantic);
  }

  async save(): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    const payload: CacheFile = {
      version: 1,
      entries: Object.fromEntries([...this.entries.entries()].sort(([a], [b]) => a.localeCompare(b)))
    };
    await fs.writeFile(this.filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  }

  private async load(): Promise<void> {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as Partial<CacheFile>;
      if (parsed.version !== 1 || !parsed.entries) {
        return;
      }
      for (const [key, value] of Object.entries(parsed.entries)) {
        this.entries.set(key, value);
      }
    } catch (error) {
      if (isMissingFile(error)) {
        return;
      }
      throw error;
    }
  }
}

function cacheKey(method: MethodUnit, config: ModelConfig): string {
  const input = JSON.stringify({
    provider: config.provider,
    model: config.model,
    baseUrl: config.baseUrl,
    promptVersion: PROMPT_VERSION,
    modulePath: method.modulePath,
    className: method.className,
    name: method.name,
    signature: method.signature,
    sourceHash: hash(method.source ?? "")
  });

  return hash(input);
}

function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function isMissingFile(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === "ENOENT"
  );
}
