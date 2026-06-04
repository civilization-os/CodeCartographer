# Modules

| Module | Language | Classes | Methods | Imports | Summary |
| --- | --- | --- | --- | --- | --- |
| package.json | json | 0 | 0 |  | package.json 包含 0 个类、0 个方法单元和 0 个导入。 |
| README.md | markdown | 0 | 0 |  | README.md 包含 0 个类、0 个方法单元和 0 个导入。 |
| SPEC.md | markdown | 0 | 0 |  | SPEC.md 包含 0 个类、0 个方法单元和 0 个导入。 |
| src/analyzer/analyzeRepo.ts | typescript | 0 | 1 | ../core/types.js, ../graph/relationGraphBuilder.js, ../llm/methodSemanticAnalyzer.js, ../llm/modelConfig.js, ../parser/moduleParser.js, ../scanner/repoScanner.js | src/analyzer/analyzeRepo.ts 包含 0 个类、1 个方法单元和 7 个导入。 关键方法：分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 |
| src/core/types.ts | typescript | 0 | 0 |  | src/core/types.ts 包含 0 个类、0 个方法单元和 0 个导入。 |
| src/graph/relationGraphBuilder.ts | typescript | 0 | 7 | ../core/types.js, ../utils/path.js | src/graph/relationGraphBuilder.ts 包含 0 个类、7 个方法单元和 2 个导入。 关键方法：构建模块、类、方法和资源之间的关系图，包含节点和边。 从模块单元中提取所有资源并去重排序，返回资源节点列表。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 |
| src/index.ts | typescript | 0 | 4 | ./analyzer/analyzeRepo.js, ./docs/docsGenerator.js, ./llm/modelConfig.js, node:path | src/index.ts 包含 0 个类、4 个方法单元和 4 个导入。 关键方法：解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 解析命令行参数，提取命令、目标路径和模型配置。 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。 |
| src/llm/methodSemanticAnalyzer.ts | typescript | 0 | 13 | ../core/types.js, ./methodSemanticCache.js, ./modelConfig.js, ./modelFactory.js, zod | src/llm/methodSemanticAnalyzer.ts 包含 0 个类、13 个方法单元和 5 个导入。 关键方法：对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。 |
| src/llm/methodSemanticCache.ts | typescript | 1 | 9 | ../core/types.js, ./modelConfig.js, node:crypto, node:fs/promises, node:path | src/llm/methodSemanticCache.ts 包含 1 个类、9 个方法单元和 5 个导入。 关键方法：生成方法语义缓存的唯一键值，基于方法单元和模型配置的哈希结果。 使用SHA-256算法对输入字符串进行哈希计算并返回十六进制字符串。 检查错误对象是否表示文件缺失（ENOENT）。 |
| src/llm/modelConfig.ts | typescript | 0 | 8 | ../core/types.js, zod | src/llm/modelConfig.ts 包含 0 个类、8 个方法单元和 2 个导入。 关键方法：从环境变量中加载并解析LLM模型配置，返回一个ModelConfig对象。 将ModelConfig对象转换为ModelRuntimeInfo对象，并根据provider字段决定是否保留model字段。 根据提供商返回默认模型名称。 |
| src/llm/modelFactory.ts | typescript | 0 | 1 | ./modelConfig.js, @langchain/anthropic, @langchain/core/messages, @langchain/openai | src/llm/modelFactory.ts 包含 0 个类、1 个方法单元和 4 个导入。 关键方法：根据配置创建对应的聊天模型实例，若配置无效则返回 undefined。 |
| src/parser/javaAdapter.ts | typescript | 0 | 0 | ./javaStructureParser.js, ./parserAdapter.js | src/parser/javaAdapter.ts 包含 0 个类、0 个方法单元和 2 个导入。 |
| src/parser/javaStructureParser.ts | typescript | 0 | 38 | ../core/types.js, ../utils/path.js, node:fs/promises | src/parser/javaStructureParser.ts 包含 0 个类、38 个方法单元和 3 个导入。 关键方法：解析Java源文件并提取模块单元信息，包括导入、类和方法。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。 |
| src/parser/moduleParser.ts | typescript | 0 | 1 | ../core/types.js, ../utils/path.js, ./javaAdapter.js, ./parserAdapter.js, ./typescriptAdapter.js | src/parser/moduleParser.ts 包含 0 个类、1 个方法单元和 5 个导入。 关键方法：遍历源文件列表，使用适配器解析每个文件并返回模块单元数组，若找不到适配器则生成默认模块单元。 |
| src/parser/parserAdapter.ts | typescript | 0 | 1 | ../core/types.js | src/parser/parserAdapter.ts 包含 0 个类、1 个方法单元和 1 个导入。 关键方法：根据语言从适配器列表中查找对应的解析器适配器。 |
| src/parser/typescriptAdapter.ts | typescript | 0 | 0 | ./parserAdapter.js, ./typescriptStructureParser.js | src/parser/typescriptAdapter.ts 包含 0 个类、0 个方法单元和 2 个导入。 |
| src/parser/typescriptStructureParser.ts | typescript | 0 | 26 | ../core/types.js, ../utils/path.js, node:fs/promises, typescript | src/parser/typescriptStructureParser.ts 包含 0 个类、26 个方法单元和 4 个导入。 关键方法：解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 从TypeScript源文件中提取所有导入和导出的模块路径，去重并排序后返回。 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。 |
| src/scanner/repoScanner.ts | typescript | 0 | 2 | ../core/types.js, ../utils/path.js, node:fs/promises, node:path | src/scanner/repoScanner.ts 包含 0 个类、2 个方法单元和 4 个导入。 关键方法：递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 根据文件扩展名和命名约定检测源代码语言类型。 |
| src/utils/path.ts | typescript | 0 | 2 | node:path | src/utils/path.ts 包含 0 个类、2 个方法单元和 1 个导入。 关键方法：将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 |
| tsconfig.json | json | 0 | 0 |  | tsconfig.json 包含 0 个类、0 个方法单元和 0 个导入。 |

## package.json

package.json 包含 0 个类、0 个方法单元和 0 个导入。

### Imports

- 无
## README.md

README.md 包含 0 个类、0 个方法单元和 0 个导入。

### Imports

- 无
## SPEC.md

SPEC.md 包含 0 个类、0 个方法单元和 0 个导入。

### Imports

- 无
## src/analyzer/analyzeRepo.ts

src/analyzer/analyzeRepo.ts 包含 0 个类、1 个方法单元和 7 个导入。 关键方法：分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。

### Imports

- `../core/types.js`
- `../graph/relationGraphBuilder.js`
- `../llm/methodSemanticAnalyzer.js`
- `../llm/modelConfig.js`
- `../parser/moduleParser.js`
- `../scanner/repoScanner.js`
- `node:path`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| analyzeRepo | `analyzeRepo(rootPath: string, options: AnalyzeRepoOptions = {}): Promise<AnalysisResult>` | Promise<AnalysisResult> |  | llm | 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。 | attachHeuristicSemantics, buildRelationGraph, enrichModulesWithMethodSemantics, extractResources, loadModelConfig, modules.flatMap, parseModules, path.resolve | src/analyzer/analyzeRepo.ts:19 |
## src/core/types.ts

src/core/types.ts 包含 0 个类、0 个方法单元和 0 个导入。

### Imports

- 无
## src/graph/relationGraphBuilder.ts

src/graph/relationGraphBuilder.ts 包含 0 个类、7 个方法单元和 2 个导入。 关键方法：构建模块、类、方法和资源之间的关系图，包含节点和边。 从模块单元中提取所有资源并去重排序，返回资源节点列表。 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。

### Imports

- `../core/types.js`
- `../utils/path.js`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| buildRelationGraph | `buildRelationGraph(modules: ModuleUnit[], resources: ResourceNode[]): RelationGraph` | RelationGraph |  | llm | 构建模块、类、方法和资源之间的关系图，包含节点和边。 | buildMethodNameIndex, dedupeEdges, edges.push, modules.flatMap, nodes.set, nodes.values, resolveCallTarget, resource.startsWith | src/graph/relationGraphBuilder.ts:10 |
| extractResources | `extractResources(modules: ModuleUnit[]): ResourceNode[]` | ResourceNode[] |  | llm | 从模块单元中提取所有资源并去重排序，返回资源节点列表。 | a.name.localeCompare, modules.flatMap, resourceKind, resources.set, resources.values, sort, stableId | src/graph/relationGraphBuilder.ts:101 |
| buildMethodNameIndex | `buildMethodNameIndex(methods: MethodUnit[]): Map<string, MethodUnit[]>` | Map<string, MethodUnit[]> |  | llm | 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。 | existing.push, index.get, index.set | src/graph/relationGraphBuilder.ts:118 |
| resolveCallTarget | `resolveCallTarget(call: string, index: Map<string, MethodUnit[]>): MethodUnit \| undefined` | MethodUnit \| undefined |  | llm | 根据调用字符串和方法索引解析唯一的方法单元，优先精确匹配，其次尝试通过最后一段名称匹配。 | at, call.includes, call.split, index.get | src/graph/relationGraphBuilder.ts:138 |
| scoreCall | `scoreCall(call: string): number` | number |  | llm | 根据函数调用名称返回一个数值分数，用于表示该调用的重要性或影响程度。 | test | src/graph/relationGraphBuilder.ts:160 |
| resourceKind | `resourceKind(resource: string): ResourceNode["kind"]` | ResourceNode["kind"] |  | llm | 根据资源字符串前缀判断资源类型并返回对应的枚举值。 | resource.startsWith | src/graph/relationGraphBuilder.ts:170 |
| dedupeEdges | `dedupeEdges(edges: RelationEdge[]): RelationEdge[]` | RelationEdge[] |  | llm | 对关系边数组进行去重，基于起点、终点、类型和标签生成唯一键。 | result.push, seen.add, seen.has | src/graph/relationGraphBuilder.ts:183 |
## src/index.ts

src/index.ts 包含 0 个类、4 个方法单元和 4 个导入。 关键方法：解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 解析命令行参数，提取命令、目标路径和模型配置。 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。

### Imports

- `./analyzer/analyzeRepo.js`
- `./docs/docsGenerator.js`
- `./llm/modelConfig.js`
- `node:path`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main | `main(): Promise<void>` | Promise<void> | cli | llm | 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 | analyzeRepo, console.log, filter, generateDocs, parseArgs, path.resolve, printHelp, process.argv.slice | src/index.ts:6 |
| parseArgs | `parseArgs(args: string[]): {   command: string;   targetPath: string;   modelConfig: ModelConfig; }` | {   command: string;   targetPath: string;   modelConfig: ModelConfig; } |  | llm | 解析命令行参数，提取命令、目标路径和模型配置。 | loadModelConfig, positional.push, requireValue | src/index.ts:37 |
| requireValue | `requireValue(flag: string, value: string \| undefined): string` | string |  | llm | 验证命令行参数值是否存在且不以'--'开头，否则抛出错误。 | value.startsWith | src/index.ts:93 |
| printHelp | `printHelp(): void` | void |  | llm | 打印 see-code 工具的使用说明和命令行参数帮助信息。 | console.log | src/index.ts:100 |
## src/llm/methodSemanticAnalyzer.ts

src/llm/methodSemanticAnalyzer.ts 包含 0 个类、13 个方法单元和 5 个导入。 关键方法：对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 将未知类型的错误对象转换为字符串消息。 遍历模块列表，为每个方法附加启发式语义标签。

### Imports

- `../core/types.js`
- `./methodSemanticCache.js`
- `./modelConfig.js`
- `./modelFactory.js`
- `zod`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| enrichModulesWithMethodSemantics | `enrichModulesWithMethodSemantics(modules: ModuleUnit[], config: ModelConfig, options: { rootPath?: string } = {}): Promise<ModuleUnit[]>` | Promise<ModuleUnit[]> |  | llm | 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。 | MethodSemanticCache.open, analyzeMethodWithLlm, cache.save, cache?.get, cache?.set, classUnit.methods.map, createChatModel, formatError | src/llm/methodSemanticAnalyzer.ts:17 |
| formatError | `formatError(error: unknown): string` | string |  | llm | 将未知类型的错误对象转换为字符串消息。 | String | src/llm/methodSemanticAnalyzer.ts:79 |
| attachHeuristicSemantics | `attachHeuristicSemantics(modules: ModuleUnit[]): ModuleUnit[]` | ModuleUnit[] |  | llm | 遍历模块列表，为每个方法附加启发式语义标签。 | heuristicSemantic, modules.flatMap | src/llm/methodSemanticAnalyzer.ts:83 |
| analyzeMethodWithLlm | `analyzeMethodWithLlm(method: MethodUnit, model: ChatModel): Promise<MethodSemantic>` | Promise<MethodSemantic> |  | llm | 使用大语言模型分析方法的语义信息并返回结构化结果。 | buildPrompt, model.invoke, parseModelResponse | src/llm/methodSemanticAnalyzer.ts:90 |
| parseModelResponse | `parseModelResponse(response: unknown): Omit<MethodSemantic, "analyzer">` | Omit<MethodSemantic, "analyzer"> |  | llm | 解析模型响应，提取内容并验证为方法语义结构后返回标准化结果。 | JSON.parse, extractContent, extractJsonObject, methodSemanticSchema.parse, normalizeSemantic | src/llm/methodSemanticAnalyzer.ts:102 |
| extractContent | `extractContent(response: unknown): string` | string |  | llm | 从未知类型的响应中提取字符串内容，支持直接字符串、包含content属性的对象或数组。 | Array.isArray, String, content         .map, join | src/llm/methodSemanticAnalyzer.ts:109 |
| extractJsonObject | `extractJsonObject(content: string): string` | string |  | llm | 从LLM响应中提取JSON对象，优先匹配代码块内的内容，否则提取第一个花括号对。 | content.indexOf, content.lastIndexOf, content.match, content.slice, trim | src/llm/methodSemanticAnalyzer.ts:138 |
| normalizeSemantic | `normalizeSemantic(value: LlmMethodSemantic): Omit<MethodSemantic, "analyzer">` | Omit<MethodSemantic, "analyzer"> |  | llm | 标准化 LLM 方法语义对象，去除字符串字段的前后空白并过滤空字符串。 | filter, item.trim, value.dataAndResources.map, value.responsibilities.map, value.sideEffects.map, value.summary.trim | src/llm/methodSemanticAnalyzer.ts:153 |
| buildPrompt | `buildPrompt(method: MethodUnit): string` | string |  | llm | 构建一个用于分析代码仓库中方法的提示词字符串，包含方法元数据和源代码。 | join, method.annotations.join, method.calls.join, method.entrypointHints.map, method.frameworkHints.map, method.modifiers.join, method.parameters.map, method.resources.join | src/llm/methodSemanticAnalyzer.ts:163 |
| heuristicSemantic | `heuristicSemantic(method: MethodUnit): MethodSemantic` | MethodSemantic |  | llm | 基于启发式规则从方法单元中提取语义信息并返回方法语义对象。 | method.calls.filter, test | src/llm/methodSemanticAnalyzer.ts:196 |
| summarizeModuleFromMethods | `summarizeModuleFromMethods(module: ModuleUnit): string` | string |  | llm | 根据模块中的方法数量、前三个方法的摘要以及类、导入信息生成模块的总结字符串。 | firstSummaries.join, map, module.methods.slice | src/llm/methodSemanticAnalyzer.ts:209 |
| trimSource | `trimSource(source: string, maxLength: number): string` | string |  | llm | 截断字符串到指定最大长度，并在末尾添加截断标记。 | source.slice | src/llm/methodSemanticAnalyzer.ts:216 |
| mapWithConcurrency | `mapWithConcurrency(items: T[], concurrency: number, worker: (item: T) => Promise<void>): Promise<void>` | Promise<void> |  | llm | 并发执行异步工作函数，直到所有项目处理完毕。 | Array.from, Math.max, Promise.all, worker | src/llm/methodSemanticAnalyzer.ts:224 |
## src/llm/methodSemanticCache.ts

src/llm/methodSemanticCache.ts 包含 1 个类、9 个方法单元和 5 个导入。 关键方法：生成方法语义缓存的唯一键值，基于方法单元和模型配置的哈希结果。 使用SHA-256算法对输入字符串进行哈希计算并返回十六进制字符串。 检查错误对象是否表示文件缺失（ENOENT）。

### Imports

- `../core/types.js`
- `./modelConfig.js`
- `node:crypto`
- `node:fs/promises`
- `node:path`

### Classes

| Class | Methods | Location |
| --- | --- | --- |
| MethodSemanticCache | 6 | src/llm/methodSemanticCache.ts:14 |

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cacheKey | `cacheKey(method: MethodUnit, config: ModelConfig): string` | string |  | llm | 生成方法语义缓存的唯一键值，基于方法单元和模型配置的哈希结果。 | JSON.stringify, hash | src/llm/methodSemanticCache.ts:62 |
| hash | `hash(value: string): string` | string |  | llm | 使用SHA-256算法对输入字符串进行哈希计算并返回十六进制字符串。 | crypto.createHash, digest, update | src/llm/methodSemanticCache.ts:78 |
| isMissingFile | `isMissingFile(error: unknown): boolean` | boolean |  | llm | 检查错误对象是否表示文件缺失（ENOENT）。 |  | src/llm/methodSemanticCache.ts:82 |
| MethodSemanticCache#constructor | `constructor(private readonly filePath: string)` |  |  | llm | 初始化方法语义缓存实例，存储文件路径。 |  | src/llm/methodSemanticCache.ts:17 |
| MethodSemanticCache#open | `open(rootPath: string): Promise<MethodSemanticCache>` | Promise<MethodSemanticCache> |  | llm | 从指定根路径加载方法语义缓存文件并返回缓存实例。 | cache.load, path.join | src/llm/methodSemanticCache.ts:19 |
| MethodSemanticCache#get | `get(method: MethodUnit, config: ModelConfig): MethodSemantic \| undefined` | MethodSemantic \| undefined |  | llm | 从缓存中根据方法和配置的缓存键获取对应的语义信息。 | cacheKey, this.entries.get | src/llm/methodSemanticCache.ts:26 |
| MethodSemanticCache#set | `set(method: MethodUnit, config: ModelConfig, semantic: MethodSemantic): void` | void |  | llm | 将方法单元、模型配置和语义信息组合成缓存键后存入条目映射中。 | cacheKey, this.entries.set | src/llm/methodSemanticCache.ts:30 |
| MethodSemanticCache#save | `save(): Promise<void>` | Promise<void> |  | llm | 将缓存条目按键排序后序列化为JSON并写入文件系统。 | JSON.stringify, Object.fromEntries, a.localeCompare, fs.mkdir, fs.writeFile, path.dirname, sort, this.entries.entries | src/llm/methodSemanticCache.ts:34 |
| MethodSemanticCache#load | `load(): Promise<void>` | Promise<void> |  | llm | 从缓存文件读取并解析JSON数据，将条目加载到内存缓存中。 | JSON.parse, Object.entries, fs.readFile, isMissingFile, this.entries.set | src/llm/methodSemanticCache.ts:43 |
## src/llm/modelConfig.ts

src/llm/modelConfig.ts 包含 0 个类、8 个方法单元和 2 个导入。 关键方法：从环境变量中加载并解析LLM模型配置，返回一个ModelConfig对象。 将ModelConfig对象转换为ModelRuntimeInfo对象，并根据provider字段决定是否保留model字段。 根据提供商返回默认模型名称。

### Imports

- `../core/types.js`
- `zod`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| loadModelConfig | `loadModelConfig(env: NodeJS.ProcessEnv = process.env): ModelConfig` | ModelConfig |  | llm | 从环境变量中加载并解析LLM模型配置，返回一个ModelConfig对象。 | Boolean, defaultBaseUrl, defaultModel, getApiKey, modelProviderSchema.parse, parseInteger, parseNumber, parseOptionalInteger | src/llm/modelConfig.ts:28 |
| toModelRuntimeInfo | `toModelRuntimeInfo(config: ModelConfig): ModelRuntimeInfo` | ModelRuntimeInfo |  | llm | 将ModelConfig对象转换为ModelRuntimeInfo对象，并根据provider字段决定是否保留model字段。 |  | src/llm/modelConfig.ts:53 |
| defaultModel | `defaultModel(provider: ModelProvider): string` | string |  | llm | 根据提供商返回默认模型名称。 |  | src/llm/modelConfig.ts:64 |
| defaultBaseUrl | `defaultBaseUrl(provider: ModelProvider): string \| undefined` | string \| undefined |  | llm | 根据模型提供商返回默认的基础URL，目前仅支持DeepSeek。 |  | src/llm/modelConfig.ts:80 |
| getApiKey | `getApiKey(provider: ModelProvider, env: NodeJS.ProcessEnv): string \| undefined` | string \| undefined |  | llm | 根据模型提供商和环境变量获取对应的API密钥。 |  | src/llm/modelConfig.ts:89 |
| parseNumber | `parseNumber(value: string \| undefined, fallback: number): number` | number |  | llm | 解析字符串为数字，若无效则返回默认值。 | Number, Number.isFinite | src/llm/modelConfig.ts:109 |
| parseInteger | `parseInteger(value: string \| undefined, fallback: number): number` | number |  | llm | 解析字符串为整数，若无效则返回默认值。 | Number.isFinite, Number.parseInt | src/llm/modelConfig.ts:118 |
| parseOptionalInteger | `parseOptionalInteger(value: string \| undefined): number \| undefined` | number \| undefined |  | llm | 解析可选字符串参数为非负整数，若无效则返回 undefined。 | Number.isFinite, Number.parseInt | src/llm/modelConfig.ts:127 |
## src/llm/modelFactory.ts

src/llm/modelFactory.ts 包含 0 个类、1 个方法单元和 4 个导入。 关键方法：根据配置创建对应的聊天模型实例，若配置无效则返回 undefined。

### Imports

- `./modelConfig.js`
- `@langchain/anthropic`
- `@langchain/core/messages`
- `@langchain/openai`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| createChatModel | `createChatModel(config: ModelConfig): ChatModel \| undefined` | ChatModel \| undefined |  | llm | 根据配置创建对应的聊天模型实例，若配置无效则返回 undefined。 |  | src/llm/modelFactory.ts:10 |
## src/parser/javaAdapter.ts

src/parser/javaAdapter.ts 包含 0 个类、0 个方法单元和 2 个导入。

### Imports

- `./javaStructureParser.js`
- `./parserAdapter.js`
## src/parser/javaStructureParser.ts

src/parser/javaStructureParser.ts 包含 0 个类、38 个方法单元和 3 个导入。 关键方法：解析Java源文件并提取模块单元信息，包括导入、类和方法。 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。

### Imports

- `../core/types.js`
- `../utils/path.js`
- `node:fs/promises`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| parseJavaModule | `parseJavaModule(file: SourceFileInfo): Promise<ModuleUnit>` | Promise<ModuleUnit> |  | llm | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 | buildLineIndex, classBlocks.map, classes.flatMap, extractClassBlocks, extractClassUnit, extractImports, fs.readFile, maskJavaSource | src/parser/javaStructureParser.ts:76 |
| extractImports | `extractImports(sourceText: string): string[]` | string[] |  | llm | 从Java源代码文本中提取所有导入语句并返回排序后的唯一导入列表。 | imports.add, sort, sourceText.matchAll, trim | src/parser/javaStructureParser.ts:98 |
| extractClassBlocks | `extractClassBlocks(sourceText: string, masked: string): JavaClassBlock[]` | JavaClassBlock[] |  | llm | 从Java源文本中提取类、接口、枚举或记录的定义块，返回包含名称、类型、注解和位置信息的数组。 | classBlocks.push, extractAnnotations, findMatchingBrace, lastIndexOf, masked.matchAll, sourceText.slice | src/parser/javaStructureParser.ts:107 |
| extractClassUnit | `extractClassUnit(sourceText: string, masked: string, lineIndex: LineIndex, modulePath: string, classBlock: JavaClassBlock): ClassUnit` | ClassUnit |  | llm | 从Java类块中提取类单元，包括方法列表和类元数据。 | buildMethodUnit, extractMethodBlocks, locationFromOffsets, methodBlocks.map, requestMappingPath, stableId | src/parser/javaStructureParser.ts:134 |
| extractMethodBlocks | `extractMethodBlocks(sourceText: string, masked: string, classBlock: JavaClassBlock): JavaMethodBlock[]` | JavaMethodBlock[] |  | llm | 从Java类块中提取所有方法块，返回方法定义的位置和元数据。 | findMatchingBrace, leadingWhitespaceLength, methods.push, parseMethodHeader, sourceText.slice | src/parser/javaStructureParser.ts:157 |
| parseMethodHeader | `parseMethodHeader(headerText: string, className: string): Omit<JavaMethodBlock, "start" \| "bodyStart" \| "end"> \| undefined` | Omit<JavaMethodBlock, "start" \| "bodyStart" \| "end"> \| undefined |  | llm | 解析Java方法头文本，提取方法名、注解、修饰符、可见性、参数和返回类型，并返回结构化对象。 | CONTROL_WORDS.has, beforeParen.slice, exec, extractAnnotations, extractModifiers, extractReturnType, extractVisibility, headerWithoutAnnotations.includes | src/parser/javaStructureParser.ts:209 |
| buildMethodUnit | `buildMethodUnit(sourceText: string, masked: string, lineIndex: LineIndex, modulePath: string, classBlock: JavaClassBlock, methodBlock: JavaMethodBlock, classRoutePrefix: string): MethodUnit` | MethodUnit |  | llm | 根据给定的源代码、掩码文本、行索引、模块路径、类块和方法块等信息，构建并返回一个包含方法元数据（如名称、签名、调用、资源、框架提示等）的 MethodUnit 对象。 | String, extractCalls, extractEntrypointHints, extractFrameworkHints, extractResources, locationFromOffsets, masked.slice, sourceText.slice | src/parser/javaStructureParser.ts:261 |
| extractCalls | `extractCalls(bodyMasked: string): string[]` | string[] |  | llm | 从方法体中提取所有函数调用并去重排序。 | CONTROL_WORDS.has, MODIFIER_WORDS.has, at, bodyMasked.matchAll, call.split, calls.add, replace, sort | src/parser/javaStructureParser.ts:309 |
| extractResources | `extractResources(bodySource: string, annotations: string[]): string[]` | string[] |  | llm | 从方法体源码和注解中提取HTTP、环境变量、文件路径和SQL语句等资源标识符。 | annotations.join, combined.matchAll, extractStringLiterals, resources.add, sort, test, value.includes, value.slice | src/parser/javaStructureParser.ts:324 |
| extractFrameworkHints | `extractFrameworkHints(classBlock: JavaClassBlock, methodBlock: JavaMethodBlock, bodyMasked: string, annotations: string[], classRoutePrefix: string, resources: string[]): FrameworkHint[]` | FrameworkHint[] |  | llm | 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。 | annotation.includes, annotationAttribute, annotationByName, annotations.find, annotations.some, bodyMasked.includes, dedupeHints, find | src/parser/javaStructureParser.ts:354 |
| extractEntrypointHints | `extractEntrypointHints(methodBlock: JavaMethodBlock, frameworkHints: FrameworkHint[]): EntrypointHint[]` | EntrypointHint[] |  | llm | 根据方法块的注解、名称和框架提示，提取并去重可能的入口点提示（如HTTP路由、定时任务、消息消费者、测试方法和CLI入口）。 | dedupeEntrypoints, frameworkHint.metadata?.method?.toUpperCase, hasAnnotation, hints.push, trim | src/parser/javaStructureParser.ts:422 |
| routeFromAnnotations | `routeFromAnnotations(annotations: string[], classRoutePrefix: string): { method: string; path: string } \| undefined` | { method: string; path: string } \| undefined |  | llm | 从注解列表中解析出HTTP方法和路径，结合类路由前缀生成完整路由。 | HTTP_MAPPING_METHODS.get, annotationAttribute, annotationName, firstAnnotationString, joinRoutePaths, requestMappingMethod | src/parser/javaStructureParser.ts:479 |
| requestMappingPath | `requestMappingPath(annotations: string[]): string \| undefined` | string \| undefined |  | llm | 从注解列表中提取RequestMapping注解的路径值。 | annotationAttribute, annotationName, annotations.find, firstAnnotationString | src/parser/javaStructureParser.ts:508 |
| requestMappingMethod | `requestMappingMethod(annotation: string): string` | string |  | llm | 从Spring注解中提取HTTP请求方法并转换为小写，默认返回'all'。 | exec, requestMethod?.toLowerCase | src/parser/javaStructureParser.ts:517 |
| joinRoutePaths | `joinRoutePaths(prefix: string, path: string): string` | string |  | llm | 拼接路由路径前缀与路径，去除空段和重复斜杠，并确保结果以斜杠开头。 | filter, join, joined.startsWith, replace | src/parser/javaStructureParser.ts:522 |
| parseParameters | `parseParameters(parametersText: string): MethodParameter[]` | MethodParameter[] |  | llm | 解析参数字符串，提取每个参数的类型和名称，返回方法参数对象数组。 | cleaned.split, filter, map, name.replace, parameter.trim, parts.join, parts.pop, replace | src/parser/javaStructureParser.ts:530 |
| extractModifiers | `extractModifiers(prefix: string): string[]` | string[] |  | llm | 从给定的前缀字符串中提取所有Java修饰符关键字。 | MODIFIER_WORDS.has, filter, prefix     .split | src/parser/javaStructureParser.ts:548 |
| extractVisibility | `extractVisibility(modifiers: string[]): MethodUnit["visibility"]` | MethodUnit["visibility"] |  | llm | 根据修饰符数组返回对应的Java可见性字符串，默认为包级可见性。 | modifiers.includes | src/parser/javaStructureParser.ts:554 |
| extractReturnType | `extractReturnType(prefix: string, modifiers: string[]): string \| undefined` | string \| undefined |  | llm | 从方法签名前缀中移除修饰符列表并返回清理后的返回类型字符串。 | prefix.trim, trim, value.replace | src/parser/javaStructureParser.ts:567 |
| extractAnnotations | `extractAnnotations(text: string): string[]` | string[] |  | llm | 从文本中提取所有Java注解字符串。 | annotations.push, replace, text.matchAll, trim | src/parser/javaStructureParser.ts:576 |
| stripAnnotations | `stripAnnotations(text: string): string` | string |  | llm | 移除字符串中的Java注解标记，将其替换为空格。 | text.replace | src/parser/javaStructureParser.ts:585 |
| hasAnnotation | `hasAnnotation(annotations: string[], name: string): boolean` | boolean |  | llm | 检查给定的注解列表中是否存在指定名称的注解。 | annotationName, annotations.some | src/parser/javaStructureParser.ts:589 |
| annotationByName | `annotationByName(annotations: string[], name: string): string \| undefined` | string \| undefined |  | llm | 根据名称在注解字符串数组中查找匹配的注解。 | annotationName, annotations.find | src/parser/javaStructureParser.ts:593 |
| annotationName | `annotationName(annotation: string): string \| undefined` | string \| undefined |  | llm | 从注解字符串中提取注解名称。 | exec | src/parser/javaStructureParser.ts:597 |
| firstAnnotationString | `firstAnnotationString(annotation: string): string \| undefined` | string \| undefined |  | llm | 从注解字符串中提取第一个双引号内的内容。 | exec | src/parser/javaStructureParser.ts:601 |
| annotationAttribute | `annotationAttribute(annotation: string, name: string): string \| undefined` | string \| undefined |  | llm | 从注解字符串中提取指定属性的值。 | exec | src/parser/javaStructureParser.ts:605 |
| splitTopLevel | `splitTopLevel(value: string, separator: string): string[]` | string[] |  | llm | 根据分隔符在顶层（不在嵌套括号内）位置拆分字符串。 | result.push, value.slice | src/parser/javaStructureParser.ts:609 |
| extractStringLiterals | `extractStringLiterals(value: string): string[]` | string[] |  | llm | 从字符串中提取所有双引号内的字面量并处理转义引号。 | replace, strings.push, value.matchAll | src/parser/javaStructureParser.ts:630 |
| maskJavaSource | `maskJavaSource(sourceText: string): string` | string |  | llm | 将Java源代码中的注释和字符串字面量替换为空格，返回脱敏后的文本。 | chars.join, sourceText.split | src/parser/javaStructureParser.ts:639 |
| findMatchingBrace | `findMatchingBrace(value: string, openIndex: number): number` | number |  | llm | 从指定起始位置开始，在字符串中查找与左花括号匹配的右花括号的索引。 |  | src/parser/javaStructureParser.ts:706 |
| buildLineIndex | `buildLineIndex(sourceText: string): LineIndex` | LineIndex |  | llm | 根据源代码文本构建行索引，记录每行起始字符位置。 | starts.push | src/parser/javaStructureParser.ts:722 |
| locationFromOffsets | `locationFromOffsets(file: string, lineIndex: LineIndex, startOffset: number, endOffset: number): SourceLocation` | SourceLocation |  | llm | 根据文件路径、行索引和偏移量范围计算并返回源代码位置信息。 | lineNumberAt | src/parser/javaStructureParser.ts:732 |
| lineNumberAt | `lineNumberAt(lineIndex: LineIndex, offset: number): number` | number |  | llm | 通过二分查找在行索引数组中定位给定偏移量对应的行号。 | Math.floor | src/parser/javaStructureParser.ts:745 |
| leadingWhitespaceLength | `leadingWhitespaceLength(value: string): number` | number |  | llm | 计算字符串开头空白字符的长度。 | exec | src/parser/javaStructureParser.ts:759 |
| dedupeHints | `dedupeHints(hints: FrameworkHint[]): FrameworkHint[]` | FrameworkHint[] |  | llm | 对框架提示列表进行去重，基于提示的类型、框架、值和元数据的组合键。 | JSON.stringify, dedupeBy, join | src/parser/javaStructureParser.ts:763 |
| dedupeEntrypoints | `dedupeEntrypoints(hints: EntrypointHint[]): EntrypointHint[]` | EntrypointHint[] |  | llm | 对入口点提示数组进行去重，基于多个字段组合的字符串键。 | dedupeBy, join | src/parser/javaStructureParser.ts:769 |
| dedupeBy | `dedupeBy(items: T[], keyFn: (item: T) => string): T[]` | T[] |  | llm | 根据提供的键函数对数组元素进行去重，保留首次出现的元素。 | keyFn, result.push, seen.add, seen.has | src/parser/javaStructureParser.ts:775 |
| summarizeMethod | `summarizeMethod(name: string, calls: string[], resources: string[], frameworkHints: FrameworkHint[]): string` | string |  | llm | 生成Java方法单元的摘要描述，包含方法名、框架线索、调用和资源信息。 | calls.slice, frameworkHints.map, join, parts.join, parts.push, resources.slice | src/parser/javaStructureParser.ts:788 |
## src/parser/moduleParser.ts

src/parser/moduleParser.ts 包含 0 个类、1 个方法单元和 5 个导入。 关键方法：遍历源文件列表，使用适配器解析每个文件并返回模块单元数组，若找不到适配器则生成默认模块单元。

### Imports

- `../core/types.js`
- `../utils/path.js`
- `./javaAdapter.js`
- `./parserAdapter.js`
- `./typescriptAdapter.js`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| parseModules | `parseModules(files: SourceFileInfo[], adapters: SourceParserAdapter[] = DEFAULT_ADAPTERS): Promise<ModuleUnit[]>` | Promise<ModuleUnit[]> |  | llm | 遍历源文件列表，使用适配器解析每个文件并返回模块单元数组，若找不到适配器则生成默认模块单元。 | adapter.parse, findParserAdapter, modules.push, stableId | src/parser/moduleParser.ts:9 |
## src/parser/parserAdapter.ts

src/parser/parserAdapter.ts 包含 0 个类、1 个方法单元和 1 个导入。 关键方法：根据语言从适配器列表中查找对应的解析器适配器。

### Imports

- `../core/types.js`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| findParserAdapter | `findParserAdapter(adapters: SourceParserAdapter[], language: SourceLanguage): SourceParserAdapter \| undefined` | SourceParserAdapter \| undefined |  | llm | 根据语言从适配器列表中查找对应的解析器适配器。 | adapter.languages.includes, adapters.find | src/parser/parserAdapter.ts:9 |
## src/parser/typescriptAdapter.ts

src/parser/typescriptAdapter.ts 包含 0 个类、0 个方法单元和 2 个导入。

### Imports

- `./parserAdapter.js`
- `./typescriptStructureParser.js`
## src/parser/typescriptStructureParser.ts

src/parser/typescriptStructureParser.ts 包含 0 个类、26 个方法单元和 4 个导入。 关键方法：解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 从TypeScript源文件中提取所有导入和导出的模块路径，去重并排序后返回。 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。

### Imports

- `../core/types.js`
- `../utils/path.js`
- `node:fs/promises`
- `typescript`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| parseTypeScriptModule | `parseTypeScriptModule(file: SourceFileInfo): Promise<ModuleUnit>` | Promise<ModuleUnit> |  | llm | 解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 | classes.flatMap, classes.push, extractClassUnit, extractFunctionUnit, extractImports, extractVariableFunctionUnit, fs.readFile, moduleMethods.push | src/parser/typescriptStructureParser.ts:15 |
| extractImports | `extractImports(sourceFile: ts.SourceFile): string[]` | string[] |  | llm | 从TypeScript源文件中提取所有导入和导出的模块路径，去重并排序后返回。 | imports.push, sort, sourceFile.forEachChild, ts.isExportDeclaration, ts.isImportDeclaration, ts.isStringLiteral | src/parser/typescriptStructureParser.ts:80 |
| extractClassUnit | `extractClassUnit(sourceFile: ts.SourceFile, node: ts.ClassDeclaration, modulePath: string): ClassUnit` | ClassUnit |  | llm | 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。 | extractCallableUnit, getLocation, member.name.getText, methods.push, stableId, ts.isConstructorDeclaration, ts.isMethodDeclaration | src/parser/typescriptStructureParser.ts:96 |
| extractFunctionUnit | `extractFunctionUnit(sourceFile: ts.SourceFile, node: ts.FunctionDeclaration, modulePath: string): MethodUnit` | MethodUnit |  | llm | 从TypeScript函数声明节点提取方法单元信息。 | extractCallableUnit | src/parser/typescriptStructureParser.ts:128 |
| extractVariableFunctionUnit | `extractVariableFunctionUnit(sourceFile: ts.SourceFile, name: string, node: ts.ArrowFunction \| ts.FunctionExpression, modulePath: string): MethodUnit` | MethodUnit |  | llm | 从TypeScript源文件中提取变量函数单元，通过调用extractCallableUnit生成MethodUnit。 | extractCallableUnit | src/parser/typescriptStructureParser.ts:136 |
| extractCallableUnit | `extractCallableUnit(sourceFile: ts.SourceFile, node:     \| ts.FunctionDeclaration     \| ts.MethodDeclaration     \| ts.ConstructorDeclaration     \| ts.ArrowFunction     \| ts.FunctionExpression, modulePath: string, name: string, className?: string): MethodUnit` | MethodUnit |  | llm | 从TypeScript源文件中提取可调用单元（函数、方法、构造函数、箭头函数或函数表达式）并构建MethodUnit对象。 | String, buildSignature, extractAnnotations, extractCalls, extractEntrypointHints, extractFrameworkHints, extractModifiers, extractParameters | src/parser/typescriptStructureParser.ts:145 |
| buildSignature | `buildSignature(sourceFile: ts.SourceFile, node:     \| ts.FunctionDeclaration     \| ts.MethodDeclaration     \| ts.ConstructorDeclaration     \| ts.ArrowFunction     \| ts.FunctionExpression, name: string): string` | string |  | llm | 根据给定的函数声明节点和名称，生成包含参数列表和返回类型的函数签名字符串。 | join, node.parameters.map, node.type.getText, param.getText | src/parser/typescriptStructureParser.ts:187 |
| extractParameters | `extractParameters(sourceFile: ts.SourceFile, node:     \| ts.FunctionDeclaration     \| ts.MethodDeclaration     \| ts.ConstructorDeclaration     \| ts.ArrowFunction     \| ts.FunctionExpression): MethodParameter[]` | MethodParameter[] |  | llm | 从TypeScript AST节点中提取函数或方法的参数信息，包括名称、类型、可选性和默认值。 | Boolean, node.parameters.map, param.initializer?.getText, param.name.getText, param.type?.getText | src/parser/typescriptStructureParser.ts:202 |
| extractReturnType | `extractReturnType(sourceFile: ts.SourceFile, node:     \| ts.FunctionDeclaration     \| ts.MethodDeclaration     \| ts.ConstructorDeclaration     \| ts.ArrowFunction     \| ts.FunctionExpression): string \| undefined` | string \| undefined |  | llm | 从TypeScript AST节点中提取函数的返回类型字符串，构造函数返回undefined。 | node.type?.getText, ts.isConstructorDeclaration | src/parser/typescriptStructureParser.ts:219 |
| extractModifiers | `extractModifiers(sourceFile: ts.SourceFile, node: ts.Node): string[]` | string[] |  | llm | 从TypeScript AST节点中提取修饰符文本列表。 | map, modifier.getText, ts.canHaveModifiers, ts.getModifiers | src/parser/typescriptStructureParser.ts:234 |
| extractAnnotations | `extractAnnotations(sourceFile: ts.SourceFile, node: ts.Node): string[]` | string[] |  | llm | 从TypeScript AST节点中提取装饰器注解文本。 | decorator.getText, map, ts.canHaveDecorators, ts.getDecorators | src/parser/typescriptStructureParser.ts:242 |
| extractVisibility | `extractVisibility(node: ts.Node): MethodUnit["visibility"]` | MethodUnit["visibility"] |  | llm | 根据TypeScript AST节点中的修饰符关键字返回可见性字符串。 | hasModifier | src/parser/typescriptStructureParser.ts:250 |
| hasModifier | `hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean` | boolean |  | llm | 检查 TypeScript AST 节点是否具有指定类型的修饰符。 | some, ts.canHaveModifiers, ts.getModifiers | src/parser/typescriptStructureParser.ts:263 |
| extractCalls | `extractCalls(sourceFile: ts.SourceFile, root: ts.Node): string[]` | string[] |  | llm | 递归遍历TypeScript AST节点，收集所有函数调用表达式并返回排序后的唯一调用字符串列表。 | calls.add, formatCallExpression, sort, ts.forEachChild, ts.isCallExpression | src/parser/typescriptStructureParser.ts:271 |
| formatCallExpression | `formatCallExpression(sourceFile: ts.SourceFile, expression: ts.LeftHandSideExpression): string` | string |  | llm | 将TypeScript调用表达式格式化为字符串，处理标识符、属性访问和元素访问表达式。 | expression.argumentExpression?.getText, expression.getText, ts.isElementAccessExpression, ts.isIdentifier, ts.isPropertyAccessExpression | src/parser/typescriptStructureParser.ts:286 |
| extractResources | `extractResources(sourceFile: ts.SourceFile, root: ts.Node): string[]` | string[] |  | llm | 遍历 TypeScript AST 节点，提取 HTTP URL、环境变量和文件路径引用并返回排序后的资源列表。 | node.getText, resources.add, sort, startsWith, test, text.includes, text.startsWith, ts.forEachChild | src/parser/typescriptStructureParser.ts:315 |
| extractFrameworkHints | `extractFrameworkHints(sourceFile: ts.SourceFile, root: ts.Node): FrameworkHint[]` | FrameworkHint[] |  | llm | 遍历 TypeScript AST 节点，识别 HTTP 路由、fetch 调用、定时任务和环境变量等框架相关模式并返回去重后的提示列表。 | dedupeHints, firstArg.getText, hints.push, literalText, node.expression.getText, node.getText, parseHttpRouteCall, startsWith | src/parser/typescriptStructureParser.ts:346 |
| extractEntrypointHints | `extractEntrypointHints(sourceFile: ts.SourceFile, root: ts.Node, name: string): EntrypointHint[]` | EntrypointHint[] |  | llm | 遍历 TypeScript AST 节点，提取 HTTP 路由和定时任务等入口点提示信息。 | dedupeEntrypoints, hints.push, node.expression.getText, parseHttpRouteCall, route.method.toUpperCase, ts.forEachChild, ts.isCallExpression | src/parser/typescriptStructureParser.ts:408 |
| parseHttpRouteCall | `parseHttpRouteCall(sourceFile: ts.SourceFile, node: ts.CallExpression): { method: string; path: string } \| undefined` | { method: string; path: string } \| undefined |  | llm | 解析TypeScript AST中的HTTP路由调用表达式，提取HTTP方法和路径。 | includes, literalText, node.expression.expression.getText, node.expression.name.text.toLowerCase, owner.endsWith, ts.isPropertyAccessExpression | src/parser/typescriptStructureParser.ts:457 |
| literalText | `literalText(sourceFile: ts.SourceFile, node: ts.Node \| undefined): string \| undefined` | string \| undefined |  | llm | 从TypeScript AST节点中提取字面量文本，支持字符串字面量和模板字面量。 | node.getText, ts.isNoSubstitutionTemplateLiteral, ts.isStringLiteral | src/parser/typescriptStructureParser.ts:486 |
| dedupeHints | `dedupeHints(hints: FrameworkHint[]): FrameworkHint[]` | FrameworkHint[] |  | llm | 对框架提示数组进行去重，基于提示的 kind、framework、value 和序列化后的 metadata 组合生成的唯一键。 | JSON.stringify, dedupeBy, join | src/parser/typescriptStructureParser.ts:496 |
| dedupeEntrypoints | `dedupeEntrypoints(hints: EntrypointHint[]): EntrypointHint[]` | EntrypointHint[] |  | llm | 对入口点提示数组进行去重，基于多个字段拼接的字符串作为唯一标识。 | dedupeBy, join | src/parser/typescriptStructureParser.ts:502 |
| dedupeBy | `dedupeBy(items: T[], keyFn: (item: T) => string): T[]` | T[] |  | llm | 根据提供的键函数对数组元素进行去重，保留首次出现的元素。 | keyFn, result.push, seen.add, seen.has | src/parser/typescriptStructureParser.ts:508 |
| getLocation | `getLocation(sourceFile: ts.SourceFile, node: ts.Node): SourceLocation` | SourceLocation |  | llm | 根据TypeScript AST节点在源文件中的起始和结束位置计算行号范围，并返回包含文件名和行号区间的SourceLocation对象。 | node.getEnd, node.getStart, sourceFile.getLineAndCharacterOfPosition | src/parser/typescriptStructureParser.ts:521 |
| summarizeMethod | `summarizeMethod(name: string, calls: string[], resources: string[]): string` | string |  | llm | 生成方法摘要字符串，包含方法名、前五个调用和资源信息。 | calls.slice, join, parts.join, parts.push, resources.slice | src/parser/typescriptStructureParser.ts:532 |
| summarizeModule | `summarizeModule(modulePath: string, classes: ClassUnit[], methods: MethodUnit[], imports: string[]): string` | string |  | llm | 生成一个描述模块路径、类数量、方法数量和导入数量的中文字符串。 |  | src/parser/typescriptStructureParser.ts:543 |
## src/scanner/repoScanner.ts

src/scanner/repoScanner.ts 包含 0 个类、2 个方法单元和 4 个导入。 关键方法：递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 根据文件扩展名和命名约定检测源代码语言类型。

### Imports

- `../core/types.js`
- `../utils/path.js`
- `node:fs/promises`
- `node:path`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| scanRepo | `scanRepo(rootPath: string): Promise<SourceFileInfo[]>` | Promise<SourceFileInfo[]> |  | llm | 递归扫描指定根目录下的所有文件，过滤掉忽略的目录、非文件、过大文件及无法识别语言的文件，返回按相对路径排序的源文件信息列表。 | IGNORED_DIRS.has, a.relativePath.localeCompare, detectLanguage, entry.isDirectory, entry.isFile, files.push, files.sort, fs.readdir | src/scanner/repoScanner.ts:23 |
| detectLanguage | `detectLanguage(fileName: string): SourceLanguage` | SourceLanguage |  | llm | 根据文件扩展名和命名约定检测源代码语言类型。 | fileName.endsWith, path.extname, toLowerCase | src/scanner/repoScanner.ts:67 |
## src/utils/path.ts

src/utils/path.ts 包含 0 个类、2 个方法单元和 1 个导入。 关键方法：将路径分隔符转换为正斜杠以生成POSIX风格路径。 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。

### Imports

- `node:path`

### Method Units

| Method | Signature | Return | Hints | Analyzer | Summary | Calls | Location |
| --- | --- | --- | --- | --- | --- | --- | --- |
| toPosixPath | `toPosixPath(value: string): string` | string |  | llm | 将路径分隔符转换为正斜杠以生成POSIX风格路径。 | join, value.split | src/utils/path.ts:3 |
| stableId | `stableId(...parts: string[]): string` | string |  | llm | 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。 | parts     .join, replace | src/utils/path.ts:7 |
## tsconfig.json

tsconfig.json 包含 0 个类、0 个方法单元和 0 个导入。

### Imports

- 无
