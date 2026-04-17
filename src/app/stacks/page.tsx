import type { Metadata } from 'next';
import Link from 'next/link';
import { stacks } from '@/lib/stacks';

export const metadata: Metadata = {
  title: 'AI Tool Stacks 2026 — Curated Combinations That Work | AI Business Alternative',
  description: 'Discover the best AI tool combinations for your business type. Real pricing, real tools, no fluff.',
  keywords: 'AI tool stacks, business tools 2026, AI stack for businesses, no-code tools',
  alternates: {
    canonical: 'https://aibusinessalternative.com/stacks',
  },
  openGraph: {
    title: 'AI Tool Stacks for Every Business Type',
    description: 'Curated AI tool combinations with real pricing and setup guides.',
    url: 'https://aibusinessalternative.com/stacks',
    type: 'website',
  },
};

export default function StacksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI Tool Stacks for Every Business Type',
            description: 'Curated AI tool combinations with real pricing, real tools, and no fluff.',
            url: 'https://aibusinessalternative.com/stacks',
            mainEntity: stacks.map(stack => ({
              '@type': 'CreativeWork',
              name: stack.name,
              description: stack.description,
              url: `https://aibusinessalternative.com/stacks/${stack.slug}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'AI Tool Stacks',
                item: 'https://aibusinessalternative.com/stacks',
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              AI Tool Stacks for Every Business Type
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover proven combinations of AI tools that work together. Real pricing, real tools, zero fluff. Each stack is tested and optimized for cost efficiency and ease of integration.
            </p>
          </div>

          {/* Grid of Stacks */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stacks.map((stack) => (
              <Link
                key={stack.id}
                href={`/stacks/${stack.slug}`}
                className="group relative bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  {stack.name}
                </h2>
                <p className="text-slate-600 text-sm mb-4">{stack.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Estimated monthly cost</p>
                    <p className="text-lg font-bold text-slate-900">
                      ${stack.estimatedMonthlyCost.low} — ${stack.estimatedMonthlyCost.high}
                    </p>
                  </div>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-20 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Can&apos;t find a stack that fits?
            </h2>
            <p className="text-slate-600 mb-4">
              Each stack is customizable. Click into any stack to see which tools you can swap for alternatives, or{' '}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                contact us
              </Link>
              {' '}for personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
