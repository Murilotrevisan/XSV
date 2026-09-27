# Firmware

Embedded software for XSV. Read [AGENTS.md](../AGENTS.md) and the
[shared context](../docs/CONTEXT.md) before working here.

- `src/`: application implementation.
- `include/`: shared headers.
- `drivers/`: device-facing implementation.
- `tests/`: implementation-level tests.
- `CMakeLists.txt`: reserved build entry point; currently comments only.

There is no selected processor, SDK, RTOS, language standard, layer model, or
working build. These directories do not settle those decisions. Document setup,
build, and test commands here when the toolchain is established. Keep local
design details with this area and shared interfaces under `docs/architecture/`.
