# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

从 CLI 入口开始，依次执行参数解析、配置加载、仓库扫描、源文件解析、关系图构建、语义分析、文档生成和结果输出。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main 函数解析命令行参数，调用 loadProjectConfig 和 loadModelConfig 加载配置。
2. analyzeRepo 调用 scanDirectory 递归扫描仓库目录，返回源文件列表。
3. 遍历源文件，通过 parserAdapter 调用对应语言解析器（TypeScript 或 Java）提取模块单元。
4. buildRelationGraph 根据模块单元构建关系图，包含节点和边。
5. enrichModulesWithMethodSemantics 对每个方法执行语义分析，优先使用缓存，未缓存则调用 LLM 或启发式规则。
6. generateDocs 生成项目概览、架构、模块列表、质量报告等 Markdown 文件。
7. writeResultJson 将分析结果写入 JSON 文件，并生成差异报告和变更摘要。

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
