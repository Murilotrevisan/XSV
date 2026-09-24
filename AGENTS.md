# Shared agent instructions

This file is the canonical entry point for every agent working on XSV.
`CLAUDE.md` and `GEMINI.md` only direct their readers here. Keep shared instructions
here and link to the owning document instead of duplicating its rules.

## Required reading

Before editing:

1. Read [README.md](README.md) and [docs/CONTEXT.md](docs/CONTEXT.md).
2. Read [docs/WORKFLOW.md](docs/WORKFLOW.md), including the review policy.
3. Read the README and relevant requirements, interfaces, and trials for the
   area touched by the task. Follow applicable directory-specific instructions.
4. Confirm the current worktree, branch, and working-tree status. Preserve
   unrelated work and identify overlapping edits before proceeding.

## Working rules

- Use an isolated worktree and a task branch based on `develop`. Follow the
  naming and integration rules in the workflow.
- Local task-branch commits are allowed. Every merge requires explicit human
  approval of the actual changes. Preparing work does not authorize publishing
  branches, opening PRs, tagging releases, or pushing changes.
- Work within the requested scope. Do not infer technical requirements or select
  hardware, autonomy features, software layers, or toolchains from folder names.
- Keep public documentation self-contained. Do not introduce private local paths,
  unrelated project references, personal conversation transcripts, credentials,
  or organization-internal material.
- Write repository documentation in English. Use relative links and portable
  commands where practical; document required tools when introducing a script.
- Maintain one authoritative location for each rule or interface. Link to it
  from affected areas. Document cross-discipline impacts in the same change.
- Distinguish proposed, implemented, simulated, measured, and physically verified
  results. Unknown values remain explicitly unknown; do not invent evidence.
- Run checks appropriate to the change. Report what was actually exercised,
  including failures and unperformed checks. Do not weaken checks to hide a
  regression; explain any necessary change to an acceptance criterion.
- Keep changes and documentation proportional to the task. Add automation when
  it supports an actual workflow; avoid speculative frameworks and empty policy
  documents. Preserve the agreed directory skeleton with `.gitkeep` where empty.
- Finish reviewable work with the complete
  [review summary](docs/templates/REVIEW_SUMMARY.md). Keep every section and use
  `Not applicable — <reason>` where appropriate.

## Ownership

Shared project context and requirements live in `docs/`. Area-specific details
live with their implementation. All agents follow the same rules regardless of
provider; branch prefixes identify the contributor, not exclusive ownership of
a discipline. Coordinate changes to shared documents before parallel edits.
