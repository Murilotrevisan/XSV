# System verification

This directory owns cross-discipline trial procedures and their evidence.
Implementation-level tests live alongside firmware or control-station sources.

- `trials/`: repeatable procedures linked to requirements or missions.
- `reports/`: results of actual executions, including failed or partial trials.

A trial should identify the outcome evaluated, required setup, relevant hardware
and software revisions, procedure, acceptance criteria, and evidence to capture.
A report records the date, actual configuration, observations, results, and
limitations. Link criteria back to their authoritative requirement.

Distinguish inspection, automated checks, simulation, and physical measurement.
A CAD render does not demonstrate fit, and a software assertion does not prove
physical behavior. Keep compact evidence and relevant raw measurements; document
the location and provenance of larger datasets without committing transient
output by default.

No vessel trial has been defined or executed yet.
