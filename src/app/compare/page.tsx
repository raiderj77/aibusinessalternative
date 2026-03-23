import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolBySlug } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Compare AI Tools Side by Side | AI Business Alternative',
  description:
    'Side-by-side comparisons of the best AI tools for business. Compare features, pricing, pros, and cons to find the right AI tool for your needs.',
  openGraph: {
    title: 'Compare AI Tools Side by Side | AI Business Alternative',
    description:
      'Side-by-side comparisons of the best AI tools for business. Compare features, pricing, pros, and cons to find the right AI tool for your needs.',
    url: 'https://aibusinessalternative.com/compare',
  },
};

const comparisonPairs = [
  { slug: 'chatgpt-vs-claude-ai', toolASlug: 'chatgpt', toolBSlug: 'claude-ai', category: 'AI Chatbots & Assistants' },
  { slug: 'jasper-ai-vs-copy-ai', toolASlug: 'jasper-ai', toolBSlug: 'copy-ai', category: 'AI Writing & Content' },
  { slug: 'midjourney-vs-dall-e-3', toolASlug: 'midjourney', toolBSlug: 'dall-e-3', category: 'AI Image Generation' },
  { slug: 'github-copilot-vs-cursor-ai', toolASlug: 'github-copilot', toolBSlug: 'cursor-ai', category: 'AI Coding & Development' },
  { slug: 'runway-ml-vs-synthesia', toolASlug: 'runway-ml', toolBSlug: 'synthesia', category: 'AI Video Creation' },
  { slug: 'tidio-ai-vs-intercom-ai', toolASlug: 'tidio-ai', toolBSlug: 'intercom-ai', category: 'AI Customer Service' },
  { slug: 'semrush-ai-vs-surfer-seo', toolASlug: 'semrush-ai', toolBSlug: 'surfer-seo', category: 'AI Marketing & SEO' },
  { slug: 'zapier-ai-vs-make-ai', toolASlug: 'zapier-ai', toolBSlug: 'make-ai', category: 'AI Productivity & Automation' },
  { slug: 'elevenlabs-vs-murf-ai', toolASlug: 'elevenlabs', toolBSlug: 'murf-ai', category: 'AI Audio & Voice' },
  { slug: 'perplexity-ai-vs-chatgpt', toolASlug: 'perplexity-ai', toolBSlug: 'chatgpt', category: 'AI Research & Knowledge' },
];

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
      name: 'Compare',
      item: 'https://aibusinessalternative.com/compare',
    },
  ],
};

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Compare AI Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-indigo-100">
            Side-by-side comparisons to help you choose the right tool
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">Compare</li>
          </ol>
        </div>
      </nav>

      {/* Comparison Cards Grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisonPairs.map((pair) => {
              const toolA = getToolBySlug(pair.toolASlug);
              const toolB = getToolBySlug(pair.toolBSlug);

              if (!toolA || !toolB) return null;

              return (
                <Link
                  key={pair.slug}
                  href={`/compare/${pair.slug}`}
                  className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition hover:shadow-md hover:ring-indigo-200"
                >
                  {/* Category tag */}
                  <span className="mb-4 inline-flex self-start rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {pair.category}
                  </span>

                  {/* Tool A vs Tool B */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Tool A */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl" aria-hidden="true">{toolA.icon}</span>
                      <span className="mt-2 text-sm font-semibold text-gray-900">{toolA.name}</span>
                      <span className="text-xs text-gray-500">{toolA.rating.toFixed(1)} rating</span>
                    </div>

                    {/* VS badge */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                      VS
                    </div>

                    {/* Tool B */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl" aria-hidden="true">{toolB.icon}</span>
                      <span className="mt-2 text-sm font-semibold text-gray-900">{toolB.name}</span>
                      <span className="text-xs text-gray-500">{toolB.rating.toFixed(1)} rating</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <span className="mt-5 inline-flex items-center justify-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-800">
                    View Comparison
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
