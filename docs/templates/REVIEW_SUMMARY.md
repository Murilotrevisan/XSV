# Review summary

- Source branch: `<agent>/<feature|fix>/<slug>`
- Target branch: `develop` (or `main` for an approved milestone proposal)
- Review scope: `<commit range or working-tree diff, including untracked files>`
- State: `<ready for review | incomplete | blocked>`

## Objective

Describe the intended outcome and the task's completion criteria.

## Context

Explain the starting situation, relevant requirements, dependencies, and scope.
Link the authoritative documents. Identify unresolved assumptions.

## Adopted proposals

Explain the choices implemented, why they were chosen, and relevant tradeoffs.
Distinguish implemented proposals awaiting review from previously approved
decisions. Mention alternatives only when they help assess the change.

## Summary of changed files

| File or coherent file group | Change and purpose |
| --- | --- |
| `<path/link>` | `<what changed and why>` |

Include additions, modifications, and deletions. Group repetitive placeholders
without concealing substantive changes.

## Diagrams

### Software runtime

Include or link sequence, state, or activity diagrams of affected runtime flows.
Otherwise: `Not applicable — <reason>`.

### Mechanical and hardware dimensions

Include or link dimensioned drawings with units for affected mechanical parts,
board geometry, and mounting interfaces. Otherwise: `Not applicable — <reason>`.

### Electrical

Include or link the relevant electrical diagram and editable schematic sources.
Otherwise: `Not applicable — <reason>`.

## Affected software layers

List the affected existing layers, responsibilities, interfaces, and dependency
changes. Do not invent a layer model. Otherwise:
`Not applicable — <reason>`.

## Tests performed

| Check or procedure | Command or evidence | Actual result |
| --- | --- | --- |
| `<check>` | `<command, procedure, or evidence link>` | `<pass/fail/not run and details>` |

Separate automated checks, simulation, and physical verification when applicable.
State failures, skipped checks, untested behavior, and remaining limitations.
Documentation changes may use structural and link checks; do not describe those
checks as validation of the vessel.

## Review request

- Requested action: `<review only | approve merge into named target | milestone review>`
- Open issues or limitations: `<list, or None>`
- Merge status: `Not performed; awaiting explicit human approval.`
