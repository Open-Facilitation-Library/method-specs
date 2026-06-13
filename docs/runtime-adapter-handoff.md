# Runtime adapter — build handoff (HAR-1064)

**Status (2026-06-13): brainstormed + designed.** The adapter is an MCP tool,
`install_method_spec`, built in the **harmonica-mcp** repo — *not* a CLI in this
repo (the original plan). HAR-1098 shipped, so `POST/PATCH /api/v1/templates`
accept chain templates in production (app.harmonica.chat).

**Authoritative design — read this; it supersedes the detail below:**
`harmonica-mcp/docs/plans/2026-06-13-install-method-spec-tool-design.md`
([GitHub](https://github.com/harmonicabot/harmonica-mcp/blob/master/docs/plans/2026-06-13-install-method-spec-tool-design.md))

**Next step:** implementation plan via `superpowers:writing-plans`, then build in
harmonica-mcp. Do not jump to code.

## What it is (per the design)

An MCP tool `install_method_spec` in **harmonica-mcp**:
- **Input:** inline `method_md` (the agent passes the spec text; the registry is private).
- **Transform:** a pure module `src/methodSpec.ts` parses YAML frontmatter + the
  `## Stage: <id>` body sections → a Harmonica `chain_config`. No LLM, no DB.
- **Install:** `POST` (or `PATCH` for update) `/api/v1/templates` with
  `template_type:'chain'`.
- **Scope:** install + dry-run + update; `vitest` on the transform.

First target: `methods/many-to-many-readiness` (5 stages).

## Read these first (all pushed / clonable)

- **Design (authoritative):** `harmonica-mcp/docs/plans/2026-06-13-install-method-spec-tool-design.md`
- Format v0.1 + decisions: `claude-config/docs/plans/2026-06-13-method-spec-format-and-m2m-design.md`
- Strategy memo: `claude-config/docs/plans/2026-06-07-methods-as-forkable-specs.md`
- The spec to install: this repo — `methods/many-to-many-readiness/method.md` + `FORMAT.md`
- Research grounding: this repo — `docs/research/2026-06-13-many-to-many-webinar.md`

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
- **Auth:** `Authorization: Bearer hm_live_…` (the MCP reads `HARMONICA_API_KEY`).
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

1. Clone **harmonica-mcp** (the build home) + `npm install`.
2. `git pull` **claude-config** — format decisions + behavioral memories (incl.
   the worktree-teardown discipline in `memory/reference_agent_worktree_isolation_cwd.md`).
3. `git pull` **harmonica-web-app-pro** — the merged API contract / `chainConfigSchema`.
4. Clone **this repo** (`Open-Facilitation-Library/method-specs`) — the spec to install.
5. For the live install step only: an `hm_live_…` **Pro/LTD-tier** API key —
   generate at app.harmonica.chat → Settings → API keys. **Not synced**; supply
   via env (`HARMONICA_API_KEY`), never commit it. The transform builds and
   unit-tests without it (mock the HTTP call).

## Build discipline (workspace rules)

- The design is approved; next is `superpowers:writing-plans` → execute.
- **Code + plan live in `harmonica-mcp`**, not in this repo and not in claude-config.
- Commit main-bound work via a temp worktree off `origin/main`, and tear it down
  right after the push (CWD-out → delete → prune; see the memory above). Don't
  leave orphan worktrees — the TS language server double-indexes them.

## Draft + licence caveat

M2M is `status: draft` + CC BY-NC (Dark Matter Labs). Keep installs **private**
(`is_public:false`) and do not make the template public until DML signs off (ties
to the outreach thread). The transform carries the attribution into the template
description regardless.
