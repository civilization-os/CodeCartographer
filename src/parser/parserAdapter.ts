import type { ModuleUnit, SourceFileInfo, SourceLanguage } from "../core/types.js";

export interface SourceParserAdapter {
  name: string;
  languages: SourceLanguage[];
  parse(file: SourceFileInfo): Promise<ModuleUnit>;
}

export function findParserAdapter(
  adapters: SourceParserAdapter[],
  language: SourceLanguage
): SourceParserAdapter | undefined {
  return adapters.find((adapter) => adapter.languages.includes(language));
}
