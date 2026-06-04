# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

从 CLI 入口开始，依次执行参数解析、配置加载、仓库扫描、文件解析、关系图构建、语义分析、文档生成和结果输出。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，调用 parseArgs 提取命令、目标路径和环境变量覆盖值。
2. loadProjectConfig 从目标路径加载 see-code.config.json，若不存在则返回空配置。
3. loadModelConfig 从环境变量和项目配置中合并 LLM 模型配置。
4. analyzeRepo 调用 repoScanner 扫描目录，过滤后返回源文件列表。
5. 遍历源文件列表，根据语言类型调用对应解析器（TypeScriptAdapter 或 JavaAdapter）提取模块单元。
6. buildRelationGraph 从模块单元中构建节点和边，生成关系图。
7. enrichModulesWithMethodSemantics 对每个方法执行语义分析（优先缓存，未缓存则调用 LLM 或启发式规则）。
8. generateDocs 将分析结果渲染为多个 Markdown 文件（概览、架构、模块、流程、质量报告）。
9. writeResultJson 将结果、文档路径、差异报告序列化为 JSON 并写入文件系统。

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
