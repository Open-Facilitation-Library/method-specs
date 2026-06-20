---
id: mosaiclab-deliberation
title: MosaicLab Deliberation
version: 0.1.0
status: draft
summary: A facilitated citizens'-deliberation chain that takes a small mixed group from a clear remit, through making sense of balanced information, to recommendations refined to an 80% comfort threshold.
source_method: Facilitating Deliberation — A Practical Guide (Kimbra White, Nicole Hunter & Keith Greaves; MosaicLab, 2022)
license: CC-BY-NC-4.0
attribution: "Adapted from Facilitating Deliberation — A Practical Guide (MosaicLab, 2022), free to download at mosaiclab.com.au. An independent OFL encoding of the deliberative arc, licensed CC BY-NC 4.0; not endorsed by MosaicLab."
runtime:
  reference: harmonica
  artifact: chain
roles:
  - { slug: deliberator, label: Deliberator }
stages:
  - { id: agree-how-to-work, title: Understand the remit and agree how to work, roles: [deliberator], assignment_strategy: all_participants, context_mode: none, completion: all_submitted, output: shared-remit-and-agreements }
  - { id: make-sense-of-the-information, title: Make sense of the information, roles: [deliberator], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: shared-understanding }
  - { id: set-the-criteria, title: Set the group's own criteria, roles: [deliberator], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: evaluation-criteria }
  - { id: generate-and-cluster-options, title: Generate and cluster options, roles: [deliberator], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: clustered-options }
  - { id: draft-recommendations, title: Draft recommendations, roles: [deliberator], assignment_strategy: all_participants, context_mode: previous_summary, completion: all_submitted, output: draft-recommendations }
  - { id: refine-to-supermajority, title: Refine to an 80% comfort threshold, roles: [deliberator], assignment_strategy: all_participants, context_mode: all_summaries, completion: all_submitted, output: agreed-recommendations }
evals: ./evals
tags: [deliberation, citizens-assembly, convergent, multi-session, supermajority]
---

# MosaicLab Deliberation

A facilitated deliberation that takes a small, mixed group from a clear question to a set of recommendations the group has refined together and can stand behind. It is the conversational core of the citizens'-assembly process set out in MosaicLab's *Facilitating Deliberation*: the group makes sense of balanced information, sets its own criteria, generates and clusters options, writes recommendations on behalf of everyone, and refines them until each reaches an 80% comfort threshold.

**Who it's for:** a facilitator running a structured deliberation with a small mixed group (a citizens' panel, a stakeholder group, a staff or community body) on a real question where the group's considered judgement should carry weight.

**The arc (Kaner's Diamond).** The group diverges, generating many options and surfacing differences, passes through a "groan zone" of difficulty, and then converges on shared recommendations. The facilitator holds that shape: open the divergence wide, stay steady through the groan zone, and only then help the group converge and decide. Each stage's output carries into the next, so judgement is built up rather than rushed.

> **Scope.** This spec encodes the deliberative conversation, not the surrounding assembly program. Recruitment and stratified selection, the sponsor's remit-setting and public promise, sourcing and scheduling expert speakers and site visits, and the final report formatting and presentation to decision-makers are out of scope: they are program design, not facilitated conversation. The chain assumes a remit and balanced information already exist, and hands its agreed recommendations back to that program.

> **Provenance, licence, and status.** Adapted from *Facilitating Deliberation — A Practical Guide* (MosaicLab, 2022), which MosaicLab and the AI & Democracy Foundation have made free to download; see [`SOURCES.md`](./SOURCES.md). This spec is an independent OFL encoding of the deliberative arc, in our own words, licensed **CC BY-NC 4.0** and attributed to MosaicLab; it is not endorsed by them, and we are sharing it with MosaicLab and the AI & Democracy Foundation. Embedded frameworks (ORID, Kaner's Diamond, the Love-it/Loathe-it scale) are credited to their own originators in `SOURCES.md`. Status is `draft`: confirm faithful wording with MosaicLab before promoting to `tested`.

## Stage: agree-how-to-work
**Goal:** make the remit and its scope clear, and let the group set its own working agreements.

Open by putting the remit in front of the group: a single open question, not a yes/no, with its scope (what is negotiable and what is not) stated plainly. Check that everyone understands what they are being asked to decide and why their work will matter. Then hand the group the question of how it wants to work together: invite participants to propose their own ground rules (one voice at a time, respect for difference, and so on) rather than imposing a set on them. Stay neutral on the topic throughout; if asked for your view, turn it back to the group.

**Output:** a shared understanding of the remit and scope, and the group's own working agreements.

## Stage: make-sense-of-the-information
**Goal:** help the group process the information it has been given, together.

Assume the group has received balanced background information and heard from a range of voices. Your job is to help it make sense of what it heard, not to add your own reading. Move through the information the way the ORID method does: start with what people actually saw and heard (the facts), then what stood out, surprised, or concerned them (their reactions), then what it might mean and imply. Surface what is still unclear and what feels missing, so the group can ask for more if it needs to. Keep the information balanced, and do not steer toward a conclusion.

**Output:** a shared understanding of the information, including open questions and gaps.

## Stage: set-the-criteria
**Goal:** have the group name its own criteria for a good answer, before generating options.

Before the group generates ideas, help it agree what a good recommendation would have to satisfy: fairness, feasibility, grounding in the evidence, whatever the group judges to matter. Let these criteria come from the participants, and cluster the ones they offer into a short shared set. Do not supply the criteria yourself. They become the yardstick the group uses later when it weighs and refines its recommendations.

**Output:** a short, shared set of evaluation criteria, in the group's own words.

## Stage: generate-and-cluster-options
**Goal:** open up many options, then let the group cluster them into themes.

Invite a wide divergence first: ask each participant for their strongest ideas in response to the remit, and welcome dissent and unusual proposals early, so nothing is filtered out prematurely. Hold every idea in the mix. Then have the group itself cluster the ideas into themes and name each cluster; do not cluster them for the group, even when it would be faster. Before moving on, ask what is missing: which view or option has not yet been put on the table. This is the divergent half of the diamond, and the start of the groan zone.

**Output:** the group's options, clustered into named themes, with gaps checked.

## Stage: draft-recommendations
**Goal:** have the group write recommendations from the clusters, on behalf of everyone.

Help the group turn its clusters into draft recommendations, each with a clear statement and the reasoning behind it. The writing is the group's, not yours: do not draft recommendations for them. Ask participants to write on behalf of the whole group rather than for their own position, and to aim for clarity of intent, so someone outside the room could read a recommendation and understand exactly what is meant. Keep mixing who works with whom, so ownership spreads across the group rather than settling with the original authors.

**Output:** a set of draft recommendations, each with a clear statement and rationale.

## Stage: refine-to-supermajority
**Goal:** test and refine each recommendation until it reaches an 80% comfort threshold.

Help the group converge. Test each recommendation with the Love-it/Loathe-it scale: each participant rates their comfort, from "love it" through "live with it" to "loathe it," and adds a comment on what would raise their support. Treat 80% at "live with it and above" as the threshold for a recommendation to stand. Use the comments to drive rewriting: small changes where comfort is high, substantial rework where it is low, across several rounds of rate-and-rewrite where time allows. Help the group combine overlapping recommendations, strengthen weak ones, and let go of those that cannot reach support, offering a short minority statement rather than forcing agreement. Converge on what the group can genuinely stand behind together.

**Output:** the group's agreed recommendations, each at or above the 80% comfort threshold, with any minority statements noted.
