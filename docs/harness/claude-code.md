# Claude Code

Verified against the official Claude Code docs on 2026-11-06. A live review run
was not executed here, so isolation stays unverified.

## Tools

| Need | Tool |
| --- | --- |
| Spawn a subagent | `Agent` tool, also called Task. `subagent_type` is required when no general agent is registered. |
| Ask one question | `AskUserQuestion`. It is absent in `-p` mode, so ask in plain text there. |
| Track work | `TodoWrite`, or TaskCreate, TaskGet, TaskList, TaskUpdate |
| Run another skill | Read its `SKILL.md` and follow it. Skills are model-invocable. |
| Shell and files | `Bash`, `Read`, `Grep`, `Glob` |

## Subagent fields

Files live in `.claude/agents/`, `~/.claude/agents/`, or a plugin `agents/` list.
Only `name` and `description` are required. `name` cannot contain `:`, which
marks a plugin scope.

- `tools`, `disallowedTools`. Comma string or YAML list.
- `model`, `effort`. Effort is `low`, `medium`, `high`, `xhigh`, or `max`.
- `skills`. Preloads full skill text into the child context.
- `omitClaudeMd`. Drops user and project instruction files. Managed policy still
  loads. A review child needs this.
- `isolation: worktree`, `maxTurns`, `background`, `memory`, `color`.
- `permissionMode`, `hooks`, `mcpServers`. Plugin subagents ignore these three.

## Models

Values are `sonnet`, `opus`, `haiku`, `fable`, a full model ID, or `inherit`.
The order is the spawn prompt, the agent file, `CLAUDE_CODE_SUBAGENT_MODEL`, then
the parent. A teammate's model is fixed at spawn. Use only slugs the host lists,
so `egm-setup` writes detected values only.

## Install

```sh
claude plugin marketplace add <owner>/egm-stack
claude plugin install egm-stack@egm-stack
claude plugin enable egm-stack@egm-stack
npx skills add <owner>/egm-stack -a claude-code   # skills only
```

Validate with `claude plugin validate <path>`. Test with
`claude --plugin-dir <path>`. Auto-update is off by default for a third-party
marketplace. The user enables it in `/plugin`, or runs
`claude plugin update egm-stack@egm-stack`.

## Paths

| Item | Path |
| --- | --- |
| Project skills and agents | `.claude/skills/<name>/SKILL.md`, `.claude/agents/<name>.md` |
| User copies | `~/.claude/skills/`, `~/.claude/agents/` |
| Plugin manifests | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` |
| Body variables | `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_SKILL_DIR}` |
| Transcripts | `~/.claude/projects/<project>/<session-id>.jsonl` |

In a plugin a skill runs as `/egm-stack:<skill>` and an agent as
`egm-stack:<agent>`. The bare name also works while no other command owns it.

## Host-only features

Skills are model-invocable, so Claude can load one from its description. The
set on every skill because the router decides what runs. Hooks, plan mode,
worktrees, and background subagents are available. Subagents nest three layers
below the main thread. Instruction files load as `CLAUDE.md`, or `AGENTS.md` when
the project has no `CLAUDE.md`. Agent teams need
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. See [agent-teams.md](agent-teams.md).
A missing feature gets the skip line from [harness.md](../harness.md).

Sources. https://code.claude.com/docs/en/sub-agents ,
https://code.claude.com/docs/en/skills ,
https://code.claude.com/docs/en/sessions ,
https://code.claude.com/docs/en/plugins/manifest-reference
