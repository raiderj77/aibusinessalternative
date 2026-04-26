import Link from 'next/link';
import { categories } from '@/data/categories';
import { tools, getToolBySlug } from '@/data/tools';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ToolCard from '@/components/ToolCard';
import FAQ from '@/components/FAQ';

const faqItems = [
  {
    question: 'What is AI Business Alternative?',
    answer:
      'AI Business Alternative is a free directory and comparison tool that helps businesses find the best AI tools for their specific needs. It covers alternatives across categories including writing, coding, image generation, customer service, analytics, and productivity — with honest comparisons of features, pricing, and use cases.',
  },
  {
    question: 'How do I find the best AI tool for my business?',
    answer:
      'Browse by category or use the search to find AI tools for your specific task. Each listing includes a feature comparison, pricing overview, and recommended use cases. Filter by budget, team size, or integration requirements to narrow down options that fit your workflow.',
  },
  {
    question: 'Are the AI tool comparisons on this site unbiased?',
    answer:
      'Comparisons are based on publicly available feature information, pricing pages, and community feedback. Some listings may include affiliate relationships — these are disclosed. We aim to provide accurate, up-to-date information but recommend verifying current pricing and features directly with each vendor before purchasing.',
  },
  {
    question: 'How often is the AI tool directory updated?',
    answer:
      "The directory is updated regularly as new AI tools launch and existing tools update their features or pricing. The AI software market changes rapidly — always check the vendor's official website for the most current information before making a business decision.",
  },
  {
    question: 'What are the best free AI tools for small businesses?',
    answer:
      'Several capable free AI tools exist for small businesses: ChatGPT (free tier), Claude (free tier), Canva AI (free plan), Notion AI (limited free), and Google Gemini (free). The best choice depends on your primary use case — writing, design, coding, or customer communication. AI Business Alternative helps you compare free tiers side by side.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: new Date().toISOString().substring(0,10),
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const blogPosts = [
  {
    slug: 'best-ai-writing-tools-2026',
    title: 'The 10 Best AI Writing Tools for Small Businesses in 2026',
    excerpt:
      'We tested dozens of AI writing tools and narrowed it down to the top 10 that deliver real value for small business content creation, email marketing, and social media.',
    date: '2026-03-18',
    category: 'AI Writing',
  },
  {
    slug: 'ai-chatbots-vs-human-support',
    title: 'AI Chatbots vs. Human Support: When to Use Each',
    excerpt:
      'Not every customer interaction should be handled by AI. Here is a practical framework for deciding when to automate and when to keep the human touch.',
    date: '2026-03-12',
    category: 'Customer Service',
  },
  {
    slug: 'reduce-costs-with-ai-automation',
    title: 'How Solopreneurs Are Cutting Costs 40% with AI Automation',
    excerpt:
      'Real case studies from one-person businesses that replaced expensive SaaS subscriptions and freelancers with AI tools — and the lessons they learned along the way.',
    date: '2026-03-05',
    category: 'Productivity',
  },
];

const comparePairs = [
  { slug: 'chatgpt-vs-claude-ai', aSlug: 'chatgpt', bSlug: 'claude-ai', category: 'AI Writing' },
  { slug: 'midjourney-vs-dall-e-3', aSlug: 'midjourney', bSlug: 'dall-e-3', category: 'Image Generation' },
  { slug: 'github-copilot-vs-cursor-ai', aSlug: 'github-copilot', bSlug: 'cursor-ai', category: 'AI Coding' },
  { slug: 'jasper-ai-vs-copy-ai', aSlug: 'jasper-ai', bSlug: 'copy-ai', category: 'AI Writing' },
  { slug: 'semrush-ai-vs-surfer-seo', aSlug: 'semrush-ai', bSlug: 'surfer-seo', category: 'SEO' },
  { slug: 'elevenlabs-vs-murf-ai', aSlug: 'elevenlabs', bSlug: 'murf-ai', category: 'Audio & Voice' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomePage() {
  const featuredCategories = categories.slice(0, 8);
  const topTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const compareItems = comparePairs.flatMap(({ slug, aSlug, bSlug, category }) => {
    const toolA = getToolBySlug(aSlug);
    const toolB = getToolBySlug(bSlug);
    if (!toolA || !toolB) return [];
    return [{ slug, toolA, toolB, category }];
  });

  const stats = [
    { num: `${tools.length}`, label: 'tools reviewed' },
    { num: `${tools.length - 1}`, label: 'alternatives pages' },
    { num: '16', label: 'comparisons' },
    { num: '20', label: 'buying guides' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== 1. Hero ===== */}
      <section className="pt-14 pb-12 border-b border-black/10">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">

            {/* Activity pill */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
              75 tools · 216 pages indexed
            </div>

            {/* H1 */}
            <h1 className="font-display text-[42px] sm:text-[52px] leading-[1.15] tracking-tight mb-4">
              Find the right AI tool for{' '}
              <em className="text-[#2563EB]">every</em> job
            </h1>

            {/* Sub */}
            <p className="text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed mb-7">
              The trusted directory for small business owners and solopreneurs.
              Compare features, pricing, and real ratings to make the right call.
            </p>

            {/* Search */}
            <div className="mb-8">
              <SearchBar tools={tools} />
            </div>

            {/* Stats row */}
            <div className="flex gap-7 justify-center flex-wrap">
              {stats.map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-[20px] font-semibold tracking-tight text-gray-900">{num}</div>
                  <div className="text-[12px] text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== 2. Categories ===== */}
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-semibold">Browse by category</h2>
            <Link href="/categories" className="text-[13px] text-[#2563EB] hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

        </div>
      </section>

      {/* ===== 3. Top tools ===== */}
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-semibold">Top-rated tools</h2>
            <Link href="/tools" className="text-[13px] text-[#2563EB] hover:underline">
              View all {tools.length} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

        </div>
      </section>

      {/* ===== 4. Compare strip ===== */}
      {compareItems.length > 0 && (
        <section className="py-10 border-b border-black/10">
          <div className="container-custom">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-semibold">Popular comparisons</h2>
              <Link href="/compare" className="text-[13px] text-[#2563EB] hover:underline">
                All comparisons →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {compareItems.map(({ slug, toolA, toolB, category }) => (
                <Link
                  key={slug}
                  href={`/compare/${slug}`}
                  className="card p-3.5 flex items-center gap-3 cursor-pointer hover:border-black/20 transition-colors"
                >
                  {/* Dual logo boxes */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-500 overflow-hidden">
                      {(toolA.logoPlaceholder?.slice(0, 2) || toolA.name.slice(0, 2)).toUpperCase()}
                    </div>
                    <span className="text-[10px] text-gray-300 font-medium">vs</span>
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-500 overflow-hidden">
                      {(toolB.logoPlaceholder?.slice(0, 2) || toolB.name.slice(0, 2)).toUpperCase()}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-gray-900 truncate">
                      {toolA.name} vs {toolB.name}
                    </div>
                    <div className="text-[11px] text-gray-400">{category}</div>
                  </div>

                  <span className="text-gray-300 text-[14px]" aria-hidden="true">›</span>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ===== 5. Blog ===== */}
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-semibold">From the blog</h2>
            <Link href="/blog" className="text-[13px] text-[#2563EB] hover:underline">
              All articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-4 block hover:border-black/20 transition-colors">
                <div className="badge badge-blue mb-2.5">{post.category}</div>
                <h3 className="text-[14px] font-medium leading-snug mb-2 text-gray-900">
                  {post.title}
                </h3>
                <time dateTime={post.date} className="text-[11px] text-gray-400">
                  {formatDate(post.date)}
                </time>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ===== 6. Trust bar ===== */}
      <div className="border-t border-b border-black/10 py-5">
        <div className="container-custom">
          <div className="flex gap-7 items-center justify-center flex-wrap">

            <span className="text-[13px] text-gray-500">
              <strong className="text-gray-700">Independent reviews</strong> — no pay-to-rank
            </span>

            <span className="w-px h-7 bg-black/10 hidden sm:block" aria-hidden="true" />

            <span className="text-[13px] text-gray-500">
              <strong className="text-gray-700">Updated weekly</strong> as tools evolve
            </span>

            <span className="w-px h-7 bg-black/10 hidden sm:block" aria-hidden="true" />

            <span className="text-[13px] text-gray-500">
              Built for <strong className="text-gray-700">small business owners</strong>
            </span>

          </div>
        </div>
      </div>

      {/* ===== 7. FAQ ===== */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom max-w-2xl">
          <h2 className="text-[16px] font-semibold mb-5">Frequently asked questions</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* ===== GEO Content: AI Tools for Business ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl space-y-14">

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                How do AI business tools save time and money?
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800">
                AI tools automate repetitive tasks like content drafting, data analysis,
                customer responses, and code generation — reducing labor costs and freeing
                teams for higher-value work.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Businesses using AI tools report an average 40% reduction in time spent on
                routine tasks, according to McKinsey&apos;s 2024 State of AI report. Those
                productivity gains compound quickly: fewer hours on low-value work means
                faster turnaround on projects, lower contractor spend, and more bandwidth
                for growth. The global AI software market is projected to reach $391 billion
                by 2030, according to Grand View Research, reflecting how broadly businesses
                are integrating these tools into their operations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                How do I evaluate AI tools before committing to a paid plan?
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800">
                Start with free tiers or trials, test the tool on a real workflow task, and
                evaluate output quality, integration ease, and support quality before
                upgrading.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Key evaluation criteria include accuracy for your specific use case, API
                availability for custom integrations, data privacy policies (especially
                important for client data), and total cost of ownership including team
                training time. The investment pays off: 67% of businesses that adopt AI
                tools see positive ROI within the first year, according to Salesforce
                research. Running a structured two-week trial on a real task is the most
                reliable way to assess fit before committing to annual pricing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                What is the difference between general AI assistants and specialized AI
                tools?
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800">
                General AI assistants like ChatGPT handle a wide range of tasks with good
                but not specialized performance. Domain-specific tools are trained or
                fine-tuned for specific tasks and often outperform general models in their
                niche.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                For example, a legal AI tool trained on case law will outperform a general
                assistant on contract review, while a general assistant may be more flexible
                for mixed-task teams. The right choice depends on whether your team needs
                breadth — handling varied requests across departments — or depth in a single
                high-stakes domain like medical documentation, financial analysis, or
                software development.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                How quickly is the AI tool landscape changing?
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800">
                Extremely fast — major AI models release significant capability updates every
                3 to 6 months, and new specialized tools launch weekly. Staying current
                requires ongoing evaluation.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                A tool that was best-in-class six months ago may have been surpassed by a
                newer competitor or a major update to a general model. AI Business
                Alternative tracks these changes to keep comparisons current, so you can
                revisit tool choices without starting your research from scratch.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-lg font-semibold text-gray-900">Further Reading</h3>
              <ul className="mt-4 space-y-2 text-base text-gray-600">
                <li>
                  <a
                    href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    McKinsey State of AI 2024 Report
                  </a>{' '}
                  — annual research on AI adoption and business impact (mckinsey.com)
                </li>
                <li>
                  <a
                    href="https://aiindex.stanford.edu/report/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    Stanford AI Index Report
                  </a>{' '}
                  — comprehensive annual benchmarking of AI progress (aiindex.stanford.edu)
                </li>
                <li>
                  <a
                    href="https://www.technologyreview.com/topic/artificial-intelligence/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    MIT Technology Review — AI in Business
                  </a>{' '}
                  — analysis and reporting on enterprise AI adoption (technologyreview.com)
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
