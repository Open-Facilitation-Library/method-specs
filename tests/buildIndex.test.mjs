import { describe, it, expect } from 'vitest';
import { buildIndexJson, buildReadmeTable } from '../scripts/lib/buildIndex.mjs';

const specs = [
  {
    fm: {
      id: 'zeta', title: 'Zeta', version: '0.2.0', status: 'tested',
      summary: 'Z.', license: 'CC-BY-4.0', source_method: 'Origin',
      runtime: { artifact: 'chain' }, roles: [{ slug: 'a' }], stages: [{ id: 's1' }],
      tags: ['retro'],
    },
    has_evals: true,
  },
  {
    fm: {
      id: 'alpha', title: 'Alpha', version: '1.0.0', status: 'draft',
      summary: 'A.', license: 'CC0-1.0',
      runtime: { artifact: 'single' }, stages: [{ id: 's1' }, { id: 's2' }],
    },
    has_evals: false,
  },
];

describe('buildIndexJson', () => {
  it('sorts by id and shapes entries', () => {
    const idx = buildIndexJson(specs);
    expect(idx.schema_version).toBe(1);
    expect(idx.methods.map((m) => m.id)).toEqual(['alpha', 'zeta']);
    const zeta = idx.methods[1];
    expect(zeta).toMatchObject({
      id: 'zeta', stages_count: 1, roles_count: 1, has_evals: true,
      source_method: 'Origin', tags: ['retro'], runtime: { artifact: 'chain' },
    });
    const alpha = idx.methods[0];
    expect(alpha.roles_count).toBe(0);
    expect(alpha).not.toHaveProperty('tags');
    expect(alpha).not.toHaveProperty('source_method');
  });

  it('is deterministic (no timestamp)', () => {
    expect(JSON.stringify(buildIndexJson(specs))).toBe(JSON.stringify(buildIndexJson(specs)));
  });
});

describe('buildReadmeTable', () => {
  it('renders a sorted markdown table with a dash for empties', () => {
    const table = buildReadmeTable(buildIndexJson(specs));
    const lines = table.split('\n');
    expect(lines[0]).toBe('| Method | Status | Licence | Tags | Stages | Source |');
    expect(lines[2]).toContain('[`alpha`](./methods/alpha)');
    expect(lines[2]).toContain('| — |'); // alpha has no tags and no source
    expect(lines[3]).toContain('retro');
  });
});

describe('buildIndexJson composition edges', () => {
  const specs = [
    {
      fm: {
        id: 'orid', title: 'ORID', version: '1.0.0', status: 'stable',
        summary: 'O.', license: 'CC0-1.0', runtime: { artifact: 'single' }, stages: [{ id: 's1' }],
      },
      has_evals: false,
    },
    {
      fm: {
        id: 'deliberation', title: 'Delib', version: '0.1.0', status: 'draft',
        summary: 'D.', license: 'CC0-1.0', runtime: { artifact: 'chain' }, stages: [{ id: 's1' }],
        composes: ['orid'],
      },
      has_evals: false,
    },
  ];

  it('records composes on the consumer and used_by on the building block', () => {
    const idx = buildIndexJson(specs);
    const orid = idx.methods.find((m) => m.id === 'orid');
    const delib = idx.methods.find((m) => m.id === 'deliberation');
    expect(delib.composes).toEqual(['orid']);
    expect(orid.used_by).toEqual(['deliberation']);
    expect(orid).not.toHaveProperty('composes');
    expect(delib).not.toHaveProperty('used_by');
  });
});
