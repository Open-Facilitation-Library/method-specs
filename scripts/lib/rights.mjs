// The rights position of the SOURCE METHOD, which is a different question from the
// `license` field. `license` covers this spec's own text; `source_rights` covers the
// method the spec renders — its name, and whatever the originator published.
//
// A method can be freely describable while our rendering is CC0 (Delphi), or carry a
// registered name and a restrictive policy while our text would have been CC0 too
// (a trademarked method). Only the second keeps a spec out of the public repo.
export const SOURCE_RIGHTS_CLASSES = new Set([
  // No owner: the method predates or sits outside any proprietary framework.
  'public-domain',
  // Published under an open licence. `source_licence` names it, and its conditions
  // (attribution, share-alike, non-commercial) carry into anything derived from it.
  'open-licensed',
  // A registered name, an all-rights-reserved source, or a policy that restricts
  // describing how the method works. Belongs in the staging repo.
  'proprietary',
  // Not yet established. Publishable, but not a basis for a named conformance profile.
  'unknown',
]);

// Source-rights classes the public repo will host. `proprietary` is excluded: the
// registry's first duty is not to republish what someone else licenses.
export const PUBLISHABLE_SOURCE_RIGHTS = new Set([
  'public-domain',
  'open-licensed',
  'unknown',
]);

export function validateSourceRights(sr) {
  const errors = [];
  if (sr === undefined) return { errors };
  if (typeof sr !== 'object' || sr === null || Array.isArray(sr)) {
    errors.push('source_rights, if present, must be a mapping');
    return { errors };
  }
  if (!SOURCE_RIGHTS_CLASSES.has(sr.class)) {
    errors.push(
      `source_rights.class must be one of ${[...SOURCE_RIGHTS_CLASSES].join('|')} (got "${sr.class}")`,
    );
  }
  if (sr.class === 'open-licensed' && (typeof sr.source_licence !== 'string' || !sr.source_licence.trim())) {
    errors.push('source_rights.source_licence is required when class is open-licensed');
  }
  for (const f of ['source_licence', 'name_status', 'note']) {
    if (f in sr && (typeof sr[f] !== 'string' || !sr[f].trim())) {
      errors.push(`source_rights.${f}, if present, must be a non-empty string`);
    }
  }
  return { errors };
}
