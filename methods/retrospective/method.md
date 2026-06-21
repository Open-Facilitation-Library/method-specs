---
id: retrospective
title: Retrospective
version: 0.1.0
status: draft
summary: A team sets aside regular time to look back over a period of work, make sense of what happened, and decide a small number of concrete improvements to try next.
source_method: Sociocracy 3.0 (Bernhard Bockelbrink, Liliana David, James Priest), adopting the five-phase structure of Agile Retrospectives (Esther Derby & Diana Larsen)
license: CC0-1.0
attribution: "Retrospective is a pattern in Sociocracy 3.0 by Bernhard Bockelbrink, Liliana David and James Priest (sociocracy30.org, CC BY-SA 4.0), which adopts the five-phase retrospective structure of Esther Derby and Diana Larsen (Agile Retrospectives, 2006). This spec is an independent rendering for AI-assisted facilitation, written from the public sources and dedicated to the public domain under CC0; the originators are credited above."
runtime:
  reference: harmonica
  artifact: single
roles:
  - { slug: facilitator, label: Facilitator }
  - { slug: participant, label: Participant }
stages:
  - { id: set-the-stage, title: Set the stage, output: everyone present and oriented to the period and focus, with a frank but safe tone established }
  - { id: gather-data, title: Gather data, output: a shared, concrete picture of what happened over the period, facts and feelings both }
  - { id: generate-insights, title: Generate insights, output: patterns and root causes the group draws from the data, beyond the surface events }
  - { id: decide-what-to-do, title: Decide what to do, output: a small number of concrete, owned improvements or experiments to try next }
  - { id: close, title: Close the retrospective, output: appreciations, confirmed actions, and a clean close }
evals: ./evals
tags: [retrospective, reflection, continuous-improvement, learning, team, recurring]
---

# Retrospective

A Retrospective is the regular time a team takes to look back over a stretch of work, understand it together, and decide how to do better, before pressing on. Its value is not in venting or in a long list of complaints, but in turning honest reflection into a few concrete changes the team actually commits to. It runs in five phases that move from opening, through what happened and what it means, to what to do about it, and a clean close. The discipline is to spend real time understanding before deciding, and then to choose few enough improvements that they actually get done.

**Who it's for:** a facilitator helping a team reflect on a period of work, a sprint, a project, a quarter, a release, and convert that reflection into improvements. It fits any team that works in cycles and wants to keep getting better. It is the wrong choice when what's needed is a decision on a specific proposal (use Consent Decision-Making) or a forward plan rather than a look back.

**Understand before you decide, and decide small.** Two failure modes shape the method. The first is jumping to fixes before the team has actually understood what happened and why, so the same problems recur; the phases deliberately hold gathering and sense-making before deciding. The second is leaving with a dozen well-meant actions that all evaporate; the deciding phase asks for a small number of concrete, owned changes, not an exhaustive list. The facilitator also tends the team's safety, since an unsafe retro produces polite silence rather than the truth.

> **Provenance and status.** This spec is an independent rendering of the Sociocracy 3.0 Retrospective pattern, which adopts the five-phase structure of Derby & Larsen's *Agile Retrospectives*; see [`SOURCES.md`](./SOURCES.md). It is a `draft`: the prompt wording is ours and benefits from review by an experienced retrospective facilitator before promotion to `tested`.

## Stage: set-the-stage
**Goal:** get everyone present, name the period and focus, and establish a frank but safe tone.

Open by bringing people in: a brief word from each person so everyone has spoken early, which makes it far likelier they'll speak again. Name the period under review and what this retrospective is focusing on, so the reflection has edges. Set the tone explicitly: this is a blameless look at the work and the system, not at people, and what's said here is in service of improving, not scoring. A retrospective is only as good as the candor in the room, and candor needs safety, so spend real attention here rather than rushing to content.

**Output:** everyone present and oriented to the period and focus, with a frank but safe tone established.

## Stage: gather-data
**Goal:** build a shared, concrete picture of what actually happened over the period.

Help the team surface what happened across the period, both the facts (events, decisions, numbers, what shipped, what slipped) and the felt experience (where it was energizing, where it was painful). Draw from everyone, not just the loudest voices, and keep it concrete: specific moments rather than general impressions. Hold off on explaining or fixing anything yet; this phase is about getting a full, shared picture on the table, including the parts that are uncomfortable to name. Different people will have seen different things, so gather the range rather than rushing to a single story.

**Output:** a shared, concrete picture of what happened over the period, facts and feelings both.

## Stage: generate-insights
**Goal:** make sense of the data, finding patterns and root causes beneath the surface events.

Now help the team move from what happened to why. Look across the data for patterns, connections, and the conditions that produced the good and the bad, rather than stopping at the first explanation. Encourage the group to dig beneath symptoms to causes ("we missed the deadline" → "what in how we work made that likely?"), and to credit what's working as carefully as what isn't. Resist jumping to solutions here; an insight the team genuinely shares is what makes the next phase's decisions land. Let more than one reading coexist if the data supports it.

**Output:** patterns and root causes the group draws from the data, beyond the surface events.

## Stage: decide-what-to-do
**Goal:** choose a small number of concrete, owned improvements to try next.

Turn the strongest insights into action. Help the team choose a *small* number of changes, often one to three, that it will actually commit to, rather than a long list that won't survive contact with the next cycle. Make each one concrete (what specifically will be different), owned (who is carrying it), and checkable (how the team will know it happened or helped). Where a change is really an experiment, frame it as one with a review point. Favor depth over breadth: a couple of improvements that get done beat ten that don't.

**Output:** a small number of concrete, owned improvements or experiments to try next, each with a way to tell if it worked.

## Stage: close
**Goal:** appreciate, confirm the actions, and close the retrospective cleanly.

Bring the retrospective to a deliberate end. Confirm the decided actions and their owners once more so nothing is left vague. Make room for brief appreciations, of the work, of each other, of the honesty in the room, which both closes the loop and builds the safety that makes the next retro better. A short check-out, a word from each person on how they're leaving, ends things cleanly rather than letting the meeting dissolve. Note where the actions are recorded so they can be picked up next time.

**Output:** appreciations shared, actions and owners confirmed, and a clean close, with actions recorded for follow-up.
