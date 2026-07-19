import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

const gatedFamilies = ['tools', 'categories', 'compare', 'best', 'alternatives', 'for', 'stacks', 'blog'];

test('every generated content family uses the noindex research archive', () => {
  for (const family of gatedFamilies) {
    const path = `src/app/${family}/layout.tsx`;
    assert.equal(existsSync(join(root, path)), true, `${family} layout missing`);
    const source = read(path);
    assert.match(source, /unreviewedRobots/);
    assert.match(source, /ResearchArchive/);
  }
  const robots = read('src/lib/editorial.ts');
  assert.match(robots, /index:\s*false/);
  assert.match(robots, /follow:\s*true/);
});

test('unreviewed versus routes stay gated while the reviewed Fiverr comparison is published', () => {
  const vsIndex = read('src/app/vs/page.tsx');
  assert.match(vsIndex, /unreviewedRobots/);
  assert.match(vsIndex, /ResearchArchive/);

  for (const slug of [
    'quickbooks-online-vs-1800accountant',
    'reclaim-ai-vs-time-etc',
    'tidio-vs-time-etc',
  ]) {
    const source = read(`src/app/vs/${slug}/layout.tsx`);
    assert.match(source, /unreviewedRobots/);
    assert.match(source, /ResearchArchive/);
  }

  const reviewed = read('src/app/vs/buffer-vs-fiverr-social-media-manager/page.tsx');
  assert.match(reviewed, /robots:\s*{[\s\S]*?index:\s*true/);
  assert.doesNotMatch(reviewed, /Under Editorial Review/);
});

test('the sitemap contains the reviewed project, trust, and Fiverr comparison pages', () => {
  const sitemap = read('src/app/sitemap.ts');
  assert.match(sitemap, /INDEXABLE_PATHS/);
  assert.match(sitemap, /'\/about'/);
  assert.match(sitemap, /'\/contact'/);
  assert.match(sitemap, /'\/privacy'/);
  assert.match(sitemap, /'\/terms'/);
  assert.match(sitemap, /'\/vs\/buffer-vs-fiverr-social-media-manager'/);
  assert.doesNotMatch(sitemap, /data\/tools|blog-markdown|tools\.map|categories\.map/);
});

test('public project pages disclose the factual and commercial limits', () => {
  const publicCopy = [
    read('src/app/page.tsx'), read('src/app/about/page.tsx'), read('src/app/layout.tsx'),
    read('src/components/Footer.tsx'), read('src/components/Disclaimer.tsx'), read('public/llms.txt'),
  ].join('\n');
  assert.match(publicCopy, /primary-source review/i);
  assert.match(publicCopy, /ordinary vendor URL/i);
  assert.doesNotMatch(publicCopy, /trusted directory|500\+ AI tools|updated weekly|hands-on reviews/i);
});

test('legal disclosures do not claim an affiliate relationship that is not active', () => {
  const legal = `${read('src/app/privacy/page.tsx')}\n${read('src/app/terms/page.tsx')}`;
  assert.match(legal, /does not currently publish a verified[\s\S]*tracked affiliate link/i);
  assert.doesNotMatch(legal, /contains affiliate links|participates in various affiliate/i);
});

test('the explicitly indexed OpenClaw article is now noindex', () => {
  const page = read('src/app/blog/run-openclaw-free-2026/page.tsx');
  assert.match(page, /robots:\s*{\s*index:\s*false/);
});

test('paused routes use honest browser metadata', () => {
  const metadataPages = [
    'src/app/tools/page.tsx',
    'src/app/tools/[slug]/page.tsx',
    'src/app/categories/page.tsx',
    'src/app/categories/[slug]/page.tsx',
    'src/app/compare/page.tsx',
    'src/app/compare/[slug]/page.tsx',
    'src/app/vs/page.tsx',
    'src/app/vs/quickbooks-online-vs-1800accountant/page.tsx',
    'src/app/vs/reclaim-ai-vs-time-etc/page.tsx',
    'src/app/vs/tidio-vs-time-etc/page.tsx',
    'src/app/best/page.tsx',
    'src/app/best/[slug]/page.tsx',
    'src/app/alternatives/[slug]/page.tsx',
    'src/app/for/page.tsx',
    'src/app/for/[slug]/page.tsx',
    'src/app/stacks/page.tsx',
    'src/app/stacks/[slug]/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/blog/[slug]/page.tsx',
    'src/app/blog/run-openclaw-free-2026/page.tsx',
  ];

  for (const path of metadataPages) {
    const source = read(path);
    assert.match(source, /Under Editorial Review/iu, `${path} metadata is not gated`);
  }
});
