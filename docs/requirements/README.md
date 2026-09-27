# Shared requirements and missions

This directory owns cross-discipline requirements. Read
[the project context](../CONTEXT.md) first.

- [Initial missions](missions/INITIAL_MISSIONS.md): MIS-001 through MIS-008 and
  shared operating conditions; required outcomes with explicit unresolved limits.
- [Budget](BUDGET.md): cost ceiling, accounting rules, and preliminary estimates.
- [Initial trial outlines](../tests/trials/INITIAL_TRIALS.md): planned verification,
  not evidence of completed trials.

These requirements express intended capability, not implemented or verified
behavior. Lower optional cost targets are not part of this baseline.

Add mission definitions under `missions/` when their scope is established. Each
mission should state its objective, operating conditions, constraints, measurable
acceptance criteria, and links to the trials that evaluate it. Identify open
values explicitly instead of selecting arbitrary targets.

Preserve existing identifiers and use stable identifiers for new requirements.
Reference those identifiers from implementation and verification documents;
avoid copying acceptance criteria into multiple sources of truth.
