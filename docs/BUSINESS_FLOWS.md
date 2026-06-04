# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过命令行调用 see-code，工具解析参数、加载配置、执行分析、生成文档并输出结果。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，提取命令、目标路径和环境变量覆盖值。
2. 调用 loadProjectConfig 从目标路径加载项目配置，若文件不存在则返回空配置。
3. 调用 loadModelConfig 从环境变量和项目配置中合并 LLM 模型配置。
4. 调用 analyzeRepo 执行代码仓库分析，返回包含模块、方法、类、资源和关系图的结果。
5. 调用 generateDocs 生成 Markdown 文档并写入指定目录。
6. 调用 writeResultJson 将结果序列化为 JSON 并写入文件系统。

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
