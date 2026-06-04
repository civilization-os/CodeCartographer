import type { SourceParserAdapter } from "./parserAdapter.js";
import { parseJavaModule } from "./javaStructureParser.js";

export const javaAdapter: SourceParserAdapter = {
  name: "java-lightweight-static-parser",
  languages: ["java"],
  parse: parseJavaModule
};
