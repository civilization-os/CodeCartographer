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
| Method units | 93 |
| Graph nodes | 175 |
| Graph edges | 201 |
| Business flows | 17 |
| Static execution flows | 8 |
| Resources | 24 |
| Quality score | 89/100 |
| LLM method summaries | 0/93 |
| Architecture areas | Configuration, Documentation, model, owner, petclinic, Project Files, system, vet |

The run generated the full document set, `.see-code/result.json`, and
`.see-code/result-diff.json` inside the ignored evaluation project.

## DeepSeek Snapshot

| Metric | Value |
| --- | --- |
| Quality score | 100/100 |
| LLM method summaries | 93/93 |
| Business flows | 17 |
| Static execution flows | 8 |
| Resources | 24 |
| Largest document | 55268 characters |

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

The module document now keeps human-facing details focused on high-signal
methods and points readers to `.see-code/result.json` for the complete method
inventory. This reduced the largest PetClinic document while preserving the full
structured output.

## What Worked

- Project configuration worked as intended: build output, tests, Maven wrapper
  files, and analysis output stayed out of the scan.
- Java parsing covered the main Spring application shape: 25 classes and 93
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
- Java interface and repository method declarations are now parsed as method
  units, so repository targets such as `OwnerRepository#findById`,
  `PetTypeRepository#findPetTypes`, and `VetRepository#findAll` appear in module
  docs and call graphs.
- Repository interfaces, JPA entities, mapped superclasses, and table names now
  appear as first-class database resources. `DATA_AND_RESOURCES.md` lists 24
  resources, including `ENTITY:Owner`, `REPOSITORY:OwnerRepository`, and
  `TABLE:owners`.
- Repository call intent is inferred at method level for common read and write
  operations, and field receiver types are used to bind calls back to repository
  interfaces. Business flows now surface examples such as
  `DB_READ:OwnerRepository.findById`, `DB_READ:VetRepository.findAll`, and
  `DB_WRITE:OwnerRepository.save`.
- Java method bodies now infer receiver types from method parameters, explicit
  local variables, basic `var` initializers, and same-class method return types.
  PetClinic graph edges increased to 192 because domain object calls such as
  `Owner.addPet`, `Pet.getBirthDate`, `Pet.setType`, and `Visit.getDate` now
  resolve to internal method nodes.
- Spring Data inherited or derived repository operations are now modeled as
  synthetic method units when a typed repository call has no explicit source
  declaration. PetClinic now includes `OwnerRepository#save`, and write flows
  from owner, pet, and visit controllers connect to that repository method as
  well as to `DB_WRITE:OwnerRepository.save`.
- No-LLM fallback narratives are localized and target-project aware for
  generated purpose, operating-model, and business-flow text.
- Repository cleanliness held: external project files remain ignored, and the
  generated evaluation output is not tracked.
- Structured outputs stayed available for downstream checks even without LLM
  summaries.
- `MODULES.md` now avoids expanding empty modules and limits per-module method
  tables to high-signal entries, keeping the human document easier to scan.

## Quality Notes

The 89/100 quality score is reasonable for a no-LLM run. The failing method
summary coverage check is expected because all 93 method summaries used the
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

- Java call resolution now handles fields, parameters, explicit locals, and
  basic `var` return-type inference, but it still does not perform full chained
  expression, generic collection element, or inherited-method type inference.
- Repository intent is still name-based and conservative; synthetic Spring Data
  methods are generated from observed repository calls rather than a full
  framework type hierarchy.

## Recommended Next Work

1. Add chained expression and generic collection element inference so calls like
   `owner.getPets().add(...)` and stream/map pipelines can resolve more deeply.
2. Expand synthetic repository operation modeling for paginated, sorted, and
   batch methods such as `findAll(Pageable)`, `saveAll`, and `deleteAll`.
3. Add a second real-world Java project with service-layer code to validate
   repository binding and collaborator call resolution beyond PetClinic.
