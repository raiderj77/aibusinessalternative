import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Business Alternative - Editorial Research Rebuild',
  description: 'AI tool records and comparisons undergoing dated primary-source review before publication.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <section className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950">
        <strong>Editorial rebuild:</strong> one source-checked comparison is published; generated reviews, rankings, and unsourced buying pages remain paused.
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-28">
        <div className="container-custom mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">AI purchasing research</p>
          <h1 className="font-display text-5xl leading-tight tracking-tight text-gray-950 sm:text-6xl">
            Verify the tool before you buy it.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600">
            AI products, prices, plan limits, and vendor terms change quickly. AI Business Alternative publishes a buying page only after its material claims are checked against dated primary sources.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/about" className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">Read the editorial standard</Link>
            <Link href="/contact" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">Report a correction</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-gray-50 py-12">
        <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['78', 'catalog records under review'],
            ['204', 'stored commercial URL fields checked'],
            ['0', 'verified tracked affiliate URLs'],
            ['1', 'source-checked comparison published'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <strong className="block text-3xl text-gray-950">{value}</strong>
              <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Reviewed buying decision</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">Buffer software or a Fiverr social media manager?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              Compare current Buffer pricing and published capabilities with Fiverr&apos;s seller-defined packages, buyer fees, and freelancer-vetting workflow. Every changing claim includes an official source and July 19, 2026 review date.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm leading-6 text-gray-700">The provider links are ordinary vendor links. The Fiverr affiliate application is pending, and the page earns no commission.</p>
            <Link href="/vs/buffer-vs-fiverr-social-media-manager" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
              Read the reviewed comparison
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Why the archive is paused</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">The existing data cannot support current buying claims</h2>
            <p className="mt-4 leading-7 text-gray-600">
              The catalog stores tool descriptions, ratings, rankings, prices, feature claims, and commercial destinations, but it does not attach a primary source and review date to each changing fact. Shared buying-guide data also contained unsupported first-person testing language.
            </p>
            <p className="mt-4 leading-7 text-gray-600">
              Those pages remain reachable for navigation, but they are excluded from search indexing and replaced with a research-status notice until a documented review is complete.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-950">Publication requirements</h2>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-gray-700">
              <li><strong>1. Identify the exact product and official vendor.</strong></li>
              <li><strong>2. Cite current first-party feature, price, and policy pages.</strong></li>
              <li><strong>3. Record what was checked and the review date.</strong></li>
              <li><strong>4. Separate sourced facts from editorial judgment.</strong></li>
              <li><strong>5. Recheck changing details before recommending a purchase.</strong></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-blue-950 py-16 text-white">
        <div className="container-custom max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Commercial transparency</p>
          <h2 className="mt-3 text-3xl font-bold">Vendor links are not affiliate links</h2>
          <p className="mt-4 leading-7 text-blue-100">
            The current commercial destinations are ordinary vendor URLs. No accessible tracked affiliate URL or approval credential was found. A future affiliate relationship must be approved, use a verified tracked destination, and be disclosed beside the relevant recommendation.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-950">Research archive</h2>
          <p className="mt-2 max-w-2xl text-gray-600">These route families are retained while their underlying claims are rebuilt. They are not current recommendations.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['/tools', 'Tool records'], ['/categories', 'Category collections'], ['/compare', 'Tool comparisons'],
              ['/vs', 'AI vs. service comparisons'], ['/best', 'Buying guides'], ['/alternatives/chatgpt', 'Alternative lists'],
              ['/for', 'Industry guides'], ['/stacks', 'Software stacks'], ['/blog', 'Article archive'],
            ].map(([href, label]) => <Link key={href} href={href} className="rounded-lg border border-gray-200 p-4 text-sm font-semibold text-blue-700 hover:border-blue-300 hover:bg-blue-50">{label} →</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
