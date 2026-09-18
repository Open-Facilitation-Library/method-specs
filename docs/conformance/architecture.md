# Methodology conformance v0.1

**Status:** normative for the artifacts in this folder. v0.1 fixes the shape; it does not certify any
implementation and does not settle the criteria for any method.

A conformance profile says what a facilitation method requires, separately from how any one product
chooses to converse and separately from how any one runtime is built. Without that separation,
"passes this vendor's tests" is read as "faithful implementation of the method," which is a claim
nobody has earned.

## 1. The four layers

Every criterion belongs to exactly one layer. The layer decides who owns the criterion, who may
change it, and what evidence can support it.

| Layer | Owner | The question it answers | Portable? |
|---|---|---|---|
| **Method essentials** | The method and its stewards | Would a practitioner of this method say the run was not this method without it? | Yes |
| **Facilitation interaction profile** | The implementer, reusable across methods | How does this product conduct a turn: how many questions, how it confirms an inference, how it closes? | Yes, as a named profile, but never as a method requirement |
| **Runtime conventions** | One runtime | How does this system carry context, scope a step, transport inputs, keep stored copies in parity? | No |
| **Outcome evaluation** | The practice, not the product | Did participants say what mattered to them, and did the group reach something usable? | Yes, and independent of all three above |

Two tests keep the first two layers apart:

- **The substitution test.** If the criterion were dropped and everything else held, would a steward
  of the method still recognise the run as that method? If yes, it is not method-essential.
- **The other-method test.** Does the criterion read sensibly for an unrelated method? Rules like
  "ask one question per turn" do. Those belong to the interaction profile.

A criterion may be method-essential for one method and profile-level for another. Independent
elicitation before any feedback is a house style in most methods and constitutive of Delphi.

**Expect an uneven split.** In the first worked case, one invariant out of six was method-essential
across every method examined, two were method-essential for a single method, and the rest belonged
to the implementer. A model that assumes four balanced layers will mis-sort its first real input.

**Watch for method content hiding inside a profile rule.** "One question per turn" is a profile
rule, but "never ask for a placement and its evidence in the same turn" encodes what counts as one
question *in that method*. Split such rules: the general form stays in the profile, the
method-shaped qualifier moves to the method layer.

## 2. The criterion record

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable within the profile. Criterion ids are the join to every adapter and report |
| `layer` | yes | `method` / `profile` / `runtime` / `outcome` |
| `statement` | yes | What must hold, in the method's own vocabulary, with no product nouns |
| `rationale` | no | Why the method requires it |
| `source` | yes | Citation, or the literal `none` |
| `review` | yes | `steward` / `practitioner` / `none`, with who and when if not `none` |
| `status` | yes | `enforced` / `held` / `proposed` |
| `evidence` | no | Evidence entries (§3). Absent means the criterion is asserted and unchecked |
| `applies_to` | no | Stage ids, where the criterion is stage-specific |

**`source: none` and `review: none` are legal and must stay visible.** A criterion derived from a
model's familiarity with a named method is not thereby wrong, but it is not traceable either, and a
record that hides the difference is worse than one that admits it. Consumers may filter on these
fields; publication of a profile does not imply either is populated.

**`held`** marks a criterion that exists and may be enforced privately but cannot be published,
usually for rights reasons (§6). A held criterion is listed with its layer and its reason, never
with its text.

## 3. Evidence classes

| Class | What it is | What it proves | What it does not |
|---|---|---|---|
| `deterministic` | A mechanical check over the implementation's own source | The instruction exists, or the forbidden form is absent | Nothing about behaviour |
| `semantic` | A scripted scenario run against a real model | The system behaved this way on that scenario, with that model, that day | Generalisation, or anything about unscripted inputs |
| `release` | A comparison of shipped artifacts against their source | What runs matches what was reviewed | That what was reviewed is right |
| `production` | A real run on the live system | The path works end to end for the part exercised | Anything about the parts not exercised |
| `outcome` | A measure taken from participants | Something about experience or result | Fidelity to the method |

Each entry carries `class`, `ref` (a durable pointer: commit, workflow run, document), `date`, and
`scope` (what was exercised, in plain words, including what was not). An evidence entry with no
scope is treated as absent.

**No count of the first four classes substitutes for the fifth.** Structural conformance says a
system does what its specification says. It says nothing about whether participants were served.

## 4. Independent versioning

Six things move separately and must be versioned separately: the **profile**, an individual
**criterion**, the **evaluator** or scenario, the **implementation**, the **model** the semantic
evidence ran against, and the **evidence** itself. A report that pins only the profile version is
not reproducible: the same profile over a newer model is a different measurement.

## 5. Report semantics

A conformance report is a statement of the form:

> Implementation *I* at version *v* satisfied criteria *C₁…Cₙ* of profile *P* at version *w*,
> evidenced by classes *E*, on date *d*.

It is not a certification, and this vocabulary deliberately has no word for one. Certification would
require a steward of the method to accept the criteria, and someone accountable to stand behind the
result. Until both exist, the only honest claim is the sentence above, with its layers and dates
attached.

Three phrases that must not appear in a report generated from this model: "certified", "canonical
implementation", and any construction that attributes the result to the method's originator or their
organisation.

## 6. Rights gates

A profile names a method, so it inherits that method's rights position. Before publication:

- **Trademark.** If the method's name is a registered mark, using it as a profile, criterion or
  category label may require permission. Check the owner's policy rather than assuming nominative
  use covers a normative document. A permission to publish *applications* of a method is not a
  permission to publish a *description of its requirements*, and those are commonly distinguished
  in the owner's own words.
- **Content licence.** Criteria paraphrase a method's structure. Where source material is licensed
  share-alike, derived text inherits share-alike. Record the licence on the profile.
- **Attribution.** Name the originator, the publishing body if different, and the source used.
- **Held claims.** Where a gate cannot be cleared, the criterion or the whole profile is recorded as
  `held` with its reason. It is not quietly published, and its absence is not left to look like a
  coverage gap.

The first worked case exercised this: one method's criteria are enforced by an implementation and
excluded from publication because the name's owner licenses the mark and permits only application
examples. The exclusion is visible in the reference case, with the reason stated.

## 7. Relationship to the rest of OFL

- **Method specs** (`FORMAT.md`, `methods/`) describe how to *run* a method: stages, roles,
  prompts, what context carries. A conformance profile describes what must *hold* while running it.
  A profile may reference a spec id; it does not require one, and v0.1 has a worked example whose
  method has no spec in the registry yet.
- **Eval blueprints** are one way to produce `semantic` evidence. The model names evidence classes,
  not tools, and no eval platform is canonical here.
- **Adapters** map criterion ids to one runtime's source, checks and evidence. Runtime fields never
  appear in a portable profile because a particular runtime needs them.
- **Calibration** is what moves `review` off `none`. It is a separate track and a later gate.

## 8. Out of scope for v0.1

Executable schema validation; registry integration for profiles; a chosen eval platform; any
certification or paid conformance mechanism; and the criteria themselves for any method, which are
a matter for stewards rather than for this document.
