---
id: navigate-via-tension
title: Navigate via Tension
version: 0.1.0
status: draft
summary: People surface the tensions they feel in relation to the organization, investigate what sits behind each one, and name the ones that point to a real driver worth responding to.
source_method: Sociocracy 3.0 (Bernhard Bockelbrink, Liliana David, James Priest)
license: CC0-1.0
attribution: "Navigate via Tension is a pattern from Sociocracy 3.0 by Bernhard Bockelbrink, Liliana David and James Priest (sociocracy30.org), published under CC BY-SA 4.0. This spec is an independent rendering of the process for AI-assisted facilitation, written from the public pattern and dedicated to the public domain under CC0; the S3 authors are credited as originators of the method."
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: facilitator, label: Facilitator }
  - { slug: participant, label: Participant }
stages:
  - { id: notice-tension, title: Notice the tension, output: each person's named tension, a felt dissonance between what they see and what they would prefer }
  - { id: understand-the-situation, title: Understand the situation, output: the situation behind each tension, with any that dissolve on inspection set aside }
  - { id: name-the-driver, title: Name the driver, output: tensions that pass the value/waste/harm test, named as organizational drivers }
  - { id: route-the-driver, title: Route the driver, output: each named driver marked as this group's to act on or passed to where it belongs }
evals: ./evals
tags: [sense-making, drivers, surfacing, divergent, governance, small-group]
---

# Navigate via Tension

Navigate via Tension is a way for a group to find what actually needs its attention, starting from what people feel rather than from a pre-set agenda. A tension is the small inner signal that something is off: a gap between what someone perceives and what they would expect or prefer. The method takes that signal seriously, investigates the situation behind it, and tests whether it points to something the organization should respond to, a "driver." Not every tension is a driver, and naming the difference is the work. What comes out is a short list of real drivers, each routed to whoever should act on it.

**Who it's for:** a facilitator helping a team surface what genuinely needs deciding or changing, before jumping to solutions. It fits the opening of a governance or planning session, a backlog-building moment, or any time a group senses friction but has not yet named it. It is the wrong choice when the issue is already clearly defined and agreed, or when what's needed is a decision on an existing proposal rather than discovery (use Consent Decision-Making for that).

**Tension is a signal, not a complaint.** The point is not to vent and not to fix on the spot. A tension is information: treated well, it reveals an organizational driver, a situation worth responding to in order to generate value, reduce waste, or avoid harm. Treated badly, it becomes either a grievance or a rushed solution. The facilitator keeps the group in the narrow space between: feel it, understand it, test it, name it.

> **Provenance and status.** This spec is an independent rendering of the Sociocracy 3.0 Navigate via Tension pattern; see [`SOURCES.md`](./SOURCES.md). It is a `draft`: the prompt wording is ours and benefits from review by an experienced S3 practitioner before promotion to `tested`.

## Stage: notice-tension
**Goal:** invite each person to name a tension they are carrying, without judging or solving it yet.

Ask each person what feels off for them in relation to the team or the work: where is there a gap between what they see happening and what they would expect or prefer? Make clear that vague, half-formed, or emotional answers are welcome here; a tension does not have to be articulate to be real. Take them one at a time and receive each without evaluating it, ranking it, or jumping to what to do about it. Do not let the group debate whether a tension is "valid" at this stage. The aim is simply to get the felt signals into the open, in each person's own words.

**Output:** each person's named tension, a felt dissonance between what they see and what they would prefer, with nothing yet judged or resolved.

## Stage: understand-the-situation
**Goal:** investigate the situation behind each tension, and let the ones that were misreadings dissolve.

For each tension, help the person look at the actual situation that is stirring it, rather than at their first interpretation of it. Ask what is concretely happening, what they are seeing, and what they expected instead. Sometimes this inquiry reveals a misconception, and the tension simply goes away once the situation is clearer; when that happens, name it and let it go, with no pressure to manufacture a problem. The point is to get from "I feel uneasy" to "here is the situation I'm reacting to," in terms others could recognise.

**Output:** the situation behind each tension described plainly, with any tensions that turned out to be misreadings set aside.

## Stage: name-the-driver
**Goal:** test each remaining situation against the driver question, and name the ones that pass.

For each situation that still holds, ask the driver question directly: would responding to this help the organization generate value, reduce waste, or avoid an undesirable consequence? If yes, you have a driver: name it crisply as a situation plus why it matters, so it can be acted on later. If no, it can be let go. If it's unclear, say so and note what would need investigating to decide, rather than forcing it either way. Keep the named drivers concrete and shared, not private grievances; this is the raw material a proposal or decision will later respond to.

**Output:** the tensions that pass the value/waste/harm test, named as clear organizational drivers; the rest let go or flagged for further inquiry.

## Stage: route-the-driver
**Goal:** for each named driver, decide whether it is this group's to act on, and route the rest.

Take each driver and ask whether responding to it falls within this group's domain. If it does, mark it to carry forward into the group's priorities or its next decision. If it plainly belongs to another team or role, name who should hear about it and pass it on rather than absorbing work that is not yours. If it sits in between, weigh the effort of handing it off against simply taking care of it. The aim is that no real driver is lost and none is silently adopted by the wrong group.

**Output:** each named driver marked as this group's to act on, handed to where it belongs, or held with a clear owner to clarify.
