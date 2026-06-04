# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过 CLI 执行 see-code，系统扫描仓库、解析源文件、构建关系图、增强语义并输出文档。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:7 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数（目标路径、模型配置），调用 analyzeRepo。
2. analyzeRepo 调用 repoScanner 递归扫描目录，返回源文件列表。
3. moduleParser 遍历源文件，通过语言适配器解析为 ModuleUnit 数组。
4. relationGraphBuilder 从模块单元中提取调用关系和资源引用，构建关系图。
5. methodSemanticAnalyzer 对每个方法执行语义分析（缓存优先，LLM 或启发式补充），更新模块和类摘要。
6. resultJsonWriter 将结果组装为标准化 JSON，写入 result.json、result-diff.json、CHANGE_SUMMARY.md。

### Resources

- `FILE:CHANGE_SUMMARY.md`
- `FILE:result-diff.json`
- `FILE:result.json`

## POST /api/orders

对未缓存的方法，调用 LLM API 获取语义标签，解析响应并更新模块摘要。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:19 OrderController#create |
| Kind | http_route |
| Protocol | http |
| Method | post |
| Path | /api/orders |

### Steps

1. enrichModulesWithMethodSemantics 遍历模块列表，对每个方法检查 methodSemanticCache。
2. 缓存命中则直接使用缓存结果；未命中则调用 modelFactory 创建 LLM 实例。
3. LLM 实例发送方法代码和上下文到 DeepSeek API，接收结构化响应。
4. 解析响应内容，验证为 MethodSemantic 结构，提取语义标签（如 HTTP 路由、定时任务）。
5. 更新方法单元的语义字段，并更新所属模块和类的摘要文本。

### Resources

- `ENV:ORDER_TOPIC`
- `environment:ORDER_TOPIC`
- `http_route:/api/orders`

## Spring scheduled job

将扫描结果、关系图、语义标签组装为标准化 JSON，并写入文件系统。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:25 OrderController#reconcile |
| Kind | scheduled_job |
| Protocol | timer |
| Method |  |
| Path |  |

### Steps

1. writeResultJson 接收分析结果对象（包含模块、类、方法、关系图、入口点）。
2. 调用 buildResultDiff 比较当前结果与历史结果（若存在），生成差异报告。
3. 序列化模块单元、类单元、方法单元为普通 JSON 对象。
4. 将结果 JSON 写入 result.json，差异 JSON 写入 result-diff.json，变更摘要写入 CHANGE_SUMMARY.md。

### Resources

- `scheduled_job:0 0 * * * *`

## order-events

order-events 从 OrderController#consume 入口开始，沿调用图展开执行步骤。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:30 OrderController#consume |
| Kind | message_consumer |
| Protocol | message |
| Method |  |
| Path | order-events |

### Steps

1. OrderController#consume - 从Kafka主题'order-events'消费消息并委托给orderService处理。

### Resources

- `message_consumer:order-events`

## POST /orders

POST /orders 从 registerRoutes 入口开始，沿调用图展开执行步骤。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/typescript-basic/src/app.ts:12 registerRoutes |
| Kind | http_route |
| Protocol | http |
| Method | post |
| Path | /orders |

### Steps

1. registerRoutes - 注册路由，将路径/orders与createOrder处理函数绑定到app的POST方法上。

### Resources

- `http_route:/orders`

## main function

main function 从 main 入口开始，沿调用图展开执行步骤。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/typescript-basic/src/app.ts:36 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main - 注册路由并启动应用。
2. registerRoutes - 注册路由，将路径/orders与createOrder处理函数绑定到app的POST方法上。

### Resources

- `http_route:/orders`
