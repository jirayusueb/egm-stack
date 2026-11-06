---
name: arena
description: Run a controlled arena for /arena or when one attempt at a non-trivial artifact would lock in the wrong shape. Fan out candidates under one brief, cross-judge them from another model family, pick a base, graft the strongest parts, and verify the result.
license: Apache-2.0
---

# Arena

Open a todo list with one entry per phase before you launch anything.

## Frame

Every candidate gets the same prompt, so the prompt is the contract.

1. State the artifact that each candidate produces.
2. Write the rubric. Use 3 to 6 criteria that a reader can grade on this task. Name what is present or absent, not how the work feels. Candidates never see the rubric.
3. Read the `arena runners` role from the model configuration that `egm-setup` writes. If the role is missing, ask the user for the model to use. Use one runner per design direction. Spawn more runners when the task spans several directions. Repeat one model when the work is generation-bound rather than judgment-sensitive.
4. Give each candidate its own output location. Prefer a separate worktree. Otherwise use a scratch folder outside the repo. Two candidates never write the same file.
5. Write one brief per candidate with `../delegate/SKILL.md`. The brief names the task, the shared grounding, the output path, and the short rationale to return. The rationale names the alternatives considered and what was rejected.

## Fan out

Spawn all candidates at once. Use the background mode that `docs/harness.md` maps for your host. If a candidate produces no output, continue with N-1 and note the dropout.

## Cross-judge

1. Read the `arena cross-judge pool` role from the same configuration.
2. Choose a judge from a model family other than the parent's family. The judge is never from the parent's family.
3. If the pool has no entry from another family, skip the judge, pick the base alone, and say so in the synthesis note.
4. Spawn one read-only judge after the candidates finish. The judge sees the rubric and the candidates by path label. It scores each criterion and recommends a base with a reason.

## Pick

Read every candidate end to end. Score each one against the rubric criterion by criterion. Do not score on overall feel. Compare your pick with the judge. Agreement confirms the pick. Disagreement means the rubric was ambiguous or one reader is biased. Read both reasons before you decide.

Pick the base that a future maintainer can extend most easily without breaking invariants. When two candidates tie, prefer the cleaner boundary or the smaller interface.

## Graft

Walk each losing candidate once for what is worth porting into the base. Expect one or two items per candidate, not most of it. Fold each graft in by hand so one mental model still explains the result. Do not paste code.

When the candidates converge on one shape, note the convergence and ship it. No graft is needed. When they diverge sharply, the frame was too loose. Reframe and rerun instead of averaging the results.

## Verify

Verify the synthesized artifact like any other output. When verification finds a problem, either the frame was wrong and you rerun, or a candidate caught it and you missed the graft. Go back to the step that owns the failure. Do not paper over it.

## Synthesis note

Write a short note next to the artifact. It names the base and why, the judge verdict or the reason the judge was skipped, each graft with its source candidate, each rejection with its reason, any convergence, any dropout, and the verification result.
