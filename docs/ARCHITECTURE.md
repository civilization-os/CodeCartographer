# Architecture

## System Shape

系统采用分层架构，从上到下依次为 CLI 入口层、分析编排层、语义分析层、关系图构建层、解析层和扫描层。各层通过模块化接口协作，数据流单向传递。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| Application | src/index.ts | 解析命令行参数，编排分析流程，输出结果和统计信息。 |
| Analyzer | src/analyzer/analyzeRepo.ts | 协调扫描、解析、关系图构建和语义分析，返回完整分析结果。 |
| LLM | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 管理 LLM 模型配置和工厂，执行方法语义分析，维护缓存。 |
| Graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| Parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 根据文件类型选择适配器，解析源文件为模块单元（导入、类、方法）。 |
| Scanner | src/scanner/repoScanner.ts | 递归扫描目录，过滤文件，返回源文件信息列表。 |
| Utils | src/utils/path.ts | 提供路径规范化和稳定标识符生成工具。 |

## Critical Paths

- src/index.ts:main
- src/analyzer/analyzeRepo.ts:analyzeRepo
- src/scanner/repoScanner.ts:scanRepo
- src/parser/moduleParser.ts:parseModules
- src/graph/relationGraphBuilder.ts:buildRelationGraph
- src/llm/methodSemanticAnalyzer.ts:enrichModulesWithMethodSemantics

## Module Areas

| Area | Module Count | Method Units | Summary |
| --- | --- | --- | --- |
| analyzer | 1 | 1 | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| Application | 1 | 4 | 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 |
| Configuration | 2 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| core | 1 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| Documentation | 2 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 7 | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| llm | 4 | 31 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| parser | 6 | 66 | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| scanner | 1 | 2 | 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 |
| utils | 1 | 2 | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 |

### analyzer

- 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。

### Application

- 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。
- 解析命令行参数，提取命令、目标路径和模型配置。
- 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。
- 打印 see-code 工具的使用说明和命令行参数帮助信息。

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

### parser

- 解析Java源文件并提取模块单元信息，包括导入、类和方法。
- 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。
- 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。
- 从Java类块中提取类单元，包括方法列表和类元数据。
- 从Java类块中提取所有方法块，返回方法定义的位置和元数据。

### scanner

- 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。
- 根据文件扩展名和命名约定检测源代码语言类型。

### utils

- 将路径分隔符转换为正斜杠以生成POSIX风格路径。
- 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。

## Core Method Hotspots

| Method | Module | Summary |
| --- | --- | --- |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| enrichModulesWithMethodSemantics | src/llm/methodSemanticAnalyzer.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| loadModelConfig | src/llm/modelConfig.ts | 从环境变量中加载并解析LLM模型配置，返回一个ModelConfig对象。 |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript源文件中提取可调用单元（函数、方法、构造函数、箭头函数或函数表达式）并构建MethodUnit对象。 |
| buildRelationGraph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| routeFromAnnotations | src/parser/javaStructureParser.ts | 从注解列表中解析出HTTP方法和路径，结合类路由前缀生成完整路由。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 从Java类块中提取类单元，包括方法列表和类元数据。 |
| extractFrameworkHints | src/parser/javaStructureParser.ts | 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。 |
| parseModelResponse | src/llm/methodSemanticAnalyzer.ts | 解析模型响应，提取内容并验证为方法语义结构后返回标准化结果。 |
| parseJavaModule | src/parser/javaStructureParser.ts | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| extractMethodBlocks | src/parser/javaStructureParser.ts | 从Java类块中提取所有方法块，返回方法定义的位置和元数据。 |

## Runtime Resources

| Resource | Kind |
| --- | --- |
| HTTP:https://api.deepseek.com | http |
