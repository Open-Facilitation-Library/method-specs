---
id: governance-meeting
title: Governance Meeting
version: 0.1.0
status: draft
summary: A regular, facilitated meeting where a team governs its own work — opening together, surfacing what needs deciding, forming proposals, and deciding by consent — assembled from the Sociocracy 3.0 building blocks.
source_method: Sociocracy 3.0 (Bernhard Bockelbrink, Liliana David, James Priest)
license: CC0-1.0
attribution: "Governance Meeting is a pattern from Sociocracy 3.0 by Bernhard Bockelbrink, Liliana David and James Priest (sociocracy30.org), published under CC BY-SA 4.0. This spec is an independent rendering of the process for AI-assisted facilitation, written from the public pattern and dedicated to the public domain under CC0; the S3 authors are credited as originators of the method."
runtime:
  reference: harmonica
  artifact: chain
composes:
  - navigate-via-tension
  - proposal-forming
  - consent-decision-making
roles:
  - { slug: participant, label: Participant }
stages:
  - { id: check-in, title: Check in and attune, roles: [participant], assignment_strategy: all_participants, context_mode: none, completion: all_submitted, output: a present, attuned group and a shared sense of the meeting's purpose }
  - { id: set-the-agenda, title: Agree what to address, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: an agreed, prioritized agenda of what this meeting will work on }
  - { id: surface-drivers, title: Surface drivers, uses: navigate-via-tension, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: named organizational drivers for the agenda }
  - { id: form-proposal, title: Form a proposal, uses: proposal-forming, roles: [participant], assignment_strategy: all_participants, context_mode: all_summaries, completion: all_submitted, output: a coherent draft proposal for the chosen driver }
  - { id: decide, title: Decide by consent, uses: consent-decision-making, roles: [participant], assignment_strategy: all_participants, context_mode: all_summaries, completion: all_submitted, output: adopted decisions, each with a review date }
  - { id: evaluate-and-close, title: Evaluate and close, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: a short meeting evaluation and a closing check-out }
evals: ./evals
tags: [governance, meeting, decision-making, consent, composed, recurring]
---

# Governance Meeting

A Governance Meeting is the regular, facilitated time a team sets aside to work *on* how it works, not just *in* it. Operations deliver the value; governance decides how the team operates, evaluates whether its agreements still serve, and responds to the challenges and opportunities that sit above any single task. Without a standing time for it, these decisions get crowded out by deadlines, and the unaddressed friction compounds. This method runs that meeting end to end: it opens the group, surfaces what needs deciding, forms a proposal, decides by consent, and closes, drawing the three working movements from their own building-block specs.

**Who it's for:** a team, circle, or working group that shares responsibility for a domain and needs to make decisions together on a recurring basis. It fits a standing governance or operations-governance meeting, typically time-boxed and held every few weeks. It is the wrong choice for day-to-day coordination (use a lighter standup or coordination format) or for a one-off decision where a single building block on its own is enough.

**This method is composed.** Its three working movements are not re-specified here; they run the standalone building blocks: `surface-drivers` runs **Navigate via Tension**, `form-proposal` runs **Proposal Forming**, and `decide` runs **Consent Decision-Making**. Each of those is a forkable spec in its own right, with its own stage prompts and evals. The Governance Meeting's own contribution is the surrounding arc, the opening, the agenda, and the close, and the order that strings the pieces together into one coherent meeting. Because the pieces are shared, an improvement to a building block flows into every method that composes it.

> **Provenance and status.** This spec is an independent rendering of the Sociocracy 3.0 Governance Meeting pattern; see [`SOURCES.md`](./SOURCES.md). It is a `draft`: the prompt wording is ours and benefits from review by an experienced S3 practitioner before promotion to `tested`.

## Stage: check-in
**Goal:** bring everyone into the room and attune the group to the meeting's purpose.

Open with a brief round: invite each person to say how they are arriving and what would make this meeting time well spent. Keep it short and human; the point is presence, not problem-solving. Then name plainly what this meeting is for and what it is not, so people drop other threads and turn toward the shared work. Do not start on content yet.

**Output:** a present, attuned group, and a shared sense of what this meeting is for.

## Stage: set-the-agenda
**Goal:** agree what this meeting will actually work on, and in what order.

Confirm any standing administrative items quickly (for example, consent to the last meeting's record and the date of the next), then assemble the agenda. Gather the items people want to address, fold in anything carried over, and help the group prioritize against the time available, with a rough time box per item. Be honest about what will not fit, and let the group consent to the agenda before diving in. A clear, prioritized agenda is what keeps the meeting focused later.

**Output:** an agreed, prioritized agenda of what this meeting will work on, with rough time boxes.

## Stage: surface-drivers
**Goal:** surface the tensions behind the agenda and name them as clear drivers worth responding to.

This movement runs the **Navigate via Tension** building block (see that spec for the full facilitation). In the context of this meeting, use it to turn the agenda's felt issues into named organizational drivers: help each person move from "this feels off" to a clear statement of the situation and why it matters, test each against the value/waste/harm question, and route anything that is not this group's to act on. Carry the named drivers into the proposal movement.

**Output:** named organizational drivers ready to be responded to, with anything out of scope routed elsewhere.

## Stage: form-proposal
**Goal:** for a prioritized driver, co-create a coherent proposal.

This movement runs the **Proposal Forming** building block (see that spec for the full facilitation). Take a prioritized driver from the previous movement as the purpose; because the driver is already named and agreed, keep the purpose-confirmation light. Then move through understanding and gathering, surfacing requirements, collecting ideas, and tuning a coherent draft, as that spec lays out. The output is a draft, not a decision.

**Output:** a coherent draft proposal for the chosen driver, ready to take to a consent decision.

## Stage: decide
**Goal:** decide on the proposal by consent.

This movement runs the **Consent Decision-Making** building block (see that spec for the full facilitation). Take the draft proposal from the previous movement; the driver having already been consented, keep the driver-consent step brief. Present and understand the proposal, hear brief responses, seek and integrate qualified objections, and adopt what is good enough for now and safe enough to try, recording concerns for the review. Repeat the proposal-and-decide movements for further agenda items as time allows.

**Output:** adopted decisions, each with named responsibilities and a review date, and any concerns recorded.

## Stage: evaluate-and-close
**Goal:** reflect briefly on the meeting itself, then close the group cleanly.

Run a short meeting evaluation: invite each person to reflect on how the group worked together, celebrate what went well, and offer one suggestion for next time. Keep it about the interaction, not the decisions. Then close with a brief check-out round so people leave the meeting deliberately rather than drifting off. Confirm where the decisions and any follow-ups are recorded.

**Output:** a short meeting evaluation and a closing check-out, with decisions and follow-ups recorded.
