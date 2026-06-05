# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

main function 从 src/index.ts:8 入口开始，并沿已解析的内部调用边展开。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:8 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main: 解析命令行参数并根据子命令分发执行交互、分析、初始化、诊断或帮助操作。
2. normalizeProvider: 将字符串或未定义值标准化为有效的ModelProvider枚举值，若无效则抛出错误。
3. parseCliArgs: 解析命令行参数并返回结构化的 CliOptions 对象，包含命令、目标路径、环境变量覆盖、排除列表等配置。
4. printHelp: 打印 CodeCartographer 工具的帮助信息，包括用法、命令、选项和环境变量说明。
5. runAnalyzeCommand: runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, console.log, generateDocs, loadModelConfig, loadProjectConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。
6. runDoctorCommand: 运行医生诊断命令，收集并输出所有检查结果，若有失败项则设置退出码为1。
7. runInitCommand: 初始化项目配置并写入文件，同时输出提示信息。
8. runInteractiveCommand: 通过交互式命令行引导用户配置并依次执行初始化、诊断和分析命令。
9. commandFrom: 根据输入字符串或默认值返回对应的 CLI 命令类型。
10. parsePositiveInteger: 解析命令行参数中的正整数，若无效则抛出错误。

### Resources

- `FILE:QUALITY_REPORT.md`
- `FILE:README.md`
