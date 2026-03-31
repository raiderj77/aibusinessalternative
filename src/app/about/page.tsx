import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AI Business Alternative | Our Mission & Process",
  description:
    "Learn about AI Business Alternative — an independent AI tools directory helping small business owners find the right AI solutions through honest reviews, comparisons, and guides.",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aibusinessalternative.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://aibusinessalternative.com/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div className="bg-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About AI Business Alternative
            </h1>
            <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
              Your independent guide to finding the right AI tools for your
              business.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Our Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AI Business Alternative exists to help small business owners,
              entrepreneurs, and teams navigate the rapidly expanding world of
              AI-powered tools. With hundreds of new AI products launching every
              month, choosing the right solution can feel overwhelming.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We cut through the noise by providing clear, practical information
              about AI tools across every business category — from content
              creation and customer service to accounting, marketing, and
              operations. Our goal is simple: help you make informed decisions so
              you can save time, reduce costs, and grow your business with the
              right AI solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you are a solo founder looking for your first AI writing
              assistant or a growing team evaluating enterprise-grade platforms,
              AI Business Alternative is here to guide you.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Independent Reviews
                </h3>
                <p className="text-gray-600">
                  In-depth, hands-on reviews of AI tools covering features,
                  pricing, usability, and real-world performance for business
                  use cases.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Side-by-Side Comparisons
                </h3>
                <p className="text-gray-600">
                  Detailed comparison guides that put competing AI tools head to
                  head, making it easy to see which solution fits your needs and
                  budget.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Practical Guides
                </h3>
                <p className="text-gray-600">
                  Step-by-step guides and resources to help you understand AI
                  categories, evaluate options, and implement tools effectively
                  in your workflow.
                </p>
              </div>
            </div>
          </section>

          {/* Our Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Evaluation Process
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every AI tool featured on AI Business Alternative goes through a
              consistent evaluation process. We assess each tool across five key
              dimensions:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Features & Capabilities",
                  desc: "We examine the core feature set, unique capabilities, integrations, and how well the tool delivers on its promises.",
                },
                {
                  title: "Pricing & Value for Money",
                  desc: "We break down pricing tiers, free plans, trial periods, and per-user costs to determine whether a tool delivers real value at its price point.",
                },
                {
                  title: "Ease of Use",
                  desc: "We evaluate the onboarding experience, interface design, learning curve, and documentation quality — because a powerful tool is only useful if your team can actually use it.",
                },
                {
                  title: "Customer Support",
                  desc: "We look at available support channels, response times, knowledge bases, and community resources.",
                },
                {
                  title: "Overall Value",
                  desc: "We weigh all factors together to determine how well a tool serves its target audience, considering the balance of quality, price, and usability.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 bg-gray-50 rounded-lg p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial Independence */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Editorial Independence
            </h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>We do not accept payment for rankings or reviews.</strong>{" "}
                Our editorial content is produced independently, and no AI tool
                company can pay to be ranked higher, receive a better score, or
                influence our recommendations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                AI Business Alternative may earn revenue through affiliate links
                and advertising. When you click certain links on our site and
                make a purchase, we may receive a commission at no additional
                cost to you. However, these relationships never influence our
                reviews, rankings, or recommendations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment is to you — the reader. We believe that honest,
                unbiased information is the foundation of good decision-making,
                and we hold ourselves to that standard in every piece of content
                we publish.
              </p>
            </div>
          </section>

          {/* Built By */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AI Business Alternative is built and maintained by an experienced
              web professional with a passion for helping small businesses
              leverage technology effectively. Our team combines deep technical
              knowledge with real-world business experience to deliver
              trustworthy, practical AI tool recommendations.
            </p>
          </section>

          {/* Contact CTA */}
          <section className="bg-indigo-700 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Have Questions or Suggestions?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              We would love to hear from you. Whether you want to suggest a tool
              for review, report an issue, or explore a partnership, get in
              touch.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Contact Us
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
