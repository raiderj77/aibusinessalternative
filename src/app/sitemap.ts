import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { getAllBlogPosts } from '@/lib/blog-markdown';

const baseUrl = 'https://aibusinessalternative.com';

const comparisons = [
  'chatgpt-vs-claude-ai',
  'jasper-ai-vs-copy-ai',
  'midjourney-vs-dall-e-3',
  'github-copilot-vs-cursor-ai',
  'runway-ml-vs-synthesia',
  'tidio-ai-vs-intercom-ai',
  'semrush-ai-vs-surfer-seo',
  'zapier-ai-vs-make-ai',
  'elevenlabs-vs-murf-ai',
  'perplexity-ai-vs-chatgpt',
];

const alternatives = ['chatgpt', 'midjourney', 'jasper-ai', 'github-copilot', 'grammarly-business', 'canva-ai'];

const bestPages = [
  'best-ai-tools-for-small-business',
  'best-ai-tools-for-content-creation',
  'best-ai-tools-for-solopreneurs',
  'best-free-ai-tools',
  'best-ai-tools-for-marketing',
  'best-ai-writing-tools',
  'best-ai-tools-for-productivity',
  'best-ai-image-generators',
];


export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ];

  const toolPages = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const comparisonPages = comparisons.map(slug => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const alternativePages = alternatives.map(slug => ({
    url: `${baseUrl}/alternatives/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const bestForPages = bestPages.map(slug => ({
    url: `${baseUrl}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...comparisonPages, ...alternativePages, ...bestForPages, ...blogPages];
}
