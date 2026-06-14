// specs: array of { fm, has_evals }
export function buildIndexJson(specs) {
  const methods = specs
    .map(({ fm, has_evals }) => {
      const entry = {
        id: fm.id,
        title: fm.title,
        version: fm.version,
        status: fm.status,
        summary: fm.summary,
        license: fm.license,
        runtime: { artifact: fm.runtime.artifact },
        roles_count: Array.isArray(fm.roles) ? fm.roles.length : 0,
        stages_count: Array.isArray(fm.stages) ? fm.stages.length : 0,
        has_evals,
      };
      if (fm.source_method != null) entry.source_method = fm.source_method;
      if (Array.isArray(fm.lenses) && fm.lenses.length) entry.lenses = fm.lenses;
      if (Array.isArray(fm.tags) && fm.tags.length) entry.tags = fm.tags;
      return entry;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
  return { schema_version: 1, methods };
}

export function buildReadmeTable(indexJson) {
  const header = '| Method | Status | Licence | Tags | Stages | Source |\n|---|---|---|---|---|---|';
  const rows = indexJson.methods.map((m) => {
    const tags = m.tags && m.tags.length ? m.tags.join(', ') : '—';
    const source = m.source_method || '—';
    return `| [\`${m.id}\`](./methods/${m.id}) | ${m.status} | ${m.license} | ${tags} | ${m.stages_count} | ${source} |`;
  });
  return [header, ...rows].join('\n');
}
