---
id: proposal-forming
title: Proposal Forming
version: 0.1.0
status: draft
summary: A group designs a proposal to fulfil a purpose through a structured divergent-then-convergent sequence — understand the driver, gather constraints and resources, surface requirements, generate ideas, and have a small group tune them into one coherent draft.
source_method: Sociocracy 3.0 (Bernhard Bockelbrink, Liliana David, James Priest)
license: CC0-1.0
attribution: "Proposal Forming is a pattern from Sociocracy 3.0 by Bernhard Bockelbrink, Liliana David and James Priest (sociocracy30.org), published under CC BY-SA 4.0. This spec is an independent rendering of the process for AI-assisted facilitation, written from the public pattern and dedicated to the public domain under CC0; the S3 authors are credited as originators of the method."
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: facilitator, label: Facilitator }
  - { slug: participant, label: Participant }
stages:
  - { id: confirm-purpose, title: Confirm the purpose, output: a clear, shared driver and requirement the group agrees it is here to fulfil }
  - { id: understand-and-gather, title: Understand the purpose and gather information, output: shared understanding of the situation plus the constraints, resources, and context that bound the design }
  - { id: surface-requirements, title: Surface requirements through generative questions, output: open questions sorted into essential, desirable, and maybe-later requirements the proposal should meet }
  - { id: collect-ideas, title: Collect ideas, output: a wide, un-judged pool of ideas for how to fulfil the purpose }
  - { id: draft-proposal, title: Tune a coherent proposal, output: one coherent draft proposal, ready to take to a consent decision }
evals: ./evals
tags: [proposal-design, divergent, convergent, co-creation, governance, small-group]
---

# Proposal Forming

Proposal Forming is a structured way for a group to design a proposal together, drawing on everyone's perspective instead of leaving it to one author. It moves through a deliberate sequence: get clear on the purpose, understand the situation and what bounds it, surface the requirements a good answer must meet, generate ideas widely, and then hand the raw material to a small group who tune it into one coherent proposal. The shape is divergent then convergent: open the field wide before narrowing it, so the proposal carries the group's collective intelligence and its sense of ownership.

**Who it's for:** a facilitator helping a group design a proposal for a real driver, where the answer is not obvious and the people affected should shape it. It fits policy and working-agreement design, planning a significant intervention, or any decision worth co-creating rather than handing down. It is the wrong choice when a workable proposal already exists (take it straight to Consent Decision-Making) or when there is no agreed driver yet (surface one first; see Navigate via Tension).

**Keep the field open before you narrow it.** The most common failure is converging too early, latching onto the first plausible solution before the requirements are clear. The method guards against this in two ways: it asks for requirements as open "generative questions" before any ideas, and it watches for solutions disguised as questions ("could we just use tool X?"), reframing them into open form so the group keeps diverging. Only once ideas are gathered does a small group converge them into a draft. The facilitator holds that discipline: no solving until the field has been opened.

> **Provenance and status.** This spec is an independent rendering of the Sociocracy 3.0 Proposal Forming pattern; see [`SOURCES.md`](./SOURCES.md). It is a `draft`: the prompt wording is ours and benefits from review by an experienced S3 practitioner before promotion to `tested`.

## Stage: confirm-purpose
**Goal:** make sure the group shares a clear driver and requirement before designing anything.

Put the purpose in front of the group: the driver (the situation worth responding to) and the requirement (what a response needs to achieve). Check it is clear enough, that it is genuinely this group's to address, and that the requirement is suitable. Resolve any objection to the purpose or its wording before going further; designing a proposal for a fuzzy or misplaced purpose wastes everyone's effort. If this method is being run straight after a driver has already been named and agreed, keep this brief, just confirm the shared purpose and move on.

**Output:** a clear, shared driver and requirement the group agrees it is here to fulfil.

## Stage: understand-and-gather
**Goal:** deepen shared understanding of the situation, and gather what bounds the design.

First, let people ask what they still need to know to understand the driver and requirement, and record the answers (not the questions). Then gather the information that will shape a feasible proposal, sorted into a few buckets: constraints (what limits what's possible), resources (what the group can draw on), other relevant context, and things to find out (questions worth answering that can't be answered now). Take it in rounds, keep it brief, and cluster duplicates rather than re-listing them. Hold off on ideas; this movement is about grounding the design in reality, not designing yet.

**Output:** a shared understanding of the situation, plus the constraints, resources, context, and open information-questions that bound the design.

## Stage: surface-requirements
**Goal:** surface, as open questions, the requirements a good proposal must meet, and sort them by priority.

Ask for generative questions: open, many-answers questions that point toward what the proposal needs to address ("how might we...", "what's the simplest way to...", "what can we learn from how others did this?"). Collect them without answering them yet, and watch for solutions disguised as questions; when one appears, reframe it into open form or hold it for the ideas movement, so the field stays divergent. Then sort the questions into essential, desirable, and maybe-later, so the group knows what a proposal must satisfy versus what would be nice. Keep the group from converging on answers here; the aim is a clear set of requirements, not a solution.

**Output:** open generative questions sorted into essential, desirable, and maybe-later requirements the proposal should meet.

## Stage: collect-ideas
**Goal:** generate a wide pool of ideas for fulfilling the purpose, without judging them.

Invite ideas for how to meet the requirement: complete solutions, partial ones, iterative first steps, and answers to the generative questions. Give people a moment to think alone first, then gather in rounds, one idea at a time, until they are spent. Welcome contradictory and half-formed ideas explicitly; this is divergence, so do not let the group evaluate, compare, or debate ideas yet, only clarify what an idea means if it's unclear. Cluster near-duplicates rather than re-stating them. The richer and more varied the pool, the better the proposal the tuners can build.

**Output:** a wide, un-judged pool of ideas for how to fulfil the purpose.

## Stage: draft-proposal
**Goal:** delegate to a small group who tune the raw material into one coherent proposal.

Choose two or three tuners: people with relevant experience, willingness, and ideally some diversity of perspective (asking who others think should be there, who wants to, and who outside the group might contribute). The tuners do not decide; they synthesise. Their job is to review all the gathered input, select and combine the promising ideas, and shape one coherent proposal that meets the essential requirements, adding new elements only where needed. A good draft names the purpose it serves, what is proposed and why, who is responsible for what, a review date, and how success will be judged. Favour a viable, iterative first step over an exhaustive plan, with an early review built in. The draft is not the decision; it is what the group will take to a consent decision.

**Output:** one coherent draft proposal, with purpose, responsibilities, a review date, and success criteria, ready to take to Consent Decision-Making.
