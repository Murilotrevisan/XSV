# Mechanical design

Vessel geometry, mechanical parts, fabrication, and supporting analyses. Read
[AGENTS.md](../AGENTS.md) and the [shared context](../docs/CONTEXT.md) first.

| Directory | Content |
| --- | --- |
| `cad/` | Authoritative editable models. |
| `stl/` | Selected mesh exports for review or fabrication. |
| `drawings/` | Dimensioned drawings with units and relevant views. |
| `print/` | Fabrication notes, orientation/settings, and selected slicer projects. |
| `analysis/` | Analysis inputs, scripts, assumptions, and compact relevant results. |
| `docs/iterations/` | Design changes, measurements, fabrication, and fit-check history. |
| `docs/renders/` | Viewable illustrations linked to their source models. |
| `tools/` | Export, geometry-checking, and fabrication helpers. |

No geometry, materials, CAD system, or fabrication process has been selected.
The presence of `stl/` and `print/` supports future additive manufacturing work
without requiring every part to use it.

## Sources, exports, and evidence

Edit model sources rather than treating an exported mesh as the design source.
Keep selected deliverable exports when they aid review or fabrication; exclude
bulk regenerable output using scoped ignore rules. Record source revision,
parameters, tool version, and reproduction steps for delivered exports. Slicer
projects that carry required placement and settings can be versioned deliverables.

Keep iteration records short: what changed, why, what was measured or simulated,
the source of dimensions, and what remains unverified. An analysis should record
its assumptions and boundary conditions. Preserve useful results and figures,
not large transient solver files. A simulation, render, or slicer preview does
not count as a successful fabrication or physical fit check.
