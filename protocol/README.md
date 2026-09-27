# Communication contracts

`definitions/` will hold authoritative machine-readable communication contracts
shared by firmware, the control station, and relevant tools. No transport,
serialization format, schema tool, or message set has been selected.

Protocol rationale and flow diagrams live in
[`docs/protocols/`](../docs/protocols/). Applications own their implementation code.
When contracts are introduced, document generation/validation commands and
compatibility expectations here. Avoid manually duplicated message definitions.
