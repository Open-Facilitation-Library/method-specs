---
id: delphi
title: Delphi
version: 0.1.0
status: draft
summary: A panel of experts answers the same question in independent rounds, seeing only an anonymised summary of the group between rounds, so judgements converge on their merits rather than on who argued hardest.
source_method: The Delphi method, developed at the RAND Corporation in the 1950s (Norman Dalkey and Olaf Helmer)
license: CC0-1.0
attribution: "The Delphi method was developed at the RAND Corporation in the 1950s by Norman Dalkey, Olaf Helmer and colleagues. The method is generic and unowned; this spec is an independent rendering for AI-assisted facilitation, dedicated to the public domain under CC0."
runtime:
  reference: harmonica
  artifact: chain
roles:
  - { slug: panelist, label: Panelist }
stages:
  - { id: round-1-elicit, title: "Round 1: independent elicitation", roles: [panelist], assignment_strategy: all_participants, context_mode: none, completion: all_submitted, output: each panelist's own position, stated without sight of any other panelist's answer }
  - { id: round-2-reconsider, title: "Round 2: feedback and reconsideration", roles: [panelist], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: each panelist's revised position, with their reasons for moving or holding }
  - { id: round-3-converge, title: "Round 3: convergence", roles: [panelist], assignment_strategy: all_participants, context_mode: all_summaries, completion: all_submitted, output: the panel's convergence, with residual disagreement recorded rather than resolved }
evals: ./evals
tags: [expert-panel, forecasting, anonymous, asynchronous, convergence, rounds]
---

# Delphi

Delphi asks a panel of experts the same question several times over, and shows them the group's thinking between rounds without showing them each other. The anonymity is the method: it removes the pull of seniority, volume and personality, so a position moves when the argument moves it. What the panel produces is not a vote but a distribution that has been given the chance to settle, along with the disagreements that survived.

**Who it's for:** a facilitator convening people with genuine expertise on a question that evidence alone cannot settle, where the useful output is a considered range rather than a single answer. It fits forecasting, standard-setting, risk estimation, prioritisation, and criteria design. It is the wrong choice when the question is a matter of preference rather than judgement, when the group needs to build shared understanding through discussion, or when a decision is needed within the hour.

**Independence first, then controlled feedback.** Two disciplines make it Delphi rather than a survey with extra steps. The first is that round one is uncontaminated: nobody sees another panelist's answer, and the facilitator neither characterises nor praises what is said, because appraisal is itself a form of feedback. The second is that what comes back between rounds is the group as an aggregate, never an attributed contribution. Break either and you have a discussion whose loudest voice wins, which is the thing the method exists to prevent.

**Convergence is not consensus.** The panel is asked to reconsider, not to agree. A minority position that survives three rounds is a finding, and the facilitator records it rather than negotiating it away. Pressure toward unanimity destroys exactly the signal a Delphi is run to produce.

> **Provenance and status.** Delphi is a generic method with no owner; see [`SOURCES.md`](./SOURCES.md). This spec is a `draft`: the stage wording is ours, and it should be reviewed by a practitioner who has run Delphi panels before promotion to `tested`.

## Stage: round-1-elicit
**Goal:** get each panelist's own position on the host's question, before they are exposed to anyone else's.

Open with the question the host has framed and ask for this panelist's own judgement on it. Work one question at a time and stay with their answer: draw out what they think, what it rests on, and where they are uncertain, rather than running a checklist. Ask for the specifics that make a position usable later, a threshold, an instrument, an observable indicator, an example, but ask for them one at a time and only where they are load-bearing.

Give no feedback of any kind. Do not tell a panelist their answer is interesting, useful, precise or well put; do not compare it to anything; do not hint at what others may have said. Evaluation and comparison are what round one exists to exclude. Keep your own view out of it entirely: your job is to elicit, not to shape.

Close when the panelist says they are done, not before. Show them a short recap of their position, ask whether it is accurate and complete, and finish once they confirm.

**Output:** each panelist's own position, stated without sight of any other panelist's answer.

## Stage: round-2-reconsider
**Goal:** put the panelist's own earlier position beside the group's aggregate and invite genuine revision.

Open by placing two things side by side: what this panelist said last round, and one finding from the anonymised group summary. Keep the aggregate an aggregate. Never attribute a view to a person, never say how many people are on a side in a way that identifies anyone, and never present the group's position as the right answer.

Then ask what, if anything, they now think differently, and why. Movement and holding firm are equally valid outcomes: a panelist who has heard the group and still disagrees is giving you the most valuable answer in the round, so ask what would have to be true for them to change their mind rather than pressing them toward the middle.

Work one question per turn. Recap the revised position when they signal they are done, check it with them, and close on their confirmation.

**Output:** each panelist's revised position, with their reasons for moving or holding.

## Stage: round-3-converge
**Goal:** find where the panel has settled, and record honestly what it has not.

Open on the movement itself: this panelist's own path from their first position to their latest, alongside one tension the group has not resolved. Ask whether that tension is real or a difference in wording, which is the distinction that separates convergence from apparent agreement.

Where the panel has converged, confirm the shape of it: what exactly is agreed, at what threshold, under what conditions. Where it has not, capture the disagreement in a form a reader can act on, what the positions are, what would settle them, and what evidence each would need. Do not manufacture agreement, do not drop a minority view because it is a minority, and do not ask anyone to defer.

Close as in the earlier rounds: a recap of their final position, a check, and finality only once they confirm.

**Output:** the panel's convergence, with residual disagreement recorded rather than resolved.
