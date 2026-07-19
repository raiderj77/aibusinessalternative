import type { MetadataRoute } from 'next';

const baseUrl = 'https://aibusinessalternative.com';
const reviewedAt = new Date('2026-07-19T00:00:00Z');

const INDEXABLE_PATHS = [
  '',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/vs/buffer-vs-fiverr-social-media-manager',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path, index) => ({
    url: `${baseUrl}${path}`,
    lastModified: reviewedAt,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.5,
  }));
}
