# Re-Implementation Standard

A document passes when a reader who does not know the codebase can write functionally identical code using only the document.

## The zero-assumption rule

The reader must not guess a parameter default, error handling, a design pattern, or an output schema. State every behaviorally significant contract. An implicit behavior is a defect in the document. Guessing is not allowed as a reader strategy.

## External contracts

Document what a caller can observe.

- **APIs.** Signatures, types, expected behavior, and failure results.
- **Logic.** Control flow, algorithms, validation, and state transitions.
- **Data.** Schemas, serialization, and stored state.
- **Side effects.** Writes, network calls, logging, and metrics.
- **Dependencies.** System integrations and library behavior that affects results.
- **Configuration.** Flags, parameters, hooks, and defaults.
- **Constraints.** Hard limits, timeouts, retry counts, and assumptions.
- **Errors.** Edge cases, empty states, and failure handling.

## Excluded internals

Leave out syntax, loop shape, variable names, private helpers, internal collections, and file layout that users cannot observe. Describe what changes behavior, not how the author happened to write it.

## Acceptance notes

- A behavior that differs between two plausible readings of the document is a gap.
- A default that the reader must infer is a gap.
- An error path with no stated outcome is a gap.
- A side effect outside the documented interface is a gap.
