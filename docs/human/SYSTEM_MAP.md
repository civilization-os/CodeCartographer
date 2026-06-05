# System Map

## Executive Summary

该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。

## At A Glance

| Metric | Value |
| --- | --- |
| Scanned files | 42 |
| Source files | 33 |
| Modules | 42 |
| Classes | 2 |
| Method units | 269 |
| Business flows | 1 |
| Static execution flows | 8 |
| External resources | 26 |
| Graph edges | 648 |

## Subsystem Map

| Subsystem | Modules | Role |
| --- | --- | --- |
| analyzer | 2 | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。 |
| Application | 1 | 解析命令行参数并根据子命令分发执行交互、分析、初始化、诊断或帮助操作。 打印 CodeCartographer 工具的帮助信息，包括用法、命令、选项和环境变量说明。 |
| cli | 5 | runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, console.log, generateDocs, loadModelConfig, loadProjectConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。 解析命令行参数并返回结构化的 CliOptions 对象，包含命令、目标路径、环境变量覆盖、排除列表等配置。 |
| config | 1 | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。 |
| docs | 5 | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 renderDocIndex 定义一个可调用单元；调用 String, bulletList, docRows.map, docs.get, docs.has；访问 FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/CHANGE_SUMMARY.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 |
| graph | 1 | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 从模块单元中提取所有资源并去重排序，返回资源节点数组。 |
| llm | 4 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 |
| output | 1 | writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。 将扫描结果、概览、质量数据和文档路径组装为结构化的 JSON 对象并返回。 |

## Core Pipeline

1. src/docs/docsGenerator.ts#generateDocs: generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。
2. src/docs/markdown.ts#heading: 生成指定级别的 Markdown 标题字符串。
3. src/docs/markdown.ts#table: 生成 Markdown 表格字符串，包含表头、分隔符和行数据。
4. src/analyzer/analyzeRepo.ts#analyzeRepo: 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。
5. src/output/resultJsonWriter.ts#buildResultDiff: 比较两个记录对象，生成包含文件、方法、入口点、资源和业务流程差异的结构化差异报告。
6. src/cli/interactiveCommand.ts#runInteractiveCommand: 通过交互式命令行引导用户配置并依次执行初始化、诊断和分析命令。

## Output Strategy

| Output | Purpose |
| --- | --- |
| Human-readable docs | `human/SYSTEM_MAP.md`, `human/PROJECT_OVERVIEW.md`, `human/ARCHITECTURE.md`, `human/BUSINESS_FLOWS.md` 用于快速理解和交接。 |
| AI-readable context | `ai/AI_CONTEXT.md` 和 `.see-code/result.json` 用于 agent、自动化检查和二次分析。 |
| Deep-dive docs | `deep-dive/MODULES.md`, `deep-dive/CALL_GRAPH.md`, `deep-dive/EXECUTION_FLOWS.md` 保留完整追踪能力，但不作为第一阅读入口。 |

## Extension Points

- Parser adapters: 新语言只需要输出统一的 ModuleUnit、ClassUnit 和 MethodUnit。
- Framework adapters: 入口点、资源和业务流质量取决于框架元数据提取。
- LLM providers: 语义摘要通过 LangChain 适配 DeepSeek、OpenAI 协议、Anthropic 协议和自建模型。
- Document renderers: 人读文档、AI 上下文和 JSON 契约可以独立演进。

## Current Limits

- 调用图是静态近似结果，不等同于完整运行时路径。
- 复杂泛型、链式表达式、动态调用和框架魔法仍需要更高保真解析器增强。
- `deep-dive/MODULES.md` 和 `deep-dive/CALL_GRAPH.md` 偏细节追踪，优先通过 `human/SYSTEM_MAP.md` 和 `ai/AI_CONTEXT.md` 消化。
