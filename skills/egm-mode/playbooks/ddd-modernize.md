### DDD modernize

**You own the path from the legacy model to a modeled core.**

Read first: the `implementing-domain-driven-design` and `working-effectively-with-legacy-code` rule packs.

1. Pick the core investment. Say which subdomain earns a real model and which ones keep simple CRUD.
2. Map the legacy boundaries. Record where the old model, data, and transactions live.
3. Insert an anti-corruption layer or a published language at each boundary you cross. Never share the legacy model.
4. Extract incrementally. Move one use case at a time behind the new boundary, delegate the work with **delegate**, and keep the old path working until the new one is proven.
5. Keep supporting subdomains simple. A CRUD module is a valid answer when the domain has no rules to model.
6. Write migration tests. Each extracted use case gets a test that pins the old behavior and the new behavior.
7. Write the plan. Order the extraction by risk, name the check for each unit, and hand the plan to the feature playbook.

**Reply:** the core investment, the boundary plan, the order of extraction, the migration tests, and the risk you are carrying.
