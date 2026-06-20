import { describe, it, expect } from 'vitest';
import { parseRef, validateComposition } from '../scripts/lib/composition.mjs';

describe('parseRef', () => {
  it('parses a bare id', () => {
    expect(parseRef('orid-focused-conversation')).toEqual({ id: 'orid-focused-conversation', version: null });
  });
  it('parses an id@version', () => {
    expect(parseRef('five-l@1.2.3')).toEqual({ id: 'five-l', version: '1.2.3' });
  });
  it('rejects malformed refs', () => {
    expect(parseRef('Bad_Id')).toBeNull();
    expect(parseRef('x@1')).toBeNull();
    expect(parseRef('')).toBeNull();
    expect(parseRef(42)).toBeNull();
  });
});

describe('validateComposition', () => {
  const base = () => [
    { id: 'orid', version: '1.0.0' },
    { id: 'clustering', version: '1.0.0' },
    { id: 'deliberation', version: '0.1.0', composes: ['orid', 'clustering'] },
  ];

  it('accepts a valid composition graph', () => {
    const { errors, warnings } = validateComposition(base());
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it('errors when a composed spec does not exist', () => {
    const s = [{ id: 'a', version: '1.0.0', composes: ['ghost'] }];
    expect(validateComposition(s).errors).toContainEqual(
      expect.stringMatching(/composes "ghost".*not a spec/),
    );
  });

  it('warns on a version-pin mismatch', () => {
    const s = [
      { id: 'orid', version: '2.0.0' },
      { id: 'd', version: '0.1.0', composes: ['orid@1.0.0'] },
    ];
    const { errors, warnings } = validateComposition(s);
    expect(errors).toEqual([]);
    expect(warnings).toContainEqual(expect.stringMatching(/pins orid@1\.0\.0.*has orid@2\.0\.0/));
  });

  it('detects a 2-cycle', () => {
    const s = [
      { id: 'a', version: '1.0.0', composes: ['b'] },
      { id: 'b', version: '1.0.0', composes: ['a'] },
    ];
    expect(validateComposition(s).errors).toContainEqual(expect.stringMatching(/composition cycle/));
  });

  it('detects a longer cycle', () => {
    const s = [
      { id: 'a', version: '1.0.0', composes: ['b'] },
      { id: 'b', version: '1.0.0', composes: ['c'] },
      { id: 'c', version: '1.0.0', composes: ['a'] },
    ];
    expect(validateComposition(s).errors).toContainEqual(expect.stringMatching(/composition cycle/));
  });
});
