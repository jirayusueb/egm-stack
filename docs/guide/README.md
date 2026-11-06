# The EGM Stack guide

Thirteen chapters. Read them in order the first time. After that, each chapter
stands alone.

The habit the guide teaches is simple. Say what you want and how you will know
it is done. Let the router pick the workflow. Read the reports. Resolve the
trade-offs yourself.

## Chapters

| Chapter | What you learn |
| --- | --- |
| [01-install.md](01-install.md) | Install the stack, set models, and verify the first command |
| [02-first-design.md](02-first-design.md) | Take one idea from brainstorm to reviewed draft |
| [03-review-and-resolve.md](03-review-and-resolve.md) | Read the review engine, the loop, and the resolve step |
| [04-deliver.md](04-deliver.md) | Choose a delivery playbook and prove the change |
| [05-principles.md](05-principles.md) | Steer an agent by naming a principle |
| [06-harnesses.md](06-harnesses.md) | Map every action to Claude Code, Codex, Cursor, OpenCode, or Agent Teams |
| [07-authoring.md](07-authoring.md) | Write or change a skill without breaking the contract |
| [08-ste100.md](08-ste100.md) | Use controlled language for procedures and safety text |
| [09-statechart.md](09-statechart.md) | Install the prerequisites and read a statechart |
| [10-ddd.md](10-ddd.md) | Model a domain and review it |
| [11-subagents.md](11-subagents.md) | Delegate with a brief and run a durable team |
| [12-ask.md](12-ask.md) | Ask where you are and what to run next |
| [13-update.md](13-update.md) | Move an installed stack to a newer release |

## The one thing to remember

Give the agent a goal and a way to check it, in your own words.

```text
/egm-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.
```

You do not need to name a playbook. A checkable outcome is enough signal. The
router matches a workflow, opens a todo list, and routes to the other skills as
the steps fire.

## How the pieces fit

| Layer | What it is | Where to read |
| --- | --- | --- |
| Router | `egm-mode` picks the workflow and owns the todo list | Chapter 02 |
| Design loop | brainstorm, draft, review, resolve | Chapters 02 and 03 |
| Delivery | playbooks that ship an approved design | Chapter 04 |
| Knowledge | principles, rule packs, writing standards | Chapter 05 |
| Utility | ask, delegate, drift, setup | Chapters 11 and 12 |

## When you are stuck

Type `/egm-ask` with your question. It reads the artifacts and the stage table
and answers in at most twenty lines. It is read-only and advisory. It never
acts on a pending gate.

The [README](../../README.md) has the pitch and the install routes. The
[documentation index](../index.md) routes every other question.
