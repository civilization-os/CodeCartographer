# Architecture

## System Shape

系统采用分层架构，从上到下依次为应用层、分析层、文档层、LLM 层、输出层、解析层、扫描层和工具层。应用层负责 CLI 入口和参数解析；分析层协调扫描、解析、关系图构建和语义分析；文档层将分析结果渲染为 Markdown；LLM 层提供语义分析能力；输出层负责结果序列化和文件写入；解析层封装语言特定的 AST 解析逻辑；扫描层负责文件遍历和过滤；工具层提供路径处理等通用工具。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| Application | src/index.ts | CLI 入口，解析命令行参数，加载配置，协调分析流程，输出结果。 |
| Analyzer | src/analyzer/analyzeRepo.ts | 协调扫描、解析、关系图构建和语义分析，返回完整分析结果。 |
| Documentation | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts | 将分析结果渲染为 Markdown 文档，包括项目概览、架构文档、模块列表、质量报告和叙事文档。 |
| LLM | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 管理 LLM 模型配置和工厂，提供方法语义分析能力，支持缓存和启发式降级。 |
| Output | src/output/resultJsonWriter.ts | 将分析结果序列化为 JSON，写入文件系统，生成差异报告和变更摘要。 |
| Parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 封装语言特定的 AST 解析逻辑，提取模块、类、方法及其元数据。 |
| Scanner | src/scanner/repoScanner.ts | 递归扫描目录，过滤排除项、大文件和未知语言文件，返回源文件列表。 |
| Graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| Utils | src/utils/path.ts | 提供路径规范化、稳定标识符生成等通用工具函数。 |

## Critical Paths

- src/index.ts:main
- src/analyzer/analyzeRepo.ts:analyzeRepo
- src/scanner/repoScanner.ts:scanDirectory
- src/parser/typescriptStructureParser.ts:extractCallableUnit
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
| docs | 5 | 55 | 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。 |
| Documentation | 2 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 7 | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| llm | 4 | 31 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | 1 | 32 | 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。 |
| parser | 6 | 67 | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| Project Files | 2 | 1 | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 |
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
- 生成项目概览的 Markdown 字符串，包含仓库路径、扫描时间、目的、运营模型、关键能力、主要区域、结构统计、语义分析器配置、扫描配置和生成输出列表。
- 生成架构文档的完整 Markdown 字符串，包含系统形状、架构层、关键路径、模块区域、核心热点方法和运行时资源等章节。
- 将模块列表渲染为包含概览表格和每个模块详细信息的 Markdown 字符串。
- 将方法的入口点和框架提示信息格式化为逗号分隔的唯一字符串。

### graph

- 构建模块、类、方法和资源之间的关系图，包含节点和边。
- 从模块单元中提取所有资源并去重排序，返回资源节点列表。
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
- 将 ClassUnit 对象序列化为包含 id、name、modulePath、location、summary 和 methodIds 的普通对象。
- 将 MethodUnit 对象序列化为一个包含其所有属性的普通 JSON 对象。

### parser

- 解析Java源文件并提取模块单元信息，包括导入、类和方法。
- 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。
- 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。
- 从Java类块中提取类单元，包括方法列表和类元数据。
- 从Java类块中提取所有方法块，返回方法定义的位置和元数据。

### Project Files

- 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。

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
| heading | src/docs/markdown.ts | 生成指定级别的 Markdown 标题字符串。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| table | src/docs/markdown.ts | 生成 Markdown 表格字符串，包含表头、分隔符和行数据。 |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。 |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| enrichModulesWithMethodSemantics | src/llm/methodSemanticAnalyzer.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| loadModelConfig | src/llm/modelConfig.ts | 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。 |
| bulletList | src/docs/markdown.ts | 将字符串数组转换为Markdown格式的无序列表，若数组为空则返回默认占位符。 |
| composeProjectNarrative | src/docs/narrativeComposer.ts | 根据分析结果和语义概览生成项目叙事文档，支持缓存和模型调用降级。 |
| buildSemanticOverview | src/docs/semanticAggregator.ts | 根据分析结果构建语义概览，包括入口点、热点方法、调用流、业务流和资源使用情况。 |

## Runtime Resources

| Resource | Kind |
| --- | --- |
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
