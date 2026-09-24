# Review summary

- Implemented by: `<executing agent name(s), e.g. Codex, Claude, or Gemini>`
- Source branch: `<agent>/<feature|fix>/<slug>`
- Target branch: `develop` (or `main` for an approved milestone proposal)
- Review scope: `<commit range or working-tree diff, including untracked files>`
- Approved plan: `<conversation/issue reference, or explicit planning waiver>`
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
Compare the result with the approved plan. Identify deviations, their reasons,
and renewed approval for material changes; write `None` if there were none.

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
Account for the planned checks, identifying which ran, which did not, and why.
Confirm that new agent-authored commits include the correct co-author trailers.
Documentation changes may use structural and link checks; do not describe those
checks as validation of the vessel.

## Review request

- Requested action: `Review this PR and merge on GitHub when satisfied.`
- Open issues or limitations: `<list, or None>`
- Publication status: `<published under plan approval; PR link | not published; explain blocker>`
- Merge status: `Not performed by the agent; the human reviews and merges on GitHub.`
