# Project Overview

Repository path: `/root/project/ai/see_code`

Scan time: `2026-06-04T00:55:55.918Z`

## Purpose

see-code 是一个静态代码分析工具，用于扫描指定代码仓库，提取模块、方法、类、资源及关系图，并通过 LLM 增强语义分析，最终生成结构化工程文档。

## Operating Model

1. CLI 入口解析命令行参数，调用扫描器递归扫描目标目录，过滤出可解析的源文件。
2. 解析器根据文件类型选择适配器（TypeScript/Java），提取模块单元（导入、类、方法）。
3. 关系图构建器基于调用关系和方法索引构建节点与边的图结构。
4. 语义分析器优先从缓存读取方法语义，未命中时调用 LLM 或启发式规则补充语义标签。
5. 分析结果聚合后输出统计信息和文档内容。

## Key Capabilities

- 递归扫描代码仓库并过滤非源文件、过大文件及不可识别语言的文件。
- 支持 TypeScript 和 Java 源文件的模块、类、方法结构解析。
- 构建模块、类、方法和资源之间的静态调用关系图。
- 通过 LLM 或启发式规则为方法附加语义标签。
- 从环境变量加载 LLM 模型配置并支持缓存机制减少重复调用。

## Primary Areas

| Area | Modules | Responsibilities |
| --- | --- | --- |
| analyzer | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| Application | src/index.ts | 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 解析命令行参数，提取命令、目标路径和模型配置。 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。 |
| Configuration | package.json, tsconfig.json |  |
| core | src/core/types.ts |  |
| Documentation | README.md, SPEC.md, tests/fixtures/docs-only/README.md |  |
| graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 从模块单元中提取所有资源并去重排序，返回资源节点列表。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 |
| llm | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。 |
| parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。 |
| Project Files | scripts/secret-scan.mjs, tests/analyzeRepo.test.ts, tests/fixtures/docs-only/package.json, tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java, tests/fixtures/typescript-basic/src/app.ts | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 构造函数注入OrderService依赖。 处理创建订单的HTTP POST请求，调用订单服务并返回订单数据传输对象。 |
| scanner | src/scanner/repoScanner.ts | 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 根据文件扩展名和命名约定检测源代码语言类型。 |
| utils | src/utils/path.ts | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |

## Structure

| Metric | Count |
| --- | --- |
| Scanned files | 26 |
| Source files | 20 |
| Markdown documents | 3 |
| Modules | 26 |
| Classes | 2 |
| Method units | 124 |
| External resource nodes | 4 |
| Graph edges | 240 |

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
