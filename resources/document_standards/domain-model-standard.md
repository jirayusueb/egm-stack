# Domain Model Standard

A domain model passes when a domain expert and an engineer can read the same terms, the boundaries are explicit, and the code enforces the rules the business cannot break.

## Strategic scorecard

- **Subdomain classification.** Name each subdomain and classify it as core, supporting, or generic. Core receives the most design effort. Generic uses a bought or standard solution.
- **Bounded context.** Name each bounded context and state where one model ends and another begins. One term must not carry two meanings inside one context.
- **Ubiquitous language.** List the terms the code and the domain experts share. Each term has one meaning and appears in code, tests, and documents.
- **Context relationships.** State the relationship between contexts. Name the upstream and downstream side. Name the translation layer where the models meet.

## Tactical checklist

- **Aggregate size and root protection.** Keep aggregates small. External references point at the aggregate root only. Invariants live inside one aggregate.
- **Identity references.** Reference another aggregate by identity, not by an object graph.
- **Value objects.** Model an immutable concept with no identity as a value. Validate it on creation.
- **Domain events.** Name the facts other parts must react to. Publish each one after the state change it records.
- **Repositories as aggregate access.** Use one repository per aggregate root. Do not leak query objects or database details through it.
- **Application services as coordinators.** Application services orchestrate use cases. They hold no domain rules.
- **No infrastructure leakage.** The domain model imports no framework, transport, or storage. Adapters implement ports defined by the domain.

## Acceptance notes

- A term with two meanings in one context fails the strategic scorecard.
- An aggregate that loads another aggregate by object reference fails the tactical checklist.
- A domain rule in a controller, handler, or repository fails the application service rule.
- A model that imports an ORM type fails the leakage rule.
