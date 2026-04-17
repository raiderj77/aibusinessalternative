import type { Metadata } from 'next';
import Link from 'next/link';
import { stacks } from '@/lib/stacks';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stack = stacks.find((s) => s.slug === slug);
  if (!stack) return {};

  return {
    title: `${stack.name} — AI Tools for ${stack.bestFor} | AI Business Alternative`,
    description: `${stack.description} Includes: ${stack.tools.map((t) => t.name).join(', ')}. Full pricing breakdown inside.`,
    keywords: `${stack.name.toLowerCase()}, AI tools, ${stack.bestFor.toLowerCase()}`,
    alternates: {
      canonical: `https://aibusinessalternative.com/stacks/${stack.slug}`,
    },
    openGraph: {
      title: `${stack.name} — AI Tool Stack`,
      description: stack.description,
      url: `https://aibusinessalternative.com/stacks/${stack.slug}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return stacks.map((stack) => ({
    slug: stack.slug,
  }));
}

export default async function StackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stack = stacks.find((s) => s.slug === slug);

  if (!stack) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: stack.name,
            description: stack.description,
            url: `https://aibusinessalternative.com/stacks/${stack.slug}`,
            mainEntity: {
              '@type': 'Thing',
              name: stack.name,
              description: stack.description,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aibusinessalternative.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'AI Tool Stacks',
                item: 'https://aibusinessalternative.com/stacks',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: stack.name,
                item: `https://aibusinessalternative.com/stacks/${stack.slug}`,
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-sm text-slate-600 mb-8">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/stacks" className="hover:text-slate-900">AI Tool Stacks</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{stack.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {stack.name}
            </h1>
            <p className="text-xl text-slate-600 mb-6">{stack.description}</p>
            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg">
              <div>
                <p className="text-sm text-slate-600 mb-1">Best for</p>
                <p className="text-lg font-semibold text-slate-900">{stack.bestFor}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Estimated monthly cost</p>
                <p className="text-lg font-semibold text-slate-900">
                  ${stack.estimatedMonthlyCost.low} — ${stack.estimatedMonthlyCost.high}
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tools Included</h2>
            <div className="space-y-6">
              {stack.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="border border-slate-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        <Link href={tool.url} target="_blank" className="hover:text-blue-600">
                          {tool.name}
                        </Link>
                      </h3>
                      <p className="text-slate-600">{tool.purpose}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                      tool.tier === 'free'
                        ? 'bg-green-100 text-green-800'
                        : tool.tier === 'paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {tool.tier === 'free' ? 'Free' : tool.tier === 'paid' ? 'Paid' : 'Freemium'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{tool.pricing}</p>
                  <Link
                    href={tool.url}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Visit {tool.name} →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Related Stacks */}
          <div className="border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Stacks</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {stacks
                .filter((s) => s.slug !== stack.slug)
                .slice(0, 4)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/stacks/${s.slug}`}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                      {s.name}
                    </h3>
                    <p className="text-sm text-slate-600">${s.estimatedMonthlyCost.low} — ${s.estimatedMonthlyCost.high}/mo</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
