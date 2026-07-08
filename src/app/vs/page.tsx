import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Tool vs. Human Alternative: Honest Comparisons | AI Business Alternative',
  description:
    'For one job at a time, an honest comparison of a specific AI tool against its nearest human or non-AI alternative. Real pricing, real tradeoffs, no hype.',
  openGraph: {
    title: 'AI Tool vs. Human Alternative: Honest Comparisons',
    description:
      'For one job at a time, an honest comparison of a specific AI tool against its nearest human or non-AI alternative.',
    url: 'https://aibusinessalternative.com/vs',
  },
};

const comparisons = [
  {
    slug: 'quickbooks-online-vs-1800accountant',
    task: 'Bookkeeping',
    aiName: 'QuickBooks Online',
    altName: '1-800Accountant',
    summary: 'AI-assisted software you run yourself, or a real human accounting team that runs it for you.',
  },
  {
    slug: 'reclaim-ai-vs-time-etc',
    task: 'Scheduling',
    aiName: 'Reclaim.ai',
    altName: 'Time Etc',
    summary: 'AI calendar software that auto-schedules around your meetings, or a real human assistant who manages your calendar for you.',
  },
  {
    slug: 'buffer-vs-fiverr-social-media-manager',
    task: 'Social media',
    aiName: 'Buffer',
    altName: 'Fiverr freelancer',
    summary: 'AI-assisted software that drafts and schedules your posts, or a real freelance social media manager who runs your accounts for you.',
  },
  {
    slug: 'tidio-vs-time-etc',
    task: 'Customer support',
    aiName: 'Tidio',
    altName: 'Time Etc',
    summary: 'An AI agent that answers routine customer questions automatically, or a dedicated human assistant who works your support inbox for you.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aibusinessalternative.com' },
    { '@type': 'ListItem', position: 2, name: 'AI vs. Human', item: 'https://aibusinessalternative.com/vs' },
  ],
};

export default function VsIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">
          <div className="mb-4">
            <span className="badge badge-blue">One task at a time, updated July 2026</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            AI tool, or its human alternative?
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            For one specific job, we compare a named AI tool against the real human or service
            alternative for that same job. Real pricing on both sides, no hype, and an interactive
            helper to point you to the right one.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="border-b border-black/10 bg-gray-50" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">AI vs. Human</li>
          </ol>
        </div>
      </nav>

      {/* Comparison list */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/vs/${c.slug}`} className="card group flex flex-col p-5">
                <span className="badge badge-gray self-start mb-4">{c.task}</span>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col items-center text-center flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-900 truncate w-full">{c.aiName}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">AI tool</span>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    VS
                  </div>
                  <div className="flex flex-col items-center text-center flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-900 truncate w-full">{c.altName}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">Human alternative</span>
                  </div>
                </div>
                <p className="mt-4 text-[12.5px] text-gray-500 leading-relaxed">{c.summary}</p>
                <span className="mt-5 text-[13px] font-medium text-[#2563EB]">View comparison →</span>
              </Link>
            ))}

            {/* Coming soon placeholder, keeps the grid balanced without inventing content */}
            <div className="card flex flex-col items-center justify-center p-5 border-dashed text-center">
              <span className="text-[13px] text-gray-400">More task-by-task comparisons coming soon</span>
              <span className="text-[12px] text-gray-300 mt-1">Email marketing, design, and others</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
