---
name: egm-setup
description: "Configure which model each EGM role uses, set one reasoning budget, and write the result to the rule files that harnesses load. Use for /egm-setup, or when the user asks to change EGM models, set a budget, or pick a model for a role."
license: Apache-2.0
disable-model-invocation: true
---

# Setup

`/egm-setup` detects the models available in this session, asks for one
budget, maps the seventeen roles, validates every model, and writes the same
settings to three rule files. A re-run updates the files in place.

## 1. Detect available models

- Enumerate the slugs your subagent tool accepts. That list is the dependable source. A host command may add completeness.
- When you detect no slug, ask the user to paste the slugs they can use. Do not guess.
- `inherit-parent` and `auto` are always valid. Both mean the role runs on the parent chat model with no model passed to the subagent.

## 2. Load current state

Read the first file that exists.

- `~/.agents/egm-stack-models.md`
- `~/.claude/rules/egm-stack-models.md`
- `~/.cursor/rules/egm-stack-models.mdc`

Keep its `# budget:` line and role values. Drop roles not in the table below.

## 3. Offer a budget

Ask one question with your structured question tool. Make it the sole tool call
in the turn. Yield after it. Never mark an option as recommended.

- `unlimited` (`max` effort).
- `large` (`xhigh` effort, the skill default).
- `medium` (`high` effort).
- `small` (`medium` effort).

The budget sets the effort token of every real slug. `inherit-parent` and `auto`
do not change. The token is the last token, or the one before a trailing `fast`,
on the ladder `max`, `xhigh`, `high`, `medium`, `low`. When the target effort is
not available for a family, use that family's detected slug with the highest
effort at or below the target, or mark the role as needing a choice.

On a re-run, state the stored budget before asking.

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
alias entry still counts toward the fan-out. `arena cross-judge pool` runs one judge from a family other than the parent's, in list order.

Show every role with its value and its source. Mark a real slug that is not in the detected set as needing a choice.

## 5. Validate and write

Every real slug in the output must be in the detected set. `inherit-parent` and
`auto` always pass. When a chosen slug is unavailable, stop and ask again. Never
write a slug you could not confirm.

Write all three files on every run. Overwrite the whole file. Do not append. Keep user-changed roles.

```text
# EGM model configuration. One line per role.
# A value of inherit-parent or auto runs the role on the parent chat model.
# budget: large (xhigh)
egm drafting: inherit-parent
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

- `~/.agents/egm-stack-models.md` is read by skills that pick a model.
- `~/.claude/rules/egm-stack-models.md` is loaded by Claude Code.
- `~/.cursor/rules/egm-stack-models.mdc` is loaded by Cursor and always applies.

The rules apply to new sessions. A re-run updates every file.
