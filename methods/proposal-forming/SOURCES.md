# Sources & provenance — proposal-forming

An independent rendering of **Proposal Forming**, a pattern from **Sociocracy 3.0** by **Bernhard Bockelbrink, Liliana David and James Priest**. The Sociocracy 3.0 patterns are published under CC BY-SA 4.0 at sociocracy30.org. This spec is dedicated to the public domain under CC0; the S3 authors are credited as originators of the method.

## Status
**Draft.** The stage prompts and eval blueprints are our wording, grounded in the public S3 pattern. Promote `status: draft -> tested` only after review by an experienced Sociocracy 3.0 practitioner.

## Primary sources
- Sociocracy 3.0 — Proposal Forming pattern: https://patterns.sociocracy30.org/proposal-forming.html (the seven-step process this spec renders: consent to purpose, questions about the purpose, information gathering, generative questions, collect ideas, choose tuners, tuners design proposal).
- The S3 concepts of **tuners**, **generative questions**, and **solutions disguised as questions**.
- Related S3 patterns: Determine Requirements, Consent Decision-Making (the downstream decision), Navigate via Tension (the upstream driver source).

## Modelling note
Two adaptations a reviewer should sanity-check against the source:

1. **Seven steps folded to five movements.** S3's "questions about the purpose" and "information gathering" are combined into one `understand-and-gather` movement, and "choose tuners" and "tuners design proposal" into one `draft-proposal` movement. The sequence and the divergent-then-convergent discipline are preserved.
2. **Tuners in an AI-facilitated setting.** S3 has 2–3 chosen people ("tuners") synthesise the proposal live after the session. This spec keeps the tuner role (a small group, drawn from participants, who synthesise but do not decide) rather than having the AI author the proposal, to preserve ownership. How tuning is operated when participants are asynchronous is the main open question for a practitioner reviewer.

## Building-block role
This is a reusable building block and the convergent partner to `navigate-via-tension`: tensions become named drivers, a driver becomes a drafted proposal here, and the proposal goes to `consent-decision-making`. The `governance-meeting` spec in this batch composes all three (`uses: proposal-forming`).
