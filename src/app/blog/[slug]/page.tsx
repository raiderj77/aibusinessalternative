import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedPosts } from '@/data/blog';

export const revalidate = 86400;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found | AI Business Alternative' };

  return {
    title: `${post.title} | AI Business Alternative`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | AI Business Alternative`,
      description: post.excerpt,
      url: `https://aibusinessalternative.com/blog/${post.slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 4);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aibusinessalternative.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aibusinessalternative.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://aibusinessalternative.com/blog/${post.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'AI Business Alternative',
      url: 'https://aibusinessalternative.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Business Alternative',
      url: 'https://aibusinessalternative.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aibusinessalternative.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aibusinessalternative.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-indigo-600 transition">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <article className="bg-white py-12 sm:py-16">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <header>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-700"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.publishedAt}>
                Published{' '}
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime}</span>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <time dateTime={post.updatedAt} className="text-gray-400">
                    Updated{' '}
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </>
              )}
            </div>
          </header>

          {/* Content */}
          <div
            className="blog-content mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* More Articles */}
      <section className="bg-gray-50 py-12 sm:py-16 border-t border-gray-200">
        <div className="container-custom">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            More Articles
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedPosts.map((related) => (
              <article
                key={related.slug}
                className="group flex flex-col rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition hover:shadow-md"
              >
                <div className="flex flex-wrap gap-1.5">
                  {related.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition leading-snug">
                  <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {related.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                  <time dateTime={related.publishedAt}>
                    {new Date(related.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>{related.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white py-8 border-t border-gray-200">
        <div className="container-custom max-w-3xl">
          <p className="text-xs leading-relaxed text-gray-400">
            <strong className="text-gray-500">Disclaimer:</strong> The information in
            this article is provided for general informational purposes only. While we
            strive to keep content accurate and up to date, pricing, features, and
            availability of the tools mentioned may change. AI Business Alternative may
            earn a commission through affiliate links at no additional cost to you. We
            only recommend tools we have evaluated and believe provide genuine value. Always
            do your own research before making purchasing decisions.
          </p>
        </div>
      </section>
    </>
  );
}
