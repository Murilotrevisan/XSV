# Task plan

- Task: `<title or issue reference>`
- Source branch: `<agent>/<feature|fix>/<slug>, existing or proposed>`
- Target branch: `develop` (or `main` for a milestone proposal)
- State: `Proposed; awaiting explicit approval before implementation.`

## Objective

State the intended outcome and observable completion criteria. Identify what is
outside this task's scope.

## Context

Explain current behavior or design, relevant requirements, dependencies, and
findings from inspection or baseline checks. Link authoritative documents and
identify assumptions, unknowns, and decisions needed from the reviewer.

## Proposed approach

Describe the intended changes, their rationale, and the main implementation steps.
Include alternatives and tradeoffs only when they help the reviewer decide.
Identify cross-discipline impacts and compatibility concerns where applicable.

## Expected file changes

| File or coherent file group | Planned change and purpose |
| --- | --- |
| `<path/link or proposed path>` | `<add, modify, or remove; why>` |

This is an impact estimate, not a promise of exact filenames. Explain uncertainty
where investigation is still needed; avoid exhaustive speculative file lists.

## Diagrams

### Software runtime

Show the proposed sequence, state transitions, or activity, with relevant
participants and failure paths. Link an existing diagram if behavior is unchanged.
Otherwise: `Not applicable — <reason>`.

### Mechanical and hardware dimensions

Include or link a proposed dimensioned sketch, with units and affected physical
interfaces. Mark unknown values explicitly. Otherwise:
`Not applicable — <reason>`.

### Electrical

Include or link the proposed electrical diagram and identify affected interfaces.
Label conceptual diagrams as such. Otherwise: `Not applicable — <reason>`.

## Affected software layers

Identify existing layers, responsibilities, and dependency/interface changes.
If the task proposes a new layer structure, explain it as a proposal. Otherwise:
`Not applicable — <reason>`.

## Planned tests

| Check or scenario | Method and required setup | Expected result |
| --- | --- | --- |
| `<behavior or criterion>` | `<test, inspection, simulation, or physical procedure>` | `<observable acceptance condition>` |

Include relevant regression and failure scenarios. State unavailable equipment,
data, or environments and which checks would remain unperformed. Scale
verification to the change; documentation tasks may use structural/link checks.

## Approval request

- Requested action: `Approve this plan to begin implementation.`
- Decisions or blockers: `<list, or None>`
- Implementation status: `Not started; awaiting explicit human approval.`
- Merge authorization: `Not requested; requires separate review of completed work.`
