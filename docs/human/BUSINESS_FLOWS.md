# Business Flows

业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。

## main function

main function 从 src/index.ts:9 入口开始，并沿已解析的内部调用边展开。

| Field | Value |
| --- | --- |
| Entrypoint | src/index.ts:9 main |
| Kind | cli |
| Protocol | cli |
| Method |  |
| Path |  |

### Steps

1. main: main 定义一个可调用单元；调用 normalizeProvider, parseCliArgs, printHelp, process.argv.slice, runAnalyzeCommand。
2. normalizeProvider: 将字符串或未定义值标准化为有效的ModelProvider枚举值，若无效则抛出错误。
3. parseCliArgs: parseCliArgs 定义一个可调用单元；调用 COMMANDS.has, commandFrom, excludes.push, parsePositiveInteger, positional.push。
4. printHelp: printHelp 定义一个可调用单元；调用 console.log。
5. runAnalyzeCommand: runAnalyzeCommand 定义一个可调用单元；调用 analyzeRepo, applyModelNetworkEnv, console.log, generateDocs, loadModelConfig；访问 FILE:QUALITY_REPORT.md, FILE:README.md。
6. runDoctorCommand: 运行医生诊断命令，收集并输出所有检查结果，若有失败项则设置退出码为1。
7. runInitCommand: 初始化项目配置并写入文件，同时输出提示信息。
8. runInteractiveCommand: runInteractiveCommand 定义一个可调用单元；调用 ask, askSecret, askYesNo, console.log, defaultModel。
9. runModelTestCommand: runModelTestCommand 定义一个可调用单元；调用 Date.now, applyModelNetworkEnv, askYesNo, console.log, createChatModel。
10. commandFrom: commandFrom 定义一个可调用单元；调用 COMMANDS.has。

### Resources

- `FILE:QUALITY_REPORT.md`
- `FILE:README.md`
