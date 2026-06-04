# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

从 CLI 入口开始，依次执行扫描、解析、关系图构建和语义分析，最终输出结构化文档。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:6 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，调用 analyzeRepo。
2. analyzeRepo 调用 scanRepo 递归扫描目标目录，返回源文件列表。
3. analyzeRepo 调用 parseModules，根据文件扩展名选择适配器解析每个文件，生成模块单元数组。
4. analyzeRepo 调用 buildRelationGraph，基于模块单元中的调用字符串构建关系图。
5. analyzeRepo 调用 enrichModulesWithMethodSemantics，遍历模块为每个方法附加语义标签（优先缓存，未命中则调用 LLM 或启发式规则）。
6. analyzeRepo 组装最终结果，包含模块、方法、类、资源及关系图，返回给 main。
7. main 输出结果文档和统计信息。

### Resources

- 无
