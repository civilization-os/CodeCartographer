# Book Social Network Evaluation

## Scope

This evaluation uses the backend of
`https://github.com/ali-bouali/book-social-network` as an ignored external
project under `eval-projects/book-social-network/book-network`. The external
repository is intentionally not tracked by git.

Run command:

```bash
pnpm analyze -- eval-projects/book-social-network/book-network --no-llm
```

DeepSeek-backed run:

```bash
pnpm analyze -- eval-projects/book-social-network/book-network --provider deepseek --model deepseek-chat
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
| Scanned files | 51 |
| Source files | 49 |
| Classes | 49 |
| Method units | 87 |
| Graph nodes | 224 |
| Graph edges | 255 |
| Business flows | 15 |
| Static execution flows | 8 |
| Resources | 37 |
| Quality score | 96/100 |
| LLM method summaries | 0/87 |
| Architecture areas | auth, book, common, config, Configuration, Documentation, email, exception, feedback, file, handler, history, role, security, user |

The no-LLM run generated the full document set, including `docs/README.md`,
`.see-code/result.json`, and `.see-code/result-diff.json` inside the ignored
evaluation project.

## DeepSeek Snapshot

| Metric | Value |
| --- | --- |
| Quality score | 100/100 |
| LLM method summaries | 87/87 |
| Business flows | 15 |
| Static execution flows | 8 |
| Resources | 37 |
| Largest document | 84062 characters |

The LLM-backed run correctly describes the project as a Spring Boot book
borrowing system with JWT authentication, book management, borrow/return
approval, feedback scoring, and cover upload flows. Business-flow steps become
substantially more readable than the heuristic fallback while preserving the
same controller-service-repository path structure.

## What Worked

- The project is a better second benchmark than PetClinic because it includes
  REST controllers, services, repositories, DTO mappers, security configuration,
  exception handling, file storage, feedback, and transaction-history flows.
- Spring MVC route extraction produced 15 framework-aware business flows,
  including book creation, listing, borrowing, return request, return approval,
  cover upload, feedback creation, and feedback listing.
- Service-layer call resolution connected controller methods to service methods
  and then to repository operations. The borrow flow expands from
  `BookController#borrowBook` to `BookService#borrowBook`,
  `BookRepository#findById`, `BookTransactionHistoryRepository#isAlreadyBorrowed`,
  `BookTransactionHistoryRepository#isAlreadyBorrowedByUser`, and
  `BookTransactionHistoryRepository#save`.
- Repository resources now exclude ordinary DTO mapper services. The initial
  run incorrectly reported `REPOSITORY:BookMapper` and
  `REPOSITORY:FeedbackMapper`; the parser now requires repository annotation,
  repository/DAO naming, or Spring Data inheritance before adding
  `REPOSITORY:*`.
- Spring Data inherited operations are still modeled as synthetic methods, so
  flows include `BookRepository#save`, `BookRepository#findById`, and
  `BookTransactionHistoryRepository#save` even when those methods are inherited
  from framework interfaces.
- SQL resources from `@Query` methods are surfaced in business flows and
  `DATA_AND_RESOURCES.md`, making custom repository queries visible to readers.
- The generated `docs/README.md` gives a good first page for the project: it
  shows 51 scanned files, 49 classes, 87 method units, 15 business flows, 37
  resources, and links to the rest of the documentation set.

## Quality Notes

The no-LLM run scores 96/100. Method summary coverage is a warning because LLM
analysis is intentionally disabled and all 87 method summaries use heuristic
fallback text. Structural quality remains strong: business flow coverage,
static execution flow coverage, required docs, placeholder residue, English
template residue, and document size balance all pass.

The DeepSeek-backed run scores 100/100 because all 87 method units receive LLM
summaries and the project narrative becomes domain-specific.

## Gaps Found

- Route counting in the deterministic narrative says 14 HTTP entries while the
  business-flow list contains 15 flows because the Java `main` method is
  included as a non-HTTP business flow. The wording should separate HTTP route
  count from other entrypoints more explicitly.
- SQL resources extracted from long `@Query` strings are truncated in resource
  names, which keeps documents compact but loses part of the query predicate.
- Mapper classes are no longer misclassified as repositories, but there is not
  yet a first-class mapper/resource category for DTO mapping components.
- Java call resolution still does not fully model chained collection and stream
  pipelines, so deeper DTO mapping and feedback-rating paths remain partial.

## Recommended Next Work

1. Split narrative counts into HTTP routes and other entrypoint types so
   project overviews do not blur Java `main` with REST endpoints.
2. Add a mapper/component category that can describe DTO mapping without
   treating mapper services as database repositories.
3. Preserve longer SQL query resources in structured JSON while using shorter
   display labels in Markdown documents.
4. Continue Java call-resolution work for chained expressions, collection
   element types, and stream/map pipelines.
