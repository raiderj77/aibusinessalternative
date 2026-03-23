import Link from 'next/link';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ToolCard from '@/components/ToolCard';

const blogPosts = [
  {
    slug: 'best-ai-writing-tools-2026',
    title: 'The 10 Best AI Writing Tools for Small Businesses in 2026',
    excerpt:
      'We tested dozens of AI writing tools and narrowed it down to the top 10 that deliver real value for small business content creation, email marketing, and social media.',
    date: '2026-03-18',
  },
  {
    slug: 'ai-chatbots-vs-human-support',
    title: 'AI Chatbots vs. Human Support: When to Use Each',
    excerpt:
      'Not every customer interaction should be handled by AI. Here is a practical framework for deciding when to automate and when to keep the human touch.',
    date: '2026-03-12',
  },
  {
    slug: 'reduce-costs-with-ai-automation',
    title: 'How Solopreneurs Are Cutting Costs 40% with AI Automation',
    excerpt:
      'Real case studies from one-person businesses that replaced expensive SaaS subscriptions and freelancers with AI tools — and the lessons they learned along the way.',
    date: '2026-03-05',
  },
];

export default function HomePage() {
  const featuredCategories = categories.slice(0, 12);
  const topTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-20 sm:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find the Right AI Tool for Every&nbsp;Job
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100 sm:text-xl">
            The trusted directory of 500+ AI tools for small business owners and
            solopreneurs. Compare features, pricing, and reviews to make the right
            choice.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-10 max-w-xl">
            <SearchBar tools={tools} />
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition hover:bg-gray-50 hover:shadow-xl"
            >
              Browse All Tools
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/20"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Featured Categories ===== */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Explore AI tools organized by the problem they solve for your business.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Top-Rated Tools ===== */}
      {topTools.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Top-Rated AI Tools
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
                The highest-rated AI tools as reviewed by our editorial team and the
                community.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center text-base font-semibold text-indigo-600 transition hover:text-indigo-800"
              >
                View All Tools
                <svg
                  className="ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== Why Trust Us ===== */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Trust AI Business Alternative?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Independent Reviews</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Our editorial team tests and reviews every tool. No pay-to-rank, no
                sponsored listings disguised as reviews.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Real Comparisons</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Side-by-side comparisons with honest pros and cons. We help you find
                what actually works for your use case.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Built for Business</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Every review is written with small business owners and solopreneurs in
                mind. We focus on value, ease of use, and ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Recent Blog Posts ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest from the Blog
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Practical guides, comparisons, and insights to help you get the most from
              AI in your business.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-900/5 transition hover:shadow-md"
              >
                <time
                  dateTime={post.date}
                  className="text-sm font-medium text-indigo-600"
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  Read more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Read More on the Blog
              <svg
                className="ml-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
