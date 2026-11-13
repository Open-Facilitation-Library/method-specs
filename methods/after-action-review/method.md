---
id: after-action-review
title: After-action review
version: 0.1.0
status: draft
summary: People involved in a bounded action compare its intended and actual results, examine why events unfolded as they did, and agree what to sustain or change in the next attempt.
source_method: After-action review (AAR), developed in the U.S. Army and subsequently adapted for civilian organizational learning
license: CC0-1.0
attribution: "The after-action review originated in the U.S. Army. This independent OFL rendering for AI-assisted group facilitation draws on Department of the Army TC 7-0.1, After Action Reviews (13 February 2025). Its prompts and eval blueprints are original OFL wording, dedicated under CC0. No source organization has reviewed or endorsed this adaptation."
source_rights:
  class: public-domain
  name_status: Generic method name; no exclusive naming right asserted by the sources consulted.
  note: Independent description of a generic review practice, grounded in U.S. federal government guidance. CC0 covers this spec's original text, not third-party publications, images, or logos. Wikipedia and WHO are contextual references, not sources of copied text or templates.
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: facilitator, label: Human facilitator }
  - { slug: participant, label: Event participant or observer }
  - { slug: action-owner, label: Agreed action owner }
stages:
  - { id: frame-review, title: Frame the review, output: a bounded event and learning purpose with participants and working agreements confirmed }
  - { id: intended-results, title: Establish the intended results, output: the original objectives and expectations with their sources and any differences in understanding }
  - { id: actual-events, title: Reconstruct what happened, output: an evidence-linked account of key events and results with gaps and conflicting accounts visible }
  - { id: explain-differences, title: Examine why, output: participant-developed explanations of successes and shortfalls distinguished from unresolved hypotheses }
  - { id: sustain-and-improve, title: Choose what to sustain and change, output: evidence-linked practices to retain and improvements with agreed owners and next opportunities to apply them }
  - { id: close-and-follow-up, title: Confirm the record and follow through, output: a corrected review record and an agreed human-owned plan to apply and check the learning }
evals: ./evals
tags: [after-action-review, reflection, learning, continuous-improvement, team, event-based]
---

# After-action review

An After-action review (AAR) helps people learn from an action they took together. Start with the purpose and expectations they brought to it, reconstruct the important events, explore the reasons for the results, and decide what to carry into the next attempt. Examine successful performance as carefully as shortfalls: an apparently good result can depend on luck, while a useful practice can be hidden inside a disappointing result.

**Who it's for:** a team reviewing a completed event, exercise, project phase, or other bounded action while participants can still recall it. A longer operation can use several reviews at meaningful stopping points. Keep each review focused on the actions and decisions its participants can explain and influence; pass wider dependencies to an identified human decision-maker. This is a civilian learning adaptation, not a military training qualification, a disciplinary investigation, or a substitute for specialist support after a traumatic incident.

**Relationship to Retrospective.** The registry's [Retrospective](../retrospective/method.md) uses the five-phase S3/Agile structure for reflecting on a period of work. This spec instead organizes discussion around an action's intended results, actual events, explanations, and future practice. They overlap in purpose but have different structures and provenance; neither composes or replaces the other.

**Facilitation and authority.** Participants supply observations, question explanations, and decide which learning they accept. The human facilitator keeps the discussion open across differences in seniority and role. AI may help elicit detail, organize evidence, suggest questions, and draft a record for correction; it does not determine blame, certify causes, settle contested accounts, or assign work to absent people. An activity leader may clarify intent and authorize changes within their remit without making their account the only account.

> **Provenance and status.** This is an unreviewed `draft`, grounded in Army guidance and independently adapted for civilian use; see [SOURCES.md](./SOURCES.md) for source passages, modelling choices, and coverage limits. Its blueprints are unexecuted, source-derived examples, not a calibrated judge or proof of whole-process conformance. Practitioner review is needed before promotion to `tested`.

## Preparation and delivery

The convenor and facilitator identify the event boundaries, useful learning questions, relevant participants and observers, available time, and records such as the original plan, timeline, work products, or operational measures. Invite perspectives from people who did the work, including less powerful roles. Distinguish unavailable perspectives from agreement. Bring forward relevant learning from an earlier review if a human can supply it. An informal AAR can use a short conversation and simple notes; a formal review needs more preparation and facilitation capacity. Do not make one meeting length or documentation burden a universal method requirement.

This spec uses `runtime.artifact: single` for one facilitated group discussion with six logical movements. These are not six independent participant interviews or automatic chain transitions. Role labels describe responsibilities; they do not prove runtime assignment or enforcement. A runtime needs a shared record that participants can inspect and correct, a way to contribute and discuss one another's accounts, and a human-managed handoff to action owners. A chat-only installation without those arrangements provides assistance to the facilitator, not evidence that the group review occurred.

Agree who may see the discussion and record, what attribution is appropriate, and who controls later sharing. Do not promise anonymity or confidentiality that the actual setting cannot provide. Keep participant accounts separate from AI proposals until people have checked them. The facilitator may revisit an earlier movement when a new observation changes the picture; the sequence is a guide to inquiry, not a prohibition on correction.

## Stage: frame-review

**Goal:** agree which action is being reviewed, why the group is learning from it, and how people will participate.

Name the event or phase, its start and end, and the reason for reviewing it now. Check that the people present can speak to the important parts of the action and note any missing perspectives. Explain that the review will examine expectations, events, reasons, and future practice, including what worked. Invite participants to correct the framing before proceeding.

Establish working agreements for candid learning: speak from concrete experience, hear other accounts, challenge explanations without attacking people, and make room for contributions across seniority. Ask the group to confirm the record's audience and attribution arrangements. If the proposed purpose is to establish who deserves punishment, the human convenor must resolve that conflict of purpose rather than disguise it as an AAR.

**Output:** the event boundaries and learning purpose, participating and missing perspectives, and confirmed working agreements.

## Stage: intended-results

**Goal:** establish the objectives and expectations that existed before the action, rather than invent a standard from hindsight.

Ask what the team was trying to accomplish and what it expected to happen at the key points. Use the original brief, plan, agreed measures, or relevant procedures where available. Invite participants to describe what they understood their own role and the shared intent to be at the time; different understandings can be important findings.

Record the origin of each expectation and whether it was documented, recalled, or disputed. If no objective was explicit, say so and work with participants' recollections without presenting a later preference as an original commitment. Keep intended changes made during the action visible in time. Do not decide yet whether performance was good or bad, or treat a leader's retrospective account as proof that everyone had the same expectation.

**Output:** original objectives, expectations and relevant standards, their sources and timing, and any gaps or differences in understanding.

## Stage: actual-events

**Goal:** reconstruct the significant events and results from the available evidence and perspectives.

Ask people to describe what they observed, did, decided, and knew at the relevant moments. Build a timeline or a topic-based account alongside the intended results. Use available records to check important details, and invite people in different roles to add what others could not see. The task is to establish the best supported account the group can currently give, not to pick a winning narrator.

Include relevant safety incidents and near misses even when the intended results were achieved. An absence of injury does not make an observed near miss irrelevant to learning.

Distinguish a direct observation from a report, an inference, or an unknown. Preserve conflicting accounts with their evidence rather than averaging them into a fabricated sequence. Identify what could resolve an important gap. Check the resulting account with participants before moving into explanations; if a gap cannot be resolved within the review, carry that limitation forward explicitly.

**Output:** an evidence-linked account of key events and actual results, with participant corrections, unresolved differences, and missing information retained.

## Stage: explain-differences

**Goal:** help participants explain what contributed to the results, including why useful practices worked and why expectations were missed.

Compare an important expectation with the corresponding events and result. Invite the people involved to explore what made that result more or less likely: decisions, information available at the time, coordination, tools, procedures, resources, and conditions outside the team's control. Ask for the evidence behind an explanation and explore credible alternatives before turning it into a lesson.

Do this for strengths as well as shortfalls. Distinguish a repeatable practice from a fortunate outcome, and ask what a person could reasonably have understood when they acted. Replace unsupported labels such as "careless" with inquiry into specific actions and conditions. More than one cause may matter, and uncertainty may remain. Record an explanation as a hypothesis when the evidence does not settle it; neither a senior person's confidence nor an AI-generated root cause settles the question.

**Output:** participant-developed explanations linked to events and evidence, useful practices and enabling conditions, and unresolved causal questions clearly marked.

## Stage: sustain-and-improve

**Goal:** turn the reviewed explanations into practical choices for the team's next attempt.

Ask which practices the team should deliberately retain and which changes it wants to try. Tie each choice to an observation and the explanation supporting it. Make both sustain and improvement choices specific enough to act on; "communicate better" needs a concrete change in who does what and when. Where the explanation remains uncertain, frame the change as an experiment rather than a proven remedy.

For each agreed action, confirm an owner who accepts it, the next opportunity or date for applying it, required resources or authority, and what evidence will help the team judge its effect. The team should select a feasible amount of work. A dependency on another team is a request for a named human to carry, not a commitment imposed on an absent person. The facilitator and AI can help clarify options, but participants and responsible humans authorize the choices.

If the review exposes a current hazard needing prompt attention, flag it to the responsible human rather than leaving it in a routine next-cycle action list. Record that handoff without claiming that the hazard has been resolved.

**Output:** practices to sustain and improvements or experiments to try, linked to review findings, with accepted ownership, application opportunities, dependencies, and ways to check their effects; unaccepted proposals remain separate.

## Stage: close-and-follow-up

**Goal:** confirm an accurate record and connect the review to application and later learning.

Read back the main comparisons, explanations, uncertainties, sustain choices, and agreed actions. Give participants an opportunity to correct the record and preserve disagreements that remain. Confirm where it will be kept, who can access it, and which human will carry the actions into the next plan, rehearsal, or work cycle. Ask briefly what would make the next review more useful.

Arrange immediate practice where feasible; otherwise confirm a future opportunity. At the agreed follow-up, action owners report what was attempted, what happened, and what should change again. Any update to a procedure or sharing beyond the review group goes through the responsible human and the agreed access arrangements. Closing the meeting or producing a report does not establish that an action was implemented or that performance improved. If follow-up is unavailable, record the unfinished handoff and its owner rather than claiming the learning cycle is complete.

**Output:** a participant-corrected record, confirmed access and ownership, and an application/review plan whose later execution and results are recorded only when observed.

## Shared review record and completion

Use one inspectable record, in a document, board, or equivalent medium selected by the facilitator. A minimal entry connects an **original expectation** to an **observed result and evidence**, an **explanation with its uncertainty**, and a **sustain/change choice**. An agreed action also needs an **accepting owner**, **application opportunity**, **dependencies**, and **follow-up evidence/review point**. Keep disputed accounts, missing perspectives, and unaccepted suggestions visible rather than silently dropping them from the summary.

The discussion is ready to close when participants have had an opportunity to correct the record, key comparisons and uncertainties are represented, and agreed actions have explicit handoffs. The subsequent learning cycle requires humans to apply and revisit those actions. Useful outcome evidence concerns what was tried and its consequences in the next action; completion, agreement, satisfaction, and a fluent summary alone do not demonstrate improvement.
