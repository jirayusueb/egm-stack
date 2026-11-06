# Epistemics

Code shows what it does, not why it exists. The why lives in commits, PRs, tickets, docs, and conversations. All of those are incomplete, biased, and sometimes missing. A confident guess that fills a gap misleads the user. This framework keeps each claim at its true strength.

## Confidence tiers

Every claim sits in one tier. The tier sets the section and the phrasing.

### 1. Direct

An explicit, textual citation answers the question. Something an author wrote that says why, not "the code does X so the author must have wanted X". Examples are a PR description, a ticket, a code comment, a design doc, or a chat message from the author.

Phrasing. Confident, present tense, cited. "This exists because X."

### 2. Supported

Several pieces of indirect evidence converge on one conclusion. No single source states it. The pattern across sources makes it likely.

Phrasing. Confident but clearly derived, with each item cited. "The evidence points to X, because of A and B."

### 3. Inferred

A reasonable reading of the context that nothing explicitly supports. It is an interpretation, not a fact from the record.

Phrasing. Hedged, with the chain visible. "Given A and B, C seems likely."

### 4. Speculative

A plausible hypothesis on thin evidence, where other explanations fit as well. Worth presenting, because the user may know which is right. Mark it as a guess.

Phrasing. "One possibility is X, but we found no direct evidence."

### 5. Unknown

You looked and could not find out. That is a valid and important outcome. Document it.

Phrasing. "We searched X, Y, and Z and found no evidence." Name what you searched. "We could not find out" is less useful than the list of searches.

## Phrasing guide

Confidence words imply Direct or Supported evidence and need a citation next to them. They are "because", "the reason is", "was designed to", "fixes", "addresses", "solves", and "the team decided". Never use them for an inference.

Hedges signal interpretation. Use them in What We Can Reasonably Infer. "appears to", "seems to", "likely", "suggests", "is consistent with", "one reading is", "plausibly", "may have been", "the evidence points toward".

Avoid these words.

- "obviously". If it were obvious, the user would not be asking.
- "clearly". It usually precedes a claim that is not clear.
- "of course". Same problem.
- "just". It is dismissive and hides uncertainty.
- "I think" and "I believe". Use "the evidence suggests" instead.

## Avoid rationalization

Code that makes sense today may have been written for reasons that no longer apply. Do not retrofit a clean rationale onto messy history. Do not assume the author did the right thing and work backward. Do not assume a consistent pattern was intentional when it might be copy and paste. Do not turn an absence of evidence into evidence of absence.

## The sycophancy trap

Users often embed a hypothesis in the question. Do not confirm it. The guess is a prompt for investigation, not a conclusion. Treat it as one candidate. Check the evidence independently. If the evidence supports it, say so with citations. If not, say so and present what the evidence does support.

## When evidence contradicts

Surface both sources, with citations. Do not pick the one that fits a tidier story. The ticket may say "customer compliance" while the PR says "tech debt cleanup". Both may be true, or one may be wrong. Let the user decide.

## When evidence is missing

An honest "we do not know" is valuable. It tells the user that the answer is not in the obvious places, that they should ask a human, or that the question is not worth more search. Failing to mark a gap and filling it with a confident guess harms the user, because they will act on it. Name each gap concretely. The question, the sources searched, the queries, and what you found.

## Before finalizing

The synthesizer checks every claim in What We Found and What We Can Reasonably Infer.

- Each claim has a citation, or it moves to Inferred or Competing Hypotheses.
- The phrasing matches the tier.
- No code is cited as evidence for its own intent.
- What We Don't Know has specific gaps. An empty section is suspicious.
- The tone is calibrated. A confident answer on weak evidence is the failure this skill exists to prevent.
