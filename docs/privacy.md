# Privacy

EGM Stack is a set of instructions. It runs inside your agent host. It has no
service, no account, and no telemetry. This page states what the skills and the
repository do, and what they leave to the host. The design spec is at
[designs/egm-stack.md](designs/egm-stack.md).

## Zero telemetry

The repository sends no analytics, no usage events, no crash reports, and no
identifiers. It makes no network call on its own, with one exception. The
`statechart` skill downloads Java and TLC with mise on its first run, because a
model checker is not bundled. Every other network call comes from your host or
from a command you type. The npm scripts read and write files in the repository
and do not upload.

## Host models and permissions

Skills call the model and the tools that the host provides. They never carry an
API key, a token, or a model credential. Your host applies its own model choice,
its own permission prompts, and its own sandbox. Reviews need a fresh context.
The host provides it, and the host's rules decide what the child can read. A
read-only tool list is not a filesystem sandbox, and we do not describe it as
one. See [harness.md](harness.md) for what each host actually enforces.

## Artifacts stay in your workspace

Drafts, reports, and review findings are written to `.egm/<slug>/` in your
workspace, or to the folder you name in `EGM artifact directory: <path>`. They
are your files. Nothing transmits them anywhere.

`reflect` reads a session transcript from the host's local storage to summarize a
session. It reads only the folder for the current workspace, and it never uploads
or moves the transcript. If the host has no readable transcript, `reflect` stops
and says so. Delete `.egm/` to remove the working material. Promoted designs live
under `docs/designs/` and stay until you delete them.

## Secrets

`egm-setup` writes model roles to a plain markdown file under your home
directory. It records model slugs and effort levels only. It never writes a key,
a token, or an environment value. A role file that names a model is not a
credential. Do not put secrets in a brief, an artifact, or a review report. A
subagent reads what the brief gives it, and a report can outlive the session.

## Third parties

The repository cites books, standards, and upstream projects. A link is not a
transfer. Opening a link follows your browser, not this repository. Vendored
files are listed in [../UPSTREAM.md](../UPSTREAM.md) and [../NOTICE](../NOTICE),
with the source, the commit, and the licence.

This page describes version 0.18.0. A change that alters what leaves your machine
is a decision record under `docs/adr/`.
