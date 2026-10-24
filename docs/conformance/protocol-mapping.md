# Mapping a facilitation protocol to its implementation

**Status:** non-normative implementation guidance for the [conformance model](architecture.md).
This guide adds no required schema fields, evidence classes or method criteria. It helps expose
what a protocol depends on before choosing a prompt change or evaluation.

Start with the selected method variant and the requirements actually being assessed. A custom
host-designed process can use the same reasoning against its own contract without claiming OFL
method conformance. Reuse existing specs, profiles, adapters and evidence; a missing artifact is a
visible gap, not a reason to invent practitioner approval.

## Separate requirements from their realization

A portable requirement says what must hold. Its runtime realization says how a particular system
tries to make it hold. Independent elicitation might use private conversations, a form or a
human-managed collection process. A logical stage can span several sessions, or share one session
with other stages. Do not assume a chat boundary or particular tool is method-essential; justify
that requirement from the selected method.

For the assessed scope, keep a short mapping in an adapter companion or an existing review:

| Record | What to make explicit |
| --- | --- |
| Requirement and authority | Criterion/spec reference, variant, source, review state; host-specific goals and unresolved choices remain distinct |
| Layer and owner | Method, interaction profile, runtime or outcome; the party able to decide a disputed requirement |
| Process design | Logical stages, participant/group session boundaries, roles, assignments and progression rules |
| Tools and information flow | Participant/host surfaces, human actions, inputs, visibility, transformations, outputs and receiving stages |
| Evidence and coverage | Source declarations versus observed execution, durable references and versions, exercised paths and explicit gaps |

These are prompts for a narrative map, not a new machine-readable record. Map only the relevant
scope and make omissions visible. A design decision such as a quorum belongs to the selected
variant/runtime contract unless its method-essential status is separately justified.

## Follow the whole activity

Inspect how each relevant requirement survives:

- **Participation:** who can enter, contribute, see others' work and perform host/facilitator actions.
- **Progression:** individual versus group completion, barriers, stopping conditions and handoffs.
- **Information flow:** personal memory, aggregation, anonymity, access controls and context supplied
  to the facilitator or tools, including indirect paths between participants.
- **Artifacts:** what is collected, transformed, reviewed and passed onward; whether a synthesis
  preserves disagreements and corrections rather than silently replacing them.
- **Affordances:** whether chat, forms, polls, shared boards, review controls or human actions
  actually support the activity. A tool's availability alone proves no requirement is satisfied.

Record the chosen arrangement and any material alternative when the design affects fidelity.
Keep product-specific controls in the adapter; do not turn them into portable method criteria.

## Match the claim to the check

Keep the [v0.3 evidence-class limits](architecture.md#3-evidence-classes): source inspection establishes declarations; isolated execution without fresh
model inference establishes only exercised implementation paths; a scripted
model scenario establishes the behavior it exercised; release comparison establishes artifact
parity; a production run establishes its exercised live path; participant measures address outcomes.
Correct prompt wording does not establish permissions, state transitions or artifact integrity.

Name the configuration, execution or artifact check each gap needs. Proposed or unclassified
checks can be described in the narrative map without changing the reporting contract; an unrun
check supplies no evidence. Keep historical records and their versions intact. Do not backfill
current execution claims from dated adapter entries.

A useful review includes counterexamples: correct facilitator wording with peer-answer leakage
violates independent elicitation; a different interface can preserve the same requirement; a
polished recap can still lose a minority position. The verdict concerns the mapped requirement
and exercised scope, not certification or participant benefit.

See the [Delphi worked mapping](examples/delphi/protocol-mapping.md) for declarations, evidence gaps
and illustrative checks across all three rounds.
