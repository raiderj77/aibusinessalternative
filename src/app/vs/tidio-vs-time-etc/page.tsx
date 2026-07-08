import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AnswerBlock from '@/components/AnswerBlock';
import CustomerSupportDecisionHelper from '@/components/CustomerSupportDecisionHelper';

export const revalidate = 86400;

const LAST_UPDATED = '2026-07-07';

// NOTE: websiteUrl fields point to each company's real official site, not a
// tracked affiliate link. Tidio runs an affiliate program (tidio.com/affiliate,
// 30% lifetime recurring commission paid monthly, via PartnerStack; cookie
// duration is NOT publicly disclosed, so don't claim one; verified 2026-07-07).
// Time Etc runs an affiliate program via AWIN (timeetc.com/affiliates, $500 per
// sale, AWIN merchant profile 90821; verified 2026-07-07). Neither application
// has been submitted yet for this pair -- apply before expecting tracked
// commission, otherwise these links go to each company's real site untracked.
// Do not fabricate a tracked link in the meantime.
//
// Pricing facts verified 2026-07-07: Tidio plan prices read from the embedded
// pricing data on tidio.com/pricing (values in cents: Free 0/50 conversations,
// Starter 2900/100, Growth from 5900/250, Plus from 74900, Premium from
// 299900). Lyro AI conversation add-on pricing varies by volume and is not
// stated here beyond "sold separately on lower plans" because the exact
// add-on price points could not be cleanly attributed from the raw page.
// Time Etc plan pricing matches our reclaim-ai-vs-time-etc page (verified
// against Time Etc's pricing page July 2026). Time Etc lists "Customer
// service" among VA tasks at timeetc.com/virtual-assistant-tasks.
const tidio = {
  name: 'Tidio',
  tagline: 'AI-assisted customer service software: live chat, a shared inbox, and the Lyro AI agent that answers routine questions automatically.',
  priceRange: '$0–$59+/mo (small business plans)',
  pricingTiers: [
    { name: 'Free', price: '$0 (50 conversations/mo)' },
    { name: 'Starter', price: '$29/mo (100 conversations)' },
    { name: 'Growth', price: 'From $59/mo (250+ conversations, scales with volume)' },
    { name: 'Plus / Premium', price: 'From $749/mo (custom limits, sales-assisted)' },
  ],
  whoRunsIt: 'You; the AI answers routine questions from your knowledge base and hands everything else to you',
  timeInvestment: 'Setup plus ongoing attention: feed it your FAQs, watch conversations, answer the escalations yourself',
  pros: [
    'Lyro AI answers routine questions instantly, around the clock, in dozens of languages',
    'One inbox for website chat plus channels like email, Facebook, Instagram, and WhatsApp',
    'No-code setup that pulls answers from your help pages and FAQs',
    'A small business plan costs less per month than a single hour of most human support',
  ],
  cons: [
    'AI conversations are capped per plan, and extra AI usage is sold separately, so costs climb with volume',
    'It only answers from what you feed it, a thin knowledge base means poor answers',
    'Text only, no phone support, and complex or angry-customer cases still land on you',
    "It can't make judgment calls on refunds or build customer relationships",
  ],
  websiteUrl: 'https://www.tidio.com/',
};

const timeEtc = {
  name: 'Time Etc',
  tagline: 'A dedicated human virtual assistant who handles your customer service: answering customers, working the inbox, and dealing with the messy cases.',
  priceRange: '$390–$2,160/mo',
  pricingTiers: [
    { name: '10 hours/mo', price: '$390/mo ($39/hr)' },
    { name: '20 hours/mo', price: '$760/mo ($38/hr)' },
    { name: '40 hours/mo', price: '$1,480/mo ($37/hr)' },
    { name: '60 hours/mo', price: '$2,160/mo ($36/hr)' },
  ],
  whoRunsIt: 'A dedicated human assistant assigned to your account who learns your products and policies',
  timeInvestment: 'Onboarding and briefing up front, then light oversight while they work the inbox',
  pros: [
    'Real human judgment on refunds, complaints, and edge cases an AI cannot safely decide',
    'A dedicated assistant who learns your business over time, not a rotating pool or a script',
    'Customer service is one of many tasks they can take on, alongside admin, email, and scheduling',
    'No long-term contract, month-to-month',
  ],
  cons: [
    'Starts at $390/mo for 10 hours, many times the cost of AI chat software',
    'Hours are finite, a high ticket volume burns through a plan quickly',
    "Not instant or 24/7, replies follow your assistant's working hours",
    'You still set the policies and escalation rules yourself',
  ],
  websiteUrl: 'https://web.timeetc.com/',
};

const faqItems = [
  {
    question: "Can Tidio's AI actually replace a human support person?",
    answer:
      "For routine, repeated questions it answers well, provided you feed it a solid knowledge base: shipping times, return policies, how-to questions. What it cannot do is make judgment calls on refunds, calm down an angry customer, or handle a case that is not in its source material. Most real setups keep a human in the loop for escalations.",
  },
  {
    question: 'How much does each option actually cost per month?',
    answer:
      "Tidio's small business plans run $0 to $59+ per month depending on conversation volume, with AI conversations capped per plan and extra AI usage sold separately. Time Etc runs $390/mo for 10 hours up to $2,160/mo for 60 hours with a dedicated assistant. Both also cost your time: Tidio needs knowledge-base upkeep and escalation handling, a human assistant needs briefing and onboarding.",
  },
  {
    question: 'What does Tidio NOT do that a human assistant would handle?',
    answer:
      'Phone calls, refund decisions and other judgment calls, de-escalating upset customers, relationship building with repeat buyers, and anything that is not in the knowledge base you give it. A human assistant can also take on work beyond support, like inbox management and admin.',
  },
  {
    question: 'Can I use both together?',
    answer:
      'Yes, and it is a natural split: let the AI answer the routine questions the moment they arrive, and have a human assistant work the escalations, refunds, and anything the AI hands off. That keeps the human hours focused on cases that actually need judgment instead of copy-paste answers.',
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
      name: 'Tidio vs Time Etc',
      item: 'https://aibusinessalternative.com/vs/tidio-vs-time-etc',
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
  title: 'Tidio vs. Time Etc (2026): AI Customer Support Chatbot or a Real Human? | AI Business Alternative',
  description:
    'Tidio is AI customer service software from $0-$59+/mo that answers routine questions automatically. Time Etc is a dedicated human assistant from $390/mo who handles support for you. Real 2026 pricing, an interactive decision helper, and an honest breakdown of which fits your business.',
  alternates: {
    canonical: 'https://aibusinessalternative.com/vs/tidio-vs-time-etc',
  },
  openGraph: {
    type: 'article',
    title: 'Tidio vs. Time Etc: AI Customer Support Chatbot or a Real Human?',
    description:
      'Real 2026 pricing and an honest breakdown of which fits your business: an AI agent that answers routine questions automatically, or a dedicated human assistant who handles support for you.',
    url: 'https://aibusinessalternative.com/vs/tidio-vs-time-etc',
    siteName: 'AI Business Alternative',
  },
};

export default function TidioVsTimeEtcPage() {
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
              <li className="text-gray-600">Tidio vs Time Etc</li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="pt-8 pb-8 border-b border-black/10">
            <div className="badge badge-blue mb-4">AI tool vs. human alternative &middot; Customer support &middot; Updated July 2026</div>
            <h1 className="font-display text-[30px] sm:text-[36px] leading-tight tracking-tight mb-3">
              Tidio or a Time Etc assistant: <em className="italic">who should answer your customers?</em>
            </h1>
            <p className="text-[14px] text-gray-500 max-w-2xl">
              One is an AI agent that answers routine questions the second they arrive, for less than
              most businesses spend on coffee. The other is a real person who works your support inbox,
              makes judgment calls, and learns your business. Here&apos;s the honest breakdown.
            </p>
          </section>

          <section className="py-7 border-b border-black/10">
            <AnswerBlock
              what="Tidio is AI-assisted customer service software from $0 to $59+ per month: live chat, a shared inbox, and the Lyro AI agent that answers routine questions from your knowledge base. Time Etc is a dedicated human virtual assistant from $390/mo who handles customer service for you, including the cases that need real judgment."
              who="Small businesses deciding whether to automate customer support with AI or hand the inbox to a real person."
              bottomLine="Mostly repeat questions on a small budget: Tidio. Refunds, judgment calls, and wanting the inbox off your plate: Time Etc. High-volume support often ends up running both."
              lastUpdated={LAST_UPDATED}
            />
          </section>

          {/* Interactive decision helper */}
          <section className="py-7 border-b border-black/10">
            <CustomerSupportDecisionHelper />
          </section>

          {/* Side-by-side cards */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Side by side</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[tidio, timeEtc].map((p) => (
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
                          <span className="text-[#EF4444] shrink-0">&minus;</span>{con}
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

          {/* Hybrid callout */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-3">The hybrid setup for growing support volume</h2>
            <p className="text-[13px] text-gray-600 max-w-2xl leading-relaxed">
              These two solve different halves of the same inbox. The AI is unbeatable at answering the
              same shipping and how-to questions instantly at 3am. The human is unbeatable at the refund
              that needs a judgment call and the customer who needs calming down. A common setup as
              volume grows: Tidio answers the routine questions the moment they arrive, and a Time Etc
              assistant works the escalations and the cases the AI hands off, so paid human hours only go
              to work that actually needs a human.
            </p>
          </section>

          {/* Pricing detail table */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Pricing in detail</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">Tidio</th>
                    <th className="text-left py-2 font-medium text-gray-500">Time Etc</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(tidio.pricingTiers.length, timeEtc.pricingTiers.length) }).map((_, i) => (
                    <tr key={i} className="border-b border-black/5">
                      <td className="py-2 pr-4 text-gray-700">
                        {tidio.pricingTiers[i] ? `${tidio.pricingTiers[i].name}: ${tidio.pricingTiers[i].price}` : ''}
                      </td>
                      <td className="py-2 text-gray-700">
                        {timeEtc.pricingTiers[i] ? `${timeEtc.pricingTiers[i].name}: ${timeEtc.pricingTiers[i].price}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-gray-400 mt-3">
              Tidio&apos;s Lyro AI conversations are limited per plan and additional AI usage is sold
              separately on lower tiers, so check current AI pricing on Tidio&apos;s site for your volume.
              Time Etc rates shown are per-hour equivalents at each plan&apos;s monthly hour allotment.
              Prices change, so confirm current rates on each site before buying.
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
              Tidio pricing verified from Tidio&apos;s official pricing page and Time Etc pricing from
              Time Etc&apos;s official pricing page, July 2026. Prices change, so check each
              provider&apos;s site for current rates before deciding.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
