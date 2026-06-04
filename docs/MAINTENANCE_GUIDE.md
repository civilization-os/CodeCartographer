# Maintenance Guide

## Current Analysis Boundaries

- TypeScript and JavaScript are parsed through the TypeScript compiler AST.
- Java is parsed through a lightweight static parser adapter that extracts classes, methods, annotations, signatures, calls, resources, and common Spring entrypoint hints.
- `see-code.config.json` can provide minimal non-sensitive configuration for scan excludes, max file size, and LLM defaults.
- `schema/result.schema.json` and `schema/result-diff.schema.json` publish stable contracts for machine-readable outputs.
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
| evaluations/spring-petclinic.md | markdown | 3903 |
| package.json | json | 797 |
| README.md | markdown | 5162 |
| schema/result-diff.schema.json | json | 2493 |
| schema/result.schema.json | json | 4702 |
| scripts/secret-scan.mjs | javascript | 1382 |
| see-code.config.json | json | 391 |
| SPEC.md | markdown | 8983 |
| src/analyzer/analyzeRepo.ts | typescript | 2076 |
| src/config/projectConfig.ts | typescript | 2238 |
| src/core/types.ts | typescript | 3707 |
| src/docs/docsGenerator.ts | typescript | 19462 |
| src/docs/markdown.ts | typescript | 734 |
| src/docs/narrativeComposer.ts | typescript | 9954 |
| src/docs/qualityReport.ts | typescript | 7158 |
| src/docs/semanticAggregator.ts | typescript | 7899 |
| src/graph/relationGraphBuilder.ts | typescript | 4727 |
| src/index.ts | typescript | 4640 |
| src/llm/methodSemanticAnalyzer.ts | typescript | 7870 |
| src/llm/methodSemanticCache.ts | typescript | 2602 |
| src/llm/modelConfig.ts | typescript | 3937 |
| src/llm/modelFactory.ts | typescript | 1276 |
| src/output/resultJsonWriter.ts | typescript | 18594 |
| src/parser/javaAdapter.ts | typescript | 267 |
| src/parser/javaStructureParser.ts | typescript | 22635 |
| src/parser/moduleParser.ts | typescript | 1060 |
| src/parser/parserAdapter.ts | typescript | 437 |
| src/parser/typescriptAdapter.ts | typescript | 304 |
| src/parser/typescriptStructureParser.ts | typescript | 15282 |
| src/scanner/repoScanner.ts | typescript | 3254 |
| src/utils/path.ts | typescript | 284 |
| tests/analyzeRepo.test.ts | typescript | 10373 |
| tests/schemaContract.test.ts | typescript | 4473 |
| tsconfig.json | json | 311 |
