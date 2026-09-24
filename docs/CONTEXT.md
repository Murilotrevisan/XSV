# Project context

## Purpose

XSV (Xtreme Surface Vessel) is an independent surface vessel project for portfolio
development, experimentation, and technology demonstrations. It brings firmware,
electronics, mechanical design, and an operator control station into one
versioned project.

Development is guided by documented missions and trials. Missions describe
observable outcomes; trials describe how those outcomes are evaluated. They
provide shared context for every discipline before implementation decisions are
made.

## Established organization

- One monorepo contains all disciplines and their supporting tools.
- Documentation is in English and is self-contained for public readers.
- `docs/` owns shared context, requirements, interfaces, and system verification.
  Area-specific documentation stays with the relevant area.
- All agents use `AGENTS.md` as their common entry point and work in isolated
  worktrees on task branches.
- Execution tasks require a reviewed plan before implementation, followed by a
  separate review of completed work before merging; see the workflow for details.
- `develop` is the integration branch. `main` represents approved milestones
  delivered as releases. Integration requires human review.
- Empty reserved directories are tracked with `.gitkeep`.

## Open engineering decisions

Mission content and acceptance thresholds have not been defined. Vessel geometry,
materials, propulsion, electronics, sensors, power, communications, autonomy,
software architecture, and toolchains remain open.

The repository skeleton does not approve any of these choices. For example,
`firmware/drivers/` reserves an organizational location; it does not prescribe
the software dependency structure. `CMakeLists.txt` is only a placeholder.

## Documentation boundaries

- [Requirements and missions](requirements/README.md) own expected behavior and
  measurable acceptance criteria.
- `architecture/` will explain adopted system structure and cross-discipline
  interfaces. Record meaningful decisions and their rationale there when made.
- [Protocol documentation](protocols/README.md) explains communication behavior;
  machine-readable contracts belong to `protocol/definitions/`.
- [System verification](tests/README.md) owns trial procedures and evidence.
- [The workflow](WORKFLOW.md) owns development and review rules.

Keep proposals clearly identified until a decision is made. Record unknowns
explicitly, link related documents, and update affected areas together when an
interface changes. Avoid repeating the same specification in multiple places.
