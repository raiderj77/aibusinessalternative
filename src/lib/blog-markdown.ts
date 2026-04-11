import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  description: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

export interface BlogPostWithContent extends BlogPost {
  htmlContent: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return raw.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

function getExcerpt(content: string, description: string): string {
  if (description) return description;
  const firstPara =
    content.split('\n').find((line) => line.trim() && !line.trim().startsWith('#')) || '';
  return firstPara.replace(/[*_`[\]]/g, '').slice(0, 200);
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  const seen = new Set<string>();
  const posts: BlogPost[] = [];

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);

    const slug = (data.slug as string) || slugFromFilename(filename);
    if (seen.has(slug)) continue;
    seen.add(slug);

    const date = (data.date as string) || '';
    const updatedAt = (data.updatedAt as string) || date;

    posts.push({
      slug,
      title: (data.title as string) || '',
      date,
      publishedAt: date,
      updatedAt,
      description: (data.description as string) || '',
      excerpt: getExcerpt(content, (data.description as string) || ''),
      tags: parseTags(data.tags ?? data.keywords),
      readTime: estimateReadTime(content),
    });
  }

  return posts
    .filter((p) => p.title)
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  let foundFile: string | undefined;
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data } = matter(raw);
    const fileSlug = (data.slug as string) || slugFromFilename(filename);
    if (fileSlug === slug) {
      foundFile = filename;
      break;
    }
  }

  if (!foundFile) return null;

  const raw = fs.readFileSync(path.join(BLOG_DIR, foundFile), 'utf-8');
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  const date = (data.date as string) || '';
  const updatedAt = (data.updatedAt as string) || date;

  return {
    slug,
    title: (data.title as string) || '',
    date,
    publishedAt: date,
    updatedAt,
    description: (data.description as string) || '',
    excerpt: getExcerpt(content, (data.description as string) || ''),
    tags: parseTags(data.tags ?? data.keywords),
    readTime: estimateReadTime(content),
    htmlContent: processed.toString(),
  };
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, count = 4): BlogPost[] {
  return getAllBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, count);
}
