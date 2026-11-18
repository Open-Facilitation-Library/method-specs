---
id: business-model-canvas
title: Business Model Canvas
version: 0.1.0
status: draft
summary: Build and challenge a shared account of how one business model creates, delivers, and captures value through nine connected blocks, then identify assumptions to investigate.
source_method: Business Model Canvas, Strategyzer; Alexander Osterwalder and Yves Pigneur
license: CC-BY-SA-4.0
attribution: "Adapted from the Business Model Canvas, © Strategyzer AG, associated with Alexander Osterwalder and Yves Pigneur. Original Canvas: https://www.strategyzer.com/library/the-business-model-canvas, licensed CC BY-SA 3.0. This OFL adaptation adds original facilitation instructions, a three-round chain with six working checkpoints, a native visual-artifact contract, evidence annotations, human review and testing handoffs, and illustrative eval blueprints under CC BY-SA 4.0. Credit Strategyzer.com visibly on every rendered canvas. No Strategyzer review or endorsement is claimed. See NOTICE and SOURCES.md."
source_rights:
  class: open-licensed
  source_licence: CC-BY-SA-3.0
  name_status: Attributed use of the source tool's name; no ownership, certification, endorsement, or trademark clearance claimed.
  note: The original Canvas's attribution and ShareAlike notices are retained. CC BY-SA 3.0 section 4(b) permits adaptations under a later license with the same elements; this adaptation uses CC BY-SA 4.0. The grant is not treated as covering Strategyzer books, articles, paid playbooks, logos, or the separately governed Value Proposition Canvas.
runtime:
  reference: harmonica
  artifact: chain
roles:
  - { slug: facilitator, label: Human facilitator }
  - { slug: contributor, label: Model contributor }
  - { slug: model-owner, label: Human responsible for the model and follow-up }
stages:
  - { id: build-model, title: Contribute to the draft model, roles: [contributor], assignment_strategy: all_participants, context_mode: none, completion: host_continue, output: source-linked contributions assembled into a dated nine-block draft canvas with assumptions and differences visible for group review }
  - { id: challenge-model, title: Review and challenge the shared model, roles: [contributor], assignment_strategy: all_participants, context_mode: previous_summary, individual_memory: true, completion: host_continue, output: participant corrections and challenges tied to an identified shared canvas version with dependencies and alternatives visible }
  - { id: confirm-and-test, title: Revise the model and choose investigations, roles: [contributor], assignment_strategy: all_participants, context_mode: previous_summary, individual_memory: true, completion: host_continue, output: a participant-corrected canvas version with prioritized uncertainties and a human-owned plan for gathering evidence and revisiting the model }
evals: ./evals
tags: [business-model, strategy, value-creation, assumptions, innovation, canvas]
---

# Business Model Canvas

Use the Business Model Canvas to reason together about a business model. Its nine blocks are Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure. The useful result is a connected account that people can inspect and revise, rather than nine unrelated lists.

**Source and scope.** This is an OFL facilitation adaptation of the Canvas, credited to [Strategyzer.com](https://www.strategyzer.com). It supports describing an existing model or exploring a proposed one. The Canvas belongs to Strategyzer's wider business-model design toolkit; this spec covers this tool and its review cycle. The Value Proposition Canvas is a distinct related tool, and is not included or composed here. This spec reproduces no paid playbook, book passage, official poster artwork, or logo.

**Working together.** Agree who can speak to the customers, operations, and finances being discussed, whose perspectives are missing, and who can authorize follow-up. A person modeling alone can produce a provisional draft; it must not be represented as a group or customer-validated account. AI may elicit contributions, help organize entries and links, and raise questions. Participants supply and correct the substance, and responsible humans make decisions. An AI suggestion stays a suggestion until reviewed.

**Participant workload.** Coverage of the nine blocks is a property of the assembled model. Each participant's conversation focuses on the areas they can usefully inform. The host supplies the model boundary and purpose in the brief, and identifies whose knowledge may cover important gaps. Start by establishing where the participant has relevant experience, follow a small number of consequential connections, and offer a clear way to skip unfamiliar topics or finish after confirming their contribution. Do not make answering every block a completion condition. Record the scope of each contribution and leave missing information visible in the group draft. Review and revision rounds also focus on consequential challenges or changes rather than repeating a nine-block interview. No participant-duration claim has been tested for this draft.

**Shared artifact.** Maintain one inspectable nine-block canvas for each model version, on a board or document that contributors can access and correct. Keep concise, identifiable entries; use labels or connectors so relationships remain readable without relying only on color. Attach evidence references and distinguish reported observations, estimates, hypotheses, and unresolved disagreements. Label an empty block as unknown or explain why the group considers it inapplicable. Do not invent content to make the canvas look complete. Put a visible, legible [Strategyzer.com](https://www.strategyzer.com) credit beneath each rendered canvas and retain the license and adaptation notices in [NOTICE](./NOTICE).

### Native visual artifact for the Harmonica template

Render the actual Canvas as the template's visual artifact. Preserve its recognizable spatial relationships: Key Partnerships at the far left; Key Activities above Key Resources next to it; Value Propositions in the center; Customer Relationships above Channels to its right; Customer Segments at the far right; and Cost Structure and Revenue Streams across the bottom, left and right respectively. Keep all nine labeled areas present, including areas whose contents remain unknown. On smaller screens, provide a usable way to inspect the full canvas and a readable equivalent with the same block and entry labels.

Drive the view from a structured model record containing the model identity, current or proposed state, date and revision, block assignments, identifiable entries, cross-block links, evidence references, uncertainty or dispute annotations, and proposed versus human-confirmed changes. The visual view, review discussion, and later-stage context must refer to the same revision. Represent alternative models separately; an extractor must not blend them into one apparently agreed model.

Make entries and their relationships inspectable, with a route for contributors to request corrections and for responsible humans to confirm changes. Show each entry's available, verified source basis within the viewer's existing access rights. Distinguish a group-summary reference from a reference to an original contribution; do not invent individual source links when only the former is available. A source link does not confer permission to see a private contribution. Regeneration must preserve confirmed corrections and expose conflicting new suggestions for review. A change in wording or placement must not silently change an assumption into a fact or a proposal into an agreement.

Use the native artifact through the review and final revision rounds. An incomplete extraction, a stale revision, or unavailable artifact must be visible to the host; a host must resolve the gap before advancing a round that depends on it. Keep attribution and adaptation/license notices accessible with the artifact and retain the visible Strategyzer.com credit in rendered or exported copies. The artifact and its underlying record remain subject to the chain's access arrangements.

Maintain one evolving artifact per chain instance, displayed in its workspace. When a round's group summary is ready, use that round's eligible contributions and summary to prepare the next artifact revision, preserving confirmed human corrections. Summary readiness starts artifact preparation; it does not establish that extraction, rendering, or human review succeeded.

| Completed round | Artifact milestone | Required handoff |
|---|---|---|
| build-model | Initial draft Canvas assembled after the first round's summary. | Inspectable draft revision ready before participants enter the challenge round. |
| challenge-model | Updated Canvas incorporating reviewed corrections and retaining unresolved challenges after the second round's summary. | Identified revision ready for the final review round, with proposed versus confirmed changes visible. |
| confirm-and-test | Closing Canvas revision and investigation handoff prepared after the third round's summary. | Human confirmation or explicit outstanding review, with uncertainty and disagreement retained; no automatic viability or consensus claim. |

A workspace containing several chain instances shows their respective artifacts separately. This spec defines no automatic workspace-wide merger of distinct business models.

**Sequence and runtime.** Three chain rounds contain six working checkpoints: framing, customers and value, delivery, and economics in the first round; whole-model challenge in the second; and revision and testing handoff in the third. This grouping is an OFL adaptation, not an official fixed Strategyzer agenda. Follow the model's connections within a round and revisit blocks when something changes. The role labels describe responsibilities; the shared contributor role permits input across the model while each conversation follows the participant's relevant knowledge. The checkpoints guide collection across the group; they are not a required itinerary for every participant.

The host checks participation, missing perspectives, artifact readiness, and unresolved dependencies before using `host_continue`. That action is a progression control, not proof of participant agreement. Later rounds inherit the previous round's summary and each participant's own earlier contributions, and also require access to the identified shared model record. Summaries alone are not a lossless canvas transport. The adapter must supply the current artifact revision consistently to the renderer and facilitation context; unsupported context fields must not be invented to imply this already works.

The `chain` runtime reference declares the intended session structure. It does not establish a BMC template installation, native renderer, artifact transport, correction controls, or tested implementation in Harmonica. Those are explicit runtime requirements. A solo draft or a workshop led by a human can use the same concepts in one sitting; this reference mapping is for the asynchronous group process.

## Stage: build-model

**Goal:** elicit contributions to one business model and prepare an inspectable draft for the group's next round.

Use the following checkpoints to organize collection across the group. Start each conversation with the participant's area of knowledge, explore the relevant blocks and a few important dependencies, then recap and close when their useful contribution is captured. A participant may flag other areas without being required to complete them. Distinguish their own account from an assembled group draft. The shared artifact remains provisional, and differences between contributors must survive assembly.

### Frame the model

**Goal:** establish what is being modeled and make a shared working surface available.

The host's brief establishes the decision or learning need and bounds one business model: whose organization or initiative, which offering or business unit, which market, and what relevant time horizon. Check the participant's understanding and invite corrections without asking everyone to reconstruct the framing. Mark whether this is a description of current operations or a proposed future model. If contributors mean different models, separate them into named versions instead of combining incompatible claims.

Agree a useful level of detail, contributors, access arrangements, and a human model owner. Create or inspect the nine-block canvas, with a date and version. Invite corrections to the boundary and record missing perspectives. Carry existing entries forward with their provenance, rather than treating a previous canvas as established fact. Protect confidential customer and financial information through the agreed access arrangements.

**Checkpoint output:** the model's boundary, purpose, current or proposed state, date and version, contributing and missing perspectives, responsible human, and accessible nine-block working canvas.

### Customers and value

**Goal:** understand whom the model serves and how value reaches them.

Invite contributors to identify meaningfully different customer segments and what each is offered. Explore why that offering might matter to those people, grounding claims in their experience or available evidence. Separate users, beneficiaries, and paying customers when they differ. In a multi-sided model, preserve the relationships between its sides and identify who pays whom for what; one side's enthusiasm is not evidence of another side's willingness to pay.

Map channels for reaching, selling to, and delivering to the relevant segments. Describe customer relationships separately: the ongoing form of interaction, service, retention, or participation expected. Connect each entry to the segment and offering it concerns. Ask about gaps in those connections. Contributors may propose alternatives, but label them as alternatives and do not turn imagined customer needs into research findings. No separate Value Proposition Canvas exercise is required by this spec.

**Checkpoint output:** customer segments linked to value propositions, channels, and customer relationships, with user/payer distinctions, evidence references, and uncertain claims visible.

### Delivery system

**Goal:** show what it takes to make and deliver the proposed value.

Trace the customer-facing entries into the key resources the model depends on, the key activities that use them, and the key partnerships or suppliers that contribute. Keep these distinctions useful: a resource is something required, an activity is work performed, and a partnership describes an external contribution and dependency. A partner can supply a resource or perform an activity without becoming an internal team.

Ask what each item enables, who currently provides it, and what must be obtained or changed. Record a proposed partner's expected contribution and reason to participate as assumptions unless supported. Do not imply an absent partner has agreed. Revisit the offering or channels when the delivery system cannot support them. Capture important dependencies and missing capabilities without expanding the canvas into a full operating plan.

**Checkpoint output:** key resources, activities, and partnerships connected to the relevant offerings and channels, with existing capabilities distinguished from proposed arrangements and unresolved dependencies.

### Economics

**Goal:** describe the model's revenue streams and cost structure without presenting speculation as financial validation.

Connect each revenue stream to a paying segment, the value it receives, and the way payment occurs. Distinguish a stream from its pricing assumption: subscriptions and transaction fees describe different mechanisms, while a proposed price still needs evidence. Surface funding or subsidy arrangements when they matter to this model, and keep them distinct from customer payments. An unresolved payer or funding gap remains unresolved.

Connect significant costs to the resources, activities, partnerships, and channels that generate them. Where figures are available, retain their source, currency, time period, and relevant volume assumptions. Compare figures on a common basis before drawing arithmetic conclusions; where figures are absent, a qualitative model is still possible. Ask contributors to inspect fragile dependencies between revenue and cost. Do not fabricate prices, market size, margins, or profitability, or infer commercial viability from a filled canvas.

**Checkpoint output:** linked revenue streams and cost structure, sources or explicit estimates, comparable units where calculations are used, and material unknowns or financial tensions.

Before progressing, the human facilitator inspects the assembled draft for coverage, attribution, conflicting accounts, and missing perspectives. Address a consequential gap by seeking the relevant perspective or retaining it explicitly as an unknown; do not reopen every participant's conversation to obtain nine filled blocks. Publish the identified draft revision to the authorized review group and keep its status provisional. If it is unavailable or materially misrepresents the contributions, correct it before inviting the next round.

**Output:** source-linked contributions assembled into a dated nine-block draft canvas, with unknowns, assumptions, contributor differences, and missing perspectives visible for group review.

## Stage: challenge-model

**Goal:** inspect how the nine blocks work together and where the model may fail.

Start from the shared draft's identified revision. Let each contributor inspect its entries and connections alongside their own earlier account, and record proposed corrections against those entries. Focus the conversation on a consequential inconsistency, assumption, or dependency they can assess, while keeping the whole canvas available for inspection. Do not treat having contributed in round one as having accepted the assembled canvas.

Walk through one connected path: a segment receives an offering through particular channels and relationships, enabled by resources, activities, and partners, with associated revenue and costs. Invite contributors to correct the account and examine entries that have no supporting connection. Inspect the consequences of changes across blocks. For example, changing the paying customer may change the offering, sales process, service obligations, and costs.

Separate evidence from confidence. Ask which claims have supporting observations, which are estimates or hypotheses, and what contradicts them. Retain disagreement and missing perspectives. If a different model could address the purpose, sketch it as a distinct alternative and compare the implications; do not silently replace the current model or force speculative options into one canvas. The group may retain its current model while recording why alternatives were set aside. A persuasive presentation is not proof that customers or partners will behave as hoped.

The human facilitator reconciles proposed corrections into a new reviewable revision, retaining unresolved differences and keeping alternatives distinct. Check that the next round's model context and visible artifact refer to that revision before advancing.

**Output:** participant corrections and challenges linked to a shared canvas revision, important tensions and evidence gaps, and distinct alternatives with the group's current reasons for preferring or withholding judgment on them.

## Stage: confirm-and-test

**Goal:** confirm what the canvas says and turn consequential uncertainty into a feasible learning handoff.

Present the revised shared artifact, with its revision and changes visible. Give contributors an opportunity to inspect and correct the whole canvas, its evidence annotations, and unresolved differences. Ask which uncertain claims could most change the model if wrong. Let responsible humans choose what to investigate first and what decision the evidence will inform. This prioritization and handoff are OFL facilitation choices, not an assertion that every Canvas exercise must complete a prescribed experiment sequence.

For each chosen investigation, record the claim, evidence needed, a feasible way to obtain it, the person's accepted ownership, relevant consent or access dependencies, and when the model will be revisited. Clarify what observation would lead the group to retain, change, or reject the claim. A proposal assigned to an absent person remains unaccepted. No customer contact, purchase, experiment, or external commitment is authorized merely by writing it on the canvas.

Save the dated version and agree who may use or share it. At follow-up, examine what was actually learned, update the affected blocks and their connections, and preserve the earlier version. If no follow-up owner or opportunity is available, record that gap. Closing this session delivers a reviewed model and learning plan; it does not establish that tests happened, the model is viable, or participants benefited.

**Output:** a participant-corrected, attributed model version, visible unresolved disagreements, prioritized assumptions, and accepted investigation and review arrangements or explicitly unfinished handoffs.
