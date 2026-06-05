# Quality Report

## Score

| Metric | Value |
| --- | --- |
| Score | 96/100 |
| Pass | 8 |
| Warn | 1 |
| Fail | 0 |
| Method units | 269 |
| LLM method summaries | 258 |
| Business flows | 1 |
| Static execution flows | 8 |

## Checks

| Status | Check | Detail |
| --- | --- | --- |
| WARN | Method summary coverage | 258/269 methods use LLM summaries; 11 methods use fallback summaries. Coverage is 96%. |
| PASS | Narrative overview | 该仓库是一个 TypeScript/JavaScript 工程，围绕 analyzer、cli、config、core、docs 等模块组织源码结构、调用关系和资源访问，包含 1 个 CLI 入口。 |
| PASS | Architecture abstraction | 15 architecture layers generated. |
| PASS | Business flow coverage | 1 framework-aware business flows generated. |
| PASS | Static execution flow coverage | 8 static execution flows generated. |
| PASS | Placeholder residue | 0 placeholder-like fragments found across generated docs. |
| PASS | English template residue | 0 English template fragments found across generated docs. |
| PASS | Document size balance | Largest document is 62590 characters. |
| PASS | Required outputs | 12 documents generated before quality report. |

## Recommendations

- Keep parser adapters and prompt changes behind this quality report to catch regressions.
