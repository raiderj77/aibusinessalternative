import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';
import { getToolDestination } from '../src/lib/commercialLinks.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

test('placeholder affiliate URLs fall back to the official website', () => {
  assert.deepEqual(
    getToolDestination({ affiliateUrl: '#', websiteUrl: 'https://example.com/product' }),
    { href: 'https://example.com/product', isAffiliate: false },
  );
  assert.deepEqual(
    getToolDestination({ affiliateUrl: 'not-a-url', websiteUrl: 'https://example.com' }),
    { href: 'https://example.com', isAffiliate: false },
  );
});

test('only a distinct usable affiliate destination receives sponsored treatment', () => {
  assert.deepEqual(
    getToolDestination({
      affiliateUrl: 'https://example.com',
      websiteUrl: 'https://example.com/',
    }),
    { href: 'https://example.com', isAffiliate: false },
  );
  assert.deepEqual(
    getToolDestination({
      affiliateUrl: 'https://partner.example/offer?ref=site',
      websiteUrl: 'https://example.com',
    }),
    { href: 'https://partner.example/offer?ref=site', isAffiliate: true },
  );
});

test('commercial CTAs use the safe link component instead of raw placeholder URLs', () => {
  for (const path of [
    'src/app/tools/[slug]/page.tsx',
    'src/app/for/[slug]/page.tsx',
  ]) {
    const source = read(path);
    assert.match(source, /CommercialLink/);
    assert.doesNotMatch(source, /href=\{tool\.affiliateUrl\}/);
  }
});

test('commercial click analytics excludes destinations and visitor content', () => {
  const source = read('src/components/AnalyticsConsent.tsx');
  const eventPayload = source.match(
    /gtag\?\.\('event', 'commercial_outbound_click', \{([\s\S]*?)\}\);/,
  );
  assert.ok(eventPayload, 'commercial click event payload should exist');
  assert.match(eventPayload[1], /tool_slug/);
  assert.match(eventPayload[1], /placement/);
  assert.doesNotMatch(
    eventPayload[1],
    /href|destination|query|search|email|name|link_text|page_title/i,
  );
});
