'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { AITool } from '@/data/tools';

interface SearchBarProps {
  tools: AITool[];
}

export default function SearchBar({ tools }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Filter tools based on debounced query
  const results = debouncedQuery.length >= 2
    ? tools
        .filter((tool) => {
          const q = debouncedQuery.toLowerCase();
          return (
            tool.name.toLowerCase().includes(q) ||
            tool.tagline.toLowerCase().includes(q) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(q))
          );
        })
        .slice(0, 8)
    : [];

  // Show dropdown when we have results
  useEffect(() => {
    setIsOpen(results.length > 0);
  }, [results.length]);

  // Close dropdown on click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <label htmlFor="search-tools" className="sr-only">
        Search AI tools
      </label>
      <div className="relative">
        {/* Magnifying glass icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
          id="search-tools"
          type="search"
          placeholder="Search AI tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <ul
          id="search-results"
          className="absolute z-40 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((tool) => (
            <li key={tool.slug} role="option" aria-selected={false}>
              <Link
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <span className="text-lg" aria-hidden="true">
                  {tool.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{tool.name}</p>
                  {tool.categories[0] && (
                    <p className="truncate text-xs text-gray-500">{tool.categories[0]}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
