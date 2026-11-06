# Brief template

Build every subagent brief from this template. Fill every field. Write `none` when a field does not apply. The child sees the brief and the files it is told to read, nothing else.

```markdown
## Goal and why
<The outcome in one or two sentences, and why it matters. The child cannot infer intent from your context.>

## Exact scope and paths
<Read these paths. Write these exact paths or directories. Say "read-only" when there are no writes.>

## Constraints and forbidden actions
- <Invariants, style rules, and commands that are out of bounds.>
- Do not widen scope. Do not edit files outside the write list.
- Do not commit, push, install packages, or run <command>.

## Success criteria
<Observable outcomes. Name the condition that makes the work done, not the effort spent.>

## Verification command
<The exact command the child runs and reports. When none exists, say what evidence counts.>

## Report format
<Use references/report.md. First line PASS, ISSUES, or BLOCKED. Then evidence, what changed, what remains, artifact links.>

## Model and effort
<Role name from egm-setup, its model line, and its effort. Omit the model when the role is inherit-parent.>

## Read-only or write scope
<read-only or write. For write, list the owned paths. For read-only, forbid every write.>

## Return contract
<What the child returns and where the artifact lives. Keep it short.>
```

## Rules for a good brief

- The brief is self-contained. A child that must ask a question costs a round trip.
- Name the artifact and where it lives.
- State what the child must not do, not only what it should do.
- Give the verification command verbatim.
- Keep the brief shorter than the work.

## Read-only briefs

A read-only child gets a read-only scope, a report path, and an explicit ban on writing. The parent writes the artifact from the child's report. When the host cannot enforce read-only, tell the child that the parent checks the working tree before and after.
