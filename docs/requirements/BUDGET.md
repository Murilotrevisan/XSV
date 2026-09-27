# Budget requirements

Status: established accounting baseline; no complete bill of materials or
verified total exists yet. All values are in Brazilian reais (BRL).

| ID | Requirement |
| --- | --- |
| CST-001 | The complete vessel and any dedicated radio controller must cost no more than R$ 100. Every vessel item is included. A phone used as the operator control station is excluded. |
| CST-002 | Maintain an itemized bill of materials with quantity, unit cost, subtotal, evidence or estimate basis, and estimated/confirmed status. Unknown costs are not zero. |
| CST-003 | Account for 3D printing filament at R$ 55/kg (R$ 0.055/g). Record the accounted mass and whether it is estimated or measured. |
| CST-004 | Account for reused plastic bottles at their estimated empty-bottle value, excluding the liquid. Record quantity and the valuation basis; reuse does not automatically mean zero cost. |

There are no additional lower-cost targets. Design decisions should balance
performance, recovery, and durability within CST-001.

## Current planning inputs

- ESP32-C3 development board: R$ 13 preliminary unit estimate, not a confirmed
  purchase or selected component. Board identity, availability, shipping, and
  taxes must be checked before treating it as a confirmed cost.
- Filament example: 100 g corresponds to R$ 5.50. This is arithmetic only, not a
  mass allocation or a fabrication result.
- Plastic bottles with printed supports are a construction option; bottle count,
  empty value, printed mass, and suitability remain unknown.

## Open accounting details

Record shipping and taxes separately until their treatment within the ceiling is
confirmed. Also resolve allocation for spare batteries, printing supports/waste,
and failed prototypes. These open details do not exempt any installed vessel
item or dedicated controller from CST-001. Do not claim budget compliance while
an unresolved cost could change the result.

The eventual BOM belongs in [hardware/bom/](../../hardware/bom/) and must include
mechanical and control items as well as electronics, directly or by reference.
Verification is outlined in [TR-009](../tests/trials/INITIAL_TRIALS.md).
