# Documentation README

该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。

## Snapshot

| Metric | Value |
| --- | --- |
| Quality score | 96/100 |
| Scanned files | 42 |
| Source files | 33 |
| Modules | 42 |
| Classes | 2 |
| Method units | 269 |
| LLM method summaries | 258/269 |
| Business flows | 1 |
| Static execution flows | 8 |
| External resources | 26 |
| Graph edges | 648 |

## Recommended Reading Order

1. `human/SYSTEM_MAP.md` - 先用人读版本快速理解系统地图、核心链路和输出分层。
2. `human/PROJECT_OVERVIEW.md` - 再确认项目目标、运行模型和规模。
3. `human/ARCHITECTURE.md` - 查看模块边界、关键路径和热点方法。
4. `human/BUSINESS_FLOWS.md` / `deep-dive/EXECUTION_FLOWS.md` - 检查业务入口和静态执行路径。
5. `deep-dive/DATA_AND_RESOURCES.md` - 追踪数据库、仓储、表、HTTP、文件和环境变量资源。
6. `ai/AI_CONTEXT.md` / `.see-code/result.json` - 给 AI 或自动化流程读取紧凑上下文和完整结构化结果。

## Output Layers

| Layer | Documents | Audience |
| --- | --- | --- |
| Human-readable | `human/SYSTEM_MAP.md`, `human/PROJECT_OVERVIEW.md`, `human/ARCHITECTURE.md`, `human/BUSINESS_FLOWS.md`, `human/QUALITY_REPORT.md` | 人类读者、评审、交接和项目理解。 |
| AI-readable | `ai/AI_CONTEXT.md`, `.see-code/result.json`, `.see-code/result-diff.json` | AI agent、自动化检查、二次分析和上下文注入。 |
| Deep-dive | `deep-dive/MODULES.md`, `deep-dive/CALL_GRAPH.md`, `deep-dive/EXECUTION_FLOWS.md`, `deep-dive/ENTRYPOINTS.md`, `deep-dive/DATA_AND_RESOURCES.md` | 需要追踪方法、调用边、入口点和资源细节时使用。 |

## Document Map

| Document | Use it for | Size |
| --- | --- | --- |
| [human/SYSTEM_MAP.md](human/SYSTEM_MAP.md) | 面向人读的高层系统地图、核心链路、输出分层和扩展点。 | 3421 chars |
| [human/PROJECT_OVERVIEW.md](human/PROJECT_OVERVIEW.md) | 项目目标、运行模型、规模指标和生成产物总览。 | 6632 chars |
| [human/ARCHITECTURE.md](human/ARCHITECTURE.md) | 架构层、模块区域、关键路径和核心热点方法。 | 10115 chars |
| [human/BUSINESS_FLOWS.md](human/BUSINESS_FLOWS.md) | 由框架入口驱动的业务流程和资源访问路径。 | 1029 chars |
| [human/QUALITY_REPORT.md](human/QUALITY_REPORT.md) | 质量得分、覆盖率、模板残留和输出完整性检查。 | 1222 chars |
| [ai/AI_CONTEXT.md](ai/AI_CONTEXT.md) | 面向 AI/自动化读取的紧凑结构化上下文。 | 7772 chars |
| [deep-dive/MODULES.md](deep-dive/MODULES.md) | 模块、类、关键方法和高信号方法摘要。 | 62590 chars |
| [deep-dive/CALL_GRAPH.md](deep-dive/CALL_GRAPH.md) | 可解析的仓库内部调用边和 Mermaid 图。 | 44363 chars |
| [deep-dive/EXECUTION_FLOWS.md](deep-dive/EXECUTION_FLOWS.md) | 由静态调用图推断出的执行路径。 | 6098 chars |
| [deep-dive/ENTRYPOINTS.md](deep-dive/ENTRYPOINTS.md) | 框架感知入口和静态入口候选。 | 2048 chars |
| [deep-dive/DATA_AND_RESOURCES.md](deep-dive/DATA_AND_RESOURCES.md) | 检测到的数据库、HTTP、文件、环境变量等资源。 | 991 chars |
| [deep-dive/MAINTENANCE_GUIDE.md](deep-dive/MAINTENANCE_GUIDE.md) | 当前分析边界、维护注意事项和仓库文件清单。 | 2997 chars |
| [deep-dive/CHANGE_SUMMARY.md](deep-dive/CHANGE_SUMMARY.md) | 本次分析相对上一版结构化结果的变化。 | written after JSON diff |

## Machine-readable Outputs

- `.see-code/result.json` 保存完整结构化分析结果，包括文件、模块、类、方法、资源、图和语义概览。
- `.see-code/result-diff.json` 保存相对上一版结果的机器可读差异。
- `schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义输出契约。
