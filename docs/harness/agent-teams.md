# Agent Teams

Verified in this runtime on 2026-11-06. The Claude Code mapping is verified from
the official agent teams docs. Teams suit durable work with several writers.
They are not a review mechanism.

## Tools

| Need | Tool |
| --- | --- |
| Create a teammate | `spawn_teammate` with `name`, `description`, `prompt`, and `context` |
| List teammates | `list_agents`. It reports running, provisioning, inactive, and failed. |
| Send work or a correction | `send_message`. The target starts a turn when inactive. |
| Stop a turn | `interrupt_agent`. Pending inbox is kept. |
| Wait for a change | `wait_agent` with a timeout. It never wakes an inactive member. |
| Shared tasks | `team_task_create`, `team_task_get`, `team_task_list`, `team_task_update` |
| Take ownership | `team_task_update` with `action: claim` and the current revision |
| Close a task | `team_task_update` with `action: complete` and the current revision |

Claude Code names the same ideas differently. It uses `SendMessage`, the Task
tools `TaskCreate`, `TaskGet`, `TaskList`, and `TaskUpdate`, and `ListAgents`.
It also lists teammates in an agent panel.

## Subagent fields

A spawn takes four fields.

- `name`. Lowercase kebab-case and unique.
- `description`. The role, not the task.
- `prompt`. The full brief. It is self-contained, because a fresh teammate sees
  no history.
- `context`. `fresh` starts with no history. `fork` inherits the completed turns
  of the Lead.

A shared task takes four fields.

- `subject` and `description`. The title and the acceptance criteria.
- `write_scopes`. Repo-relative prefixes the owner expects to edit. They are
  advisory, not a lock.
- `blocked_by`. Task ids that must complete first. Readiness never starts an
  owner.

## Models

A teammate inherits the parent model unless the spawn names one, marked
unverified for every provider route. Delegation depth is capped, and this runtime
allows one level from the Lead. Plan for a flat team, not a tree.

## Install

Nothing to install for this host. Claude Code needs
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in its environment or settings, and an
interactive session. Headless `-p` runs do not spawn teammates there.

## Paths

| Item | Path |
| --- | --- |
| Workspace | Shared by every teammate, so one writer per file |
| Task board | Host-managed, read through the task tools |
| Claude Code mailboxes | `~/.claude/teams/<team>/inboxes/<agent>.json` |
| Transcripts | None. Use the task board and the messages. |

## Host-only features

- A task claim uses the current revision as a compare-and-set guard. An edit on a
  stale revision fails. Re-read, then retry.
- `blocked_by` is readiness, not scheduling. The Lead still starts the owner.
- A message that was sent is not a message that was read. Confirm the artifact.
- The Lead owns the final diff and runs every check. A teammate does not close
  the work.
- Teammates run on the same filesystem. Two writers on one file is a bug, not a
  race to win.

## The fallback

When teams are unavailable, fall back in this order.

1. Use `delegate` to spawn subagents. One brief per unit, disjoint write scopes.
2. If the host has no subagent tool, a delegation task can run inline and the
   report names that.
3. A review never runs inline. Without a subagent tool the review stops and the
   skill says why.

Sources. This runtime tool schema. Claude Code mapping from
https://code.claude.com/docs/en/agent-teams ,
https://code.claude.com/docs/en/tools-reference
