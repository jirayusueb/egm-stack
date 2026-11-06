# 11 Subagents

`delegate` owns the brief contract for every subagent spawn, including durable
teams. A good brief is the whole job. A vague brief returns a confident
summary with nothing behind it.

## The brief

Every brief names these fields.

- Goal and why.
- Exact scope, including files or areas.
- Constraints and forbidden actions.
- Success criteria.
- Verification, meaning the command or artifact that proves the work.
- Report format.
- Model and effort.
- Read-only or write scope.

If a field is missing, the child guesses. A guess is not a brief.

## Fresh context

Fresh context is the default. A new task gets a new child with a consolidated
scope. Resume an existing child only when it holds costly state, such as an
uncommitted checkout or a running process.

Never chain a resume through an interrupt. It silently drops directives. Spawn
fresh with the full brief instead.

## Parallel work

Parallel spawns are legal only with disjoint write scopes. One writer per file.
If two children would touch the same file, serialize them or split the file
first.

A shared mutable target is a design smell. Eliminate the sharing before adding
a lock. A lock hides the collision, and the next agent forgets the lock.

## Read-only reviewers

Reviewers are read-only by contract. They return findings and never write a
report. Only the parent or the synthesizer writes.

A reviewer that edits the artifact is no longer a reviewer. Treat its report as
a draft, and do not merge its edits.

## Verify the artifact

Do not trust a summary. Read the diff or run the check. A child's claim that it
finished is not evidence.

```text
/delegate review this branch with two fresh-context reviewers
```

## Dropouts

If one child of N fails, the parent proceeds with N-1 and reports the gap. It
does not silently substitute a child's own work for the missing review. A
missing reviewer makes the round unclean.

## Durable teams

For work that outlives one turn, use shared tasks.

- Each task carries a write scope and optional `blocked_by` dependencies.
- A member claims a task with the current revision.
- Members wait for changes. They do not poll.
- The Lead owns the final diff and runs the checks.
- One writer per file, disjoint scopes only.

The same rules hold in every host. The tool names differ, and the harness map
gives them.

## Anti-patterns

- A brief that says "review this" with no scope.
- Two children on one file.
- A parent that pastes a child's summary into the final report.
- A resume used to avoid writing a fresh brief.
- A reviewer asked to also fix what it found.

## Next

[12-ask.md](12-ask.md) covers the read-only assistant.
