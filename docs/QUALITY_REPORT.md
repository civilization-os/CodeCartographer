# Quality Report

## Score

| Metric | Value |
| --- | --- |
| Score | 100/100 |
| Pass | 9 |
| Warn | 0 |
| Fail | 0 |
| Method units | 216 |
| LLM method summaries | 216 |
| Business flows | 1 |
| Static execution flows | 8 |

## Checks

| Status | Check | Detail |
| --- | --- | --- |
| PASS | Method summary coverage | 216/216 methods use LLM summaries; 0 methods use fallback summaries. |
| PASS | Narrative overview | see-code 是一个静态代码仓库分析工具，用于扫描指定仓库的源代码，提取模块、方法、类、资源及调用关系图，并自动生成结构化的工程文档（Markdown 格式）和 JSON 结果文件。 |
| PASS | Architecture abstraction | 10 architecture layers generated. |
| PASS | Business flow coverage | 1 framework-aware business flows generated. |
| PASS | Static execution flow coverage | 8 static execution flows generated. |
| PASS | Placeholder residue | 0 placeholder-like fragments found across generated docs. |
| PASS | English template residue | 0 English template fragments found across generated docs. |
| PASS | Document size balance | Largest document is 73649 characters. |
| PASS | Required outputs | 9 documents generated before quality report. |

## Recommendations

- Keep parser adapters and prompt changes behind this quality report to catch regressions.
