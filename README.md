# XSV — Xtreme Surface Vessel

An independent surface vessel project for portfolio development, experimentation,
and technology demonstrations. Firmware, electronics, mechanical design, and the
control station are developed together in this monorepo. Shared missions and
trials will define what the vessel must accomplish and how it is evaluated.

**Current status:** repository foundation. Mission criteria, components, software
architecture, and engineering toolchains have not been selected. The directory
layout is an organizational starting point, not a completed implementation.

## Start here

- [Project context](docs/CONTEXT.md): purpose, scope, and open decisions.
- [Agent instructions](AGENTS.md): common instructions for all agents.
- [Development workflow](docs/WORKFLOW.md): worktrees, branches, and human review.
- [Task plan template](docs/templates/TASK_PLAN.md): review before implementation.
- [Review summary template](docs/templates/REVIEW_SUMMARY.md): required handoff.
- [Requirements](docs/requirements/README.md) and [verification](docs/tests/README.md).

## Repository map

```text
docs/
  architecture/      Cross-discipline architecture and interfaces
  requirements/      Shared requirements and mission definitions
    missions/
  protocols/         Protocol rationale, behavior, and explanatory diagrams
  tests/             System trials, procedures, and evidence
    trials/
    reports/
  templates/         Task plan and review summary
firmware/
  src/               Application implementation
  include/           Shared firmware headers
  drivers/           Device-facing implementation
  tests/             Firmware tests
  CMakeLists.txt     Placeholder; no build toolchain configured yet
hardware/
  schematics/        Editable electrical schematics
  pcb/               PCB design sources
  bom/               Bills of materials
  datasheets/        Reference index and permitted reference documents
mechanical/
  cad/               Editable mechanical models
  stl/               Selected exported meshes
  drawings/          Dimensioned drawings
  print/             Manufacturing notes and selected slicer projects
  analysis/          Analysis inputs, scripts, and compact results
  docs/
    iterations/      Design, fabrication, and fit-check records
    renders/         Illustrations exported from source models
  tools/             Mechanical export and checking helpers
control-station/
  src/               Operator-facing software
  tests/             Control-station tests
protocol/
  definitions/       Authoritative machine-readable communication contracts
tools/
  flashing/          Device programming helpers
  simulation/        Shared simulation helpers
  analysis/          Cross-discipline data analysis helpers
```

Reserved empty directories contain `.gitkeep`. Remove the placeholder when a
directory gains its first real file. See each area's README for ownership and
artifact conventions.

## Development status and releases

Task branches start from and target `develop`. `main` is reserved for explicitly
approved project milestones and releases. Execution tasks start with a plan for
human approval. Once approved, local implementation commits are allowed. Approval
of the completion summary authorizes pushing to `origin` and opening or updating
the PR. The human performs the final review and merge on GitHub. See the
[workflow](docs/WORKFLOW.md) for the complete policy.

Documentation is written in English. The existing [license](LICENSE) is retained.
