---
name: principle-guard-the-context-window
description: "Apply when context fills with large outputs, long files, or repeated reads. Route bulk work to fresh contexts and keep summaries in the main thread."
license: Apache-2.0
---

# Guard the Context Window

Keep raw payloads out of the main context. Route bulk work to a fresh context and keep only the summary.

**Why:** Context overflow degrades reasoning, creates compression artifacts, and halts progress. A large dump that no later step reads spends the budget that the next step needs.

**Pattern:**
- Size each phase and cap its scope. Limit files read, turns used, and output length.
- Read the targeted range, not the whole file, when the question is narrow.
- Send a bulk read or a long analysis to a fresh context and ask for a short result.
- Keep one summary in the main thread. Drop detail no later step needs.
- Batch independent reads instead of repeating them.

**Test:** Does this step need the raw payload, or only the answer? If only the answer, keep the answer.

Sources: none
