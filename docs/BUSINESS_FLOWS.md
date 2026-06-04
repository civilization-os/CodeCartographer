# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过 CLI 调用 see-code，传入目标路径和可选模型配置。系统依次执行扫描、解析、图构建和语义分析，最终输出分析结果。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:6 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，提取命令、目标路径和模型配置。
2. 调用 scanRepo 递归扫描目标目录，返回源文件列表。
3. 调用 parseModules 遍历源文件，通过适配器解析为模块单元。
4. 调用 buildRelationGraph 构建关系图。
5. 调用 enrichModulesWithMethodSemantics 对方法进行语义分析。
6. 输出统计信息和文档内容。

### Resources

- 无

## POST /api/orders

对每个模块中的方法进行语义分析，优先从缓存读取结果，未命中时通过 LLM 或启发式规则生成语义标签，并更新模块和类的摘要。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:19 OrderController#create |
| Kind | http_route |
| Protocol | http |
| Method | post |
| Path | /api/orders |

### Steps

1. 遍历模块列表，对每个方法检查 methodSemanticCache 是否存在缓存。
2. 缓存命中则直接使用缓存结果。
3. 缓存未命中时，调用 LLM 分析方法的语义信息。
4. LLM 响应解析为结构化语义结果。
5. 若 LLM 调用失败，回退到启发式规则附加语义标签。
6. 更新模块和类的摘要信息。

### Resources

- `ENV:ORDER_TOPIC`
- `environment:ORDER_TOPIC`
- `http_route:/api/orders`

## Spring scheduled job

基于解析后的模块单元，提取所有资源节点，构建方法名称到方法单元的索引，解析调用关系，生成包含节点和边的图结构。

| Field | Value |
| --- | --- |
| Entrypoint | tests/fixtures/java-spring/src/main/java/com/acme/OrderController.java:25 OrderController#reconcile |
| Kind | scheduled_job |
| Protocol | timer |
| Method |  |
| Path |  |

### Steps

1. 从所有模块单元中提取资源并去重排序，生成资源节点列表。
2. 构建方法名称到方法单元的索引映射，支持类名限定和多种命名格式。
3. 遍历方法中的调用字符串，通过索引解析唯一的方法单元。
4. 为每个调用关系生成边，包含调用方和被调用方节点。
5. 返回包含节点列表和边列表的关系图。

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
