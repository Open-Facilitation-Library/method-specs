# Method-spec format v0.2

A method spec is **one `method.md`**: YAML frontmatter (machine-readable wiring) plus a markdown body (the human-readable protocol). Field names track Harmonica's `chain_config` so a spec maps onto the runtime with no translation, while staying portable in principle.

## File layout

```
methods/<method-id>/
  method.md      frontmatter wiring + readable protocol (prompts as prose)
  evals/         weval-style blueprints, one per stage (<stage-id>.yaml)
  LICENSE        the spec's own licence
  NOTICE         attribution (if adapted from another work)
  SOURCES.md     provenance
```

## Frontmatter

| Field | Meaning |
|---|---|
| `id`, `title`, `version`, `status` | identity + `draft` / `tested` / `stable` |
| `summary` | one-line description |
| `source_method` | the originating method/framework, if adapted |
| `license`, `attribution` | per-spec licence + required credit |
| `runtime.reference`, `runtime.artifact` | reference runtime (`harmonica`) + artifact type (`chain` / `single`) |
| `roles[]` | `slug` + `label` (map to runtime roles) |
| `lenses[]` | optional cross-cutting lenses applied at every stage |
| `stages[]` | `id`, `title`, `roles`, `assignment_strategy`, `context_mode`, `completion`, `output`, optional `uses` (compose a building block into the stage) |
| `evals` | path to the `evals/` folder |
| `tags[]` | optional free tags for catalog filtering (group size, divergent/convergent, time-box, domain) |
| `composes[]` | optional; building-block specs this one is built from (`id` or `id@version`). See [Composition](#composition). |
| `hold` | optional; a non-empty reason string. Presence keeps the spec out of the public repo (it lives in the private staging repo until cleared). |

`context_mode` is one of `none` / `previous_summary` / `all_summaries` / `custom` — how much prior-stage context carries into a stage (Harmonica's terms).

## Body

One `## Stage: <id>` section per stage; the id matches a frontmatter `stages[].id`. Each section carries:

- **Goal** — what the stage is for.
- the **facilitation prompt** as prose (not quoted YAML). This is the part people fork and adapt.
- optional participant guidance.
- **Output** — what the stage produces.

## Eval layer

`evals/<stage-id>.yaml` in [weval](https://github.com/weval-org/app/blob/main/docs/BLUEPRINT_FORMAT.md) blueprint grammar — `should` / `should_not` (LLM-judged) and optional `functions` (deterministic). Runnable on weval-shaped infra, not tied to one runtime.

## Running it

The frontmatter `stages[]` plus the matching body sections map onto a Harmonica chain template (the reference runtime). An adapter generates the machine form from this single source; a derived `method.yaml` may be emitted for a pure-YAML runtime, but is never hand-maintained in parallel.

## Composition

A spec can be built from other specs (reusable building blocks), so a larger method is assembled from smaller, independently forkable ones.

- **`composes: [<ref>, ...]`** (spec level): the building-block specs this one is built from. Each `<ref>` is a spec `id`, optionally version-pinned as `id@version`.
- **`uses: <ref>`** (stage level, optional): marks a stage as running one of the composed sub-methods. The referenced id must appear in the spec's `composes`.

Validation:

- Each ref must be well-formed (a kebab `id`, optional `@semver`); a spec cannot compose itself; no duplicate entries.
- Every composed id must exist in the registry; a pinned version that differs from the registry's current version is a warning.
- The composition graph must be acyclic (a cycle is an error).

The index records both directions: a consuming spec carries `composes`, and each building block carries `used_by` (the specs that compose it), so the catalog shows what builds on what. Expanding a composed spec into a runnable runtime template is the adapter's job, not part of this format.

## Versioning

`version` is semver. One version per method folder (latest-in-folder); git history is the version log. Bump patch/minor for prompt-wording refinements, major for stage restructuring (adding, removing, or reordering stages, or changing roles/completion). There is no multi-version coexistence — pinning an old version means checking out an earlier commit.

## Publishing

The registry is two repos: the public `method-specs` and a private `method-specs-staging`. A spec may live in the public repo only if its `license` is in the publishable allowlist and it has no `hold` flag.

- **Publishable licences:** `CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0`. Public-domain methods use `CC0-1.0`.
- **Excluded:** any `-ND` (NoDerivatives) variant — a forkable registry cannot host no-derivatives works — and proprietary/unknown licences.
- **`hold`** keeps a spec back for provenance/relationship reasons (e.g. a third party must sign off) even when its licence is fine.

`status` (`draft | tested | stable`) is maturity, not a publish gate: a new method may be public as `draft`.

## Tooling

- `npm run validate` — format-correctness across all specs.
- `npm run build-index` — regenerate `index.json` + the README table.
- `npm run check` — verify both are in sync (CI).
- `npm run guard` — publish-guard (public repo only).
