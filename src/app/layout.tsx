import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  title: 'AI Business Alternative — Find the Right AI Tool',
  description:
    'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to find the best AI tool for your business needs.',
  openGraph: {
    title: 'AI Business Alternative — Find the Right AI Tool',
    description:
      'The trusted directory of 500+ AI tools for small business owners and solopreneurs. Compare features, pricing, and reviews to make the right choice.',
    url: 'https://aibusinessalternative.com',
    siteName: 'AI Business Alternative',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Alternative — Find the Right AI Tool',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const gpcHeader = headersList.get('sec-gpc') === '1';

  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
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
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
        {/* Google Analytics GA4, Microsoft Clarity, Google AdSense — skip on GPC */}
        {!gpcHeader && (
          <>
            {/* Google Analytics GA4 */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-YCXZXYNF14"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-YCXZXYNF14');`}
            </Script>
            {/* Microsoft Clarity */}
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","vsqobt7va0");`}
            </Script>
            {/* Google AdSense */}
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7171402107622932"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
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
        {/* Client-side GPC fallback for navigator.globalPrivacyControl */}
        <Script
          id="gpc-client-check"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!!navigator.globalPrivacyControl || document.cookie.indexOf('empire_gpc=1') !== -1) {
                    if (typeof gtag === 'function') {
                      gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'analytics_storage': 'denied',
                        'personalization_storage': 'denied',
                      });
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-sans)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
