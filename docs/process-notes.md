# Process Notes

Append-only per-session log. Format: `## YYYY-MM-DD — [topic]` + Done / Decisions / State / Next.

## 2026-06-14 — runtime adapter shipped (lives in harmonica-mcp)
- **Done:** The runtime adapter for this registry's specs shipped as the `install_method_spec` MCP tool in `harmonica-mcp@0.8.0` (HAR-1064) — NOT as a CLI in this repo (the original handoff plan). `docs/runtime-adapter-handoff.md` was redirected to that design. The Many-to-Many spec (`status: draft`) was live-installed as a **private** chain template in prod.
- **Decisions:** Adapter home = harmonica-mcp (an agent installs a spec via the MCP, passing the `method.md` text inline), not a CLI here. M2M stays `draft` + CC BY-NC until Dark Matter Labs signs off; installs stay private.
- **State:** registry v0.1 scaffolding + the M2M spec on `main`; adapter published + verified end-to-end.
- **Next:** loop Dark Matter Labs in before promoting M2M past `draft` or making any install public; HAR-1065 (registry indexing / versioning / peer-review / public flip) + HAR-1068 (CC0 eval publish) still open.
