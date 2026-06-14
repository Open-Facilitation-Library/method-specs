# OFL method-specs registry — index, versioning & publish model (design)

**Date:** 2026-06-14
**Status:** designed (approved). Next: implementation plan via `superpowers:writing-plans`.
**Ticket:** HAR-1065 (this design covers the **index + versioning + publish/visibility** sub-scope; it defers serving infrastructure, peer-review, and the public-flip *mechanics* beyond the per-spec gate).
**Related:** HAR-1064 (`install_method_spec`, shipped), HAR-1098 (v1 chain CRUD, shipped). Strategy memo: `claude-config/docs/plans/2026-06-07-methods-as-forkable-specs.md`. Format: this repo's `FORMAT.md`.

## Goal

Turn the registry from a hand-maintained README table into a self-describing, validated, forkable library that scales to dozens of method specs, with a per-spec publish gate so freely-licensed methods go public while clearance-pending ones (M2M, awaiting Dark Matter Labs) stay held back.

## Scope

**In:**
- Frontmatter contract (required/optional fields) + a validator.
- Index generator → `index.json` + a generated README table.
- Versioning convention.
- Per-spec publish/visibility model + two-repo topology + a CI publish-guard.
- One-time flip sequence (relocate M2M, land tooling, bulk-add, flip public).

**Out (deferred, with reason):**
- **Dedicated serving infra** (a Harmonica endpoint, authed fetch, runtime "install-by-id" in the MCP tool). A public repo + a committed `index.json` already delivers discovery + fork + raw-GitHub fetch; an endpoint is a later, optional convenience, and serving the *open* registry from one runtime would cut against its runtime-neutral positioning.
- **Peer-review process** (a separate HAR-1065 sub-scope) — layered onto status progression later; not a gate to basic publication of a freely-licensed method.
- **Multi-version coexistence** (pinning old versions) — YAGNI until someone needs it.

## Architecture

### Two-repo topology

- **`method-specs`** → flipped **public**. Contains *only* publishable specs. Raw GitHub serves `index.json` + every `method.md` for free, and `fork` is a native GitHub primitive (matches the "fork this method" pitch).
- **`method-specs-staging`** (new, **private**) → holds *held-back* specs (M2M today). Identical format + tooling. A method graduates via a PR that moves it from staging into the public repo.

A private *branch* of a public repo is not an option — all branches of a public repo are public — so held-back specs need a separate private home.

### Publish / visibility model

**Maturity is not a publish gate.** `status` (`draft | tested | stable`) is *informational* — a column in the index, never a barrier. A brand-new public-domain method publishes as `draft` (honestly labeled "unproven") and matures in place. This is what lets dozens of classic methods go public immediately, before any evals exist.

**What gates a spec out of the public repo** (CI-enforced on every PR/merge to the public repo):
1. **Licence ∈ publishable allowlist.** Allowlist: `CC0`, public-domain dedication, `CC-BY`, `CC-BY-SA`, `CC-BY-NC`, `CC-BY-NC-SA`. **Excluded: every `-ND` (NoDerivatives) variant** — a forkable registry cannot host no-derivatives works, since forking is making a derivative. Also excluded: proprietary / unknown.
2. **No `hold` field.** A spec awaiting third-party clearance carries `hold: <reason>` (M2M → `hold: awaiting Dark Matter Labs sign-off`). CI refuses to merge a `hold`-flagged spec into the public repo; it stays in staging until the flag is removed.

The two gates are independent on purpose: the allowlist is *legal* clearance, `hold` is *provenance/relationship* clearance. M2M's licence (CC-BY-NC) is allowlisted — the registry hosts it once cleared — but `hold` keeps it back until DML signs off. Conflating them (e.g. barring all NC) would wrongly exclude future cleared NC methods, and the README already commits to hosting M2M as CC-BY-NC.

**Index = every method in the public repo.** No index-time filtering — the CI invariant guarantees everything in the public repo is publishable, so the generator just enumerates.

## Frontmatter contract

| Field | Required? | Rule |
|---|---|---|
| `id` | required | kebab-case; must equal the folder name; unique across registry |
| `title` | required | — |
| `version` | required | valid semver |
| `status` | required | `draft \| tested \| stable` |
| `summary` | required | one line (shown in the index) |
| `license` | required | recognized identifier; gate checks it against the allowlist |
| `runtime.artifact` | required | `chain \| single` |
| `stages[]` | required | ≥1; each `id` unique; each needs a matching `## Stage: <id>` body section |
| `attribution` | conditional | required when `license` is attribution-requiring (CC-BY*) or `source_method` is set |
| `source_method` | optional | only if adapted from another method |
| `runtime.reference` | optional | defaults to `harmonica` |
| `roles[]` | optional | a single-facilitator method may have none |
| `lenses[]` | optional | — |
| `evals` | optional | if set, the folder must exist (per-stage gaps → warning, not failure) |
| `hold` | optional | non-empty string reason; presence blocks the public repo |
| `tags[]` | optional | free tags for catalog filtering (group size, divergent/convergent, time-box, domain) |

Deliberate calls: `evals` is **optional** (evals earn a method toward `tested`/`stable`; they are not a precondition to exist, so the bulk-add of eval-less classic methods passes). `tags[]` is **in** for v1 (cheap, makes the index filterable as the catalog grows).

## Validator

One tool, runs in **both** repos (this is format-correctness, not clearance):

1. Required fields present + correctly typed.
2. `id` == folder name, kebab-case, unique across the registry.
3. `version` valid semver; `status` in enum.
4. Every `stages[].id` unique **and** has a matching `## Stage: <id>` body section; no orphan body sections.
5. `license` is a recognized identifier.
6. `attribution` present when the licence / `source_method` demands it.
7. If `evals` is set, the folder exists (per-stage gaps → warning).

Distinct from the **publish-guard** (licence-allowlist + no-`hold`), which runs **only in the public repo's CI**. Staging holds format-valid-but-not-cleared specs; the public repo holds format-valid *and* cleared.

**Decided:** the validator + generator live **standalone in the registry repo** (a small Node + `js-yaml` script), **not** as a dependency on `harmonica-mcp`. An open, runtime-neutral registry shouldn't import Harmonica tooling to describe itself — it only reads frontmatter (a far simpler parse than the install tool's full `chain_config` transform).

## Index generator + outputs

`scripts/build-index.mjs` reads every `methods/*/method.md`, parses frontmatter, runs the validator, and emits:

- **`index.json`** (committed) — stable shape:
  ```json
  {
    "schema_version": 1,
    "generated": "<ISO timestamp>",
    "methods": [
      {
        "id": "...", "title": "...", "version": "...", "status": "...",
        "summary": "...", "license": "...", "source_method": "...?",
        "runtime": { "artifact": "chain" },
        "lenses": ["..."], "tags": ["..."],
        "roles_count": 3, "stages_count": 5, "has_evals": true
      }
    ]
  }
  ```
  Methods sorted by `id` for clean diffs.
- **README "Methods" table** — regenerated between `<!-- METHODS:START -->` / `<!-- METHODS:END -->` markers (columns: Method · Status · Licence · Tags · Stages · Source). The rest of the README stays hand-written; only the marked block is machine-owned.

Two modes: `build` (write the artifacts) and `--check` (verify in sync with the specs; exit nonzero if not — for CI).

## CI

GitHub Actions (`.github/workflows/registry.yml`), on PR + push:
- `validate` — format-correctness across all specs.
- `build --check` — `index.json` + README table are in sync with the specs.

The **public repo's** workflow adds one step the staging repo's omits: `publish-guard` (licence ∈ allowlist + no `hold`). Scripts are byte-identical across both repos; only that one workflow step differs, keeping the two-repo drift surface to a single line.

## Versioning

semver in `version`; **one version per method folder** (latest-in-folder); **git history is the version log**. No `@version` folders or version tags until someone needs to pin an old version. Light, unenforced convention: patch/minor for prompt-wording refinements, major for stage restructuring (add/remove/reorder stages, role or completion changes). `index.json` carries each method's current version; tagging a release (`<id>-v<version>`) is optional.

## One-time flip sequence

Order matters because the bulk-add wants to happen the same day:

1. Create private **`method-specs-staging`**.
2. Add `hold: awaiting Dark Matter Labs sign-off` to M2M; **move it to staging** (so the public repo is clean).
3. Land the tooling (validator + generator + CI) in both repos.
4. Bulk-add the public-domain methods to `method-specs` — now validated on every commit.
5. Generate the index; confirm CI green.
6. **User** flips `method-specs` to public when ready (one-click on GitHub; the spec doesn't do it automatically).

## Risks / notes

- **Two-repo tooling drift.** Mitigated by keeping the scripts byte-identical and confining the difference to one CI step. If drift becomes painful, a shared tooling package is the escalation — not needed for v1.
- **Accidental exposure of a held spec.** Backstopped by the publish-guard (a `hold`-flagged or non-allowlisted spec cannot merge into the public repo). Human discipline (don't open the move-PR before DML clears) is the first line; CI is the net.
- **`license` identifier consistency.** The validator's "recognized identifier" set and the publish allowlist must use the same canonical spellings (e.g. `CC-BY-NC-4.0`); the validator normalizes/relies on exact strings.
