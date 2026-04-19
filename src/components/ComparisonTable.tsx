import type { AITool } from '@/data/tools';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';

interface ComparisonTableProps {
  toolA: AITool;
  toolB: AITool;
}

function WinnerHighlight({ isWinner, children }: { isWinner: boolean; children: React.ReactNode }) {
  return (
    <td className={`px-4 py-3 text-sm ${isWinner ? 'bg-green-50' : ''}`}>
      {children}
    </td>
  );
}

export default function ComparisonTable({ toolA, toolB }: ComparisonTableProps) {
  // Determine rating winner
  const ratingWinnerA = toolA.rating > toolB.rating;
  const ratingWinnerB = toolB.rating > toolA.rating;

  // Determine pricing winner (free > freemium > free-trial > paid)
  const pricingOrder = { free: 0, freemium: 1, 'free-trial': 2, paid: 3 } as const;
  const pricingWinnerA = pricingOrder[toolA.pricing] < pricingOrder[toolB.pricing];
  const pricingWinnerB = pricingOrder[toolB.pricing] < pricingOrder[toolA.pricing];

  // Collect all unique features from both tools
  const allFeatures = Array.from(new Set([...toolA.features, ...toolB.features]));

  return (
    <div className="overflow-x-auto" role="region" aria-label={`Comparison of ${toolA.name} and ${toolB.name}`}>
      {/* Desktop table */}
      <table className="hidden w-full border-collapse sm:table" aria-label="Feature comparison table">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{toolA.name}</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{toolB.name}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {/* Pricing */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-700">Pricing</td>
            <WinnerHighlight isWinner={pricingWinnerA}>
              <PricingBadge pricing={toolA.pricing} price={toolA.price} />
            </WinnerHighlight>
            <WinnerHighlight isWinner={pricingWinnerB}>
              <PricingBadge pricing={toolB.pricing} price={toolB.price} />
            </WinnerHighlight>
          </tr>

          {/* Starting Price */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-700">Starting Price</td>
            <td className="px-4 py-3 text-sm text-gray-600">{toolA.price || 'N/A'}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{toolB.price || 'N/A'}</td>
          </tr>

          {/* Rating */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-700">Rating</td>
            <WinnerHighlight isWinner={ratingWinnerA}>
              <RatingStars rating={toolA.rating} size="sm" />
            </WinnerHighlight>
            <WinnerHighlight isWinner={ratingWinnerB}>
              <RatingStars rating={toolB.rating} size="sm" />
            </WinnerHighlight>
          </tr>

          {/* Best For */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-700">Best For</td>
            <td className="px-4 py-3 text-sm text-gray-600">{toolA.bestFor}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{toolB.bestFor}</td>
          </tr>

          {/* Features */}
          {allFeatures.map((feature) => {
            const aHas = toolA.features.includes(feature);
            const bHas = toolB.features.includes(feature);
            const aWins = aHas && !bHas;
            const bWins = bHas && !aHas;

            return (
              <tr key={feature}>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">{feature}</td>
                <WinnerHighlight isWinner={aWins}>
                  <span aria-label={aHas ? 'Yes' : 'No'}>{aHas ? '✓' : '—'}</span>
                </WinnerHighlight>
                <WinnerHighlight isWinner={bWins}>
                  <span aria-label={bHas ? 'Yes' : 'No'}>{bHas ? '✓' : '—'}</span>
                </WinnerHighlight>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile stacked view */}
      <div className="space-y-6 sm:hidden">
        {[toolA, toolB].map((tool) => (
          <div key={tool.slug} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
            </div>

            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-700">Pricing</dt>
                <dd><PricingBadge pricing={tool.pricing} price={tool.price} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-700">Starting Price</dt>
                <dd className="text-sm text-gray-600">{tool.price || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-700">Rating</dt>
                <dd><RatingStars rating={tool.rating} size="sm" /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-700">Best For</dt>
                <dd className="text-right text-sm text-gray-600">{tool.bestFor}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-700">Features</dt>
                <dd className="mt-1">
                  <ul className="space-y-1">
                    {allFeatures.map((feature) => {
                      const has = tool.features.includes(feature);
                      return (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className={has ? 'text-green-600' : 'text-gray-300'} aria-hidden="true">
                            {has ? '✓' : '—'}
                          </span>
                          <span className={has ? '' : 'text-gray-400'}>{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
