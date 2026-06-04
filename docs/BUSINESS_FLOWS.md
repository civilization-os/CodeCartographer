# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过命令行执行 see-code，指定目标路径和可选的模型配置。系统解析参数后，依次执行扫描、解析、语义增强、关系图构建和结果写入，最终输出 result.json 文件路径。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:7 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，验证目标路径和模型配置。
2. 调用 analyzeRepo 函数，传入目标路径和模型配置。
3. scanRepo 递归扫描目录，返回源文件信息列表。
4. parseModules 遍历源文件，根据语言选择适配器解析为模块单元。
5. enrichModulesWithMethodSemantics 对每个方法附加启发式标签，并通过 LLM 或缓存获取语义分析结果。
6. buildRelationGraph 构建模块、类、方法和资源的关系图。
7. writeResultJson 将结果序列化为 JSON 并写入 result.json 文件。

### Resources

- `FILE:result.json`

## POST /api/orders

系统遍历所有模块中的方法，优先检查缓存中是否存在语义分析结果。若缓存命中则直接使用，否则调用 LLM 模型进行分析，解析响应后更新缓存，并更新模块和类的摘要。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:19 OrderController#create |
| Kind | http_route |
| Protocol | http |
| Method | post |
| Path | /api/orders |

### Steps

1. 遍历模块列表中的每个方法。
2. 检查 methodSemanticCache 中是否存在该方法 ID 的缓存结果。
3. 若缓存命中，直接使用缓存结果更新方法语义。
4. 若缓存未命中，调用 modelFactory 创建 LLM 模型实例。
5. 调用 LLM 模型分析方法的语义，获取结构化响应。
6. parseModelResponse 解析响应内容，验证为方法语义结构。
7. 将结果写入缓存，并更新模块和类的摘要。

### Resources

- `ENV:ORDER_TOPIC`
- `environment:ORDER_TOPIC`
- `http_route:/api/orders`

## Spring scheduled job

系统从所有模块单元中提取资源节点，构建方法名称到方法单元的索引映射，然后根据调用字符串解析调用关系，生成包含节点和边的图结构。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:25 OrderController#reconcile |
| Kind | scheduled_job |
| Protocol | timer |
| Method |  |
| Path |  |

### Steps

1. 从所有模块单元中提取资源列表，去重排序后生成资源节点。
2. 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。
3. 遍历所有方法，解析方法体内的调用字符串。
4. 根据调用字符串和方法索引解析目标方法单元，优先精确匹配，其次尝试最后一段名称匹配。
5. 为每个调用关系生成边，包含调用方、被调用方和调用分数。
6. 返回包含节点和边的图结构。

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
