# Documentation Index

该工具扫描指定代码仓库，提取模块、方法、类、资源和调用关系，生成结构化工程文档和JSON结果，支持TypeScript和Java项目。

## Snapshot

| Metric | Value |
| --- | --- |
| Quality score | 100/100 |
| Scanned files | 36 |
| Source files | 27 |
| Modules | 36 |
| Classes | 2 |
| Method units | 250 |
| LLM method summaries | 250/250 |
| Business flows | 1 |
| Static execution flows | 8 |
| External resources | 22 |
| Graph edges | 583 |

## Recommended Reading Order

1. `PROJECT_OVERVIEW.md` - 先确认项目目标、运行模型和规模。
2. `ARCHITECTURE.md` - 再看模块边界、关键路径和热点方法。
3. `BUSINESS_FLOWS.md` / `EXECUTION_FLOWS.md` - 检查业务入口和静态执行路径。
4. `DATA_AND_RESOURCES.md` - 追踪数据库、仓储、表、HTTP、文件和环境变量资源。
5. `MODULES.md` / `.see-code/result.json` - 需要方法级细节时再深入查看。

## Document Map

| Document | Use it for | Size |
| --- | --- | --- |
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | 项目目标、运行模型、规模指标和生成产物总览。 | 4572 chars |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 架构层、模块区域、关键路径和核心热点方法。 | 6353 chars |
| [BUSINESS_FLOWS.md](BUSINESS_FLOWS.md) | 由框架入口驱动的业务流程和资源访问路径。 | 1229 chars |
| [EXECUTION_FLOWS.md](EXECUTION_FLOWS.md) | 由静态调用图推断出的执行路径。 | 5827 chars |
| [CALL_GRAPH.md](CALL_GRAPH.md) | 可解析的仓库内部调用边和 Mermaid 图。 | 39256 chars |
| [ENTRYPOINTS.md](ENTRYPOINTS.md) | 框架感知入口和静态入口候选。 | 2082 chars |
| [DATA_AND_RESOURCES.md](DATA_AND_RESOURCES.md) | 检测到的数据库、HTTP、文件、环境变量等资源。 | 763 chars |
| [MODULES.md](MODULES.md) | 模块、类、关键方法和高信号方法摘要。 | 52828 chars |
| [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) | 当前分析边界、维护注意事项和仓库文件清单。 | 2715 chars |
| [QUALITY_REPORT.md](QUALITY_REPORT.md) | 质量得分、覆盖率、模板残留和输出完整性检查。 | generated later |
| [CHANGE_SUMMARY.md](CHANGE_SUMMARY.md) | 本次分析相对上一版结构化结果的变化。 | generated later |

## Machine-readable Outputs

- `.see-code/result.json` 保存完整结构化分析结果，包括文件、模块、类、方法、资源、图和语义概览。
- `.see-code/result-diff.json` 保存相对上一版结果的机器可读差异。
- `schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义输出契约。
