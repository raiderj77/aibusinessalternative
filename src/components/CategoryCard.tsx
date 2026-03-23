import Link from 'next/link';
import type { AICategory } from '@/data/categories';

interface CategoryCardProps {
  category: AICategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      aria-label={`${category.name} - ${category.toolCount} tools`}
    >
      {/* Icon */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-3xl"
        aria-hidden="true"
      >
        {category.icon}
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
        {category.name}
      </h3>

      {/* Description (truncated to 2 lines) */}
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600">
        {category.description}
      </p>

      {/* Tool count badge */}
      <div className="mt-4">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {category.toolCount} {category.toolCount === 1 ? 'tool' : 'tools'}
        </span>
      </div>
    </Link>
  );
}
