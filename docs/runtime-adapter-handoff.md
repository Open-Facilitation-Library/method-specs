# Runtime adapter — build handoff (HAR-1064)

**Status:** unblocked 2026-06-13. HAR-1098 shipped, so `POST /api/v1/templates`
now accepts chain templates in production (app.harmonica.chat). The adapter is
step 3 of the method-spec build plan.

**Who this is for:** a fresh agent picking up the adapter build cold (e.g. on the
Fedora machine). Read this first, then the design doc, then start with a
brainstorm — do not jump straight to code.

## What to build

A thin, **deterministic** reader that turns a method spec into a runnable
Harmonica chain:

1. Read `methods/<id>/method.md` → parse YAML frontmatter (`stages[]`, `roles[]`,
   `lenses[]`, `runtime.*`) and the `## Stage: <id>` body sections (the
   facilitation prompt lives in the body as prose, keyed by stage id).
2. Map it to a Harmonica `chain_config` object. The frontmatter field names were
   designed to track `chain_config` already (see `FORMAT.md`), so the mapping is
   near 1:1.
3. Install via `POST /api/v1/templates` with `template_type:'chain'` +
   `chain_config` (HAR-1098).

No LLM, no DB — a pure transform plus one HTTP call. Authoring stays
single-source in `method.md`; the machine form is generated, never
hand-maintained in parallel.

## Read these first (all pushed / clonable)

- **Design (format v0.1, decisions, the runtime-adapter section):**
  `claude-config/docs/plans/2026-06-13-method-spec-format-and-m2m-design.md`
- **Build plan:** `claude-config/docs/plans/2026-06-13-method-spec-m2m-implementation-plan.md`
- **Strategy memo:** `claude-config/docs/plans/2026-06-07-methods-as-forkable-specs.md`
- **The spec to install:** this repo — `methods/many-to-many-readiness/method.md`
  (5 stages) + `FORMAT.md`
- **Research grounding:** this repo — `docs/research/2026-06-13-many-to-many-webinar.md`

## API contract (the install target)

- `POST /api/v1/templates` — Pro public REST. Merged in PR #407 (commit
  `582de8e`), live on app.harmonica.chat. `PATCH /api/v1/templates/[id]` accepts
  the same fields for edits.
- Body: `{ title, template_type: 'chain', chain_config: {…} }`. The response
  returns `chain_config` back (so you can round-trip / diff after install).
- `chain_config` is validated server-side by `chainConfigSchema`
  (Pro `src/app/api/admin/templates/chainConfigSchema.ts`, HAR-915) — match its
  shape exactly. OpenAPI `ChainConfig` schema is in Pro `docs/api-spec.yaml` and
  harmonica-docs `api-reference/openapi.yaml` (both on main).
- **Auth:** `Authorization: Bearer hm_live_…`.
- **Paywall:** chains are step-capped — Free up to 3 steps, paid unlimited; over
  the cap returns **403** (HAR-1062). M2M is **5 steps**, so install with a
  **Pro/LTD-tier** key. A `chain_config` without `template_type:'chain'` is
  rejected (400).
- Error taxonomy (`unauthorized|forbidden|validation_error|payment_required|…`):
  Pro `src/app/api/v1/_lib/errors.ts`.

### chain_config shape (mirror of chainConfigSchema)

```
{
  steps: [{
    id,                       // required, unique across the chain
    title?, description?,
    facilitation_prompt?,
    default_session_name?,
    context_mode?,            // none | previous_summary | all_summaries | custom
    individual_memory?,       // boolean
    roles?: [{ slug, label, weight? }],   // slugs unique within a step; weight: normal|elevated|lead
    assignment_strategy?,     // explicit | round_robin | first_come_first_served | host_assigned | all_participants
    completion_criteria?,     // { type: host_continue | all_submitted | timer{duration_seconds} | quorum{count} | quorum_percent{percent} }
    dimension_ownership?: []
  }],
  output_artifact?            // 'wardley'
}
```
Invariants: ≥1 step, unique step ids, unique role slugs per step.

## Prereqs on a fresh machine (especially Fedora)

This is a **Fedora-friendly task** — it talks to the public v1 API, not the DB,
so the usual Fedora gaps (no direct non-pooled DB, no Axiom token) don't apply.

1. `git pull` **claude-config** — design + plan + behavioral memories (incl. the
   worktree-teardown discipline in `memory/reference_agent_worktree_isolation_cwd.md`).
2. `git pull` **harmonica-web-app-pro** — the merged API contract / `chainConfigSchema`.
3. **Clone this repo** if absent: `Open-Facilitation-Library/method-specs` (private).
4. For the live install step only: an `hm_live_…` **Pro/LTD-tier** API key —
   generate at app.harmonica.chat → Settings → API keys. **Not synced**; supply
   via env (`HARMONICA_API_KEY`), never commit it. The transform can be built and
   unit-tested without it (mock the HTTP call).

## Build discipline (workspace rules)

- **Brainstorm first** (superpowers:brainstorming): settle the adapter shape and
  get sign-off before any code. Open questions below.
- **Commit main-bound work via a temp worktree off origin/main**, and tear it down
  right after the push (the CWD-out → delete → prune sequence; see the memory
  above). Do not leave orphan worktrees — they get double-indexed by the TS
  language server.
- Adapter **code + its own plan live in THIS repo**, not in claude-config.

## Open design questions to settle in the brainstorm

- CLI (`npx install-method <id>`) vs a one-shot script? Language (TS to match the
  ecosystem, or Python)?
- API base URL + key via env vars (`HARMONICA_API_BASE`, `HARMONICA_API_KEY`).
- Round-trip verification: after install, GET the template and diff `chain_config`
  against the source (the POST response already echoes it).
- Emit a derived `method.yaml` for non-Harmonica runtimes? Deferred per the design
  (YAGNI for v1) — confirm.
- Live smoke target: install M2M into prod, verify, then delete the created
  template (it's a 5-step chain → needs a Pro/LTD key).
