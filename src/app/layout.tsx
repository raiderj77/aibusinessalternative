import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Business Alternative — Find the Right AI Tool for Every Job',
  description:
    'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to find the best AI tool for your business needs.',
  openGraph: {
    title: 'AI Business Alternative — Find the Right AI Tool for Every Job',
    description:
      'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to make the right choice.',
    url: 'https://aibusinessalternative.com',
    siteName: 'AI Business Alternative',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Alternative — Find the Right AI Tool for Every Job',
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
  other: {
    'google-adsense-account': 'ca-pub-7171402107622932',
    'msvalidate.01': 'C4C9B6256BDEDED169E4DE01CA953390',
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
  sameAs: [],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Business Alternative',
  url: 'https://aibusinessalternative.com',
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
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Google Consent Mode v2 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7171402107622932"
          crossOrigin="anonymous"
        />
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
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
