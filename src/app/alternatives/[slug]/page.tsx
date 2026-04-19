import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools, getToolBySlug, type AITool } from '@/data/tools';
import { getAlternativeContent } from '@/lib/alternativesContent';
import PricingBadge from '@/components/PricingBadge';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AnswerBlock from '@/components/AnswerBlock';

export const revalidate = 86400;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = `Best Alternatives to ${tool.name} in 2026 | AI Business Alternative`;
  const description = `Compare the best alternatives to ${tool.name} for your business. Side-by-side pricing, features, and ratings to help you find the right AI tool.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/alternatives/${slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://aibusinessalternative.com/alternatives/${slug}` },
  };
}

function getAlternativeTools(subjectSlug: string) {
  const subject = getToolBySlug(subjectSlug);
  if (!subject) return [];

  const altSlugs = subject.alternatives ?? [];
  const altTools = altSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is AITool => t !== undefined && t.slug !== subjectSlug);

  if (altTools.length < 6) {
    const subjectCategories = subject.categories;
    const existingSlugs = new Set([subjectSlug, ...altTools.map((t) => t.slug)]);
    for (const tool of tools) {
      if (altTools.length >= 8) break;
      if (existingSlugs.has(tool.slug)) continue;
      if (tool.categories.some((c) => subjectCategories.includes(c))) {
        altTools.push(tool);
        existingSlugs.add(tool.slug);
      }
    }
  }

  return altTools.slice(0, 8);
}

function generateFAQItems(
  toolName: string,
  alternatives: { name: string; pricing: string; price?: string }[],
  reasons?: string[],
) {
  const cheapest = [...alternatives].sort((a, b) => {
    const order = { free: 0, freemium: 1, 'free-trial': 2, paid: 3 };
    return (order[a.pricing as keyof typeof order] ?? 3) - (order[b.pricing as keyof typeof order] ?? 3);
  })[0];

  const freeAlts = alternatives.filter((a) => a.pricing === 'free' || a.pricing === 'freemium');
  const freeAltName = freeAlts.length > 0 ? freeAlts[0].name : alternatives[0]?.name ?? 'several tools';
  const topAlt = alternatives[0]?.name ?? 'other tools';

  const whySwitchAnswer =
    reasons && reasons.length > 0
      ? `Users look for ${toolName} alternatives for several reasons: ${reasons.map((r) => r.replace(/\.$/, '')).join('; ')}. Review the alternatives above to find the tool that best addresses your specific pain point.`
      : `Common reasons businesses switch from ${toolName} include pricing concerns as teams scale, the need for features that ${toolName} does not prioritize, better integration with existing tools and workflows, or a desire for more specialized capabilities. Some users also switch to reduce vendor lock-in or to find a tool that better matches their specific industry or use case. Review the alternatives above to see which gaps each tool addresses.`;

  return [
    {
      question: `What is the best free alternative to ${toolName}?`,
      answer: `${freeAltName} is one of the best free alternatives to ${toolName}. It offers a generous free tier that covers core functionality for individuals and small teams. ${freeAlts.length > 1 ? `Other free options include ${freeAlts.slice(1, 3).map((a) => a.name).join(' and ')}.` : ''} Keep in mind that free tiers often have usage limits, so evaluate whether the free plan covers your typical workload before committing.`,
    },
    {
      question: `Is ${topAlt} better than ${toolName}?`,
      answer: `Whether ${topAlt} is better than ${toolName} depends on your specific needs. ${topAlt} may excel in certain areas like pricing, specific features, or integrations, while ${toolName} may be stronger in others. We recommend trying both tools with your actual workflow before deciding. The comparison table above highlights the key differences in pricing, ratings, and core strengths to help you make an informed choice.`,
    },
    {
      question: `Why do users look for ${toolName} alternatives?`,
      answer: whySwitchAnswer,
    },
    {
      question: `What is the cheapest alternative to ${toolName}?`,
      answer: `${cheapest?.name ?? 'Several alternatives'} offers the most affordable pricing among ${toolName} alternatives${cheapest?.price ? `, starting at ${cheapest.price}` : ''}. However, the cheapest option is not always the best value. Consider what features you actually need, how many team members will use the tool, and whether a slightly higher price delivers significantly better results for your business.`,
    },
    {
      question: `Can I use ${toolName} alternatives for business?`,
      answer: `Yes, all the alternatives listed above are suitable for business use. Many offer dedicated business or enterprise plans with features like team collaboration, admin controls, SSO, and priority support. When evaluating alternatives for your business, pay attention to data privacy policies, compliance certifications, and whether the tool offers the integrations your team relies on daily.`,
    },
  ];
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const content = getAlternativeContent(slug)!;
  const alternativeTools = getAlternativeTools(slug);
  const faqItems = generateFAQItems(
    tool.name,
    alternativeTools.map((t) => ({ name: t.name, pricing: t.pricing, price: t.price })),
    content.reasons,
  );

  const howToChoose = [
    {
      title: 'Clarify your primary use case',
      body: `${tool.name} is best for ${tool.bestFor.toLowerCase()}. Identify whether an alternative covers your specific workflow before switching.`,
    },
    {
      title: 'Compare pricing models',
      body: `${tool.name} uses a ${tool.pricing} model${tool.price ? ` starting at ${tool.price}` : ''}. Check if an alternative's pricing scales better as your usage grows.`,
    },
    {
      title: 'Test with your actual workflow',
      body: 'Sign up for free tiers or trials before committing. The best tool is the one that handles your most common daily tasks smoothly.',
    },
    {
      title: 'Check team and integration needs',
      body: 'If you have a team, verify collaboration features and admin controls. Also confirm the tool integrates with your existing software stack.',
    },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
      { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://aibusinessalternative.com/alternatives' },
      { '@type': 'ListItem', position: 3, name: `Alternatives to ${tool.name}`, item: `https://aibusinessalternative.com/alternatives/${slug}` },
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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Alternatives to ${tool.name}`,
    numberOfItems: alternativeTools.length,
    itemListElement: alternativeTools.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: alt.name,
      url: `https://aibusinessalternative.com/tools/${alt.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <AnswerBlock
        what={`A ranked list of the best alternatives to ${tool.name} in 2026, with feature comparisons, pricing breakdowns, and user ratings.`}
        who={`Teams and businesses looking to switch from ${tool.name} or compare it against competing AI tools.`}
        bottomLine={`${alternativeTools.length} alternatives reviewed. The top-rated option is ${alternativeTools[0]?.name ?? 'listed below'} — see the full comparison to find your best match.`}
        lastUpdated="2026-03-25"
      />

      <div className="bg-white">
        <div className="container-custom">

          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="py-3 border-b border-black/10">
            <ol className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-gray-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/alternatives" className="hover:text-gray-600 transition-colors">Alternatives</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-600">Alternatives to {tool.name}</li>
            </ol>
          </nav>

          {/* 2. Hero — 2-col on desktop */}
          <section className="py-8 border-b border-black/10">
            <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">

              {/* Left: content */}
              <div>
                <div className="badge badge-blue mb-4">
                  {alternativeTools.length} alternatives · Updated April 2026
                </div>
                <h1 className="font-display text-[34px] leading-tight tracking-tight mb-3">
                  Best{' '}
                  <em className="italic" style={{ color: '#2563EB' }}>{tool.name}</em>
                  {' '}alternatives
                </h1>
                <p className="text-[14px] text-gray-500 mb-5 max-w-lg leading-relaxed">
                  {content.intro}
                </p>
                <ul className="space-y-3">
                  {content.reasons.map((reason, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[13px] text-gray-600 leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: current tool card (hidden on mobile) */}
              <div className="hidden md:block">
                <div className="card p-4" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-white border border-black/[0.08] flex items-center justify-center text-xl shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold">{tool.name}</div>
                      <div className="mt-1">
                        <PricingBadge pricing={tool.pricing} price={tool.price} />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2.5 text-center border border-black/[0.06]">
                      <div className="text-[15px] font-semibold text-gray-900">{tool.features.length}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">features</div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 text-center border border-black/[0.06]">
                      <div className="text-[11px] font-semibold text-gray-900 leading-tight">{tool.price || 'Free'}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">starting</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 3. Alternatives list */}
          <section className="py-7 border-b border-black/10">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-[16px] font-semibold">Best alternatives to {tool.name}</h2>
              <span className="badge badge-gray">{alternativeTools.length} tools</span>
            </div>

            <div className="space-y-3">
              {alternativeTools.map((alt, index) => (
                <div key={alt.slug} className="card p-4">
                  <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">

                    {/* Logo */}
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-black/[0.08] flex items-center justify-center text-lg shrink-0 mt-0.5">
                      {alt.icon}
                    </div>

                    {/* Main */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[14px] font-semibold text-gray-900">{alt.name}</span>
                        {index === 0 && (
                          <span className="badge badge-blue" style={{ fontSize: '10px', padding: '2px 7px' }}>
                            Top pick
                          </span>
                        )}
                        {(alt.pricing === 'free' || alt.pricing === 'freemium') && (
                          <span className="badge badge-green" style={{ fontSize: '10px', padding: '2px 7px' }}>
                            Free tier
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-gray-500 mb-2 leading-snug">{alt.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {alt.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-gray-500 bg-gray-100 rounded-full px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA col */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <PricingBadge pricing={alt.pricing} price={alt.price} />
                      <Link
                        href={`/tools/${alt.slug}`}
                        className={
                          index === 0
                            ? 'text-[12px] font-medium px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-90'
                            : 'text-[12px] font-medium px-3 py-1.5 rounded-md text-gray-600 bg-white border border-black/15 hover:border-black/25 transition-colors'
                        }
                        style={index === 0 ? { backgroundColor: '#2563EB' } : undefined}
                      >
                        Visit site →
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. How to choose */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">How to choose the right alternative</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {howToChoose.map((item, i) => (
                <div key={i} className="card p-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 text-[11px] font-bold text-[#2563EB]"
                    style={{ backgroundColor: 'rgba(37,99,235,0.08)' }}
                  >
                    {i + 1}
                  </div>
                  <div className="text-[13px] font-semibold mb-1">{item.title}</div>
                  <div className="text-[12px] text-gray-500 leading-relaxed">{item.body}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">
              Frequently asked questions about {tool.name} alternatives
            </h2>
            <FAQ items={faqItems} />
          </section>

          <div className="py-6">
            <Disclaimer />
          </div>

        </div>
      </div>
    </>
  );
}
