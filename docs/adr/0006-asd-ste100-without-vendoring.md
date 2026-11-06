# 0006. ASD-STE100 without vendoring

- Status: Accepted
- Date: 2026-11-06

## Context

ASD-STE100 is a controlled language with 53 writing rules and a dictionary of
about 900 approved words. Teams that write safety text are often required to
follow it. The standard is free to obtain, and it is not open source. It is owned
and trademarked by ASD, and the official copy is a PDF from the maintenance
group.

A conformance checker would need the rule text and the dictionary. We cannot ship
either, and a copy of a copy would carry the wrong licence and the wrong edition.

## Decision

We do not vendor the standard. `ste100` carries an original paraphrase of the
publicly described constraints, a heuristic linter, and a clear statement that a
conformance claim needs the official copy. `technical-writing` owns structure and
voice, and `ste100` runs after `unslop` on procedures and safety text.

## Consequences

We can help a writer without redistributing anything. The linter flags measurable
patterns, such as long sentences, passive voice, nominalizations, and noun
stacks. It cannot check dictionary compliance, and we say so in the skill.

The cost is a partial tool. A team with a real conformance obligation must buy
nothing, because the standard is free, but it must obtain the copy, train a
writer, and check the result. Our docs point at the official site.

No rule text is duplicated between `ste100` and `unslop`. A rule has one home,
and a review cites that home.
