# Architecture

## System Shape

系统采用分层架构，自底向上依次为扫描层、解析层、分析层、文档生成层和输出层。扫描层负责文件遍历和语言识别；解析层将源文件转换为结构化模块单元；分析层构建关系图并执行语义增强；文档生成层将分析结果渲染为 Markdown；输出层序列化结果并写入文件系统。LLM 模块作为可选的外部语义分析服务。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| 扫描层 | src/scanner/repoScanner.ts | 递归扫描目录，过滤排除项和大文件，按扩展名识别语言类型，返回源文件信息列表。 |
| 解析层 | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 将源文件文本解析为模块单元，提取导入、类、方法、资源和字段类型信息。 |
| 分析层 | src/analyzer/analyzeRepo.ts, src/graph/relationGraphBuilder.ts, src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts | 协调扫描和解析结果，构建关系图，执行语义分析（缓存+LLM+启发式），生成最终分析结果。 |
| 文档生成层 | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts | 将分析结果渲染为多份 Markdown 文档，包含概览、架构、模块、业务流和质量报告。 |
| 输出层 | src/output/resultJsonWriter.ts | 将分析结果序列化为 JSON，写入文件系统，生成差异报告和变更摘要。 |
| 配置与入口层 | src/index.ts, src/config/projectConfig.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 解析 CLI 参数，加载项目配置和 LLM 模型配置，协调各层执行流程。 |

## Critical Paths

- src/index.ts:main
- src/analyzer/analyzeRepo.ts:analyzeRepo
- src/scanner/repoScanner.ts:scanDirectory
- src/parser/moduleParser.ts:parseModule
- src/graph/relationGraphBuilder.ts:buildRelationGraph
- src/llm/methodSemanticAnalyzer.ts:enrichModulesWithMethodSemantics
- src/docs/docsGenerator.ts:generateDocs
- src/output/resultJsonWriter.ts:writeResultJson

## Module Areas

| Area | Module Count | Method Units | Summary |
| --- | --- | --- | --- |
| analyzer | 1 | 2 | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| Application | 1 | 4 | 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。 |
| config | 1 | 3 | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 |
| Configuration | 3 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| core | 1 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| docs | 5 | 63 | 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。 |
| Documentation | 3 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 8 | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 |
| llm | 4 | 31 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | 1 | 32 | 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。 |
| parser | 6 | 78 | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 |
| Project Files | 5 | 7 | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 |
| scanner | 1 | 5 | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 |
| utils | 1 | 2 | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 |

### analyzer

- 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。
- 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。

### Application

- 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。
- 解析命令行参数，提取命令、目标路径和环境变量覆盖值。
- 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。
- 打印 see-code 工具的使用说明和命令行参数帮助信息。

### config

- 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
- 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。
- 判断未知错误是否为 Node.js 的 ErrnoException 类型。

### docs

- 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。
- 生成项目概览的 Markdown 字符串，包含仓库路径、扫描时间、目的、运营模型、关键能力、模块分组、结构统计、语义分析器配置、扫描配置和生成输出列表。
- 生成架构文档的完整 Markdown 字符串，包含系统形状、架构层、关键路径、模块区域、核心热点方法和运行时资源等章节。
- 生成模块文档的 Markdown 字符串，包含模块概览表格和每个模块的详细信息（导入、类、高信号方法）。
- 检查模块单元是否包含导入、类或方法中的任意一项。

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
- 从Java源代码块中提取类单元，包括方法、资源和字段类型信息。
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
| generateDocs | src/docs/docsGenerator.ts | 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。 |
| buildResultDiff | src/output/resultJsonWriter.ts | 比较两个记录对象，生成包含文件、方法、入口点、资源和业务流程差异的结构化差异报告。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| heading | src/docs/markdown.ts | 生成指定级别的 Markdown 标题字符串。 |
| table | src/docs/markdown.ts | 生成 Markdown 表格字符串，包含表头、分隔符和行数据。 |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。 |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| enrichModulesWithMethodSemantics | src/llm/methodSemanticAnalyzer.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| loadModelConfig | src/llm/modelConfig.ts | 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 从Java源代码块中提取类单元，包括方法、资源和字段类型信息。 |
| renderBusinessFlows | src/docs/docsGenerator.ts | 根据语义概览和项目叙事生成业务流文档，包含步骤、资源和入口信息，若无业务流则输出占位说明。 |
| bulletList | src/docs/markdown.ts | 将字符串数组转换为Markdown格式的无序列表，若数组为空则返回默认占位符。 |

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
