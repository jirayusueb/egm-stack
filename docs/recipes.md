# Recipes

Copy a prompt, paste it, change the nouns. Each recipe names the playbook the
router should pick, so you can check the routing while you learn.

## Start work

Add a feature with real design decisions.

```text
/egm-mode add webhook delivery to orders; design it first, then implement and verify
```

Add a small change. One file, no API shift.

```text
/egm-mode fix the off-by-one in the date validator; one file, no API change
```

Fix a bug with evidence.

```text
/egm-mode the export duplicates rows when a retry lands mid-run; repro first, then fix and verify
```

Understand before changing.

```text
/egm-mode how does the billing retry path work, and where does the idempotency key live
```

## Review

Review a design before implementing.

```text
/egm-review docs/designs/checkout.md
```

Quick review of a short document.

```text
/egm-review README.md
```

Review a domain model.

```text
/egm-review docs/designs/billing-model.md
```

Resolve one finding only.

```text
/egm-resolve design-1-2
```

## Navigate

Where am I, what next.

```text
/egm-ask where am I
```

What changed since I left.

```text
/egm-ask what changed since I left
```

Were my reviewers useful.

```text
/egm-ask how useful were the reviewers
```

## Draft with nothing

No brief yet. The interview asks four questions.

```text
/egm-draft
```

## Delegate

Audit something in parallel.

```text
/egm-mode audit every package against its test command; one worker per package, one report
```

Compare designs.

```text
/egm-mode try two designs for the cache layer and keep the best parts of each
```

## Control cost and length

One-screen replies for the session.

```text
brief: review the auth module for missing checks
```

Cheapest review preset for a short doc, stated up front.

```text
/egm-review README.md with the quick preset
```
