# Changelog

All notable changes to this project are documented here. The format follows
Keep a Changelog, and this project adheres to Semantic Versioning.

## [0.2.1] - 2026-11-06

### Fixed

- Removed `disable-model-invocation` from all 47 skills. omp's Agent Plugins loader treats an unknown frontmatter field as an error, logs `Skipping skill`, and drops the whole skill, so the plugin installed but no `/skill:egm-*` command appeared.
- Skills are now model-invocable on every host. Descriptions and `egm-mode` control routing. ADR-0002 records the reversal.

## [0.2.0] - 2026-11-06

### Added

- omp (Oh My Pi) harness adapter, install route, capability row, and research coverage.
- `egm-setup` detects `provider/model` values and host effort levels, maps a budget to the nearest available level, and writes host rule files only for hosts in use.

### Changed

- The design specification adds success criteria, problem evidence, ownership and approval gates, cost estimates, security notes, and a risk table with revisit triggers.
- Command forms are documented per install route. A plugin namespaces skills, for example `/egm-stack:egm-setup`.
- `delegate` splits a `provider/model` value at spawn time.
- The validator checks model-role documentation, command forms, adapter presence, and version parity between `package.json` and the manifests.

### Fixed

- Regenerated `docs/skills.md` after skill edits.
- Layer, gate ownership, churn, and artifact definitions in the design spec.

## [0.1.0] - 2026-11-06

### Added

- Router `egm-mode` with twelve playbooks.
- Design loop: `egm-brainstorm`, `egm-draft`.
- Review engine `egm-review` with five stages, loop mode, and seven profiles.
- `egm-resolve` for triage and approved fixes.
- `egm-ask`, a read-only stage-aware assistant.
- `egm-setup` with seventeen model roles, provider/model values, and host effort levels.
- `egm-drift` and experimental `egm-bootstrap`.
- `delegate` for subagents and durable teams, including Agent Teams.
- `rules` with fourteen MIT-licensed condensed rule packs.
- `how`, `why`, `arena`, `swarm`, `tdd`, `no-comments`, `reflect`.
- Writing standards: `unslop`, `technical-writing`, `ste100` with a heuristic linter.
- Domain-driven design: `ddd` plus three DDD playbooks and a domain-model standard.
- Experimental `statechart` with a portable Node launcher.
- Twenty-four principles with source attribution.
- Static validation, generated indexes, behavioral eval suites, and CI.
- Harness adapters for Claude Code, Codex, Cursor, OpenCode, omp (Oh My Pi), and
  Agent Teams.

### Known limits

- `statechart` requires Node 22.18 or later, Java, and TLC; its tests are opt-in.
- Harness installs other than Claude Code are documented as unverified.
- `egm-bootstrap` and `statechart` are experimental.
