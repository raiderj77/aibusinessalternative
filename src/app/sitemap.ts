import type { MetadataRoute } from 'next';

const baseUrl = 'https://aibusinessalternative.com';
const reviewedAt = new Date('2026-07-15T00:00:00Z');

const INDEXABLE_PATHS = ['', '/about', '/contact', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path, index) => ({
    url: `${baseUrl}${path}`,
    lastModified: reviewedAt,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.5,
  }));
}
