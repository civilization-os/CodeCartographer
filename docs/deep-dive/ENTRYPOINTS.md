# Entrypoints

入口点分为框架感知入口和静态候选入口。框架感知入口可用于生成业务流；静态候选入口只根据调用边推断。

## Framework-aware Entrypoints

| Method | Module | Kind | Protocol | Route/Topic | Summary |
| --- | --- | --- | --- | --- | --- |
| main | src/index.ts | cli | cli | main function | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 |

## Static Entrypoint Candidates

| Method | Module | Fan-out | Reason | Summary |
| --- | --- | --- | --- | --- |
| extractClassUnit | src/parser/javaStructureParser.ts | 9 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从Java源代码中提取类单元，包括方法、字段、资源和路由前缀，并构建ClassUnit对象。 |
| main | src/index.ts | 8 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。 |
| extractFrameworkHints | src/parser/javaStructureParser.ts | 6 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从Java类和方法注解中提取框架相关的路由、定时任务、消息消费者、持久化和环境配置提示。 |
| parseJavaModule | src/parser/javaStructureParser.ts | 5 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 解析Java源文件并提取模块单元信息，包括类、方法和导入。 |
| parseTypeScriptModule | src/parser/typescriptStructureParser.ts | 4 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 |
| extractClassUnit | src/parser/typescriptStructureParser.ts | 3 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。 |
| generateFixtureOutput | tests/schemaContract.test.ts | 3 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 在临时目录中复制Java Spring测试夹具，执行仓库分析和文档生成，并将结果写入JSON文件。 |
| extractResources | src/graph/relationGraphBuilder.ts | 2 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从模块单元中提取所有资源并去重排序，返回资源节点数组。 |
| extractResources | src/parser/javaStructureParser.ts | 2 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从方法体源码和注解中提取HTTP、环境变量、文件、SQL和仓库操作资源标识符。 |
| extractFrameworkHints | src/parser/typescriptStructureParser.ts | 2 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 遍历 TypeScript AST 节点，识别 HTTP 路由、fetch 调用、定时任务和环境变量等框架相关模式并返回去重后的提示列表。 |
| serializeEntrypoint | src/output/resultJsonWriter.ts | 1 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 将入口点摘要序列化为包含方法引用、扇出和原因的键值对对象。 |
| serializeFlow | src/output/resultJsonWriter.ts | 1 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 将FlowSummary对象序列化为包含名称、入口点、步骤和资源的普通对象。 |
