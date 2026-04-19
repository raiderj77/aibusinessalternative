import Link from 'next/link';
import type { AITool } from '@/data/tools';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="card group flex flex-col p-5 block" aria-label={`View ${tool.name}`}>
      <div>
        {/* Logo abbreviation box */}
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[13px] font-semibold text-gray-500 shrink-0 overflow-hidden mb-3">
          {(tool.logoPlaceholder?.slice(0, 2) || tool.name.slice(0, 2)).toUpperCase()}
        </div>

        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold text-gray-900">
              {tool.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{tool.tagline}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tool.categories[0] && (
            <span className="badge badge-gray">{tool.categories[0]}</span>
          )}
          <PricingBadge pricing={tool.pricing} price={tool.price} />
        </div>

        <div className="mt-3">
          <RatingStars rating={tool.rating} size="sm" />
        </div>
      </div>
    </Link>
  );
}
