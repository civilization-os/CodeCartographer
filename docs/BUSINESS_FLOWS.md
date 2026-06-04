# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过 CLI 执行 see-code，工具依次完成参数解析、配置加载、文件扫描、模块解析、关系图构建、语义分析、文档生成和结果输出。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，调用 parseArgs 提取命令、目标路径和环境变量覆盖值。
2. loadProjectConfig 从目标路径异步加载项目配置文件，若不存在则返回空配置。
3. loadModelConfig 从环境变量和项目配置中合并 LLM 模型配置。
4. analyzeRepo 调用 scanRepo 递归扫描目录，过滤排除项、大文件和未知语言文件，返回源文件列表。
5. analyzeRepo 调用 parseModules 解析每个源文件，提取模块、类、方法及其元数据。
6. analyzeRepo 调用 buildRelationGraph 构建模块、类、方法和资源之间的关系图。
7. enrichModulesWithMethodSemantics 对每个方法进行语义分析，优先使用缓存，未命中则调用 LLM 或启发式方法。
8. generateDocs 将分析结果和语义信息写入多个 Markdown 文件（项目概览、架构、模块、质量报告等）。
9. writeResultJson 将结果序列化为 JSON 对象，写入结果 JSON、差异 JSON 和变更摘要 Markdown 文件。

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
