# Criterion targets, bindings and results — v0.3

**Status:** normative record contract for conformance v0.3, adopted 2026-10-24 alongside the
[conformance architecture](architecture.md). This defines records, not an executable schema,
runner, or claim that an instrument implements them. The [examples](examples/criterion-targets-v0.3.yaml)
remain synthetic and non-normative; their answers are stipulated, not measurements.

The [adoption note](criterion-targets-proposal.md) preserves the proposal's provenance and design
acceptance mapping. Historical contracts retain their own meanings; see the version section below.

## Three separate questions

| Axis | Question | Examples |
| --- | --- | --- |
| Criterion and answer form | What must hold, and what answer is requested? | Independent elicitation; yes/no, named choice, rubric score |
| Evaluation target | What subject is actually being assessed? | Conversation, configuration, artifact, execution trace, participant response |
| Instrument and evidence | How was it assessed, and what claim can that check support? | Source inspection, isolated runtime test, real-model scenario, live exercise, participant measure |

A transcript is one possible target. A typed answer alone establishes neither runtime behavior
nor comparability between instruments. Stage/session design, permissions, context routing, tools,
artifacts and progression can each need their own subjects and checks.

## Criterion fields

Keep the portable criterion's existing identity, statement, layer, source, review and status, and
its independent version. The following fields apply:

| Field | Rule |
| --- | --- |
| `question` | Optional, including for an `enforced` criterion. When present, contains nonempty `text` and `answer_form`. It follows the criterion's version. |
| `question.answer_form.kind` | `yes_no`, `choice`, or `score`, defined below. |
| `subject_requirements` | Nonempty list of `id`, `kind`, `role`, and `coverage` for an assessment. Required for a new binding; absence does not authorize inference from the statement. |
| `subject_requirements[].id` | Unique within the criterion; joins the requirement to actual subjects in a binding. |
| `subject_requirements[].kind` | `conversation`, `configuration`, `artifact`, `execution_trace`, or `participant_response`. |
| `subject_requirements[].role` | `target` for a subject assessed, or `context` for material required to assess it. At least one target is required. |
| `subject_requirements[].coverage` | Portable description of the required extent and boundaries. Runtime ids and storage paths do not belong here. |

Every listed subject requirement must be covered. Several subjects may inform one judgment;
listing them defines neither aggregation of separate judgments nor a whole-process selector.
A source declaration cannot substitute for effective configuration or execution when those are
required. A synthesis can be the target while its contributing positions are required context.
Configuration coverage must distinguish declared source from effective runtime configuration.

Answer forms have these meanings:

- `yes_no`: the answer value is a boolean, including a legitimate `false`.
- `choice`: `options` is a nonempty list of unique `id` values and their nonempty `meaning`.
  The answer is exactly one option id. No ordering or numeric conversion is implied.
- `score`: `rubric_ref` pins a named rubric defining its scale, direction, allowed values and
  interpretation. The answer is a number valid for that rubric, including a legitimate zero.

Probability or confidence is separate and attributed, not the yes/no answer or rubric score.
A human or deterministic answer need not manufacture confidence; a probability field establishes
no calibration. Source/review and evaluator calibration remain separate.

## Evaluator/adapter binding

A binding is immutable for a measurement. Changing a subject, selection, instrument or answer
contract creates a new binding reference/version; it does not alter a past result's meaning.

| Field | Rule |
| --- | --- |
| `id`, `version`, `conformance_version` | Identify the binding and contract it uses. v0.3 bindings declare `conformance_version: "0.3"`. |
| `profile_ref`, `criterion_ref`, `evaluator_ref` | Controlled references pinning each independent version. Evaluators retain v0.2 calibration and liveness declarations. |
| `answer_form_ref` | Pins the criterion's answer form when a question exists. Otherwise pins an explicit evaluator output declaration; it supplies no missing method requirement. It cannot override a criterion question. |
| `subjects` | Nonempty list of `requirement_id`, `ref`, `revision`, and `selection_ref`. Each required id has exactly one association; unknown or duplicate ids are invalid. |
| `subjects[].ref`, `revision` | Controlled artifact/observation reference and immutable revision or content identity. A mutable URL alone is insufficient. |
| `subjects[].selection_ref` | Versioned reference to the bounded selection requested. Its selector contract must be supported; an opaque label alone establishes no support. |
| `support.status` | `supported`, `unsupported`, or `unknown` for this evaluator version, all required subjects/selections, and the answer form. |
| `support.reason`, `support.evidence_refs` | For `supported`, null reason and nonempty support evidence. Otherwise a nonempty reason; unknown support may honestly have no evidence. These concern support, not calibration or criterion review. |

Subjects and selections must resolve, match the required kind/coverage and remain within the
referenced artifact. Missing context is not optional. Unsupported or unknown support yields no
measurement, never a fallback to a final turn, keyword search or narrower instrument. A supported
binding still needs an actual successful run.

For conversations, reuse the explicit target/context distinction and zero-based absolute-index
semantics in OFL evals' [scoring-scope 0.1.0](https://github.com/Open-Facilitation-Library/evals/blob/main/docs/scoring-scope.md).
This does not widen that contract's transcript selectors or numeric `measurement.value` to accept
other subjects or typed answers. Other selectors require an explicitly supported, versioned
contract. The fixtures name synthetic selections for review; they install no resolver. Linked
sessions and artifacts can be required, but whole-process selection and aggregation remain separate
work. Do not substitute one transcript when the required subject is unavailable.

## Result fields

| Field | Rule |
| --- | --- |
| `id`, `conformance_version`, `binding_ref` | Identify the result, contract and exact immutable binding used. |
| `implementation_ref`, `model_ref` | Retain independently pinned implementation/model identities when relevant to the claim, in the result or its versioned enclosing report. A binding or profile version does not replace them. |
| `status` | `completed`, `failed`, or `not_run`, recording what actually happened. |
| `answer` | Actual value matching the bound answer form for `completed`; null for `failed` or `not_run`. |
| `missing_reason` | Null for a completed answer; nonempty when no measurement exists. |
| `failure` | `phase`, safe `reason`, and durable `ref` when failed; null otherwise. |
| `evidence_refs` | Durable pointers to observations. Completed measurements require evidence. Unattempted checks may have an empty list and must retain their reason. |

A completed result requires supported scope, resolved required subjects and a well-formed answer.
One subject association may select a bounded collection within an artifact; cross-artifact or
whole-process selection needs its own supported contract rather than duplicate requirement ids.
Finding an isolation violation is a completed negative answer, not an evaluator failure. Unsupported
scope detected before dispatch is `not_run` with a null answer. A resolution error during an
attempted run, provider error, timeout or malformed output is `failed`, with a null answer and
failure information. Neither can become a default false, zero or 0.5.

An absent historical result remains absent/incomplete; do not invent an attempted or unattempted
run. Missing measurements remain visible, with no aggregate policy selected here. Typed
`answer` fields do not rename or coerce historical v0.2 `score` fields.

## Structural-execution evidence

In v0.2, `deterministic` means mechanical inspection of implementation source and establishes no
behavior. Preserve that meaning. The `execution` class covers isolated runtime
or integration checks that execute implementation paths **without fresh model inference**. Running
a script that inspects configuration does not qualify. Mocking the access-control or routing
function being assessed does not establish its real behavior.

Alongside existing `class`, `ref`, `date`, and nonempty `scope`, an execution entry carries:

| Field | Rule |
| --- | --- |
| `implementation_ref`, `test_ref` | Pin implementation and check revisions. |
| `environment_ref` | Controlled record of environment and relevant effective configuration identity, including differences from live execution. |
| `fixtures_ref` | Pin inputs and actor/role scope, including receiving actors and exercised allow/deny paths. |
| `substitutions` | Explicit list of fixed model/tool responses or replaced dependencies, with `ref` and `scope` on each. Empty means none, not unknown. |
| `observed_result` | What actually happened, including any violation. A planned check or expected outcome is insufficient. |

An access-control test establishes its exercised allow/deny behavior, not facilitator quality,
all anonymity paths or participant benefit. Disclose substituted model/tool responses and the
boundaries they leave untested. Target kind does not automatically select an evidence class.

| Class | Boundary |
| --- | --- |
| `deterministic` | Mechanical inspection of implementation source; no behavior established. |
| `execution` | Isolated implementation-path execution without fresh model inference, limited to exercised dependencies and paths. |
| `semantic` | Scripted real-model scenarios; model/version and scenario limits remain visible. |
| `release` | Shipped-artifact comparison against reviewed source; parity alone establishes no correctness. |
| `production` | Live-system exercise, limited to the path exercised. Synthetic actors do not make it an outcome study. |
| `outcome` | Participant measures appropriate to an outcome claim. |

A mixed run can produce distinct entries sharing an artifact. An execution entry must identify the
no-inference path actually exercised; fresh-model work cannot be relabeled execution. A judge
reading a recorded transcript does not establish execution of the application path that produced
it. No combined pass rate is defined here.

## Worked positive and negative fixtures

The [YAML companion](examples/criterion-targets-v0.3.yaml) includes complete criterion, binding,
result and execution-entry examples, paired scenario vectors, and invalid-record cases. All
references, observations and answers are stipulated synthetic placeholders. Parsing them executes
no application and establishes no real instrument support, calibration or liveness.

| Case | Positive case | Negative case and interpretation |
| --- | --- | --- |
| Privacy declaration versus isolation | Declared-private source check returns true; isolated peer context remains absent. | The same source declaration can return true while an execution check returns false for a leak. Only the latter assesses exercised isolation. |
| Participant-specific memory | Each receiving participant gets their own earlier position. | Another participant's history is delivered; routing is a completed negative answer even if wording is neutral. |
| Completion barrier | An unfinished panelist blocks advancement under the selected all-submitted variant. | Advancement occurs anyway. A declared quorum variant needs a separate binding; difference alone is not a violation. |
| Minority-view preservation | Synthesis retains the distinct position in contributing inputs. | Synthesis drops it. Missing inputs or unsupported interpretation yield no measurement, not preservation. |
| Unsupported scope | A supported turn measurement retains its own scope. | Whole-process request to a latest-turn-only instrument: not-run, null answer, support reason retained. |
| Missing measurements and types | Valid false, zero and named-choice answers remain actual measurements. | Missing subjects, provider errors, unknown choices and malformed output cannot become default values or completed measurements. |

## Version and historical records

New v0.3 bindings and results declare `conformance_version: "0.3"`. This version identifies the
record contract; registry method format, profile/criterion, evaluator, implementation, model and
evidence versions remain independently identified. A binding pins its own version and selections.

- Interpret [v0.2 records](https://github.com/Open-Facilitation-Library/method-specs/blob/379d8eb61d6066b363b8c0d7fb887e11ae027167/docs/conformance/architecture.md)
  and [v0.1 records](https://github.com/Open-Facilitation-Library/method-specs/blob/d78159a1d2716b89dcfa2513a4a5dec7af1bc494/docs/conformance/architecture.md)
  under their own contracts. Missing new fields remain missing; no selectors, support, answers,
  calibration or execution history are backfilled.
- Historical deterministic evidence remains source-only. An old integration log can support a new
  execution entry only through a separately attributed record identifying the actual check,
  revisions, environment, observations and limits. The old entry is not rewritten or upgraded.
- Keep criterion source/review, evaluator calibration/liveness, implementation/model versions,
  binding coverage and run status distinct. Documentation completeness is not practitioner review.
- Executable schema validation, adapters and whole-process selectors/aggregation remain separate
  work. Any implementation needs its own tests for unresolved references, absent context, invalid
  types, unsupported scope and historical interpretation. Illustrative fixtures are review inputs,
  not that implementation or a passed behavioral test suite.

Adopting the record contract establishes no actual instrument capability. Unsupported or unknown
support remains visible until the particular evaluator path is evidenced. Typed formats establish
neither criterion validity, method endorsement, instrument interchangeability nor outcome quality.
This contract selects no vendor or platform.
