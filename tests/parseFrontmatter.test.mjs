import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../scripts/lib/parseFrontmatter.mjs';

const doc = [
  '---',
  'id: demo',
  'stages:',
  '  - { id: one }',
  '  - { id: two }',
  '---',
  '',
  '## Stage: one',
  'body',
  '## Stage: two',
  'body',
].join('\n');

describe('parseFrontmatter', () => {
  it('parses frontmatter and stage body ids', () => {
    const { frontmatter, bodyStageIds } = parseFrontmatter(doc);
    expect(frontmatter.id).toBe('demo');
    expect(bodyStageIds).toEqual(['one', 'two']);
  });

  it('tolerates CRLF line endings', () => {
    const { bodyStageIds } = parseFrontmatter(doc.replace(/\n/g, '\r\n'));
    expect(bodyStageIds).toEqual(['one', 'two']);
  });

  it('throws when frontmatter is missing', () => {
    expect(() => parseFrontmatter('no fences here')).toThrow(/missing frontmatter/);
  });

  it('throws when frontmatter is empty', () => {
    expect(() => parseFrontmatter('---\n\n---\nbody')).toThrow(/empty or invalid/);
  });
});
