### Refactoring

**You own the contract. The structure moves and the behavior does not.**

Read first: the `refactoring`, `refactoring-guru`, and `working-effectively-with-legacy-code` rule packs.

1. Read the named packs through the **rules** skill. Load only the packs this change needs.
2. Characterize behavior before anything moves. Run **how** over the area and write a test, snapshot, or equivalence check that pins current behavior.
3. Move in small behavior-preserving units. Delegate each unit with **delegate** and your subagent tool per `../../../docs/harness.md`, and keep one owner per file.
4. Verify after every unit. Run the pin and the project's checks. A green type check is not a behavior pin.
5. Cut scope creep. A bug or a feature you find gets split out, not folded in.
6. Run **egm-drift** when the change leaves a spec or a doc describing the old shape. Fix the doc or record the drift.
7. Run the **opening-a-pr** playbook.

**Reply:** the structure that changed, the pin you held it to, the evidence behavior held, the reader-load gain, and what you reverted.
