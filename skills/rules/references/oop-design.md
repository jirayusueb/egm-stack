<!-- Original work of egm-stack, Apache-2.0. Not condensed from any single book; classic public principles restated. Verify deeper calls against 99 Bottles of OOP or Clean Code in the library. -->

# Object design — condensed rules

## Decision rules

- Prefer composition over inheritance. Inherit only when subtypes are truly substitutable and the base is designed for extension; otherwise compose a small object and delegate.
- Tell, do not ask. Send an object the command it owns the data for instead of reading its fields and deciding outside. Chained getters are a symptom.
- One reason to change per class. When a class serves two callers with different needs, split the interface or the class.
- Depend on abstractions you own, at the boundary where the decision matters. Do not add an interface with one implementation and no second planned.
- Make illegal states unrepresentable. Encode the valid combinations in types instead of guarding booleans.
- Return objects or results, not null. When absence is possible, make absence an explicit type.
- Keep constructors total. An object is valid at birth or construction fails with a reason.
- Encapsulate collections. Expose read-only views or commands, never the live list.
- Replace conditionals on type with polymorphism when the same switch appears twice. Leave a single switch alone.
- Immutability by default. Mutate only where identity and lifecycle demand it, and name the mutating operation after the domain event.

## Trigger rules

- When a method reads another object's fields and branches on them, move the branch into that object or name the missing concept.
- When a subclass overrides a method to throw or do nothing, the hierarchy is wrong. Compose instead.
- When a constructor takes more than three collaborators, a concept is missing between the caller and this object.
- When two fields always change together, they are one concept. Make them an object.
- When a class name contains Manager, Processor, or Helper, name the decision it makes instead.
- When a test must construct unrelated objects to reach the target, the target's collaborators are too wide.
- When the same null check appears at many call sites, absence wants its own type.

## Checklist

- Can any invalid object state exist?
- Does each object answer one question about the domain?
- Is every inheritance branch substitutable in practice?
- Is mutation named after the domain fact it records?
