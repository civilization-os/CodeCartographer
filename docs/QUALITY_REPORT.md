# Quality Report

## Score

| Metric | Value |
| --- | --- |
| Score | 100/100 |
| Pass | 9 |
| Warn | 0 |
| Fail | 0 |
| Method units | 124 |
| LLM method summaries | 124 |
| Business flows | 6 |
| Static execution flows | 8 |

## Checks

| Status | Check | Detail |
| --- | --- | --- |
| PASS | Method summary coverage | 124/124 methods use LLM summaries; 0 methods use fallback summaries. |
| PASS | Narrative overview | see-code 是一个静态代码分析工具，用于扫描指定代码仓库，提取模块、方法、类、资源及关系图，并通过 LLM 增强语义分析，最终生成结构化工程文档。 |
| PASS | Architecture abstraction | 6 architecture layers generated. |
| PASS | Business flow coverage | 6 framework-aware business flows generated. |
| PASS | Static execution flow coverage | 8 static execution flows generated. |
| PASS | Placeholder residue | 0 placeholder-like fragments found across generated docs. |
| PASS | English template residue | 0 English template fragments found across generated docs. |
| PASS | Document size balance | Largest document is 45803 characters. |
| PASS | Required outputs | 9 documents generated before quality report. |

## Recommendations

- Keep parser adapters and prompt changes behind this quality report to catch regressions.
