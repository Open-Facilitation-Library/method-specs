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
