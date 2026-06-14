import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/parseFrontmatter.mjs';
import { publishGuard } from './lib/publishGuard.mjs';
import { listMethodDirs, registryRoot } from './lib/walk.mjs';

const ROOT = registryRoot(import.meta.url);
const methodsRoot = path.join(ROOT, 'methods');
let blocked = 0;

for (const m of listMethodDirs(methodsRoot)) {
  const raw = fs.readFileSync(m.mdPath, 'utf8');
  let fm;
  try {
    fm = parseFrontmatter(raw).frontmatter;
  } catch (e) {
    console.error(`✗ ${m.dirName}: ${e.message}`);
    blocked++;
    continue;
  }
  const { errors } = publishGuard(fm);
  if (errors.length) {
    blocked += errors.length;
    console.error(`✗ ${m.dirName}: ${errors.join('; ')}`);
  } else {
    console.log(`✓ ${m.dirName}`);
  }
}

if (blocked > 0) {
  console.error(`\n${blocked} spec(s) blocked from the public repo`);
  process.exit(1);
}
console.log('\nall specs publishable');
