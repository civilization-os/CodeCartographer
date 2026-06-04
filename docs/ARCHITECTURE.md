# Architecture

## System Shape

系统采用分层架构，由 CLI 层、分析引擎层、解析器层、图构建层、LLM 语义分析层和文档输出层组成。CLI 层负责命令分发和参数解析；分析引擎层协调扫描、解析、图构建和语义分析流程；解析器层按语言适配器模式实现；图构建层生成节点和边集合；LLM 层提供可缓存的语义分析；文档输出层将结果序列化为 Markdown 和 JSON。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| CLI 层 | src/index.ts, src/cli/args.ts, src/cli/analyzeCommand.ts, src/cli/initCommand.ts, src/cli/doctorCommand.ts, src/cli/interactiveCommand.ts | 解析命令行参数，根据子命令分发执行交互、分析、初始化、诊断或帮助操作。 |
| 分析引擎层 | src/analyzer/analyzeRepo.ts, src/analyzer/syntheticRepositoryMethods.ts | 协调扫描、解析、图构建和语义分析流程，组装最终分析结果。 |
| 解析器层 | src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts, src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts | 按语言适配器模式解析源文件，提取模块单元（类、方法、导入、资源）。 |
| 图构建层 | src/graph/relationGraphBuilder.ts | 从模块单元中提取节点（模块、类、方法、资源）和边（调用关系、资源引用），构建关系图。 |
| LLM 语义分析层 | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对方法进行语义分析，优先使用缓存，未缓存方法通过 LLM 或启发式规则分析，更新模块和类摘要。 |
| 文档输出层 | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts, src/output/resultJsonWriter.ts | 将分析结果序列化为 Markdown 文档和 JSON 文件，包括项目概览、架构、模块、业务流程、质量报告和差异报告。 |

## Critical Paths

- src/index.ts:main
- src/cli/analyzeCommand.ts:runAnalyzeCommand
- src/analyzer/analyzeRepo.ts:analyzeRepo
- src/scanner/repoScanner.ts:scanDirectory
- src/parser/moduleParser.ts:parseModules
- src/graph/relationGraphBuilder.ts:buildRelationGraph
- src/llm/methodSemanticAnalyzer.ts:enrichModulesWithMethodSemantics
- src/docs/docsGenerator.ts:generateDocs
- src/output/resultJsonWriter.ts:writeResult

## Module Areas

| Area | Module Count | Method Units | Summary |
| --- | --- | --- | --- |
| analyzer | 2 | 11 | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 |
| Application | 1 | 2 | 解析命令行参数并根据子命令分发执行交互、分析、初始化、诊断或帮助操作。 |
| cli | 5 | 19 | 执行代码仓库分析命令，加载配置，调用分析引擎，生成文档并输出结果。 |
| config | 1 | 3 | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 |
| Configuration | 3 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| core | 1 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| docs | 5 | 65 | 生成工程文档，将分析结果写入指定目录的多个Markdown文件，并返回写入路径及摘要信息。 |
| Documentation | 4 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 8 | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 |
| llm | 4 | 31 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | 1 | 32 | 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。 |
| parser | 6 | 82 | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 |
| Project Files | 6 | 7 | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 |
| scanner | 1 | 5 | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 |
| utils | 1 | 2 | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 |

### analyzer

- 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。
- 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。
- 为每个仓库操作生成合成方法并注入到对应的类和模块中。
- 遍历模块列表，为每个包含对应REPOSITORY资源的类建立名称到引用对象的映射。
- 从模块方法中收集所有仓库操作调用和资源引用，去重后按仓库名和操作名排序返回。

### Application

- 解析命令行参数并根据子命令分发执行交互、分析、初始化、诊断或帮助操作。
- 打印 CodeCartographer 工具的帮助信息，包括用法、命令、选项和环境变量说明。

### cli

- 执行代码仓库分析命令，加载配置，调用分析引擎，生成文档并输出结果。
- 解析命令行参数并返回结构化的 CliOptions 对象，包含命令、目标路径、环境变量覆盖、排除列表等配置。
- 将字符串或未定义值标准化为有效的ModelProvider枚举值，若无效则抛出错误。
- 根据输入字符串或默认值返回对应的 CLI 命令类型。
- 验证命令行标志参数值是否存在且不以'--'开头，否则抛出错误。

### config

- 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
- 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。
- 判断未知错误是否为 Node.js 的 ErrnoException 类型。

### docs

- 生成工程文档，将分析结果写入指定目录的多个Markdown文件，并返回写入路径及摘要信息。
- 生成文档索引页面，包含项目快照、推荐阅读顺序、文档映射表和机器可读输出列表。
- 生成项目概览的 Markdown 字符串，包含仓库元数据、目的、能力、模块分组、结构统计、语义分析器配置、扫描配置和输出文件列表。
- 生成架构文档的完整 Markdown 字符串，包含系统形状、架构层、关键路径、模块区域、核心热点方法和运行时资源等章节。
- 生成模块文档的 Markdown 字符串，包含模块概览表格和每个模块的详细信息（导入、类、高信号方法）。

### graph

- 构建模块、类、方法和资源之间的关系图，返回节点和边集合。
- 从模块单元中提取所有资源并去重排序，返回资源节点数组。
- 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。
- 根据调用字符串和方法索引解析唯一的方法单元，优先精确匹配，其次尝试通过最后一段名称匹配。
- 根据函数调用名称返回一个数值分数，用于表示该调用的重要性或影响程度。

### llm

- 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。
- 将未知类型的错误对象转换为字符串消息。
- 遍历模块列表，为每个方法附加启发式语义标签。
- 使用大语言模型分析方法的语义信息并返回结构化结果。
- 解析模型响应，提取内容并验证为方法语义结构后返回标准化结果。

### output

- 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。
- 将扫描结果、概览、质量数据和文档路径组装为结构化的 JSON 对象并返回。
- 将模块单元序列化为包含标识符、路径、语言、导入、摘要以及类和方法的ID列表的普通对象。
- 将 ClassUnit 对象序列化为包含 id、name、modulePath、location、summary、resources 和 methodIds 字段的普通对象。
- 将 MethodUnit 对象序列化为一个包含其所有属性的普通 JSON 对象。

### parser

- 解析Java源文件并提取模块单元信息，包括类、方法和导入。
- 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。
- 从Java源代码中提取类、接口、枚举和记录的定义块，包括注解、声明和代码范围。
- 从Java源代码中提取类单元，包括方法、字段、资源和路由前缀，并构建ClassUnit对象。
- 从Java类块中提取实体、表和仓库资源标识符。

### Project Files

- 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。
- 读取相对于仓库根目录的 JSON 文件并返回解析后的数据。
- 异步读取指定路径的JSON文件并解析为泛型类型。
- 在临时目录中复制Java Spring测试夹具，执行仓库分析和文档生成，并将结果写入JSON文件。
- 递归验证未知值是否符合给定的 JSON Schema 约束，包括常量、类型、必需属性、禁止属性及嵌套属性。

### scanner

- 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。
- 检查文件路径或名称是否匹配任意一个排除模式。
- 判断给定相对路径或文件名是否匹配排除模式（支持通配符）。
- 转义字符串中的正则表达式特殊字符，返回安全用于正则匹配的字符串。
- 根据文件扩展名和命名约定检测源代码语言类型。

### utils

- 将路径分隔符转换为正斜杠以生成POSIX风格路径。
- 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。

## Core Method Hotspots

| Method | Module | Summary |
| --- | --- | --- |
| generateDocs | src/docs/docsGenerator.ts | 生成工程文档，将分析结果写入指定目录的多个Markdown文件，并返回写入路径及摘要信息。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 |
| heading | src/docs/markdown.ts | 生成指定级别的 Markdown 标题字符串。 |
| buildResultDiff | src/output/resultJsonWriter.ts | 比较两个记录对象，生成包含文件、方法、入口点、资源和业务流程差异的结构化差异报告。 |
| runInteractiveCommand | src/cli/interactiveCommand.ts | 通过交互式命令行引导用户配置并依次执行初始化、诊断和分析命令。 |
| table | src/docs/markdown.ts | 生成 Markdown 表格字符串，包含表头、分隔符和行数据。 |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| loadModelConfig | src/llm/modelConfig.ts | 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 从Java源代码中提取类单元，包括方法、字段、资源和路由前缀，并构建ClassUnit对象。 |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。 |
| bulletList | src/docs/markdown.ts | 将字符串数组转换为Markdown格式的无序列表，若数组为空则返回默认占位符。 |
| enrichModulesWithMethodSemantics | src/llm/methodSemanticAnalyzer.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |

## Runtime Resources

| Resource | Kind |
| --- | --- |
| ENV:DB_DELETE | env |
| ENV:DB_READ | env |
| ENV:DB_WRITE | env |
| FILE:ARCHITECTURE.md | file |
| FILE:BUSINESS_FLOWS.md | file |
| FILE:CALL_GRAPH.md | file |
| FILE:CHANGE_SUMMARY.md | file |
| FILE:config.json | file |
| FILE:DATA_AND_RESOURCES.md | file |
| FILE:DOC_INDEX.md | file |
| FILE:ENTRYPOINTS.md | file |
| FILE:EXECUTION_FLOWS.md | file |
| FILE:FILE:method-semantics.json | file |
| FILE:MAINTENANCE_GUIDE.md | file |
| FILE:MODULES.md | file |
| FILE:package.json | file |
| FILE:PROJECT_OVERVIEW.md | file |
| FILE:project-narratives.json | file |
| FILE:QUALITY_REPORT.md | file |
| FILE:result-diff.json | file |
| FILE:result.json | file |
| HTTP:https://api.deepseek.com | http |
