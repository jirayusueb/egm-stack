---
name: principle-migrate-callers-then-delete-legacy-apis
description: "Apply when introducing a new internal API while old callers exist. Migrate every caller and delete the old API in the same wave."
license: Apache-2.0
---

# Migrate Callers Then Delete Legacy APIs

Move every caller to the new API and delete the old one in the same change. Do not keep a compatibility layer.

**Why:** A compatibility layer outlives its reason. It doubles the surface to test, hides remaining callers, and turns a temporary bridge into permanent debt.

**Applies when:**
- No external users depend on backward compatibility.
- The project can absorb a coordinated breaking change.
- The new API is part of a simplification or refactor.

**Pattern:**
- Find every caller, including tests, scripts, and documentation.
- Update tests to assert the new contract.
- Delete tests that only protect pre-refactor internals.
- Delete the old API in the same change that moves the last caller.

**Stop:** If an external consumer needs compatibility, this principle does not apply. Version and deprecate instead.

Sources: none
