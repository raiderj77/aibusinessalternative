import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getBestPageBySlug,
  getAllBestPageSlugs,
  type BestPageData,
} from '@/lib/bestContent';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';

export const revalidate = 86400;

export function generateStaticParams() {
  return getAllBestPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);
  if (!page) return {};

  const title = `${page.title} in 2026 | AI Business Alternative`;
  return {
    title,
    description: page.metaDescription,
    openGraph: {
      title,
      description: page.metaDescription,
      url: `https://aibusinessalternative.com/best/${page.slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
    },
    alternates: {
      canonical: `https://aibusinessalternative.com/best/${page.slug}`,
    },
  };
}

function buildBreadcrumbJsonLd(page: BestPageData) {
  return {
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
        name: 'Best',
        item: 'https://aibusinessalternative.com/best',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `https://aibusinessalternative.com/best/${page.slug}`,
      },
    ],
  };
}

function buildFaqJsonLd(page: BestPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildItemListJsonLd(page: BestPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${page.title} in 2026`,
    description: page.metaDescription,
    numberOfItems: page.tools.length,
    itemListElement: page.tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://aibusinessalternative.com/tools/${tool.slug}`,
    })),
  };
}

function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    'best-ai-tools-for-small-business': 'AI for Small Business',
    'best-ai-tools-for-content-creation': 'AI Content Creation',
    'best-ai-tools-for-solopreneurs': 'AI for Solopreneurs',
    'best-free-ai-tools': 'Free AI',
    'best-ai-tools-for-marketing': 'AI Marketing',
    'best-ai-writing-tools': 'AI Writing',
    'best-ai-tools-for-productivity': 'AI Productivity',
    'best-ai-image-generators': 'AI Image Generation',
  };
  return map[slug] || 'AI';
}

export default async function BestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);
  if (!page) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(page);
  const faqJsonLd = buildFaqJsonLd(page);
  const itemListJsonLd = buildItemListJsonLd(page);
  const categoryLabel = getCategoryLabel(page.slug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </li>
            <li>
              <Link href="/best" className="hover:text-indigo-600 transition">
                Best
              </Link>
            </li>
            <li aria-hidden="true">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </li>
            <li>
              <span className="font-medium text-gray-900">{page.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero / H1 */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-14 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {page.title} in 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Independently reviewed and ranked by our editorial team. Updated
            March 2026.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="prose prose-lg mx-auto max-w-3xl text-gray-700">
            {page.intro.split('\n\n').map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Listings */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="space-y-12">
            {page.tools.map((tool, index) => {
              const miniReview = page.miniReviews.find(
                (r) => r.slug === tool.slug
              );
              return (
                <article
                  key={tool.slug}
                  id={tool.slug}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8"
                >
                  {/* Tool Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        <span className="text-indigo-600">
                          #{index + 1}.
                        </span>{' '}
                        {tool.name}{' '}
                        <span className="font-normal text-gray-500">
                          &mdash; {tool.tagline}
                        </span>
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <RatingStars
                          rating={tool.rating}
                          reviewCount={tool.reviewCount}
                          size="md"
                        />
                        <PricingBadge
                          pricing={tool.pricing}
                          price={tool.price}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mini Review */}
                  {miniReview && (
                    <div className="mt-6">
                      <p className="text-base leading-relaxed text-gray-700">
                        {miniReview.review}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Key Features
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {tool.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing + Best For */}
                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-900">
                        Pricing:
                      </span>{' '}
                      {tool.price}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">
                        Best For:
                      </span>{' '}
                      {tool.bestFor}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Visit {tool.name}
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Read Full Review
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {page.title}: Quick Comparison
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Pricing
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {page.tools.map((tool) => (
                  <tr
                    key={tool.slug}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <Link
                        href={`#${tool.slug}`}
                        className="text-indigo-600 hover:text-indigo-800 transition"
                      >
                        {tool.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <PricingBadge pricing={tool.pricing} price={tool.price} />
                    </td>
                    <td className="px-4 py-3">
                      <RatingStars rating={tool.rating} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tool.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              How to Choose the Right {categoryLabel} Tool
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
              {page.howToChoose.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8">
              <FAQ items={page.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Disclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
