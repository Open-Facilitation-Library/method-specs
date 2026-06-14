import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { validateSpec } from './lib/validate.mjs';
import { listMethodDirs, evalsInfo, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot();
const methodsRoot = path.join(ROOT, 'methods');
let errorCount = 0;
const ids = new Map();

for (const m of listMethodDirs(methodsRoot)) {
  const raw = fs.readFileSync(m.mdPath, 'utf8');
  let parsed;
  try {
    parsed = parseFrontmatter(raw);
  } catch (e) {
    console.error(`✗ ${m.dirName}: ${e.message}`);
    errorCount++;
    continue;
  }
  const ev = evalsInfo(m.dir);
  const { errors, warnings } = validateSpec(parsed.frontmatter, parsed.bodyStageIds, {
    dirName: m.dirName,
    evalsPresent: ev.evalsPresent,
    presentEvalStages: ev.presentEvalStages,
  });
  const id = parsed.frontmatter.id;
  if (typeof id === 'string') {
    if (ids.has(id)) errors.push(`duplicate id "${id}" (also in ${ids.get(id)})`);
    ids.set(id, m.dirName);
  }
  if (errors.length) {
    errorCount += errors.length;
    console.error(`✗ ${m.dirName}`);
    errors.forEach((e) => console.error(`    error: ${e}`));
  } else {
    console.log(`✓ ${m.dirName}`);
  }
  warnings.forEach((w) => console.warn(`    warn: ${w}`));
}

if (errorCount > 0) {
  console.error(`\n${errorCount} error(s)`);
  process.exit(1);
}
console.log('\nall specs valid');
