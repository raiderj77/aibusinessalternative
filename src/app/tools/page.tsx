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

      <section className="py-10 border-b border-black/10">
        <div className="container-custom">
          <div className="mb-4">
            <span className="badge badge-blue">60+ tools · 12 categories</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            AI Tools Directory
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            Browse and compare 60+ AI tools across 12 categories
          </p>
        </div>
      </section>

      <section className="container-custom py-8 sm:py-12">
        <ToolsDirectory tools={tools} categories={categories} />
      </section>
    </>
  );
}
