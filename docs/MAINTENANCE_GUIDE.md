# Maintenance Guide

## Current Analysis Boundaries

- TypeScript and JavaScript are parsed through the TypeScript compiler AST.
- Java is parsed through a lightweight static parser adapter that extracts classes, methods, annotations, signatures, calls, resources, and common Spring entrypoint hints.
- Parsing is routed through language adapters that emit the shared ModuleUnit, ClassUnit, and MethodUnit structures.
- MethodUnit includes language-neutral metadata such as parameters, return type, modifiers, annotations/decorators, framework hints, and entrypoint hints.
- Higher-fidelity Java support can replace the lightweight adapter with tree-sitter or another Java AST backend without changing the semantic analyzer, relation graph builder, or docs generator.
- Markdown and JSON files are scanned as project documents or resources.
- Call edges are created only when a call expression resolves to one unique in-repository method name.
- Resource detection is heuristic and currently covers HTTP URLs, environment-like string tokens, and file-like string literals.
- LLM semantic analysis is optional and runs after AST extraction when a provider and API key are configured.
- LLM semantic results are cached under `.see-code/cache` when caching is enabled.
- Project overview, architecture, entrypoint, and flow documents are generated through deterministic aggregation over MethodUnit summaries and call edges.
- `EXECUTION_FLOWS.md` is generated from static call edges; `BUSINESS_FLOWS.md` requires framework-aware entrypoint and resource metadata.
- LangGraph orchestration and tree-sitter language adapters are not enabled in this MVP.

## Repository Inventory

| File | Language | Bytes |
| --- | --- | --- |
| package.json | json | 797 |
| README.md | markdown | 3981 |
| scripts/secret-scan.mjs | javascript | 1382 |
| SPEC.md | markdown | 8407 |
| src/analyzer/analyzeRepo.ts | typescript | 1517 |
| src/core/types.ts | typescript | 3575 |
| src/graph/relationGraphBuilder.ts | typescript | 4727 |
| src/index.ts | typescript | 3854 |
| src/llm/methodSemanticAnalyzer.ts | typescript | 7870 |
| src/llm/methodSemanticCache.ts | typescript | 2602 |
| src/llm/modelConfig.ts | typescript | 3564 |
| src/llm/modelFactory.ts | typescript | 1276 |
| src/parser/javaAdapter.ts | typescript | 267 |
| src/parser/javaStructureParser.ts | typescript | 22635 |
| src/parser/moduleParser.ts | typescript | 1060 |
| src/parser/parserAdapter.ts | typescript | 437 |
| src/parser/typescriptAdapter.ts | typescript | 304 |
| src/parser/typescriptStructureParser.ts | typescript | 15282 |
| src/scanner/repoScanner.ts | typescript | 2057 |
| src/utils/path.ts | typescript | 284 |
| tests/analyzeRepo.test.ts | typescript | 3638 |
| tests/fixtures/docs-only/package.json | json | 53 |
| tests/fixtures/docs-only/README.md | markdown | 76 |
| tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java | java | 992 |
| tests/fixtures/typescript-basic/src/app.ts | typescript | 820 |
| tsconfig.json | json | 311 |
