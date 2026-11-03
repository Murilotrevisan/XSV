# Hull concept

Status: concept adopted by the project owner on 2026-10-23. Not built and not
physically verified. Numbers below are estimates from the two-dimensional
hydrostatic model in [the hull concept study](../../mechanical/analysis/hull-concepts/README.md).

## Decision

XSV uses concept **P5 (Tri-Flip)**: a multihull symmetric about its horizontal
mid-plane that operates in either orientation. Two sealed outer hulls carry the
propulsion and the stability. A sealed container on the centreline holds the
battery and electronics.

The project refers to it as a catamaran, because the two outer hulls do the
catamaran's job. The central container also floats, though, so
hydrostatically it is a trimaran. Development goes straight to this concept;
the simpler P1 is not built first. Propulsion is introduced in two phases (see
[staged propulsion](#staged-propulsion)).

## Design objectives

These objectives were set by the project owner and drive the decision:

1. **Keep operating after a capsize.** The vessel resumes remotely controlled
   navigation in whichever orientation it ends up. See MIS-007 in the
   [mission baseline](../requirements/missions/INITIAL_MISSIONS.md).
2. **Do not burn out when turned over.** Capsizing must not burn out or disable
   motors, driver, or electronics.
3. **Be hard to capsize.** In MIS-005 combat a capsize counts as a loss, so the
   energy and moment needed to roll the vessel over are design metrics.
4. **Cost first.** Meet the requirements with the fewest parts within
   [CST-001](../requirements/BUDGET.md). Protection against impact damage,
   water-ingress detection, and battery protection systems are not
   requirements. Losing the electronics to a break or to water ingress is an
   accepted risk.

## Why this concept

| Concept | Strategy | Energy to capsize (J) | Max righting moment (N·mm) |
| --- | --- | --- | --- |
| P5 Tri-Flip | Operates in either face | 0.45 | 460 |
| P1 Flip-Cat | Operates in either face | 0.25 | 280 |
| P2 Air-Cat | Operates in either face | 0.22 | 232 |
| P6 Paddle raft | Operates in either face | 0.18 | 198 |
| P4 Lifeboat | Rights itself | 0.11 | 67 |
| P3 Roly-poly bottle | Rights itself | 0.11 | 54 |

A multihull symmetric about the mid-plane is as stable inverted as upright, so
it needs no righting mechanism. Its flotation sits far from the centreline, so
it is also the hardest shape to capsize. P5 needs about the energy a 400 g
opponent carries at 1.5 m/s. It also moves the electronics into a closed
container that is meant to float, instead of P1's pod at the waterline.

The self-righting concepts recover on their own but roll over easily. Active
righting was rejected because it does not prevent the capsize and adds parts.
The full comparison and sources are in the
[study](../../mechanical/analysis/hull-concepts/README.md).

## Nominal configuration

Conceptual cross-section, viewed from astern, face A up. Not to scale;
dimensions in mm.

```text
        |<------- 110 ------->|<------- 110 ------->|
      ( Ø64 )====== beam =====( C )===== beam =====( Ø64 )   <- mid-plane: hull axes, propeller axes
  ~~~~~~~~~~~~~~~~~ waterline about 7–12 mm below the mid-plane ~~~~~~~~~~~~~~~~~
    outer hull 500 mL     central container:     outer hull 500 mL
    water ballast         battery, electronics   water ballast
    motor (phase 2)       motor (phase 1)        motor (phase 2)
```

| Item | Nominal value | Status |
| --- | --- | --- |
| Outer hulls | 2 × 500 mL PET bottles (Ø64 mm), sealed by their caps | Measure real bottles |
| Hull spacing | Axes at ±110 mm (beam about 285 mm) | Proposed; arena size is still TBD |
| Central container | About 300 mL bottle (Ø56 mm) or a wide-mouth 500 g mayonnaise jar (about Ø77 mm × 136 mm, 620 mL envelope) | Candidate; decide after a sealing test |
| Mass | About 480 g with the 300 mL container; about 600 g with the 500 g jar | Weight-budget estimate |
| Ballast | Water inside the outer hulls | Adjust to the measured mass |
| Beams, mounts, skegs | Printed | Not designed |

Hydrostatic estimates from the study:

| Variant | Mass (g) | Waterline below mid-plane (mm) | Propeller disc immersed, either face | Energy to capsize (J) | Max righting moment (N·mm) |
| --- | --- | --- | --- | --- | --- |
| 300 mL central bottle | 480 | 7.1 | 31% | 0.45 | 460 |
| 500 g jar, same mass | 480 | 11.5 | 21% | 0.43 | 433 |
| 500 g jar, more ballast | 600 | 7.5 | 30% | 0.47 | 486 |

The wide-mouth jar makes assembly and battery changes easier than a bottle
neck of about 21 mm. Its larger volume costs about 120 g of extra ballast to
keep the propellers immersed, and a food-jar lid is not designed to hold
pressure. A smaller wide-mouth jar of about 300 mL avoids the extra ballast.

## Design rules

1. **Mid-plane symmetry.** Hulls, ballast, propeller axes, and the antenna are
   symmetric about the horizontal mid-plane. This keeps both faces equivalent.
2. **Ballast rule.** For propellers on the mid-plane to reach the water, total
   hull volume should be about 2.5 to 3 times the displacement (mL ≈ g). Water
   in a round sealed hull acts at the hull axis. It raises displacement and
   righting moment without moving G.
3. **Antenna.** The 2.4 GHz antenna must stay out of the water in every stable
   orientation. Here that means the central container, about 7–12 mm above the
   water in both faces. The link must be checked with the vessel inverted.
4. **Control inversion.** When inverted, propeller thrust keeps its direction
   along the hull, but left and right swap. The operator toggles the mapping
   from the phone; a ball tilt switch can automate it. A sensor failure leaves
   the controls mirrored but does not stop the vessel.
5. **No burn-out when turned over.** A capsize alone does not stall the
   propellers, which keep working in the water. The only burn-out path is a
   stalled motor. It is handled at no extra cost: use a motor driver with
   built-in current limiting and thermal shutdown, and cut a stalled motor in
   firmware after about 1–2 s. The TI DRV8833 is an example of such a driver,
   not a component selection.
6. **Sealing.** A closed container is enough. A PET cap is pressure-rated; a jar
   lid may need a gasket cut from a bicycle inner tube. Wires pass through a
   hole in the lid or cap sealed with hot glue or epoxy.

## Staged propulsion

| Phase | Propulsion | Purpose | Known limitation |
| --- | --- | --- | --- |
| 1 | One motor on the central container axis, on the mid-plane | Test control logic: link, failsafe, control inversion | No differential steering. Steering needs a rudder or is not tested |
| 2 | Two motors at the outer-hull sterns, on the hull axes | Differential-thrust steering with a 110 mm lever arm | Phase-1 mounts may change |

The same electronics serve both phases. Propeller immersion is the same in both
phases, because all axes lie on the mid-plane.

## Inputs for the propulsion study

These are open questions, not selections:

- Mass budget about 480 g (300 mL container) or about 600 g (500 g jar). About
  270 g of that is dry structure and equipment; the rest is water ballast.
- Propellers run surface-piercing, with about 30% of the disc immersed at rest
  in either face.
- Motor type and size, propeller diameter and pitch, voltage, and battery,
  within CST-001.
- Motors running wet in fresh water versus a sealed shaft passage.
- Phase-1 steering: a symmetric rudder or straight-line testing only.
- Stall current, driver limits, and the firmware stall cutoff.
- Link-loss behaviour while submerged (MIS-008).

## Proposed bench checks

Not executed. These are informal checks for the first prototype, not trial
procedures:

1. Flotation of the measured hulls with ballast, in both faces, compared with
   the model waterline.
2. Static thrust of a mid-plane propeller versus the same propeller fully
   submerged.
3. Lateral pull on one outer hull to measure the moment that capsizes the
   vessel, compared with about 460 N·mm.
4. A 5 s stalled-motor test with the chosen driver: nothing burns and firmware
   restarts the motor.
5. Radio signal strength with the vessel inverted at 10, 20, and 40 m.
6. One minute submerged with the central container closed: no water inside.
