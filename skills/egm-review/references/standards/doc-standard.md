# Documentation standard

The quality bar for README files, guides, and operational documents. A doc
passes when a first-time reader can act on it without asking anyone.

## Runnability rule

Every command the reader is told to run must work as written, in order, from a
clean checkout. Name prerequisites with versions. Name every environment
variable and its default. If the command cannot work as written, the doc fails.

## Ownership rule

The doc names its owner or maintainer, and a place to report problems. An
operational doc without an owner fails.

## Structure

- A one-line purpose under the title: what this is and who reads it.
- Ordered sections a scanner can land on: purpose, prerequisites, install or
  run, verify, next steps.
- No unstructured paragraph longer than five sentences carrying different
  topics.

## Claims

- Every capability claim is checkable or removed. "Flexible" and "many things"
  fail.
- Every external term is defined on first use or linked.
- Subjective quality words are dropped, not softened.

## Verification

The doc contains one step that proves the reader succeeded, such as a URL that
returns a known response, or a command with expected output.
