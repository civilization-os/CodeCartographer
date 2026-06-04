import type { ModuleUnit, SourceFileInfo } from "../core/types.js";
import { stableId } from "../utils/path.js";
import { findParserAdapter, type SourceParserAdapter } from "./parserAdapter.js";
import { javaAdapter } from "./javaAdapter.js";
import { typescriptAdapter } from "./typescriptAdapter.js";

const DEFAULT_ADAPTERS: SourceParserAdapter[] = [typescriptAdapter, javaAdapter];

export async function parseModules(
  files: SourceFileInfo[],
  adapters: SourceParserAdapter[] = DEFAULT_ADAPTERS
): Promise<ModuleUnit[]> {
  const modules: ModuleUnit[] = [];

  for (const file of files) {
    const adapter = findParserAdapter(adapters, file.language);
    if (adapter) {
      modules.push(await adapter.parse(file));
      continue;
    }

    modules.push({
      id: stableId("module", file.relativePath),
      path: file.relativePath,
      language: file.language,
      classes: [],
      methods: [],
      imports: [],
      summary: `${file.relativePath} 是 ${file.language} 项目文档或资源文件。`
    });
  }

  return modules;
}
