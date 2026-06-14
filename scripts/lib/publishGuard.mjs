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
