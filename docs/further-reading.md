# Further reading

Topic-to-book map for deeper calls than a rule pack gives. When the config
carries a `# library:` path, skills open these directly and cite the chapter.
Without a library, the row still names what to look for. No book text lives in
this repository.

## Deepens an existing pack

| Topic | Read | Feeds |
| --- | --- | --- |
| Deep versus shallow modules | A Philosophy of Software Design, Ousterhout | `rules`, feature design |
| Dependency rule in practice | Clean Architecture, Martin | `rules`, review profiles |
| Smell catalog | Clean Code, Martin |
| Object design, SOLID in practice | oop-design pack; deepen with 99 Bottles of OOP, Metz, and Clean Code Cookbook, Contieri | `no-comments`, code profile |
| Named refactors | Refactoring, Fowler | refactoring playbook |
| Aggregate boundaries | Implementing DDD, Vernon | `ddd`, ddd-model playbook |
| Breakers, bulkheads, timeouts | Release It, Nygard | production review |
| Tracer bullets | The Pragmatic Programmer | prototype playbook |
| Seams and characterization | Working Effectively with Legacy Code, Feathers | `diagnose`, refactoring |

## Fills a gap the packs do not cover

| Topic | Read | Feeds |
| --- | --- | --- |
| Test doubles, behavior assertions | The Art of Unit Testing 3e, Khorikov | `tdd` |
| Sagas, leases, fencing, write-ahead | Patterns of Distributed Systems, Joshi (free at distributedpatterns.io) | distributed changes, ddd-modernize |
| Estimation and trade-off framing | System Design Interview v1-2, Xu | `egm-brainstorm` on large systems |
| Entitlement decisions, ABAC/RBAC | Authorization in Action, Windley | authorization design |
| Steady-state experiments | Chaos Engineering, Rosenthal | `diagnose` on production |
| DI, streams, backpressure | Node.js Design Patterns 4e, Mammino | Node work |
| Error boundaries, integration discipline | Zero to Production in Rust, Palmieri | Rust work |
| Memory ordering, lock choice | Rust Atomics and Locks, Bos | `diagnose` on concurrency |
| Narrowing, discriminated unions | Effective TypeScript 2e, Vanderkam | type-system principle |
| Contract sizing and versioning | Mastering API Architecture, Gough | API spec review |
| LSP and composition in practice | 99 Bottles of OOP, Metz | `rules` |
| Line budgets, encapsulation over comments | Code That Fits in Your Head, Seemann | `no-comments` |
| Decomposition and transactions | Microservices Patterns, Richardson | `ddd-modernize` |
| API contract testing | Testing Web APIs, Winteringham | `tdd` on APIs |

## Not adopted

Language and framework primers teach what models already know, and lifestyle
titles are out of scope. Prefer concept books over editions; when several
editions exist, the newest one wins.
