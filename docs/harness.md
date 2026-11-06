# Harness adapters

Our skill bodies stay harness-neutral. Skills describe an action. This file maps
that action to a host tool, field, or path. Each host has an adapter in the
`harness/` folder with six sections. The set of hosts comes from the design spec
at [designs/egm-stack.md](designs/egm-stack.md).

## Labels

**Verified** means an official document, or a recorded run, supports the claim.
**Unverified** means one secondary source, or an inference from one host.
A claim without a label is unverified by default. Record the host version and
date when you verify a row.

## Capability matrix

| Host | Subagent tool | Named personas | Nesting | Durable teams | Artifact dir | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Code | `Agent` tool, also called Task | Yes, `.claude/agents/` and plugin `agents/` | Yes, three layers below the main thread | Agent teams, behind an experimental flag | None built in, we write to `.egm/<slug>/` | Tools and fields verified. Review isolation unverified. |
| Codex | `spawn_agent` plus a wait tool. The schema varies by version. | No, a general agent reads the persona file | Detect at runtime | No | None built in | Partial. See the adapter. |
| Cursor | `Task` tool | Yes, `.cursor/agents/` | Unverified | No | None built in | Fields verified. Live run unverified. |
| OpenCode | `task` in V1, `subagent` in V2 | Yes, agents with `mode: subagent` | Unverified | No | None built in | Unverified here. |
| omp (Oh My Pi) | `task` | Yes, personas from `agents/` | Reported, unverified | No | None built in | Unverified here. |
| Agent Teams | `spawn_teammate` | Yes, named teammates | One level | Yes, shared task board | Workspace plus task board | Verified in this runtime. |

## What the matrix decides

A review needs a fresh context. The skill stops when the host has no subagent
tool. It never reviews in the parent context. This rule is fixed in the review
engine section of the design spec.

Delegation is different. When the host has no subagent tool, a delegation task
can run inline. The brief says it runs inline, and the report names the
fallback. Inline work is never labelled a review.

A host without Task tools coordinates by messages. It does not fake a shared
task list.

A host with named personas gets the persona name. A host without them gets the
persona file path in the brief.

## Model values

A role value in `~/.agents/egm-stack-models.md` is one of three shapes.

| Shape | Pass to the tool |
| --- | --- |
| `provider/model` | split at the first slash into a provider field and a model field |
| `model` | the model field only |
| `inherit-parent` or `auto` | neither field; the child runs on the parent model |

Hosts differ. Cursor encodes effort in the slug. Claude Code takes a model and
an effort option. Codex and OpenCode vary by version. Agent Teams and DeepSeek
Harness take provider, model, and effort separately. `egm-setup` offers the
effort levels the host exposes and maps a budget to the nearest available level.

## Transcript locations for reflect

`reflect` reads a session transcript. It reads only the folder for the current
workspace. It reads the newest transcript file. It never reads another project.

| Host | Location | Status |
| --- | --- | --- |
| Claude Code | `~/.claude/projects/<project>/<session-id>.jsonl` | Verified. `<project>` is the working directory with non-alphanumeric characters replaced by `-`. Subagent transcripts sit under `<session>/subagents/`. |
| Claude Code, agent teams | `~/.claude/teams/<team>/inboxes/<agent>.json` | Verified for teammate mailboxes. The inbox is not a transcript. |
| Claude Code, exported | `/export <filename>` in a session | Verified. Writes a readable text transcript. |
| Cursor | `~/.cursor/projects/<slug>/agent-transcripts/` | Unverified. It comes from pstack's Claude Code adapter, not from Cursor's docs. |
| Codex | No documented path | Unverified. The public docs describe subagent workflows, not transcript files. Do not guess a path. |
| OpenCode | `opencode export <session-id>` | Reported by the EGM OpenCode adapter. The on-disk path is unverified. |
| Agent Teams | The task board and the messages | Verified in this runtime. There is no transcript file to parse. |
| omp (Oh My Pi) | No documented path | Unverified. Do not guess a path. |

Rules for `reflect`.

- Resolve the project folder from the working directory. Do not search the home
  directory.
- Pick the newest file directly in the folder. Do not recurse into other
  projects.
- If the host has no readable transcript, say so and stop. Do not reconstruct
  the session from memory.
- Never upload a transcript. It stays on the machine, per
  [privacy.md](privacy.md).

## Host-only features

Some features exist on one host and nowhere else. Automations, Bugbot, cloud
agent dashboards, PR tools, and IDE extensions are examples. A skill names the
capability, not the feature. When the host lacks it, reply with one line and
continue.

The skip line reads `Skipped in <host>: <step>. <reason>.` Do not stop, ask, or
retry.

## How to verify a host

1. Record the host version, the surface, the model, and the date.
2. Run draft, review, and resolve end to end. Keep the reviewer starts, the
   required reads, and the produced artifacts.
3. Check write denial with a disposable file.
4. Put a marker in the parent context only. Check that the child never sees it.
5. Report install, workflow, and isolation outcomes as three separate results.

An install that passes is not a review that passes. Keep the row labelled until
all three results pass.

Sources. https://code.claude.com/docs/en/sub-agents ,
https://code.claude.com/docs/en/agent-teams ,
https://learn.chatgpt.com/docs/agent-configuration/subagents ,
https://cursor.com/docs/subagents ,
https://opencode.ai/docs/agents/ ,
https://agentskills.io/specification
