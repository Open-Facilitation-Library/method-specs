# Facilitation Skills — All Things Product podcast — extraction (2026-09-09)

**Source:** https://www.producttalk.org/facilitation-skills-all-things-product-with-teresa-torres-petra-wille/ — *All Things Product* episode, Teresa Torres & Petra Wille, published 2026-09-08. Video: https://www.youtube.com/watch?v=Pm3iNn_ZwgA.

**Source limitation (important).** The episode's full transcript is **paywalled** ("This post is for paying subscribers only") and the YouTube video **has no captions or auto-captions** (confirmed via `yt-dlp --list-subs`, both `android_vr` and `web,tv` clients). This extraction is therefore built from:

1. the episode page's 11 editorial key-takeaways (substantive, but editorially compressed), and
2. the two resources the episode links, both fetched **in full** — these carry the actual mechanisms:
   - Petra Wille, "The Secret Weapon of Retrospectives – the Team Radar" (2020-08-14) — https://www.petra-wille.com/blog/the-secret-weapon-of-retrospectives-the-team-radar
   - Teresa Torres, "Take a Team Approach to Product Delivery" (2015-04-01) — https://www.producttalk.org/taking-a-team-approach-to-product-delivery/

Neither page carried a comment thread (Torres's article shows "Comments (0)"). If the transcript is later obtained, the gaps most worth filling are: the named academic citation behind the task/relationship conflict distinction, and Petra's worked examples of facilitator selection and the chair-swap.

**Why captured:** two complete, unclaimed facilitation methods (Team Radar, Team Charter) plus a conflict-classification gate that the existing spec set has no equivalent for. The `retrospective` spec in this repo is deliberately activity-agnostic — its own SOURCES.md Modelling note says S3 "describes the Retrospective only at the level of the five phases, deliberately leaving the per-phase activities open (it points to an external activity library)." Team Radar is exactly the activity that note declines to prescribe.

---

## Method candidate 1: Team Radar (Petra Wille)

A retrospective format for teams that are **not receptive to direct feedback** — where the facilitator can see a pattern the team can't yet. Fully specified in the source; this is the strongest single spec candidate here.

**Framing.** Petra's premise: *"You can't push the car you're sitting in."* If the product manager spots patterns before everyone else, that's because they're **not fully part of the team** — and that vantage is an advantage to use deliberately, not a reason to state the observation outright. With a high-trust team you can name the issue directly; with a defensive one, you design a radar instead so the team reaches it itself.

### Mechanism

- **The instrument.** An "eight-legged spider" graphic: 8 axes, each labelled with a topic, each with a rating scale. The team rates itself per axis, then the dots are connected.

- **The 1–7 scale, and why it's odd-numbered.** Explicit design decision: *avoid a scale with a median*. A 1–10 scale is rejected because "teams will always tend towards a 5." Petra always uses **1–7**, which "often leads to lots of discussion about whether to go for 3 or 4." The forced argument at the midpoint is the mechanism, not a side effect. **This is the sharpest single mechanic in the source** and the one most worth preserving verbatim in any spec.

- **Collective rating, not aggregated individual dots.** The team must *agree on* a rating per axis; the discussion required to converge is where the value is. Not a survey averaged into a shape.

- **Axis selection has a rule, not a vibe.**
  1. Axis #1 is whatever the facilitator noticed when they sensed "things aren't quite right."
  2. Label it **deliberately ambiguously** — "meeting culture" rather than "punctuality" — so it is open enough for the team to interpret, and disownable if it isn't real.
  3. The rest are drawn from **agile values, principles, and practices**.
  4. **3–4 axes must be topics where the team can score well** or acknowledge progress. Explicitly: "it's also important not to focus solely on problems."
  - The design gives the facilitator's private concern a guaranteed hearing while leaving the team free to say it isn't a problem. A good score on axis #1 is a valid, informative outcome: "maybe the only person bothered by it is the product manager, in which case the team will give itself a good mark and no further action is needed."

- **Timeboxing.** 8–10 minutes per axis, TimeTimer recommended. Total budget stated: **8 axes = 120 minutes, 4 axes = 60 minutes.** Omitting an axis entirely is explicitly better than running out of time before action items.

- **Post-Its, four colours, one writer.** Green = positive, pink = negative, blue = general comment, yellow = the axis labels rewritten. Decide up front who writes — Petra usually writes them all herself, "as this frees up the team to discuss without any distractions."

- **From shape to actions.** Connect the dots; the worst-scoring topics become visible. Derive action items for **at most three** topics, starting with the worst. **Names go on the action items.**

- **Tendency as tiebreak — direction, not just level.** Thumb-voting on whether each topic is *improving or worsening*. When several topics score similarly badly, start with the one with the **worst tendency**. A mediocre-but-improving axis is a different problem from a mediocre-and-sliding one.

- **Longitudinal by design.** "It is often a good idea to repeat the Radar in exactly the same form after a few months." The instrument's second use is comparative — it charts progress. This makes it a *tracking* instrument, not a one-off exercise, which is unusual among retro formats.

- **Moderation discipline.**
  - Stay out of the discussion. "You already know what your opinion is — so it's far more insightful to find out what the team thinks... You'll only find this out if you keep your lips sealed."
  - **Interject only on extremes.** Some teams are uniformly positive, more often uniformly self-critical; when the whole shape skews, name that gently.
  - Standard retro opener ("setting the stage") still applies — Petra uses a "How are you feeling today?" check-in.

### Relationship to the existing `retrospective` spec

Maps onto the five phases as a concrete instantiation, principally of **gather-data** but reaching across:

| Retrospective phase | Team Radar element |
|---|---|
| set-the-stage | "How are you feeling today?" check-in; explaining why these axes were chosen |
| gather-data | The 8 axes, 1–7 collective ratings, coloured Post-Its per axis |
| generate-insights | Connecting the dots; tendency thumb-vote; naming skew |
| decide-what-to-do | Action items for the ≤3 worst axes, each with a name |
| close | Standard close; flip chart hung in the team space; schedule the repeat |

Two ways to ship it, both worth considering:
- **(a) Sibling spec** — `team-radar` as its own method, cross-referencing `retrospective` as the parent structure. Cleaner, because the axis-selection rule and the longitudinal repeat are method-level decisions, not phase activities.
- **(b) Named activity** referenced from `retrospective`'s `gather-data` stage. Lighter, but loses the parts that don't fit inside one phase.

Recommendation is (a): the 1–7 scale rationale, the ambiguous-label rule, the 3–4-positive-axes rule and the repeat-identically instruction are all *method* commitments, and burying them inside one phase of a deliberately activity-agnostic spec would lose them.

### Async / Harmonica-runtime notes

- The collective-rating discussion is the load-bearing part and is **synchronous by design**. An async rendering must not silently degrade into "everyone rates privately, we average" — that discards the mechanism. A faithful async version needs a visible convergence step per axis.
- The one-writer Post-It convention is a natural fit for an AI facilitator (it *is* the writer).
- The longitudinal repeat implies the runtime needs to carry the prior radar's axes and scores into a later session — a chained-session shape.
- Provenance: Petra Wille, first published in German at produktbezogen.de. Not CC-licensed as far as the page states; a spec would be an independent rendering with attribution, as with the existing `retrospective` spec. **Licence status needs checking before promotion beyond draft.**

---

## Method candidate 2: Team Charter (Teresa Torres)

No equivalent in the current spec set. Fully specified in Torres's article, and grounded in team-performance research she cites.

**Framing.** "A collection of people does not make a team." Research on team performance says teams need time to work out how to work together, and most teams instead import norms from members' *past* teams — producing the forming/storming period that few schedules have room for. A charter is the intervention that shortens it. Torres is explicit that it is **not a team-building exercise** but a **social contract**: members commit both to abiding by it and to updating it when a norm stops working. It is a living document.

The episode's framing adds the sharper point: the powerful version of a charter isn't "what's our outcome" — it's **working hours, communication preferences, and how each person likes to make decisions**. Making implicit norms explicit prevents friction before it starts.

### Mechanism

**Stage 1 — individual pre-work, done privately, before any group conversation.** Each person completes eight sentence stems:

- What matters to me most in my professional work is …
- Professionally, I aspire to …
- My strengths that I can offer this team are …
- As a team, we would be successful if …
- I don't like being on teams that …
- The best way to get in touch with me is …
- I am typically available …
- You should also know that I …

**Stage 2 — round-robin share.** Everyone takes turns reading their responses.

**Stage 3 — set team goals**, holding the individual goals just heard. "You won't always be able to accommodate every individual goal... but get creative." Explicitly go beyond business metrics: candidate goals include being more collaborative, reducing meeting time, being inclusive in idea generation, spending time with customers, improving communication with the rest of the business.

**Stage 4 — define norms and operating principles.** Who attends which meetings and how they should prepare; which communication channels work for everyone; who needs to be available when; what tools for what purpose. Note that the team *already has* norms — the work is examining what's working and writing them down.

**Stage 5 — clarify roles and responsibilities.** The critical distinction: **who gives input vs. who makes the final call**, per decision area. Identify which areas need multi-role collaboration. Ensure clear ownership of domains and that expertise is actually drawn on ("let your designer make the design decisions; ask your chief architect to sign off on the new data model").

**Diagnostic for whether a team needs this** (Torres's "don't gloss over this exercise" list) — any yes means run it:
- Have you ever wished that someone on your team was doing something they weren't?
- Is there an activity you want to be more or less involved with?
- Does your team tend to encounter the same pitfalls over and over?
- Does your release schedule or sprint commitments tend to slip?
- Do people complain behind each others' backs?

### Async / Harmonica-runtime notes

This is an unusually good fit for the async pre-work + synthesis shape: stage 1 is **individually authored, privately, in advance** — which is precisely what Harmonica does well — and stages 3–5 are group convergence over that material. The eight stems are close to a ready-made intake instrument.

The input-vs-final-call separation in stage 5 maps onto role definition in a chained session.

---

## Framework: task conflict vs. relationship conflict

The episode's central framework, from academic research on team dynamics. The page does not name the citation and the transcript is paywalled, but it resolved (via OpenAlex, 2026-09-09) to:

- **Jehn, K. A. (1995).** A multimethod examination of the benefits and detriments of intragroup conflict. *Administrative Science Quarterly*. https://doi.org/10.2307/2393638 — 4,048 citations. Origin of the task/relationship split and of the "task conflict can be beneficial" claim.

**A caveat the episode does not mention, and which matters more than the citation itself:**

- **De Dreu, C. K. W., & Weingart, L. R. (2003).** Task versus relationship conflict, team performance, and team member satisfaction: A meta-analysis. *Journal of Applied Psychology*. https://doi.org/10.1037/0021-9010.88.4.741 — 3,069 citations. **Found both kinds of conflict negatively correlated with performance.**

So the *distinction* is well-founded and is the useful part. The episode's *valorisation* of task conflict — "task conflict is good," its absence indicates poor psychological safety — is contested by the leading meta-analysis in the field. Anything that treats the presence of task conflict as a health signal is building on the weaker half of this, and should cite De Dreu & Weingart alongside Jehn.

**The distinction:**
- **Task conflict** — we disagree about *how to do the work*.
- **Relationship conflict** — something about *how we work together* puts us at odds.

**The two require opposite responses, and confusing them is where teams get stuck:**

| | Task conflict | Relationship conflict |
|---|---|---|
| Direction | **Widen** — bring it to the team | **Narrow** — start one-on-one |
| Why | What looks like two people disagreeing is often a disagreement others share silently, or one someone else on the team can resolve | Try to resolve directly first; HR or mediation is the escalation path, not the opening move |
| Addressed by | Shared discovery | Team charters (pre-emptively) |
| When it's opinion vs. opinion | Design an experiment rather than escalating the debate | — |

**Task conflict is good.** It is how teams get to better problem solving. **Its absence is a warning, not a win** — "if there's none at all, that's likely a psychological safety problem, not a harmony win."

This inverts a metric worth flagging for anyone building session-health scoring: a session that reaches easy consensus with no disagreement may be *failing*, and a judge that rewards consensus would be scoring the wrong thing.

**But do not invert it all the way.** Per De Dreu & Weingart above, treating *more task conflict* as the health signal is not supported either — they found both kinds negatively correlated with performance. The defensible reading is narrower: frictionless consensus is not by itself evidence of a good session, so it should not be scored as one. That is weaker than "disagreement is good," and it is the version to build on.

---

## Facilitation-practice items (not methods, but spec-relevant)

- **Facilitator selection has a discriminator: does context help or hurt?** Not "who is the designated facilitator" but a real choice per session. An embedded agile coach may know **too much history to stay neutral**; sometimes the product person, or a senior engineer with strong facilitation instincts, is the better pick. Corollary worth noting for AI-facilitation positioning: zero-history neutrality is an asset in exactly the cases where the embedded coach is disqualified.

- **Facilitation is a learnable skill, not a personality trait.** Someone in the organization needs to be good at it, and product people should be *learning* it rather than defaulting to outsourcing it to an agile coach or scrum master. (This is OFL's founding premise, independently arrived at.)

- **"Leave your ego at the door": the facilitator writes the headline Post-Its and nothing else.** A hard, checkable constraint — considerably sharper than "stay neutral" and directly testable as an eval criterion.

- **Role-switch signalling — the chair swap.** Petra describes a facilitator who **physically switched chairs** to mark "I am speaking as a team member now" vs. "as facilitator." A concrete solution to the dual-role problem. Runtime analogue: when a session host also participates, nothing currently marks which role a given contribution comes from.

- **Joint escalation.** Have both parties in a conflict **write it down together**. Two effects: the act of co-writing usually shrinks the conflict, and where escalation is genuinely needed, leadership receives something concrete rather than two competing accounts. A two-party, artifact-producing protocol with no equivalent in the current spec set — a plausible method candidate in its own right, though less fully specified in the source than the two above.

- **Retrospectives still work.** Agile may feel unfashionable, but protecting time to ask "how are we working together?" remains among the most valuable things a team does. (Confirms the existing `retrospective` spec's premise.)

---

## Analysis: what should become a spec

**Strongest — Team Radar.** Complete mechanism, tested in practice, distinctive design decisions (odd-numbered scale, ambiguous first axis, mandatory positive axes, longitudinal repeat) that are not folk-wisdom and would be lost if paraphrased. Fills the exact gap the `retrospective` spec's Modelling note names. Ship as a sibling spec, `status: draft`, attributed to Petra Wille. **Check licence before promotion** — the blog is not visibly CC-licensed.

**Strong — Team Charter.** Complete mechanism, research-grounded, no OFL equivalent, and the private-pre-work-then-share shape suits async facilitation unusually well. Attributed to Teresa Torres. Note that Torres's *Continuous Discovery Habits* is already in the local book-power corpus (`book-power/books/continuous-discovery-habits.md`), which may carry related material worth cross-checking when drafting.

**Framework, not a spec — task vs. relationship conflict.** Belongs as a *routing gate* in front of conflict-shaped methods (it would give `navigate-via-tension` a discriminator it currently lacks) rather than as a method of its own. Needs its citation verified first.

**Candidate, under-specified — joint escalation.** Real mechanism, but the source gives one sentence. Would need a second source before drafting.
