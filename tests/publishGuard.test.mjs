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

  it('blocks a proprietary source method even when our rendering is CC0', () => {
    const { errors } = publishGuard({
      license: 'CC0-1.0',
      source_rights: { class: 'proprietary', name_status: 'registered trademark' },
    });
    expect(errors).toContainEqual(expect.stringMatching(/keep this spec in the staging repo/));
  });

  it('passes public-domain and open-licensed source methods', () => {
    expect(publishGuard({ license: 'CC0-1.0', source_rights: { class: 'public-domain' } }).errors).toEqual([]);
    expect(
      publishGuard({
        license: 'CC0-1.0',
        source_rights: { class: 'open-licensed', source_licence: 'CC-BY-SA-4.0' },
      }).errors,
    ).toEqual([]);
  });

  it('allows an unestablished source-rights position through, since it blocks nothing yet', () => {
    expect(publishGuard({ license: 'CC0-1.0', source_rights: { class: 'unknown' } }).errors).toEqual([]);
  });

  it('blocks a non-allowlisted licence', () => {
    expect(publishGuard({ license: 'CC-BY-ND-4.0' }).errors).toContainEqual(
      expect.stringMatching(/not in the publishable allowlist/),
    );
  });
});
