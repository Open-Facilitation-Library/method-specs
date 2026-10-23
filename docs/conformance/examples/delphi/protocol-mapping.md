# Delphi: mapping the whole protocol

**Status:** non-normative worked mapping, recorded 2026-10-23. This is a design/evidence review
example, not a current Harmonica execution report. The checks below have not been run by writing
this document, and no production configuration or participant records were inspected.

## Sources and version boundaries

The source baseline is method-specs commit `4b83e0e9f277ab69509d88751fbc61e77ab62122`:

- The [registry spec](../../../../methods/delphi/method.md), `delphi@0.2.0`, declares three rounds,
  roles, context, personal memory, completion and outputs. Its [provenance](../../../../methods/delphi/SOURCES.md)
  identifies a draft qualitative adaptation awaiting practitioner review. Three rounds and
  conversational collection are choices of this variant.
- The [profile](profile.yaml), `delphi@0.1.0`, is a separate draft example referencing the older
  spec. Its criteria retain `source: none` and `review: none`; even `status: enforced` does not
  establish execution or practitioner acceptance.
- The [Harmonica adapter](harmonica-adapter.yaml), version `0.1.0`, records historical evidence
  and explicit limits. It remains a v0.1 example. This companion does not update its evidence,
  imply compatibility with the newer spec, or supply missing v0.2 evaluator metadata.

The criterion ids below are traceability references to that profile, not a promotion of its
authority. Runtime surfaces are arrangements to verify or consider, not claims about shipped UI.

## Stage, session, tool and artifact mapping

All three spec stages assign every panelist and declare `completion: all_submitted`. That is this
spec's completion policy, not a universal rule for every Delphi. A quorum-based adaptation needs
an explicit variant decision rather than being silently treated as equivalent.

| Logical stage | Session/tool realization to verify | Inputs and handoff | Source declaration and remaining gap |
| --- | --- | --- | --- |
| `round-1-elicit` | Private collection for each panelist; conversation or individual form, with access controls covering facilitator context and participant surfaces | Host question → individual positions/reasons → group aggregation after collection | `context_mode: none`; independent output declared. Actual isolation, stored visibility, collection and progression are unverified here. |
| `round-2-reconsider` | Private reconsideration surface showing the panelist's own position beside anonymised group feedback; aggregation/review tooling supplies the shared artifact | Prior summary plus that panelist's earlier answers → revised position and reasons → updated aggregate | `previous_summary` and `individual_memory: true` declared. Participant-specific routing, anonymisation and stage handoffs are unverified here. |
| `round-3-converge` | Private final-response surface plus synthesis/review of convergence and remaining differences | Earlier summaries plus personal history → final positions → convergence artifact retaining dissent | `all_summaries` and `individual_memory: true` declared. Memory scope, disagreement preservation and final artifact handling are unverified here. |

These are logical activities, not a requirement for exactly three chat sessions. A runtime can
combine or split surfaces while preserving the selected variant's ordering and information
boundaries. A prompt-driven interview and structured collection tools should be assessed against
the same required outputs and constraints.

## Requirements, owners and checks

The method/profile/outcome labels below are those of the existing draft profile. Runtime
realizations do not change a criterion's layer. Each proposed check is illustrative and currently
unrun, separate from the historical adapter evidence.

| Requirement / layer | Implementation responsibility | Proposed check and coverage limit |
| --- | --- | --- |
| `independent-elicitation` / method | Collection permissions, facilitator/tool context and non-appraisal behavior | Use two distinguishable synthetic positions; inspect whether either participant or their facilitator receives the other's contribution before feedback. Prompt wording alone cannot establish isolation. |
| `aggregate-feedback-between-rounds` / method | Aggregation, attribution removal and delivery at the round boundary | Trace individual inputs into the shared summary and later-round context; inspect attribution and identifying combinations. A neutral-sounding opening does not establish a safe feedback artifact. |
| `reconsideration-anchored-on-own-position` / method | Participant-specific memory joined with group feedback | Verify each panelist receives their own earlier position, never another's personal history, and can record movement or holding with reasons. A generic invitation to reconsider is insufficient coverage. |
| `convergence-without-forced-consensus` / method | Final elicitation and synthesis/artifact review | Carry contrasting positions through the handoffs; check that the final artifact retains residual disagreement. A fluent final turn alone does not establish this. |
| `neutral-elicitation`, `one-question-per-turn` / interaction profile | Facilitator behavior on the exercised collection path | Assess representative turns. Passing them supplies no evidence about permissions, progression or summary integrity; one question per turn remains an interaction choice. |
| `participant-experience` / outcome | Participant feedback and outcome-study ownership | Obtain participant evidence appropriate to the claim. Synthetic runs and source inspection cannot populate this row. |
| `all_submitted` / spec-specific completion policy, no profile criterion id | Group barrier and transition controls | With one panelist unfinished, attempt progression; after all submissions, inspect the handoff. A different policy requires a recorded variant decision, not an invented method-essential criterion. |

The host owns panel selection and the framed question, which also affect usefulness; this
mapping does not assess them. Tool/implementation ownership does not confer authority to settle
the portable method requirements.

## What the existing evidence establishes

The historical adapter records narrow prompt/source checks, scripted scenarios and a first-stage
live exercise with synthetic participation. It explicitly leaves later-round live execution,
some semantic criteria and participant outcomes unchecked. Those dated entries do not verify the
newer spec, current permissions, all participant paths or the proposed checks above.

For an actual implementation review, record the selected spec/profile/variant, implementation and
effective template/snapshot versions, then link the evidence for each exercised path. Keep gaps
visible under the [existing evidence and reporting contract](../../architecture.md). This companion
adds neither a scoring schema nor a whole-process runner.
