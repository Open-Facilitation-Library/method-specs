import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function listMethodDirs(methodsRoot) {
  if (!fs.existsSync(methodsRoot)) return [];
  return fs
    .readdirSync(methodsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(methodsRoot, d.name);
      return { dirName: d.name, dir, mdPath: path.join(dir, 'method.md') };
    })
    .filter((m) => fs.existsSync(m.mdPath))
    .sort((a, b) => a.dirName.localeCompare(b.dirName));
}

export function evalsInfo(dir) {
  const evalsDir = path.join(dir, 'evals');
  if (!fs.existsSync(evalsDir)) return { evalsPresent: false, presentEvalStages: new Set() };
  const presentEvalStages = new Set(
    fs.readdirSync(evalsDir).filter((f) => f.endsWith('.yaml')).map((f) => f.replace(/\.yaml$/, '')),
  );
  return { evalsPresent: true, presentEvalStages };
}

export function registryRoot(importMetaUrl) {
  if (process.env.REGISTRY_ROOT) return path.resolve(process.env.REGISTRY_ROOT);
  const here = path.dirname(fileURLToPath(importMetaUrl));
  // scripts/lib/walk.mjs -> repo root is two levels up
  return path.resolve(here, '..', '..');
}
