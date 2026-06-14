import yaml from 'js-yaml';

// Splits a method.md into { frontmatter, bodyStageIds }.
// Mirrors the harmonica-mcp parser, but only reads what the registry needs.
export function parseFrontmatter(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) {
    throw new Error('missing frontmatter: file must start with "---"');
  }
  const end = text.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error('missing frontmatter: no closing "---"');
  }
  const frontmatter = yaml.load(text.slice(4, end));
  if (frontmatter === null || typeof frontmatter !== 'object') {
    throw new Error('empty or invalid frontmatter');
  }
  const body = text.slice(end + 4);
  const bodyStageIds = [];
  const re = /^##\s+Stage:\s*(\S+)\s*$/gm;
  let m;
  while ((m = re.exec(body)) !== null) bodyStageIds.push(m[1]);
  return { frontmatter, bodyStageIds };
}
