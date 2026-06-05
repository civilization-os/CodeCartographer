# Project Overview

Repository path: `/root/project/ai/see_code`

Scan time: `2026-06-05T11:48:45.941Z`

## Purpose

该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。

## Operating Model

1. 入口方法沿 8 条静态执行流调用内部方法，形成可追踪的处理路径。
2. analyzer、Application、cli、config 等模块共同承载领域模型、入口处理和支撑逻辑。
3. `.see-code/result.json` 保留完整模块、类、方法、资源和调用图，Markdown 文档面向人工阅读展示关键路径。

## Key Capabilities

- analyzer: 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。
- Application: main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。
- cli: runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。
- config: 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
- docs: generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。
- graph: 构建模块、类、方法和资源之间的关系图，返回节点和边集合。
- llm: 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。
- output: writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。
- parser: 解析Java源文件并提取模块单元信息，包括类、方法和导入。
- Project Files: 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。
- scanner: 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。
- utils: 将路径分隔符转换为正斜杠以生成POSIX风格路径。

## Primary Areas

| Area | Modules | Responsibilities |
| --- | --- | --- |
| analyzer | src/analyzer/analyzeRepo.ts, src/analyzer/syntheticRepositoryMethods.ts | 分析指定代码仓库，提取模块、方法、类、资源和关系图，并返回分析结果。 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。 为每个仓库操作生成合成方法并注入到对应的类和模块中。 |
| Application | src/index.ts | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 printHelp 定义一个可调用单元；调用 console.log。 |
| cli | src/cli/analyzeCommand.ts, src/cli/args.ts, src/cli/doctorCommand.ts, src/cli/initCommand.ts, src/cli/interactiveCommand.ts, src/cli/modelCommand.ts | runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。 parseCliArgs 定义一个可调用单元；调用 COMMANDS.has, commandFrom, excludes.push, parsePositiveInteger, positional.push。 将字符串或未定义值标准化为有效的ModelProvider枚举值，若无效则抛出错误。 |
| config | src/config/projectConfig.ts | 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。 递归遍历对象并检查是否包含敏感键名，若发现则抛出错误。 判断未知错误是否为 Node.js 的 ErrnoException 类型。 |
| Configuration | package.json, see-code.config.json, tsconfig.json |  |
| core | src/core/types.ts |  |
| docs | src/docs/docsGenerator.ts, src/docs/markdown.ts, src/docs/narrativeComposer.ts, src/docs/qualityReport.ts, src/docs/semanticAggregator.ts | generateDocs 定义一个可调用单元；调用 buildQualitySummary, buildSemanticOverview, composeProjectNarrative, content.trim, docs.set；访问 FILE:README.md, FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 renderDocIndex 定义一个可调用单元；调用 String, bulletList, docRows.map, docs.get, docs.has；访问 FILE:ai/AI_CONTEXT.md, FILE:deep-dive/CALL_GRAPH.md, FILE:deep-dive/CHANGE_SUMMARY.md, FILE:deep-dive/DATA_AND_RESOURCES.md, FILE:deep-dive/ENTRYPOINTS.md。 renderSystemMap 定义一个可调用单元；调用 String, bulletList, corePipeline.slice, formatMethodName, group.modules.some。 |
| Documentation | evaluations/book-social-network.md, evaluations/spring-petclinic.md, README.md, SPEC.md |  |
| graph | src/graph/relationGraphBuilder.ts | 构建模块、类、方法和资源之间的关系图，返回节点和边集合。 从模块单元中提取所有资源并去重排序，返回资源节点数组。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 |
| llm | src/llm/methodSemanticAnalyzer.ts, src/llm/methodSemanticCache.ts, src/llm/modelConfig.ts, src/llm/modelFactory.ts | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。 |
| output | src/output/resultJsonWriter.ts | writeResultJson 定义一个可调用单元；调用 JSON.stringify, buildResultDiff, fs.mkdir, fs.writeFile, path.dirname；访问 FILE:CHANGE_SUMMARY.md, FILE:result-diff.json, FILE:result.json。 将扫描结果、概览、质量数据和文档路径组装为结构化的 JSON 对象并返回。 将模块单元序列化为包含标识符、路径、语言、导入、摘要以及类和方法的ID列表的普通对象。 |
| parser | src/parser/javaAdapter.ts, src/parser/javaStructureParser.ts, src/parser/moduleParser.ts, src/parser/parserAdapter.ts, src/parser/typescriptAdapter.ts, src/parser/typescriptStructureParser.ts | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源代码中提取类、接口、枚举和记录的定义块，包括注解、声明和代码范围。 |
| Project Files | schema/result-diff.schema.json, schema/result.schema.json, scripts/secret-scan.mjs, tests/analyzeRepo.test.ts, tests/cli.test.ts, tests/schemaContract.test.ts | 递归扫描目录，读取文件内容并检测是否匹配预定义的密钥模式，将匹配结果记录到数组中。 读取相对于仓库根目录的 JSON 文件并返回解析后的数据。 异步读取指定路径的JSON文件并解析为泛型类型。 |
| scanner | src/scanner/repoScanner.ts | 异步递归扫描指定根目录下的文件，过滤排除项、大文件和未知语言文件，返回按相对路径排序的源文件信息列表。 检查文件路径或名称是否匹配任意一个排除模式。 判断给定相对路径或文件名是否匹配排除模式（支持通配符）。 |
| utils | src/utils/path.ts | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |

## Structure

| Metric | Count |
| --- | --- |
| Scanned files | 43 |
| Source files | 34 |
| Markdown documents | 4 |
| Modules | 43 |
| Classes | 2 |
| Method units | 277 |
| External resource nodes | 28 |
| Graph edges | 669 |

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

- `docs/README.md` 提供文档入口、质量快照、阅读顺序和文档地图。
- `docs/human/SYSTEM_MAP.md` 提供面向人读的高层系统地图和输出分层。
- `docs/human/PROJECT_OVERVIEW.md` 汇总仓库规模、目标和文档产物。
- `docs/human/ARCHITECTURE.md` 描述模块区域、架构层次和运行时依赖。
- `docs/human/BUSINESS_FLOWS.md` 展示框架入口驱动的业务流候选。
- `docs/human/QUALITY_REPORT.md` 汇总文档质量、LLM 覆盖率和模板残留检查。
- `docs/ai/AI_CONTEXT.md` 提供面向 AI/自动化读取的紧凑上下文。
- `docs/deep-dive/MODULES.md` 列出模块、类、方法、导入和方法语义摘要。
- `docs/deep-dive/EXECUTION_FLOWS.md` 汇总由调用边推断出的静态执行路径。
- `docs/deep-dive/CALL_GRAPH.md` 用 Mermaid 渲染已解析的仓库内部调用关系。
- `docs/deep-dive/ENTRYPOINTS.md` 列出框架感知入口和静态入口候选。
- `docs/deep-dive/DATA_AND_RESOURCES.md` 列出检测到的数据与外部资源。
- `docs/deep-dive/MAINTENANCE_GUIDE.md` 记录当前分析边界和维护注意事项。
- `docs/deep-dive/CHANGE_SUMMARY.md` 汇总本次分析相对上一版结构化结果的变化。
- `.see-code/result.json` 保存机器可读的完整结构化分析结果。
- `.see-code/result-diff.json` 保存机器可读的增量差异结果。
- `schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义机器可读输出契约。
