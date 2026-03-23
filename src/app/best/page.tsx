import type { Metadata } from 'next';
import Link from 'next/link';
import { bestPages } from '@/lib/bestContent';

export const metadata: Metadata = {
  title: 'Best AI Tools — Curated Picks by Category | AI Business Alternative',
  description:
    'Explore our curated lists of the best AI tools for small business, content creation, marketing, writing, productivity, and more. Updated for 2026.',
  openGraph: {
    title: 'Best AI Tools — Curated Picks by Category | AI Business Alternative',
    description:
      'Explore our curated lists of the best AI tools for small business, content creation, marketing, writing, productivity, and more.',
    url: 'https://aibusinessalternative.com/best',
    siteName: 'AI Business Alternative',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aibusinessalternative.com/best',
  },
};

const categoryIcons: Record<string, string> = {
  'best-ai-tools-for-small-business': '🏢',
  'best-ai-tools-for-content-creation': '✏️',
  'best-ai-tools-for-solopreneurs': '🚀',
  'best-free-ai-tools': '🆓',
  'best-ai-tools-for-marketing': '📈',
  'best-ai-writing-tools': '✍️',
  'best-ai-tools-for-productivity': '⚡',
  'best-ai-image-generators': '🎨',
};

export default function BestIndexPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-14 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Best AI Tools — Curated Picks for 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Our editorial team tested hundreds of AI tools and narrowed them down
            to the best picks for every use case.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestPages.map((page) => (
              <Link
                key={page.slug}
                href={`/best/${page.slug}`}
                className="group flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-900/5 transition hover:shadow-lg hover:ring-indigo-200"
              >
                <span
                  className="text-3xl"
                  aria-hidden="true"
                >
                  {categoryIcons[page.slug] || '🤖'}
                </span>
                <h2 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                  {page.title} in 2026
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {page.metaDescription}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600">
                  View picks
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
