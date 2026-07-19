import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Editorial Rebuild',
  description: 'How AI Business Alternative is rebuilding tool research around dated primary sources.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">About</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">A research catalog being rebuilt for traceability</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">AI Business Alternative began as a catalog of AI tools, comparisons, alternatives, buying guides, and industry stacks. An editorial audit found that the shared data does not retain a primary source and review date for each changing claim.</p>

      <section className="mt-12"><h2 className="text-2xl font-bold text-gray-950">What the audit found</h2><ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-700"><li>Catalog and buying-guide files contain hundreds of changeable price and current-product statements.</li><li>Ratings and rankings do not record a scoring source or dated evaluation.</li><li>Several guides used first-person testing language without a test record.</li><li>Commercial fields contain ordinary vendor destinations, not verified tracked affiliate URLs.</li></ul></section>

      <section className="mt-12"><h2 className="text-2xl font-bold text-gray-950">What is published now</h2><p className="mt-4 leading-7 text-gray-700">The project and trust pages explain the operating state. The <Link className="font-semibold text-blue-700 underline" href="/vs/buffer-vs-fiverr-social-media-manager">Buffer vs Fiverr social media comparison</Link> is the first buying page republished after a dated primary-source review. All remaining generated content routes stay in the noindex research archive.</p></section>

      <section className="mt-12"><h2 className="text-2xl font-bold text-gray-950">What qualifies for republication</h2><ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-gray-700"><li>Current official vendor identity and product page.</li><li>Primary sources for price, plan limits, features, privacy, and material restrictions.</li><li>A recorded review date and explicit limitations.</li><li>No first-person experience claim without a documented hands-on test.</li><li>Clear separation between sourced facts, comparisons, and editorial judgment.</li></ol></section>

      <section className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6"><h2 className="text-2xl font-bold text-gray-950">Monetization status</h2><p className="mt-3 leading-7 text-gray-700">The site does not currently run AdSense or a verified tracked affiliate link. If an affiliate program is approved later, the relationship and tracked placement will be disclosed. Approval will not replace the source and review-date requirements.</p></section>

      <p className="mt-12 text-gray-700">To report a factual problem or submit a primary source, use the <Link className="font-semibold text-blue-700 underline" href="/contact">contact page</Link>.</p>
    </article>
  );
}
