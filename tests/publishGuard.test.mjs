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
