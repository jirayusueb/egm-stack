# Harness map

One brief, many hosts. Read this file before a spawn. Keep the brief the same across hosts and change only the tool and the fields.

| Host | Subagent tool | Required fields | Optional fields |
| --- | --- | --- | --- |
| Claude Code | `Agent` | `description`, `prompt` | `subagent_type`, `model`, `run_in_background` |
| Codex | `spawn_agent` | `agent_type`, `message` | `model`, `reasoning_effort` |
| Cursor | `Task` | `description`, `prompt` | `subagent_type`, `model`, `readonly` |
| OpenCode | `task` | `description`, `prompt` | `subagent_type`, `model` |
| Agent Teams | `spawn_teammate` | `name`, `description`, `prompt` | `context` (fresh or fork) |

## Named persona or general subagent

- Preferred. Register the persona as a named subagent. This repo ships personas as `agents/<name>.md`. A host that reads that directory adds the name to its persona list and loads the file for the child.
- Fallback. Spawn a general subagent and put the persona file path in the brief. Write "Read `agents/<name>.md` first and follow it as your role." This works on every host.
- Never paste a whole persona into the brief when the file is available. Point to the file.

## Read-only children

- Set the read-only flag where the host has one. The field names differ, so check the host map above.
- Where the host has no flag, forbid every write in the brief and inspect the working tree before and after.
- A reviewer that can write is a risk. Only the parent or the synthesizer writes the report.

## No subagent tool

- Run the role inline, one role after another, and say in the reply that the roles ran inline.
- Reviews stop. Do not review a draft in the context that wrote it. Tell the user the host cannot isolate the reviewer. Offer another host or a manual review.

## Model and effort

- Read the role line from `egm-setup`. Pass the model name and the effort the host accepts.
- Omit the model when the role is inherit-parent.
- When the host rejects a value, use its default and say so in the reply.

## Host differences that matter

- Field names differ. The brief does not.
- Some hosts run children in the background. Collect every child before the final answer.
- Some hosts share the working tree. A shell write bypasses the file guard, so coordinate by scope. See `teams.md`.
- Some hosts cap depth. A child that cannot spawn its own child does the work itself, or the parent flattens the plan.
