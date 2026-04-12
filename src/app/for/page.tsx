import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllIndustryPages } from '@/lib/forContent';

export const metadata: Metadata = {
  title: 'AI Tools by Industry & Role | AI Business Alternative',
  description:
    'Find the best AI tools for your specific industry or business role. Curated recommendations for freelancers, agencies, e-commerce, real estate, law firms, content creators, startups, and hospitality.',
  openGraph: {
    title: 'AI Tools by Industry & Role | AI Business Alternative',
    description:
      'Find the best AI tools for your specific industry or business role. Curated recommendations for freelancers, agencies, e-commerce, real estate, law firms, content creators, startups, and hospitality.',
    url: 'https://aibusinessalternative.com/for',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://aibusinessalternative.com/for' },
  ],
};

const industryDescriptions: Record<string, string> = {
  freelancers: 'Win more clients and protect your time with AI that handles the admin around your work.',
  'marketing-agencies': 'Produce more for more clients without proportionally growing headcount.',
  'ecommerce-businesses': 'Convert more visitors, serve customers faster, and scale content without a team.',
  'real-estate-agents': 'Write listings in minutes, follow up automatically, and close more deals.',
  'lawyers-and-law-firms': 'Research faster, draft more precisely, and reduce admin around billable work.',
  'content-creators': 'Script, design, edit, and distribute more content without burning out.',
  startups: 'Move at speed with an AI stack that punches above your headcount.',
  'restaurant-and-hospitality': 'Market smarter, handle guest inquiries automatically, and run tighter operations.',
};

export default function ForIndexPage() {
  const industries = getAllIndustryPages();

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
            <span className="badge badge-blue">8 industries · Updated April 2026</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            AI tools by industry
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            Curated AI recommendations for your specific role and industry — not generic lists
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="border-b border-black/10 bg-gray-50" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">Industries</li>
          </ol>
        </div>
      </nav>

      {/* Industry cards grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/for/${industry.slug}`}
                className="card group flex flex-col p-5"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 ${industry.iconBg}`}>
                  {industry.icon}
                </div>

                <h2 className="text-[15px] font-semibold text-gray-900 mb-1">
                  {industry.name}
                </h2>

                <p className="text-[13px] text-gray-500 leading-relaxed flex-1 mb-4">
                  {industryDescriptions[industry.slug] || industry.tagline}
                </p>

                <div className="flex items-center justify-between">
                  <span className="badge badge-gray">{industry.toolSlugs.length} tools</span>
                  <span className="text-[13px] font-medium text-[#2563EB]">
                    View recommendations →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
