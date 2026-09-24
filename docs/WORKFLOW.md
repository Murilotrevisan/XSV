# Development and review workflow

## Plan before implementation

Each new execution task starts with a plan using
[the task plan template](templates/TASK_PLAN.md). This applies to software,
hardware, mechanical design, tooling, and documentation changes. Questions,
discussion, and read-only reviews do not require an implementation plan.

Before approval, the agent may inspect sources and documentation, investigate
dependencies, run non-destructive baseline checks, prepare an isolated worktree,
and draft the plan and explanatory diagrams. Do not begin implementation, change
product files, or run physical trials during this investigation. Present relevant
findings and uncertainties so the plan can be reviewed on evidence.

The plan states the objective, context, proposed approach, expected file changes,
affected software layers, applicable diagrams, and planned verification. Keep the
template's section names and order. For inapplicable sections, use
`Not applicable — <reason>`. A small task can have a short plan; do not invent
software layers or diagrams for changes that do not affect runtime or design.

Software diagrams show the intended runtime interaction, state transitions, or
activity, including relevant failure paths. Hardware and mechanical plans use
conceptual electrical diagrams and dimensioned sketches where applicable. Mark
unknown dimensions and interfaces as unresolved instead of inventing values.
These planning diagrams describe a proposal, not a validated design.

Present the plan and wait for explicit human approval before implementation.
Silence, the original task request, and permission to commit locally are not plan
approval. The human may explicitly waive planning for a particular task; do not
carry that exception into later tasks.

Approval covers the proposed scope, approach, and verification. Routine details
within that scope do not require repeated approval. If investigation during
implementation reveals a material change to scope, interfaces, affected layers,
runtime behavior, or acceptance criteria, pause the affected work and present the
revised portion of the plan for approval. Continue independent approved work when
possible. Do not defer disclosure of a material deviation until final review.

Keep the plan and approval reference in the task conversation or issue; a separate
committed planning document is not mandatory. Use English section names, as with
the review summary. Preserve an accessible handoff reference when another agent
takes over. Approved lasting decisions belong in the owning project documents.

The task progresses through three distinct review stages:

| Stage | Human decision | Agent action |
| --- | --- | --- |
| Plan | Approve the proposed approach. | Implement, verify, and commit locally. |
| Completion summary | Approve publication of the reviewed changes. | Push the task branch to `origin` and open or update its PR. |
| GitHub PR | Review at the desired depth and perform the merge. | Address requested changes; never merge or enable auto-merge. |

Plan approval does not authorize publication. Summary approval authorizes
publication, not an agent-performed merge.

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
Coordinate branch operations and edits to common documents. Use the approved
task plan to communicate scope, dependencies, and completion criteria.

## Commits and synchronization

After plan approval, local implementation commits on task branches are allowed
without per-commit approval. Use meaningful messages and coherent changes;
there is no required commit count.
Review the diff before committing and preserve unrelated work.

Every merge requires explicit human approval, including merges used to refresh
a task branch from `develop`. If the base advances, inspect the impact and propose
the necessary synchronization. Do not bypass review through rebasing,
cherry-picking, resetting, or moving protected branch refs. History rewrites also
require approval.

Keep implementation local until the human approves its completion summary.
That approval authorizes pushing the reviewed task branch to `origin` and opening
or updating its PR against the named target, without asking again. It does not
authorize direct pushes to `develop` or `main`, unrelated changes, force pushes,
tags, or release publication.

## Review handoff

Use [the review summary template](templates/REVIEW_SUMMARY.md) verbatim for section
names and order. Complete every section. For inapplicable fields or diagrams,
write `Not applicable — <reason>`; do not remove the section.

The summary must identify the source branch, target branch, reviewed commit or
uncommitted state, and verification status. Provide file links, actual check
results, limitations, and remaining work. Never present an unrun check as passed.
For uncommitted work, state that the working-tree diff is the review scope.
Reference the approved plan (or explicit waiver), compare delivered work against
it, and identify deviations and their approval where required. Report actual
verification results against planned checks, including checks not performed.

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

Present the summary in the task conversation using English section names before
publishing. Once approved, use it as the PR description, making it self-contained
for a reviewer who has not read the conversation. Do not commit a duplicate report
solely to repeat the handoff. Durable test evidence and design records belong in
their documented repository locations.

## Integration and milestone releases

1. After plan approval, finish the scoped change and relevant verification on
   its task branch.
2. Present the complete review summary and wait for explicit approval to publish.
   Identify the reviewed commits and target branch. If the human requests changes,
   revise locally, verify, and resubmit the summary.
3. After summary approval, push the reviewed task branch to `origin` and open a PR
   targeting `develop`. If an open PR already exists for the task, update it instead
   of opening a duplicate. Use the approved summary as the description and return
   the PR link. Approval covers only the reviewed changes and named target.
4. The human chooses whether to inspect the full diff or rely on the summary, and
   performs the merge on GitHub. Agents do not merge the PR, enable auto-merge, or
   integrate the work by directly moving `develop` or `main`.
5. Follow-up changes, including conflict resolutions, are verified locally and
   require an updated summary approval before another push. Seek renewed plan
   approval only for material deviations as defined above. Do not treat approval
   of an earlier summary as permission to publish later changes.
6. When a project milestone is explicitly defined, prepare a release summary from
   `develop`, including scope, evidence, and known limitations. After approval,
   open the milestone PR against `main` for the human to merge on GitHub. The
   version/tag and release publication require separate explicit authorization.

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
