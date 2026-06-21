---
id: consent-decision-making
title: Consent Decision-Making
version: 0.1.0
status: draft
summary: A group decides on a proposal by intentionally seeking objections, integrating only the arguments that qualify, and adopting what is good enough for now and safe enough to try until the next review.
source_method: Sociocracy 3.0 (Bernhard Bockelbrink, Liliana David, James Priest)
license: CC0-1.0
attribution: "Consent Decision-Making is a pattern from Sociocracy 3.0 by Bernhard Bockelbrink, Liliana David and James Priest (sociocracy30.org), published under CC BY-SA 4.0. This spec is an independent rendering of the process for AI-assisted facilitation, written from the public pattern and dedicated to the public domain under CC0; the S3 authors are credited as originators of the method."
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: facilitator, label: Facilitator }
  - { slug: participant, label: Participant }
stages:
  - { id: consent-to-driver, title: Consent to the driver, output: a clear-enough driver and requirement the group agrees is theirs to act on }
  - { id: present-and-understand, title: Present and understand the proposal, output: a proposal everyone understands as written, with clarifying questions answered }
  - { id: brief-response, title: Brief response round, output: each person's first reaction to the proposal, surfacing early concerns and possible objections }
  - { id: surface-and-resolve-objections, title: Surface and resolve objections, output: a proposal with no remaining qualified objections, amended where objections were integrated }
  - { id: adopt-and-record-concerns, title: Adopt, and record concerns, output: an adopted agreement with a review date, and any concerns recorded for that review }
evals: ./evals
tags: [decision-making, consent, convergent, governance, objections, small-group]
---

# Consent Decision-Making

Consent Decision-Making is a process for a group that has a concrete proposal in front of it and needs to decide together. Instead of asking for agreement or a majority, the facilitator asks a narrower question: does anyone have an objection? A proposal is adopted when it is good enough for now and safe enough to try until the next review. The group reaches that point not by talking until everyone is enthusiastic, but by deliberately seeking out the arguments that would make the proposal unsafe, integrating the ones that qualify, and letting the rest be recorded as concerns rather than blockers.

**Who it's for:** a facilitator helping a group decide on a specific proposal, where the group wants a decision everyone can live with and stand behind, not a watered-down compromise. It fits policy choices, working agreements, role mandates, and any decision where the people affected should have a say. It is the wrong choice when there is no proposal yet (form one first; see Proposal Forming), when the matter is not actually this group's to decide, or when a single person rightly holds the call.

**The distinction the method turns on.** Everything depends on telling an objection apart from a concern, so name it early and hold the line:

- An **objection** is an argument that adopting the proposal as written would lead to consequences worth avoiding for the group, or that there is a worthwhile way to improve it. Objections must be integrated before the proposal is adopted.
- A **concern** is a worry that cannot yet be backed by enough reasoning or evidence to qualify as an objection. Concerns are heard and recorded, but they do not block the decision.

Withholding an objection can quietly harm the group, so the facilitator's job is to make objecting safe and expected, not awkward.

**Adapting a synchronous round process to AI facilitation.** In Sociocracy 3.0 this runs as a synchronous, in-the-room meeting built from rounds, where the proposal and the objections are visible to everyone at once. Here the AI facilitator runs each movement by drawing out every participant in turn, and the shared synthesis across participants stands in for the visible board and the round. The objection loop (in S3, test each argument, integrate it, then re-check) is folded into one movement the facilitator iterates until no qualified objection remains. This adaptation is the main thing a reviewer should sanity-check against the source.

> **Provenance and status.** This spec is an independent rendering of the Sociocracy 3.0 Consent Decision-Making pattern; see [`SOURCES.md`](./SOURCES.md). It is a `draft`: the prompt wording is ours and benefits from review by an experienced S3 practitioner before promotion to `tested`.

## Stage: consent-to-driver
**Goal:** confirm the proposal answers a real, shared need before anyone weighs the proposal itself.

Start with the driver, not the proposal. Put the situation and what the group needs in response to it in front of everyone, and check three things: is the driver described clearly enough, is it genuinely this group's to respond to, and is the stated requirement a suitable thing to be deciding about. Ask each person directly, and treat any "not clear enough" or "not ours to decide" as useful, not obstructive. If the driver is unclear, help the group sharpen it before going further. If it belongs to another group, say so and stop. Do not let the conversation jump ahead to the merits of the proposal yet; this movement is only about agreeing there is a real, shared reason to decide at all.

**Output:** a clear-enough driver and requirement the group agrees is theirs to act on, or an honest finding that the decision is premature or misplaced.

## Stage: present-and-understand
**Goal:** make sure everyone understands what is actually being proposed, before anyone reacts to it.

Have the proposal presented plainly, including who would be responsible for what and when it would be reviewed. Then open a round for clarifying questions only. Keep this strictly to understanding what the proposal says: invite "what do you mean by..." questions and gently turn away "why did you..." or "wouldn't it be better if..." questions, which belong later. You may tidy the wording if it genuinely helps people understand, but do not let the group start redesigning the proposal here. The aim is a shared, accurate picture of the proposal as written, so that the reactions and objections that follow are about the real thing and not a misreading.

**Output:** a proposal everyone understands as written, with clarifying questions answered and any wording cleaned up for clarity only.

## Stage: brief-response
**Goal:** hear each person's first, honest reaction, so the group sees the proposal through everyone's eyes.

Ask each person for a brief response: what are your thoughts and feelings about this proposal? Take it as a round, one person at a time, and resist letting it turn into back-and-forth debate; this is for surfacing, not resolving. Reactions often reveal early concerns and the shape of objections to come, which is exactly what you want before the formal objection round. Encourage everyone to say something rather than pass, even if it is only "I need more time to be sure." Hold the space open and non-judgmental, and do not start fixing anything yet.

**Output:** each person's first reaction on the record, with early concerns and likely objections surfaced for the next movement.

## Stage: surface-and-resolve-objections
**Goal:** deliberately seek objections, integrate the ones that qualify, and keep going until none remain.

Ask the question plainly: are there any objections to adopting this proposal? Gather them, then take one at a time. For each argument, test whether it actually qualifies as an objection: does leaving the proposal as written lead to a consequence worth avoiding for the group, or reveal a worthwhile improvement? If it does not qualify, it is a concern; set it aside to be heard later, and say why, kindly. If it does qualify, work with the group, and especially the people closest to it, to amend the proposal so the objection is resolved while still meeting the driver. Each time the proposal changes, return to the question and check for objections to the amended version. Keep the standard at "good enough for now and safe enough to try," not perfect, and keep objecting safe and matter-of-fact throughout. The movement is done when a full check turns up no remaining qualified objection.

**Output:** a proposal with no remaining qualified objections, amended where objections were integrated, and a clear separation between resolved objections and recorded concerns.

## Stage: adopt-and-record-concerns
**Goal:** mark the agreement, and capture concerns so they inform the review rather than the decision.

Name plainly that the group has reached an agreement, and let that land; arriving at consent is worth acknowledging. Confirm the practical handles: who is responsible, and when the agreement will be reviewed. Then invite anyone holding a concern to say whether it is worth voicing now, and record the rest alongside the review criteria so they can inform the next evaluation. If a stated concern turns out, on hearing it, to actually qualify as an objection, treat it as one and integrate it before closing. Leave the group with a decision it can act on and a clear date to revisit it.

**Output:** an adopted agreement with named responsibilities and a review date, and any concerns recorded against that review.
