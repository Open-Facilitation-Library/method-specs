---
id: focused-conversation
title: Focused Conversation (ORID)
version: 0.1.0
status: draft
summary: A structured conversation that moves a group through four levels of question — Objective, Reflective, Interpretive, Decisional — so a decision rests on shared facts, surfaced reactions, and considered meaning rather than the first opinion voiced.
source_method: The Focused Conversation Method / ORID (Institute of Cultural Affairs, Technology of Participation)
license: CC0-1.0
attribution: "Method developed by the Institute of Cultural Affairs (ICA) as part of the Technology of Participation; popularised by Brian Stanfield, The Art of Focused Conversation (ICA Canada, 2000). This spec is an independent OFL rendering grounded in public sources, dedicated to the public domain under CC0."
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: participant, label: Participant }
stages:
  - { id: objective, title: Surface the facts, output: observable-facts }
  - { id: reflective, title: Surface reactions and feelings, output: reactions-and-feelings }
  - { id: interpretive, title: Draw out meaning and options, output: interpretation-and-options }
  - { id: decisional, title: Reach a decision, output: decision-and-next-steps }
evals: ./evals
tags: [focused-conversation, orid, reflection, debrief, convergent, single-session, building-block]
---

# Focused Conversation (ORID)

The Focused Conversation is a structured way to talk something through as a group so the conclusion rests on more than the loudest or quickest opinion. It moves through four levels of question in order — Objective, Reflective, Interpretive, Decisional — each building on the last. Groups left to themselves tend to leap from raw data straight to a decision, skipping how people actually reacted and what it all means; ORID slows that jump down, so by the time the group decides it is standing on shared facts, surfaced feelings, and considered meaning.

**Who it's for:** a facilitator running a debrief, a review, a reading of a report or event, or any decision conversation where the quality of thinking matters more than speed. It suits making sense of something that has happened and turning it into a considered next step. It is the wrong choice when the task is open-ended idea generation (use a divergent method) or a simple vote.

**The four levels (the arc).**
- **Objective** — the facts. What is actually there: what people saw, heard, and noticed.
- **Reflective** — the response. Reactions, feelings, and associations the facts bring up.
- **Interpretive** — the meaning. Significance, implications, and the options that emerge.
- **Decisional** — the resolution. What the group will do or take away.

**The facilitator's discipline (throughout).** Ask, do not tell, and hold the group on the level you are on: the most common failure is jumping from Objective straight to Decisional, deciding before the group has felt or understood anything. Stay neutral on the content; your job is the sequence of questions, not the answers. Let the group's own facts, reactions, and meaning carry it to a decision it owns.

> **Provenance, licence, and status.** The Focused Conversation method (ORID) was developed by the Institute of Cultural Affairs as part of the Technology of Participation, and popularised by Brian Stanfield's *The Art of Focused Conversation* (ICA Canada, 2000); see [`SOURCES.md`](./SOURCES.md). This spec is an independent OFL rendering in our own words, dedicated to the public domain under **CC0-1.0**. It is a `draft`: the prompt wording is ours and benefits from review by an experienced ToP/ICA practitioner before promotion to `tested`.

> **A building block.** ORID is small and reusable: other specs can compose it as the engine of a "make sense of this" stage — `mosaiclab-deliberation` already moves through information ORID-style. It is kept standalone here so it can be forked on its own or pulled in via `composes`.

## Stage: objective
**Goal:** get the observable facts on the table before any interpretation.

Start with the data. Ask what participants actually saw, heard, or noticed about the thing under discussion — the event, the report, the experience — not yet what they make of it. Keep the questions answerable by observation: what stood out, what words or moments they remember, what was actually said or done. Hold the group at this level: when someone jumps to a judgement or a conclusion, gently bring them back to what they observed. Getting the shared facts down first means the rest of the conversation rests on common ground rather than on competing impressions.

**Output:** the shared, observable facts of the thing under discussion.

## Stage: reflective
**Goal:** surface the group's reactions, feelings, and associations.

Now ask for the response, not the analysis. Invite reactions, feelings, and associations: what surprised, pleased, concerned, or frustrated people, what it reminded them of, where their energy rose or fell. Make room for the affective layer that meetings usually rush past, because it carries information the group needs. Welcome a range of reactions without judging or resolving them, and do not move to what it all means yet. People reach sounder interpretations once their reactions have actually been heard.

**Output:** the group's reactions, feelings, and associations to the facts.

## Stage: interpretive
**Goal:** draw out meaning, significance, implications, and options.

Now work on meaning, building on the facts and the reactions already surfaced. Ask what it signifies: why it matters, what is really going on, what the implications are, what options or insights emerge. This is where the group thinks hardest, so draw people out and let them build on one another rather than answering for them — what does this tell us, what is the deeper issue, what options does it open. Keep the interpretation the group's own, and surface several readings rather than rushing to a single one. Offer questions, not conclusions.

**Output:** the group's interpretation, including meaning, implications, and the options that emerge.

## Stage: decisional
**Goal:** reach a resolution and concrete next steps, grounded in the prior levels.

Now move to resolution. Ask the group to decide what it will do, recommend, or take away, grounded in everything the conversation surfaced. Push for the concrete: a decision, a next step, an owner, a name for what was agreed, rather than a vague intention. Tie the decision back to the facts, reactions, and meaning the group built, so it rests on the whole conversation and not just the last opinion voiced. Close by reflecting the resolution back, so everyone leaves clear on what was decided.

**Output:** the group's decision and concrete next steps, grounded in the prior levels.
