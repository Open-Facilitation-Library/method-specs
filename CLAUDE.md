# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Part of the Open Facilitation Library. Org-level context (other OFL repos, openfac.org, Harmonica as reference runtime, partners) is in `../CLAUDE.md`. This repo is **not** listed there yet — it is newer.

## What this is

`method-specs` is an open **registry of forkable facilitation method specs** plus the Node tooling that validates them and builds the index. A method spec is a portable description of a facilitation method (stages, roles, prompts, what context carries between stages) paired with weval-style evals. The format spec is `FORMAT.md`; the registry content lives one folder per method under `methods/`. **Harmonica is the reference runtime** — frontmatter field names track Harmonica's `chain_config`.

## Commands

```
npm install
npm run validate      # format-correctness across all specs
npm run build-index   # regenerate index.json + the README methods table
npm run check         # build-index --check: verify index.json + README are in sync (CI)
npm run guard         # publish-guard — public repo only
npm test              # vitest run
```

CI (`.github/workflows/registry.yml`, Node 20, on push to `main` + PRs) runs `validate` → `check` → `guard`. Run them locally before pushing. Single test: `npx vitest run tests/validate.test.mjs`.

## Architecture

Two-layer repo: **content** (the specs) and **tooling** (the `.mjs` scripts that police them).

A method spec (per `FORMAT.md`) is `methods/<id>/`:
- `method.md` — YAML frontmatter (machine wiring: `stages[]`, `roles[]`, `runtime`, `license`, `hold`, …) + a markdown body with one `## Stage: <id>` section per stage, each carrying the facilitation **prompt as prose** (the part people fork).
- `evals/<stage-id>.yaml` — weval blueprints (`should` / `should_not`, optional deterministic `functions`).
- `LICENSE` / `NOTICE` / `SOURCES.md` — each spec carries its own licence, attribution, and provenance.

Tooling (`scripts/` + `scripts/lib/`, plain ESM, `js-yaml` for frontmatter):
- `build-index.mjs` (`lib/buildIndex.mjs`) — regenerates `index.json` and rewrites the README table **between the `<!-- METHODS:START -->` / `<!-- METHODS:END -->` markers**. `--check` mode asserts both are already in sync (fails CI on drift).
- `validate.mjs` (`lib/validate.mjs`, `lib/parseFrontmatter.mjs`, `lib/walk.mjs`) — format correctness across all specs.
- `publish-guard.mjs` (`lib/publishGuard.mjs`, `lib/licenses.mjs`) — the **publish gate**.

**Publish model (the key invariant).** The registry is two repos: public `method-specs` and private `method-specs-staging`. A spec may be in the public repo only if its `license` is in the publishable allowlist — `CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0` — **and** has no `hold` flag. Any `-ND` (NoDerivatives) licence is excluded: a forkable registry cannot host no-derivatives work. `publish-guard` enforces this in CI. `status` (`draft`/`tested`/`stable`) is maturity, not a publish gate.

## Gotchas

- **The README methods table is generated.** Never hand-edit between the `METHODS:START/END` markers; run `npm run build-index`. `npm run check` will fail CI if `index.json` or the table drift from the specs.
- **Licence allowlist + `hold` are the public-repo gate**, not `status`. A `-ND` spec or a `hold:"<reason>"` spec belongs in the private staging repo until cleared. Run `npm run guard` before assuming a spec can go public.
- **Repo scaffolding + the format are CC0; each method keeps its own licence** (declared in frontmatter and its `LICENSE`). An adapted spec retains the source work's licence and attribution.
