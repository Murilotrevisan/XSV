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
- Execution tasks require plan approval before implementation. The agent then
  verifies, commits, pushes, and opens or updates a PR with the completion summary.
  The human reviews and merges on GitHub; see the workflow for details.
- Agent-authored commits identify their executing agent with `Co-authored-by`.
- `develop` is the integration branch. `main` represents approved milestones
  delivered as releases. The human performs integration through GitHub PRs.
- Empty reserved directories are tracked with `.gitkeep`.

## Mission baseline

The initial scope is a remotely operated toy surface vessel for distance,
maneuverability, ramp jumping, acceleration, and contact combat/durability trials.
Self-righting after capsize and operation during submersion are required outcomes.
The authoritative definitions, operating conditions, budget, and unresolved
acceptance parameters live in [requirements](requirements/README.md).

Here, endurance means distance traveled in a fixed time; it does not prescribe
autonomous navigation. Recovery requirements do not select an active or passive
mechanism. Physical verification remains outstanding for every mission.

## Open engineering decisions

Vessel geometry, materials, propulsion, electronics, sensors, power,
communications, software architecture, and toolchains remain open. An ESP32-C3
board with phone control and a construction using plastic bottles with printed
supports are candidates, not selected designs. See the
[candidate assessment](../hardware/CANDIDATES.md).

Performance targets, course geometry, recovery time, and submersion depth and
duration still need definition. Electronics remaining functional underwater must
not be confused with a demonstrated underwater radio link.

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
