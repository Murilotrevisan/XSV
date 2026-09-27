# Initial component and construction candidates

Status: exploratory assessment, not a component selection, purchase, schematic,
or validated design. Sources consulted on 2026-09-27.

## ESP32-C3 development board with phone control

The ESP32-C3 is a plausible candidate because its integrated 2.4 GHz Wi-Fi and
Bluetooth LE can support a phone control interface without a dedicated radio
controller. See [Espressif's ESP32-C3 module documentation](https://documentation.espressif.com/esp32-c3-wroom-02_datasheet_en.html).
The module document establishes radio capability, not the pinout or electrical
limits of an arbitrary development board. Transport, phone interface, firmware
framework, and command protocol remain undecided.

A board advertised as ESP32-C3-Zero is being considered. Confirm the actual
manufacturer, schematic, revision, exposed pins, regulator, and antenna before
using a reference board's specifications. The
[Waveshare ESP32-C3-Zero documentation](https://docs.waveshare.com/ESP32-C3-Zero)
is a comparison reference, not evidence that an offered board is that product.
The preliminary cost is recorded only in the authoritative
[budget document](../docs/requirements/BUDGET.md).

Evaluate power supply and motor-driver requirements alongside the board; the
controller board alone is not a complete propulsion system. Protection of the
electronics, connections, and power source must support the mission environment.
No immersion rating is inferred from the MCU or development-board name.

### Communication during immersion

Experiments reported in [Qureshi et al., Sensors (2016)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4934316/)
show strong attenuation of 2.4 GHz signals in water and dependence on the water
environment. This is a design risk, not a measurement of XSV or a universal
depth/range limit.

Consequently, evaluate antenna placement, surface range, behavior during link
loss, and reconnection. Do not assume Wi-Fi or Bluetooth will provide live phone
control while submerged. The required submerged onboard functionality remains
in [MIS-008](../docs/requirements/missions/INITIAL_MISSIONS.md); its acceptance
envelope and recovery behavior must be resolved before design validation.

## Plastic bottles with printed supports

Reused plastic bottles with printed supports are a candidate way to reduce
printed material while providing flotation. No bottle volume, count, geometry,
filament material, or fastening method is selected. Mechanical evaluation must
consider attachment integrity, impact, leakage, stability, and self-righting:
flotation alone does not demonstrate recovery from an inverted position.

Apply the shared bottle valuation and filament cost rules in the budget document.
Document geometry and actual mass when a design exists; do not infer them from
this concept.
