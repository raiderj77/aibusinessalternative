import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const layout = read('src/app/layout.tsx');
const home = read('src/app/page.tsx');
const answerBlock = read('src/components/AnswerBlock.tsx');
const decisionHelper = read('src/components/SocialMediaDecisionHelper.tsx');
const researchArchive = read('src/components/ResearchArchive.tsx');

test('homepage publishes one absolute canonical URL', () => {
  assert.match(layout, /metadataBase:\s*new URL\('https:\/\/aibusinessalternative\.com'\)/);
  assert.match(home, /alternates:\s*{\s*canonical:\s*'\/'/s);
});

test('homepage inventory and archive links use responsive grids', () => {
  assert.match(home, /sm:grid-cols-2 lg:grid-cols-4/);
  assert.match(home, /sm:grid-cols-2 lg:grid-cols-3/);
  assert.match(home, /Report a correction/);
});

test('review dates render without shifting across local time zones', () => {
  assert.match(answerBlock, /T00:00:00Z/);
  assert.match(answerBlock, /timeZone:\s*'UTC'/);
});

test('the decision result is announced only after every answer is selected', () => {
  assert.match(decisionHelper, /{answered && \(/);
  assert.match(decisionHelper, /role="status"/);
  assert.match(decisionHelper, /aria-live="polite"/);
});

test('research archive headings support singular and plural sections', () => {
  assert.match(researchArchive, /section\.startsWith\('This '\) \? 'is' : 'are'/);
  assert.match(researchArchive, /{section} {verb} under editorial review/);
});
