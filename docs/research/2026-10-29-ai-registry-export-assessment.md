# One-method AI Registry export assessment

Date: 2026-10-29
Status: technical assessment complete; a named consumer/use case is the gate before an implementation pilot.

This assessment is independent of the thought-leadership piece about OFL's possible adoption. Neither writing that piece nor filing its tracker issue selects technical implementation.

## Verdict

An OFL method can be packaged losslessly in AI Registry's file format using a custom `ofl_method` kind. The stock `aireg` consumer at the inspected revisions skips that kind. A registry envelope alone therefore provides storage and identification, not installation into a facilitation runtime.

Keep OFL's method format authoritative. If interoperability demand justifies proceeding, use an optional exporter plus a method-aware consumer. A skill launcher can be a separate convenience adapter for coding agents; its instructions do not replace the method or establish faithful execution.

## Pinned inputs

- OFL source: `447a0e9c441e629775a4c6673d2c26e5e4a6b688` in `Open-Facilitation-Library/method-specs`.
- Method: `methods/delphi`, version `0.2.0`, OFL maturity `draft`, format v0.2.
- Original AI Registry experiment: `e0fdcde4f31458d51dafa8647ae8e105083a39cb` in `atlanai/ai-registry`.
- Publication-time compatibility spot-check: `40becf90111193e4d124cf392b61de05e87a5bdb` on 2026-10-29. Its supported-kind list and index reader still exclude/skip `ofl_method`. The full experiment and schema checks below remain tied to the original revision; they were not repeated against the newer one.
- Inspection used AI Registry's file/envelope/kind schemas and its actual client kind predicate, index reader and reference parser at that commit.
- The local experiment used existing Node 22.18.0, OFL's parser/validator/publication guard, the pinned upstream kind predicate and digest functions, and an already-installed Ajv 2020 validator. No CLI or dependency was installed.

## Concrete candidate

Candidate ref: `ofl/ofl_method/delphi@0.2.0`.

```text
registry.json
index.json
kinds/ofl_method.json
artifacts/ofl/ofl_method/delphi/
  versions.json
  0.2.0/
    artifact.json
    method.md
    SOURCES.md
    evals/round-1-elicit.yaml
    evals/round-2-reconsider.yaml
    evals/round-3-converge.yaml
```

The five existing method files were copied without rewriting. Each descriptor records its relative path, size and SHA-256. `artifact.spec` holds the complete parsed OFL frontmatter; `metadata.name` derives from OFL `id`. The export checks that the envelope's frontmatter equals the frontmatter parsed from the packaged native file. OFL validation still runs against the native method/body/evaluation files.

OFL maturity remains `spec.status: draft`. Registry availability has its own state in `versions.json`; the local candidate uses `draft` there too. The two states remain distinct concepts, rather than being mechanically treated as equivalent. No package was published or activated.

Candidate content digest: `sha256:bc7642fbac753bc681b2210870ebe3c663b9ca466c3dba324ead732de6c2ab1b`.

## Semantic preservation

| OFL meaning | Export treatment | Evidence |
|---|---|---|
| Full human-readable protocol and stage instructions | Preserve `method.md` bytes | Byte comparison and digest checks |
| Three ordered stages and the panelist role | Preserve native frontmatter, also carried in `spec` | Native parse round-trip equality |
| Completion rules | Preserve `all_submitted` on all three stages | Exported frontmatter and round-trip validation |
| Feedback/context handoff | Preserve `none`, `previous_summary`, `all_summaries` in order | Exported frontmatter and byte equality |
| Individual memory | Preserve absent/false in round one and true in rounds two/three | Parsed equality |
| Stage outputs, source rights, attribution, licence and draft maturity | Preserve all original fields and source text | Parsed and byte equality; existing publication guard |
| Evaluation blueprints | Carry all three YAML files unchanged | Per-file digest/size/equality checks |
| Runtime identity | Preserve Harmonica as the reference runtime; make no universal execution claim | Native frontmatter retained |
| Conformance/review/outcome claims | Add none | No evaluator or runtime was executed |

A Harmonica-specific quorum or other implementation variant must keep its own declared configuration/binding. Exporting this OFL method does not replace its `all_submitted` rules with a runtime variant.

## Actual compatibility

The file specification supports a custom kind and an opaque kind-specific `spec`, while leaving native files unchanged. A custom manifest can describe the OFL fields. That manifest supplements OFL's validator; it does not replace the richer native and publication checks.

The inspected client has a narrower boundary:

- `cli/src/adapter/kinds.ts` lists only `plugin`, `skill`, and `agent`.
- `cli/src/adapter/filespec/documents.ts` skips index entries when `isKind(kind)` is false.
- `cli/src/core/ref.ts` rejects an unknown explicitly addressed kind.
- The exact upstream `isKind` function returned false for `ofl_method` and true for `skill` in the local check.

Registry authoring has custom-kind manifest support, but that does not establish consumer installation support. The assessment did not run the full CLI or install anything into a coding-agent target.

| Route | Preserves OFL method files | Stock client usefulness | Assessment |
|---|---|---|---|
| Native `ofl_method` envelope | Yes | Custom entries are skipped | Clean semantic representation; needs a method-aware consumer |
| `skill` launcher with the original method as supporting files | Can, with an explicit wrapper/source-equality check | Skill is a supported kind | Useful for discovery/invocation; runtime and protocol enforcement still need an adapter |
| Rewrite the protocol into skill instructions alone | Source/body equality is lost | Supported kind | Does not meet this assessment's preservation requirement |

## Conformance binding boundary

The historical worked profile at `docs/conformance/examples/delphi/profile.yaml` is version `0.1.0` and names `method_spec: delphi@0.1.0`. The current method is `0.2.0`. That historical example was deliberately left unchanged and was not attached as evidence for the exported method.

If a future release includes a conformance profile, it needs an explicit compatible version/binding and its real review/evidence status. A transport relationship must not silently upgrade the historical example, invent practitioner approval or claim that the method has been executed faithfully.

Delphi has no `composes` dependencies, so dependency resolution and multi-artifact release behavior were not exercised. Composed methods need a separate pinned dependency-closure check.

## Local checks and limits

Passed:

- All five packaged files match their sources byte-for-byte; mutation of each file changes its recorded digest.
- Source and packaged versions pass OFL's `validateSpec` and existing `publishGuard`.
- Held and proprietary-source refusal cases remain rejected by the existing publication guard.
- Five upstream JSON Schema structural checks pass: artifact, registry, versions, index and kind manifest. The proposed kind schema also accepts the full native frontmatter.
- The envelope content digest was computed and rechecked using AI Registry's pinned canonicalization/digest implementation.

JSON Schema format annotations were not evaluated by Ajv in this experiment. The used HTTPS source URI, relative manifest reference and ISO timestamp were checked separately. These checks are narrower than full upstream file-root/client conformance, and the proposed manifest is not an adopted OFL standard.

During the original offline experiment, no provider calls, CLI/dependency installations, target linking, runtime execution, production writes, Git commits or publication occurred. Publishing this research document does not publish or activate the candidate artifact. The candidate's `published_at` is fixture metadata, not a publication event. No quality, conformance or outcome pass rate follows from these checks.

## Pilot recommendation and gate

**Do not start exporter/consumer implementation yet.** The offline experiment already establishes that this method can be packaged without losing its native content. The next useful test needs an identified consumer and a concrete task that registry delivery improves over reading the existing Git repository. Building a special reader only to demonstrate a second copy of the method would not establish that benefit.

Before selecting an implementation pilot, record:

- The consumer, its owner, and the intended retrieval/forking or runtime workflow.
- Why the existing native Git distribution is insufficient for that workflow.
- Who owns the experimental custom-kind contract and version/override behavior; it is not an adopted OFL format change.
- The acceptance evidence and explicit execution/publication boundaries for that consumer.

If that gate is met, the smallest useful pilot is one public method, Delphi 0.2.0, using an optional exporter and a method-aware reader:

1. Export the five unchanged native files under an experimental custom kind, with the existing OFL validation/publication gates and envelope/file digests. Keep maturity separate from registry availability, and retain source rights, licence and attribution.
2. Resolve an exact artifact version and verify/materialize it into a native OFL directory. Test deterministic repeat installs, refusal of changed bytes and held/proprietary content, and round-trip native validation. Apply full schema/reference checks before treating the package as a distributable release.
3. Preserve stage order, roles, outputs, completion, feedback/context and individual-memory declarations. A supported skill wrapper may point at the original files, but cannot replace the method's protocol or claim native custom-kind installation by stock `aireg`.
4. Declare any conformance-profile version/binding and review status honestly. Fetching and validating files establishes transport integrity; faithful runtime execution requires a separately scoped capable-runtime adapter and process checks.

The first consumer decision may reject the pilot. It does not authorize installations, a client fork, runtime changes, model calls, artifact publication or outreach. Coding-agent skill distribution remains a separate assessment/pilot; the thought-leadership piece may cite this research but does not own technical implementation.

## Evidence

The original local candidate, pinned source schemas, assessment runner and machine-readable report were retained by the author. They are not included in this publication; the result is a reported offline experiment, not a portable test suite or full CLI trial. The pinned inputs, file layout, digest, checks and limitations above define its scope.

- [AI Registry file spec](https://github.com/atlanai/ai-registry/blob/e0fdcde4f31458d51dafa8647ae8e105083a39cb/spec/file-spec.md)
- [Client supported kinds](https://github.com/atlanai/ai-registry/blob/e0fdcde4f31458d51dafa8647ae8e105083a39cb/cli/src/adapter/kinds.ts)
- [Client index reader](https://github.com/atlanai/ai-registry/blob/e0fdcde4f31458d51dafa8647ae8e105083a39cb/cli/src/adapter/filespec/documents.ts)
- [OFL Delphi source](https://github.com/Open-Facilitation-Library/method-specs/blob/447a0e9c441e629775a4c6673d2c26e5e4a6b688/methods/delphi/method.md)

Publication-time source checks: [supported kinds](https://github.com/atlanai/ai-registry/blob/40becf90111193e4d124cf392b61de05e87a5bdb/cli/src/adapter/kinds.ts), [index reader](https://github.com/atlanai/ai-registry/blob/40becf90111193e4d124cf392b61de05e87a5bdb/cli/src/adapter/filespec/documents.ts).
