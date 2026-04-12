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
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">
          <div className="mb-4">
            <span className="badge badge-blue">8 curated lists · Updated April 2026</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            Best AI Tools — Curated Picks for 2026
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            Our editorial team tested hundreds of AI tools and narrowed them down to the best picks for every use case.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-custom">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bestPages.map((page) => (
              <Link
                key={page.slug}
                href={`/best/${page.slug}`}
                className="card group flex flex-col p-5"
              >
                <span className="text-3xl" aria-hidden="true">
                  {categoryIcons[page.slug] || '🤖'}
                </span>
                <h2 className="mt-3 text-[15px] font-semibold text-gray-900">
                  {page.title} in 2026
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {page.metaDescription}
                </p>
                <span className="mt-4 text-[13px] font-medium text-[#2563EB]">
                  View picks →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
