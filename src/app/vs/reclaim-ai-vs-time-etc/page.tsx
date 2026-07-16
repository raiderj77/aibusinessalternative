import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AnswerBlock from '@/components/AnswerBlock';
import SchedulingDecisionHelper from '@/components/SchedulingDecisionHelper';

export const revalidate = 86400;

const LAST_UPDATED = '2026-07-05';

// NOTE: affiliateUrl fields point to each company's real official site, not a
// tracked affiliate link. Reclaim.ai runs an affiliate program via PartnerStack
// (reclaim.partnerstack.com/?group=marketplace, 40% recurring commission on
// work-email referrals, 25% on personal-email referrals, 90-day cookie -- the
// program page does not state a fixed number of months the recurring
// commission lasts, so don't claim one). Time Etc runs a referral program via
// Awin ($500 per sale). Neither application has been submitted yet for this
// pair -- apply before publishing if tracked commission matters, otherwise
// these links go to each company's real site untracked. Do not fabricate a
// link in the meantime.
const reclaim = {
  name: 'Reclaim.ai',
  tagline: 'AI calendar assistant that auto-schedules your tasks, habits, and focus time around your existing meetings.',
  priceRange: '$0–$22/mo per seat',
  pricingTiers: [
    { name: 'Lite (Free)', price: '$0/mo' },
    { name: 'Starter', price: '$10–$12/mo per seat' },
    { name: 'Business', price: '$15–$18/mo per seat' },
    { name: 'Enterprise', price: '$22/mo per seat' },
  ],
  whoRunsIt: 'You, the software auto-schedules within your existing calendar',
  timeInvestment: 'A short setup connecting your calendar and task tools, then mostly hands-off',
  pros: [
    'Free tier available, paid plans start around $10/mo per seat',
    'Automatically protects focus time and reschedules around new meetings',
    'Syncs with Google Calendar, Outlook, and task tools like Todoist, Asana, and Jira',
    'Reports an average of 7.6 additional focus hours per week for users',
  ],
  cons: [
    "It's software, not a person, it won't book travel, make calls, or handle non-calendar admin work",
    'Needs an initial setup and adjustment period to learn your priorities',
    'Best suited to internal-meeting-heavy schedules rather than heavy external coordination',
  ],
  websiteUrl: 'https://reclaim.ai/',
};

const timeEtc = {
  name: 'Time Etc',
  tagline: 'A dedicated, real human virtual assistant who manages your calendar, and whatever else you need, for you.',
  priceRange: '$390–$2,160/mo',
  pricingTiers: [
    { name: '10 hours/mo', price: '$390/mo ($39/hr)' },
    { name: '20 hours/mo', price: '$760/mo ($38/hr)' },
    { name: '40 hours/mo', price: '$1,480/mo ($37/hr)' },
    { name: '60 hours/mo', price: '$2,160/mo ($36/hr)' },
  ],
  whoRunsIt: 'A dedicated human assistant assigned to your account, not a rotating pool',
  timeInvestment: 'Minimal, you communicate what you need and the assistant handles it',
  pros: [
    'A real person handles scheduling plus broader admin work, not just your calendar',
    'A dedicated assistant who learns your preferences over time, not a different person each time',
    'No long-term contract, month-to-month',
    'Native English-speaking assistants based in the US, UK, Canada, or Australia',
  ],
  cons: [
    'Meaningfully more expensive than AI software at every plan level',
    "Only handles what you actively delegate, it won't automatically protect focus time the way scheduling software does",
    'Value scales with how much you actually delegate, light users may not use their full hours',
  ],
  websiteUrl: 'https://web.timeetc.com/',
};

const faqItems = [
  {
    question: 'Is Reclaim.ai actually AI, or just a scheduling app?',
    answer:
      "It's calendar software with real AI-driven scheduling behind it, it automatically finds time for your tasks, habits, and focus time, and reschedules them around new meetings. But it only works inside your calendar. It won't book a flight, make a phone call, or do anything outside your calendar and connected task tools.",
  },
  {
    question: 'Is Time Etc cheaper than Reclaim.ai?',
    answer:
      "No. Time Etc starts at $390/mo for 10 hours versus $0–$12/mo for Reclaim.ai's free and entry tiers. You're paying for a real person's time across a broad range of tasks, not just calendar automation.",
  },
  {
    question: 'Can I use both?',
    answer:
      'Yes. It\'s common to use Reclaim.ai to keep your own calendar organized day to day, and bring in a Time Etc assistant for broader admin work, like travel booking, email triage, or research, that a scheduling tool can\'t do.',
  },
  {
    question: 'Which one is better for a brand-new solo founder?',
    answer:
      "If your calendar is manageable and you mostly need help protecting focus time and avoiding meeting overload, Reclaim.ai's free or entry tier is usually enough to start. If you're already overwhelmed by scheduling and other admin work and can budget a few hundred dollars a month, a Time Etc assistant removes that work entirely.",
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
      name: 'Reclaim.ai vs Time Etc',
      item: 'https://aibusinessalternative.com/vs/reclaim-ai-vs-time-etc',
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
  title: 'Reclaim.ai and Time Etc Record Under Editorial Review | AI Business Alternative',
  description: 'This comparison record is paused pending dated primary-source review.',
  alternates: {
    canonical: 'https://aibusinessalternative.com/vs/reclaim-ai-vs-time-etc',
  },
  openGraph: {
    type: 'article',
    title: 'Reclaim.ai and Time Etc Record Under Editorial Review',
    description: 'This comparison record is paused pending dated primary-source review.',
    url: 'https://aibusinessalternative.com/vs/reclaim-ai-vs-time-etc',
    siteName: 'AI Business Alternative',
  },
};

export default function ReclaimVsTimeEtcPage() {
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
              <li className="text-gray-600">Reclaim.ai vs Time Etc</li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="pt-8 pb-8 border-b border-black/10">
            <div className="badge badge-blue mb-4">AI tool vs. human alternative &middot; Scheduling &middot; Updated July 2026</div>
            <h1 className="font-display text-[30px] sm:text-[36px] leading-tight tracking-tight mb-3">
              Reclaim.ai or Time Etc: <em className="italic">who should manage your calendar?</em>
            </h1>
            <p className="text-[14px] text-gray-500 max-w-2xl">
              One is AI calendar software that auto-schedules around your existing meetings. The other is
              a real human assistant who can manage your calendar, and a lot more, for you. They solve
              different problems at very different prices. Here&apos;s the honest breakdown.
            </p>
          </section>

          <section className="py-7 border-b border-black/10">
            <AnswerBlock
              what="Reclaim.ai is AI calendar software that automatically schedules your tasks, habits, and focus time around your meetings. Time Etc is a human-staffed virtual assistant service that can manage your calendar, and broader admin work, for you."
              who="Solo founders and small businesses deciding whether to automate their own calendar or hand scheduling and admin work to a real person."
              bottomLine="Tight budget and your calendar is mostly your own meetings: Reclaim.ai. Want scheduling and broader admin work handled entirely and can afford it: Time Etc."
              lastUpdated={LAST_UPDATED}
            />
          </section>

          {/* Interactive decision helper */}
          <section className="py-7 border-b border-black/10">
            <SchedulingDecisionHelper />
          </section>

          {/* Side-by-side cards */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Side by side</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[reclaim, timeEtc].map((p) => (
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

          {/* Pricing detail table */}
          <section className="py-7 border-b border-black/10">
            <h2 className="text-[16px] font-semibold mb-5">Pricing in detail</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">Reclaim.ai</th>
                    <th className="text-left py-2 font-medium text-gray-500">Time Etc</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(reclaim.pricingTiers.length, timeEtc.pricingTiers.length) }).map((_, i) => (
                    <tr key={i} className="border-b border-black/5">
                      <td className="py-2 pr-4 text-gray-700">
                        {reclaim.pricingTiers[i] ? `${reclaim.pricingTiers[i].name}: ${reclaim.pricingTiers[i].price}` : ''}
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
              Time Etc rates shown are per-hour equivalents at each plan&apos;s monthly hour allotment. Both companies
              offer promotional rates and trials that change over time, so confirm current pricing on their sites
              before buying.
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
              Pricing verified directly from Reclaim.ai&apos;s and Time Etc&apos;s official pricing pages, July 2026. Prices
              change, so check each provider&apos;s site for current rates before deciding.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
