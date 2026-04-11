import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolBySlug } from '@/data/tools';
import { getComparisonContent } from '@/lib/comparisonContent';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';
import AnswerBlock from '@/components/AnswerBlock';

export const revalidate = 86400;

const comparisonSlugs = [
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
  'chatgpt-vs-google-gemini-workspace',
  'claude-ai-vs-google-gemini-workspace',
  'jasper-ai-vs-writesonic',
  'notion-ai-vs-chatgpt',
  'semrush-ai-vs-ahrefs',
  'runway-ml-vs-pika-labs',
];

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}

function parseSlug(slug: string) {
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return null;
  return { toolASlug: parts[0], toolBSlug: parts[1] };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: 'Comparison Not Found' };

  const toolA = getToolBySlug(parsed.toolASlug);
  const toolB = getToolBySlug(parsed.toolBSlug);
  if (!toolA || !toolB) return { title: 'Comparison Not Found' };

  const title = `${toolA.name} vs ${toolB.name} (2026): Full Comparison | AI Business Alternative`;
  const description = `Detailed comparison of ${toolA.name} and ${toolB.name}. Compare features, pricing, pros and cons to decide which AI tool is better for your business.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/compare/${slug}`,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return <div className="container-custom py-20 text-center">Comparison not found.</div>;

  const toolA = getToolBySlug(parsed.toolASlug);
  const toolB = getToolBySlug(parsed.toolBSlug);
  if (!toolA || !toolB) return <div className="container-custom py-20 text-center">One or both tools not found.</div>;

  const content = getComparisonContent(slug);

  const faqItems = [
    {
      question: `Is ${toolA.name} or ${toolB.name} better?`,
      answer: `It depends on your needs. ${toolA.name} is best for ${toolA.bestFor.toLowerCase()}. ${toolB.name} is best for ${toolB.bestFor.toLowerCase()}. Review the detailed comparison above to determine which aligns better with your specific requirements.`,
    },
    {
      question: `Is ${toolA.name} cheaper than ${toolB.name}?`,
      answer: `${toolA.name} ${toolA.price ? `starts at ${toolA.price}` : 'offers a free plan'} with a ${toolA.pricing} pricing model. ${toolB.name} ${toolB.price ? `starts at ${toolB.price}` : 'offers a free plan'} with a ${toolB.pricing} pricing model. The best value depends on the features you need and how heavily you plan to use the tool.`,
    },
    {
      question: `Can I use ${toolA.name} and ${toolB.name} together?`,
      answer: `Yes, many businesses use both ${toolA.name} and ${toolB.name} together since they have complementary strengths. ${toolA.name} excels at ${toolA.bestFor.toLowerCase()}, while ${toolB.name} is stronger for ${toolB.bestFor.toLowerCase()}. Using both can give you the best of both worlds, though you should consider the combined cost.`,
    },
    {
      question: `Which tool is better for small business?`,
      answer: `For small businesses on a budget, consider which pricing model fits your needs. ${toolA.name} uses a ${toolA.pricing} model${toolA.price ? ` starting at ${toolA.price}` : ''}, while ${toolB.name} uses a ${toolB.pricing} model${toolB.price ? ` starting at ${toolB.price}` : ''}. Both tools offer value for small businesses, but the right choice depends on your specific use case and budget.`,
    },
    {
      question: `What are alternatives to both ${toolA.name} and ${toolB.name}?`,
      answer: `If neither ${toolA.name} nor ${toolB.name} fits your needs, explore other options in the same category on AI Business Alternative. We review dozens of tools across every AI category to help you find the perfect match for your business requirements and budget.`,
    },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${toolA.name} vs ${toolB.name}`,
        item: `https://aibusinessalternative.com/compare/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AnswerBlock
        what={`A side-by-side comparison of ${toolA.name} and ${toolB.name} covering features, pricing, ratings, and ideal use cases.`}
        who={`Business owners deciding between ${toolA.name} and ${toolB.name} for their AI workflow needs.`}
        bottomLine={`${toolA.name} is rated ${toolA.rating}/5 and ${toolB.name} is rated ${toolB.rating}/5. Read the full breakdown below to see which fits your requirements.`}
        lastUpdated="2026-03-25"
      />

      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/compare" className="hover:text-indigo-600">Compare</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">{toolA.name} vs {toolB.name}</li>
          </ol>
        </div>
      </nav>

      <article className="bg-white py-10 sm:py-14">
        <div className="container-custom">
          {/* H1 */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {toolA.name} vs {toolB.name}: Which AI Tool Is Better for Your Business?
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            A detailed, side-by-side comparison of {toolA.name} and {toolB.name} covering features, pricing, pros, cons, and which tool fits your specific needs.
          </p>

          {/* ===== At a Glance Box ===== */}
          <div className="mt-10 rounded-2xl bg-indigo-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-indigo-900">At a Glance</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Tool A summary */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{toolA.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{toolA.name}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Rating</span>
                    <RatingStars rating={toolA.rating} reviewCount={toolA.reviewCount} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pricing</span>
                    <PricingBadge pricing={toolA.pricing} price={toolA.price} />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 text-sm font-medium text-gray-700">Best For</span>
                    <span className="text-right text-sm text-gray-600">{toolA.bestFor}</span>
                  </div>
                </div>
              </div>

              {/* Tool B summary */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{toolB.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{toolB.name}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Rating</span>
                    <RatingStars rating={toolB.rating} reviewCount={toolB.reviewCount} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pricing</span>
                    <PricingBadge pricing={toolB.pricing} price={toolB.price} />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 text-sm font-medium text-gray-700">Best For</span>
                    <span className="text-right text-sm text-gray-600">{toolB.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Side-by-Side Comparison Table ===== */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Side-by-Side Comparison</h2>
            <div className="mt-6 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-900/5 sm:p-4">
              <ComparisonTable toolA={toolA} toolB={toolB} />
            </div>

            {/* Pros Comparison */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{toolA.name} Pros</h3>
                <ul className="mt-3 space-y-2">
                  {toolA.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 text-green-600" aria-hidden="true">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{toolB.name} Pros</h3>
                <ul className="mt-3 space-y-2">
                  {toolB.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 text-green-600" aria-hidden="true">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cons Comparison */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{toolA.name} Cons</h3>
                <ul className="mt-3 space-y-2">
                  {toolA.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 text-red-500" aria-hidden="true">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{toolB.name} Cons</h3>
                <ul className="mt-3 space-y-2">
                  {toolB.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 text-red-500" aria-hidden="true">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ===== Detailed Comparison Sections ===== */}
          {content && (
            <>
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Pricing Comparison</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">{content.pricingComparison}</p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">Features Comparison</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">{content.featuresComparison}</p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">Who Should Choose {toolA.name}?</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">{content.verdictA}</p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">Who Should Choose {toolB.name}?</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">{content.verdictB}</p>
              </section>
            </>
          )}

          {/* ===== Verdict ===== */}
          <section className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Verdict</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              <strong>{toolA.name}</strong> is better for{' '}
              <span className="text-indigo-700">{toolA.bestFor.toLowerCase()}</span>, while{' '}
              <strong>{toolB.name}</strong> is better for{' '}
              <span className="text-violet-700">{toolB.bestFor.toLowerCase()}</span>.
              Both are excellent tools in their category — the right choice depends on your specific
              business needs, budget, and workflow priorities.
            </p>
          </section>

          {/* ===== CTA Buttons ===== */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={toolA.affiliateUrl || toolA.websiteUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
            >
              Visit {toolA.name}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a
              href={toolB.affiliateUrl || toolB.websiteUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center rounded-lg border-2 border-violet-600 bg-white px-8 py-3.5 text-base font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50 hover:shadow-md"
            >
              Visit {toolB.name}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          {/* ===== FAQ Section ===== */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-6">
              <FAQ items={faqItems} />
            </div>
          </section>

          {/* ===== Disclaimer ===== */}
          <div className="mt-12">
            <Disclaimer />
          </div>
        </div>
      </article>
    </>
  );
}
