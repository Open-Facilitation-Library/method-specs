# Method-spec format v0.1

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
| `stages[]` | `id`, `title`, `roles`, `assignment_strategy`, `context_mode`, `completion`, `output` |
| `evals` | path to the `evals/` folder |

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
