# EGM anatomy

The Elephant-Goldfish Model (EGM) is Google's spec-first workflow for coding
agents, published at https://github.com/google/elephant-goldfish-model under
Apache-2.0. We read the repository at commit `6a8001e` on 2026-11-05. This
document records what we kept, what we changed, and what did not port.

## The idea

An elephant drafts with project context. A goldfish reviews the draft with no
context at all, because a reviewer that shares the author's assumptions cannot
see them. The human resolves the trade-offs between the two. EGM names the
assembled review a Goldfish review.

The central claim is that review quality comes from context isolation, not from
a better prompt. Everything else in EGM follows from that claim.

## The review protocol

EGM runs five stages in a fixed order. The first stage is Zoom-Out with an
Inventive Catalyst. Then Comprehension, Design Critic, an Intermediate Zoom-Out,
and Implementation Readiness. Each stage writes its report before the next stage
is dispatched, so a later stage can read the earlier report.

Ten reviewer personas exist for the stages, among them a design critic, a
comprehension reviewer, a structural reviewer, and a synthesizer. A synthesizer
collects findings and writes the report. Reviewers never write.

The loop is bounded. A finding that is settled never re-opens. An applied fix
does not settle a finding. A round is clean when it has no unsettled Blocker or
Major. Convergence means two consecutive clean rounds, with a cap of five. A
reviewer that did not run makes the round unclean.

The vocabulary is fixed. Findings carry a severity and a verdict. The parent
applies an approved fix, and only the parent or the synthesizer writes.

## Artifacts

EGM writes briefs, drafts, per-stage reports, and a combined review report to a
working directory. A project can name another folder in its instructions. EGM
treats a promotion to a permanent design document as a human act, not an agent
act.

## What we kept

- The isolation rule. A review with no subagent tool stops instead of degrading.
- The stage order and the convergence rules. We changed the names and merged the
  loop into one skill.
- Persona split. We kept role separation and dropped persona-specific wording
  that names a host tool.
- The fixed vocabulary. Severity, verdict, settled, clean round.
- The write barrier. Reviewers are read-only. The parent writes.

## What we changed

EGM numbers review stages 5 through 9. We number them 1 through 5. The upstream
names appear in no user-facing text here, so a reader who knows EGM must map the
numbers once.

EGM ships ten personas as files that a host registers. We keep the personas but
make each one reachable two ways. A host with named agents gets the name. A host
without them gets the file path in the brief.

EGM's own docs map the protocol to six harnesses, including two that we do not
target. We target five and file the rest as host-only features.

## What did not port

- Host-specific subagent tools. EGM names `invoke_subagent`, `spawn_agent`, and
  `task` in its own skill bodies. We moved every name into
  [../harness.md](../harness.md).
- The EGM wrapper around the whole workflow. A single orchestrator that owns
  every step made the router and the review engine one skill. We split them.
- Bootstrap automation. EGM bootstraps a directory tree with worker subagents.
  We keep it experimental and behind an approval gate above fifteen directories.
- The directory-plugin packaging script. It targets two publication surfaces we
  do not ship to at 0.1.0.
- Antigravity and Muse support. Both need a live verification we did not run.

## What EGM gets right about verification

EGM reports install, workflow, and isolation as three separate results, and the
repository says so in public. Its issue tracker records that Codex and
Antigravity can leak instruction files into a child even when parent turns are
isolated. We adopted that three-result reporting wholesale, and we keep the same
distinction in [../harness.md](../harness.md).

A passing install is not a passing review. A fresh conversation is not a fresh
context. A read-only tool list is not a filesystem sandbox.

## Sources

- https://github.com/google/elephant-goldfish-model
- https://github.com/google/elephant-goldfish-model/blob/main/docs/harnesses.md
- https://github.com/google/elephant-goldfish-model/blob/main/docs/claude.md
- https://github.com/google/elephant-goldfish-model/blob/main/docs/codex.md
- https://github.com/google/elephant-goldfish-model/blob/main/docs/opencode.md
- https://github.com/google/elephant-goldfish-model/blob/main/TESTING.md
