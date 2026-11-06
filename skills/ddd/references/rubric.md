# DDD model rubric

Score a domain model with twelve checks. Six are strategic. Six are tactical. Give each check one verdict, pass or fail. A pass needs evidence in the model artifact or in code. Intent does not pass a check.

Write each fail as one line. Name the check id, the evidence, and the smallest fix. Report the passed count out of twelve.

## Strategic checks

| Id | Check | Question | Fail signal |
| --- | --- | --- | --- |
| S1 | Capability | Is the business capability named in one sentence, in the operator's words? | The artifact names a component, a feature, or a technology |
| S2 | Subdomain | Is each subdomain classified as Core, Supporting, or Generic, with the reason? | Everything is Core, or the class changes no effort |
| S3 | Bounded context | Does each model have one explicit context with owned and unowned scope? | One model spans contexts, or ownership is unstated |
| S4 | Language | Does one context use one term per concept, with translations listed? | Synonyms, or one word carries two meanings |
| S5 | Event storm | Are commands, events, policies, and hotspots listed for the main flow? | The flow is a feature list, or hotspots are absent |
| S6 | Context map | Does each context pair name a relationship and a translation duty? | Integrations have no named relationship or no anticorruption layer where a foreign model leaks |

## Tactical checks

| Id | Check | Question | Fail signal |
| --- | --- | --- | --- |
| T1 | Entities | Does each entity have explicit identity and named state transitions? | Public setters, or identity is only a storage key |
| T2 | Value objects | Are domain concepts immutable and self-validating? | Primitive strings, booleans, or flags carry domain meaning |
| T3 | Aggregates | Does each aggregate state its invariants and keep one root? | The boundary follows tables or screens, or two roots share a transaction |
| T4 | Domain events | Are events past-tense business facts? | Event names mirror setters or carry whole object graphs |
| T5 | Repositories | Does each repository return aggregates or roots only? | Queries leak rows, builders, or lazy graphs |
| T6 | Services | Do domain services stay stateless and application services stay thin? | The application service holds the rules, or the domain service runs a transaction |

## Severity and handoff

A failed strategic check is a Blocker. A failed tactical check is a Major. A failed tactical check that breaks a stated invariant is a Blocker.

Rescore after a fix. Do not average the score. Report the count, the Blockers, and the next playbook.
