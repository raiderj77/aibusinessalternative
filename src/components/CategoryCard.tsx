import Link from 'next/link';
import type { AICategory } from '@/data/categories';

interface CategoryCardProps {
  category: AICategory;
}

const iconBgMap: Record<string, string> = {
  'writing': 'bg-blue-50',
  'image-generation': 'bg-purple-50',
  'video-creation': 'bg-red-50',
  'coding': 'bg-green-50',
  'marketing': 'bg-amber-50',
  'customer-service': 'bg-teal-50',
  'productivity': 'bg-pink-50',
  'design': 'bg-orange-50',
  'business-intelligence': 'bg-indigo-50',
  'audio-voice': 'bg-violet-50',
  'research': 'bg-cyan-50',
  'ai-agents': 'bg-slate-100',
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const iconBg = iconBgMap[category.slug] ?? 'bg-gray-100';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card block cursor-pointer p-4"
      aria-label={`${category.name} - ${category.toolCount} tools`}
    >
      {/* Icon */}
      <div
        className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-[15px] ${iconBg}`}
        aria-hidden="true"
      >
        {category.icon}
      </div>

      {/* Name */}
      <h3 className="mb-0.5 text-[13px] font-semibold text-gray-900">
        {category.name}
      </h3>

      {/* Tool count */}
      <p className="text-[11px] text-gray-400">
        {category.toolCount} {category.toolCount === 1 ? 'tool' : 'tools'}
      </p>
    </Link>
  );
}
