# Entrypoints

入口点分为框架感知入口和静态候选入口。框架感知入口可用于生成业务流；静态候选入口只根据调用边推断。

## Framework-aware Entrypoints

| Method | Module | Kind | Protocol | Route/Topic | Summary |
| --- | --- | --- | --- | --- | --- |
| main | src/index.ts | cli | cli | main function | 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。 |

## Static Entrypoint Candidates

| Method | Module | Fan-out | Reason | Summary |
| --- | --- | --- | --- | --- |
| main | src/index.ts | 7 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。 |
| extractClassUnit | src/parser/javaStructureParser.ts | 5 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从Java类块中提取类单元，包括方法列表和类元数据。 |
| extractFrameworkHints | src/parser/javaStructureParser.ts | 5 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。 |
| parseJavaModule | src/parser/javaStructureParser.ts | 4 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| parseTypeScriptModule | src/parser/typescriptStructureParser.ts | 4 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 |
| extractClassUnit | src/parser/typescriptStructureParser.ts | 3 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。 |
| generateFixtureOutput | tests/schemaContract.test.ts | 3 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 在临时目录中复制Java Spring测试夹具，执行仓库分析和文档生成，并将结果写入JSON文件。 |
| extractResources | src/graph/relationGraphBuilder.ts | 2 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 从模块单元中提取所有资源并去重排序，返回资源节点列表。 |
| extractFrameworkHints | src/parser/typescriptStructureParser.ts | 2 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 遍历 TypeScript AST 节点，识别 HTTP 路由、fetch 调用、定时任务和环境变量等框架相关模式并返回去重后的提示列表。 |
| serializeEntrypoint | src/output/resultJsonWriter.ts | 1 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 将入口点摘要序列化为包含方法引用、扇出和原因的键值对对象。 |
| serializeFlow | src/output/resultJsonWriter.ts | 1 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 将FlowSummary对象序列化为包含名称、入口点、步骤和资源的普通对象。 |
| serializeBusinessFlow | src/output/resultJsonWriter.ts | 1 | 没有已解析的内部调用者，并且至少存在一个已解析的下游调用。 | 将业务流候选对象序列化为包含名称、入口点、入口点提示、步骤和资源的普通对象。 |
