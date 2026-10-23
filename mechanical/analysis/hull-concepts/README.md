# Hull concept study

Status: concept comparison based on literature, commercial references, and a
two-dimensional hydrostatic model. Nothing here has been built, simulated with
CFD, or physically measured. The adopted concept and its rationale are recorded
in [the hull concept decision](../../../docs/architecture/HULL_CONCEPT.md).

The study compared six naval architectures against the
[mission baseline](../../../docs/requirements/missions/INITIAL_MISSIONS.md) and
the [budget](../../../docs/requirements/BUDGET.md), using three design objectives
set by the project owner:

1. Keep operating after a capsize, in either orientation or by righting itself.
2. Do not burn out or stop working because the vessel turned over.
3. Be hard to capsize, because a capsize counts as a loss in MIS-005 combat.

Cost comes first: the requirements are met with the fewest parts. Protection
against impact damage, water-ingress detection, and battery protection systems
are not requirements.

## Method

[`hydrostatics.js`](hydrostatics.js) treats each buoyant volume as a closed
cross-section extruded over an effective length. For each heel angle from 0 to
180 degrees it finds the waterline for the vessel mass and computes the righting
lever GZ, the horizontal distance between the centre of gravity G and the
centre of buoyancy B. Positive GZ returns the vessel towards upright.

[`run.js`](run.js) defines the concepts and prints the table below:

```sh
node mechanical/analysis/hull-concepts/run.js
```

The script needs Node.js and has no dependencies. It was run with Node.js
25.8.1.

Derived quantities:

- **Max righting moment:** weight × maximum GZ. This is the largest static roll
  moment the vessel resists, for example from a wedge lifting one side.
- **Energy to point of no return:** work needed to roll the vessel to its
  vanishing angle (concepts that stay inverted) or to 180 degrees (concepts that
  right themselves). For scale, a 400 g opponent at 1 m/s carries 0.20 J and at
  1.5 m/s carries 0.45 J. Only part of an impact turns into roll.
- **Propulsor immersion:** fraction of the propeller or wheel disc below the
  waterline at rest, upright and inverted.

## Assumptions and limits

- Static, calm, fresh water (1.0 g/cm³). No trim, waves, dynamics, bow or stern
  shape, trapped water, or free-surface effects.
- Container dimensions are nominal and must be measured: 300 mL bottle
  Ø56 mm/310 mL, 500 mL bottle Ø64 mm/520 mL, 1.5 L bottle Ø90 mm/1550 mL, 2 L
  bottle Ø104 mm/2100 mL. The 500 g mayonnaise jar is modelled as Ø77 mm with a
  620 mL envelope from retail listings (about 7.7 cm wide and 13.6 cm tall).
- Masses come from estimated weight budgets, not from a bill of materials.
- Water ballast inside a round, sealed hull acts at the hull axis: it adds
  displacement and righting moment without moving G.

## Results

Simulated estimates from `run.js`:

| Id | Mass (g) | Volume immersed (%) | Waterline z (mm) | Propulsor immersed, upright / inverted (%) | GM (mm) | GZ max (mm @ deg) | Vanishing angle (deg) | After capsize | Max righting moment (N·mm) | Energy to point of no return (J) | Energy to right from inverted (J) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1 | 400 | 38.5 | -5.8 | 35 / 35 | 286 | 71.3 @ 18 | 91 | stays inverted | 280 | 0.25 | 0.25 |
| P1-dry | 210 | 20.2 | -15.6 | 12 / 12 | 483 | 73.6 @ 11 | 91 | stays inverted | 152 | 0.14 | 0.14 |
| P1-wide | 420 | 40.4 | -4.8 | 37 / 37 | 486 | 97.0 @ 14 | 91 | stays inverted | 400 | 0.37 | 0.37 |
| P2 | 250 | 6.0 | -40.6 | 0 / 0 | 1156 | 94.5 @ 6 | 91 | stays inverted | 232 | 0.22 | 0.22 |
| P3 | 195 | 12.6 | -28.5 | 100 / 0 | 28 | 28.0 @ 90 | none | rights itself | 54 | 0.11 | 0.00 |
| P3-bulb | 260 | 16.8 | -24.8 | 100 / 0 | 40 | 40.0 @ 90 | none | rights itself | 102 | 0.20 | 0.00 |
| P4 | 290 | 18.4 | 25.7 | 100 / 0 | 48 | 23.7 @ 146 | none | rights itself | 67 | 0.11 | 0.00 |
| P5 | 480 | 35.6 | -7.1 | 31 / 31 | 508 | 97.8 @ 26 | 91 | stays inverted | 460 | 0.45 | 0.45 |
| P5-jar | 480 | 28.9 | -11.5 | 21 / 21 | 486 | 92.0 @ 31 | 91 | stays inverted | 433 | 0.43 | 0.43 |
| P5-jar-ballast | 600 | 36.2 | -7.5 | 30 / 30 | 405 | 82.5 @ 28 | 91 | stays inverted | 486 | 0.47 | 0.47 |
| P6 | 360 | 34.6 | -7.8 | 41 / 41 | 201 | 56.1 @ 20 | 91 | stays inverted | 198 | 0.18 | 0.18 |
| ref-cat | 420 | 12.2 | -27.6 | - | 570 | 79.4 @ 10 | 74 | stays inverted | 327 | 0.24 | 0.31 |
| ref-V | 290 | 27.5 | 25.7 | - | 48 | 18.4 @ 41 | 89 | stays inverted | 52 | 0.05 | 0.08 |

Waterline z is measured from the mid-plane (bottle-hull concepts) or from the
keel (V-hull concepts). For P2, the air-propeller tip clears the water by
13.1 mm in both orientations; its 0% immersion is intended.

Main findings:

- A multihull symmetric about its horizontal mid-plane is as stable inverted as
  upright. Its flotation sits far from the centreline, so it is also the shape
  that resists capsizing best. A conventional catamaran with a raised pod
  (ref-cat) needs more energy to right (0.31 J) than to capsize (0.24 J), which
  is why it stays inverted.
- The self-righting monohulls (P3, P4) come back on their own, but roll over
  with about 0.11 J, less than half of P1. In combat they lose by capsizing.
- A propeller on the mid-plane only reaches the water when the hulls are small
  relative to the mass. Total hull volume of about 2.5 to 3 times the
  displacement (mL ≈ g) gives roughly 30–35% disc immersion. Without ballast,
  P1 weighs about 210 g and immerses only 12% of the disc.
- Replacing the 300 mL central bottle of P5 with a 620 mL jar lowers propeller
  immersion from 31% to 21% at 480 g. About 120 g more ballast restores it.

## Concepts

**P1 Flip-Cat.** Two 500 mL PET bottle hulls joined on the mid-plane, with
everything symmetric about that plane. The battery and electronics sit inside
one hull and water ballast in the other. Propellers on the hull axes run about
one third immersed (surface-piercing) in either face. A commercial toy, the
Flytec V777 (174 g, 15 km/h), uses a symmetric hull with two mid-plane
propellers and drives on both faces.

**P2 Air-Cat.** The same symmetry with two micro-drone air propellers on the
mid-plane, carried by 2 L bottles so that the propellers clear the water in both
faces. It has nothing under the water and is the lightest option. Static thrust
is low, the propellers are exposed in combat, and submerged it loses propulsion.

**P3 roly-poly bottle.** A single 1.5 L bottle with motors and battery low, so G
is 28 mm below the axis and GZ = 28·sin φ stays positive to 180 degrees. It
rights itself without a mechanism, but it is the easiest concept to capsize.

**P4 lifeboat.** A printed planing V-hull with a sealed dome, here a 500 mL
bottle lying on the deck. The dome's buoyancy makes the inverted position
unstable, as in self-righting lifeboats. It is the fastest of the self-righting
options, but it capsizes easily and depends on a sealed printed hull.

**P5 Tri-Flip (adopted).** Two 500 mL outer hulls at ±110 mm carry motors and
water ballast. A small sealed container on the centreline holds the battery and
electronics, so no pod is left touching the water. It offers the highest
resistance to capsizing in the study. See
[the decision](../../../docs/architecture/HULL_CONCEPT.md).

**P6 paddle raft.** Two 500 mL bottles at ±60 mm with Ø110 mm paddle wheels on
the mid-plane, driven by wet gear motors. It has the highest static thrust for
pushing, but the lowest top speed.

## Rejected options

- **Active righting** (a battery moved on a servo rail, or a flooding chamber as
  in the Pro Boat Sonicwake V2): it does not prevent the capsize, which already
  loses the combat, and it adds parts. Shifting 40 g of ballast by 50 mm gives
  about 20 N·mm, against about 75 N·mm needed for the V-hull without a canopy.
- **Archimedes screw pontoons:** invertible and amphibious, but slow in water,
  0.08–0.33 m/s in published tests.
- **Inflatable righting bag:** works once per gas charge; replacing the cylinder
  conflicts with MIS-006.
- **Hovercraft:** not invertible; the skirt wears and it needs at least two fans.
- **Hydrofoil:** fragile for jumps and combat, and too complex for CST-001.
- **Four propellers or pendulum pods on P1:** they solve propeller immersion at
  the cost of two extra motors or a fragile mechanism.

## Sources

- Flytec V777 product page (dimensions, mass, battery, twin propellers,
  double-sided driving): <https://www.irctoy.com/V777_RC_Rotate_Stunt_Boat_with_LED_Light.html>
- Brick Experiment Channel, "Fast RC Lego Boats" conclusion (speed and static
  thrust of airboat, underwater propellers, and paddle wheels):
  <https://brickexperimentchannel.wordpress.com/2024/08/17/fast-rc-lego-boats-conclusion-8-8/>
- Akyıldız, H.; Şimşek, C. "Self-righting boat design", GiDB Dergi, 2016:
  <https://dergipark.org.tr/en/download/article-file/1044834>
- "How capsize-proof are cruising catamarans?", YACHT:
  <https://www.yacht.de/en/yachts/catamarans/accidents-how-quickly-can-cruising-catamarans-capsize/>
- Atlantic 85-class lifeboat: <https://en.wikipedia.org/wiki/Atlantic_85-class_lifeboat>
- Pro Boat Sonicwake V2 review (passive flooding-chamber righting):
  <https://rcboathq.com/blog/pro-boat-sonicwake-v2-review>
- US11273889B2, "Self-righting unmanned vehicle":
  <https://patents.google.com/patent/US11273889B2/en>
- Surface-piercing propellers: <https://people.well.com/user/pk/SPAprofboat.html>
- Brushed motor run submerged in fresh water:
  <https://www.homebuiltrovs.com/rovforum/viewtopic.php?t=352>
- Invertible combat robots: <https://robotwars.fandom.com/wiki/Invertible_Robots>
  and Team HyperShock on dropping their self-righter:
  <https://hypershock.tv/blogs/inside-the-bot/srimech>
- Screw-based locomotion in water and granular media (UCSD, 2025):
  <https://arxiv.org/abs/2511.11958>
- Hellmann's 500 g jar retail listing (dimensions):
  <https://www.paodeacucar.com/produto/19389/maionese-hellmanns-tradicional-pote-500g>
