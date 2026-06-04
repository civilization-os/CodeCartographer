# Project Overview

Repository path: `/root/project/ai/see_code`

Scan time: `2026-06-04T01:03:18.766Z`

## Purpose

see-code 是一个静态代码分析工具，扫描指定代码仓库，提取模块、方法、类、资源及调用关系图，并通过 LLM 增强方法语义分析，最终生成结构化的 JSON 文档。

## Operating Model

1. CLI 入口解析命令行参数，调用 analyzeRepo 扫描目录并解析源文件，构建模块、类、方法的结构化单元。
2. 对每个方法附加启发式语义标签，并通过 LLM 或缓存进行深度语义分析，更新模块和类的摘要。
3. 构建模块、类、方法和资源之间的关系图，包含节点和边。
4. 将扫描结果、概览、质量数据和文档路径组装为标准化 JSON 对象，写入 result.json 文件。

## Key Capabilities

- 递归扫描指定目录，过滤忽略目录、非文件、过大文件及无法识别语言的文件。
- 解析 TypeScript/JavaScript 和 Java 源文件，提取导入、类、方法及框架注解。
- 通过 LLM 分析方法的语义，支持缓存机制避免重复调用。
- 构建包含节点和边的模块-类-方法-资源关系图。
- 输出标准化的 JSON 文档，包含模块、类、方法、资源及关系图数据。

## Primary Areas

| Area | Modules | Responsibilities |
| --- | --- | --- |
| analyzer | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| Application | src/index.ts | 解析命令行参数，执行代码仓库分析并生成文档，将结果写入JSON文件并输出日志。 解析命令行参数，提取命令、目标路径和模型配置。 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。 |
| Configuration | package.json, tsconfig.json |  |
| core | src/core/types.ts |  |
| Documentation | README.md, SPEC.md, tests/fixtures/docs-only/README.md |  |
| graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 从模块单元中提取所有资源并去重排序，返回资源节点列表。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 |
| llm | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。 |
| output | src/output/resultJsonWriter.ts | 将结果数据写入指定目录下的 result.json 文件并返回文件路径。 将扫描结果、概览、质量数据和文档路径组装成标准化的 JSON 对象并返回。 将模块单元序列化为包含标识符、路径、语言、导入、摘要以及类和方法的ID列表的普通对象。 |
| parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。 |
| Project Files | scripts/secret-scan.mjs, tests/analyzeRepo.test.ts, tests/fixtures/docs-only/package.json, tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java, tests/fixtures/typescript-basic/src/app.ts | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 构造函数注入OrderService依赖。 处理创建订单的HTTP POST请求，调用订单服务并返回订单数据传输对象。 |
| scanner | src/scanner/repoScanner.ts | 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 根据文件扩展名和命名约定检测源代码语言类型。 |
| utils | src/utils/path.ts | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |

## Structure

| Metric | Count |
| --- | --- |
| Scanned files | 27 |
| Source files | 21 |
| Markdown documents | 3 |
| Modules | 27 |
| Classes | 2 |
| Method units | 133 |
| External resource nodes | 5 |
| Graph edges | 256 |

## Semantic Analyzer

| Field | Value |
| --- | --- |
| Enabled | yes |
| Provider | deepseek |
| Model | deepseek-chat |
| Base URL | https://api.deepseek.com |
| LLM limit | unlimited |
| Cache | enabled |

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
