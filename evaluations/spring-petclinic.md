# Spring PetClinic Evaluation

## Scope

This evaluation uses Spring PetClinic as an ignored external project under
`eval-projects/spring-petclinic`. The external repository is intentionally not
tracked by git.

Run command:

```bash
pnpm analyze -- eval-projects/spring-petclinic --no-llm
```

Local evaluation config:

```json
{
  "scan": {
    "exclude": [".git/**", "target/**", "build/**", ".mvn/**", "src/test/**"],
    "maxFileBytes": 1048576
  },
  "llm": {
    "provider": "none",
    "cache": true
  }
}
```

## Result Snapshot

| Metric | Value |
| --- | --- |
| Scanned files | 33 |
| Source files | 30 |
| Classes | 25 |
| Method units | 83 |
| Graph nodes | 141 |
| Graph edges | 116 |
| Business flows | 18 |
| Static execution flows | 0 |
| Resources | 0 |
| Quality score | 84/100 |
| LLM method summaries | 0/83 |
| Architecture areas | Configuration, Documentation, model, owner, petclinic, Project Files, system, vet |

The run generated the full document set, `.see-code/result.json`, and
`.see-code/result-diff.json` inside the ignored evaluation project.

## What Worked

- Project configuration worked as intended: build output, tests, Maven wrapper
  files, and analysis output stayed out of the scan.
- Java parsing covered the main Spring application shape: 25 classes and 83
  method units were extracted from 30 Java source files.
- Spring MVC route extraction was useful. The analyzer produced 18
  framework-aware business flows, including owner, pet, visit, system, and vet
  routes.
- Java package-aware grouping now separates the application into `model`,
  `owner`, `petclinic`, `system`, and `vet` areas instead of one coarse `main`
  source-set group.
- No-LLM fallback narratives are localized for generated operating-model and
  business-flow text.
- Repository cleanliness held: external project files remain ignored, and the
  generated evaluation output is not tracked.
- Structured outputs stayed available for downstream checks even without LLM
  summaries.

## Quality Notes

The 84/100 quality score is reasonable for a no-LLM run. The failing method
summary coverage check is expected because all 83 method summaries used the
heuristic fallback. Business flow coverage passed because framework entrypoint
detection does not require an LLM.

The generated documents are already useful for route inventory and module
inspection. The no-LLM narrative quality is still lower than the self-analysis
run because method summaries use heuristic text, but fixed fallback templates no
longer leave English operating-model or business-flow fragments in generated
docs.

## Gaps Found

- Static execution flows are empty because Java call resolution currently does
  not connect enough unqualified, field-based, or repository calls back to
  internal methods.
- A route false positive appeared for `VisitController#id` as `ALL /`. The
  parser likely misread annotation-adjacent comment or parameter text while
  handling the visit controller's model-loading helper.
- Some method signatures around `VisitController` are noisy, which indicates
  the Java method boundary parser still needs stricter annotation/comment
  handling.
- Persistence and resource modeling is still shallow. Repository interfaces and
  JPA entities are detected as hints, but they are not yet represented as
  first-class data/resource nodes.

## Recommended Next Work

1. Tighten Java annotation and method-boundary parsing, using the
   `VisitController` false positive as a regression fixture.
2. Improve Java call resolution for same-class calls, field-injected
   collaborators, repository interfaces, and simple service/controller helper
   methods.
3. Promote repository interfaces and persistence entities into explicit
   resource nodes so `DATA_AND_RESOURCES.md` is more valuable for Java projects.
4. Run one DeepSeek-backed evaluation on Spring PetClinic after parser fixes to
   compare no-LLM structure quality against LLM narrative quality.
