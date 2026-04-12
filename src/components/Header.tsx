'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/tools', label: 'Tools' },
  { href: '/categories', label: 'Categories' },
  { href: '/compare', label: 'Compare' },
  { href: '/best', label: 'Best Of' },
  { href: '/for', label: 'Industries' },
  { href: '/blog', label: 'Blog' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-sm transition-colors ${
        scrolled ? 'border-black/10' : 'border-transparent'
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2563EB]" aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-gray-900">
            AI Business Alternative
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-[#2563EB] px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-blue-700"
          >
            Submit a tool
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-black/10 bg-white md:hidden" role="menu">
          <div className="space-y-0.5 px-4 py-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-md px-3 py-2 text-[13px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/contact"
                className="block rounded-md bg-[#2563EB] px-3 py-2 text-center text-[13px] font-medium text-white transition-colors hover:bg-blue-700"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit a tool
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
