### DDD model

**You own the model. Terms, boundaries, and invariants, in that order.**

Read first: the `domain-driven-design` and `domain-driven-design-distilled` rule packs.

1. Name the subdomain. State whether it is core, supporting, or generic, and why.
2. Draw the bounded context around the area. Keep one model per context and name the boundary.
3. Write the ubiquitous language. Add every term the team uses to the glossary in `domain_model.md`.
4. Run event storming or scenario walk-throughs. List the events, commands, and policies the domain needs.
5. Name the aggregates and their invariants. One aggregate is one consistency boundary.
6. Map context relationships. Name the pattern for each boundary, such as partnership, customer and supplier, or conformist.
7. Choose tactical patterns with **ddd**. Decide between entity, value object, aggregate, repository, and domain service.
8. Write model tests. Each invariant and each state change gets a test that fails when the model is wrong.

**Reply:** the subdomain, the contexts, the glossary, the aggregates and invariants, and the model tests. Point at `domain_model.md`.
