# DeepSeek Harness

The desktop harness this stack was built in. Skills load from the project or
user `.agents/skills/` directory. The harness lists each skill in its `/skill:`
menu, including skills hidden from the model.

Status. Verified in this build. Skill loading, `/skill:` invocation, subagents,
and Agent Teams were exercised here.

## Tools

| Our instruction | DeepSeek Harness tool |
| --- | --- |
| Invoke a skill | `/skill:<name>` |
| Spawn a subagent | `subagent` |
| Spawn a forked subagent | `subagent_fork` |
| Durable teammate | `spawn_teammate` |
| Steer a teammate | `send_message` |
| Wait for a teammate | `wait_agent` |
| Ask the user a question | `ask_user_question` |
| Read, search, edit, write | native file tools |

## Subagent fields

`provider`, `model`, `reasoning_effort`, `cwd`. A role value of
`provider/model` splits at the first slash. A plain value goes in `model`. The
harness rejects fields a host tool does not accept.

## Models

Model values are provider and model pairs, for example
`deepseek-account/deepseek-flash`. Effort levels depend on the model. This build
exposed `max`, `high`, `low`, and `off`. `egm-setup` records the detected levels
and maps a budget to the nearest one. Config lives at
`~/.agents/egm-stack-models.md`; the harness has no Claude or Cursor rule
directory.

## Install

Install project scope so the skills load in the workspace that needs them.

```sh
cd /path/to/project
npx skills add jirayusueb/egm-stack -y
```

The CLI writes to `.agents/skills/` and links the agent directories it detects.
Start a new session, or reopen the workspace, because the skill catalog is built
when a session starts. `npx skills list` shows what landed.

With Agent Teams, install once per workspace. The team board is per session.

## Update

```sh
npx skills update
```

Start a new session afterward. The skill catalog is built at session start.

## Paths

- Project skills: `<workspace>/.agents/skills/<name>/SKILL.md`
- User skills: `~/.agents/skills/<name>/SKILL.md`
- Artifacts: `<workspace>/.egm/<slug>/`
- Session data: `~/.dsh/sessions/`

## Host-only features

- The `/skill:` menu lists every installed skill. Skills are model-invocable
  and user-invocable.
- Agent Teams provides durable teammates, shared tasks with write scopes, and
  `blocked_by` dependencies. The Lead owns the final diff and the test run.
- Background jobs (`job_output`, `job_kill`) replace polling.
- The harness has no built-in artifact directory and no plugin marketplace
  command for this repository. Use the skills route.
