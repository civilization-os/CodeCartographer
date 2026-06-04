# See Code

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-ES2022-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-ready-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![LangChain](https://img.shields.io/badge/LangChain-LLM%20adapter-1C3C3C)](https://js.langchain.com/)
[![Java](https://img.shields.io/badge/Java-lightweight%20adapter-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Docs Quality](https://img.shields.io/badge/docs%20quality-100%2F100-brightgreen)](docs/QUALITY_REPORT.md)

See Code is a repository semantic understanding engine. The first MVP scans a local project, extracts source units, builds a lightweight relation graph, writes engineering documentation into `docs/`, and emits machine-readable analysis and diff results under `.see-code/`.

## Usage

```bash
pnpm install
pnpm analyze -- .
```

Run the local verification suite:

```bash
pnpm verify
```

This runs type checking, build, fixture-based analyzer tests, and a local secret scan.

The same command runs in GitHub Actions on pushes and pull requests to `main`.

Run with an LLM provider:

```bash
SEE_CODE_LLM_PROVIDER=deepseek \
SEE_CODE_LLM_API_KEY=... \
SEE_CODE_LLM_LIMIT=10 \
pnpm analyze -- .
```

OpenAI-compatible private server:

```bash
SEE_CODE_LLM_PROVIDER=openai-compatible \
SEE_CODE_LLM_MODEL=your-model \
SEE_CODE_LLM_BASE_URL=http://localhost:8000/v1 \
SEE_CODE_LLM_API_KEY=not-empty \
SEE_CODE_LLM_LIMIT=20 \
pnpm analyze -- /path/to/repo
```

Anthropic-compatible private server:

```bash
SEE_CODE_LLM_PROVIDER=anthropic-compatible \
SEE_CODE_LLM_MODEL=your-model \
SEE_CODE_LLM_BASE_URL=http://localhost:8000/anthropic \
SEE_CODE_LLM_API_KEY=not-empty \
SEE_CODE_LLM_LIMIT=20 \
pnpm analyze -- /path/to/repo
```

LLM semantic results are cached in `.see-code/cache/method-semantics.json`. Disable cache with:

```bash
SEE_CODE_LLM_CACHE=0 pnpm analyze -- .
```

Generated files:

```text
docs/
  PROJECT_OVERVIEW.md
  ARCHITECTURE.md
  MODULES.md
  EXECUTION_FLOWS.md
  BUSINESS_FLOWS.md
  CALL_GRAPH.md
  ENTRYPOINTS.md
  DATA_AND_RESOURCES.md
  MAINTENANCE_GUIDE.md
  QUALITY_REPORT.md
  CHANGE_SUMMARY.md

.see-code/
  result.json
  result-diff.json
```

## Current Scope

- Scan local repositories.
- Parse TypeScript and JavaScript with the TypeScript compiler AST through a parser adapter.
- Parse Java with a lightweight static parser adapter that extracts classes, methods, annotations, calls, resources, and common Spring entrypoint hints.
- Validate parser behavior with fixture-based TypeScript, Java Spring, and document-only tests.
- Extract `MethodUnit` and `ClassUnit` records.
- Build a basic relation graph.
- Optionally enrich method summaries through LangChain chat model adapters.
- Generate project-level architecture, entrypoint, and flow documents from aggregated MethodUnit semantics.
- Generate human-facing engineering docs.
- Generate a quality report that checks LLM coverage, architecture abstraction, business-flow coverage, template residue, and document size balance.
- Generate `.see-code/result.json` with schema version, stats, files, modules, classes, methods, graph, semantic overview, and quality summary.
- Generate `.see-code/result-diff.json` and `docs/CHANGE_SUMMARY.md` by comparing the new analysis with the previous result.

## Multi-language Direction

The core pipeline is language-neutral after parsing. Parser adapters convert source files into `ModuleUnit`, `ClassUnit`, and `MethodUnit` records. The current adapters support TypeScript, JavaScript, and Java; deeper Java parsing can replace the lightweight adapter as long as it emits the same units.

Java support:

- Parse Java source through the current lightweight adapter, with tree-sitter or another Java AST adapter planned for higher fidelity.
- Extract classes, methods, annotations, signatures, method bodies, and source locations.
- Populate language-neutral MethodUnit metadata: parameters, return type, modifiers, visibility, annotations, framework hints, and entrypoint hints.
- Add framework metadata for Spring MVC, scheduled jobs, repositories, Kafka listeners, and resource access.
- Feed the same MethodUnit semantic analyzer, relation graph builder, and docs generator.

Tree-sitter and LangGraph are planned follow-up adapters.
