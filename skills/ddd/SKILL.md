---
name: ddd
description: Coach strategic and tactical domain-driven design for a model, a spec, or a legacy system. Use for /ddd, or when subdomains, bounded contexts, ubiquitous language, aggregates, or domain events decide the design.
license: Apache-2.0
---

# Domain-driven design

Use this skill to shape a domain model before a spec, a review, or a migration commits to one. It runs a strategic pass, then a tactical pass. The passes name the decisions. The book packs hold the rules.

## When to use

- A capability spans teams, systems, or vocabularies that disagree.
- Business rules, lifecycles, or invariants are the hard part of the change.
- One word means different things in two places.
- A legacy system needs a seam before a rewrite.
- A reviewer must judge whether a model is deep or a table wrapper.

## When not to use

- A simple CRUD screen with no invariant beyond validation.
- A technical change with no business language, such as a build fix.
- A prototype where the model is being discovered by throwing it away.
- A team with no access to a domain expert. Record that gap before modeling.

## Read the packs, do not repeat them

The `rules` skill owns the fourteen book packs. This skill states the pass and the decision. It does not restate the packs.

| Pack | Read it for | Path |
| --- | --- | --- |
| Domain-Driven Design | Strategic design, context mapping, distillation, deep models | `../rules/references/domain-driven-design.md` |
| Domain-Driven Design Distilled | Smallest effective practice, subdomain classes, aggregates, events | `../rules/references/domain-driven-design-distilled.md` |
| Implementing Domain-Driven Design | Aggregates in code, domain events, application services, integration | `../rules/references/implementing-domain-driven-design.md` |
| Rubric | Scoring the model | `references/rubric.md` |

Load one pack per pass. Read the strategic pack before the strategic pass and the implementing pack before the tactical pass. Read both when the model is contested. Do not quote a pack at length. Cite the pack name in each finding.

## Strategic pass

Do these in order. Each answer goes into the model artifact.

1. Name the business capability in one sentence, in the words of the people who do the work.
2. Classify the subdomain. Core earns the best model and the best people. Supporting earns a simple model. Generic buys or borrows.
3. Draw one bounded context for each model. State what it owns and what it does not own.
4. Fix the ubiquitous language for that context. One concept, one term. One term, one meaning. List the words other contexts use differently.
5. Event storm the main flow. List commands, domain events, policies, and hotspots. A hotspot is a question for a domain expert, not a design decision.
6. Map each context pair. Name the relationship and the translation duty. Name the anticorruption layer where a foreign model would leak.
7. Record the result in `.egm/<slug>/domain_model.md`. Keep the decisions and their evidence.

## Tactical pass

Read the implementing pack first. Use a tactical pattern only when it protects a rule.

| Pattern | Use it when | It must hold |
| --- | --- | --- |
| Entity | Identity and lifecycle matter | Identity is explicit and state changes go through named operations |
| Value object | A primitive hides meaning | The value is immutable and validates itself |
| Aggregate | A set of objects must stay consistent | One root, a small boundary, invariants enforced inside, other roots referenced by identity |
| Domain event | Another part must know a fact happened | Past tense, one business fact, no field-change noise |
| Repository | The model must not see storage | Returns aggregates or roots, never rows or query builders |
| Domain service | An operation fits no entity | Stateless, speaks the language, has no transaction of its own |
| Application service | A use case spans load, act, save, publish | Coordinates, never holds the rules |

Then list every invariant and the operation that can break it. If an invariant needs two aggregates in one transaction, split the model or accept eventual consistency in writing.

## Score

Read `references/rubric.md`. Score all twelve checks as pass or fail. A pass needs evidence in the artifact or in code, not intent. Report the passed count out of twelve.

A failed strategic check is a Blocker. A failed tactical check is a Major, unless it breaks a stated invariant, then it is a Blocker. Fix a Blocker before handoff. Do not average the score in a way that hides a Blocker.

This rubric is the coaching check. A formal review uses the `ddd` profile and the domain-model standard in `resources/document_standards/`.

## Handoff

- New feature or greenfield model. Read `../egm-mode/playbooks/ddd-model.md`. It names the subdomain, contexts, glossary, aggregates, and model tests, and calls this skill for the tactical choice.
- Model or spec review. Read `../egm-mode/playbooks/ddd-review.md`. It audits contexts, aggregates, and translation, then scores with `egm-review` profile `ddd`.
- Existing system with a tangled model. Read `../egm-mode/playbooks/ddd-modernize.md`. It adds the legacy code pack and the implementing pack.
- Do not run a review loop here. The playbooks own the pipeline and its gates.

## Anti-patterns

- Anemic model. Tables and setters carry data, procedures carry rules.
- Ubiquitous language in a glossary only. Code and tests use other words.
- One shared model for every context. Terms collide and translation never happens.
- Aggregate per table. The boundary follows storage, not invariants.
- Aggregate per screen. The user interface decides consistency.
- Repository as a query surface. Callers reach around the invariants.
- Domain events as a change log. Consumers cannot tell what business fact happened.
- Framework types in the domain. Persistence or transport shapes the model.
- Ceremony on simple CRUD. Patterns without a rule to protect.
- Event storming as the deliverable. The map is an input, not the model.

## Reply

Reply in at most twenty lines. State the context and the capability. Give the score out of twelve and every Blocker. Name the next playbook. Point to the artifacts under `.egm/<slug>/`.
