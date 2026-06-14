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
