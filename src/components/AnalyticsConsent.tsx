'use client';

import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-YCXZXYNF14';
const STORAGE_KEY = 'ai_business_analytics_consent_v1';
const SCRIPT_ID = 'google-analytics-script';

type ConsentChoice = 'granted' | 'denied';
type GtagArguments = [command: string, action: string | Date, params?: Record<string, unknown>];
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: GtagArguments) => void;
};

function analyticsWindow(): AnalyticsWindow {
  return window as AnalyticsWindow;
}

function initializeConsentMode() {
  const currentWindow = analyticsWindow();
  currentWindow.dataLayer = currentWindow.dataLayer || [];
  currentWindow.gtag =
    currentWindow.gtag ||
    ((...args: GtagArguments) => {
      currentWindow.dataLayer?.push(args);
    });

  currentWindow.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
}

function updateAnalyticsConsent(choice: ConsentChoice) {
  analyticsWindow().gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: choice,
  });
}

function loadGoogleAnalytics() {
  const currentWindow = analyticsWindow();
  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  currentWindow.gtag?.('js', new Date());
  currentWindow.gtag?.('config', GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
}

function clearAnalyticsCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (name === '_ga' || name?.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.aibusinessalternative.com; SameSite=Lax`;
    }
  });
}

function isSafeEventValue(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z0-9-]{1,80}$/.test(value);
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    initializeConsentMode();

    let savedChoice: ConsentChoice | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      savedChoice = stored === 'granted' || stored === 'denied' ? stored : null;
    } catch {
      savedChoice = null;
    }

    const privacySignal =
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true ||
      navigator.doNotTrack === '1';
    const initialChoice = savedChoice || (privacySignal ? 'denied' : null);

    setChoice(initialChoice);
    if (initialChoice === 'granted') {
      updateAnalyticsConsent('granted');
      loadGoogleAnalytics();
    } else if (initialChoice === 'denied') {
      updateAnalyticsConsent('denied');
    } else {
      setShowChoices(true);
    }

    const handleCommercialClick = (event: Event) => {
      let storedChoice: string | null = null;
      try {
        storedChoice = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        return;
      }
      if (storedChoice !== 'granted') return;

      const detail = (event as CustomEvent).detail as
        | { toolSlug?: unknown; placement?: unknown }
        | undefined;
      if (!isSafeEventValue(detail?.toolSlug) || !isSafeEventValue(detail?.placement)) return;

      analyticsWindow().gtag?.('event', 'commercial_outbound_click', {
        tool_slug: detail.toolSlug,
        placement: detail.placement,
        transport_type: 'beacon',
      });
    };

    window.addEventListener('commercial-outbound-click', handleCommercialClick);
    return () => window.removeEventListener('commercial-outbound-click', handleCommercialClick);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextChoice);
    } catch {
      // Consent remains effective for this page even if storage is unavailable.
    }
    setChoice(nextChoice);
    setShowChoices(false);
    updateAnalyticsConsent(nextChoice);
    if (nextChoice === 'granted') {
      loadGoogleAnalytics();
    } else {
      clearAnalyticsCookies();
      if (choice === 'granted') {
        window.location.reload();
      }
    }
  };

  if (!showChoices) {
    return (
      <button
        type="button"
        className="fixed bottom-3 left-3 z-50 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setShowChoices(true)}
        aria-label={`Privacy choices. Analytics is currently ${choice || 'not selected'}.`}
      >
        Privacy choices
      </button>
    );
  }

  return (
    <section
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-5"
      aria-label="Analytics privacy choices"
      role="dialog"
      aria-modal="false"
    >
      <h2 className="text-base font-semibold text-gray-900">Your analytics choice</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        We use Google Analytics only if you accept. It helps us count useful pages and tool visits.
        Advertising storage and personalization remain off. Declining does not limit the site.
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <a
          href="/privacy"
          className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Privacy details
        </a>
        <button
          type="button"
          className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => saveChoice('denied')}
        >
          Decline analytics
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => saveChoice('granted')}
        >
          Accept analytics
        </button>
      </div>
    </section>
  );
}
