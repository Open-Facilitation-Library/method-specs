// Composition primitive: a spec may declare `composes: [<ref>, ...]` (and a
// stage may declare `uses: <ref>`) to build on other specs as reusable
// building blocks. A <ref> is a spec id, optionally version-pinned as
// `id@version`. Format-correctness of individual refs is checked in
// validateSpec; cross-spec existence and cycle checks live here because they
// need the whole registry.

const REF = /^([a-z0-9]+(?:-[a-z0-9]+)*)(?:@(\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?))?$/;

// "id" or "id@1.2.3" -> { id, version|null }; null if malformed.
export function parseRef(s) {
  if (typeof s !== 'string') return null;
  const m = REF.exec(s.trim());
  if (!m) return null;
  return { id: m[1], version: m[2] || null };
}

// specs: array of { id, version, composes } (composes optional: ref strings).
// Returns { errors, warnings }. Malformed refs are skipped here (validateSpec
// reports those); this checks that every referenced id exists, that pinned
// versions match the registry, and that there are no composition cycles.
export function validateComposition(specs) {
  const errors = [];
  const warnings = [];
  const byId = new Map();
  for (const s of specs) if (typeof s.id === 'string') byId.set(s.id, s);

  const edges = new Map(); // id -> [target ids that exist]
  for (const s of specs) {
    if (typeof s.id !== 'string') continue;
    const targets = [];
    for (const refStr of Array.isArray(s.composes) ? s.composes : []) {
      const ref = parseRef(refStr);
      if (!ref) continue; // malformed: reported by validateSpec
      const target = byId.get(ref.id);
      if (!target) {
        errors.push(`${s.id} composes "${ref.id}", which is not a spec in the registry`);
        continue;
      }
      if (ref.version && target.version && ref.version !== target.version) {
        warnings.push(
          `${s.id} pins ${ref.id}@${ref.version}, but the registry has ${ref.id}@${target.version}`,
        );
      }
      targets.push(ref.id);
    }
    edges.set(s.id, targets);
  }

  // Cycle detection (DFS three-colouring); report the first cycle found.
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const colour = new Map([...byId.keys()].map((id) => [id, WHITE]));
  const stack = [];
  let reported = false;
  function dfs(u) {
    colour.set(u, GRAY);
    stack.push(u);
    for (const v of edges.get(u) || []) {
      if (colour.get(v) === GRAY && !reported) {
        const cycle = stack.slice(stack.indexOf(v)).concat(v).join(' -> ');
        errors.push(`composition cycle: ${cycle}`);
        reported = true;
      } else if (colour.get(v) === WHITE) {
        dfs(v);
      }
    }
    stack.pop();
    colour.set(u, BLACK);
  }
  for (const id of byId.keys()) if (colour.get(id) === WHITE) dfs(id);

  return { errors, warnings };
}
