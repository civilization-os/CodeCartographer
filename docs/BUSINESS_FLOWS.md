# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

CLI 入口解析参数后调用 analyzeRepo，该函数依次执行扫描、解析、图构建和语义分析，最后生成文档并输出结果。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. parseArgs 解析命令行参数，提取命令、目标路径和环境变量覆盖值。
2. loadProjectConfig 异步加载项目配置文件，若不存在则返回空配置。
3. loadModelConfig 从环境变量和项目配置中合并 LLM 模型配置。
4. analyzeRepo 调用 scanRepo 递归扫描目录，返回源文件列表。
5. moduleParser 将每个源文件解析为模块单元，包含导入、类和方法。
6. buildRelationGraph 构建模块、类、方法和资源之间的关系图。
7. enrichModulesWithMethodSemantics 为每个方法附加语义标签（缓存优先，未命中则调用 LLM 或启发式规则）。
8. generateDocs 将分析结果渲染为多份 Markdown 文档并写入文件系统。
9. writeResultJson 将结果序列化为 JSON，写入文件系统并生成差异报告。

### Resources

- `FILE:ARCHITECTURE.md`
- `FILE:BUSINESS_FLOWS.md`
- `FILE:CALL_GRAPH.md`
- `FILE:CHANGE_SUMMARY.md`
- `FILE:DATA_AND_RESOURCES.md`
- `FILE:ENTRYPOINTS.md`
- `FILE:EXECUTION_FLOWS.md`
- `FILE:MAINTENANCE_GUIDE.md`
- `FILE:MODULES.md`
- `FILE:PROJECT_OVERVIEW.md`
- `FILE:QUALITY_REPORT.md`
- `FILE:result-diff.json`
- `FILE:result.json`
