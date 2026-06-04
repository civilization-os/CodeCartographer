# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过 CLI 启动 see-code，工具依次执行参数解析、配置加载、仓库扫描、模块解析、关系图构建、语义增强、文档生成和结果输出。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，提取命令、目标路径和环境变量覆盖值。
2. loadProjectConfig 从目标路径加载项目配置文件，若不存在则返回空配置。
3. loadModelConfig 从环境变量和项目配置中合并 LLM 模型配置。
4. analyzeRepo 调用 scanRepo 递归扫描仓库文件，返回源文件列表。
5. parseModules 将源文件解析为模块、类、方法的结构化单元。
6. buildRelationGraph 根据调用字符串和方法索引构建关系图。
7. enrichModulesWithMethodSemantics 为每个方法附加语义标签（缓存优先，LLM 或启发式降级）。
8. generateDocs 将分析结果渲染为多个 Markdown 文件并写入输出目录。
9. writeResultJson 将结果序列化为 JSON 并写入文件系统，同时生成差异报告和变更摘要。

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
