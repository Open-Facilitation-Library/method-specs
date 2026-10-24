# Criterion targets — v0.3 adoption note

The design from [method-specs#31](https://github.com/Open-Facilitation-Library/method-specs/issues/31)
is adopted as the [conformance v0.3 record contract](record-contract-v0.3.md), alongside the
[architecture](architecture.md). This page records provenance; the normative field definitions
live in the record contract.

The [reviewed proposal, revision 0.3-proposal.1](https://github.com/Open-Facilitation-Library/method-specs/blob/379d8eb61d6066b363b8c0d7fb887e11ae027167/docs/conformance/criterion-targets-proposal.md)
and its [historical review fixtures](https://github.com/Open-Facilitation-Library/method-specs/blob/379d8eb61d6066b363b8c0d7fb887e11ae027167/docs/conformance/examples/criterion-targets-v0.3.yaml)
remain available at the immutable pre-adoption revision. Updating the current illustrative examples
to v0.3 does not turn their stipulated observations into executed checks.

## Design acceptance mapping

| Design requirement | Record-contract evidence |
| --- | --- |
| Portable questions/subjects separate from concrete bindings | Criterion fields and evaluator/adapter binding sections |
| Positive/negative privacy, memory, completion and minority cases | Worked fixtures: 13 scenario vectors, 8 invalid-record vectors, 4 historical-compatibility vectors |
| A source declaration can pass while isolation fails | Source-declaration and exercised-isolation result examples; no common pass rate is inferred |
| Completed/failed/not-run, null missing answers and unsupported scopes | Result fields and unsupported-target example |
| Execution boundary and historical version rules | Structural-execution evidence and version sections; pinned v0.1/v0.2 contracts |
| Authority, calibration/liveness, revisions and coverage remain distinct | Criterion, binding, result and evidence records |
| Whole-process selection/aggregation remains separate | Explicit scope boundary in the binding and version sections |

These are design/documentation acceptances. No v0.3 evaluator, resolver, schema or application path
was executed by adopting them. Actual instrument support remains unverified and is tracked in
[OFL evals#24](https://github.com/Open-Facilitation-Library/evals/issues/24);
it cannot be inferred from record completeness, shared answer types or illustrative fixtures.
