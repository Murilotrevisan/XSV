# Development and review workflow

## Branches

| Branch | Purpose |
| --- | --- |
| `develop` | Integration of reviewed tasks; base and target for ordinary work. |
| `main` | Approved project milestones published as releases. |
| `[agent/]feature/<slug>` | A scoped addition, including documentation or organization. |
| `[agent/]fix/<slug>` | A scoped correction. |

Agent-created branches use their agent prefix, for example
`codex/feature/repository-foundation`, `claude/feature/<slug>`, or
`gemini/fix/<slug>`. Human-created branches may omit the prefix. Use short,
descriptive lowercase kebab-case slugs. Branches belong to tasks, not permanent
agent workspaces or entire disciplines.

Start task branches from the current agreed `develop`. Do not commit directly to
`develop` or `main`. If a local `develop` differs from its remote counterpart,
inspect the difference and establish the correct base before starting; never
silently reset it.

## Worktree isolation

Each concurrent task uses its own worktree and task branch. Keep worktrees outside
the repository checkout. A typical creation command, run from an existing
checkout, is:

```sh
git worktree add ../xsv-codex-example -b codex/feature/example develop
```

An existing isolated worktree may be assigned a task branch without creating
another worktree. Check `git status --short --branch` and `git worktree list`
before changing anything. Never switch branches in another agent's directory or
remove a worktree that contains unreviewed work.

Git worktrees isolate working files, but share repository refs and configuration.
Coordinate branch operations and edits to common documents. A task should state
its objective, affected areas, dependencies, and completion criteria; a task
description or issue is sufficient, without a mandatory additional planning file.

## Commits and synchronization

Local commits on task branches are allowed without per-commit approval. Use
meaningful messages and coherent changes; there is no required commit count.
Review the diff before committing and preserve unrelated work.

Every merge requires explicit human approval, including merges used to refresh
a task branch from `develop`. If the base advances, inspect the impact and propose
the necessary synchronization. Do not bypass review through rebasing,
cherry-picking, resetting, or moving protected branch refs. History rewrites also
require approval.

Permission to commit locally is not permission to push, open a PR, create a tag,
or publish a release. Perform those actions only when requested or authorized.

## Review handoff

Use [the review summary template](templates/REVIEW_SUMMARY.md) verbatim for section
names and order. Complete every section. For inapplicable fields or diagrams,
write `Not applicable — <reason>`; do not remove the section.

The summary must identify the source branch, target branch, reviewed commit or
uncommitted state, and verification status. Provide file links, actual check
results, limitations, and remaining work. Never present an unrun check as passed.
For uncommitted work, state that the working-tree diff is the review scope.

Diagrams should explain the changed behavior or design:

- Software: runtime sequence, state, or activity diagrams and affected layers.
- Mechanical design: dimensioned drawings, with units and relevant views.
- Hardware: electrical diagrams, plus dimensioned drawings when physical layout,
  board geometry, or mounting changes.
- Mixed changes: include each applicable view and link their editable sources.
- Documentation-only organization: explain why engineering diagrams and software
  layers are not applicable. Do not invent them to fill the template.

Mermaid is suitable for software diagrams in Markdown. Engineering drawings need
readable dimensions; retain their editable source and a viewable export when the
source cannot be previewed. Identify conceptual diagrams as conceptual.

The summary can be delivered in chat or the PR description using English section
names. Do not commit a duplicate report solely to repeat the handoff. Durable test
evidence and design records belong in their documented repository locations.

## Integration and milestone releases

1. Finish the scoped change and relevant verification on its task branch.
2. Present the complete review summary to the human reviewer.
3. Wait for explicit merge approval. Approval applies to the reviewed changes and
   named target, not future changes or releases.
4. Integrate into `develop` only as approved. If conflicts or material changes
   arise, resolve and recheck on the task branch, then submit the revised summary
   before completing integration.
5. When a project milestone is explicitly defined, prepare a release summary from
   `develop`, including scope, evidence, and known limitations. Integration into
   `main`, the version/tag, and release publication require explicit approval.

Do not invent a release cadence or versioning scheme before the first milestone
needs one. The initial repository commit predates this workflow; future updates
to `main` follow this policy.

## Artifact hygiene

Version editable sources, required configuration, small useful evidence, and
selected manufacturing deliverables. Keep caches, transient build outputs, and
large regenerable solver output out of Git. Record how to reproduce generated
deliverables and which source revision/configuration produced them.

Use `.gitkeep` for empty reserved directories, removing it once a real file is
added. Do not remove placeholders from unrelated empty directories. Adopt large
file storage only when actual artifact sizes justify it.
