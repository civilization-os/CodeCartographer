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
| Method units | 87 |
| Graph nodes | 163 |
| Graph edges | 146 |
| Business flows | 17 |
| Static execution flows | 8 |
| Resources | 18 |
| Quality score | 89/100 |
| LLM method summaries | 0/87 |
| Architecture areas | Configuration, Documentation, model, owner, petclinic, Project Files, system, vet |

The run generated the full document set, `.see-code/result.json`, and
`.see-code/result-diff.json` inside the ignored evaluation project.

## What Worked

- Project configuration worked as intended: build output, tests, Maven wrapper
  files, and analysis output stayed out of the scan.
- Java parsing covered the main Spring application shape: 25 classes and 87
  method units were extracted from 30 Java source files.
- Spring MVC route extraction was useful. The analyzer produced 17
  framework-aware business flows, including owner, pet, visit, system, and vet
  routes.
- Java package-aware grouping now separates the application into `model`,
  `owner`, `petclinic`, `system`, and `vet` areas instead of one coarse `main`
  source-set group.
- Javadoc and comment text no longer pollute Java method signatures or route
  annotations. The previous `VisitController#id` / `ALL /` false positive is
  gone, and visit creation routes now point to `initNewVisitForm` and
  `processNewVisitForm`.
- Java class methods now participate in static execution flow detection. The
  run produced 8 static execution flows, including owner, pet, visit, cache, and
  controller helper paths.
- Repository interfaces, JPA entities, mapped superclasses, and table names now
  appear as first-class database resources. `DATA_AND_RESOURCES.md` lists 18
  resources, including `ENTITY:Owner`, `REPOSITORY:OwnerRepository`, and
  `TABLE:owners`.
- No-LLM fallback narratives are localized for generated operating-model and
  business-flow text.
- Repository cleanliness held: external project files remain ignored, and the
  generated evaluation output is not tracked.
- Structured outputs stayed available for downstream checks even without LLM
  summaries.

## Quality Notes

The 89/100 quality score is reasonable for a no-LLM run. The failing method
summary coverage check is expected because all 87 method summaries used the
heuristic fallback. Business flow coverage passed because framework entrypoint
detection does not require an LLM. Static execution flow coverage now passes
because class methods with internal call edges are eligible as flow candidates.

The generated documents are already useful for route inventory and module
inspection. The no-LLM narrative quality is still lower than the self-analysis
run because method summaries use heuristic text, but fixed fallback templates no
longer leave English operating-model or business-flow fragments in generated
docs.

## Gaps Found

- Java call resolution still does not perform full type inference, so
  field-injected collaborators and repository interface methods remain shallow.
- Resource usage is still class-level for Java persistence structures; method
  level read/write intent for repository calls is not inferred yet.

## Recommended Next Work

1. Improve Java call resolution for same-class calls, field-injected
   collaborators, repository interfaces, and simple service/controller helper
   methods.
2. Add method-level read/write intent for repository calls so resource usage can
   distinguish query, save, update, and delete paths.
3. Run one DeepSeek-backed evaluation on Spring PetClinic after parser fixes to
   compare no-LLM structure quality against LLM narrative quality.
