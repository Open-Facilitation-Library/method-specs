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
