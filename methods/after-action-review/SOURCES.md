# Sources & provenance — after-action-review

An independent civilian rendering of the **After-action review (AAR)** practice developed in the **U.S. Army**. Original OFL prose and blueprints are dedicated under CC0; no source organization has reviewed or endorsed this spec.

## Status and scope

**Draft, version 0.1.0.** Sources consulted on 13 November 2026. No practitioner review, runtime installation, generated-response evaluation, or outcome study of this spec has been performed. Promotion to `tested` requires practitioner review of the adaptation and evidence appropriate to the behavior claimed; passing format checks is not that evidence.

This is an event-focused, participatory group review, usable informally or with more formal preparation. It covers preparation, intent, events, explanation, choices, and human follow-up. It does not claim to implement every military AAR procedure or WHO's distinct public-health formats. The six logical movements are OFL's organization of the discussion, not a claim that the Army defines six AAR process steps.

## Primary procedural source

- **Headquarters, Department of the Army, _TC 7-0.1: After Action Reviews_, 13 February 2025.** [Army-hosted edition](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/A6C09408-2436-47A4-93A3-6684A1B59042-1739993594606/TC7_0x1.pdf); [readable mirror of that edition](https://files.trex-arms.com/pdf/army/tc/tc_7-0-1_2025-02.pdf). The Army-hosted download timed out during this work; the publication was read from the mirror, whose title page identifies the issuer and date. References below are to printed page and paragraph numbers, not PDF viewer page numbers.
  - Chapter 1, pp. 1–5, paragraphs 1-1–1-23: participant learning, strengths and weaknesses, formal/informal variants, and the process of planning, preparing, conducting and following up.
  - Chapter 2, pp. 7–12: facilitator/observer responsibilities, objectives and records, preparation, perspectives, and organization of observations.
  - Chapter 3, pp. 13–16, paragraphs 3-2–3-21: rules, objectives and intent, event reconstruction, causal inquiry, participant dialogue, sustain/improve choices, and closing.
  - Chapter 4, pp. 17–18, paragraphs 4-1–4-10: practice, procedure changes, review of the AAR process, records, and later use. Paragraph 4-9 distinguishes the discussion from its written after-action report.

## Context and variant boundaries

- **[Wikipedia — After-action review](https://en.wikipedia.org/wiki/After-action_review)** ([revision linked by the consulted page](https://en.wikipedia.org/w/index.php?title=After-action_review&oldid=1286292053)): the user's starting reference, used to orient the method's history, intended/actual comparison, and civilian uptake. Secondary source; no article prose is copied or closely paraphrased into this spec. Its CC BY-SA licence is not represented as CC0.
- **[World Health Organization — Guidance for after action review, WHO/WHE/CPI/2019.4, 1 April 2019](https://www.who.int/publications/i/item/WHO-WHE-CPI-2019.4)**: publication overview consulted to establish that WHO describes debrief, working-group, key-informant-interview and mixed-method formats. Those formats require separate design choices; this spec does not reproduce the guide or implement all four.

## Requirement-to-implementation map

All rows are source-grounded draft interpretations with **no practitioner review**. This map describes the proposed process, not verified runtime behavior.

| Requirement and source | Responsible layer and implementation | Evidence still needed |
| --- | --- | --- |
| Plan and prepare the review; TC chapters 1–2 | Human convenor/facilitator identifies the event, perspectives, materials and setting; `frame-review` checks the agreement | Actual attendance, availability of records, and working/access agreements |
| Compare original intent with events; TC 3-6–3-9 | `intended-results` and `actual-events`; original materials and an inspectable shared record, corrected by participants | Provenance of expectations and events; preservation of disagreement and gaps |
| Participant dialogue examines reasons; TC 3-10–3-11 | `explain-differences`; human facilitation and discussion between participants, with bounded AI assistance | Observation of discussion and corrections; a generated explanation alone is insufficient |
| Address safety incidents and near misses; TC 3-19–3-20 | Civilian adaptation in `actual-events` and `sustain-and-improve` retains relevant events and routes current hazards to a responsible human | Inclusion of the observed event and an explicit handoff; resolution is not inferred from the discussion |
| Sustain strengths and improve weaknesses; TC 3-18–3-21 | `sustain-and-improve`; participants and authorized owners agree actions linked to findings | Accepted ownership, authority, feasibility, and treatment of unresolved proposals |
| Apply, record and revisit learning; TC chapter 4 | `close-and-follow-up`; human-managed record, next plan/practice and action-owner handoff | What was actually attempted, later observations, and any authorized procedure changes |

## Adaptation and runtime choices

- The source's overall process is **plan, prepare, conduct, follow up**. The conversational questions about intent, events, reasons, and future practice sit inside that larger process; they do not replace preparation and application.
- Military mission/task standards become the event's actual original objectives, agreements and relevant procedures. This does not confer Army qualification, import rank-based roles, or make one leader's interpretation binding on a civilian group.
- Formal/informal describes preparation and resources in the Army source. WHO's formats are a different classification. This spec does not collapse the two into one catalogue or promise complete AAR-family coverage.
- `runtime.artifact: single` describes a facilitated group discussion, not isolated interviews or a verified Harmonica installation. Shared-record inspection/correction, group interaction, role enforcement and later follow-up are required delivery arrangements, not demonstrated product capabilities. A separate runtime mapping would be needed for an asynchronous or chained variant.
- Explicit evidence labels, correction opportunities, access agreements and limits on AI authority are OFL adaptation choices. Likewise, an action-owner acceptance check, an explicit review point and keeping unaccepted suggestions separate make the human handoff inspectable; they are not quoted Army field schemas.
- The stage blueprints contain **source-derived, uncalibrated response criteria** with illustrative inputs. They do not test attendance, permission enforcement, participation across the group, storage, progression, action execution, or subsequent performance. There is no new judge, runner, named conformance profile, or certification claim.

## Rights and attribution

AAR is a generic practice described in U.S. federal government guidance. This spec independently describes the procedure and contributes original facilitation prompts and examples. Its CC0 dedication applies to that new text. It does not relicense Wikipedia, WHO publications, third-party material within government publications, or source logos and imagery. No such expressive material is reproduced here. Descriptive attribution does not imply institutional endorsement.
