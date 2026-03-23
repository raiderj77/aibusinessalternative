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
                <span className="font-medium text-gray-900">Categories</span>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI Tool Categories
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Explore AI tools organized by what they do best
            </p>
          </div>

          {/* Category Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
