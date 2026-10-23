# Criterion targets, answer forms and structural evidence

**Status:** non-normative design proposal for
[method-specs#31](https://github.com/Open-Facilitation-Library/method-specs/issues/31).
It extends the transcript-only proposal to the activities identified by the
[protocol mapping guide](protocol-mapping.md). This document does not amend conformance v0.2,
introduce an executable schema or runner, or upgrade historical records. Adoption would need an
explicitly versioned contract change.

## Three separate questions

| Axis | Question | Examples |
| --- | --- | --- |
| Criterion and answer form | What must hold, and what answer is requested? | Independent elicitation; yes/no, named choice, rubric score |
| Evaluation target | What subject is actually being assessed? | A turn, configuration, artifact, execution trace, participant response |
| Instrument and evidence | How was it assessed, and what claim can that check support? | Source inspection, isolated runtime test, model scenario, live exercise, participant measure |

A transcript is one possible target. A typed answer alone supplies neither evidence of runtime
behavior nor comparability between instruments.

## Proposed criterion and binding contract

Keep the portable criterion's `statement`, layer, source, review and status. An optional `question`
would add text and an answer form:

- `yes_no`: a yes/no label. Any probability is separately identified and attributed; a deterministic
  or human answer need not manufacture confidence. A probability field is not proof of calibration.
- `choice`: one of explicitly named options, with their meanings.
- `score`: a named rubric with its scale, direction and interpretation.

The criterion describes the **kind and coverage of subject needed** to answer it, in portable
terms. The evaluator/adapter binding identifies the **actual target** using controlled references,
relevant artifact versions and a bounded selection. Runtime ids, URLs and storage paths belong
in that binding, not in the method requirement.

Target kinds can include:

- **Conversation:** a turn, bounded window or whole transcript, with the scored target distinct
  from contextual turns.
- **Configuration:** the selected source or effective runtime configuration, identified separately;
  a declared privacy setting does not establish enforced access control.
- **Artifact:** a collected response, aggregate, board or final output, with its relevant input
  references and transformation scope.
- **Execution trace:** observations of permissions, tool actions, state transitions or handoffs,
  with the tested environment, actors and exercised path identified.
- **Participant response:** a recorded participant measure appropriate to an outcome claim.

These are proposed subject categories, not a selector grammar. Linked sessions and artifacts may
be necessary for a criterion, but defining a whole-process selector/aggregation contract is a
separate task. Do not substitute one transcript when the required subject is unavailable.

The binding identifies instrument support for the target and requested answer. Unsupported or
unknown support yields no measurement, with a reason; it cannot silently fall back to a final
turn or a keyword search. Preserve v0.2's distinction between completed, failed and unrun
measurements, and its evaluator calibration/liveness declarations. Criterion review and evaluator
calibration remain separate.

## Proposed structural-execution evidence

In v0.2, `deterministic` explicitly means a mechanical check over implementation source and
proves no behavior. Keep that historical meaning. A possible extension is a separate `execution`
class for **isolated runtime/integration checks that execute implementation paths without fresh
model inference**. A configuration file inspected by a script does not qualify merely because
the inspection script ran.

Such an entry would identify the implementation and test revisions, environment, fixture/actor
scope, actual observed result, durable artifact and date. Recorded or stubbed model/tool responses
must be disclosed, with the boundaries they leave untested. An access-control test can establish
its exercised allow/deny behavior; it does not establish facilitator quality, all anonymity paths
or participant benefit. Live exercises retain `production`; real-model scenarios retain their
scoped `semantic` meaning. The same run can support distinct, explicitly scoped claims without
collapsing them into one pass rate.

This is a proposed additional class, not a reinterpretation of `deterministic`. Targets do not
automatically select an evidence class: an artifact can be inspected mechanically or interpreted
by a human/judge, with different support and calibration requirements.

## Illustrative acceptance cases

These are expected distinctions for contract review, not measurements or executed tests:

| Case | Target and check | Expected interpretation |
| --- | --- | --- |
| Correct privacy wording; peer answer leaks | Source inspection plus an isolated two-actor access/context test | Source declaration can pass while exercised isolation fails; prompt wording cannot override the failure. |
| Personal memory delivered to the wrong panelist | Participant-specific context observed in an isolated runtime test | The exercised routing fails even if every facilitator turn sounds appropriate. |
| Progression before all submissions | State transition under a selected `all_submitted` variant | Check that the transition is rejected; a quorum variant needs a separate declared contract. |
| A synthesis drops a minority position | Output artifact assessed against the contributing positions | Identify whether the instrument can assess preservation, and report only that target/scope. A fluent final turn supplies no substitute. |
| Whole process requested; evaluator supports only the latest turn | Required linked-session/artifact subject is unsupported | No whole-process measurement; preserve the support gap and any separately valid turn measurement. |

Before adopting the extension, agree the target/binding fields and evidence-class boundary,
provide positive/negative fixtures, and verify backward compatibility and fail-closed missing
measurements. Typed formats do not by themselves establish criterion validity, method endorsement,
instrument interchangeability or outcome quality. This proposal selects no vendor or platform.
