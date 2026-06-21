# Sources & provenance — governance-meeting

An independent rendering of the **Governance Meeting**, a pattern from **Sociocracy 3.0** by **Bernhard Bockelbrink, Liliana David and James Priest**. The Sociocracy 3.0 patterns are published under CC BY-SA 4.0 at sociocracy30.org. This spec is dedicated to the public domain under CC0; the S3 authors are credited as originators of the method.

## Status
**Draft.** The stage prompts and eval blueprints are our wording, grounded in the public S3 pattern. Promote `status: draft -> tested` only after review by an experienced Sociocracy 3.0 practitioner.

## Primary sources
- Sociocracy 3.0 — Governance Meeting pattern: https://patterns.sociocracy30.org/governance-meeting.html (the meeting phases this spec renders: opening/check-in, administrative matters, agenda items, meeting evaluation, closing).
- Related S3 patterns used as agenda processes: Navigate via Tension, Proposal Forming (S3's Co-Create Proposals family), Consent Decision-Making, plus Check In, Prioritize Backlogs, and Evaluate Meetings.

## Composition
This is the first composed spec in the registry. It `composes` three building-block specs and runs each inside a stage via `uses`:

- `surface-drivers` → **navigate-via-tension**
- `form-proposal` → **proposal-forming**
- `decide` → **consent-decision-making**

The Governance Meeting's own material is the surrounding arc only: `check-in`, `set-the-agenda`, and `evaluate-and-close`. The evals here cover those three own-stages plus the meeting-context behavior of the composed stages (carrying drivers forward, keeping already-consented purpose/driver steps brief); the detailed facilitation and evals for the composed movements live in their own specs.

## Modelling notes
A reviewer should sanity-check:

1. **Real meetings loop the agenda.** A live governance meeting iterates `form-proposal` → `decide` per prioritized item until time runs out. This linear chain encodes one full pass; running multiple items is left to the runtime/host rather than unrolled into fixed stages.
2. **Out-of-scope by design.** Standing administrative records (minutes, the logbook), the Meeting Host / Logbook Keeper / Governance Facilitator roles, and time-boxing mechanics are part of the S3 pattern but are program/role design rather than facilitated conversation, so they are referenced lightly, not encoded as stages.
