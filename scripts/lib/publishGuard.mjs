import { PUBLISHABLE_LICENSES } from './licenses.mjs';
import { PUBLISHABLE_SOURCE_RIGHTS } from './rights.mjs';

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
  const cls = fm.source_rights && fm.source_rights.class;
  if (cls !== undefined && !PUBLISHABLE_SOURCE_RIGHTS.has(cls)) {
    errors.push(
      `source_rights.class "${cls}": the source method's own rights keep this spec in the staging repo`,
    );
  }
  return { errors };
}
