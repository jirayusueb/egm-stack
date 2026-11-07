### Opening a PR

**You own the change until it has a reviewable pull request.**

Read first: the `release-it` and `the-pragmatic-programmer` rule packs.

1. Run **no-comments** over the diff. Keep only comments that explain a non-obvious why.
2. Run **technical-writing** over the pull request title and body. Then run **unslop**. When a design doc exists, its verification report from **egm-verify** goes in the evidence section.
3. Rebase into small ordered commits. Each commit is landable and tells one step of the story.
4. Assemble the body from the artifacts. The why comes from the design doc, the verdict from the consolidated review report, and the evidence from the verification run. State the scope and the blast radius.
5. When the reviewer needs the full findings, attach the reports with [export.md](../../../docs/export.md). Ask before posting anything.
6. Ask for human approval before you open the pull request. After approval, open it and post the link.
7. Report the link, the checks you ran, and the follow-ups that are out of scope.

**Reply:** the pull request link, the verification evidence, and what the body leaves out. Link only the pull request you just opened.
