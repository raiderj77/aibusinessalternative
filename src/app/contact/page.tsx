import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | AI Business Alternative",
  description:
    "Get in touch with AI Business Alternative. Submit a tool for review, report an issue, explore partnerships, or ask a general question.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
            Have a question, suggestion, or want to work with us? We would love
            to hear from you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we will get back to you as soon as
              possible. We typically respond within 48 hours.
            </p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Submit a Tool */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Submit a Tool
              </h3>
              <p className="text-gray-600 text-sm">
                Know of an AI tool that should be featured on our site? We are
                always looking to expand our directory. Use the contact form and
                select &quot;Submit a Tool&quot; as the subject. Please include
                the tool name, website URL, a brief description of what it does,
                and the business category it fits into. Our editorial team will
                review your submission and may feature it in our directory.
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mb-4">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Response Time
              </h3>
              <p className="text-gray-600 text-sm">
                We typically respond within 48 hours during business days. For
                urgent matters, please indicate so in your message.
              </p>
            </div>

            {/* Partnerships */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Partnerships
              </h3>
              <p className="text-gray-600 text-sm">
                Interested in partnering with AI Business Alternative? Select
                &quot;Partnership&quot; in the subject dropdown and tell us
                about your proposal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
