# Zoom-Out Standard

A design passes when it solves the root problem in the simplest way, reuses what exists, avoids speculative work, and stays at the right altitude.

## Context sufficiency

The document must state what is being built and why. If a fresh reader cannot name the objective and the motivation, stop and request context. Do not review the rest.

## Root problem focus

Solve the underlying problem, not its local symptom. Check the design against the project goals and architecture in the root documentation. A design that patches a symptom without naming the cause is a finding.

## Simplicity and YAGNI

Reject abstractions, paths, and features built only for a future that is not planned. Reject caching, sharding, queues, and asynchronous work without a measured bottleneck. Keep data flow through the fewest components. Leave an interface open to future change without building the future now.

## Anti-weeds

High-level sections describe architecture, interfaces, and data flow. They do not list helper functions or loop variables. Prefer a structural fix to a local workaround. Put new logic in the layer that owns it.

## Leverage existing

Search for an existing utility, module, or pattern before proposing a new one. Confirm that the reusable thing is maintained and does not cross a dependency boundary. Follow codebase and platform conventions. Flag known anti-patterns, such as bypassing standard authentication or hardcoding deployment configuration.
