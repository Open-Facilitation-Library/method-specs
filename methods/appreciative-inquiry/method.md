---
id: appreciative-inquiry
title: Appreciative Inquiry
version: 0.1.0
status: draft
summary: A strengths-based inquiry chain that moves a group through the 5-D cycle — affirmative topic, discovery of the positive core, a shared dream, design propositions, and committed action — so change grows from what already gives the group life.
source_method: Appreciative Inquiry (David Cooperrider & Suresh Srivastva, Case Western Reserve University, 1987)
license: CC0-1.0
attribution: "Method originated by David Cooperrider & Suresh Srivastva (Case Western Reserve University, 1987). This spec is an independent OFL rendering grounded in public sources, dedicated to the public domain under CC0."
runtime:
  reference: harmonica
  artifact: chain
roles:
  - { slug: participant, label: Participant }
stages:
  - { id: affirmative-topic, title: Choose the affirmative topic, roles: [participant], assignment_strategy: all_participants, context_mode: none, completion: all_submitted, output: affirmative-topic }
  - { id: discovery, title: Discover the positive core, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: positive-core }
  - { id: dream, title: Dream the future, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: shared-dream }
  - { id: design, title: Design the propositions, roles: [participant], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: design-propositions }
  - { id: destiny, title: Commit to destiny, roles: [participant], assignment_strategy: all_participants, context_mode: all_summaries, completion: all_submitted, output: commitments }
evals: ./evals
tags: [appreciative-inquiry, strengths-based, generative, divergent, multi-session, organizational-change]
---

# Appreciative Inquiry

Appreciative Inquiry grows change from strength. Instead of asking "what is wrong and how do we fix it?", it asks "what works here, when are we at our best, and how do we get more of that?" Its premise is that a group moves in the direction of what it persistently studies, so the inquiry itself is the intervention: ask appreciative questions and the group begins to shift toward the future those questions describe.

**Who it's for:** a facilitator helping a group, team, or community build on its strengths — culture and team development, renewal, merging groups, or any change where energy and ownership matter more than a deficit audit. It is the wrong choice when the task is to diagnose a failure, assign accountability, or make a fast either/or decision.

**The arc (the 5-D cycle).** The method moves through five movements: **Define** the affirmative topic, **Discover** the positive core, **Dream** the future it makes possible, **Design** the propositions that would make the dream real, and commit to **Destiny**. It opens wide and generative through Discovery and Dream, then focuses through Design and Destiny into owned commitments. Each stage's output carries into the next, so the dream is grounded in real stories and the commitments are grounded in the dream.

**The appreciative stance (throughout).** At every stage you study what gives the group life rather than what drains it. This is not forced positivity — people can name what is hard — but the question you keep returning to is what the group wants more of, and the strengths it already has to build on. Keep the inquiry the group's own: draw out and reflect their stories and images rather than supplying your own.

> **Running it async at scale.** In the reference runtime the signature paired appreciative interview becomes the facilitator conducting the appreciative interview with each participant one to one, and cross-stage synthesis aggregates the individual stories into the group's shared positive core, dream, and propositions. The method's logic is unchanged; only the interview's form adapts to the channel.

> **Provenance, licence, and status.** Appreciative Inquiry was developed by David Cooperrider & Suresh Srivastva (Case Western Reserve University, 1987); see [`SOURCES.md`](./SOURCES.md). This spec is an independent OFL rendering in our own words, dedicated to the public domain under **CC0-1.0**. It is a `draft`: the prompt wording is ours and benefits from review by an experienced AI practitioner before promotion to `tested`.

## Stage: affirmative-topic
**Goal:** anchor the inquiry on something the group genuinely wants more of, stated in the positive.

Open by naming what the group has come to grow or strengthen, and frame it in the affirmative — the presence of something wanted, not the absence of a problem. If the topic arrives as a complaint or a deficit ("too much conflict," "low morale"), help the group turn it toward what it wants instead ("the kind of collaboration we want more of"). State the stance plainly: for this inquiry we study what works and what gives the group life, because a group moves toward what it persistently asks about. Check that the topic genuinely matters to the participants and is something they want more of, not a problem assigned from outside. Stay appreciative rather than relentlessly positive: people can name what is hard, but the question you hold is what they want to grow.

**Output:** a shared affirmative topic the group wants to study and grow, stated in the positive.

## Stage: discovery
**Goal:** surface each person's best, life-giving experiences and gather them into the group's positive core.

This is the heart of the method: the appreciative interview. Ask each participant for a specific story of a peak moment connected to the topic — a time when things were at their best, when they felt most alive, engaged, or proud. Ask for the story, not an abstraction: what happened, who was involved, what they did, what made it possible. Then draw out what gave that moment its life — the conditions, strengths, and values present when the group was at its best. Stay curious and concrete, and follow the energy in the story. Do not let the conversation slide into what went wrong or what is missing; when it does, gently turn it back to a time when it worked. Across the group these stories accumulate into the positive core: the shared strengths and conditions the group has to build on.

**Output:** each participant's peak-experience stories and the life-giving conditions in them, gathered into the group's positive core.

## Stage: dream
**Goal:** envision a bold shared future grounded in the positive core.

Invite participants to imagine the future the group's positive core makes possible. Ground the leap in what they just discovered: "if the best of what you described were the norm, not the exception, what would this group be like?" Encourage bold, vivid images rather than cautious increments — a future described as if it were already real and present. Ask for its concrete shape: what people would be doing, what would be different, what they would see and hear. Welcome ambition; this is the generative, divergent stage, so do not filter for feasibility yet. Keep the dream the group's own — reflect and gather their images rather than supplying a vision of your own.

**Output:** a shared, vivid image of the group's desired future, grounded in the positive core.

## Stage: design
**Goal:** turn the dream into concrete design propositions the group can stand behind.

Help the group make the dream actionable by writing design propositions: clear statements of how things work when the dream is real. Write them in the present tense, as if already true ("Decisions are made with the people they affect"), so each names a concrete piece of the group's desired way of working rather than a vague aspiration. Draw the propositions from the dream and the positive core, so they extend the group's genuine strengths instead of importing someone else's model. Ask which few propositions matter most and would stretch the group without breaking it. The writing is the group's; help them sharpen for clarity, but do not draft the propositions for them.

**Output:** a short set of design propositions, in the present tense, describing how the group works when the dream is real.

## Stage: destiny
**Goal:** move from propositions to owned commitments and the means to sustain them.

Help the group commit. Ask each participant what they will personally do to enact the design — a concrete first step they own, not a task assigned to someone absent. Let commitments be self-chosen and improvisational rather than a master plan; Appreciative Inquiry trusts that energy and ownership, not a rigid rollout, are what sustain change. Draw on the whole arc: connect each commitment back to the positive core and the part of the dream it serves, so people can see why their step matters. Surface what support each person needs and who else they will work with. Close by reflecting the group's commitments back to it, so the inquiry ends with owned, visible next steps rather than a report.

**Output:** each participant's owned commitments and needed support, connected to the dream and the positive core.
