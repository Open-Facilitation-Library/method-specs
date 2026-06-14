import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { validateSpec } from './lib/validate.mjs';
import { buildIndexJson, buildReadmeTable } from './lib/buildIndex.mjs';
import { listMethodDirs, evalsInfo, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot();
const methodsRoot = path.join(ROOT, 'methods');
const indexPath = path.join(ROOT, 'index.json');
const readmePath = path.join(ROOT, 'README.md');
const START = '<!-- METHODS:START -->';
const END = '<!-- METHODS:END -->';
const check = process.argv.includes('--check');

const specs = [];
let errorCount = 0;
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
  const { errors } = validateSpec(parsed.frontmatter, parsed.bodyStageIds, {
    dirName: m.dirName,
    evalsPresent: ev.evalsPresent,
    presentEvalStages: ev.presentEvalStages,
  });
  if (errors.length) {
    errorCount += errors.length;
    console.error(`✗ ${m.dirName}: ${errors.join('; ')}`);
    continue;
  }
  specs.push({ fm: parsed.frontmatter, has_evals: ev.evalsPresent });
}
if (errorCount > 0) {
  console.error(`\nrefusing to build index: ${errorCount} validation error(s). Run "npm run validate".`);
  process.exit(1);
}

const indexStr = JSON.stringify(buildIndexJson(specs), null, 2) + '\n';
const table = buildReadmeTable(buildIndexJson(specs));
const readme = fs.readFileSync(readmePath, 'utf8');
const s = readme.indexOf(START);
const e = readme.indexOf(END);
if (s === -1 || e === -1 || e < s) {
  console.error(`README markers (${START} / ${END}) missing or malformed`);
  process.exit(1);
}
const newReadme = readme.slice(0, s + START.length) + '\n' + table + '\n' + readme.slice(e);

if (check) {
  const curIndex = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  let drift = false;
  if (curIndex !== indexStr) {
    console.error('index.json is out of date — run "npm run build-index"');
    drift = true;
  }
  if (readme !== newReadme) {
    console.error('README methods table is out of date — run "npm run build-index"');
    drift = true;
  }
  if (drift) process.exit(1);
  console.log('index + README in sync');
} else {
  fs.writeFileSync(indexPath, indexStr);
  fs.writeFileSync(readmePath, newReadme);
  console.log(`wrote index.json (${specs.length} methods) + README table`);
}
