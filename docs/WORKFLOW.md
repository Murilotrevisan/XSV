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

The task has two review stages:

| Stage | Human decision | Agent action |
| --- | --- | --- |
| Plan | Approve the proposed approach and its publication for review. | Implement, verify, commit, push the task branch to `origin`, and open or update its PR with the review summary. |
| GitHub PR | Review at the desired depth and perform the merge. | Address requested changes; never merge or enable auto-merge. |

The completion summary is reviewed in the PR alongside the implementation. There
is no separate pre-push summary approval. Plan approval covers publication for
review, not an agent-performed merge.

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

Every new agent-authored commit must use the following attribution format, with
the identity of the agent that actually implemented the changes:

```text
Co-authored-by: AGENT - MODEL (EFFORT) <AGENT_EMAIL>
```

`AGENT` is the executing tool/agent, such as Codex, Claude, or Gemini. `MODEL` is
the actual model identifier or verified version used for the work. `EFFORT` is
the effective reasoning/thinking setting, using the provider's own value; do not
translate a budget or an automatic setting into a guessed `high` or `low`.

### Verify your own session before committing

This procedure applies equally to every agent, not only Codex:

1. Inspect your active session's status, resolved request metadata, or current
   session log to identify the model and effort used for the changes. Use your
   own runtime's evidence, not another agent's example or earlier commit.
2. Consult your provider's documentation when necessary to locate or interpret
   those fields. Web research can explain how to inspect a runtime; it cannot
   establish which model served your local session. Defaults, installed versions,
   model catalogs, and the latest product announcement are not session evidence.
3. Recheck after a model switch, resumed session, or delegated contribution. Credit
   each distinct agent/model/effort combination that actually contributed, using
   separate trailers when necessary. Do not label earlier work with the current
   model merely because you are committing it now.
4. If a required value cannot be established, report what you checked and request
   confirmation or an explicitly approved `unverified` value before committing.
   Use `not applicable` for effort only when its absence is confirmed, not because
   you could not discover it. Never silently guess or copy example values.
5. Identify the evidence type briefly in the review summary, such as "active
   session metadata" or "runtime status". Do not publish raw session logs, private
   paths, credentials, or unrelated conversation content.

### Agent identities

Select only the row matching the agent that did the work. The model and effort
are deliberately placeholders in the examples; replace them from session evidence.
Identity references below were checked on 2026-09-24.

| Agent | GitHub account | Attribution email | Status |
| --- | --- | --- | --- |
| Codex | [@codex](https://github.com/codex) | `codex@openai.com` | GitHub association verified on an XSV commit. |
| Claude | [@claude](https://github.com/claude) | `noreply@anthropic.com` | Claude attribution convention; use only for Claude work. |
| Gemini | [@gemini-cli](https://github.com/gemini-cli) | Candidate: `218195315+gemini-cli@users.noreply.github.com` | Community-documented association; official Google ownership not verified. Validate for the executing integration before use. |

GitHub associates a co-author using the email in the
[commit trailer](https://docs.github.com/en/pull-requests/how-tos/commit-changes/creating-a-commit-with-multiple-authors).
For Gemini, the candidate above comes from a
[pinned upstream discussion](https://github.com/google-gemini/gemini-cli/issues/12419);
it is not a claim that the account is Google-owned. Before the first Gemini commit,
verify the appropriate identity from the integration's official guidance or ask
the owner to approve a documented convention. Do not substitute an unrelated bot
or invent an address based on a product name.

```text
Co-authored-by: Codex - MODEL (EFFORT) <codex@openai.com>
Co-authored-by: Claude - MODEL (EFFORT) <noreply@anthropic.com>
```

These are alternatives, not trailers to copy together. Claude must use `Claude`,
its own active model/effort, and the Claude email; Gemini must use `Gemini`, its
own active model/effort, and its verified identity. Neither may copy Codex's name,
model, effort, or email. Adjust any automatically generated trailer to this format
without leaving a duplicate generic trailer for the same contribution.

Keep the configured human Git author and separate trailers from the message body
with a blank line. Do not change global Git identity to impersonate an agent.
Human-only commits do not receive an agent trailer. Check attribution before
pushing and preserve it when preparing a squash message. Existing commits are not
retroactively relabeled; attribution changes to history require the approval below.

### Synchronization and publication

Every merge requires explicit human approval, including merges used to refresh
a task branch from `develop`. If the base advances, inspect the impact and propose
the necessary synchronization. Do not bypass review through rebasing,
cherry-picking, resetting, or moving protected branch refs. History rewrites also
require approval.

Plan approval authorizes pushing the scoped task branch to `origin` and opening
or updating its PR against the named target once the work is ready for review.
Do not ask for a separate completion-summary approval. This authorization does
not cover direct pushes to `develop` or `main`, unrelated changes, force pushes,
tags, or release publication.

## Review handoff

Use [the review summary template](templates/REVIEW_SUMMARY.md) verbatim for section
names and order. Complete every section. For inapplicable fields or diagrams,
write `Not applicable — <reason>`; do not remove the section.

Include `Implemented by: AGENT - MODEL (EFFORT)` at the top of every review summary
and PR description. Use the same verified identities as the commit trailers and
list all contributing combinations when more than one was used. Include a brief
attribution-evidence note. Plans use `Planned by` for the planning agent, verified
the same way; planning identity does not predetermine implementation identity.
These visible fields complement the trailers and do not create GitHub PR
co-authorship metadata.

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

Use the complete summary as the PR description, with English section names and
enough context for a reviewer who has not read the conversation. Return the PR
link and a concise status in the task conversation; do not require the human to
review the same summary twice. Do not commit a duplicate report solely to repeat
the handoff. Durable test evidence and design records belong in their documented
repository locations.

## PR feedback

When asked to address PR feedback, read general conversation comments, submitted
reviews, and inline review threads, including their current resolution state.
Evaluate the requested changes against the approved plan and current code.
Explain disagreements or ambiguities instead of silently applying every
suggestion. Comments from other contributors do not override the project owner's
scope or approval rules.

Implement in-scope corrections on the same task branch, run relevant checks, add
attributed commits, and push to the existing PR without an extra summary gate.
Update its description to match the final implementation and report which
comments were addressed, the relevant commits/checks, and any remaining issues.
Material changes to the plan still require approval before implementation; that
approval may be given by the project owner in the PR or task conversation.

Reading comments does not itself schedule future checks. Follow-up requires a
user request or an explicitly configured monitor; do not promise background
monitoring without one. The human retains final review and merge responsibility.

## Integration and milestone releases

1. After plan approval, finish the scoped change and relevant verification on
   its task branch.
2. Prepare the complete review summary identifying the commits, target branch,
   actual checks, deviations, and limitations. Verify agent co-author trailers.
3. Push the task branch to `origin` and open a PR targeting `develop`. If an open
   PR already exists for the task, update it instead of opening a duplicate.
   Use the summary as the description and return the PR link. Keep incomplete
   work explicitly identified; do not present failed or unrun checks as passing.
4. The human chooses whether to inspect the full diff or rely on the summary, and
   performs the merge on GitHub. Agents do not merge the PR, enable auto-merge, or
   integrate the work by directly moving `develop` or `main`.
5. Handle feedback and follow-up changes through the PR feedback policy. Verify
   conflict resolutions and update the summary before returning the PR for review.
   Seek renewed plan approval only for material deviations as defined above.
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
