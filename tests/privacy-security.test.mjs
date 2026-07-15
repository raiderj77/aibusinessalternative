import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const layout = read("src/app/layout.tsx");
const privacy = read("src/app/privacy/page.tsx");
const analyticsConsent = read("src/components/AnalyticsConsent.tsx");
const policy = ["next.config.ts", "next.config.mjs", "vercel.json"]
  .filter((path) => existsSync(join(root, path)))
  .map(read)
  .join("\n");

test("optional advertising is absent and analytics is consent gated", () => {
  assert.doesNotMatch(layout, /googletagmanager|googlesyndication\.com\/pagead|clarity\.ms|Cookiebot/i);
  assert.doesNotMatch(policy, /unsafe-eval|googlesyndication|clarity\.ms|Cookiebot/i);
  assert.match(analyticsConsent, /analytics_storage:\s*'denied'/);
  assert.match(analyticsConsent, /storedChoice\s*!==\s*'granted'/);
  assert.match(analyticsConsent, /if \(nextChoice === 'granted'\)[\s\S]*loadGoogleAnalytics\(\)/);
  assert.match(analyticsConsent, /choice === 'granted'[\s\S]*window\.location\.reload\(\)/);
  assert.match(policy, /script-src[^"\n]*https:\/\/www\.googletagmanager\.com/);
  assert.match(policy, /connect-src[^"\n]*https:\/\/www\.google-analytics\.com/);
});

test("obsolete tracking cookie middleware is absent", () => {
  assert.equal(existsSync(join(root, "src/middleware.ts")), false);
  assert.equal(existsSync(join(root, "src/lib/gpc.ts")), false);
  assert.equal(existsSync(join(root, "src/app/api/indexnow/route.ts")), false);
});

test("public disclosures and publisher verification match production", () => {
  assert.match(privacy, /Google Analytics loads only after you\s+select Accept analytics/i);
  assert.match(privacy, /Advertising storage[\s\S]*remain disabled/i);
  assert.match(privacy, /do not send the destination URL/i);
  assert.match(read("public/ads.txt"), /pub-7171402107622932/);
});
