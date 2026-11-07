---
name: egm-setup
description: "Configure which model each EGM role uses, set one reasoning budget, and write the result to the rule files that harnesses load. Use for /egm-setup, or when the user asks to change EGM models, set a budget, or pick a model for a role."
license: Apache-2.0
---

# Setup

`/egm-setup` detects the models available in this session, asks for one
budget, maps the seventeen roles, validates every model, and writes the same
settings to three rule files. A re-run updates the files in place.

## Stage tiering

Optional lines map a review stage to its own model, overriding the `egm
reviewers` role for that stage. The names are `stage zoom-out`, `stage
comprehension`, `stage design`, `stage intermediate zoom-out`, `stage
readiness`. A line of `inherit-parent` runs that stage on the parent model.
Cheap tiers fit comprehension and style work; strong tiers fit zoom-out and
readiness. Write only the lines that differ from the role default.

## Spawn cap

Ask once on a full run: the maximum spawns one run may use before the parent
stops and asks. Any positive number, or `none` for no cap. Write it as
`# max-spawns-per-run: 20`. Default when unset is `none`. The router enforces
it.

## Reply language

Ask once on every full run: `en`, `th`, or `match`. `match` answers in the
language of the user's last message. Write the choice as one line in every
config file: `# reply-language: match`. Default when unset is `en`. Show modes
and single-role changes keep the stored line unchanged.

## Modes

The default run detects, asks for one budget, and writes. Four other modes skip
the budget question.

| Invocation | Effect |
| --- | --- |
| `/egm-setup show` | Read the config files and print the current role table. Write nothing. |
| `/egm-setup reset` | Write the defaults after one confirmation. Every role becomes `inherit-parent`, the budget becomes `standard`. |
| `/egm-setup role <name> <value>` | Change one role after validating the value against the detected set. Keep every other line. |
| `/egm-setup profile cheap\|standard\|thorough` | Write a profile. No budget question. |

Profiles map to effort and panels.

- `cheap`: every real value at the lowest detected effort, the parent model for
  every role, and one entry in each panel. Use it for exploration.
- `standard`: the host default effort, detected models, and one entry per panel.
  This is the normal run.
- `thorough`: the highest detected effort, and two entries in each panel when
  two models exist. Use it for a hard review.

A profile writes the shared config file. It writes the Claude or Cursor file
only when that host is in use, as the write rule below says.

## 1. Detect available models

- Enumerate the model values your subagent tool accepts. Two forms exist. A
  plain slug, or a provider and model pair written `provider/model`. Record the
  form the tool takes.
- Record the effort levels the tool exposes for each model. Hosts differ.
  Cursor encodes effort in the slug. Claude Code uses an effort option. Agent
  Teams and DeepSeek Harness take a provider, a model, and an effort.
- When you detect no model, ask the user to paste the values they can use. Do
  not guess.
- `inherit-parent` and `auto` are always valid. Both mean the role runs on the
  parent chat model with nothing passed to the subagent.

## 2. Load current state

Read the first file that exists.

- `~/.agents/egm-stack-models.md`
- `~/.claude/rules/egm-stack-models.md`
- `~/.cursor/rules/egm-stack-models.mdc`

Keep its `# budget:` line and role values. Keep a `provider/model` value whole.
Drop roles not in the table below.

## 3. Offer a budget

Ask one question with your structured question tool. Make it the sole tool call
in the turn. Yield after it. Never mark an option as recommended.

When the host exposes its effort levels, offer those levels from strongest to
weakest, for example `max`, `high`, `low`, and `off`. Otherwise offer these
four labels.

- `unlimited` (`max` effort).
- `large` (`xhigh` effort, the skill default).
- `medium` (`high` effort).
- `small` (`medium` effort).

The budget sets the effort every real value runs at. `inherit-parent` and
`auto` do not change. When the target effort is absent, use the strongest
detected level at or below it, or the weakest detected level when none is at or
below it, and say which one you used. When the host has no effort control,
skip this step and say so.

## 4. Map the roles

| Role | Default |
| --- | --- |
| egm drafting | inherit-parent |
| egm reviewers | inherit-parent |
| egm synthesizer | inherit-parent |
| egm delivery | inherit-parent |
| egm judgment and prose | inherit-parent |
| egm hardest tasks | inherit-parent |
| egm verification | inherit-parent |
| delegate workers | inherit-parent |
| how explorer | inherit-parent |
| how explainer | inherit-parent |
| why investigators | inherit-parent |
| why synthesizer | inherit-parent |
| reflect reviewers | inherit-parent |
| reflect synthesizer | inherit-parent |
| arena runners | inherit-parent |
| arena cross-judge pool | inherit-parent |
| swarm workers | inherit-parent |

The last three roles take a comma-separated list, one subagent per entry. An
alias entry still counts toward the fan-out. `arena cross-judge pool` runs one
judge from a family other than the parent's, in list order.

Show every role with its value and its source. Mark a real value that is not in
the detected set as needing a choice.

A role value may be a plain model, a `provider/model` pair, or an alias. Keep
the pair whole in the config file. At spawn time, split it at the first slash
into the provider field and the model field. A plain value goes in the model
field only. `inherit-parent` and `auto` pass neither field.

## 5. Validate and write

Every real value in the output must be in the detected set. `inherit-parent` and
`auto` always pass. When a chosen value is unavailable, stop and ask again.
Never write a value you could not confirm.

Write `~/.agents/egm-stack-models.md` on every run. Overwrite the whole file. Do
not append. Keep user-changed roles.

Write the Claude and Cursor files only when the user uses those hosts. A value
that resolves here may not resolve there, and a rule file is loaded by the
host. When you write one, overwrite the whole file and add the Cursor
frontmatter below.

```text
# EGM model configuration. One line per role.
# A value of inherit-parent or auto runs the role on the parent chat model.
# A value may be provider/model when the host takes a provider and a model.
# budget: large (high, scaled to the host)
egm drafting: provider/model
egm reviewers: inherit-parent
```

For `~/.cursor/rules/egm-stack-models.mdc`, add this frontmatter above the same
body.

```text
---
description: EGM per-role model choices
alwaysApply: true
---
```

## 6. Confirm

Tell the user which files were written and when each applies.

- `~/.agents/egm-stack-models.md` is read by skills that pick a model. Always write it.
- `~/.claude/rules/egm-stack-models.md` is loaded by Claude Code. Write it only when Claude Code is in use.
- `~/.cursor/rules/egm-stack-models.mdc` is loaded by Cursor and always applies. Write it only when Cursor is in use.

The rules apply to new sessions. A re-run updates every file. A host that reads
none of them still gets the values because skills read
`~/.agents/egm-stack-models.md` when they pick a model.
