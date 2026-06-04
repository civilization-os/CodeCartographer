# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

main function 从 main 入口开始，沿调用图展开执行步骤。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main - 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。
2. analyzeRepo - 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。
3. generateDocs - 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。
4. loadModelConfig - 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。
5. loadProjectConfig - 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
6. parseArgs - 解析命令行参数，提取命令、目标路径和环境变量覆盖值。
7. printHelp - 打印命令行帮助信息，展示使用方法和配置选项。
8. writeResultJson - 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。
9. attachHeuristicSemantics - 遍历模块列表，为每个方法附加启发式语义标签。
10. buildRelationGraph - 构建模块、类、方法和资源之间的关系图，返回节点和边集合。

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
