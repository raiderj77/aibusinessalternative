import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Business Alternative",
  description:
    "Privacy Policy for AI Business Alternative. Learn how we collect, use, and protect your personal information when you visit our AI tools directory.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-indigo-100">Last updated: April 6, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
          <p className="text-lg leading-relaxed mb-8">
            AI Business Alternative (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) operates the website aibusinessalternative.com
            (the &quot;Site&quot;). This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            Site. Please read this Privacy Policy carefully. By accessing or
            using the Site, you agree to the terms of this Privacy Policy.
          </p>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Information You Provide
            </h3>
            <p className="mb-4">
              We may collect information that you voluntarily provide when you
              interact with our Site, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Name and email address when you submit a contact form or sign up
                for a newsletter.
              </li>
              <li>
                Any messages, feedback, or other information you send to us
                through the Site.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Information Collected Automatically
            </h3>
            <p className="mb-4">
              When you visit our Site, certain information is collected
              automatically, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Device and browser information:</strong> IP address,
                browser type and version, operating system, device type, and
                screen resolution.
              </li>
              <li>
                <strong>Usage data:</strong> Pages visited, time spent on pages,
                referring URLs, click patterns, and navigation paths.
              </li>
              <li>
                <strong>Location data:</strong> Approximate geographic location
                based on your IP address.
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To operate, maintain, and improve the Site and its content.</li>
              <li>To respond to your inquiries, comments, or requests.</li>
              <li>
                To analyze usage trends and user behavior to enhance the user
                experience.
              </li>
              <li>
                To serve relevant advertisements through third-party advertising
                partners.
              </li>
              <li>
                To detect, prevent, and address technical issues or security
                threats.
              </li>
              <li>
                To comply with applicable legal obligations and enforce our
                terms of service.
              </li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              Our Site uses cookies and similar tracking technologies to collect
              and store certain information. Cookies are small data files placed
              on your device that help us improve the Site and your experience.
            </p>
            <p className="mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Essential cookies:</strong> Required for the Site to
                function properly and cannot be disabled.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how
                visitors interact with the Site by collecting information
                anonymously.
              </li>
              <li>
                <strong>Advertising cookies:</strong> Used by our advertising
                partners to serve relevant advertisements and track ad campaign
                performance.
              </li>
            </ul>
            <p className="mb-4">
              We work with third-party advertising partners, including Google,
              who may use cookies to serve ads based on your prior visits to
              this website or other websites.
            </p>
            <p className="mb-4">
              You can control cookies through your browser settings. Please note
              that disabling certain cookies may affect the functionality of the
              Site.
            </p>
          </section>

          {/* Google AdSense */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Google AdSense
            </h2>
            <p className="mb-4">
              We use Google AdSense (Publisher ID: pub-7171402107622932) to
              display advertisements on our Site. Google AdSense uses cookies to
              serve ads based on your prior visits to our Site and other
              websites. Google&apos;s use of advertising cookies enables it and
              its partners to serve ads based on your browsing history.
            </p>
            <p className="mb-4">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://ads.google.com/settings"
                className="text-indigo-600 hover:text-indigo-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . You may also opt out of interest-based advertising from
              participating companies by visiting{" "}
              <a
                href="https://optout.aboutads.info"
                className="text-indigo-600 hover:text-indigo-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                optout.aboutads.info
              </a>
              . Alternatively, you may opt out of third-party vendor cookies by
              visiting the{" "}
              <a
                href="https://optout.networkadvertising.org/"
                className="text-indigo-600 hover:text-indigo-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Network Advertising Initiative opt-out page
              </a>
              .
            </p>
          </section>

          {/* Affiliate Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Affiliate Links
            </h2>
            <p className="mb-4">
              Our Site contains affiliate links to third-party products and
              services. When you click on an affiliate link and make a purchase,
              we may earn a commission at no additional cost to you. These
              affiliate links may use cookies to track referrals and attribute
              sales.
            </p>
            <p className="mb-4">
              Affiliate relationships do not influence our editorial content,
              reviews, or rankings. Our recommendations are based on independent
              evaluation and analysis.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Third-Party Services
            </h2>
            <p className="mb-4">
              We use the following third-party services that may collect
              information about you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to
                analyze website traffic and usage patterns. Google Analytics
                collects information such as how often users visit the Site,
                what pages they visit, and what other sites they visited prior
                to coming to our Site. For more information, please review{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google AdSense:</strong> As described in Section 4
                above.
              </li>
              <li>
                <strong>Affiliate networks:</strong> Various affiliate networks
                and programs may place cookies on your device to track referrals.
              </li>
            </ul>
            <p>
              These third-party services have their own privacy policies, and we
              encourage you to review them. We do not control and are not
              responsible for the privacy practices of third-party services.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Data Security
            </h2>
            <p className="mb-4">
              We implement reasonable administrative, technical, and physical
              security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or method of
              electronic storage is completely secure. While we strive to use
              commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Your Rights
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              General Rights
            </h3>
            <p className="mb-4">
              Depending on your jurisdiction, you may have certain rights
              regarding your personal information, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>
                Request correction of inaccurate or incomplete personal
                information.
              </li>
              <li>
                Request deletion of your personal information, subject to
                certain exceptions.
              </li>
              <li>Object to or restrict the processing of your personal data.</li>
              <li>
                Request portability of your personal data in a structured,
                commonly used format.
              </li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Rights Under the GDPR (European Economic Area)
            </h3>
            <p className="mb-4">
              If you are a resident of the European Economic Area (EEA), you
              have the right to access, rectify, or erase your personal data;
              restrict or object to processing; and data portability. You also
              have the right to lodge a complaint with your local data
              protection authority. We process your data based on legitimate
              interests, consent, or contractual necessity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Rights Under the CCPA (California)
            </h3>
            <p className="mb-4">
              If you are a California resident, the California Consumer Privacy
              Act (CCPA) provides you with the right to know what personal
              information is collected, disclosed, or sold; the right to request
              deletion of your personal information; and the right to opt out of
              the sale of your personal information. We do not sell personal
              information as defined under the CCPA.
            </p>
            <p>
              To exercise any of these rights, please contact us using the
              information provided in the Contact section below.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="mb-4">
              Our Site is not directed to children under the age of 13, and we
              do not knowingly collect personal information from children under
              13. If we become aware that we have inadvertently collected
              personal information from a child under 13, we will take
              reasonable steps to delete such information promptly. If you
              believe we have collected information from a child under 13,
              please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We reserve the right to update or modify this Privacy Policy at
              any time. When we make changes, we will revise the &quot;Last
              updated&quot; date at the top of this page. We encourage you to
              review this Privacy Policy periodically to stay informed about how
              we are protecting your information. Your continued use of the Site
              following the posting of changes constitutes your acceptance of
              those changes.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us through
              our{" "}
              <a
                href="/contact"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
