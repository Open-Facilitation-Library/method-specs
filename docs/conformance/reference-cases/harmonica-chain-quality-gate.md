# Reference case: a runtime quality gate, sorted into conformance layers

**Non-normative.** This describes one implementation's criteria as they stood on 2026-09-17, sorted
using [`../architecture.md`](../architecture.md). It is evidence about that implementation, not a
statement about what any method requires. Nothing here is a certification, and no criterion has been
accepted by a steward of the method it concerns.

The implementation is Harmonica, the reference runtime for this registry. The work is tracked in
that product's own tracker; this document stands on its own.

## What the implementation enforces

Two independent mechanisms over chained facilitation templates, both reading the exact source that
the live system is deployed from.

**Static contracts.** For each template, six invariants are declared `enforced`, `tracked_gap`
against a named internal issue, or `not_applicable`. A mechanical check asserts that the required
phrases are present in the prompt and the forbidden ones absent.

| Invariant | Statement, as the implementation words it |
|---|---|
| Private 1:1 framing | The prompt says this is one private conversation and never implies the group is present |
| Current-step scope | Work stays in the current step; no previewing or deferring to later steps |
| One question per turn | One question at a time, with that method's combination bans named |
| Creation-input consumption | The host's supplied fields are used, not re-asked |
| Hidden-context presentation | Inherited summaries are referred to in the third person, only as far as the current question needs |
| Checkpoint-safe close | A hedged "that's enough" is treated as done: bounded recap, exact check question, finality only after confirmation |

**Exact-prompt probes.** Six scenario kinds per template, run against a real model using the same
source: opening, inference, answer alignment, hidden context, closing check, closing.

## Layer classification

| Criterion | Layer | Why |
|---|---|---|
| Private 1:1 framing | `profile`, except Delphi | Asynchronous 1:1 is this product's interaction choice. For Delphi, independent elicitation before feedback is constitutive |
| Current-step scope | `method` | Phase discipline is the method in each case: one hat at a time, one Cynefin move, one causal stage, the Three Horizons order, one mapping dimension. The step mechanism that carries it is `runtime` |
| One question per turn | `profile`, with a `method` remainder | The general rule is the product's. The per-method bans are method content: never pair a placement with its evidence (Wardley); never pair a causal link with a resource, confidence or evidence question (Theory of Change) |
| Creation-input consumption | `runtime` | Depends on this product's creation fields and context transport |
| Hidden-context presentation | `runtime`, except Delphi | Third-person handling follows from how this runtime inherits context. For Delphi, controlled feedback of the anonymised aggregate between rounds is the method |
| Checkpoint-safe close | `profile` | Hedged-completion handling and the exact recap wording are this product's conventions |
| All six probe kinds | `profile`, except the hidden-context probe for Delphi | Turn-level conversational behaviour |

**Of six invariants, one is method-essential across every method here, and two more for a single
method.** The rest belong to the implementer. That asymmetry is the reason the architecture warns
against assuming four balanced layers.

## Per-method status

Five methods. A sixth was enforced by the same mechanisms and is **excluded from publication**: its
name is a registered trademark whose owner licenses the mark and permits publishing applications of
the method rather than descriptions of how it works. Its criteria are `held` in the sense of
[`../architecture.md` §6](../architecture.md#6-rights-gates). Absence here is a rights outcome, not a
coverage gap.

| Method | Contracts | Probes | Notable method-shaped content |
|---|---|---|---|
| Cynefin | Six enforced, several stage-specific | Six kinds, no recorded gaps | Categorisation treated as an inference to confirm rather than to assert |
| Delphi | Six enforced, per round | Six kinds, no recorded gaps | Independent elicitation in round 1; later rounds open on the participant's own prior position plus one aggregate finding |
| Theory of Change | Six enforced | Six kinds, no recorded gaps | Causal-link questions kept apart from resource, confidence and evidence questions |
| Three Horizons | Six enforced, stage-specific for the first and last | Six kinds, no recorded gaps | The strategy stage may list only bridging moves actually present in inherited context, and may never invent one |
| Wardley Mapping | Six enforced, stage-specific for three stages | Six kinds, no recorded gaps | Inferred placements are hypotheses to confirm; one inherited label is preserved verbatim |

## Provenance and review

**No criterion cites a source, and no criterion has been reviewed by a steward or practitioner of
its method.** Attribution appears in implementation comments as a name only: "Dave Snowden's
framework", "Simon Wardley's mapping", "faithful qualitative Delphi". Theory of Change and Three
Horizons carry no attribution at all.

In the record of [`../architecture.md` §2](../architecture.md#2-the-criterion-record), every
criterion in this case therefore has `source: none` and `review: none`. This is the first and most
consequential fact about it: the criteria are an implementer's reading, enforced rigorously.

## Evidence

| Class | What exists | Scope |
|---|---|---|
| `deterministic` | Contract check over the canonical source | Presence or absence of required text. Runs in CI on any template change |
| `semantic` | Exact-prompt probes against a real model, six kinds per method | One scripted scenario per kind, one model. A recorded run passed 17 of 18 scenarios; a later method-specific rerun passed 6 of 6 |
| `release` | Read-only parity between canonical source and the deployed templates | Verified clean on 2026-09-15 and again on 2026-09-17, with one unrelated template's summary prompt drifting |
| `production` | Fresh runs created on the live system, closed after capture | First stage only, for four of the five methods here. One method has none: it is archived and not currently public, so it rests on parity alone |
| `outcome` | **None** | No criterion measures participant experience or whether the group reached something usable |

Two limits belong with every claim drawn from this case:

1. **One method has no production run**, because the template is archived and not public.
2. **Only the first stage of each chain was exercised in production.** These chains advance on a
   host action that the automation surface cannot perform, so later stages rest on parity and the
   scripted probes.

## What this case proves, and what it does not

**Proves.** For five methods, the deployed prompts contain the instructions the implementer intended
and lack the forms they excluded; the real model followed those instructions on one scripted
scenario per probe kind; and what runs matches what was reviewed.

**Does not prove.** That any criterion is what the method requires. That behaviour holds beyond the
scripted scenarios, a single model, or the first stage. That participants were served. That the one
archived method behaves at all in production.

## How to use it

As the worked input to a portable profile, not as its content. The Delphi example in
[`../examples/delphi/`](../examples/delphi/) shows the split in practice: a profile carrying only
what Delphi requires, and an adapter carrying this implementation's evidence for it.
