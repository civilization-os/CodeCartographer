# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

用户通过 CLI 执行 see-code 命令，系统解析参数后加载配置，扫描仓库文件，解析模块结构，构建关系图，对方法进行语义分析，最后生成文档并输出结果。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. parseArgs 解析命令行参数，提取命令、目标路径和环境变量覆盖值。
2. loadProjectConfig 从目标路径加载 see-code.config.json 配置。
3. loadModelConfig 从环境变量和项目配置合并 LLM 模型配置。
4. analyzeRepo 递归扫描目录，过滤排除项，解析源文件为模块单元。
5. buildRelationGraph 根据模块单元和资源构建关系图（节点和边）。
6. enrichModulesWithMethodSemantics 对每个方法执行语义分析（缓存/LLM/启发式）。
7. generateDocs 将分析结果渲染为 Markdown 文档并写入文件系统。
8. writeResultJson 将结果序列化为 JSON，写入结果文件、差异文件和变更摘要。

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
