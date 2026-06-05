# Architecture

## System Shape

该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。

## Architecture Layers

| Layer | Modules | Responsibility |
| --- | --- | --- |
| analyzer | src/analyzer/analyzeRepo.ts, src/analyzer/syntheticRepositoryMethods.ts | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 |
| Application | src/index.ts | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 |
| cli | src/cli/analyzeCommand.ts, src/cli/args.ts, src/cli/doctorCommand.ts, src/cli/initCommand.ts, src/cli/interactiveCommand.ts | runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。 |
| config | src/config/projectConfig.ts | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 |
| Configuration | package.json, see-code.config.json, tsconfig.json | Configuration 区域包含 3 个模块、0 个类和 0 个方法单元。 |
| core | src/core/types.ts | core 区域包含 1 个模块、0 个类和 0 个方法单元。 |
| docs | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 |
| Documentation | evaluations/book-social-network.md, evaluations/spring-petclinic.md, README.md, SPEC.md | Documentation 区域包含 4 个模块、0 个类和 0 个方法单元。 |
| graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 |
| llm | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | src/output/resultJsonWriter.ts | writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。 |
| parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 |
| Project Files | schema/result-diff.schema.json, schema/result.schema.json, scripts/secret-scan.mjs, tests/analyzeRepo.test.ts, tests/cli.test.ts, tests/schemaContract.test.ts | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 |
| scanner | src/scanner/repoScanner.ts | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 |
| utils | src/utils/path.ts | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 |

## Critical Paths

- src/docs/docsGenerator.ts#generateDocs: generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。
- src/docs/markdown.ts#heading: 生成指定级别的 Markdown 标题字符串。
- src/docs/markdown.ts#table: 生成 Markdown 表格字符串，包含表头、分隔符和行数据。
- src/analyzer/analyzeRepo.ts#analyzeRepo: 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。
- src/output/resultJsonWriter.ts#buildResultDiff: 比较两个记录对象，生成包含文件、方法、入口点、资源和业务流程差异的结构化差异报告。
- src/cli/interactiveCommand.ts#runInteractiveCommand: runInteractiveCommand 定义一个可调用单元；调用 ask, askSecret, askYesNo, console.log, defaultModel。

## Module Areas

| Area | Module Count | Method Units | Summary |
| --- | --- | --- | --- |
| analyzer | 2 | 11 | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 |
| Application | 1 | 2 | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 |
| cli | 5 | 19 | runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。 |
| config | 1 | 3 | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 |
| Configuration | 3 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| core | 1 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| docs | 5 | 67 | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 |
| Documentation | 4 | 0 | 该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。 |
| graph | 1 | 8 | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 |
| llm | 4 | 32 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 |
| output | 1 | 32 | writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。 |
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

- main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。
- printHelp 定义一个可调用单元；调用 console.log。

### cli

- runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。
- parseCliArgs 定义一个可调用单元；调用 commandFrom, excludes.push, parsePositiveInteger, positional.push, rawArgs.filter。
- 将字符串或未定义值标准化为有效的ModelProvider枚举值，若无效则抛出错误。
- 根据输入字符串或默认值返回对应的 CLI 命令类型。
- 验证命令行标志参数值是否存在且不以'--'开头，否则抛出错误。

### config

- 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
- 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。
- 判断未知错误是否为 Node.js 的 ErrnoException 类型。

### docs

- generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。
- renderDocIndex 定义一个可调用单元；调用 String, bulletList, docRows.map, docs.get, docs.has；访问 FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/CHANGE_SUMMARY.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。
- renderSystemMap 定义一个可调用单元；调用 String, bulletList, corePipeline.slice, formatMethodName, group.modules.some。
- renderAiContext 定义一个可调用单元；调用 String, bulletList, externalResources.slice, flow.resources.slice, flow.steps.map。
- renderProjectOverview 定义一个可调用单元；调用 String, bulletList, group.modules.map, group.responsibilities.slice, heading。

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

- writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。
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
| generateDocs | src/docs/docsGenerator.ts | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 |
| heading | src/docs/markdown.ts | 生成指定级别的 Markdown 标题字符串。 |
| table | src/docs/markdown.ts | 生成 Markdown 表格字符串，包含表头、分隔符和行数据。 |
| analyzeRepo | src/analyzer/analyzeRepo.ts | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 |
| buildResultDiff | src/output/resultJsonWriter.ts | 比较两个记录对象，生成包含文件、方法、入口点、资源和业务流程差异的结构化差异报告。 |
| runInteractiveCommand | src/cli/interactiveCommand.ts | runInteractiveCommand 定义一个可调用单元；调用 ask, askSecret, askYesNo, console.log, defaultModel。 |
| bulletList | src/docs/markdown.ts | 将字符串数组转换为Markdown格式的无序列表，若数组为空则返回默认占位符。 |
| stableId | src/utils/path.ts | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| formatMethodName | src/docs/semanticAggregator.ts | 根据方法单元是否包含类名，格式化返回方法名称字符串。 |
| loadModelConfig | src/llm/modelConfig.ts | loadModelConfig 定义一个可调用单元；调用 Boolean, defaultBaseUrl, defaultModel, getApiKey, modelProviderSchema.parse。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 从Java源代码中提取类单元，包括方法、字段、资源和路由前缀，并构建ClassUnit对象。 |
| extractCallableUnit | src/parser/typescriptStructureParser.ts | 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。 |

## Runtime Resources

| Resource | Kind |
| --- | --- |
| ENV:DB_DELETE | env |
| ENV:DB_READ | env |
| ENV:DB_WRITE | env |
| ENV:no_proxy | env |
| ENV:NO_PROXY | env |
| FILE:ai/AI_CONTEXT.md | file |
| FILE:CHANGE_SUMMARY.md | file |
| FILE:config.json | file |
| FILE:deep-dive/CALL_GRAPH.md | file |
| FILE:deep-dive/CHANGE_SUMMARY.md | file |
| FILE:deep-dive/DATA_AND_RESOURCES.md | file |
| FILE:deep-dive/ENTRYPOINTS.md | file |
| FILE:deep-dive/EXECUTION_FLOWS.md | file |
| FILE:deep-dive/MAINTENANCE_GUIDE.md | file |
| FILE:deep-dive/MODULES.md | file |
| FILE:FILE:method-semantics.json | file |
| FILE:human/ARCHITECTURE.md | file |
| FILE:human/BUSINESS_FLOWS.md | file |
| FILE:human/PROJECT_OVERVIEW.md | file |
| FILE:human/QUALITY_REPORT.md | file |
| FILE:human/SYSTEM_MAP.md | file |
| FILE:package.json | file |
| FILE:project-narratives.json | file |
| FILE:QUALITY_REPORT.md | file |
| FILE:README.md | file |
| FILE:result-diff.json | file |
| FILE:result.json | file |
| HTTP:https://api.deepseek.com | http |
