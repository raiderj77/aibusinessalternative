import Link from 'next/link';

export default function ResearchArchive({ section }: { section: string }) {
  const verb = section.startsWith('This ') ? 'is' : 'are';

  return (
    <section className="min-h-[65vh] bg-gray-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-300 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Noindex research archive</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">{section} {verb} under editorial review</h1>
        <p className="mt-5 leading-7 text-gray-700">The underlying content contains changing product, price, feature, rating, ranking, or performance claims without a primary source and review date attached to each material fact. It is not being presented as a current buying recommendation.</p>
        <p className="mt-4 leading-7 text-gray-700">This route will be republished only after its vendor sources, review date, limitations, and commercial-link status are recorded.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">Return to the research status</Link>
          <Link href="/contact" className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">Submit a correction or source</Link>
        </div>
      </div>
    </section>
  );
}
