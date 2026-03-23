'use client';

import { useState, useMemo } from 'react';
import type { AITool } from '@/data/tools';
import type { AICategory } from '@/data/categories';
import ToolCard from '@/components/ToolCard';

interface ToolsDirectoryProps {
  tools: AITool[];
  categories: AICategory[];
}

const PRICING_OPTIONS: { value: AITool['pricing']; label: string }[] = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'free-trial', label: 'Free Trial' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 4.5, label: '4.5+ Stars' },
];

export default function ToolsDirectory({ tools, categories }: ToolsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Search filter
      if (searchQuery.length >= 2) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const matchesCategory = tool.categories.some((cat) =>
          selectedCategories.includes(cat)
        );
        if (!matchesCategory) return false;
      }

      // Pricing filter
      if (selectedPricing.length > 0) {
        if (!selectedPricing.includes(tool.pricing)) return false;
      }

      // Rating filter
      if (minRating > 0) {
        if (tool.rating < minRating) return false;
      }

      return true;
    });
  }, [tools, searchQuery, selectedCategories, selectedPricing, minRating]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function togglePricing(value: string) {
    setSelectedPricing((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPricing([]);
    setMinRating(0);
  }

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPricing.length > 0 ||
    minRating > 0;

  const filterSidebar = (
    <div className="space-y-6">
      {/* Category Filters */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">Categories</legend>
        <div className="mt-3 space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.toolCount}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Pricing Filters */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">Pricing</legend>
        <div className="mt-3 space-y-2">
          {PRICING_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={selectedPricing.includes(option.value)}
                onChange={() => togglePricing(option.value)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Rating Filter */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">Minimum Rating</legend>
        <div className="mt-3 space-y-2">
          {RATING_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === option.value}
                onChange={() => setMinRating(option.value)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <label htmlFor="directory-search" className="sr-only">
          Search AI tools
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            id="directory-search"
            type="search"
            placeholder="Search tools by name, tagline, or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          aria-expanded={mobileFiltersOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
              {selectedCategories.length + selectedPricing.length + (minRating > 0 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 lg:hidden">
          {filterSidebar}
        </div>
      )}

      {/* Results Count */}
      <p className="mb-4 text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{filteredTools.length}</span> of{' '}
        <span className="font-semibold text-gray-900">{tools.length}</span> tools
      </p>

      {/* Main Layout */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Filter tools">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5">
            {filterSidebar}
          </div>
        </aside>

        {/* Tool Grid */}
        <div className="flex-1">
          {filteredTools.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
              <p className="text-lg font-medium text-gray-900">No tools found</p>
              <p className="mt-2 text-sm text-gray-600">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
