import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'AI Business Blog — Tips, Reviews & Guides | AI Business Alternative',
  description:
    'Practical tips, in-depth reviews, and actionable guides to help small business owners and solopreneurs get the most from AI tools.',
  openGraph: {
    title: 'AI Business Blog — Tips, Reviews & Guides | AI Business Alternative',
    description:
      'Practical tips, in-depth reviews, and actionable guides to help small business owners and solopreneurs get the most from AI tools.',
    url: 'https://aibusinessalternative.com/blog',
    siteName: 'AI Business Alternative',
    type: 'website',
  },
};

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
  ],
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            AI Business Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Tips, reviews, and guides to help you make the most of AI tools
          </p>
        </div>
      </section>

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
            <li className="font-medium text-gray-900">Blog</li>
          </ol>
        </div>
      </nav>

      {/* Blog Grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-900/5 transition hover:shadow-lg"
              >
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
                <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition sm:text-2xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  Read More
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
