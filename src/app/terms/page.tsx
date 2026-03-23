import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AI Business Alternative",
  description:
    "Terms of Service for AI Business Alternative. Read the terms and conditions governing your use of our AI tools directory and comparison website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-indigo-100">Last updated: March 22, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
          <p className="text-lg leading-relaxed mb-8">
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using the website aibusinessalternative.com (the
            &quot;Site&quot;) operated by AI Business Alternative
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing
            or using the Site, you agree to be bound by these Terms.
          </p>

          {/* Acceptance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing, browsing, or using this Site, you acknowledge that
              you have read, understood, and agree to be bound by these Terms
              and our{" "}
              <a
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Privacy Policy
              </a>
              , which is incorporated herein by reference. If you do not agree
              to these Terms, you must not access or use the Site.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting to the Site. Your
              continued use of the Site after any modifications constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          {/* Use of Service */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Use of the Service
            </h2>
            <p className="mb-4">
              AI Business Alternative provides an AI tools directory,
              comparison content, reviews, guides, and related informational
              resources. The content on this Site is intended for general
              informational purposes only and does not constitute professional
              advice of any kind.
            </p>
            <p className="mb-4">
              You agree to use the Site only for lawful purposes and in
              accordance with these Terms. You are granted a limited,
              non-exclusive, non-transferable, revocable license to access and
              use the Site for personal, non-commercial informational purposes.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Intellectual Property
            </h2>
            <p className="mb-4">
              All content on the Site, including but not limited to text,
              graphics, logos, images, data compilations, software, and the
              overall design and arrangement thereof, is the property of AI
              Business Alternative or its content providers and is protected by
              United States and international copyright, trademark, and other
              intellectual property laws.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, publicly perform, republish, download,
              store, or transmit any content from this Site without our prior
              written consent, except as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                You may temporarily store copies of materials in your
                computer&apos;s RAM incidental to your accessing and viewing
                those materials.
              </li>
              <li>
                You may store files that are automatically cached by your web
                browser for display enhancement purposes.
              </li>
              <li>
                You may print or download one copy of a reasonable number of
                pages for your own personal, non-commercial use and not for
                further reproduction, publication, or distribution.
              </li>
            </ul>
          </section>

          {/* User Conduct */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. User Conduct
            </h2>
            <p className="mb-4">
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Using the Site for any unlawful purpose or in violation of any
                applicable local, state, national, or international law.
              </li>
              <li>
                Attempting to gain unauthorized access to any portion of the
                Site, other accounts, computer systems, or networks connected to
                the Site.
              </li>
              <li>
                Using any robot, spider, scraper, or other automated means to
                access the Site for any purpose without our express written
                permission.
              </li>
              <li>
                Interfering with or disrupting the Site or the servers and
                networks connected to the Site.
              </li>
              <li>
                Transmitting any viruses, worms, defects, Trojan horses, or
                other items of a destructive nature.
              </li>
              <li>
                Impersonating any person or entity, or falsely stating or
                misrepresenting your affiliation with a person or entity.
              </li>
              <li>
                Collecting or storing personal data about other users without
                their consent.
              </li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Disclaimers
            </h2>
            <div className="bg-gray-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-4">
              <p className="mb-4">
                THE SITE AND ALL CONTENT, MATERIALS, AND INFORMATION PROVIDED ON
                THE SITE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED.
              </p>
              <p className="mb-4">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, AI BUSINESS
                ALTERNATIVE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE,
                OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SITE
                OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS.
              </p>
            </div>
            <p>
              The reviews, comparisons, and recommendations on this Site
              represent our editorial opinions and analysis. Individual results
              may vary. We encourage you to conduct your own research and due
              diligence before making any purchasing decisions.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="mb-4">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL AI BUSINESS ALTERNATIVE, ITS AFFILIATES, OR THEIR
              RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
              GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN
              CONNECTION WITH:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your access to or use of (or inability to access or use) the Site.</li>
              <li>Any content, materials, or information obtained from the Site.</li>
              <li>
                Any conduct or content of any third party on or related to the
                Site.
              </li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content.
              </li>
              <li>
                Any purchasing decisions made based on information provided on
                the Site.
              </li>
            </ul>
          </section>

          {/* Affiliate Links Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Affiliate Links Disclosure
            </h2>
            <p className="mb-4">
              AI Business Alternative participates in various affiliate
              marketing programs. This means that we may earn commissions on
              qualifying purchases made through links on our Site to retailer
              and service provider websites. These commissions come at no
              additional cost to you.
            </p>
            <p className="mb-4">
              Affiliate relationships do not influence our editorial content,
              tool ratings, or recommendations. All opinions expressed on the
              Site are our own, and we only recommend products and services that
              we believe provide genuine value to our readers.
            </p>
            <p>
              For transparency, pages containing affiliate links will be
              identified accordingly. We encourage you to review the terms and
              privacy policies of any third-party sites you visit through our
              affiliate links.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Third-Party Links
            </h2>
            <p className="mb-4">
              The Site may contain links to third-party websites, services, or
              resources that are not owned or controlled by AI Business
              Alternative. We have no control over, and assume no responsibility
              for, the content, privacy policies, or practices of any
              third-party websites or services.
            </p>
            <p>
              The inclusion of any link does not imply endorsement,
              recommendation, or approval by AI Business Alternative. You
              acknowledge and agree that we are not responsible or liable,
              directly or indirectly, for any damage or loss caused or alleged
              to be caused by or in connection with the use of or reliance on
              any content, goods, or services available on or through any such
              third-party websites or services.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Modifications to the Site and Terms
            </h2>
            <p className="mb-4">
              We reserve the right to modify, suspend, or discontinue the Site
              (or any part thereof) at any time, with or without notice. We
              shall not be liable to you or any third party for any
              modification, suspension, or discontinuation of the Site.
            </p>
            <p>
              We may revise these Terms from time to time. The most current
              version will always be posted on this page with an updated
              &quot;Last updated&quot; date. By continuing to access or use the
              Site after those revisions become effective, you agree to be bound
              by the revised Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Governing Law
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to its conflict of
              law provisions. Any legal action or proceeding arising under these
              Terms shall be brought exclusively in the federal or state courts,
              and you hereby consent to the personal jurisdiction and venue
              therein.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be unenforceable or
              invalid under any applicable law, such unenforceability or
              invalidity shall not render these Terms unenforceable or invalid
              as a whole. Such provisions shall be deleted without affecting the
              remaining provisions herein.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us through our{" "}
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
