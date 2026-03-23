import Link from 'next/link';
import type { AITool } from '@/data/tools';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group flex flex-col rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-2xl"
          aria-hidden="true"
        >
          {tool.icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            {tool.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{tool.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Category badge */}
        {tool.categories[0] && (
          <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {tool.categories[0]}
          </span>
        )}
        <PricingBadge pricing={tool.pricing} price={tool.price} />
      </div>

      <div className="mt-3">
        <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} size="sm" />
      </div>

      <div className="mt-auto pt-4">
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
          aria-label={`View details for ${tool.name}`}
        >
          View Tool
          <span className="ml-1" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
