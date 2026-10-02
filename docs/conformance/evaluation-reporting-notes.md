# Evaluation reporting research companion

2026-10-02. **Non-normative proposals; no change to conformance v0.1 fields, criteria or certification posture.**

Sources: [Every Eval Ever](https://arxiv.org/abs/2606.14516v1), [Evaluation Cards](https://arxiv.org/abs/2606.09809v2). Both are EvalEval Coalition papers. Cards is an interpretation layer over existing evidence; its Appendix J surveys wider lifecycle practices, not only features of the deployed tool.

## Five additions worth shaping separately

- **CARD-02 — Score hierarchy crosswalk.** Relate Cards' family/composite/benchmark/split/metric tree to method, stage, criterion and metric IDs. Keep `layer` and evidence class explicit. Composite summaries must retain their component paths; never merge participant outcomes into method-fidelity scores.
- **CARD-05 — Documentation coverage.** Inventory missing construct definitions, source/review, scoring, limitations, intended use and access conditions. Distinguish absent, inapplicable and withheld. A fuller record is better documented, not more valid, certified or safe.
- **CARD-09 — Evidence for documentation fields.** Attach source passage/reference, extraction version and review state to generated descriptions. A criterion's existing `source` remains authoritative for that criterion; automatically extracted benchmark/method metadata must not acquire authority by being rendered nicely.
- **CARD-11 — Interpretation-policy versions.** Extend the existing six independent versions with explicit versions/reasons for report-signal algorithms, alias resolution, aggregation and comparison policy. Retain old interpretations of unchanged evidence. Human verdict revisions require original labels and reasoning as well; a reporting-policy version alone cannot detect standard drift.
- **LIFE-11 — Lifecycle ownership.** Define owners and recalibration, contamination, saturation, deprecation and retirement triggers separately. A trigger records a needed review; it does not authorize a paid run, change to a method criterion or publication of held material.

## Existing boundaries to preserve

- `architecture.md` §1: method, profile, runtime and outcome answer different questions.
- §3: structural, semantic, release and production evidence never substitute for outcome evidence.
- §4: profile, criterion, evaluator, implementation, model and evidence move independently.
- §5–6: conformance is not certification; source rights and held claims remain visible.
- [method-specs#30](https://github.com/Open-Facilitation-Library/method-specs/issues/30): evaluator calibration reference and fail-closed liveness are separate from reporter completeness.
- [method-specs#28](https://github.com/Open-Facilitation-Library/method-specs/issues/28): an empty outcome layer cannot be repaired by more complete metadata. An observable behavior requires a justified construct-to-outcome relationship.

## Companion exchange work

[OFL evals reporting note](https://github.com/Open-Facilitation-Library/evals/blob/main/docs/research/2026-10-02-evaluation-reporting.md) owns adapters, metric semantics, aggregate/sample links, target attribution, missing metadata, validation, result corrections, difficulty analysis, conservative identifiers, report composition, reproducibility gaps, reporter/setup divergence, reader views and coverage-gap monitoring. These are exchange/reporting mechanisms, not new method-essential criteria.

## Issue cross-references

- CARD-02 hierarchy crosswalk: method-specs#37.
- CARD-05 documentation coverage: method-specs#38.
- CARD-09 source evidence for extracted fields: method-specs#39.
- CARD-11 interpretation-policy history: method-specs#40.
- LIFE-11 lifecycle ownership/triggers: method-specs#41.
- Existing method-specs#28 and #30 received outcome-boundary and instrument-validity context; they remain open.

These are proposed work items, not approved amendments to conformance v0.1.
