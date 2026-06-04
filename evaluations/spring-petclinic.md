# Spring PetClinic Evaluation

## Scope

This evaluation uses Spring PetClinic as an ignored external project under
`eval-projects/spring-petclinic`. The external repository is intentionally not
tracked by git.

Run command:

```bash
pnpm analyze -- eval-projects/spring-petclinic --no-llm
```

DeepSeek-backed run:

```bash
pnpm analyze -- eval-projects/spring-petclinic --provider deepseek --model deepseek-chat
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
| Graph nodes | 168 |
| Graph edges | 161 |
| Business flows | 17 |
| Static execution flows | 8 |
| Resources | 23 |
| Quality score | 89/100 |
| LLM method summaries | 0/87 |
| Architecture areas | Configuration, Documentation, model, owner, petclinic, Project Files, system, vet |

The run generated the full document set, `.see-code/result.json`, and
`.see-code/result-diff.json` inside the ignored evaluation project.

## DeepSeek Snapshot

| Metric | Value |
| --- | --- |
| Quality score | 100/100 |
| LLM method summaries | 87/87 |
| Business flows | 17 |
| Static execution flows | 8 |
| Resources | 23 |
| Largest document | 56757 characters |

The LLM-backed run produced project-level narrative that correctly describes
PetClinic as a Spring Boot pet clinic management application with owner, pet,
visit, and vet workflows backed by JPA persistence. Method summaries are much
more useful than the heuristic fallback, especially for controller validation,
redirect, and persistence behavior.

One issue surfaced during the LLM run: generated narrative flow names are not
guaranteed to align one-to-one with framework route names. The docs renderer now
uses LLM business-flow narrative only on exact flow-name matches; otherwise it
falls back to deterministic route-local text. This prevents a narrative for one
route from appearing under another route.

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
  appear as first-class database resources. `DATA_AND_RESOURCES.md` lists 23
  resources, including `ENTITY:Owner`, `REPOSITORY:OwnerRepository`, and
  `TABLE:owners`.
- Repository call intent is inferred at method level for common read and write
  operations. Business flows now surface examples such as
  `DB_READ:owners.findById`, `DB_READ:vetRepository.findAll`, and
  `DB_WRITE:owners.save`.
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

The LLM-backed run raises the quality score to 100/100 because all method
summaries are LLM-generated and the project narrative is domain-specific.

## Gaps Found

- Java call resolution still does not perform full type inference, so arbitrary
  field-injected collaborators and repository interface methods remain shallow.
- Repository intent is name-based and conservative; it does not yet bind calls
  back to the exact repository interface or entity type.

## Recommended Next Work

1. Improve Java call resolution for same-class calls, field-injected
   collaborators, repository interfaces, and simple service/controller helper
   methods.
2. Bind repository call resources back to repository interfaces and entity/table
   resources where the injected field type can be inferred.
3. Run one DeepSeek-backed evaluation on Spring PetClinic after parser fixes to
   compare no-LLM structure quality against LLM narrative quality.
