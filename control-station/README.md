# Control station

Operator-facing software for XSV. Read [AGENTS.md](../AGENTS.md) and the
[shared context](../docs/CONTEXT.md) first.

- `src/`: implementation.
- `tests/`: implementation-level tests.

The platform, user interface, language, and connection method remain open.
Document local setup and verification here when implementation starts. Shared
communication contracts belong in [`protocol/`](../protocol/), with explanatory
documentation in [`docs/protocols/`](../docs/protocols/).

The [mission baseline](../docs/requirements/missions/INITIAL_MISSIONS.md) requires
remote operation. A phone interface is under consideration in the
[candidate assessment](../hardware/CANDIDATES.md); neither its transport nor UI
is selected. Define loss-of-link indications and reconnection behavior together
with firmware before verification.
