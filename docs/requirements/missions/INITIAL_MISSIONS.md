# Initial mission requirements

Status: required outcomes; not implemented or physically verified. Numeric
parameters marked TBD must be agreed before an acceptance trial. Recording a
performance measurement does not establish an unspecified performance target.

## Shared operating conditions

| ID | Condition |
| --- | --- |
| OPR-001 | An operator controls the vessel remotely. Autonomous navigation is not required by the endurance mission. Recovery mechanisms remain to be designed. |
| OPR-002 | The vessel is positioned by hand at the start, then operated remotely. The trial must record the release and timing procedure. |
| OPR-003 | Battery replacement and recharging are permitted between trials, including between the four missions in MIS-006. They are not permission to interrupt a timed run. |
| OPR-004 | Every trial records the vessel configuration, battery condition, water conditions, control setup, interventions, and observed failures. |

The [budget requirements](../BUDGET.md) apply across disciplines. Water type,
temperature range, waves, wind, and operating distance are TBD; no freshwater,
saltwater, or environmental rating is implied.

## Missions and acceptance basis

| ID | Mission and required outcome | Measurement and acceptance basis | Open parameters |
| --- | --- | --- | --- |
| MIS-001 | Fixed-time endurance: travel as far as possible during a fixed interval, maintaining flotation and continuous propulsion. | Record actual traveled distance over the full interval, including interruptions or sinking. Stationary powered flotation does not satisfy navigation. More distance is better. | Interval, course, distance measurement method, minimum distance. |
| MIS-002 | Maneuverability: complete an S-shaped buoy slalom outbound and return. | Complete the course; record elapsed time and obstacle contacts. Corrected time = elapsed time + 3 seconds per contact. Lower corrected time is better. | Buoy spacing/count, turn geometry, timing procedure, maximum target time. |
| MIS-003 | Distance jump: accelerate along a straight approach and traverse a ramp on the water. | Measure jump distance from ramp departure to the first water impact. Longer distance is better; record the post-impact vessel condition separately. | Ramp geometry, approach, distance reference points, minimum jump distance. |
| MIS-004 | Acceleration: traverse a straight course of 5 to 10 m. | Fix the exact length before the trial and measure start-to-finish time. Lower time is better. | Exact length, timing trigger, maximum target time. |
| MIS-005 | Contact combat and durability: operate in a bounded aquatic arena against another remotely controlled toy vessel, seeking to capsize or sink it while retaining own operational capability. | Record each vessel's condition and whether the opposing vessel capsized or sank; inspect own flotation, propulsion, control, and damage afterward. | Arena dimensions, exposure duration, opponent configuration, and end conditions when a vessel recovers. |
| MIS-006 | Sequential durability: complete MIS-001 through MIS-004 without repair or component replacement, except permitted battery changes. | Record completion of all four missions and every intervention. Repairs or other component replacement fail this sequence criterion. | Sequence order and the unresolved parameters of the four component missions. |
| MIS-007 | Self-righting: recover from capsize to the normal operating orientation without manual assistance and resume remotely controlled navigation. | Intentionally capsize the vessel; record recovery time, intervention, flotation, propulsion, and subsequent navigation. Manual recovery fails this criterion. | Capsize orientations, loading, recovery time limit, repetitions, permitted operator input, and mechanism. |
| MIS-008 | Submerged operation: retain onboard control and propulsion functionality during temporary submersion and operate again at the surface without repair or manual power cycling. | Demonstrate function during immersion as well as after it. Record depth, duration, power/control behavior, propulsion, ingress, damage, and resumption of surface navigation. Merely surviving powered off and restarting afterward is insufficient. | Depth, duration, water conditions, underwater maneuvering scope, recovery method, and communications-loss behavior. |

## Recovery and communications boundary

MIS-007 and MIS-008 support continued use after capsize and immersion, including
during the other missions. They do not prescribe a hull shape, sensors, active
ballast, propulsion layout, or firmware architecture.

Submerged onboard operation and live remote communication are separate
capabilities. A surface radio link must not be assumed to work underwater.
Behavior during link loss and reconnection must be defined before verification,
including how recovery proceeds if operator commands cannot reach the vessel.
Whether live underwater remote control is required remains open; it is not
silently waived or claimed as supported by a component choice.

## Verification and discipline impact

The [initial trial outlines](../../tests/trials/INITIAL_TRIALS.md) map each mission
to a planned procedure. Hardware must evaluate immersion protection and power;
mechanical design must evaluate flotation, impact behavior, and recovery;
firmware and the control station must evaluate command handling and link loss.
These are responsibilities to investigate, not an adopted software layer model.
