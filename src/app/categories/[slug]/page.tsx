import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import { getHowToChooseContent, getFAQs } from '@/lib/categoryContent';

export const revalidate = 86400;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | AI Business Alternative' };
  }

  const title = `Best ${category.name} Tools for 2026 | AI Business Alternative`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(slug);
  const howToChoose = getHowToChooseContent(slug);
  const faqs = getFAQs(slug, category.name);

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
        name: 'Categories',
        item: 'https://aibusinessalternative.com/categories',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://aibusinessalternative.com/categories/${slug}`,
      },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${category.name} Tools`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://aibusinessalternative.com/tools/${tool.slug}`,
    })),
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-indigo-600">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/categories" className="hover:text-indigo-600">
                  Categories
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="font-medium text-gray-900">{category.name}</span>
              </li>
            </ol>
          </nav>

          {/* Category Icon + Title */}
          <div className="flex items-center gap-5">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-5xl"
              aria-hidden="true"
            >
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Best {category.name} Tools for 2026
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                {category.toolCount} tools compared
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-600">
            {category.description}
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Top {category.name} Tools
          </h2>
          {tools.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
              <p className="text-lg font-medium text-gray-500">
                Tools coming soon
              </p>
              <p className="mt-2 text-sm text-gray-400">
                We are currently reviewing and adding the best {category.name.toLowerCase()} tools.
                Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">
              How to Choose the Right {category.name} Tool
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
              {howToChoose.split('. ').reduce<string[][]>((acc, sentence, i) => {
                const paragraphIndex = Math.floor(i / 3);
                if (!acc[paragraphIndex]) acc[paragraphIndex] = [];
                acc[paragraphIndex].push(sentence);
                return acc;
              }, []).map((sentences, i) => (
                <p key={i}>{sentences.join('. ')}{sentences[sentences.length - 1].endsWith('.') ? '' : '.'}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions About {category.name}
            </h2>
            <dl className="mt-8 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <dt className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Find the Perfect {category.name} Tool
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-indigo-100">
            Compare features, pricing, and reviews to make the right choice for your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/categories"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
            >
              Browse All Categories
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700"
            >
              Search All Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
