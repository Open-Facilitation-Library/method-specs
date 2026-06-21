# Sources & provenance — consent-decision-making

An independent rendering of **Consent Decision-Making**, a pattern from **Sociocracy 3.0** by **Bernhard Bockelbrink, Liliana David and James Priest**. The Sociocracy 3.0 patterns are published under CC BY-SA 4.0 at sociocracy30.org. This spec is dedicated to the public domain under CC0; the S3 authors are credited as originators of the method.

## Status
**Draft.** The stage prompts and eval blueprints are our wording, grounded in the public S3 pattern. Promote `status: draft -> tested` only after review by an experienced Sociocracy 3.0 practitioner and a run against a real consent-decision session.

## Primary sources
- Sociocracy 3.0 — Consent Decision-Making pattern: https://patterns.sociocracy30.org/consent-decision-making.html (the nine-step process this spec renders).
- The S3 definitions of **objection** and **concern**, and the **principle of consent**: https://patterns.sociocracy30.org/principle-consent.html — the distinction the method turns on.
- Related S3 patterns referenced inside the process: Test If Arguments Qualify as Objections, Resolve Objections, Proposal Forming. These are named in the prompts but specified separately; `proposal-forming` is its own OFL spec in this batch.
- *Sociocracy 3.0 — A Practical Guide* (Bockelbrink, David, Priest), the consolidated free text, sociocracy30.org.

## Modelling note
Sociocracy 3.0 runs Consent Decision-Making as a **synchronous, in-the-room meeting built from rounds**, with the proposal and the emerging objections visible to everyone at once. This spec encodes it as `runtime.artifact: single` for AI-assisted facilitation, where the facilitator draws out each participant in turn and the cross-participant synthesis stands in for the shared board and the round. Two adaptations a reviewer should sanity-check:

1. **The objection loop is folded.** S3 steps 5–7 (check for objections, test whether one qualifies, resolve it) iterate one argument at a time; here they are one movement (`surface-and-resolve-objections`) the facilitator repeats until no qualified objection remains.
2. **Driver consent is kept in scope.** S3 recommends settling the driver/requirement asynchronously before the meeting; this spec keeps a short `consent-to-driver` movement so the method is self-contained when run on its own. When `consent-decision-making` is composed inside a larger method (e.g. a governance meeting that has already done Navigate via Tension and Proposal Forming), that movement can be skipped by the composing spec.

## Building-block role
This is a reusable building block. The `governance-meeting` spec in this batch composes it as its decision movement (`uses: consent-decision-making`), and `proposal-forming` is its natural upstream partner.
