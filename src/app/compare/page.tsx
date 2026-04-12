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
  { slug: 'chatgpt-vs-google-gemini-workspace', toolASlug: 'chatgpt', toolBSlug: 'google-gemini-workspace', category: 'AI Chatbots & Assistants' },
  { slug: 'claude-ai-vs-google-gemini-workspace', toolASlug: 'claude-ai', toolBSlug: 'google-gemini-workspace', category: 'AI Chatbots & Assistants' },
  { slug: 'notion-ai-vs-chatgpt', toolASlug: 'notion-ai', toolBSlug: 'chatgpt', category: 'AI Writing & Content' },
  { slug: 'jasper-ai-vs-copy-ai', toolASlug: 'jasper-ai', toolBSlug: 'copy-ai', category: 'AI Writing & Content' },
  { slug: 'jasper-ai-vs-writesonic', toolASlug: 'jasper-ai', toolBSlug: 'writesonic', category: 'AI Writing & Content' },
  { slug: 'midjourney-vs-dall-e-3', toolASlug: 'midjourney', toolBSlug: 'dall-e-3', category: 'AI Image Generation' },
  { slug: 'github-copilot-vs-cursor-ai', toolASlug: 'github-copilot', toolBSlug: 'cursor-ai', category: 'AI Coding & Development' },
  { slug: 'runway-ml-vs-synthesia', toolASlug: 'runway-ml', toolBSlug: 'synthesia', category: 'AI Video Creation' },
  { slug: 'runway-ml-vs-pika-labs', toolASlug: 'runway-ml', toolBSlug: 'pika-labs', category: 'AI Video Creation' },
  { slug: 'tidio-ai-vs-intercom-ai', toolASlug: 'tidio-ai', toolBSlug: 'intercom-ai', category: 'AI Customer Service' },
  { slug: 'semrush-ai-vs-surfer-seo', toolASlug: 'semrush-ai', toolBSlug: 'surfer-seo', category: 'AI Marketing & SEO' },
  { slug: 'semrush-ai-vs-ahrefs', toolASlug: 'semrush-ai', toolBSlug: 'ahrefs', category: 'AI Marketing & SEO' },
  { slug: 'zapier-ai-vs-make-ai', toolASlug: 'zapier-ai', toolBSlug: 'make-ai', category: 'AI Productivity & Automation' },
  { slug: 'elevenlabs-vs-murf-ai', toolASlug: 'elevenlabs', toolBSlug: 'murf-ai', category: 'AI Audio & Voice' },
  { slug: 'perplexity-ai-vs-chatgpt', toolASlug: 'perplexity-ai', toolBSlug: 'chatgpt', category: 'AI Research & Knowledge' },
  { slug: 'midjourney-vs-stable-diffusion', toolASlug: 'midjourney', toolBSlug: 'stable-diffusion', category: 'AI Image Generation' },
  { slug: 'zapier-ai-vs-n8n-ai', toolASlug: 'zapier-ai', toolBSlug: 'n8n-ai', category: 'AI Productivity & Automation' },
  { slug: 'copy-ai-vs-writesonic', toolASlug: 'copy-ai', toolBSlug: 'writesonic', category: 'AI Writing & Content' },
  { slug: 'cursor-ai-vs-claude-code', toolASlug: 'cursor-ai', toolBSlug: 'claude-code', category: 'AI Coding & Development' },
  { slug: 'perplexity-ai-vs-claude-ai', toolASlug: 'perplexity-ai', toolBSlug: 'claude-ai', category: 'AI Research & Knowledge' },
  { slug: 'notion-ai-vs-claude-ai', toolASlug: 'notion-ai', toolBSlug: 'claude-ai', category: 'AI Writing & Content' },
  { slug: 'elevenlabs-vs-descript', toolASlug: 'elevenlabs', toolBSlug: 'descript', category: 'AI Audio & Voice' },
  { slug: 'make-ai-vs-n8n-ai', toolASlug: 'make-ai', toolBSlug: 'n8n-ai', category: 'AI Productivity & Automation' },
  { slug: 'canva-ai-vs-adobe-express', toolASlug: 'canva-ai', toolBSlug: 'adobe-express', category: 'AI Design & Creative' },
  { slug: 'grammarly-business-vs-claude-ai', toolASlug: 'grammarly-business', toolBSlug: 'claude-ai', category: 'AI Writing & Content' },
  { slug: 'jasper-ai-vs-anyword', toolASlug: 'jasper-ai', toolBSlug: 'anyword', category: 'AI Writing & Content' },
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
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">
          <div className="mb-4">
            <span className="badge badge-blue">27 comparisons · Updated April 2026</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            Compare AI Tools
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            Side-by-side comparisons to help you choose the right tool
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="border-b border-black/10 bg-gray-50" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
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
                  className="card group flex flex-col p-5"
                >
                  {/* Category tag */}
                  <span className="badge badge-gray self-start mb-4">{pair.category}</span>

                  {/* Tool A vs Tool B */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Tool A */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl" aria-hidden="true">{toolA.icon}</span>
                      <span className="mt-2 text-sm font-semibold text-gray-900">{toolA.name}</span>
                      <span className="text-xs text-gray-500">{toolA.rating.toFixed(1)} rating</span>
                    </div>

                    {/* VS badge */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
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
                  <span className="mt-5 text-[13px] font-medium text-[#2563EB]">
                    View comparison →
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
