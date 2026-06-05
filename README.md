# CodeCartographer

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-ES2022-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-ready-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![LangChain](https://img.shields.io/badge/LangChain-LLM%20adapter-1C3C3C)](https://js.langchain.com/)
[![Java](https://img.shields.io/badge/Java-lightweight%20adapter-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Docs Quality](https://img.shields.io/badge/docs%20quality-96%2F100-yellowgreen)](docs/human/QUALITY_REPORT.md)

CodeCartographer is a static code intelligence tool for turning repositories into architecture documentation, call graphs, business-flow maps, resource inventories, and structured JSON context. It scans a local project, extracts source units, builds a lightweight relation graph, writes engineering documentation into `docs/`, and emits machine-readable analysis and diff results under `.see-code/`.

GitHub description:

> Static code intelligence for generating architecture docs, call graphs, business flows, and structured repository maps with optional LLM-powered method understanding.

## Why

Most repository documentation starts from files and folders. CodeCartographer starts from code units, framework entrypoints, calls, resources, and generated execution paths. The goal is to produce documentation that is useful to humans and structured context that is useful to automation.

Use it when you need to:

- Understand an unfamiliar TypeScript, JavaScript, or Java/Spring repository.
- Generate architecture docs and call graphs from source instead of hand-written summaries.
- Trace controller, service, repository, entity, and resource usage paths.
- Produce machine-readable JSON context for downstream agents, checks, and documentation workflows.

## Quick Start

Interactive setup:

```bash
pnpm install
pnpm dev --
```

The default CLI opens a guided flow for choosing the project path, LLM provider,
safe config generation, doctor checks, and analysis.

Command mode:

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

After building, the package exposes a `codecartographer` binary:

```bash
pnpm build
node dist/index.js help
```

The intended command shape for published usage is:

```bash
codecartographer
codecartographer init /path/to/repo --provider deepseek --model deepseek-chat
codecartographer doctor /path/to/repo
codecartographer analyze /path/to/repo --provider deepseek --model deepseek-chat
codecartographer analyze /path/to/repo --no-proxy localhost,127.0.0.1,.internal
```

Run with an LLM provider:

```bash
SEE_CODE_LLM_PROVIDER=deepseek \
SEE_CODE_LLM_API_KEY=... \
SEE_CODE_NO_PROXY=localhost,127.0.0.1,.internal \
SEE_CODE_LLM_LIMIT=10 \
pnpm analyze -- .
```

Minimal project config can live in `see-code.config.json`:

```json
{
  "scan": {
    "exclude": ["tests/fixtures/**", "generated/**"],
    "maxFileBytes": 1048576
  },
  "llm": {
    "provider": "deepseek",
    "model": "deepseek-chat",
    "baseUrl": "https://api.deepseek.com",
    "noProxy": "localhost,127.0.0.1,.internal",
    "cache": true
  }
}
```

Do not put API keys in `see-code.config.json`; use CLI flags or environment variables for secrets. Precedence is CLI flags, then environment variables, then config, then defaults.
`llm.noProxy` is non-sensitive and is copied to `NO_PROXY`/`no_proxy` before LLM calls so local model gateways and internal domains can bypass corporate proxies.

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

## What It Generates

```text
docs/
  README.md
  human/
    SYSTEM_MAP.md
    PROJECT_OVERVIEW.md
    ARCHITECTURE.md
    BUSINESS_FLOWS.md
    QUALITY_REPORT.md
  ai/
    AI_CONTEXT.md
  deep-dive/
    MODULES.md
    CALL_GRAPH.md
    EXECUTION_FLOWS.md
    ENTRYPOINTS.md
    DATA_AND_RESOURCES.md
    MAINTENANCE_GUIDE.md
    CHANGE_SUMMARY.md

.see-code/
  result.json
  result-diff.json

schema/
  result.schema.json
  result-diff.schema.json
```

`docs/README.md` is the best starting point. It links the generated documents,
shows the quality snapshot, separates human-readable and AI-readable outputs,
and recommends a reading order.

Output layers:

- Human-readable: `docs/human/SYSTEM_MAP.md`, `docs/human/PROJECT_OVERVIEW.md`,
  `docs/human/ARCHITECTURE.md`, `docs/human/BUSINESS_FLOWS.md`, and
  `docs/human/QUALITY_REPORT.md`.
- AI-readable: `docs/ai/AI_CONTEXT.md`, `.see-code/result.json`, and
  `.see-code/result-diff.json`.
- Deep-dive: `docs/deep-dive/MODULES.md`, `docs/deep-dive/CALL_GRAPH.md`,
  `docs/deep-dive/EXECUTION_FLOWS.md`, `docs/deep-dive/ENTRYPOINTS.md`,
  and `docs/deep-dive/DATA_AND_RESOURCES.md`.

## Real-project Snapshots

Spring PetClinic and Book Social Network are used as ignored external evaluation
projects.

| Metric | PetClinic with DeepSeek | Book Social Network with DeepSeek |
| --- | ---: | ---: |
| Scanned files | 33 | 51 |
| Classes | 25 | 49 |
| Method units | 93 | 87 |
| Graph nodes | 175 | 224 |
| Graph edges | 201 | 255 |
| Business flows | 17 | 15 |
| Static execution flows | 8 | 8 |
| Resources | 24 | 37 |
| LLM method summaries | 93/93 | 87/87 |
| Quality score | 100/100 | 100/100 |

The generated PetClinic docs resolve Spring MVC routes, JPA entities,
repository interfaces, table resources, controller flows, domain-object calls,
and synthetic Spring Data operations such as `OwnerRepository#save`.

The generated Book Social Network docs validate a deeper Spring service-layer
shape: controllers, services, repositories, DTO mappers, security, exception
handling, file upload, feedback, borrow, return, and return-approval flows.

## Current Scope

- Scan local repositories.
- Parse TypeScript and JavaScript with the TypeScript compiler AST through a parser adapter.
- Parse Java with a lightweight static parser adapter that extracts classes, methods, annotations, calls, resources, common Spring entrypoint hints, repository operations, and basic receiver type inference.
- Validate parser behavior with fixture-based TypeScript, Java Spring, and document-only tests.
- Load minimal non-sensitive project config from `see-code.config.json`.
- Extract `MethodUnit` and `ClassUnit` records.
- Build a basic relation graph.
- Optionally enrich method summaries through LangChain chat model adapters.
- Generate project-level architecture, entrypoint, resource, business-flow, and execution-flow documents from aggregated MethodUnit semantics.
- Generate human-facing engineering docs.
- Generate a quality report that checks LLM coverage, architecture abstraction, business-flow coverage, template residue, and document size balance.
- Generate `.see-code/result.json` with schema version, stats, files, modules, classes, methods, graph, semantic overview, and quality summary.
- Generate `.see-code/result-diff.json` and `docs/deep-dive/CHANGE_SUMMARY.md` by comparing the new analysis with the previous result.
- Publish JSON schema contracts under `schema/` for machine-readable outputs.

## Multi-language Direction

The core pipeline is language-neutral after parsing. Parser adapters convert source files into `ModuleUnit`, `ClassUnit`, and `MethodUnit` records. The current adapters support TypeScript, JavaScript, and Java; deeper Java parsing can replace the lightweight adapter as long as it emits the same units.

Java support:

- Parse Java source through the current lightweight adapter, with tree-sitter or another Java AST adapter planned for higher fidelity.
- Extract classes, methods, annotations, signatures, method bodies, and source locations.
- Populate language-neutral MethodUnit metadata: parameters, return type, modifiers, visibility, annotations, framework hints, and entrypoint hints.
- Add framework metadata for Spring MVC, scheduled jobs, repositories, Kafka listeners, and resource access.
- Feed the same MethodUnit semantic analyzer, relation graph builder, and docs generator.

## Roadmap

- Add chained Java expression and generic collection element inference.
- Expand synthetic Spring Data operation modeling for paginated, sorted, and batch operations.
- Add first-class mapper/component documentation without treating DTO mappers as repositories.
- Separate HTTP route counts from other entrypoint types in generated narratives.
- Add tree-sitter adapters for higher-fidelity Java and broader language support.
- Add LangGraph orchestration once the deterministic parser and graph contracts are stable.
