---
name: delegate
description: "Delegate a bounded task with /delegate and a self-contained brief. Use when work is independent, parallel, or needs a fresh context, and the parent must keep the scope, the diff review, and the checks."
license: Apache-2.0
disable-model-invocation: true
---

# Delegate

Delegate spawns one child with a brief. The child does the work. The parent keeps the plan, the diff review, and every check. Every spawn uses this skill, including reviews, research, and durable teams.

## When to spawn

- Work is independent and bounded. Research, a scoped edit, a review pass, or a test run.
- A fresh context helps. The child must not inherit the parent's assumptions or its draft.
- Writes are disjoint. Each child owns named paths.
- The work is long and can run while the parent does something else.
- A review needs isolation. A reviewer never shares the author's context.

## When not to spawn

- A one-file edit with no parallel work. Do it directly.
- Work that needs the full conversation. Fork only when that cost is justified.
- Shared state that two writers would touch. Serialize the work.
- A decision the human must make. Ask, do not delegate.
- A host without a subagent tool, except roles that allow an inline run. Reviews stop.

## The brief

Read `references/brief.md` before the first spawn. The brief is the whole contract. It names the goal and why, the exact scope and paths, the constraints and forbidden actions, the success criteria, the verification command, the report format, the model and effort, and the read-only or write scope. A child that must ask a question is a brief that leaked.

## Isolation

- Fresh context by default. The child starts from the brief and the files it is told to read.
- Resume only when the child holds costly state. A long build, a traced reproduction, a generated artifact.
- Fork only when the task needs the full conversation, such as editing text the parent just discussed.
- Never hand a child the parent's todo list. The Lead owns the list.

## Parallelism and write scopes

- Parallel only with disjoint write scopes. Name the exact files or directories.
- One writer per file. Read-only reviewers can fan out without conflict.
- Cap fan-out by review value, not by the tool limit. Three sharp reviewers beat ten redundant ones.
- Overlapping scopes get serialized or assigned to one owner.
- When the team uses shared tasks, record the write scopes on the task.

## Model and effort

Pick a role from `egm-setup`. Read its value and effort and pass them to the spawn. A `provider/model` value splits at the first slash into the provider field and the model field. A plain value goes in the model field only. When the role is missing or says inherit-parent, pass neither and run on the parent model. When the tool rejects a value, use the host default and say so. Keep model names out of the brief.

## Collection and verification

- Collect every child. A dropout is reported, not hidden.
- Do not trust a summary. Read the artifact or the diff.
- Run the verification command yourself. A child's claim that tests pass is a claim, not evidence.
- Check the write scope. An edit outside the scope is a finding.
- Accept PASS only with evidence. Read `references/report.md` for the report contract.

## Failure handling

- BLOCKED is reported with its reason. The parent decides the next step.
- ISSUES is triaged, not re-run unchanged.
- A timeout or dropout proceeds with N-1. Mark the gap and report it.
- Two failures on the same scope means take the work back or narrow the scope.
- Never re-spawn the same brief unchanged and expect a different result.

## Agent Teams

A host that supports durable teammates also supports a team. Read `references/teams.md`. Use shared tasks with write scopes and `blocked_by` dependencies, claim with the current revision, wait for changes instead of polling, and keep the final diff and the test run with the Lead. Read `references/harnesses.md` for the tool and field map of each host. The host map also lives in `docs/harness.md`.

## Anti-patterns

- A brief that says "investigate" with no paths and no output format.
- A child asked to edit and then to review its own edit.
- Parallel writers on one file.
- A summary accepted as proof.
- A spawn used to avoid thinking about the task.
- A hardcoded model name in a skill body.
- A child allowed to widen its own scope.

## References

- `references/brief.md`. The brief template.
- `references/harnesses.md`. Subagent tool and fields for each host.
- `references/teams.md`. Durable teammates and shared tasks.
- `references/report.md`. PASS, ISSUES, and BLOCKED.
