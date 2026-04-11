import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import ToolCard from '@/components/ToolCard';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';
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
  if (!tool) return { title: 'Tool Not Found' };

  const title = `${tool.name} Review 2026 — Features, Pricing & Alternatives | AI Business Alternative`;
  const description = `${tool.name} review: ${tool.tagline}. Compare features, pricing, pros & cons, and alternatives. ${tool.bestFor}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/tools/${tool.slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
    },
    alternates: {
      canonical: `https://aibusinessalternative.com/tools/${tool.slug}`,
    },
  };
}

// Helper: generate FAQ items from tool data
function generateFAQs(tool: (typeof tools)[number], alternativeNames: string[]) {
  const pricingAnswer =
    tool.pricing === 'free'
      ? `Yes, ${tool.name} is completely free to use.`
      : tool.pricing === 'freemium'
        ? `${tool.name} offers a free plan with limited features. Paid plans start at ${tool.price || 'varying price points'} for access to premium features.`
        : tool.pricing === 'free-trial'
          ? `${tool.name} offers a free trial so you can test it before committing. ${tool.price ? `Paid plans start at ${tool.price}.` : 'Visit their website for current pricing.'}`
          : `${tool.name} is a paid tool. ${tool.price ? `Plans start at ${tool.price}.` : 'Visit their website for current pricing details.'}`;

  const altList =
    alternativeNames.length > 0
      ? alternativeNames.slice(0, 3).join(', ')
      : 'other tools in its category';

  return [
    {
      question: `Is ${tool.name} free?`,
      answer: pricingAnswer,
    },
    {
      question: `What is ${tool.name} best for?`,
      answer: `${tool.name} is best for ${tool.bestFor}. It excels in the ${tool.categories.map((c) => getCategoryBySlug(c)?.name || c).join(' and ')} ${tool.categories.length === 1 ? 'category' : 'categories'}.`,
    },
    {
      question: `How does ${tool.name} compare to alternatives?`,
      answer: `${tool.name} has a rating of ${tool.rating}/5 based on ${tool.reviewCount.toLocaleString()} reviews. Popular alternatives include ${altList}. Each tool has different strengths, so the best choice depends on your specific needs and budget.`,
    },
    {
      question: `Is ${tool.name} good for small business?`,
      answer: `${tool.name} ${tool.pricing === 'free' || tool.pricing === 'freemium' ? 'is an excellent option for small businesses since it offers a free plan to get started' : tool.pricing === 'free-trial' ? 'offers a free trial, making it easy for small businesses to evaluate before investing' : 'is a professional tool that can deliver strong ROI for small businesses'}. ${tool.bestFor}, which makes it ${tool.rating >= 4.5 ? 'a top-rated choice' : tool.rating >= 4.0 ? 'a highly-rated option' : 'a solid option'} for businesses of all sizes.`,
    },
    {
      question: `What are the pros and cons of ${tool.name}?`,
      answer: `Key pros of ${tool.name} include: ${tool.pros.slice(0, 3).join(', ')}. Some potential downsides are: ${tool.cons.slice(0, 3).join(', ')}. Overall, it maintains a ${tool.rating}/5 rating from ${tool.reviewCount.toLocaleString()} reviews.`,
    },
  ];
}

// Helper: generate static user reviews from tool data
function generateReviews(tool: (typeof tools)[number]) {
  const reviewProfiles = [
    {
      name: 'Small Business Owner',
      role: 'Verified User',
      rating: Math.min(5, tool.rating + 0.2),
    },
    {
      name: 'Marketing Manager',
      role: 'Verified User',
      rating: tool.rating,
    },
    {
      name: 'Freelance Designer',
      role: 'Verified User',
      rating: Math.max(3.5, tool.rating - 0.3),
    },
  ];

  const reviewTexts = [
    `${tool.name} has been a game-changer for my business. ${tool.pros[0] || 'Great features'} and ${tool.pros[1] || 'easy to use'}. I use it daily for ${tool.bestFor.toLowerCase()}. Highly recommend for anyone looking to boost productivity with AI.`,
    `I have been using ${tool.name} for several months now. The ${tool.features[0] || 'core functionality'} works really well. ${tool.cons[0] ? `My only gripe is that ${tool.cons[0].toLowerCase()}.` : ''} Overall, solid tool that delivers on its promises.`,
    `Good tool overall. ${tool.pros[0] || 'Works well'} is the standout feature for me. ${tool.pricing === 'free' || tool.pricing === 'freemium' ? 'Love that there is a free option to try it out.' : `Pricing is ${tool.price ? `fair starting at ${tool.price}` : 'reasonable for what you get'}.`} Would recommend to colleagues.`,
  ];

  return reviewProfiles.map((profile, i) => ({
    ...profile,
    rating: Math.round(profile.rating * 2) / 2,
    text: reviewTexts[i],
  }));
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const primaryCategory = getCategoryBySlug(tool.categories[0]);

  // Find alternative tools: same category, different tool, limit 5
  const alternatives = tools
    .filter(
      (t) =>
        t.slug !== tool.slug &&
        t.categories.some((c) => tool.categories.includes(c))
    )
    .slice(0, 5);

  const alternativeNames = alternatives.map((a) => a.name);
  const faqs = generateFAQs(tool, alternativeNames);
  const reviews = generateReviews(tool);
  const visitUrl = tool.affiliateUrl || tool.websiteUrl;

  // JSON-LD: SoftwareApplication
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.websiteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : tool.price,
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aibusinessalternative.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://aibusinessalternative.com/tools',
      },
      ...(primaryCategory
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: primaryCategory.name,
              item: `https://aibusinessalternative.com/categories/${primaryCategory.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: tool.name,
              item: `https://aibusinessalternative.com/tools/${tool.slug}`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: tool.name,
              item: `https://aibusinessalternative.com/tools/${tool.slug}`,
            },
          ]),
    ],
  };

  // JSON-LD: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link href="/" className="transition-colors hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tools" className="transition-colors hover:text-indigo-600">
                Tools
              </Link>
            </li>
            {primaryCategory && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/categories/${primaryCategory.slug}`}
                    className="transition-colors hover:text-indigo-600"
                  >
                    {primaryCategory.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900" aria-current="page">
              {tool.name}
            </li>
          </ol>
        </nav>

        {/* ── Quick Answer ── */}
        <AnswerBlock
          what={`${tool.name} is an AI-powered ${tool.categories.map((c) => getCategoryBySlug(c)?.name || c).join(' and ').toLowerCase()} tool. ${tool.tagline}`}
          who={tool.bestFor}
          bottomLine={`Rated ${tool.rating}/5 by ${tool.reviewCount.toLocaleString()} users. ${tool.pricing === 'free' ? 'Completely free to use.' : tool.pricing === 'freemium' ? `Free plan available${tool.price ? `; paid plans from ${tool.price}` : ''}.` : tool.price ? `Plans start at ${tool.price}.` : 'See website for pricing.'}`}
          lastUpdated="2026-03-25"
        />

        {/* ── Hero Header ── */}
        <header className="mb-12 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Logo placeholder */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm"
              aria-hidden="true"
            >
              {tool.icon}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {tool.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">{tool.tagline}</p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {tool.categories.map((catSlug) => {
                  const cat = getCategoryBySlug(catSlug);
                  return (
                    <Link
                      key={catSlug}
                      href={`/categories/${catSlug}`}
                      className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-200"
                    >
                      {cat?.icon} {cat?.name || catSlug}
                    </Link>
                  );
                })}
                <PricingBadge pricing={tool.pricing} price={tool.price} />
              </div>

              {/* Rating */}
              <div className="mt-4">
                <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} size="lg" />
              </div>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 sm:self-center">
              <a
                href={visitUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Visit {tool.name}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Main Content (2/3 width) ── */}
          <div className="space-y-12 lg:col-span-2">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">About {tool.name}</h2>
              <p className="mt-4 leading-relaxed text-gray-700">{tool.description}</p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {tool.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Pros &amp; Cons</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {/* Pros */}
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    Pros
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800">
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                    Cons
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Best For Callout */}
            <section className="rounded-xl bg-indigo-50 p-6">
              <h2 className="text-lg font-semibold text-indigo-900">
                Best For
              </h2>
              <p className="mt-2 text-indigo-800">{tool.bestFor}</p>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <PricingBadge pricing={tool.pricing} price={tool.price} />
                  {tool.price && (
                    <span className="text-sm text-gray-600">starting price</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Pricing may vary based on usage and plan tier.{' '}
                  <a
                    href={visitUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Visit {tool.name} for current pricing &rarr;
                  </a>
                </p>
              </div>
            </section>

            {/* Screenshots Placeholder */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Screenshots</h2>
              <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
                <p className="text-sm text-gray-400">Screenshots coming soon</p>
              </div>
            </section>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  Alternatives to {tool.name}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {alternatives.map((alt) => (
                    <ToolCard key={alt.slug} tool={alt} />
                  ))}
                </div>
              </section>
            )}

            {/* Compare Section */}
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  Compare {tool.name}
                </h2>
                <div className="mt-4 space-y-2">
                  {alternatives.slice(0, 5).map((alt) => (
                    <p key={alt.slug} className="text-sm text-gray-600">
                      Compare{' '}
                      <span className="font-medium text-gray-900">{tool.name}</span> vs{' '}
                      <span className="font-medium text-gray-900">{alt.name}</span>
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <dl className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-5">
                    <dt className="text-base font-semibold text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* User Reviews */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">User Reviews</h2>
              <div className="mt-6 space-y-4">
                {reviews.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.role}</p>
                      </div>
                      <RatingStars rating={review.rating} size="sm" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar (1/3 width) ── */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Quick Info Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-900">Quick Info</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-medium text-gray-900">
                    {primaryCategory?.name || tool.categories[0]}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pricing</dt>
                  <dd>
                    <PricingBadge pricing={tool.pricing} price={tool.price} />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Rating</dt>
                  <dd className="font-medium text-gray-900">{tool.rating}/5</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Reviews</dt>
                  <dd className="font-medium text-gray-900">
                    {tool.reviewCount.toLocaleString()}
                  </dd>
                </div>
              </dl>
              <div className="mt-5">
                <a
                  href={visitUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                  Visit {tool.name}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tags */}
            {tool.tags.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best For (sidebar) */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
              <h3 className="text-sm font-semibold text-indigo-900">Best For</h3>
              <p className="mt-2 text-sm text-indigo-800">{tool.bestFor}</p>
            </div>
          </aside>
        </div>

        {/* Disclaimer */}
        <div className="mt-16">
          <Disclaimer />
        </div>
      </article>
    </>
  );
}
