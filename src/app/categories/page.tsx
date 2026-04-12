import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'AI Tool Categories — Browse 12 Categories | AI Business Alternative',
  description:
    'Explore AI tools organized by category. Browse 12 categories including AI writing, image generation, video creation, coding, marketing, and more to find the perfect tool for your business.',
  openGraph: {
    title: 'AI Tool Categories — Browse 12 Categories | AI Business Alternative',
    description:
      'Explore AI tools organized by category. Browse 12 categories including AI writing, image generation, video creation, coding, marketing, and more.',
    url: 'https://aibusinessalternative.com/categories',
  },
};

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
  ],
};

export default function CategoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="py-10 border-b border-black/10">
        <div className="container-custom">
          <div className="mb-4">
            <span className="badge badge-blue">12 categories</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[48px] leading-[1.15] tracking-tight text-gray-900 max-w-2xl">
            AI Tool Categories
          </h1>
          <p className="mt-3 text-[17px] text-gray-500 max-w-xl">
            Explore AI tools organized by what they do best
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="border-b border-black/10 bg-gray-50" aria-label="Breadcrumb">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">Categories</li>
          </ol>
        </div>
      </nav>

      {/* Category Grid */}
      <section className="container-custom py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
