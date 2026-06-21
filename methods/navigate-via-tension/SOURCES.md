# Sources & provenance — navigate-via-tension

An independent rendering of **Navigate via Tension**, a pattern from **Sociocracy 3.0** by **Bernhard Bockelbrink, Liliana David and James Priest**. The Sociocracy 3.0 patterns are published under CC BY-SA 4.0 at sociocracy30.org. This spec is dedicated to the public domain under CC0; the S3 authors are credited as originators of the method.

## Status
**Draft.** The stage prompts and eval blueprints are our wording, grounded in the public S3 pattern. Promote `status: draft -> tested` only after review by an experienced Sociocracy 3.0 practitioner.

## Primary sources
- Sociocracy 3.0 — Navigate via Tension pattern: https://patterns.sociocracy30.org/navigate-via-tension.html (the four-step process this spec renders: notice tension, understand the situation, test if it is a driver, route it).
- The S3 definitions of **tension** and **driver**, and the driver question (generate value / eliminate waste / avoid undesirable consequences).
- Related S3 patterns referenced in the routing step: Describe Organizational Drivers, Respond to Organizational Drivers, Determine Requirements.

## Modelling note
In Sociocracy 3.0, Navigate via Tension is described primarily as an **individual practice**: a single person notices their own tension and traces it to a driver. This spec renders it as a **group surfacing process** for AI-assisted facilitation: each participant navigates their own tension in turn, and the facilitator helps the whole group end up with a shared, de-duplicated set of named drivers. That shift from individual to facilitated-group is the main thing a reviewer should sanity-check against the source.

## Building-block role
This is a reusable building block and the natural front end of a decision flow: its named drivers feed `proposal-forming`, whose proposals then go to `consent-decision-making`. The `governance-meeting` spec in this batch composes it as its surfacing movement (`uses: navigate-via-tension`).
