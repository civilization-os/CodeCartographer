# Project Overview

Repository path: `/root/project/ai/see_code`

Scan time: `2026-06-04T06:39:18.767Z`

## Purpose

see-code 是一个静态代码仓库分析工具，通过解析源代码结构、构建调用关系图、结合 LLM 语义分析，自动生成工程文档（Markdown）和结构化 JSON 结果。

## Operating Model

1. CLI 入口解析命令行参数，加载项目配置和 LLM 模型配置。
2. 递归扫描指定目录，过滤排除项和大文件，提取源文件列表。
3. 根据文件扩展名选择对应解析器（TypeScript/Java），提取模块、类、方法及资源。
4. 构建模块、类、方法、资源之间的关系图（节点和边）。
5. 对每个方法进行语义分析（优先缓存，未缓存则调用 LLM 或启发式规则）。
6. 生成工程文档（项目概览、架构、模块、业务流等 Markdown 文件）并写入文件系统。
7. 将分析结果、文档路径、差异报告等序列化为 JSON 并输出到控制台和文件。

## Key Capabilities

- 支持 TypeScript 和 Java 源代码的静态解析。
- 自动构建模块、类、方法、资源之间的调用关系图。
- 集成 LLM 进行方法语义分析，支持缓存和降级到启发式规则。
- 生成多维度工程文档（项目概览、架构、模块、业务流、质量报告）。
- 输出结构化 JSON 结果，支持差异比较和变更摘要。

## Primary Areas

| Area | Modules | Responsibilities |
| --- | --- | --- |
| analyzer | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。 |
| Application | src/index.ts | 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。 解析命令行参数，提取命令、目标路径和环境变量覆盖值。 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。 |
| config | src/config/projectConfig.ts | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。 判断未知错误是否为 Node.js 的 ErrnoException 类型。 |
| Configuration | package.json, see-code.config.json, tsconfig.json |  |
| core | src/core/types.ts |  |
| docs | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts | 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。 生成项目概览的 Markdown 字符串，包含仓库路径、扫描时间、目的、运营模型、关键能力、模块分组、结构统计、语义分析器配置、扫描配置和生成输出列表。 生成架构文档的完整 Markdown 字符串，包含系统形状、架构层、关键路径、模块区域、核心热点方法和运行时资源等章节。 |
| Documentation | evaluations/spring-petclinic.md, README.md, SPEC.md |  |
| graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 从模块单元中提取所有资源并去重排序，返回资源节点数组。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 |
| llm | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。 |
| output | src/output/resultJsonWriter.ts | 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。 将扫描结果、概览、质量数据和文档路径组装为结构化的 JSON 对象并返回。 将模块单元序列化为包含标识符、路径、语言、导入、摘要以及类和方法的ID列表的普通对象。 |
| parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源代码中提取类、接口、枚举和记录的定义块，包括注解、声明和代码范围。 |
| Project Files | schema/result-diff.schema.json, schema/result.schema.json, scripts/secret-scan.mjs, tests/analyzeRepo.test.ts, tests/schemaContract.test.ts | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 读取相对于仓库根目录的 JSON 文件并返回解析后的数据。 异步读取指定路径的JSON文件并解析为泛型类型。 |
| scanner | src/scanner/repoScanner.ts | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 检查文件路径或名称是否匹配任意一个排除模式。 判断给定相对路径或文件名是否匹配排除模式（支持通配符）。 |
| utils | src/utils/path.ts | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |

## Structure

| Metric | Count |
| --- | --- |
| Scanned files | 34 |
| Source files | 26 |
| Markdown documents | 3 |
| Modules | 34 |
| Classes | 2 |
| Method units | 226 |
| External resource nodes | 21 |
| Graph edges | 505 |

## Semantic Analyzer

| Field | Value |
| --- | --- |
| Enabled | yes |
| Provider | deepseek |
| Model | deepseek-chat |
| Base URL | https://api.deepseek.com |
| LLM limit | unlimited |
| Cache | enabled |

## Scan Configuration

| Field | Value |
| --- | --- |
| Config file | /root/project/ai/see_code/see-code.config.json |
| Max file bytes | 1048576 |
| Exclude rules | .git/**, .see-code/**, node_modules/**, dist/**, docs/**, build/**, coverage/**, .next/**, .turbo/**, .cache/**, target/**, __pycache__/**, tests/fixtures/**, eval-projects/**, external-projects/**, spring-petclinic/**, cleanarchitecture/**, mall/**, dubbo-samples/** |

## Generated Outputs

- `PROJECT_OVERVIEW.md` 汇总仓库规模、目标和文档产物。
- `ARCHITECTURE.md` 描述模块区域、架构层次和运行时依赖。
- `MODULES.md` 列出模块、类、方法、导入和方法语义摘要。
- `EXECUTION_FLOWS.md` 汇总由调用边推断出的静态执行路径。
- `BUSINESS_FLOWS.md` 展示框架入口驱动的业务流候选。
- `CALL_GRAPH.md` 用 Mermaid 渲染已解析的仓库内部调用关系。
- `ENTRYPOINTS.md` 列出框架感知入口和静态入口候选。
- `DATA_AND_RESOURCES.md` 列出检测到的数据与外部资源。
- `MAINTENANCE_GUIDE.md` 记录当前分析边界和维护注意事项。
- `QUALITY_REPORT.md` 汇总文档质量、LLM 覆盖率和模板残留检查。
- `CHANGE_SUMMARY.md` 汇总本次分析相对上一版结构化结果的变化。
- `.see-code/result.json` 保存机器可读的完整结构化分析结果。
- `.see-code/result-diff.json` 保存机器可读的增量差异结果。
- `schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义机器可读输出契约。
