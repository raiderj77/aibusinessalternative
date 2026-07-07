import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AnswerBlock from '@/components/AnswerBlock';
import DecisionHelper from '@/components/DecisionHelper';

export const revalidate = 86400;

const LAST_UPDATED = '2026-07-04';

// NOTE: affiliateUrl fields point to each company's real official site, not a
// tracked affiliate link, until the affiliate program applications are approved
// (QuickBooks Online via PartnerStack, 1-800Accountant via Awin). Swap in the
// real tracked links once approved. Do not fabricate a link in the meantime.
const quickbooks = {
  name: 'QuickBooks Online',
  tagline: 'AI-assisted bookkeeping software you run yourself.',
  priceRange: '$20–$275/mo',
  pricingTiers: [
    { name: 'Solopreneur', price: '$20/mo' },
    { name: 'Simple Start', price: '$38/mo' },
    { name: 'Essentials', price: '$75/mo' },
    { name: 'Plus', price: '$115/mo' },
    { name: 'Advanced', price: '$275/mo' },
  ],
  whoRunsIt: 'You (or your own bookkeeper/accountant, using the software)',
  timeInvestment: 'A few hours a month, categorizing transactions and reviewing reports',
  pros: [
    'Full control over your books, in real time, anytime',
    'AI features auto-categorize transactions and flag anomalies',
    'Cheapest entry point of the two, especially for solo/simple businesses',
    'Huge ecosystem, connects to nearly every bank, payroll, and payment tool',
  ],
  cons: [
    'You (or someone you hire) still has to do the actual bookkeeping work',
    'AI categorization needs regular human review, it is not fully hands-off',
    'No built-in tax filing or CFO-level advice at the base tiers',
  ],
  websiteUrl: 'https://quickbooks.intuit.com/',
};

const accountant = {
  name: '1-800Accountant',
  tagline: 'A real, human accounting team that handles your books for you.',
  priceRange: '$209–$469/mo',
  pricingTiers: [
    { name: 'Tax Advisory', price: '$209/mo' },
    { name: 'Starter (most popular)', price: '$299/mo' },
    { name: 'Business Complete', price: '$469/mo' },
  ],
  whoRunsIt: 'A dedicated human accountant/bookkeeper assigned to your business',
  timeInvestment: 'Close to none, you upload documents and answer occasional questions',
  pros: [
    'Real accountants do the bookkeeping and tax work, not just software',
    'Includes tax filing and advisory, not just categorization',
    'Good fit if you have zero time or interest in doing books yourself',
  ],
  cons: [
    'Meaningfully more expensive than DIY software at every tier',
    'Less real-time visibility than logging into your own dashboard',
    'Annual billing required to get the listed rates',
  ],
  websiteUrl: 'https://1800accountant.com/',
};

const faqItems = [
  {
    question: 'Is QuickBooks Online actually "AI," or just accounting software?',
    answer:
      "It's cloud accounting software with real AI features layered in, automatic transaction categorization, receipt scanning, and an AI assistant for reports. But it's not a replacement for a bookkeeper if your books are complex; it's a tool you (or someone you hire) still operates.",
  },
  {
    question: 'Is 1-800Accountant cheaper than QuickBooks Online?',
    answer:
      'No. 1-800Accountant starts at $209/mo versus $20/mo for QuickBooks Online\'s cheapest tier. You\'re paying for a human team to do the work, not just software to help you do it yourself.',
  },
  {
    question: 'Can I use both?',
    answer:
      'Yes, and it\'s common. Many 1-800Accountant clients still use QuickBooks Online as the underlying system of record, with 1-800Accountant\'s team doing the bookkeeping and tax work inside it.',
  },
  {
    question: 'Which one is better for a brand-new small business?',
    answer:
      "If you're comfortable with a few hours of admin work a month and want to keep costs low while you get started, QuickBooks Online alone is usually enough. If you'd rather never think about bookkeeping and have the budget for it, 1-800Accountant removes that work entirely.",
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
    { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://aibusinessalternative.com/vs' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'QuickBooks Online vs 1-800Accountant',
      item: 'https://aibusinessalternative.com/vs/quickbooks-online-vs-1800accountant',
    },
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

export const metadata: Metadata = {
  title: 'QuickBooks Online vs. 1-800Accountant (2026): AI Software or a Human Bookkeeping Team? | AI Business Alternative',
  description:
    'QuickBooks Online is AI-assisted bookkeeping software you run yourself. 1-800Accountant is a real human accounting team that runs it for you. Real 2026 pricing, an interactive decision helper, and an honest breakdown of which fits your business.',
  alternates: {
    canonical: 'https://aibusinessalternative.com/vs/quickbooks-online-vs-1800accountant',
  },
  openGraph: {
    type: 'article',
    title: 'QuickBooks Online vs. 1-800Accountant: AI Software or a Human Bookkeeping Team?',
    description:
      'Real 2026 pricing and an honest breakdown of which fits your business: do your own books with AI-assisted software, or hand them to a real accounting team.',
    url: 'https://aibusinessalternative.com/vs/quickbooks-online-vs-1800accountant',
    siteName: 'AI Business Alternative',
  },
};

export default function QuickBooksVs1800AccountantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="py-3 border-b border-black/10">
            <ol className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-gray-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/vs" className="hover:text-gray-600 transition-colors">Comparisons</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-600">QuickBooks Online vs 1-800Accountant</li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="pt-8 pb-8 border-b border-black/10">
            <div className="badge badge-blue mb-4">AI tool vs. human alternative · Bookkeeping · Updated July 2026</div>
            <h1 className="font-display text-[30px] sm:text-[36px] leading-tight tracking-tight mb-3">
              QuickBooks Online or 1-800Accountant: <em className="italic">which one should do your books?</em>
            </h1>
            <p className="text-[14px] text-gray-500 max-w-2xl">
              One is AI-assisted software you run yourself. The other is a real human accounting team
              that runs it for you. Neither is better on its own, they solve different problems at very
              different prices. Here&apos;s the honest breakdown.
            </p>
          </section>

          <section className="py-7 border-b border-black/10">
            <AnswerBlock
              what="QuickBooks Online is cloud bookkeeping software with AI-assisted categorization. 1-800Accountant is a human-staffed accounting service that does your bookkeeping and taxes for you."
              who="Solo founders and small businesses deciding whether to do their own books or pay a team to take it off their plate."
              bottomLine="Tight budget and don't mind a few hours a month: QuickBooks Online. Want it handled entirely and can afford it: 1-800Accountant."
              lastUpdated={LAST_UPDATED}
            />
          </section>

          {/* Interactive decision helper */}
          <section className="py-7 border-b border-black/10">
            <DecisionHelper />
          </section>

          {/* Side-by-side cards */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Side by side</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[quickbooks, accountant].map((p) => (
                <div key={p.name} className="card p-5 flex flex-col">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-[13px] text-gray-500 mb-4">{p.tagline}</p>

                  <div className="mb-4">
                    <span className="badge badge-gray">{p.priceRange}</span>
                  </div>

                  <dl className="space-y-2 mb-4 text-[13px]">
                    <div>
                      <dt className="text-gray-400">Who does the work</dt>
                      <dd className="text-gray-700">{p.whoRunsIt}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-400">Your time investment</dt>
                      <dd className="text-gray-700">{p.timeInvestment}</dd>
                    </div>
                  </dl>

                  <div className="mb-4">
                    <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Pros</span>
                    <ul className="space-y-1">
                      {p.pros.map((pro) => (
                        <li key={pro} className="text-[13px] text-gray-700 flex gap-2">
                          <span className="text-[#059669] shrink-0">+</span>{pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-5">
                    <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Cons</span>
                    <ul className="space-y-1">
                      {p.cons.map((con) => (
                        <li key={con} className="text-[13px] text-gray-700 flex gap-2">
                          <span className="text-[#EF4444] shrink-0">−</span>{con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="nofollow noopener"
                      className="inline-flex justify-center items-center rounded-lg bg-[#2563EB] text-white text-[13px] font-medium px-4 py-2.5 hover:bg-[#1d4ed8] transition-colors"
                    >
                      Visit {p.name}
                    </a>
                    <p className="text-[11px] text-gray-400 mt-2">
                      Affiliate application pending
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing detail table */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Pricing in detail</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">QuickBooks Online</th>
                    <th className="text-left py-2 font-medium text-gray-500">1-800Accountant</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(quickbooks.pricingTiers.length, accountant.pricingTiers.length) }).map((_, i) => (
                    <tr key={i} className="border-b border-black/5">
                      <td className="py-2 pr-4 text-gray-700">
                        {quickbooks.pricingTiers[i] ? `${quickbooks.pricingTiers[i].name}: ${quickbooks.pricingTiers[i].price}` : ''}
                      </td>
                      <td className="py-2 text-gray-700">
                        {accountant.pricingTiers[i] ? `${accountant.pricingTiers[i].name}: ${accountant.pricingTiers[i].price}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-gray-400 mt-3">
              1-800Accountant rates shown are annual billing. Both companies offer promotional rates and trials that change over time, so confirm current pricing on their sites before buying.
            </p>
          </section>

          {/* FAQ */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-2">Frequently asked questions</h2>
            <FAQ items={faqItems} />
          </section>

          {/* Disclaimer */}
          <section className="py-7">
            <Disclaimer />
            <p className="text-[12px] text-gray-400 mt-4">
              Pricing verified directly from QuickBooks Online&apos;s and 1-800Accountant&apos;s official pricing pages, July 2026. Prices change, so check each provider&apos;s site for current rates before deciding.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
