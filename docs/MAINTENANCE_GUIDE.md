# Maintenance Guide

## Current Analysis Boundaries

- TypeScript 和 JavaScript 通过 TypeScript compiler AST 解析。
- Java 通过轻量静态解析适配器提取类、方法、注解、签名、调用、资源和常见 Spring 入口提示。
- `see-code.config.json` 提供非敏感的最小项目配置，用于扫描排除规则、最大文件大小和 LLM 默认值。
- `schema/result.schema.json` 和 `schema/result-diff.schema.json` 发布机器可读输出的稳定契约。
- 语言解析统一通过适配器输出共享的 ModuleUnit、ClassUnit 和 MethodUnit 结构。
- MethodUnit 包含参数、返回类型、修饰符、注解或装饰器、框架线索和入口线索等语言无关元数据。
- 更高保真的 Java 支持可以替换轻量适配器，例如接入 tree-sitter 或其他 Java AST 后端，而不改变语义分析器、关系图构建器或文档生成器。
- Markdown 和 JSON 文件会作为项目文档或资源参与扫描。
- 调用边只在调用表达式能唯一解析到仓库内方法名时生成。
- 资源检测是启发式能力，当前覆盖 HTTP URL、类似环境变量的字符串令牌和类似文件路径的字符串字面量。
- LLM 语义分析是可选步骤，在 AST 提取之后执行，需要配置 provider 和 API key。
- 启用缓存时，LLM 方法语义结果会缓存在 `.see-code/cache` 下。
- 项目概览、架构、入口点和流程文档由 MethodUnit 摘要与调用边确定性聚合生成。
- `EXECUTION_FLOWS.md` 来自静态调用边；`BUSINESS_FLOWS.md` 依赖框架入口和资源元数据。
- 当前 MVP 尚未启用 LangGraph 编排和 tree-sitter 语言适配器。

## Repository Inventory

| File | Language | Bytes |
| --- | --- | --- |
| evaluations/book-social-network.md | markdown | 5560 |
| evaluations/spring-petclinic.md | markdown | 7538 |
| package.json | json | 921 |
| README.md | markdown | 8449 |
| schema/result-diff.schema.json | json | 2493 |
| schema/result.schema.json | json | 4702 |
| scripts/secret-scan.mjs | javascript | 1382 |
| see-code.config.json | json | 391 |
| SPEC.md | markdown | 8956 |
| src/analyzer/analyzeRepo.ts | typescript | 2188 |
| src/analyzer/syntheticRepositoryMethods.ts | typescript | 6639 |
| src/cli/analyzeCommand.ts | typescript | 2233 |
| src/cli/args.ts | typescript | 3970 |
| src/cli/doctorCommand.ts | typescript | 3034 |
| src/cli/initCommand.ts | typescript | 1968 |
| src/cli/interactiveCommand.ts | typescript | 4878 |
| src/config/projectConfig.ts | typescript | 2238 |
| src/core/types.ts | typescript | 3744 |
| src/docs/docsGenerator.ts | typescript | 24727 |
| src/docs/markdown.ts | typescript | 734 |
| src/docs/narrativeComposer.ts | typescript | 11079 |
| src/docs/qualityReport.ts | typescript | 8091 |
| src/docs/semanticAggregator.ts | typescript | 11392 |
| src/graph/relationGraphBuilder.ts | typescript | 5983 |
| src/index.ts | typescript | 3014 |
| src/llm/methodSemanticAnalyzer.ts | typescript | 7870 |
| src/llm/methodSemanticCache.ts | typescript | 2602 |
| src/llm/modelConfig.ts | typescript | 3937 |
| src/llm/modelFactory.ts | typescript | 1276 |
| src/output/resultJsonWriter.ts | typescript | 18630 |
| src/parser/javaAdapter.ts | typescript | 267 |
| src/parser/javaStructureParser.ts | typescript | 34195 |
| src/parser/moduleParser.ts | typescript | 1060 |
| src/parser/parserAdapter.ts | typescript | 437 |
| src/parser/typescriptAdapter.ts | typescript | 304 |
| src/parser/typescriptStructureParser.ts | typescript | 15301 |
| src/scanner/repoScanner.ts | typescript | 3254 |
| src/utils/path.ts | typescript | 284 |
| tests/analyzeRepo.test.ts | typescript | 22398 |
| tests/cli.test.ts | typescript | 2827 |
| tests/schemaContract.test.ts | typescript | 4473 |
| tsconfig.json | json | 311 |
