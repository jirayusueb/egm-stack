# omp (Oh My Pi)

omp installs Claude Code marketplace plugins. It reads `.claude-plugin/` and the
root `skills/` directory, so this repository needs no omp-specific manifest.

Status. The install path and command names below come from omp's published
marketplace behavior and a community setup guide. They are unverified in this
release. Record the omp version and date here when you verify them.

## Tools

| Our instruction | omp tool |
| --- | --- |
| Invoke a skill | `/skill:<name>`, or read `skill://<name>` |
| Spawn a subagent | `task` |
| Track a plan | `todo` |
| Ask the user a question | `ask` |
| Read, search, edit, write | native `read`, `grep`, `glob`, `edit`, `write` |

Plugin commands are namespaced, for example `/egm-stack:egm-mode`. Skills are
not namespaced the same way; use `/skill:egm-mode` when the skill command is
enabled. If you cannot tell which form the host accepts, ask the agent to read
`skill://egm-mode`.

## Subagent fields

Use the `task` tool. Named personas import from `agents/`, so pass the persona
name when omp lists it. Otherwise pass a general task and give it the persona
path first, as `delegate` prescribes.

Reported behavior. Personas register as native `task` agents, and nesting is
available. Both are unverified in this release.

## Models

`egm-setup` writes `~/.agents/egm-stack-models.md` for hosts without a rule
directory. Skills that pick a model read that file. omp does not document a rule
directory for this file, so treat the read as best effort. Pass model slugs only
when omp accepts them.

## Install

```sh
omp plugin marketplace add OWNER/egm-stack
omp plugin install egm-stack@egm-stack
```

Restart omp, or run `/reload-plugins`, so the skills are discovered. Check the
result with `omp plugin list`.

A local clone works the same way.

```sh
omp plugin marketplace add /absolute/path/to/egm-stack
omp plugin install egm-stack@egm-stack
```

omp uses the Claude-compatible fallback manifest at
`.claude-plugin/plugin.json`. The root `plugin.json` declares the Agent Plugins
`$schema`. If your omp version routes schema-declaring manifests to a strict
validator that rejects `disable-model-invocation`, the fallback is the path that
works. Report the version if you hit that case.

## Paths

Resolve the plugin root from the installed skill path. Plugin resources resolve
against that root, and `references/` resolves against the invoked skill
directory. Project and user skill directories for omp are not documented here.
Do not guess them.

## Host-only features

- `/reload-plugins` reloads without a restart.
- Skills are reachable as `/skill:<name>` and `skill://<name>`.
- Personas from `agents/` appear as `task` agents.
- omp has no built-in artifact directory. Write to `.egm/<slug>/` as usual.
- No durable team board. Delegation runs through `task`; `orchestrate` falls back
  to sequential waves and says so.
