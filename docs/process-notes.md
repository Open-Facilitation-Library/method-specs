# Process Notes

Append-only per-session log. Format: `## YYYY-MM-DD — [topic]` + Done / Decisions / State / Next.

## 2026-06-14 — runtime adapter shipped (lives in harmonica-mcp)
- **Done:** The runtime adapter for this registry's specs shipped as the `install_method_spec` MCP tool in `harmonica-mcp@0.8.0` (HAR-1064) — NOT as a CLI in this repo (the original handoff plan). `docs/runtime-adapter-handoff.md` was redirected to that design. The Many-to-Many spec (`status: draft`) was live-installed as a **private** chain template in prod.
- **Decisions:** Adapter home = harmonica-mcp (an agent installs a spec via the MCP, passing the `method.md` text inline), not a CLI here. M2M stays `draft` + CC BY-NC until Dark Matter Labs signs off; installs stay private.
- **State:** registry v0.1 scaffolding + the M2M spec on `main`; adapter published + verified end-to-end.
- **Next:** loop Dark Matter Labs in before promoting M2M past `draft` or making any install public; HAR-1065 (registry indexing / versioning / peer-review / public flip) + HAR-1068 (CC0 eval publish) still open.

## 2026-06-14 — registry index/versioning/publish design + plan (HAR-1065)
- **Done:** Brainstormed → designed → wrote the implementation plan for the registry index + versioning + per-spec publish model (`docs/plans/2026-06-14-registry-index-design.md` + `-plan.md`, on `main`). NOT built yet. Covers: two-repo topology (public `method-specs` + private `method-specs-staging`), licence-allowlist + `hold`-flag publish gate, generated `index.json` + README "Methods" table, semver convention, CI.
- **Decisions:** Index = repo build artifact now (humans + CI), NOT a served/fetchable manifest (runtime-fetch deferred, gated on public-flip + DML). Maturity (`status`) is NOT a publish gate; the licence allowlist + `hold` are. ND licences excluded (a forkable registry can't host no-derivatives works).
- **State:** design + plan committed to `main`; build not started.
- **Next:** execute the index plan (HAR-1065). M2M public-flip still blocked on Dark Matter Labs.

## 2026-08-05 — HAR-1470 day-one eval plan (not built)
- **Done:** Wrote the implementation plan for day-one evals on a freshly installed spec (`docs/plans/2026-08-05-har-1470-day-one-synthetic-evals-plan.md`) — 7 TDD tasks: a `generate-eval-set` CLI (dimension derivation → deterministic tuples → mandatory human tuple review → `evals/<stage-id>.synthetic.yaml`) and a `run-evals` CLI that composes the same stage prompt harmonica-mcp installs and judges each blueprint against a real LLM. Summarised on the Linear issue.
- **Decisions:** Registry tooling, **not** an install-time hook — all 9 specs are first-party, and hooking generation into `install_method_spec` would couple harmonica-mcp to LLM keys it does not have; the runner working from the spec directly also covers `single`-artifact specs, which install does not. **Criteria stay human-authored**: the generator varies participant *inputs* only and copies `should`/`should_not` from the curated blueprint, which removes most of the circularity the ticket worried about. Reports are smoke-grade with a hard uncalibrated-judge disclaimer — no gating, no published pass rates until the expert bench calibrates (HAR-968/1397).
- **State:** Plan on `main` (`983436c`). Nothing built. The real finding behind the plan: every spec already ships weval-grammar blueprints, but **nothing anywhere can execute them** — `install_method_spec` ignores `evals/` entirely — so the day-one gap is executability plus input coverage, not absent criteria.
- **Next:** Execute the plan (pilot on `retrospective`), or leave it until third-party specs make it pressing.
