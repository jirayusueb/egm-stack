# Subagent delegation

`delegate` and the review engine both depend on a fresh context. This document
records what "fresh" can mean, what a brief must contain, and how a team differs
from a subagent. Verified against host documentation on 2026-11-06.

## Three kinds of isolation

The word "fresh" hides three separate things. A host can give one without the
others, and EGM records that two of its hosts do exactly that.

| Layer | What it means | Who provides it |
| --- | --- | --- |
| Conversation | The child does not see parent turns or reasoning. | Every host we target |
| Instructions | The child does not load user and project instruction files. | Claude Code, with `omitClaudeMd`. Codex reports a gap. |
| Filesystem | The child cannot read or write the parent workspace. | Almost nobody. A worktree comes closest. |

A review needs the first two. A review does not need the third, but it must not
claim it. Read-only tools and a worktree are useful, and neither is a sandbox.

Codex reports that project and user `AGENTS.md` files can reach a child even when
parent turns are excluded. Treat instruction-file exclusion as unverified there,
and keep stable project rules in instruction files rather than in the brief.

## The brief

A brief is self-contained. The child sees no history, so anything missing is
missing for good. Seven parts, in this order.

1. Goal and why. One paragraph. The child needs the purpose to resolve an
   ambiguity the brief did not foresee.
2. Exact scope. Paths to read, paths to write, and paths to leave alone.
3. Constraints. Read-only or write scope, tools to avoid, host rules.
4. Success criteria. What must be true when the child stops.
5. Verification. The command or check the child must run, and what a pass looks
   like.
6. Report format. The exact shape of the answer, so the parent can compare two
   children.
7. Model and effort. Only values the host reports. `inherit` is the default.

The brief names the persona file by absolute path, because a child that guesses a
path reads the wrong file. A persona file that cannot be read is a failed
delegation, not a clean review.

## Verify the artifact, not the summary

A child that says it wrote a file is not evidence that the file exists. The
parent reads the artifact, or runs the check. A summary that arrives without its
artifact is unverified, and an unverified review is not a review.

This rule costs one read. It catches the failure that matters, which is a child
that reported success and did nothing.

## Parallel work

Parallelism needs disjoint write scopes. Two children on one file is a merge
conflict with extra steps. Read-only children can run in parallel with no scope
problem at all, which is why reviews parallelize well.

Sequential stages stay sequential. Each stage writes its report before the next
stage starts, because the next stage reads it. Uninterrupted mode skips human
checkpoints, not stage dependencies.

## Dropouts

A child can fail, time out, or return nothing. The parent proceeds with N-1 and
reports the dropout. It does not re-run until the output looks better, and it
does not fill the gap itself.

A reviewer that did not run makes the round unclean. That is the whole point.
A hole in the evidence is a finding, not a silence.

## Teams

A team is not a big subagent. Four differences matter.

- A teammate is addressable for many turns. A subagent is usually one turn.
- Teammates share a task board. A task carries a write scope and can be blocked
  by another task.
- A teammate can message another teammate. A subagent reports to its caller.
- A team costs more, because each member is a separate session.

Shared task rules.

- One writer per file. Scopes are advisory, not a lock, so a human or a Lead
  still reads the diff.
- A claim uses the current revision. A stale edit fails, and the owner re-reads.
- `blocked_by` is readiness. The owner still needs a start.
- The Lead owns the final diff and runs every check. A teammate does not close
  the work.

## When there is no subagent tool

Two different outcomes, and the difference is deliberate.

- A delegation task can run inline. The brief says it runs inline, and the report
  names the fallback so a reader is not misled.
- A review stops. A review in the parent context is not a review, because the
  reviewer now shares the author's assumptions.

The rule exists because the failure mode is invisible. A same-context review
reads well. It just agrees with the draft.

## What we write, and what the host does

Our skill bodies say "spawn a reviewer and pass this brief". They never name a
tool. [../harness.md](../harness.md) maps the action to each host, and an adapter
in the `harness/` folder records the fields.

## Sources

- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/agent-teams
- https://code.claude.com/docs/en/tools-reference
- https://learn.chatgpt.com/docs/agent-configuration/subagents
- https://cursor.com/docs/subagents
- https://opencode.ai/docs/agents/
- https://github.com/google/elephant-goldfish-model/blob/main/docs/harnesses.md
