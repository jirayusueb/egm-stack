# 0001. Adapt and extend, do not fork

- Status: Accepted
- Date: 2026-11-06

## Context

Two projects solve most of this problem. The Elephant-Goldfish Model has the
review protocol. pstack has the router, the playbooks, and the principle leaves.
Both are license-compatible with our outbound Apache-2.0. Forking either one
would give us a working stack today. It would also give us a maintenance branch
we cannot keep in sync, because both upstreams still change.

## Decision

We adapt and extend. We take the architecture and the contracts. We write our own
skill bodies in harness-neutral language. We vendor only files that are code, and
only when the licence allows it, with a pinned commit and an attribution header.

## Consequences

We own every word we ship, which means we can support five hosts and change our
minds about a skill. We also own the drift from each upstream. `UPSTREAM.md`
records the pins and the known divergences, and a reader can see what we changed.
Refreshing an upstream idea is a deliberate act, not a merge.

The cost is slower adoption of upstream fixes. The benefit is a stack that no
upstream can quietly redefine.
