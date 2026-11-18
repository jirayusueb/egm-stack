# Memory protocol

Three local artifacts carry state across sessions and compactions. None of
them leave the project. None of them auto-edits a skill.

| Artifact | Written by | Read by | Carries |
| --- | --- | --- | --- |
| `.egm/memory/log.md` | `egm-mode`, one line per finished task | every fresh context, first ten lines | Date, playbook, outcome, settled decision ids |
| `.egm/memory/learnings.md` | `reflect` and the correction offer | `reflect`, at the start of a run | Open learnings waiting to become skill edits, or closed with a reason |
| `.egm/<slug>/checkpoint.md` | `egm-mode`, one line per completed step | compaction and resume recovery | Playbook, step, todo state, open gates, next command |

## The flow

A task finishes and the log gains a line. The user corrects the run twice or
more and the router offers reflect once. Reflect drains the learnings ledger,
proposes skill edits, and waits at the approval gates. The next session, days
later, starts by reading the log and inherits the history without the
transcript.

## Boundaries

Everything is an offer, never a silent write to a skill. The ledger is a
queue, not a changelog: a line leaves it by becoming an approved edit or a
closed reason. Artifacts stay in `.egm/`, which is gitignored by default.
