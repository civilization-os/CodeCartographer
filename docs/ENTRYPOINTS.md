# Entrypoints

入口点分为框架感知入口和静态候选入口。框架感知入口可用于生成业务流；静态候选入口只根据调用边推断。

## Framework-aware Entrypoints

| Method | Module | Kind | Protocol | Route/Topic | Summary |
| --- | --- | --- | --- | --- | --- |
| main | src/index.ts | cli | cli | main function | 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 |
| OrderController#create | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java | http_route | http | /api/orders | 处理创建订单的HTTP POST请求，调用订单服务并返回订单数据传输对象。 |
| OrderController#reconcile | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java | scheduled_job | timer | Spring scheduled job | 定时触发订单对账任务，委托给订单服务执行对账逻辑。 |
| OrderController#consume | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java | message_consumer | message | order-events | 从Kafka主题'order-events'消费消息并委托给orderService处理。 |
| registerRoutes | tests/fixtures/typescript-basic/src/app.ts | http_route | http | /orders | 注册路由，将路径/orders与createOrder处理函数绑定到app的POST方法上。 |
| main | tests/fixtures/typescript-basic/src/app.ts | cli | cli | main function | 注册路由并启动应用。 |

## Static Entrypoint Candidates

| Method | Module | Fan-out | Reason | Summary |
| --- | --- | --- | --- | --- |
| extractClassUnit | src/parser/javaStructureParser.ts | 5 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 从Java类块中提取类单元，包括方法列表和类元数据。 |
| extractFrameworkHints | src/parser/javaStructureParser.ts | 5 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。 |
| parseJavaModule | src/parser/javaStructureParser.ts | 4 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 解析Java源文件并提取模块单元信息，包括导入、类和方法。 |
| parseTypeScriptModule | src/parser/typescriptStructureParser.ts | 4 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。 |
| main | src/index.ts | 3 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 解析命令行参数，执行代码仓库分析并生成文档，输出统计信息。 |
| extractClassUnit | src/parser/typescriptStructureParser.ts | 3 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。 |
| extractResources | src/graph/relationGraphBuilder.ts | 2 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 从模块单元中提取所有资源并去重排序，返回资源节点列表。 |
| extractFrameworkHints | src/parser/typescriptStructureParser.ts | 2 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 遍历 TypeScript AST 节点，识别 HTTP 路由、fetch 调用、定时任务和环境变量等框架相关模式并返回去重后的提示列表。 |
| createOrder | tests/fixtures/typescript-basic/src/app.ts | 2 | 没有已解析的内部调用者，并且存在已解析的下游调用。 | 创建订单，包括标准化订单数据、持久化订单并调用外部支付接口。 |
