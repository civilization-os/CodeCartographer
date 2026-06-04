import type { SourceParserAdapter } from "./parserAdapter.js";
import { parseTypeScriptModule } from "./typescriptStructureParser.js";

export const typescriptAdapter: SourceParserAdapter = {
  name: "typescript-compiler-ast",
  languages: ["typescript", "javascript"],
  parse: parseTypeScriptModule
};
