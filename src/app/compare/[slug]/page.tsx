import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolBySlug, type AITool } from '@/data/tools';
import { getComparisonContent } from '@/lib/comparisonContent';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
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
  'midjourney-vs-stable-diffusion',
  'zapier-ai-vs-n8n-ai',
  'copy-ai-vs-writesonic',
  'cursor-ai-vs-claude-code',
  'perplexity-ai-vs-claude-ai',
  'notion-ai-vs-claude-ai',
  'elevenlabs-vs-descript',
  'make-ai-vs-n8n-ai',
  'canva-ai-vs-adobe-express',
  'grammarly-business-vs-claude-ai',
  'jasper-ai-vs-anyword',
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

function getPricingTiers(pricing: string, price: string) {
  if (pricing === 'free') {
    return [{ name: 'Free', price: '$0 / mo', isFree: true }];
  }
  if (pricing === 'freemium') {
    return [
      { name: 'Free', price: '$0 / mo', isFree: true },
      ...(price ? [{ name: 'Pro', price, isFree: false }] : []),
    ];
  }
  if (pricing === 'free-trial') {
    return [
      { name: 'Free Trial', price: 'Limited', isFree: true },
      ...(price ? [{ name: 'Paid', price, isFree: false }] : []),
    ];
  }
  return [{ name: 'Paid', price: price || 'Contact for pricing', isFree: false }];
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) {
    return <div className="container-custom py-20 text-center">Comparison not found.</div>;
  }

  const toolA = getToolBySlug(parsed.toolASlug);
  const toolB = getToolBySlug(parsed.toolBSlug);
  if (!toolA || !toolB) {
    return <div className="container-custom py-20 text-center">One or both tools not found.</div>;
  }

  const content = getComparisonContent(slug);
  const allFeatures = Array.from(new Set([...toolA.features, ...toolB.features]));

  type RelatedComparison = { slug: string; toolA: AITool; toolB: AITool };
  const relatedComparisons: RelatedComparison[] = comparisonSlugs
    .filter((s) => s !== slug && (s.includes(parsed.toolASlug) || s.includes(parsed.toolBSlug)))
    .slice(0, 3)
    .flatMap((s) => {
      const p = parseSlug(s);
      if (!p) return [];
      const a = getToolBySlug(p.toolASlug);
      const b = getToolBySlug(p.toolBSlug);
      if (!a || !b) return [];
      return [{ slug: s, toolA: a, toolB: b }];
    });

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://aibusinessalternative.com/compare' },
      { '@type': 'ListItem', position: 3, name: `${toolA.name} vs ${toolB.name}`, item: `https://aibusinessalternative.com/compare/${slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <AnswerBlock
        what={`A side-by-side comparison of ${toolA.name} and ${toolB.name} covering features, pricing, and ideal use cases.`}
        who={`Business owners deciding between ${toolA.name} and ${toolB.name} for their AI workflow needs.`}
        bottomLine={`Read the full breakdown below to see which tool fits your requirements.`}
        lastUpdated="2026-03-25"
      />

      <div className="bg-white">
        <div className="container-custom">

          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="py-3 border-b border-black/10">
            <ol className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-gray-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/compare" className="hover:text-gray-600 transition-colors">Compare</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-600">{toolA.name} vs {toolB.name}</li>
            </ol>
          </nav>

          {/* 2. Hero */}
          <section className="pt-8 pb-8 border-b border-black/10">
            <div className="badge badge-blue mb-4">
              Side-by-side comparison · Updated April 2026
            </div>
            <h1 className="font-display text-[34px] leading-tight tracking-tight mb-3">
              {toolA.name} vs <em className="italic">{toolB.name}</em>
            </h1>
            <p className="text-[14px] text-gray-500 max-w-xl mb-6">
              A detailed side-by-side look at {toolA.name} and {toolB.name} — features, pricing,
              pros and cons, and which tool best fits your business workflow.
            </p>
          </section>

          {/* 3. Verdict card grid */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Our verdict</h2>
            <div className="grid grid-cols-[1fr_40px_1fr] items-start">

              {/* Tool A card */}
              <div className="card p-5 flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-black/[0.08] flex items-center justify-center text-xl shrink-0 mb-3">
                  {toolA.icon}
                </div>
                <div className="text-[15px] font-semibold leading-snug">{toolA.name}</div>
                <div className="text-[12px] text-gray-400 mt-0.5 leading-snug mb-3">{toolA.tagline}</div>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {content?.verdictA ?? `${toolA.name} is best for ${toolA.bestFor.toLowerCase()}.`}
                </p>
                <div className="border-t border-black/10 mt-4 pt-4 flex items-center justify-end gap-2 flex-wrap">
                  <PricingBadge pricing={toolA.pricing} price={toolA.price} />
                </div>
              </div>

              {/* VS divider */}
              <div className="flex items-start justify-center pt-8">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-gray-400">vs</span>
                </div>
              </div>

              {/* Tool B card */}
              <div className="card p-5 flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-black/[0.08] flex items-center justify-center text-xl shrink-0 mb-3">
                  {toolB.icon}
                </div>
                <div className="text-[15px] font-semibold leading-snug">{toolB.name}</div>
                <div className="text-[12px] text-gray-400 mt-0.5 leading-snug mb-3">{toolB.tagline}</div>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {content?.verdictB ?? `${toolB.name} is best for ${toolB.bestFor.toLowerCase()}.`}
                </p>
                <div className="border-t border-black/10 mt-4 pt-4 flex items-center justify-end gap-2 flex-wrap">
                  <PricingBadge pricing={toolB.pricing} price={toolB.price} />
                </div>
              </div>

            </div>
          </section>

          {/* 4. Feature comparison table */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 text-[12px] text-gray-500 font-medium">
                    <th className="text-left py-2.5 px-3 w-[40%] font-medium">Feature</th>
                    <th className="text-center py-2.5 px-3 w-[30%] font-medium bg-blue-50/30">{toolA.name}</th>
                    <th className="text-center py-2.5 px-3 w-[30%] font-medium">{toolB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => {
                    const aHas = toolA.features.includes(feature);
                    const bHas = toolB.features.includes(feature);
                    return (
                      <tr
                        key={feature}
                        className={i < allFeatures.length - 1 ? 'border-b border-black/[0.06]' : ''}
                      >
                        <td className="py-2.5 px-3 text-gray-700">{feature}</td>
                        <td className="py-2.5 px-3 text-center bg-blue-50/30">
                          {aHas
                            ? <span className="text-emerald-500 font-medium">✓</span>
                            : <span className="text-red-400">✗</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {bHas
                            ? <span className="text-emerald-500 font-medium">✓</span>
                            : <span className="text-red-400">✗</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Pricing */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Pricing</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {([toolA, toolB] as AITool[]).map((tool) => {
                const tiers = getPricingTiers(tool.pricing, tool.price);
                return (
                  <div key={tool.slug} className="card p-4">
                    <div className="text-[13px] font-semibold mb-3">{tool.name}</div>
                    <div className="space-y-2.5">
                      {tiers.map((tier) => (
                        <div key={tier.name} className="flex items-center justify-between gap-2">
                          <span className="text-[13px] text-gray-700 flex items-center gap-2">
                            {tier.name}
                            {tier.isFree && (
                              <span className="badge badge-green" style={{ fontSize: '10px', padding: '2px 7px' }}>
                                start here
                              </span>
                            )}
                          </span>
                          <span className="text-[13px] font-medium text-gray-900 shrink-0">{tier.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 6. Pros / Cons — 2×2 grid */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Pros &amp; cons</h2>
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="card p-4" style={{ borderColor: 'rgba(110,231,183,0.6)', backgroundColor: 'rgba(236,253,245,0.3)' }}>
                <div className="text-[12px] font-semibold text-gray-500 mb-3">{toolA.name} — Pros</div>
                <ul className="space-y-2">
                  {toolA.pros.map((pro) => (
                    <li key={pro} className="flex gap-2 text-[13px] text-gray-700">
                      <span className="text-emerald-500 shrink-0 mt-px">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-4" style={{ borderColor: 'rgba(252,165,165,0.6)', backgroundColor: 'rgba(254,242,242,0.3)' }}>
                <div className="text-[12px] font-semibold text-gray-500 mb-3">{toolA.name} — Cons</div>
                <ul className="space-y-2">
                  {toolA.cons.map((con) => (
                    <li key={con} className="flex gap-2 text-[13px] text-gray-700">
                      <span className="text-red-400 shrink-0 mt-px">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-4" style={{ borderColor: 'rgba(110,231,183,0.6)', backgroundColor: 'rgba(236,253,245,0.3)' }}>
                <div className="text-[12px] font-semibold text-gray-500 mb-3">{toolB.name} — Pros</div>
                <ul className="space-y-2">
                  {toolB.pros.map((pro) => (
                    <li key={pro} className="flex gap-2 text-[13px] text-gray-700">
                      <span className="text-emerald-500 shrink-0 mt-px">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-4" style={{ borderColor: 'rgba(252,165,165,0.6)', backgroundColor: 'rgba(254,242,242,0.3)' }}>
                <div className="text-[12px] font-semibold text-gray-500 mb-3">{toolB.name} — Cons</div>
                <ul className="space-y-2">
                  {toolB.cons.map((con) => (
                    <li key={con} className="flex gap-2 text-[13px] text-gray-700">
                      <span className="text-red-400 shrink-0 mt-px">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>

          {/* 7. Verdict box */}
          <section className="py-7 border-b border-black/10">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-[11px] font-semibold text-[#2563EB] tracking-wide uppercase mb-2">
                Our Verdict
              </div>
              <h2 className="font-display text-[22px] italic leading-snug mb-3">
                {content?.verdictA
                  ? `${toolA.name} vs ${toolB.name} — it comes down to your workflow`
                  : `Both tools serve different needs — it depends on your workflow`}
              </h2>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {content
                  ? content.verdictA
                  : `${toolA.name} is best for ${toolA.bestFor.toLowerCase()}, while ${toolB.name} excels at ${toolB.bestFor.toLowerCase()}. Consider your primary use case, budget, and team size when choosing between them.`}
              </p>
            </div>
          </section>

          {/* 8. FAQ */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Frequently asked questions</h2>
            <FAQ items={faqItems} />
          </section>

          {/* 9. Related comparisons */}
          {relatedComparisons.length > 0 && (
            <section className="py-7 border-b border-black/10">
              <h2 className="text-[16px] font-semibold mb-4">Related comparisons</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {relatedComparisons.map(({ slug: rSlug, toolA: ra, toolB: rb }) => (
                  <Link
                    key={rSlug}
                    href={`/compare/${rSlug}`}
                    className="card p-4 flex items-center gap-3 hover:border-black/20 transition-colors"
                  >
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xl">{ra.icon}</span>
                      <span className="text-[10px] text-gray-400">vs</span>
                      <span className="text-xl">{rb.icon}</span>
                    </div>
                    <span className="text-[12px] text-gray-700 font-medium leading-tight">
                      {ra.name} vs {rb.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="py-6">
            <Disclaimer />
          </div>

        </div>
      </div>
    </>
  );
}
