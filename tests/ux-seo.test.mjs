import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const layout = read('src/app/layout.tsx');
const home = read('src/app/page.tsx');

test('homepage publishes one absolute canonical URL', () => {
  assert.match(layout, /metadataBase:\s*new URL\('https:\/\/aibusinessalternative\.com'\)/);
  assert.match(home, /alternates:\s*{\s*canonical:\s*'\/'/s);
});

test('comparison cards may shrink inside the mobile grid', () => {
  assert.match(home, /className="card min-w-0 p-3\.5 flex items-center/);
});
