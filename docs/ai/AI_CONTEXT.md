# AI Context

This document is a compact handoff for AI agents and automation. Use `.see-code/result.json` for the full machine-readable graph and method inventory.

## Project

| Field | Value |
| --- | --- |
| Purpose | 该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。 |
| Root path | /root/project/ai/see_code |
| Scanned at | 2026-06-05T03:37:34.777Z |
| LLM | deepseek/deepseek-chat |
| Cache | enabled |

## Stats

| Metric | Value |
| --- | --- |
| Files | 42 |
| Source files | 33 |
| Modules | 42 |
| Classes | 2 |
| Methods | 270 |
| Business flows | 1 |
| Static flows | 8 |
| Resources | 28 |
| Graph edges | 653 |

## Subsystems

| Name | Modules | Methods | Responsibilities |
| --- | --- | --- | --- |
| analyzer | 2 | 11 | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。 |
| Application | 1 | 2 | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 printHelp 定义一个可调用单元；调用 console.log。 |
| cli | 5 | 19 | runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。 parseCliArgs 定义一个可调用单元；调用 commandFrom, excludes.push, parsePositiveInteger, positional.push, rawArgs.filter。 |
| config | 1 | 3 | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。 |
| Configuration | 3 | 0 |  |
| core | 1 | 0 |  |
| docs | 5 | 67 | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 renderDocIndex 定义一个可调用单元；调用 String, bulletList, docRows.map, docs.get, docs.has；访问 FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/CHANGE_SUMMARY.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 |
| Documentation | 4 | 0 |  |
| graph | 1 | 8 | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 从模块单元中提取所有资源并去重排序，返回资源节点数组。 |
| llm | 4 | 32 | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 |
| output | 1 | 32 | writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。 将扫描结果、概览、质量数据和文档路径组装为结构化的 JSON 对象并返回。 |
| parser | 6 | 82 | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 |
| Project Files | 6 | 7 | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 读取相对于仓库根目录的 JSON 文件并返回解析后的数据。 |
| scanner | 1 | 5 | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 检查文件路径或名称是否匹配任意一个排除模式。 |
| utils | 1 | 2 | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |

## Entrypoints

| Name | Kind | Location | Summary |
| --- | --- | --- | --- |
| main function | cli | src/index.ts:8 | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 |

## Key Static Flows

| Flow | Entry | Steps | Resources |
| --- | --- | --- | --- |
| extractClassUnit | src/parser/javaStructureParser.ts:144 | extractClassUnit -> buildMethodReturnTypeIndex -> buildMethodUnit -> extractClassResources -> extractFieldTypes -> extractMethodBlocks -> locationFromOffsets -> requestMappingPath -> stableId -> summarizeClass |  |
| main | src/index.ts:8 | main -> normalizeProvider -> parseCliArgs -> printHelp -> runAnalyzeCommand -> runDoctorCommand -> runInitCommand -> runInteractiveCommand -> commandFrom -> parsePositiveInteger | FILE:QUALITY_REPORT.md, FILE:README.md |
| extractFrameworkHints | src/parser/javaStructureParser.ts:578 | extractFrameworkHints -> annotationAttribute -> annotationByName -> firstAnnotationString -> hasAnnotation -> isRepositoryClass -> routeFromAnnotations -> annotationName -> joinRoutePaths -> requestMappingMethod |  |
| parseJavaModule | src/parser/javaStructureParser.ts:84 | parseJavaModule -> buildClassResourceIndex -> buildLineIndex -> extractClassBlocks -> maskJavaSource -> stableId -> extractClassResources -> findMatchingBrace -> annotationAttribute -> annotationByName |  |
| parseTypeScriptModule | src/parser/typescriptStructureParser.ts:15 | parseTypeScriptModule -> extractFunctionUnit -> extractVariableFunctionUnit -> stableId -> summarizeModule -> extractCallableUnit -> buildSignature -> extractParameters -> getLocation -> hasModifier |  |
| extractClassUnit | src/parser/typescriptStructureParser.ts:96 | extractClassUnit -> extractCallableUnit -> getLocation -> stableId -> buildSignature -> extractParameters -> hasModifier -> isJavaScriptFile |  |
| generateFixtureOutput | tests/schemaContract.test.ts:88 | generateFixtureOutput -> analyzeRepo -> generateDocs -> writeResultJson -> addSyntheticRepositoryMethods -> attachHeuristicSemantics -> buildRelationGraph -> buildScanRuntimeInfo -> enrichModulesWithMethodSemantics -> loadModelConfig | FILE:CHANGE_SUMMARY.md, FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md, FILE:deep-dive/EXECUTION_FLOWS.md, FILE:deep-dive/MAINTENANCE_GUIDE.md |
| extractResources | src/graph/relationGraphBuilder.ts:117 | extractResources -> resourceKind -> stableId |  |

## Hot Methods

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

## External Resources

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

## Handoff

- Use `human/SYSTEM_MAP.md` for the shortest human summary.
- Use `human/PROJECT_OVERVIEW.md` and `human/ARCHITECTURE.md` for narrative explanation.
- Use `deep-dive/MODULES.md` and `deep-dive/CALL_GRAPH.md` only when method-level or edge-level detail is needed.
- Use `.see-code/result.json` for complete structured data and `.see-code/result-diff.json` for deltas.
