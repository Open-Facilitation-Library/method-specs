# Registry Index, Versioning & Publish Model — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a standalone Node tool in the `method-specs` repo that validates every method spec, generates a machine-readable `index.json` + a generated README table, gates the public repo by licence + a `hold` flag, and runs in CI — so the registry scales to dozens of specs without drift.

**Architecture:** Pure, unit-tested library functions under `scripts/lib/` (frontmatter parse, validate, publish-guard, index build) wrapped by thin CLI entrypoints under `scripts/`. No dependency on `harmonica-mcp` — the open registry describes itself with its own minimal `js-yaml` parse. A GitHub Actions workflow runs validate + index-sync-check on both repos and adds a publish-guard step on the public repo only.

**Tech Stack:** Node 20 (ESM, `.mjs`), `js-yaml` (frontmatter parse), `vitest` (tests), GitHub Actions (CI).

**Spec:** `docs/plans/2026-06-14-registry-index-design.md`. Read it first.

**Refinement from the spec:** `index.json` is `{ schema_version, methods }` with **no `generated` timestamp** — a timestamp would make `--check` always report drift. Git records when it changed. This is the one intentional deviation from the spec's example shape.

---

## File Structure

| File | Responsibility |
|---|---|
| `package.json` | ESM, `js-yaml` dep, `vitest` devDep, npm scripts |
| `.gitignore` | ignore `node_modules/` |
| `scripts/lib/parseFrontmatter.mjs` | split a `method.md` into `{ frontmatter, bodyStageIds }` |
| `scripts/lib/licenses.mjs` | the licence sets (known / publishable / attribution-required) |
| `scripts/lib/validate.mjs` | `validateSpec()` — pure format-correctness rules |
| `scripts/lib/publishGuard.mjs` | `publishGuard()` — licence allowlist + no-`hold` |
| `scripts/lib/buildIndex.mjs` | `buildIndexJson()` + `buildReadmeTable()` |
| `scripts/lib/walk.mjs` | `listMethodDirs()` + `evalsInfo()` (the only fs-touching lib) |
| `scripts/validate.mjs` | CLI: walk + parse + validate, exit 1 on errors |
| `scripts/build-index.mjs` | CLI: write `index.json` + README block, or `--check` |
| `scripts/publish-guard.mjs` | CLI: walk + guard, exit 1 on blocked specs |
| `tests/*.test.mjs` | vitest unit tests for the pure libs |
| `tests/fixtures/sample/` | a tiny registry for CLI smoke tests |
| `.github/workflows/registry.yml` | CI |
| `FORMAT.md` | document `hold`, `tags`, versioning, publish model |
| `README.md` | add `<!-- METHODS:START/END -->` markers |
| `index.json` | generated artifact (committed) |

All CLIs resolve the registry root from `process.env.REGISTRY_ROOT` if set, else the repo root — this is what lets the CLI smoke tests point at `tests/fixtures/sample/`.

---

### Task 1: Scaffold the toolchain

**Files:**
- Create: `package.json`, `.gitignore`

- [ ] **Step 1: Create `.gitignore`**

```
node_modules/
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "method-specs-tools",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Validation + index tooling for the OFL method-specs registry.",
  "scripts": {
    "validate": "node scripts/validate.mjs",
    "build-index": "node scripts/build-index.mjs",
    "check": "node scripts/build-index.mjs --check",
    "guard": "node scripts/publish-guard.mjs",
    "test": "vitest run"
  }
}
```

- [ ] **Step 3: Install deps (creates `package-lock.json`)**

Run: `npm install js-yaml && npm install -D vitest`
Expected: `package-lock.json` created, `node_modules/` populated, no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: scaffold registry tooling (node + js-yaml + vitest)"
```

---

### Task 2: Frontmatter parser

**Files:**
- Create: `scripts/lib/parseFrontmatter.mjs`
- Test: `tests/parseFrontmatter.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// tests/parseFrontmatter.test.mjs
import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../scripts/lib/parseFrontmatter.mjs';

const doc = [
  '---',
  'id: demo',
  'stages:',
  '  - { id: one }',
  '  - { id: two }',
  '---',
  '',
  '## Stage: one',
  'body',
  '## Stage: two',
  'body',
].join('\n');

describe('parseFrontmatter', () => {
  it('parses frontmatter and stage body ids', () => {
    const { frontmatter, bodyStageIds } = parseFrontmatter(doc);
    expect(frontmatter.id).toBe('demo');
    expect(bodyStageIds).toEqual(['one', 'two']);
  });

  it('tolerates CRLF line endings', () => {
    const { bodyStageIds } = parseFrontmatter(doc.replace(/\n/g, '\r\n'));
    expect(bodyStageIds).toEqual(['one', 'two']);
  });

  it('throws when frontmatter is missing', () => {
    expect(() => parseFrontmatter('no fences here')).toThrow(/missing frontmatter/);
  });

  it('throws when frontmatter is empty', () => {
    expect(() => parseFrontmatter('---\n\n---\nbody')).toThrow(/empty or invalid/);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run tests/parseFrontmatter.test.mjs`
Expected: FAIL — cannot find module `parseFrontmatter.mjs`.

- [ ] **Step 3: Implement `scripts/lib/parseFrontmatter.mjs`**

```js
import yaml from 'js-yaml';

// Splits a method.md into { frontmatter, bodyStageIds }.
// Mirrors the harmonica-mcp parser, but only reads what the registry needs.
export function parseFrontmatter(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) {
    throw new Error('missing frontmatter: file must start with "---"');
  }
  const end = text.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error('missing frontmatter: no closing "---"');
  }
  const frontmatter = yaml.load(text.slice(4, end));
  if (frontmatter === null || typeof frontmatter !== 'object') {
    throw new Error('empty or invalid frontmatter');
  }
  const body = text.slice(end + 4);
  const bodyStageIds = [];
  const re = /^##\s+Stage:\s*(\S+)\s*$/gm;
  let m;
  while ((m = re.exec(body)) !== null) bodyStageIds.push(m[1]);
  return { frontmatter, bodyStageIds };
}
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `npx vitest run tests/parseFrontmatter.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/parseFrontmatter.mjs tests/parseFrontmatter.test.mjs
git commit -m "feat: frontmatter parser for method specs"
```

---

### Task 3: Licence sets + validator

**Files:**
- Create: `scripts/lib/licenses.mjs`, `scripts/lib/validate.mjs`
- Test: `tests/validate.test.mjs`

- [ ] **Step 1: Create `scripts/lib/licenses.mjs`** (canonical SPDX-style strings — this pins the spec's open detail)

```js
// Recognized identifiers the validator accepts at all.
export const KNOWN_LICENSES = new Set([
  'CC0-1.0',
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
  'CC-BY-ND-4.0',
  'CC-BY-NC-ND-4.0',
  'proprietary',
]);

// Licences the public repo will host. Excludes every -ND (a forkable
// registry cannot host no-derivatives works) and proprietary/unknown.
export const PUBLISHABLE_LICENSES = new Set([
  'CC0-1.0',
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
]);

// Licences that require an attribution string. CC0 does not.
export const ATTRIBUTION_LICENSES = new Set([
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
  'CC-BY-ND-4.0',
  'CC-BY-NC-ND-4.0',
]);

// Public-domain methods use the canonical CC0 dedication string.
export const PUBLIC_DOMAIN = 'CC0-1.0';
```

- [ ] **Step 2: Write the failing test**

```js
// tests/validate.test.mjs
import { describe, it, expect } from 'vitest';
import { validateSpec } from '../scripts/lib/validate.mjs';

function good(overrides = {}) {
  return {
    fm: {
      id: 'demo',
      title: 'Demo',
      version: '1.0.0',
      status: 'draft',
      summary: 'A demo method.',
      license: 'CC0-1.0',
      runtime: { artifact: 'chain' },
      stages: [{ id: 'one' }, { id: 'two' }],
      ...overrides,
    },
    body: ['one', 'two'],
    ctx: { dirName: 'demo', evalsPresent: false, presentEvalStages: new Set() },
  };
}

const run = (g) => validateSpec(g.fm, g.body, g.ctx);

describe('validateSpec', () => {
  it('accepts a well-formed spec', () => {
    const { errors } = run(good());
    expect(errors).toEqual([]);
  });

  it('flags a missing required field', () => {
    const g = good();
    delete g.fm.summary;
    expect(run(g).errors).toContainEqual(expect.stringMatching(/summary/));
  });

  it('flags id not matching folder', () => {
    const g = good();
    g.ctx.dirName = 'other';
    expect(run(g).errors).toContainEqual(expect.stringMatching(/must equal folder name/));
  });

  it('flags a non-semver version', () => {
    expect(run(good({ version: 'v1' })).errors).toContainEqual(expect.stringMatching(/semver/));
  });

  it('flags a bad status enum', () => {
    expect(run(good({ status: 'wip' })).errors).toContainEqual(expect.stringMatching(/status/));
  });

  it('flags an unrecognized licence', () => {
    expect(run(good({ license: 'MIT' })).errors).toContainEqual(expect.stringMatching(/not a recognized/));
  });

  it('requires attribution for CC-BY licences', () => {
    expect(run(good({ license: 'CC-BY-4.0' })).errors).toContainEqual(expect.stringMatching(/attribution/));
  });

  it('flags a stage with no body section', () => {
    const g = good({ stages: [{ id: 'one' }, { id: 'three' }] });
    expect(run(g).errors).toContainEqual(expect.stringMatching(/no matching "## Stage: three"/));
  });

  it('flags an orphan body section', () => {
    const g = good();
    g.body = ['one', 'two', 'extra'];
    expect(run(g).errors).toContainEqual(expect.stringMatching(/no matching frontmatter stage/));
  });

  it('rejects an empty hold flag but accepts a non-empty one', () => {
    expect(run(good({ hold: '' })).errors).toContainEqual(expect.stringMatching(/hold/));
    expect(run(good({ hold: 'awaiting X' })).errors).toEqual([]);
  });

  it('warns (not errors) on a stage missing its eval file', () => {
    const g = good({ evals: './evals' });
    g.ctx = { dirName: 'demo', evalsPresent: true, presentEvalStages: new Set(['one']) };
    const { errors, warnings } = run(g);
    expect(errors).toEqual([]);
    expect(warnings).toContainEqual(expect.stringMatching(/no eval for stage "two"/));
  });
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npx vitest run tests/validate.test.mjs`
Expected: FAIL — cannot find module `validate.mjs`.

- [ ] **Step 4: Implement `scripts/lib/validate.mjs`**

```js
import { KNOWN_LICENSES, ATTRIBUTION_LICENSES } from './licenses.mjs';

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?$/;
const STATUSES = new Set(['draft', 'tested', 'stable']);
const ARTIFACTS = new Set(['chain', 'single']);

// Pure format-correctness check. fs work is done by the caller and passed via ctx:
//   ctx = { dirName, evalsPresent: bool, presentEvalStages: Set<string> }
// Cross-method id uniqueness is the caller's job (it sees all specs).
export function validateSpec(fm, bodyStageIds, ctx) {
  const errors = [];
  const warnings = [];

  for (const f of ['id', 'title', 'version', 'status', 'summary', 'license']) {
    if (typeof fm[f] !== 'string' || fm[f].trim() === '') {
      errors.push(`missing or empty required field: ${f}`);
    }
  }

  const artifact = fm.runtime && fm.runtime.artifact;
  if (typeof artifact !== 'string' || artifact.trim() === '') {
    errors.push('missing required field: runtime.artifact');
  } else if (!ARTIFACTS.has(artifact)) {
    errors.push(`runtime.artifact must be chain|single (got "${artifact}")`);
  }

  if (typeof fm.id === 'string') {
    if (!KEBAB.test(fm.id)) errors.push(`id must be kebab-case (got "${fm.id}")`);
    if (ctx.dirName && fm.id !== ctx.dirName) {
      errors.push(`id "${fm.id}" must equal folder name "${ctx.dirName}"`);
    }
  }

  if (typeof fm.version === 'string' && !SEMVER.test(fm.version)) {
    errors.push(`version must be semver (got "${fm.version}")`);
  }
  if (typeof fm.status === 'string' && !STATUSES.has(fm.status)) {
    errors.push(`status must be draft|tested|stable (got "${fm.status}")`);
  }
  if (typeof fm.license === 'string' && !KNOWN_LICENSES.has(fm.license)) {
    errors.push(`license "${fm.license}" is not a recognized identifier`);
  }

  const needsAttr =
    (typeof fm.license === 'string' && ATTRIBUTION_LICENSES.has(fm.license)) || fm.source_method != null;
  if (needsAttr && (typeof fm.attribution !== 'string' || fm.attribution.trim() === '')) {
    errors.push('attribution is required when the licence requires it or source_method is set');
  }

  if (!Array.isArray(fm.stages) || fm.stages.length === 0) {
    errors.push('stages must be a non-empty array');
  } else {
    const seen = new Set();
    fm.stages.forEach((s, i) => {
      const sid = s && s.id;
      if (typeof sid !== 'string' || sid.trim() === '') {
        errors.push(`stages[${i}] missing id`);
        return;
      }
      if (!KEBAB.test(sid)) errors.push(`stage id must be kebab-case (got "${sid}")`);
      if (seen.has(sid)) errors.push(`duplicate stage id: ${sid}`);
      seen.add(sid);
      if (!bodyStageIds.includes(sid)) {
        errors.push(`stage "${sid}" has no matching "## Stage: ${sid}" body section`);
      }
    });
    for (const bid of bodyStageIds) {
      if (!seen.has(bid)) errors.push(`body section "## Stage: ${bid}" has no matching frontmatter stage`);
    }
  }

  if ('hold' in fm && (typeof fm.hold !== 'string' || fm.hold.trim() === '')) {
    errors.push('hold, if present, must be a non-empty string');
  }
  if ('tags' in fm && (!Array.isArray(fm.tags) || !fm.tags.every((t) => typeof t === 'string'))) {
    errors.push('tags, if present, must be an array of strings');
  }

  if (fm.evals != null) {
    if (!ctx.evalsPresent) {
      errors.push('evals declared but the evals/ folder is missing');
    } else if (Array.isArray(fm.stages)) {
      for (const s of fm.stages) {
        if (s && typeof s.id === 'string' && !ctx.presentEvalStages.has(s.id)) {
          warnings.push(`no eval for stage "${s.id}" (evals/${s.id}.yaml)`);
        }
      }
    }
  }

  return { errors, warnings };
}
```

- [ ] **Step 5: Run the test to confirm it passes**

Run: `npx vitest run tests/validate.test.mjs`
Expected: PASS (11 tests).

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/licenses.mjs scripts/lib/validate.mjs tests/validate.test.mjs
git commit -m "feat: spec validator + canonical licence sets"
```

---

### Task 4: Publish guard

**Files:**
- Create: `scripts/lib/publishGuard.mjs`
- Test: `tests/publishGuard.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// tests/publishGuard.test.mjs
import { describe, it, expect } from 'vitest';
import { publishGuard } from '../scripts/lib/publishGuard.mjs';

describe('publishGuard', () => {
  it('passes a freely-licensed, unheld spec', () => {
    expect(publishGuard({ license: 'CC0-1.0' }).errors).toEqual([]);
  });

  it('passes an allowlisted NC spec', () => {
    expect(publishGuard({ license: 'CC-BY-NC-4.0' }).errors).toEqual([]);
  });

  it('blocks a held spec even with a good licence', () => {
    const { errors } = publishGuard({ license: 'CC-BY-NC-4.0', hold: 'awaiting DML' });
    expect(errors).toContainEqual(expect.stringMatching(/held back: awaiting DML/));
  });

  it('blocks a non-allowlisted licence', () => {
    expect(publishGuard({ license: 'CC-BY-ND-4.0' }).errors).toContainEqual(
      expect.stringMatching(/not in the publishable allowlist/),
    );
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run tests/publishGuard.test.mjs`
Expected: FAIL — cannot find module `publishGuard.mjs`.

- [ ] **Step 3: Implement `scripts/lib/publishGuard.mjs`**

```js
import { PUBLISHABLE_LICENSES } from './licenses.mjs';

// Clearance check for the PUBLIC repo only. Independent of validateSpec:
// the allowlist is legal clearance, `hold` is provenance/relationship clearance.
export function publishGuard(fm) {
  const errors = [];
  if ('hold' in fm) {
    errors.push(`held back: ${typeof fm.hold === 'string' && fm.hold.trim() ? fm.hold : 'hold flag set'}`);
  }
  if (typeof fm.license !== 'string' || !PUBLISHABLE_LICENSES.has(fm.license)) {
    errors.push(`license "${fm.license}" is not in the publishable allowlist`);
  }
  return { errors };
}
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `npx vitest run tests/publishGuard.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/publishGuard.mjs tests/publishGuard.test.mjs
git commit -m "feat: publish guard (licence allowlist + hold)"
```

---

### Task 5: Index builder

**Files:**
- Create: `scripts/lib/buildIndex.mjs`
- Test: `tests/buildIndex.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// tests/buildIndex.test.mjs
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run tests/buildIndex.test.mjs`
Expected: FAIL — cannot find module `buildIndex.mjs`.

- [ ] **Step 3: Implement `scripts/lib/buildIndex.mjs`**

```js
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
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `npx vitest run tests/buildIndex.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/buildIndex.mjs tests/buildIndex.test.mjs
git commit -m "feat: index.json + README table builder"
```

---

### Task 6: Walk helper + CLI entrypoints

**Files:**
- Create: `scripts/lib/walk.mjs`, `scripts/validate.mjs`, `scripts/build-index.mjs`, `scripts/publish-guard.mjs`
- Create: `tests/fixtures/sample/README.md`, `tests/fixtures/sample/methods/good-method/method.md`, `tests/fixtures/sample/methods/held-method/method.md`, `tests/fixtures/sample/methods/proprietary-method/method.md`

- [ ] **Step 1: Implement `scripts/lib/walk.mjs`** (the only fs-touching lib)

```js
import fs from 'node:fs';
import path from 'node:path';

export function listMethodDirs(methodsRoot) {
  if (!fs.existsSync(methodsRoot)) return [];
  return fs
    .readdirSync(methodsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(methodsRoot, d.name);
      return { dirName: d.name, dir, mdPath: path.join(dir, 'method.md') };
    })
    .filter((m) => fs.existsSync(m.mdPath))
    .sort((a, b) => a.dirName.localeCompare(b.dirName));
}

export function evalsInfo(dir) {
  const evalsDir = path.join(dir, 'evals');
  if (!fs.existsSync(evalsDir)) return { evalsPresent: false, presentEvalStages: new Set() };
  const presentEvalStages = new Set(
    fs.readdirSync(evalsDir).filter((f) => f.endsWith('.yaml')).map((f) => f.replace(/\.yaml$/, '')),
  );
  return { evalsPresent: true, presentEvalStages };
}

export function registryRoot(importMetaUrl) {
  if (process.env.REGISTRY_ROOT) return path.resolve(process.env.REGISTRY_ROOT);
  const here = path.dirname(new URL(importMetaUrl).pathname);
  // scripts/lib/walk.mjs -> repo root is two levels up
  return path.resolve(here, '..', '..');
}
```

- [ ] **Step 2: Implement `scripts/validate.mjs`**

```js
import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { validateSpec } from './lib/validate.mjs';
import { listMethodDirs, evalsInfo, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot(import.meta.url);
const methodsRoot = path.join(ROOT, 'methods');
let errorCount = 0;
const ids = new Map();

for (const m of listMethodDirs(methodsRoot)) {
  const raw = fs.readFileSync(m.mdPath, 'utf8');
  let parsed;
  try {
    parsed = parseFrontmatter(raw);
  } catch (e) {
    console.error(`✗ ${m.dirName}: ${e.message}`);
    errorCount++;
    continue;
  }
  const ev = evalsInfo(m.dir);
  const { errors, warnings } = validateSpec(parsed.frontmatter, parsed.bodyStageIds, {
    dirName: m.dirName,
    evalsPresent: ev.evalsPresent,
    presentEvalStages: ev.presentEvalStages,
  });
  const id = parsed.frontmatter.id;
  if (typeof id === 'string') {
    if (ids.has(id)) errors.push(`duplicate id "${id}" (also in ${ids.get(id)})`);
    ids.set(id, m.dirName);
  }
  if (errors.length) {
    errorCount += errors.length;
    console.error(`✗ ${m.dirName}`);
    errors.forEach((e) => console.error(`    error: ${e}`));
  } else {
    console.log(`✓ ${m.dirName}`);
  }
  warnings.forEach((w) => console.warn(`    warn: ${w}`));
}

if (errorCount > 0) {
  console.error(`\n${errorCount} error(s)`);
  process.exit(1);
}
console.log('\nall specs valid');
```

- [ ] **Step 3: Implement `scripts/build-index.mjs`**

```js
import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { validateSpec } from './lib/validate.mjs';
import { buildIndexJson, buildReadmeTable } from './lib/buildIndex.mjs';
import { listMethodDirs, evalsInfo, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot(import.meta.url);
const methodsRoot = path.join(ROOT, 'methods');
const indexPath = path.join(ROOT, 'index.json');
const readmePath = path.join(ROOT, 'README.md');
const START = '<!-- METHODS:START -->';
const END = '<!-- METHODS:END -->';
const check = process.argv.includes('--check');

const specs = [];
let errorCount = 0;
for (const m of listMethodDirs(methodsRoot)) {
  const raw = fs.readFileSync(m.mdPath, 'utf8');
  let parsed;
  try {
    parsed = parseFrontmatter(raw);
  } catch (e) {
    console.error(`✗ ${m.dirName}: ${e.message}`);
    errorCount++;
    continue;
  }
  const ev = evalsInfo(m.dir);
  const { errors } = validateSpec(parsed.frontmatter, parsed.bodyStageIds, {
    dirName: m.dirName,
    evalsPresent: ev.evalsPresent,
    presentEvalStages: ev.presentEvalStages,
  });
  if (errors.length) {
    errorCount += errors.length;
    console.error(`✗ ${m.dirName}: ${errors.join('; ')}`);
    continue;
  }
  specs.push({ fm: parsed.frontmatter, has_evals: ev.evalsPresent });
}
if (errorCount > 0) {
  console.error(`\nrefusing to build index: ${errorCount} validation error(s). Run "npm run validate".`);
  process.exit(1);
}

const indexStr = JSON.stringify(buildIndexJson(specs), null, 2) + '\n';
const table = buildReadmeTable(buildIndexJson(specs));
const readme = fs.readFileSync(readmePath, 'utf8');
const s = readme.indexOf(START);
const e = readme.indexOf(END);
if (s === -1 || e === -1 || e < s) {
  console.error(`README markers (${START} / ${END}) missing or malformed`);
  process.exit(1);
}
const newReadme = readme.slice(0, s + START.length) + '\n' + table + '\n' + readme.slice(e);

if (check) {
  const curIndex = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  let drift = false;
  if (curIndex !== indexStr) {
    console.error('index.json is out of date — run "npm run build-index"');
    drift = true;
  }
  if (readme !== newReadme) {
    console.error('README methods table is out of date — run "npm run build-index"');
    drift = true;
  }
  if (drift) process.exit(1);
  console.log('index + README in sync');
} else {
  fs.writeFileSync(indexPath, indexStr);
  fs.writeFileSync(readmePath, newReadme);
  console.log(`wrote index.json (${specs.length} methods) + README table`);
}
```

- [ ] **Step 4: Implement `scripts/publish-guard.mjs`**

```js
import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { publishGuard } from './lib/publishGuard.mjs';
import { listMethodDirs, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot(import.meta.url);
const methodsRoot = path.join(ROOT, 'methods');
let blocked = 0;

for (const m of listMethodDirs(methodsRoot)) {
  const raw = fs.readFileSync(m.mdPath, 'utf8');
  let fm;
  try {
    fm = parseFrontmatter(raw).frontmatter;
  } catch (e) {
    console.error(`✗ ${m.dirName}: ${e.message}`);
    blocked++;
    continue;
  }
  const { errors } = publishGuard(fm);
  if (errors.length) {
    blocked += errors.length;
    console.error(`✗ ${m.dirName}: ${errors.join('; ')}`);
  } else {
    console.log(`✓ ${m.dirName}`);
  }
}

if (blocked > 0) {
  console.error(`\n${blocked} spec(s) blocked from the public repo`);
  process.exit(1);
}
console.log('\nall specs publishable');
```

- [ ] **Step 5: Create the smoke fixtures**

`tests/fixtures/sample/README.md`:
```markdown
# Sample

<!-- METHODS:START -->
<!-- METHODS:END -->
```

`tests/fixtures/sample/methods/good-method/method.md`:
```markdown
---
id: good-method
title: Good Method
version: 1.0.0
status: draft
summary: A valid public-domain method.
license: CC0-1.0
runtime: { artifact: chain }
tags: [demo]
stages:
  - { id: one }
---

## Stage: one
Do the thing.
```

`tests/fixtures/sample/methods/held-method/method.md`:
```markdown
---
id: held-method
title: Held Method
version: 0.1.0
status: draft
summary: Allowlisted licence but held back.
license: CC-BY-NC-4.0
attribution: "Adapted from Example, CC BY-NC 4.0"
hold: awaiting sign-off
runtime: { artifact: chain }
stages:
  - { id: one }
---

## Stage: one
Do the thing.
```

`tests/fixtures/sample/methods/proprietary-method/method.md`:
```markdown
---
id: proprietary-method
title: Proprietary Method
version: 1.0.0
status: draft
summary: Recognized but not publishable.
license: proprietary
runtime: { artifact: chain }
stages:
  - { id: one }
---

## Stage: one
Do the thing.
```

- [ ] **Step 6: Smoke the CLIs against the fixtures**

Run (Bash): `REGISTRY_ROOT=tests/fixtures/sample npm run validate`
Expected: three `✓` lines, then `all specs valid`, exit 0.

Run (Bash): `REGISTRY_ROOT=tests/fixtures/sample npm run guard`
Expected: `good-method` passes; `held-method` and `proprietary-method` each print a `✗` with a reason; final `2 spec(s) blocked from the public repo`, exit 1.

Run (Bash): `REGISTRY_ROOT=tests/fixtures/sample npm run check`
Expected: `index.json is out of date` (no fixture index exists), exit 1 — confirms `--check` detects drift.

(On PowerShell use `$env:REGISTRY_ROOT='tests/fixtures/sample'; npm run validate` etc.)

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/walk.mjs scripts/validate.mjs scripts/build-index.mjs scripts/publish-guard.mjs tests/fixtures
git commit -m "feat: CLI entrypoints (validate, build-index, publish-guard) + smoke fixtures"
```

---

### Task 7: README markers + FORMAT.md contract

**Files:**
- Modify: `README.md` (add the generated-table markers)
- Modify: `FORMAT.md` (document `hold`, `tags`, versioning, publish model)

- [ ] **Step 1: Replace the hand-maintained "Methods" table in `README.md` with markers**

Find the existing `## Methods` section table (the `| Method | Status | Licence | Source |` block) and replace the *table rows* with:

```markdown
## Methods

<!-- METHODS:START -->
<!-- METHODS:END -->

> Generated by `npm run build-index`. Do not edit between the markers by hand.
```

- [ ] **Step 2: Add the new fields + versioning + publish model to `FORMAT.md`**

In the Frontmatter table, add these rows:
```markdown
| `tags[]` | optional free tags for catalog filtering (group size, divergent/convergent, time-box, domain) |
| `hold` | optional; a non-empty reason string. Presence keeps the spec out of the public repo (it lives in the private staging repo until cleared). |
```

Then append these sections to `FORMAT.md`:
```markdown
## Versioning

`version` is semver. One version per method folder (latest-in-folder); git history is the version log. Bump patch/minor for prompt-wording refinements, major for stage restructuring (adding, removing, or reordering stages, or changing roles/completion). There is no multi-version coexistence — pinning an old version means checking out an earlier commit.

## Publishing

The registry is two repos: the public `method-specs` and a private `method-specs-staging`. A spec may live in the public repo only if its `license` is in the publishable allowlist and it has no `hold` flag.

- **Publishable licences:** `CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0`. Public-domain methods use `CC0-1.0`.
- **Excluded:** any `-ND` (NoDerivatives) variant — a forkable registry cannot host no-derivatives works — and proprietary/unknown licences.
- **`hold`** keeps a spec back for provenance/relationship reasons (e.g. a third party must sign off) even when its licence is fine.

`status` (`draft | tested | stable`) is maturity, not a publish gate: a new method may be public as `draft`.

## Tooling

- `npm run validate` — format-correctness across all specs.
- `npm run build-index` — regenerate `index.json` + the README table.
- `npm run check` — verify both are in sync (CI).
- `npm run guard` — publish-guard (public repo only).
```

- [ ] **Step 3: Verify the docs build cleanly**

Run: `npm run validate`
Expected: passes against whatever is currently in `methods/` (exit 0).

- [ ] **Step 4: Commit**

```bash
git add README.md FORMAT.md
git commit -m "docs: README table markers + FORMAT.md (hold, tags, versioning, publish model)"
```

---

### Task 8: CI workflow

**Files:**
- Create: `.github/workflows/registry.yml`

- [ ] **Step 1: Create the workflow** (this is the PUBLIC repo's version — it includes the guard step)

```yaml
name: registry
on:
  push:
    branches: [main]
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run validate
      - run: npm run check
      - run: npm run guard
```

- [ ] **Step 2: Note for the staging repo**

The private `method-specs-staging` repo uses the **same file with the final `- run: npm run guard` line removed** (staging is allowed to hold un-publishable / `hold`-flagged specs). This is the single intended difference between the two repos' tooling. Recorded here; applied during Task 9.

- [ ] **Step 3: Lint the YAML locally**

Run: `node -e "const y=require('js-yaml');y.load(require('fs').readFileSync('.github/workflows/registry.yml','utf8'));console.log('yaml ok')"`
Expected: `yaml ok`.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/registry.yml
git commit -m "ci: validate + index-sync + publish-guard workflow"
```

---

### Task 9: Flip sequence (operational)

This task moves the registry into its public-ready shape. Some steps are **manual / user-owned** and are marked — do not attempt to automate repo creation or the public flip.

**Files:**
- Generate: `index.json`, `README.md` (methods block)
- Move: `methods/many-to-many-readiness/` → staging repo
- Modify: `methods/many-to-many-readiness/method.md` (add `hold`) before moving

- [ ] **Step 1: [USER] Create the private staging repo**

Ask the user to create a private GitHub repo `Open-Facilitation-Library/method-specs-staging` (empty). Do not proceed to Step 4 until it exists.

- [ ] **Step 2: Add the `hold` flag to M2M**

In `methods/many-to-many-readiness/method.md` frontmatter, add after the `status:` line:
```yaml
hold: awaiting Dark Matter Labs sign-off
```

- [ ] **Step 3: Confirm the guard would block it**

Run: `npm run guard`
Expected: `many-to-many-readiness` printed with `✗ ... held back: awaiting Dark Matter Labs sign-off`, exit 1. (This proves the guard works on the real spec.)

- [ ] **Step 4: Relocate M2M into the staging repo**

Clone staging alongside the registry, copy the M2M folder + the tooling into it, and remove M2M from the public repo. Run from the workspace (Bash):
```bash
git clone https://github.com/Open-Facilitation-Library/method-specs-staging.git ../method-specs-staging
cp -r methods/many-to-many-readiness ../method-specs-staging/methods/
cp -r scripts package.json package-lock.json .gitignore FORMAT.md ../method-specs-staging/
mkdir -p ../method-specs-staging/.github/workflows
# staging workflow = the public one MINUS the guard line:
grep -v 'npm run guard' .github/workflows/registry.yml > ../method-specs-staging/.github/workflows/registry.yml
git rm -r methods/many-to-many-readiness
```

- [ ] **Step 5: Regenerate the public index over the remaining methods**

Run: `npm run build-index`
Expected: `wrote index.json (0 methods) + README table` (M2M is now in staging; any other public-domain methods added later will appear here). The README methods block becomes just the header row.

- [ ] **Step 6: Verify the public repo is self-consistent**

Run: `npm run validate && npm run check && npm run guard`
Expected: all three exit 0 (no specs to block now), `index + README in sync`, `all specs publishable`.

- [ ] **Step 7: Commit the public repo**

```bash
git add -A
git commit -m "chore: relocate M2M to staging; generate empty public index (HAR-1065)"
```

- [ ] **Step 8: [USER] Seed + push staging, then flip public**

Hand back to the user:
1. In `../method-specs-staging`: `git add -A && git commit -m "seed staging with tooling + M2M (held)" && git push`.
2. Bulk-add the public-domain methods to the public `method-specs` repo (each as `methods/<id>/method.md`); run `npm run build-index` and commit.
3. When ready, flip `method-specs` to **public** in GitHub settings.

---

## Self-Review

**Spec coverage:**
- Frontmatter contract → Task 3 (validator) + Task 7 (FORMAT.md). ✓
- Validator → Task 3. ✓
- Index generator (`index.json` + README table) → Task 5 (lib) + Task 6 (CLI). ✓
- Versioning convention → Task 7 (FORMAT.md); semver enforced in Task 3. ✓
- Publish/visibility model (allowlist + `hold`) → Task 4 + Task 8 (CI guard) + Task 9 (M2M `hold`). ✓
- Two-repo topology → Task 8 Step 2 + Task 9. ✓
- One-time flip sequence → Task 9. ✓
- Deferred items (serving infra, peer-review, multi-version) → not in any task, by design. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code; `[USER]` steps are deliberate manual handoffs, not gaps.

**Type/name consistency:** `validateSpec(fm, bodyStageIds, ctx)`, `publishGuard(fm)`, `buildIndexJson(specs)`, `buildReadmeTable(indexJson)`, `listMethodDirs`, `evalsInfo`, `registryRoot`, and the licence sets (`KNOWN_LICENSES`, `PUBLISHABLE_LICENSES`, `ATTRIBUTION_LICENSES`) are used with identical signatures across the libs, CLIs, and tests. The `ctx` shape (`{ dirName, evalsPresent, presentEvalStages }`) matches between `validate.mjs`, both CLIs, and the tests.
