# ASD-STE100

ASD-STE100 Simplified Technical English is a controlled natural language for
technical documentation. The `ste100` skill paraphrases its writing constraints
and lints a draft against heuristics. This document records what the standard is,
what it is not, and why we do not vendor it.

## What it is

The standard has two parts.

- 53 writing rules in 9 sections. The rules cover word choice, grammar, sentence
  structure, and style.
- A controlled dictionary of approved words, about 900 of them, each with one
  meaning and one part of speech. The dictionary also lists about 1200 words that
  are not approved, with suggestions to replace them.

A writer may also use technical nouns and technical verbs that belong to the
company, industry, or subject field. The rules explain how to use those terms.

## Who owns it

ASD-STE100 is owned by ASD, the Aerospace, Security and Defence Industries
Association of Europe, in Brussels. It is a copyright and a trademark, EU Trade
Mark number 017966390. The official copy is free on request from the STEMG site.
It is not open source, and it is not public domain.

The current edition is Issue 9, dated 15 January 2025. The site records that STE
became an international standard in 2025, and that Issue 9 is also published as a
FAIR digital resource through Zenodo with a persistent DOI.

## Why it fits our problem

STE was created for aircraft maintenance documentation, where a reader with basic
English must not misread an instruction. That is close to our problem. A skill
body is read by a model and by a tired engineer, and both do better with one
meaning per word and one instruction per sentence.

The parts we use in `technical-writing` and `ste100` are the shape, not the
dictionary. Short sentences. Active voice. One instruction per sentence. Verbs
for actions, not nouns. No synonym chains for the same object.

## Our approach

We do not redistribute the standard. We do not copy the rules. We write an
original paraphrase of the publicly described constraints, and we say on every
page that a conformance claim needs the official copy.

The `ste100` skill ships a heuristic linter. It flags measurable patterns, such
as a sentence over twenty words, a passive construction, a nominalization, a
stack of three nouns, and a synonym for one object. The linter is a prompt
procedure, not a full checker. It cannot verify dictionary compliance, because
the dictionary is not ours to ship.

Two rules follow for review.

1. `unslop` runs first, because it removes AI tells. `ste100` runs second, on
   procedures and safety text.
2. No rule text is duplicated between the two skills. A rule has one home.

## The limits we state

- A clean lint is not a conformance claim. It is a reduced set of known risks.
- The linter checks patterns, not meaning. It cannot tell whether a sentence
  says the wrong thing correctly.
- The dictionary is the hard part of STE, and we do not ship it.
- A team that needs real conformance must get the official copy, train a
  writer, and check the result against it.

## Licence note

`NOTICE` records the attribution. The repository states that it does not
redistribute the specification or the dictionary, and that it summarizes
publicly documented writing constraints. `UPSTREAM.md` lists no STE file,
because there is none to pin.

The safe pattern is the one we use for book rules too. Cite the source. State
the limit. Keep the reader's path to the official document open.

## Sources

- https://www.asd-ste100.org/
- https://www.asd-ste100.org/about_STE.html
- https://www.asd-ste100.org/STE_downloads.html
- https://www.asd-ste100.org/STE_faq.html
