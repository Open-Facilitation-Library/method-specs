# Day-One Synthetic Evals for Method Specs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a freshly installed OFL method spec evaluable on day one, by (a) generating a dimensioned synthetic scenario set from the spec's own declared shape and (b) building a runner that executes a spec's eval blueprints against a real LLM and reports smoke-grade conformance results.

**Architecture:** Everything lands in `OFL/method-specs/` as registry tooling (plain Node ESM `.mjs`, matching the existing `scripts/` + `scripts/lib/` split). Two new CLIs: `generate-eval-set.mjs` (spec → reviewed tuple set → `evals/<stage-id>.synthetic.yaml`) and `run-evals.mjs` (blueprints → facilitator turn via real LLM → per-criterion judge verdicts → report). No install-time hook and no harmonica-mcp changes in v1 (see Decision record).

**Tech Stack:** Node 20 ESM, `js-yaml` (already a dep), built-in `fetch` for OpenAI (no SDK), vitest (already configured), OpenAI `gpt-4o-mini` pinned snapshot for generation + judging (configurable).

## Decision record (settles the open design question)

Findings from 2026-08-05 exploration, recorded so the tasks below make sense:

1. **The registry has 9 public specs, all first-party, all `has_evals: true`.** Every spec already ships weval-grammar blueprints (`evals/<stage-id>.yaml`, `should`/`should_not`) — but with roughly **one hand-written scenario per stage**.
2. **Nothing can execute those blueprints.** `install_method_spec` (harmonica-mcp `src/methodSpec.ts`) converts `method.md` → chain template and ignores `evals/` entirely. Pro's eval harness (`src/lib/prompt-evals/`) is per-system-prompt, not per-method-spec. There is no weval runner anywhere in the ecosystem.
3. So the day-one gap is **executability + input coverage**, not criteria. Consequence: **criteria stay human-authored** — the synthetic generator produces only new participant *inputs* and copies `should`/`should_not` from the curated blueprint. This removes most of the circularity risk (a spec generating both its inputs AND its criteria would only confirm it agrees with itself).
4. **Build as registry tooling, not an install-time hook.** With 9 first-party specs, auto-generation inside `install_method_spec` is premature (YAGNI) and would couple harmonica-mcp to LLM keys it doesn't have. The runner works from the spec directly, so it covers `single` specs too (install only handles `chain`). Install wiring is deferred until third-party installs are real.
5. **Eval-gate classification:** cold start → **Synthetic shape** (fresh turn generated from the stage prompt). The judge has zero labels on day one, so per the load-bearing calibration gate its output is **smoke-grade**: every report is labelled uncalibrated / needs-calibration and must not gate any user-visible decision or be published as a pass rate. Calibration comes later via expert labels.
6. **Graduation rule** (from `generate-synthetic-data` skill): once a method has 100+ representative real traces, retire its synthetic set from active use (keep the file, flip it to historical).

Related constraints: synthetic files stay weval-grammar-compatible because extra top-level fields are additive; this runner is the substrate a future conformance API can certify after calibration; Pro-side synthetic-only fixtures follow the same discipline on a different surface.

## Global Constraints

- Plain Node 20 ESM `.mjs`; only existing deps (`js-yaml`) + built-in `fetch`. No new runtime dependencies.
- All vitest tests run **offline** — LLM calls always go through an injectable `chatImpl`/`fetchImpl`; CI (`validate` → `check` → `guard` → `npm test`) must stay green with no network.
- Judge + generation models pinned to exact snapshots; defaults `gpt-4o-mini-2024-07-18`, overridable via `EVAL_MODEL` / `EVAL_JUDGE_MODEL`. `OPENAI_API_KEY` from env (`node --env-file=../evals/.env` works; key already lives at `OFL/evals/.env`).
- Every synthetic blueprint carries `provenance: synthetic` and `reviewed: false` until a human reviews it; every runner report carries the uncalibrated-judge disclaimer verbatim (Task 6).
- Synthetic scenario files are `evals/<stage-id>.synthetic.yaml` — the curated `evals/<stage-id>.yaml` files are never overwritten.
- Repo commands: `npm run validate`, `npm run check`, `npm test` before every commit.

---

### Task 1: LLM client helper

**Files:**
- Create: `scripts/lib/llm.mjs`
- Test: `tests/llm.test.mjs`

**Interfaces:**
- Produces: `chat({ system, messages, model, temperature?, apiKey?, fetchImpl? }) → Promise<string>` — `messages` is `[{role, content}]`; throws on missing key or non-2xx.

- [ ] **Step 1: Write the failing test**

```js
// tests/llm.test.mjs
import { describe, it, expect, vi } from 'vitest';
import { chat } from '../scripts/lib/llm.mjs';

describe('chat', () => {
  it('throws when no api key is available', async () => {
    await expect(chat({ system: 's', messages: [], model: 'm', apiKey: '' })).rejects.toThrow(/OPENAI_API_KEY/);
  });

  it('posts system + messages and returns the completion text', async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'hello' } }] }),
    }));
    const out = await chat({
      system: 'be brief',
      messages: [{ role: 'user', content: 'hi' }],
      model: 'gpt-4o-mini-2024-07-18',
      apiKey: 'k',
      fetchImpl,
    });
    expect(out).toBe('hello');
    const body = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(body.model).toBe('gpt-4o-mini-2024-07-18');
    expect(body.messages[0]).toEqual({ role: 'system', content: 'be brief' });
  });

  it('throws with status on non-2xx', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 429, text: async () => 'rate' }));
    await expect(
      chat({ system: 's', messages: [], model: 'm', apiKey: 'k', fetchImpl }),
    ).rejects.toThrow(/429/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/llm.test.mjs`
Expected: FAIL — cannot find module `../scripts/lib/llm.mjs`

- [ ] **Step 3: Write minimal implementation**

```js
// scripts/lib/llm.mjs
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function chat({
  system,
  messages,
  model,
  temperature = 0.7,
  apiKey = process.env.OPENAI_API_KEY,
  fetchImpl = fetch,
}) {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set. Run with node --env-file=../evals/.env or export it.');
  }
  const res = await fetchImpl(OPENAI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      temperature,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}
```

- [ ] **Step 4: Run test to verify it passes** — `npx vitest run tests/llm.test.mjs` → PASS
- [ ] **Step 5: Commit** — `git add scripts/lib/llm.mjs tests/llm.test.mjs && git commit -m "feat: add offline-testable OpenAI chat helper for eval tooling"`

---

### Task 2: Dimension derivation from the spec's declared shape

**Files:**
- Create: `scripts/lib/deriveDimensions.mjs`
- Test: `tests/deriveDimensions.test.mjs`

**Interfaces:**
- Produces: `STANCES` (const array), `derivePressures(curatedBlueprint) → string[]`, `deriveDimensions({ curatedBlueprint, domains }) → { stance: string[], domain: string[], pressure: string[] }`
- `curatedBlueprint` is the parsed YAML of the stage's curated `evals/<stage-id>.yaml` (shape: `{ prompts: [{ messages, should, should_not }] }`).

The three dimensions target facilitation failure modes (per the `generate-synthetic-data` skill, dimensions must target anticipated failures, not arbitrary variation):
- **stance** — fixed vocabulary of participant postures that stress a facilitator: `cooperative`, `resistant`, `tangential`, `terse`.
- **domain** — topical settings, supplied by the operator (`--domains`), because realism judgment is human (skill anti-pattern: synthetic data no one can judge).
- **pressure** — each `should_not` criterion of the curated blueprint becomes a pressure: a scenario written to *tempt* the facilitator into exactly that failure. Plus a `baseline` (no adversarial pull). This is where the spec's own declared shape drives coverage.

- [ ] **Step 1: Write the failing test**

```js
// tests/deriveDimensions.test.mjs
import { describe, it, expect } from 'vitest';
import { STANCES, derivePressures, deriveDimensions } from '../scripts/lib/deriveDimensions.mjs';

const blueprint = {
  prompts: [
    {
      messages: [{ role: 'user', content: 'x' }],
      should: ['stays with difficulty'],
      should_not: ['rushes to consensus', 'shuts down disagreement'],
    },
  ],
};

describe('derivePressures', () => {
  it('turns each should_not into a pressure, prefixed by baseline, deduplicated', () => {
    const twice = { prompts: [blueprint.prompts[0], blueprint.prompts[0]] };
    expect(derivePressures(twice)).toEqual(['baseline', 'rushes to consensus', 'shuts down disagreement']);
  });
  it('returns only baseline when the blueprint is missing', () => {
    expect(derivePressures(undefined)).toEqual(['baseline']);
  });
});

describe('deriveDimensions', () => {
  it('combines fixed stances, given domains, derived pressures', () => {
    const d = deriveDimensions({ curatedBlueprint: blueprint, domains: ['team retro'] });
    expect(d.stance).toEqual(STANCES);
    expect(d.domain).toEqual(['team retro']);
    expect(d.pressure).toContain('rushes to consensus');
  });
  it('requires at least one domain', () => {
    expect(() => deriveDimensions({ curatedBlueprint: blueprint, domains: [] })).toThrow(/domain/);
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `npx vitest run tests/deriveDimensions.test.mjs` → FAIL (module not found)
- [ ] **Step 3: Implement**

```js
// scripts/lib/deriveDimensions.mjs
export const STANCES = ['cooperative', 'resistant', 'tangential', 'terse'];

export function derivePressures(curatedBlueprint) {
  const seen = new Set();
  for (const p of curatedBlueprint?.prompts ?? []) {
    for (const s of p.should_not ?? []) seen.add(s);
  }
  return ['baseline', ...seen];
}

export function deriveDimensions({ curatedBlueprint, domains }) {
  if (!Array.isArray(domains) || domains.length === 0) {
    throw new Error('at least one domain is required (pass --domains "a,b")');
  }
  return { stance: STANCES, domain: domains, pressure: derivePressures(curatedBlueprint) };
}
```

- [ ] **Step 4: Run to verify it passes** → PASS
- [ ] **Step 5: Commit** — `git commit -m "feat: derive synthetic-eval dimensions from a spec's curated blueprint"`

---

### Task 3: Deterministic tuple builder

**Files:**
- Create: `scripts/lib/tuples.mjs`
- Test: `tests/tuples.test.mjs`

**Interfaces:**
- Produces: `buildTuples(dimensions, cap = 8) → [{ stance, domain, pressure }]` — deterministic (no randomness: `Date.now`/`Math.random` are also banned in agent-workflow contexts), round-robins over stance so a small cap still varies the highest-signal dimension, guarantees every pressure appears at least once when `cap >= pressures.length`.

- [ ] **Step 1: Write the failing test**

```js
// tests/tuples.test.mjs
import { describe, it, expect } from 'vitest';
import { buildTuples } from '../scripts/lib/tuples.mjs';

const dims = {
  stance: ['cooperative', 'resistant'],
  domain: ['retro', 'budget'],
  pressure: ['baseline', 'rushes to consensus'],
};

describe('buildTuples', () => {
  it('is deterministic', () => {
    expect(buildTuples(dims, 5)).toEqual(buildTuples(dims, 5));
  });
  it('caps the count', () => {
    expect(buildTuples(dims, 3)).toHaveLength(3);
  });
  it('covers every pressure at least once when cap allows', () => {
    const picked = buildTuples(dims, 4);
    const pressures = new Set(picked.map((t) => t.pressure));
    expect(pressures).toEqual(new Set(dims.pressure));
  });
  it('varies stance within a small cap', () => {
    const picked = buildTuples(dims, 4);
    expect(new Set(picked.map((t) => t.stance)).size).toBeGreaterThan(1);
  });
  it('returns the full cross-product when cap exceeds it', () => {
    expect(buildTuples(dims, 100)).toHaveLength(8);
  });
});
```

- [ ] **Step 2: Run to verify it fails** → FAIL (module not found)
- [ ] **Step 3: Implement**

```js
// scripts/lib/tuples.mjs
// Deterministic selection: enumerate the cross-product ordered pressure-major
// (so early picks sweep pressures), round-robin across stances, then domains.
export function buildTuples(dimensions, cap = 8) {
  const { stance: stances, domain: domains, pressure: pressures } = dimensions;
  const all = [];
  for (let pi = 0; pi < pressures.length; pi++) {
    for (let si = 0; si < stances.length; si++) {
      for (let di = 0; di < domains.length; di++) {
        all.push({
          stance: stances[(si + pi) % stances.length],
          domain: domains[(di + pi) % domains.length],
          pressure: pressures[pi],
          _order: pi + si * pressures.length + di * pressures.length * stances.length,
        });
      }
    }
  }
  // Dedupe (rotation can repeat combos), keep first occurrence, sort by
  // interleave order so pressures are covered first, stances alternate.
  const seen = new Set();
  const unique = all
    .sort((a, b) => a._order - b._order)
    .filter((t) => {
      const k = `${t.stance}|${t.domain}|${t.pressure}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  return unique.slice(0, cap).map(({ _order, ...t }) => t);
}
```

- [ ] **Step 4: Run to verify it passes** → PASS. If the coverage or variation assertions fail, adjust the `_order` weights until they hold — the contract is the test, not the formula.
- [ ] **Step 5: Commit** — `git commit -m "feat: add deterministic capped tuple builder for synthetic eval sets"`

---

### Task 4: Synthetic blueprint builder + generator CLI

**Files:**
- Create: `scripts/lib/syntheticSet.mjs`
- Create: `scripts/generate-eval-set.mjs`
- Modify: `scripts/lib/parseFrontmatter.mjs` (add `extractStageBodies` export; keep the existing return shape untouched and add a `stageBodies` field)
- Modify: `package.json` (add `"generate-eval-set": "node scripts/generate-eval-set.mjs"` to `scripts`)
- Test: `tests/syntheticSet.test.mjs`

**Interfaces:**
- Consumes: `buildTuples`, `deriveDimensions`, `chat` from Tasks 1–3.
- Produces:
  - `extractStageBodies(body) → Record<stageId, string>` (port of harmonica-mcp's function, same regex `^##\s+Stage:\s*(\S+)\s*$`).
  - `buildSyntheticBlueprint({ methodId, stageId, curatedBlueprint, scenarios }) → object` where `scenarios = [{ stance, domain, pressure, message }]`. Output object shape (this is the format Task 5 validates and Task 6 runs):

```yaml
id: <methodId>/<stageId>#synthetic
description: Synthetic day-one eval set. Inputs generated from the spec's declared shape; criteria copied verbatim from the curated blueprint.
provenance: synthetic
reviewed: false
prompts:
  - tuple: { stance: resistant, domain: team retro, pressure: rushes to consensus }
    messages: [{ role: user, content: "<generated participant message>" }]
    should: [<copied from curated>]
    should_not: [<copied from curated>]
```

- [ ] **Step 1: Write the failing test**

```js
// tests/syntheticSet.test.mjs
import { describe, it, expect } from 'vitest';
import { buildSyntheticBlueprint } from '../scripts/lib/syntheticSet.mjs';

const curated = {
  prompts: [
    { messages: [{ role: 'user', content: 'x' }], should: ['a', 'b'], should_not: ['c'] },
    { messages: [{ role: 'user', content: 'y' }], should: ['a'], should_not: ['d'] },
  ],
};

describe('buildSyntheticBlueprint', () => {
  const out = buildSyntheticBlueprint({
    methodId: 'retrospective',
    stageId: 'set-the-stage',
    curatedBlueprint: curated,
    scenarios: [{ stance: 's', domain: 'd', pressure: 'p', message: 'hello there' }],
  });
  it('is marked synthetic and unreviewed', () => {
    expect(out.provenance).toBe('synthetic');
    expect(out.reviewed).toBe(false);
  });
  it('copies the union of curated criteria onto every prompt', () => {
    expect(out.prompts[0].should).toEqual(['a', 'b']);
    expect(out.prompts[0].should_not).toEqual(['c', 'd']);
  });
  it('carries the tuple and the generated message', () => {
    expect(out.prompts[0].tuple).toEqual({ stance: 's', domain: 'd', pressure: 'p' });
    expect(out.prompts[0].messages).toEqual([{ role: 'user', content: 'hello there' }]);
  });
  it('never invents criteria when the curated blueprint is empty', () => {
    expect(() =>
      buildSyntheticBlueprint({ methodId: 'm', stageId: 's', curatedBlueprint: { prompts: [] }, scenarios: [] }),
    ).toThrow(/curated/);
  });
});
```

- [ ] **Step 2: Run to verify it fails** → FAIL
- [ ] **Step 3: Implement `syntheticSet.mjs`**

```js
// scripts/lib/syntheticSet.mjs
function unionCriteria(curatedBlueprint, key) {
  const seen = new Set();
  for (const p of curatedBlueprint?.prompts ?? []) for (const c of p[key] ?? []) seen.add(c);
  return [...seen];
}

export function buildSyntheticBlueprint({ methodId, stageId, curatedBlueprint, scenarios }) {
  const should = unionCriteria(curatedBlueprint, 'should');
  const should_not = unionCriteria(curatedBlueprint, 'should_not');
  if (should.length === 0 && should_not.length === 0) {
    throw new Error(
      `stage "${stageId}" has no curated criteria — synthetic sets copy criteria, never invent them. Write evals/${stageId}.yaml first.`,
    );
  }
  return {
    id: `${methodId}/${stageId}#synthetic`,
    description:
      'Synthetic day-one eval set. Inputs generated from the spec\'s declared shape; criteria copied verbatim from the curated blueprint.',
    provenance: 'synthetic',
    reviewed: false,
    prompts: scenarios.map((s) => ({
      tuple: { stance: s.stance, domain: s.domain, pressure: s.pressure },
      messages: [{ role: 'user', content: s.message }],
      should,
      should_not,
    })),
  };
}
```

- [ ] **Step 4: Add `extractStageBodies` to `scripts/lib/parseFrontmatter.mjs`** — the current function returns `{ frontmatter, bodyStageIds }` and computes `body` internally (line 18) without returning it. Change the return to `{ frontmatter, body, bodyStageIds }` (additive — existing callers destructure by name and are unaffected), and add this export:

```js
export function extractStageBodies(body) {
  const result = {};
  const re = /^##\s+Stage:\s*(\S+)\s*$/gm;
  const matches = [...body.matchAll(re)];
  for (let i = 0; i < matches.length; i++) {
    const id = matches[i][1].trim();
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    result[id] = body.slice(start, end).trim();
  }
  return result;
}
```

- [ ] **Step 5: Write the CLI `scripts/generate-eval-set.mjs`**

Flow (mirrors the `generate-synthetic-data` skill's steps, including the mandatory human tuple review):

```js
// scripts/generate-eval-set.mjs
// Usage:
//   node scripts/generate-eval-set.mjs <method-id> --domains "a,b" [--stage <id>] [--cap 8] [--write]
// Without --write: prints the derived dimensions + tuples per stage and exits.
//   THIS IS THE REVIEW STEP — a human confirms tuples are realistic before generation.
// With --write: generates one participant message per tuple via LLM (two-step per
//   the generate-synthetic-data skill: tuples first, NL messages in a separate
//   prompt) and writes evals/<stage-id>.synthetic.yaml.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { parseFrontmatter, extractStageBodies } from './lib/parseFrontmatter.mjs';
import { registryRoot } from './lib/walk.mjs';
import { deriveDimensions } from './lib/deriveDimensions.mjs';
import { buildTuples } from './lib/tuples.mjs';
import { buildSyntheticBlueprint } from './lib/syntheticSet.mjs';
import { chat } from './lib/llm.mjs';

const MODEL = process.env.EVAL_MODEL || 'gpt-4o-mini-2024-07-18';

const args = process.argv.slice(2);
const methodId = args[0];
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const domains = (flag('domains') || '').split(',').map((s) => s.trim()).filter(Boolean);
const onlyStage = flag('stage');
const cap = Number(flag('cap') || 8);
const write = args.includes('--write');

if (!methodId) {
  console.error('usage: generate-eval-set <method-id> --domains "a,b" [--stage id] [--cap 8] [--write]');
  process.exit(1);
}

const root = registryRoot();
const dir = path.join(root, 'methods', methodId);
const raw = fs.readFileSync(path.join(dir, 'method.md'), 'utf8');
const parsed = parseFrontmatter(raw);
const stageBodies = extractStageBodies(parsed.body ?? raw);
const stages = (parsed.frontmatter.stages ?? []).filter((s) => !onlyStage || s.id === onlyStage);

function messagePrompt(stage, goal, tuple) {
  return [
    `We are generating synthetic participant messages to test an AI facilitator running the "${stage.title ?? stage.id}" stage of a facilitation method.`,
    `Stage goal and protocol:\n${goal}`,
    `Write ONE realistic message a participant might send in this stage, with:`,
    `- stance: ${tuple.stance} (cooperative = engages earnestly; resistant = pushes back or doubts the process; tangential = drifts off the stage's question; terse = minimal, low-effort answer)`,
    `- topical domain: ${tuple.domain}`,
    tuple.pressure === 'baseline'
      ? `- no adversarial pull: an ordinary on-protocol contribution.`
      : `- adversarial pull: write the message so a weak facilitator would be tempted to fail this way: "${tuple.pressure}". The message itself must stay realistic — the temptation comes from its content, not from meta-instructions.`,
    `Output ONLY the participant message, no quotes, no commentary.`,
  ].join('\n\n');
}

for (const stage of stages) {
  const curatedPath = path.join(dir, 'evals', `${stage.id}.yaml`);
  const curated = fs.existsSync(curatedPath) ? yaml.load(fs.readFileSync(curatedPath, 'utf8')) : undefined;
  const dims = deriveDimensions({ curatedBlueprint: curated, domains });
  const tuples = buildTuples(dims, cap);

  if (!write) {
    console.log(`\n## ${stage.id} — ${tuples.length} tuples (review before --write)`);
    for (const t of tuples) console.log(`  (${t.stance} | ${t.domain} | ${t.pressure})`);
    continue;
  }

  const scenarios = [];
  for (const t of tuples) {
    const message = await chat({
      system: 'You write realistic single-participant messages for facilitation test scenarios.',
      messages: [{ role: 'user', content: messagePrompt(stage, stageBodies[stage.id] ?? '', t) }],
      model: MODEL,
    });
    scenarios.push({ ...t, message: message.trim() });
    console.log(`  ✓ ${stage.id} (${t.stance} | ${t.domain} | ${t.pressure})`);
  }
  const blueprint = buildSyntheticBlueprint({ methodId, stageId: stage.id, curatedBlueprint: curated, scenarios });
  const outPath = path.join(dir, 'evals', `${stage.id}.synthetic.yaml`);
  fs.writeFileSync(outPath, yaml.dump(blueprint, { lineWidth: 100 }));
  console.log(`wrote ${path.relative(root, outPath)}`);
}
if (!write) console.log('\nRe-run with --write after confirming the tuples are realistic.');
```

- [ ] **Step 6: Run tests + validate** — `npx vitest run tests/syntheticSet.test.mjs && npm run validate` → PASS / all specs valid (no synthetic files exist yet, so nothing changes)
- [ ] **Step 7: Commit** — `git commit -m "feat: add spec-shaped synthetic scenarios with human tuple review"`

---

### Task 5: Format + validation for synthetic blueprints

**Files:**
- Modify: `scripts/lib/walk.mjs` (`evalsInfo`: exclude `.synthetic.yaml` from `presentEvalStages`; return `syntheticFiles: string[]`)
- Create: `scripts/lib/validateSynthetic.mjs`
- Modify: `scripts/validate.mjs` (call it per method dir)
- Modify: `FORMAT.md` (document the synthetic file)
- Test: `tests/validateSynthetic.test.mjs` (+ extend existing walk/validate tests if present)

**Interfaces:**
- Consumes: parsed YAML of a `*.synthetic.yaml` file.
- Produces: `validateSyntheticBlueprint(doc, { stageIds, fileName }) → { errors: string[], warnings: string[] }`

Rules: filename stem (minus `.synthetic`) must be a declared stage id; `provenance` must equal `'synthetic'`; `reviewed` must be boolean; `prompts` non-empty, each with non-empty `messages` and at least one of `should`/`should_not` non-empty. `reviewed: false` yields a **warning**: `unreviewed synthetic set — results are smoke-grade until a human reviews it`.

- [ ] **Step 1: Write the failing test**

```js
// tests/validateSynthetic.test.mjs
import { describe, it, expect } from 'vitest';
import { validateSyntheticBlueprint } from '../scripts/lib/validateSynthetic.mjs';

const good = {
  provenance: 'synthetic',
  reviewed: false,
  prompts: [{ tuple: { stance: 's', domain: 'd', pressure: 'p' }, messages: [{ role: 'user', content: 'x' }], should: ['a'], should_not: [] }],
};
const ctx = { stageIds: ['check-in'], fileName: 'check-in.synthetic.yaml' };

describe('validateSyntheticBlueprint', () => {
  it('passes a well-formed unreviewed file with a warning', () => {
    const r = validateSyntheticBlueprint(good, ctx);
    expect(r.errors).toEqual([]);
    expect(r.warnings.some((w) => /unreviewed/.test(w))).toBe(true);
  });
  it('rejects a stem that is not a stage id', () => {
    const r = validateSyntheticBlueprint(good, { ...ctx, fileName: 'nope.synthetic.yaml' });
    expect(r.errors.some((e) => /stage/.test(e))).toBe(true);
  });
  it('rejects missing provenance marker', () => {
    const r = validateSyntheticBlueprint({ ...good, provenance: undefined }, ctx);
    expect(r.errors.some((e) => /provenance/.test(e))).toBe(true);
  });
  it('rejects prompts with no criteria', () => {
    const bad = { ...good, prompts: [{ messages: [{ role: 'user', content: 'x' }], should: [], should_not: [] }] };
    expect(validateSyntheticBlueprint(bad, ctx).errors.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run to verify it fails** → FAIL
- [ ] **Step 3: Implement `validateSynthetic.mjs`**

```js
// scripts/lib/validateSynthetic.mjs
export function validateSyntheticBlueprint(doc, { stageIds, fileName }) {
  const errors = [];
  const warnings = [];
  const stem = fileName.replace(/\.synthetic\.yaml$/, '');
  if (!stageIds.includes(stem)) errors.push(`${fileName}: "${stem}" is not a declared stage id`);
  if (doc?.provenance !== 'synthetic') errors.push(`${fileName}: missing provenance: synthetic marker`);
  if (typeof doc?.reviewed !== 'boolean') errors.push(`${fileName}: reviewed must be true or false`);
  else if (doc.reviewed === false) {
    warnings.push(`${fileName}: unreviewed synthetic set — results are smoke-grade until a human reviews it`);
  }
  if (!Array.isArray(doc?.prompts) || doc.prompts.length === 0) {
    errors.push(`${fileName}: prompts must be a non-empty array`);
  } else {
    doc.prompts.forEach((p, i) => {
      if (!Array.isArray(p.messages) || p.messages.length === 0) errors.push(`${fileName}: prompts[${i}] has no messages`);
      const hasCriteria = (p.should ?? []).length > 0 || (p.should_not ?? []).length > 0;
      if (!hasCriteria) errors.push(`${fileName}: prompts[${i}] has no should/should_not criteria`);
    });
  }
  return { errors, warnings };
}
```

- [ ] **Step 4: Wire into `walk.mjs` and `validate.mjs`**

In `evalsInfo` (`scripts/lib/walk.mjs`), replace the filter with:

```js
const files = fs.readdirSync(evalsDir);
const presentEvalStages = new Set(
  files.filter((f) => f.endsWith('.yaml') && !f.endsWith('.synthetic.yaml')).map((f) => f.replace(/\.yaml$/, '')),
);
const syntheticFiles = files.filter((f) => f.endsWith('.synthetic.yaml'));
return { evalsPresent: true, presentEvalStages, syntheticFiles };
```

(and `syntheticFiles: []` in the missing-dir early return). In `scripts/validate.mjs`, after the `validateSpec` call, load each synthetic file with `js-yaml` and run `validateSyntheticBlueprint`, feeding its errors/warnings into the same per-method reporting (stage ids from `parsed.frontmatter.stages.map(s => s.id)`).

- [ ] **Step 5: Update `FORMAT.md`** — extend the "Eval layer" section:

```markdown
`evals/<stage-id>.synthetic.yaml` (optional) — a generated day-one scenario set for the stage,
produced by `npm run generate-eval-set`. Same weval prompt grammar, plus three additive fields:
`provenance: synthetic` (required marker), `reviewed: true|false` (a human has confirmed the
scenarios are realistic), and per-prompt `tuple` (the stance/domain/pressure combination the
scenario was generated from). Criteria (`should`/`should_not`) are always copied from the curated
`<stage-id>.yaml`, never generated — synthetic sets vary the *inputs* only. Once a method has 100+
representative real traces, retire its synthetic set from active use.
```

- [ ] **Step 6: Run full suite** — `npx vitest run && npm run validate && npm run check` → all green
- [ ] **Step 7: Commit** — `git commit -m "feat: validate synthetic eval blueprints and document format"`

---

### Task 6: Runner — execute blueprints against a real LLM, smoke-grade report

**Files:**
- Create: `scripts/lib/stagePrompt.mjs`
- Create: `scripts/lib/judge.mjs`
- Create: `scripts/run-evals.mjs`
- Modify: `package.json` (add `"run-evals": "node scripts/run-evals.mjs"`), `.gitignore` (add `eval-reports/`)
- Test: `tests/stagePrompt.test.mjs`, `tests/judge.test.mjs`

**Interfaces:**
- Consumes: `chat` (Task 1), `extractStageBodies` (Task 4).
- Produces:
  - `composeStagePrompt({ frontmatter, stageBodies, stageId }) → string` — mirrors harmonica-mcp `toChainConfig`: optional lens line (`Read every question through these lenses: a, b.\n\n`) + the stage body prose. Keeping composition identical to the reference runtime is what makes the smoke honest.
  - `buildJudgePrompt({ criteria, participantMessages, facilitatorTurn }) → string` and `parseVerdicts(rawJson, criteria) → [{ criterion, verdict: 'pass'|'fail', evidence }]` (throws if the model's JSON doesn't cover every criterion).
  - CLI: `node scripts/run-evals.mjs <method-id> [--stage id] [--set synthetic|curated|all] [--model m] [--judge-model m]` → writes `eval-reports/<method-id>-<run-date>.json` + `.md`, prints a per-stage summary table.

**Report header (verbatim, non-negotiable — this is the eval-gate discipline):**

```markdown
> **Smoke-grade result — uncalibrated judge.** The judge model has unknown TPR/TNR
> (no labelled dev/test sets exist for this method). Treat every rate below as a
> spec-conformance smoke signal, not a quality certification. Do not gate any
> user-visible decision on these numbers and do not publish them as pass rates.
> Calibration discipline: harmonica-web-app-pro/docs/eval-methodology.md §5.
```

- [ ] **Step 1: Write the failing tests**

```js
// tests/stagePrompt.test.mjs
import { describe, it, expect } from 'vitest';
import { composeStagePrompt } from '../scripts/lib/stagePrompt.mjs';

describe('composeStagePrompt', () => {
  it('prefixes the lens line when lenses exist', () => {
    const p = composeStagePrompt({
      frontmatter: { lenses: ['concerns', 'data'] },
      stageBodies: { 'open-the-question': 'Hold the question open.' },
      stageId: 'open-the-question',
    });
    expect(p).toBe('Read every question through these lenses: concerns, data.\n\nHold the question open.');
  });
  it('is just the stage body without lenses', () => {
    const p = composeStagePrompt({ frontmatter: {}, stageBodies: { a: 'Body.' }, stageId: 'a' });
    expect(p).toBe('Body.');
  });
  it('throws on an unknown stage', () => {
    expect(() => composeStagePrompt({ frontmatter: {}, stageBodies: {}, stageId: 'x' })).toThrow(/stage/);
  });
});
```

```js
// tests/judge.test.mjs
import { describe, it, expect } from 'vitest';
import { buildJudgePrompt, parseVerdicts } from '../scripts/lib/judge.mjs';

const criteria = [
  { kind: 'should', text: 'stays with difficulty' },
  { kind: 'should_not', text: 'rushes to consensus' },
];

describe('buildJudgePrompt', () => {
  it('includes every criterion and the turns verbatim', () => {
    const p = buildJudgePrompt({ criteria, participantMessages: [{ role: 'user', content: 'PM' }], facilitatorTurn: 'FT' });
    expect(p).toContain('stays with difficulty');
    expect(p).toContain('rushes to consensus');
    expect(p).toContain('PM');
    expect(p).toContain('FT');
  });
});

describe('parseVerdicts', () => {
  it('parses a well-formed verdict array (with or without a code fence)', () => {
    const raw = '```json\n[{"criterion":"stays with difficulty","verdict":"pass","evidence":"e1"},{"criterion":"rushes to consensus","verdict":"fail","evidence":"e2"}]\n```';
    const v = parseVerdicts(raw, criteria);
    expect(v).toHaveLength(2);
    expect(v[1].verdict).toBe('fail');
  });
  it('throws when a criterion is missing from the response', () => {
    const raw = '[{"criterion":"stays with difficulty","verdict":"pass","evidence":"e"}]';
    expect(() => parseVerdicts(raw, criteria)).toThrow(/rushes to consensus/);
  });
  it('throws on a verdict outside pass|fail', () => {
    const raw = JSON.stringify(criteria.map((c) => ({ criterion: c.text, verdict: 'maybe', evidence: '' })));
    expect(() => parseVerdicts(raw, criteria)).toThrow(/verdict/);
  });
});
```

- [ ] **Step 2: Run to verify both fail** → FAIL
- [ ] **Step 3: Implement `stagePrompt.mjs`**

```js
// scripts/lib/stagePrompt.mjs
// Mirrors harmonica-mcp toChainConfig() composition (lens line + stage prose)
// so the smoke exercises the same prompt the reference runtime installs.
export function composeStagePrompt({ frontmatter, stageBodies, stageId }) {
  const body = stageBodies[stageId];
  if (body == null) throw new Error(`no body section for stage "${stageId}"`);
  const lenses = frontmatter.lenses;
  const lensLine =
    lenses && lenses.length ? `Read every question through these lenses: ${lenses.join(', ')}.\n\n` : '';
  return `${lensLine}${body}`;
}
```

- [ ] **Step 4: Implement `judge.mjs`**

```js
// scripts/lib/judge.mjs
export function buildJudgePrompt({ criteria, participantMessages, facilitatorTurn }) {
  const lines = criteria.map(
    (c, i) => `${i + 1}. [${c.kind}] ${c.text}`,
  );
  return [
    'You are evaluating one AI-facilitator turn against explicit criteria.',
    'Conversation so far (participant messages):',
    ...participantMessages.map((m) => `${m.role}: ${m.content}`),
    `Facilitator turn under evaluation:\n${facilitatorTurn}`,
    'Criteria — for a [should] criterion, verdict "pass" means the turn does it; for a [should_not] criterion, verdict "pass" means the turn does NOT do it:',
    ...lines,
    'Answer with ONLY a JSON array, one object per criterion, in order:',
    '[{"criterion": "<criterion text verbatim>", "verdict": "pass" | "fail", "evidence": "<short quote or reason>"}]',
  ].join('\n\n');
}

export function parseVerdicts(raw, criteria) {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  let arr;
  try {
    arr = JSON.parse(cleaned);
  } catch (e) {
    throw new Error(`judge returned unparseable JSON: ${e.message}`);
  }
  if (!Array.isArray(arr)) throw new Error('judge response is not an array');
  const byText = new Map(arr.map((v) => [v.criterion, v]));
  return criteria.map((c) => {
    const v = byText.get(c.text);
    if (!v) throw new Error(`judge response missing criterion: ${c.text}`);
    if (v.verdict !== 'pass' && v.verdict !== 'fail') throw new Error(`invalid verdict "${v.verdict}"`);
    return { criterion: c.text, kind: c.kind, verdict: v.verdict, evidence: v.evidence ?? '' };
  });
}
```

- [ ] **Step 5: Implement the CLI `scripts/run-evals.mjs`**

```js
// scripts/run-evals.mjs
// Usage: node scripts/run-evals.mjs <method-id> [--stage id] [--set synthetic|curated|all]
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { parseFrontmatter, extractStageBodies } from './lib/parseFrontmatter.mjs';
import { registryRoot } from './lib/walk.mjs';
import { composeStagePrompt } from './lib/stagePrompt.mjs';
import { buildJudgePrompt, parseVerdicts } from './lib/judge.mjs';
import { chat } from './lib/llm.mjs';

const MODEL = process.env.EVAL_MODEL || 'gpt-4o-mini-2024-07-18';
const JUDGE_MODEL = process.env.EVAL_JUDGE_MODEL || 'gpt-4o-mini-2024-07-18';

const DISCLAIMER = [
  '> **Smoke-grade result — uncalibrated judge.** The judge model has unknown TPR/TNR',
  '> (no labelled dev/test sets exist for this method). Treat every rate below as a',
  '> spec-conformance smoke signal, not a quality certification. Do not gate any',
  '> user-visible decision on these numbers and do not publish them as pass rates.',
  '> Calibration discipline: harmonica-web-app-pro/docs/eval-methodology.md §5.',
].join('\n');

const args = process.argv.slice(2);
const methodId = args[0];
const flag = (n) => { const i = args.indexOf(`--${n}`); return i === -1 ? undefined : args[i + 1]; };
const onlyStage = flag('stage');
const set = flag('set') || 'all';
if (!methodId) { console.error('usage: run-evals <method-id> [--stage id] [--set synthetic|curated|all]'); process.exit(1); }

const root = registryRoot();
const dir = path.join(root, 'methods', methodId);
const parsed = parseFrontmatter(fs.readFileSync(path.join(dir, 'method.md'), 'utf8'));
const stageBodies = extractStageBodies(parsed.body);
const stages = (parsed.frontmatter.stages ?? []).filter((s) => !onlyStage || s.id === onlyStage);

function criteriaOf(prompt) {
  return [
    ...(prompt.should ?? []).map((text) => ({ kind: 'should', text })),
    ...(prompt.should_not ?? []).map((text) => ({ kind: 'should_not', text })),
  ];
}

const results = [];
for (const stage of stages) {
  const files = [];
  const curatedPath = path.join(dir, 'evals', `${stage.id}.yaml`);
  const syntheticPath = path.join(dir, 'evals', `${stage.id}.synthetic.yaml`);
  if (set !== 'synthetic' && fs.existsSync(curatedPath)) files.push({ kind: 'curated', p: curatedPath });
  if (set !== 'curated' && fs.existsSync(syntheticPath)) files.push({ kind: 'synthetic', p: syntheticPath });

  const systemPrompt = composeStagePrompt({ frontmatter: parsed.frontmatter, stageBodies, stageId: stage.id });
  for (const f of files) {
    const bp = yaml.load(fs.readFileSync(f.p, 'utf8'));
    for (const [i, prompt] of (bp.prompts ?? []).entries()) {
      const facilitatorTurn = await chat({ system: systemPrompt, messages: prompt.messages, model: MODEL });
      const criteria = criteriaOf(prompt);
      const rawVerdicts = await chat({
        system: 'You are a strict facilitation-eval judge. Output only JSON.',
        messages: [{ role: 'user', content: buildJudgePrompt({ criteria, participantMessages: prompt.messages, facilitatorTurn }) }],
        model: JUDGE_MODEL,
        temperature: 0,
      });
      const verdicts = parseVerdicts(rawVerdicts, criteria);
      results.push({ stage: stage.id, setKind: f.kind, scenario: i, tuple: prompt.tuple ?? null, reviewed: bp.reviewed ?? null, facilitatorTurn, verdicts });
      const fails = verdicts.filter((v) => v.verdict === 'fail').length;
      console.log(`  ${fails === 0 ? '✓' : '✗'} ${stage.id} [${f.kind} #${i}] ${verdicts.length - fails}/${verdicts.length} criteria`);
    }
  }
}

const runDate = new Date().toISOString().slice(0, 10);
const outDir = path.join(root, 'eval-reports');
fs.mkdirSync(outDir, { recursive: true });
const base = path.join(outDir, `${methodId}-${runDate}`);
fs.writeFileSync(`${base}.json`, JSON.stringify({ methodId, runDate, model: MODEL, judgeModel: JUDGE_MODEL, results }, null, 2));

const byStage = {};
for (const r of results) {
  const k = `${r.stage} (${r.setKind}${r.setKind === 'synthetic' && r.reviewed === false ? ', unreviewed' : ''})`;
  byStage[k] ??= { pass: 0, total: 0 };
  for (const v of r.verdicts) { byStage[k].total++; if (v.verdict === 'pass') byStage[k].pass++; }
}
const md = [
  `# ${methodId} — spec-conformance smoke, ${runDate}`,
  '',
  DISCLAIMER,
  '',
  `Generation model: \`${MODEL}\` · Judge model: \`${JUDGE_MODEL}\` (pinned)`,
  '',
  '| Stage (set) | Criteria passed |',
  '|---|---|',
  ...Object.entries(byStage).map(([k, v]) => `| ${k} | ${v.pass}/${v.total} |`),
  '',
  '## Failures',
  ...results.flatMap((r) =>
    r.verdicts.filter((v) => v.verdict === 'fail').map((v) =>
      `- **${r.stage}** [${r.setKind} #${r.scenario}] ${v.kind}: "${v.criterion}" — ${v.evidence}`,
    ),
  ),
].join('\n');
fs.writeFileSync(`${base}.md`, md);
console.log(`\nreport: ${path.relative(root, base)}.md`);
```

- [ ] **Step 6: Run offline tests** — `npx vitest run tests/stagePrompt.test.mjs tests/judge.test.mjs` → PASS; then `npx vitest run` (whole suite) → PASS
- [ ] **Step 7: Add `eval-reports/` to `.gitignore`, npm scripts to `package.json`**
- [ ] **Step 8: Commit** — `git commit -m "feat: execute spec blueprints against a real LLM with smoke-grade reports"`

---

### Task 7: Pilot on one method, docs, and graduation rule

**Files:**
- Modify: `README.md` (new "Day-one evals" section)
- Create (generated): `methods/retrospective/evals/*.synthetic.yaml`
- Test: manual pilot run (this task's verification is a real-LLM run + human eyeball — the honest gate per eval-gate when no number is trustworthy yet)

- [ ] **Step 1: Tuple review run (no LLM calls)**

Run: `node scripts/generate-eval-set.mjs retrospective --domains "product team sprint retro,community volunteer program"`
Expected: per-stage tuple listing. **Show the tuples to Artem / a reviewer and adjust `--domains`/`--cap` until they read as realistic** (mandatory step from the `generate-synthetic-data` skill — do not skip).

- [ ] **Step 2: Generate** — `node --env-file=../evals/.env scripts/generate-eval-set.mjs retrospective --domains "<confirmed>" --write`
Expected: 5 `*.synthetic.yaml` files under `methods/retrospective/evals/`, each `reviewed: false`. Cost check: 5 stages × 8 scenarios ≈ 40 gpt-4o-mini calls — cents.

- [ ] **Step 3: Validate** — `npm run validate` → specs valid, with the expected `unreviewed synthetic set` warnings and no errors.

- [ ] **Step 4: Run the smoke** — `node --env-file=../evals/.env scripts/run-evals.mjs retrospective`
Expected: report at `eval-reports/retrospective-<date>.md` with the disclaimer header. Read the failures section against the actual facilitator turns in the JSON — this eyeball IS the pilot's success criterion, not the pass rate. If the judge's fail evidence is nonsense, fix the judge prompt before anything else.

- [ ] **Step 5: README section** — add under a `## Day-one evals` heading:

```markdown
## Day-one evals

A newly added spec has no usage traces, so it cannot be evaluated trace-first. The registry
closes that gap with a generated scenario set per stage:

    npm run generate-eval-set -- <method-id> --domains "a,b"          # review tuples
    npm run generate-eval-set -- <method-id> --domains "a,b" --write  # generate evals/*.synthetic.yaml
    npm run run-evals -- <method-id>                                  # smoke against a real LLM

Ground rules:
- Criteria are never generated — synthetic sets copy `should`/`should_not` from the curated
  blueprint and vary only the participant inputs (stance × domain × pressure).
- Results are **smoke-grade**: the judge is uncalibrated (no labelled sets exist per method).
  They test whether the method behaves as specified, not whether the method is any good.
- A set stays `reviewed: false` until an expert confirms the scenarios are realistic.
  Flip the field in the file when reviewed.
- Graduation: at 100+ representative real traces for a method, retire its synthetic set
  from active runs and switch to stratified sampling of real traces.
```

- [ ] **Step 6: Full suite + registry checks** — `npx vitest run && npm run validate && npm run check && npm run guard` → all green
- [ ] **Step 7: Commit + PR** — commit generated files + README; open a PR from the task branch to `main`.

---

## Explicitly out of scope (v1)

- **Install-time wiring** (`install_method_spec` triggering generation/runs) — deferred until third-party installs exist; harmonica-mcp untouched.
- **Judge calibration** — needs expert labels; until then everything is smoke-grade by construction.
- **Running through the real Harmonica runtime** (`harmonica-synthetic-chain-test` skill does this manually) — the runner composes the same stage prompt the runtime installs, which is the portable 90%; full-runtime replay is a follow-up if composition drift is observed.
- **CI-scheduled LLM runs** — runs are manual and local (LLM cost + key handling); CI stays offline.
- **Backfilling synthetic sets for all 9 methods** — pilot is `retrospective` only; sweep the rest after the pilot's review confirms the generator output is worth committing.

## Self-review notes

- Spec coverage: cold-start generation (Tasks 2–4), executability (Task 6), circularity guard (criteria copying, Task 4/5; human tuple review, Task 7 Step 1), graduation caveat (README, Task 7), open question (Decision record).
- Type consistency: `chat()` signature identical across Tasks 1/4/6; `extractStageBodies` defined Task 4, consumed Task 6; `tuple` field written by Task 4's builder, validated by Task 5, surfaced by Task 6's report.
