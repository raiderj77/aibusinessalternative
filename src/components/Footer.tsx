import Link from 'next/link';

const categoryLinks = [
  { slug: 'writing', label: 'AI Writing & Content' },
  { slug: 'image-generation', label: 'AI Image Generation' },
  { slug: 'video-creation', label: 'AI Video Creation' },
  { slug: 'coding', label: 'AI Coding & Development' },
  { slug: 'marketing', label: 'AI Marketing & SEO' },
  { slug: 'customer-service', label: 'AI Customer Service' },
  { slug: 'productivity', label: 'AI Productivity' },
  { slug: 'design', label: 'AI Design & Creative' },
  { slug: 'business-intelligence', label: 'AI Business Intelligence' },
  { slug: 'audio-voice', label: 'AI Audio & Voice' },
  { slug: 'research', label: 'AI Research & Knowledge' },
  { slug: 'ai-agents', label: 'AI Agents & Automation' },
] as const;

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/blog', label: 'Blog' },
] as const;

const sisterSites = [
  { href: 'https://fibertools.app', label: 'FiberTools' },
  { href: 'https://mindchecktools.com', label: 'MindCheck Tools' },
  { href: 'https://flipmycase.com', label: 'FlipMyCase' },
  { href: 'https://creatorrevenuecalculator.com', label: 'Creator Revenue Calculator' },
  { href: 'https://contractextract.com', label: 'ContractExtract' },
  { href: 'https://medicalbillreader.com', label: 'Medical Bill Reader' },
  { href: 'https://taxbreaktools.com', label: 'TaxBreakTools' },
  { href: 'https://524tracker.com', label: '524Tracker' },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Categories
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              {categoryLinks.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    href={`/categories/${slug}`}
                    className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Free Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              More Free Tools
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              {sisterSites.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              About
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              AI Business Alternative is the trusted directory of AI tools for small business owners
              and solopreneurs. We independently review and compare tools to help you find the right
              AI solution.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 AI Business Alternative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
