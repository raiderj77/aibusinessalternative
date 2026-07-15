import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsConsent from '@/components/AnalyticsConsent';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aibusinessalternative.com'),
  title: 'AI Business Alternative, Find the Right AI Tool',
  description:
    'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to find the best AI tool for your business needs.',
  openGraph: {
    title: 'AI Business Alternative, Find the Right AI Tool',
    description:
      'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to make the right choice.',
    url: 'https://aibusinessalternative.com',
    siteName: 'AI Business Alternative',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Alternative, Find the Right AI Tool',
    description:
      'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to make the right choice.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large' as const,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'vYhSVaGVGRflRHrKZof-mI-8_Jqa_VCyjOvq-nrGJgM',
    other: {
      'msvalidate.01': ['C4C9B6256BDEDED169E4DE01CA953390'],
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-7171402107622932',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Business Alternative',
  url: 'https://aibusinessalternative.com',
  logo: 'https://aibusinessalternative.com/logo.png',
  description:
    'The trusted directory of 500+ AI tools for small business owners and solopreneurs.',
  dateModified: new Date().toISOString().substring(0,10),
  sameAs: [],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Business Alternative',
  url: 'https://aibusinessalternative.com',
  dateModified: new Date().toISOString().substring(0,10),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://aibusinessalternative.com/tools?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-sans)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
