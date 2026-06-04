# Architecture

## System Shape

系统采用分层架构，CLI 层负责参数解析与流程编排，分析器层协调扫描、解析、语义增强和关系图构建，输出层负责序列化与持久化。各层通过明确的模块边界解耦，LLM 调用通过工厂模式支持配置化切换。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| CLI 层 | src/index.ts | 解析命令行参数，验证参数合法性，编排分析流程，输出日志和结果文件路径。 |
| 分析器层 | src/analyzer/analyzeRepo.ts | 协调扫描、解析、语义分析和关系图构建，返回完整的分析结果。 |
| 扫描层 | src/scanner/repoScanner.ts | 递归扫描目录，过滤文件，检测语言类型，返回源文件信息列表。 |
| 解析层 | src/parser/moduleParser.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts, src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/parserAdapter.ts | 根据文件语言选择适配器，解析源文件为模块单元，包含导入、类和方法的结构化数据。 |
| 语义分析层 | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对方法附加启发式语义标签，通过 LLM 或缓存获取深度语义分析结果，更新模块和类摘要。 |
| 关系图构建层 | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边，支持调用关系解析。 |
| 输出层 | src/output/resultJsonWriter.ts | 将分析结果序列化为标准化 JSON 对象，写入 result.json 文件。 |
| 工具层 | src/utils/path.ts | 提供路径规范化、稳定标识符生成等通用工具函数。 |

## Critical Paths

- src/index.ts:main
- src/analyzer/analyzeRepo.ts:analyzeRepo
- src/scanner/repoScanner.ts:scanRepo
- src/parser/moduleParser.ts:parseModules
- src/llm/methodSemanticAnalyzer.ts:enrichModulesWithMethodSemantics
- src/graph/relationGraphBuilder.ts:buildRelationGraph
- src/output/resultJsonWriter.ts:writeResultJson

## Module Areas

| Area | Module Count | Method Units | Summary |
| --- | --- | --- | --- |
| analyzer | 1 | 1 | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| Application | 1 | 4 | 解析命令行参数，执行代码仓库分析并生成文档，将结果写入JSON文件并输出日志。 |
| Configuration | 2 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| core | 1 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| Documentation | 3 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 7 | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| llm | 4 | 31 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | 1 | 9 | 将结果数据写入指定目录下的 result.json 文件并返回文件路径。 |
| parser | 6 | 67 | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| Project Files | 5 | 10 | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 |
| scanner | 1 | 2 | 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 |
| utils | 1 | 2 | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 |

### analyzer

- 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。

### Application

- 解析命令行参数，执行代码仓库分析并生成文档，将结果写入JSON文件并输出日志。
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

### output

- 将结果数据写入指定目录下的 result.json 文件并返回文件路径。
- 将扫描结果、概览、质量数据和文档路径组装成标准化的 JSON 对象并返回。
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
- 构造函数注入OrderService依赖。
- 处理创建订单的HTTP POST请求，调用订单服务并返回订单数据传输对象。
- 定时触发订单对账任务，委托给订单服务执行对账逻辑。
- 从Kafka主题'order-events'消费消息并委托给orderService处理。

### scanner

- 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。
- 根据文件扩展名和命名约定检测源代码语言类型。

### utils

- 将路径分隔符转换为正斜杠以生成POSIX风格路径。
- 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。

## Core Method Hotspots

| Method | Module | Summary |
| --- | --- | --- |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。 |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| enrichModulesWithMethodSemantics | src/llm/methodSemanticAnalyzer.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| loadModelConfig | src/llm/modelConfig.ts | 从环境变量中加载并解析LLM模型配置，返回一个ModelConfig对象。 |
| buildRelationGraph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，包含节点和边。 |
| routeFromAnnotations | src/parser/javaStructureParser.ts | 从注解列表中解析出HTTP方法和路径，结合类路由前缀生成完整路由。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 从Java类块中提取类单元，包括方法列表和类元数据。 |
| extractFrameworkHints | src/parser/javaStructureParser.ts | 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。 |
| main | src/index.ts | 解析命令行参数，执行代码仓库分析并生成文档，将结果写入JSON文件并输出日志。 |
| parseModelResponse | src/llm/methodSemanticAnalyzer.ts | 解析模型响应，提取内容并验证为方法语义结构后返回标准化结果。 |
| parseJavaModule | src/parser/javaStructureParser.ts | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |

## Runtime Resources

| Resource | Kind |
| --- | --- |
| ENV:ORDER_TABLE | env |
| ENV:ORDER_TOPIC | env |
| FILE:result.json | file |
| HTTP:https://api.deepseek.com | http |
| HTTP:https://payments.example.com/charge | http |
