import type { Metadata } from 'next';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import ToolsDirectory from './ToolsDirectory';

export const metadata: Metadata = {
  title: 'AI Tools Directory — Browse 60+ AI Tools | AI Business Alternative',
  description:
    'Browse and compare 60+ AI tools across 12 categories. Filter by pricing, rating, and category to find the perfect AI tool for your business.',
  openGraph: {
    title: 'AI Tools Directory — Browse 60+ AI Tools | AI Business Alternative',
    description:
      'Browse and compare 60+ AI tools across 12 categories. Filter by pricing, rating, and category to find the perfect AI tool for your business.',
    url: 'https://aibusinessalternative.com/tools',
    siteName: 'AI Business Alternative',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aibusinessalternative.com/tools',
  },
};

export default function ToolsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tools Directory',
    description: 'Browse and compare 60+ AI tools across 12 categories',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://aibusinessalternative.com/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="bg-gradient-to-b from-indigo-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              AI Tools Directory
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Browse and compare 60+ AI tools across 12 categories
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ToolsDirectory tools={tools} categories={categories} />
      </section>
    </>
  );
}
