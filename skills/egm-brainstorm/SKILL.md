---
name: egm-brainstorm
description: "Stress-test a half-formed idea with eight adversarial lenses, then write a concepts brief that drafting can use. Use for /egm-brainstorm, or when a user has a feature idea but no agreed problem, scope, or alternatives."
license: Apache-2.0
disable-model-invocation: true
---

# Brainstorm

`/egm-brainstorm` turns a rough idea into a concept that survived scrutiny. It
ends with `.egm/<slug>/concepts_brief.md`. It does not write a design.

## Rules

- Ask open questions in chat. Drill until the problem, the users, the
  constraints, and the success measure are clear.
- Do not spawn a lens before the user confirms the working hypothesis.
- Run every lens in a fresh context. Read `../delegate/SKILL.md` for the brief
  contract and `../../docs/harness.md` for the subagent tool.
- If the harness has no subagent tool, say so and stop. A lens in this context
  is not fresh.
- Write the brief to the artifact. Do not paste it in chat.
- Never agree by default. Lead with the weakest point.
- Derive the slug from the feature name in kebab case.

## Step 1. Drill the problem

Ask a few questions per turn. Wait for the answers. Continue until these are
answered in the user's words.

- What problem does this solve, and for whom?
- How is it handled today, and why does that fail?
- What are the hard constraints?
- What is out of scope?
- How will success be measured?
- What must not change?

Write a working hypothesis of two or three sentences. Ask one question to
confirm it. Offer review with the lenses, or keep clarifying. This is a gate.
Ask one question, make it the sole tool call, and yield. Do not use a
recommended label.

## Step 2. Run the eight lenses

Each lens is a fresh reviewer with one mandate. Send all eight in parallel with
the same anchored hypothesis and read set. If `../../agents/egm-<name>.md` is
missing, read `references/personas/egm-<name>.md` beside this SKILL.md.

| Lens | Question it must answer |
| --- | --- |
| YAGNI and contrarian | Why does this need to exist? Can an existing tool solve 90 percent? |
| Cost and quota | What is the token, compute, storage, or query cost at peak? |
| UX and ergonomics | Is the interface obvious? Are errors actionable? |
| Observability and SRE | Can on-call engineers trace and triage this at 3 AM? |
| Tech debt and maintenance | What will hurt in two years? |
| Objective framing and scope | Is the problem stated precisely, and is the scope minimal? |
| Migration and compatibility | How do existing users and data move, and can it roll back? |
| Inventive and TRIZ | Which trade-off is treated as inevitable, and how can it dissolve? |

Each reviewer returns findings with a severity and a reason. A lens that fails
or returns nothing is `not run`, not clean.

## Step 3. Synthesize

Deduplicate the findings by issue. Keep the strongest evidence for each. Group
them as blockers, majors, and nits. For each blocker, state the contradiction
and one way to dissolve it.

## Step 4. Iterate

Show the user the three or four strongest objections and the proposed response.
Ask one question, revise the hypothesis or the scope, and re-run only the
lenses whose ground changed. Repeat until no Blocker is open.

## Step 5. Write the brief

Write `.egm/<slug>/concepts_brief.md`. Use these sections, in this order.

- `## Overview`
- `## Problem`
- `## Goals vs non-goals`
- `## Alternatives weighed`
- `## Key decisions and staging`

Record each rejected alternative with the reason it was rejected. Do not
attribute a rejection to a maintainer without a link. Carry the decisions that
drafting must honor into the last section.

Add a header with the author, the date, and the slug. Take the author from the
repository identity, then from the user.

## Step 6. Hand off

Tell the user the brief path and the open risks. Name the next command, which is
`/egm-draft` with the brief path. Offer to continue drilling instead. Stop.
