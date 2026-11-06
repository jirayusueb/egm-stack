# 01 Install

Install once, set the models once, then run one command to confirm the router
answers.

## Install

Pick one route. The [README](../../README.md) has the full list.

- Claude Code. `claude plugin marketplace add OWNER/egm-stack` then
  `claude plugin install egm-stack@egm-stack`.
- Codex. `codex plugin marketplace add OWNER/egm-stack` then
  `codex plugin add egm-stack@egm-stack`.
- omp. `omp plugin marketplace add OWNER/egm-stack` then
  `omp plugin install egm-stack@egm-stack`. Skills use `/skill:egm-mode`.
- Any Agent Skills host. `npx skills add OWNER/egm-stack`.
- Manual. Copy `skills/<name>/` into the host skill directory.

Claude Code installs a plugin and may namespace the command. On that host the
router can appear as `/egm-stack:egm-mode`.

## Set models

Run setup once per host.

```text
/egm-setup
```

Setup detects the model slugs the host accepts. It asks for one reasoning
budget and confirms a model per role. Seventeen roles ship. Defaults use the
parent model, and only detected slugs are written. The rule file lands at
`~/.agents/egm-stack-models.md` on most hosts, plus the Claude and Cursor rule
paths where those hosts read rules.

Rerun setup when you change hosts or gain access to a new model. A role line of
`inherit-parent` needs no edit when the session model changes.

## Verify

Start a session and type the router with a harmless task.

```text
/egm-mode explain the difference between the brainstorm and draft steps
```

A working install shows three things. The router names the workflow it picked.
It opens a todo list. It cites the principle it applied.

If the command is missing, check the host namespace first. If two stacks are
installed, check which one owns the name.

## Coexistence

Several names in this stack also exist in other collections, for example
`how`, `why`, `tdd`, `unslop`, and `statechart`. Install one stack per scope.
Prefer project scope for a team repository. Do not install both the plugin
route and the skills route for one host.

## Auto-update

Claude Code leaves auto-update off for third-party marketplaces. To turn it on,
run `/plugin`, open the Marketplaces tab, select `egm-stack`, and choose Enable
auto-update. To update once by hand, run
`claude plugin update egm-stack@egm-stack`.

## Next

[02-first-design.md](02-first-design.md) takes one idea through the design
loop.
