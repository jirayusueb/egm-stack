# 10 DDD

`ddd` models a domain before code locks in a shape. It reads three rule packs on
demand and ships three playbooks and one review profile.

## When to use it

- The work has real domain language, and the code drifts from it.
- One term means two things in two places.
- A transaction spans several aggregates.
- A legacy model needs to move to a current one without a rewrite.

For a small change, skip it. A domain model that earns nothing is a tax.

## Start

```text
/egm-mode model the payments domain with ddd
```

The run writes `domain_model.md` under the run directory. The model names five
things.

1. Terms, with one definition each.
2. Aggregates and their invariants.
3. Commands and events.
4. Boundaries and the context map.
5. The rules that must never be violated.

The shared document standard lives in
`resources/document_standards/domain-model-standard.md`. The draft follows it,
so models from different runs read the same way.

## Playbooks

| Playbook | Use it when |
| --- | --- |
| `ddd-model` | Model a domain or a subdomain from scratch |
| `ddd-review` | Check a model, its boundaries, and its language |
| `ddd-modernize` | Move a legacy model to a current one, slice by slice |

The review profile is `ddd`. It runs inside the normal review engine, so the
stage order and the fresh-context rules are unchanged.

## Review a model

```text
/egm-mode review the payments domain model with ddd
```

The `ddd` profile writes `ddd_review.md`. Findings cover language, aggregate
boundaries, invariant placement, and context mapping. Each finding names the
model location and the rule it breaks.

A model finding is a design finding. Resolve it by changing the model, not by
adding a guard in code.

## Modernize

```text
/egm-mode modernize the legacy billing model slice by slice
```

`ddd-modernize` moves one slice at a time. Each slice ends in a check. The
order is language first, then boundaries, then behavior. It never does a
big-bang rewrite.

## Rules it reads

The skill loads one pack per task.

- `domain-driven-design` for the strategic view.
- `domain-driven-design-distilled` for the compact patterns.
- `implementing-domain-driven-design` for the applied rules.

A pack is condensed. It carries its source, its commit, and its license. Verify
against the book when a call matters.

## Next

[11-subagents.md](11-subagents.md) covers delegation.
