---
name: rules
description: "Load one condensed book rule pack with /rules and apply its decision rules, trigger rules, and checklist as constraints for the current task. Use for design, boundaries, code review, data, DDD, refactoring, release, legacy, and prototyping work when a decision needs the book rules behind it."
license: Apache-2.0
---

# Rules

Load one condensed book pack. Apply it as constraints for the current task. The packs are decision rules distilled from well-known engineering books. They are an aid, not the book.

## Mapping

Pick one pack. The mapping names the candidates for each task type.

- design -> a-philosophy-of-software-design
- boundaries -> clean-architecture, patterns-of-enterprise-application-architecture
- code review -> clean-code, code-complete
- data -> designing-data-intensive-applications
- DDD -> domain-driven-design, domain-driven-design-distilled, implementing-domain-driven-design
- refactoring -> refactoring, refactoring-guru
- release -> release-it
- legacy -> working-effectively-with-legacy-code
- prototyping -> the-pragmatic-programmer

## Select exactly one pack

Pick the one pack that matches the decision in front of you. A playbook may name up to three packs. Choose the pack that owns that decision. When a second pack is truly needed, finish the first task and start a new load.

## Project packs

A project may add its own packs at `docs/rules/<name>.md`, same shape as the
vendored ones: decision rules, trigger rules, final checklist. Load a project
pack exactly like a vendored one. A project pack wins when its name collides
with a vendored pack.

## Load only that file

Read the selected file in `references/`. Do not load the directory. Do not carry rules from an earlier pack into this task. The pack index is `references/index.md`, and the build generates it.

## Apply the rules

- A decision rule is a constraint. It narrows the options. It does not replace evidence.
- A trigger rule is a check. When a trigger fires, apply the matching rule.
- Run the final checklist before you finish and before you report.
- A rule never overrides the repo instructions, the user's instruction, or a test result.

## Cite the rule

When a rule changes a decision, cite the pack and the rule. Example, "rules refactoring, rule keep behavior fixed". No silent rules. The reader must be able to find the rule that moved the decision.

## Stop at the pack boundary

- Use only the rules in the loaded pack. Do not add rules from memory or from another book.
- Do not invent a rule, a threshold, or a checklist item.
- When the pack has no rule for the case, say so and use judgment.
- Do not summarize the book or claim the author said more than the pack says.

## Report

At the end, report the pack applied and the packs skipped. Name the rules that changed a decision. Name the checklist items that failed, if any.

## Vendored packs

The fourteen packs are vendored from `ciembor/agent-rules-books` under the MIT License. Each file carries its own source, commit, and license header. Copyright Maciej Ciemborowicz. The text is condensed, so verify against the book.
