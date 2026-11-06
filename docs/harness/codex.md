# Codex

Verified against the official Codex docs on 2026-11-06, plus the EGM Codex
adapter. Tool names change across versions, so a skill inspects the schema
instead of naming a tool.

## Tools

| Need | Tool |
| --- | --- |
| Spawn and wait | `spawn_agent` plus a wait tool. The exact names vary by version, so inspect the live schema first. |
| Fresh context | `fork_context: false` when offered, else `fork_turns: "none"` |
| Shell and edits | The shell tool and the patch tool, under the host sandbox and approval policy |
| Install a plugin | `/plugins` in a session, or `codex plugin` on the command line |

Tool names above are unverified. Read the schema, then use what it lists.

## Subagent fields

Custom agents are standalone TOML files under `~/.codex/agents/` for personal
scope or `.codex/agents/` for project scope. One file defines one agent.

Required fields are `name`, `description`, and `developer_instructions`.
Optional fields are `model`, `model_reasoning_effort`, `model_reasoning_summary`,
and `model_verbosity`.

A file can reduce capability. Set a supported feature key to `false` among
`features.shell_tool`, `features.apps`, `features.plugins`, `features.memories`,
and `features.request_permissions_tool`. Use `skills.config`,
`skills.bundled.enabled`, and `skills.include_instructions` for skills.

A custom agent inherits the parent permissions, provider, and MCP servers, and
cannot override them. Codex therefore enforces read-only for a reviewer only when
the host policy does. The brief must repeat the read-only rule.

Project defaults live in `.codex/config.toml` under `[agents]`. The documented
keys are `agents.enabled`, `agents.max_concurrent_threads_per_session`, and
`agents.default_subagent_model`.

## Models

A child inherits the parent model and effort unless a spawn request, an `[agents]`
default, or the agent file sets one. A model without an effort uses that model's
default. Use only slugs the host lists. The docs use `gpt-6.1-sol` and
`gpt-6-luna` as examples, and those names change with releases.

## Install

```sh
codex plugin marketplace add <owner>/egm-stack
codex plugin add egm-stack@egm-stack
codex plugin list
npx skills add <owner>/egm-stack -a codex   # skills only
```

`codex plugin marketplace upgrade` refreshes a catalog. A source can be a GitHub
shorthand, a git URL, or a local root. Use `--ref` to pin one.

## Paths

| Item | Path |
| --- | --- |
| Skills | `.agents/skills/<name>/SKILL.md`, `~/.agents/skills/` |
| Agents | `.codex/agents/<name>.toml`, `~/.codex/agents/` |
| Instructions | `AGENTS.md` |
| Repo catalog | `.agents/plugins/marketplace.json` |
| Manifests | `plugin.json`, `.codex-plugin/plugin.json` |

## Host-only features

The OpenAI surface reads `extensions.com.openai` in the root `plugin.json`. The
compatibility manifest supplies the same data when the object is absent. A
directory plugin is skills only, or skills plus MCP. Convert commands and agents
into skills before a public submission. Hooks are not accepted there.

## Known limits

No transcript path is documented, so `reflect` stops and says the location is
unverified. Codex reports that project and user `AGENTS.md` files can reach a
child even with `fork_turns: "none"`. Treat instruction-file exclusion as
unverified, and keep stable project rules in instruction files.

Sources. https://learn.chatgpt.com/docs/agent-configuration/subagents ,
https://developers.openai.com/plugins/build/plugins ,
https://developers.openai.com/codex/plugins ,
https://github.com/openai/codex/commit/74a1b46a0077b2da52df45120d57fb4c0bba319f
