import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryPage, getAllIndustrySlugs } from '@/lib/forContent';
import { getToolBySlug } from '@/data/tools';
import PricingBadge from '@/components/PricingBadge';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';

export const revalidate = 86400;

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};

  const title = `Best AI Tools for ${page.name} in 2026 | AI Business Alternative`;
  const description = `The top AI tools for ${page.name.toLowerCase()} — independently reviewed and ranked. Compare features, pricing, and real use cases to build the right AI stack for your business.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/for/${slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
    },
    alternates: {
      canonical: `https://aibusinessalternative.com/for/${slug}`,
    },
  };
}

export default async function ForIndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();

  const tools = page.toolSlugs
    .map((rec) => {
      const tool = getToolBySlug(rec.slug);
      return tool ? { tool, why: rec.why } : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
      { '@type': 'ListItem', position: 2, name: 'For', item: 'https://aibusinessalternative.com/for' },
      { '@type': 'ListItem', position: 3, name: page.name, item: `https://aibusinessalternative.com/for/${slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best AI Tools for ${page.name} in 2026`,
    numberOfItems: tools.length,
    itemListElement: tools.map(({ tool }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://aibusinessalternative.com/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="bg-white">
        <div className="container-custom">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="py-3 border-b border-black/10">
            <ol className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-gray-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/for" className="hover:text-gray-600 transition-colors">Industries</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-600">{page.name}</li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="pt-8 pb-8 border-b border-black/10">
            <div className="badge badge-blue mb-4">
              AI tools for {page.name.toLowerCase()} · Updated April 2026
            </div>
            <h1 className="font-display text-[34px] leading-tight tracking-tight mb-3">
              The best AI tools for <em className="italic">{page.name.toLowerCase()}</em>
            </h1>
            <p className="text-[14px] text-gray-500 max-w-2xl">
              {page.tagline}
            </p>
          </section>

          {/* Intro */}
          <section className="py-7 border-b border-black/10">
            <div className="max-w-2xl space-y-4">
              {page.intro.split('\n\n').map((para, i) => (
                <p key={i} className="text-[14px] text-gray-600 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* Tool recommendations */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Recommended tools</h2>
            <div className="space-y-4">
              {tools.map(({ tool, why }, index) => (
                <div key={tool.slug} className="card p-5">
                  <div className="flex items-start gap-4">
                    {/* Logo + rank */}
                    <div className="shrink-0 flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[13px] font-semibold text-gray-500 overflow-hidden">
                        {(tool.logoPlaceholder?.slice(0, 2) || tool.name.slice(0, 2)).toUpperCase()}
                      </div>
                      <span className="text-[11px] font-medium text-gray-400">#{index + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link href={`/tools/${tool.slug}`} className="text-[15px] font-semibold text-gray-900 hover:text-[#2563EB] transition-colors">
                          {tool.name}
                        </Link>
                        <PricingBadge pricing={tool.pricing} price={tool.price} />
                      </div>
                      <p className="text-[13px] text-gray-400 mb-3">{tool.tagline}</p>
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-4">{why}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12px] font-semibold text-white transition-colors"
                          style={{ backgroundColor: '#2563EB' }}
                        >
                          Visit {tool.name} →
                        </a>
                        <Link href={`/tools/${tool.slug}`} className="text-[12px] text-gray-500 hover:text-gray-700 transition-colors">
                          Read review →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to build your AI stack */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">How to build your AI stack</h2>
            <div className="space-y-4">
              {page.steps.map((step, index) => (
                <div key={index} className="card p-5 flex gap-4">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 mt-0.5" style={{ backgroundColor: '#2563EB' }}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-gray-900 mb-1.5">{step.title}</div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-4">Frequently asked questions</h2>
            <FAQ items={page.faq} />
          </section>

          {/* Disclaimer */}
          <div className="py-6">
            <Disclaimer />
          </div>

        </div>
      </div>
    </>
  );
}
