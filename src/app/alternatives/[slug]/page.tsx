import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools, getToolBySlug, type AITool } from '@/data/tools';
import { getAlternativeContent } from '@/lib/alternativesContent';
import RatingStars from '@/components/RatingStars';
import PricingBadge from '@/components/PricingBadge';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AnswerBlock from '@/components/AnswerBlock';

export const revalidate = 86400;

const SLUGS = [
  'chatgpt',
  'midjourney',
  'jasper-ai',
  'github-copilot',
  'grammarly-business',
  'canva-ai',
] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = `Best Alternatives to ${tool.name} in 2026 | AI Business Alternative`;
  const description = `Compare the best alternatives to ${tool.name} for your business. Side-by-side pricing, features, and ratings to help you find the right AI tool.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://aibusinessalternative.com/alternatives/${slug}`,
      siteName: 'AI Business Alternative',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://aibusinessalternative.com/alternatives/${slug}`,
    },
  };
}

/** Helper: get alternative tools for a subject tool */
function getAlternativeTools(subjectSlug: string) {
  const subject = getToolBySlug(subjectSlug);
  if (!subject) return [];

  // Start with the tool's declared alternatives
  const altSlugs = subject.alternatives ?? [];
  const altTools = altSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is AITool => t !== undefined && t.slug !== subjectSlug);

  // If we have fewer than 6, pad from the same category
  if (altTools.length < 6) {
    const subjectCategories = subject.categories;
    const existingSlugs = new Set([subjectSlug, ...altTools.map((t) => t.slug)]);
    for (const tool of tools) {
      if (altTools.length >= 8) break;
      if (existingSlugs.has(tool.slug)) continue;
      if (tool.categories.some((c) => subjectCategories.includes(c))) {
        altTools.push(tool);
        existingSlugs.add(tool.slug);
      }
    }
  }

  return altTools.slice(0, 8);
}

/** Helper: generate FAQ items */
function generateFAQItems(toolName: string, alternatives: { name: string; pricing: string; price?: string }[]) {
  const cheapest = [...alternatives].sort((a, b) => {
    const order = { free: 0, freemium: 1, 'free-trial': 2, paid: 3 };
    return (order[a.pricing as keyof typeof order] ?? 3) - (order[b.pricing as keyof typeof order] ?? 3);
  })[0];

  const freeAlts = alternatives.filter((a) => a.pricing === 'free' || a.pricing === 'freemium');
  const freeAltName = freeAlts.length > 0 ? freeAlts[0].name : alternatives[0]?.name ?? 'several tools';

  const topAlt = alternatives[0]?.name ?? 'other tools';

  return [
    {
      question: `What is the best free alternative to ${toolName}?`,
      answer: `${freeAltName} is one of the best free alternatives to ${toolName}. It offers a generous free tier that covers core functionality for individuals and small teams. ${freeAlts.length > 1 ? `Other free options include ${freeAlts.slice(1, 3).map((a) => a.name).join(' and ')}.` : ''} Keep in mind that free tiers often have usage limits, so evaluate whether the free plan covers your typical workload before committing.`,
    },
    {
      question: `Is ${topAlt} better than ${toolName}?`,
      answer: `Whether ${topAlt} is better than ${toolName} depends on your specific needs. ${topAlt} may excel in certain areas like pricing, specific features, or integrations, while ${toolName} may be stronger in others. We recommend trying both tools with your actual workflow before deciding. The comparison table above highlights the key differences in pricing, ratings, and core strengths to help you make an informed choice.`,
    },
    {
      question: `Why switch from ${toolName}?`,
      answer: `Common reasons businesses switch from ${toolName} include pricing concerns as teams scale, the need for features that ${toolName} does not prioritize, better integration with existing tools and workflows, or a desire for more specialized capabilities. Some users also switch to reduce vendor lock-in or to find a tool that better matches their specific industry or use case. Review the alternatives above to see which gaps each tool addresses.`,
    },
    {
      question: `What is the cheapest alternative to ${toolName}?`,
      answer: `${cheapest?.name ?? 'Several alternatives'} offers the most affordable pricing among ${toolName} alternatives${cheapest?.price ? `, starting at ${cheapest.price}` : ''}. However, the cheapest option is not always the best value. Consider what features you actually need, how many team members will use the tool, and whether a slightly higher price delivers significantly better results for your business.`,
    },
    {
      question: `Can I use ${toolName} alternatives for business?`,
      answer: `Yes, all the alternatives listed above are suitable for business use. Many offer dedicated business or enterprise plans with features like team collaboration, admin controls, SSO, and priority support. When evaluating alternatives for your business, pay attention to data privacy policies, compliance certifications, and whether the tool offers the integrations your team relies on daily.`,
    },
  ];
}

/** Pricing label helper */
function pricingLabel(pricing: string): string {
  switch (pricing) {
    case 'free':
      return 'Free';
    case 'freemium':
      return 'Freemium';
    case 'paid':
      return 'Paid';
    case 'free-trial':
      return 'Free Trial';
    default:
      return pricing;
  }
}

/** Per-alternative "why it's good" reasoning */
function getWhyGoodAlternative(subjectName: string, altSlug: string, altName: string): string {
  const reasons: Record<string, Record<string, string>> = {
    chatgpt: {
      'claude-ai': `Claude excels at long-document analysis and nuanced writing where ChatGPT can feel generic. Its 200K token context window handles entire books and codebases, and its instruction-following is more precise for complex business tasks.`,
      'perplexity-ai': `Perplexity AI is the better choice when you need research with verified sources. Unlike ChatGPT, every answer includes inline citations so you can verify claims, making it ideal for business research and fact-checking.`,
      gemini: `Google Gemini integrates directly with Google Workspace, making it the natural choice for businesses built on Gmail, Google Docs, and Google Drive. Its real-time search is built in rather than being a separate browsing feature.`,
      'copilot-microsoft': `Microsoft Copilot is the better option for teams using Microsoft 365. It works inside Word, Excel, PowerPoint, and Teams, so you get AI assistance without switching apps or copying content between tools.`,
      poe: `Poe gives you access to ChatGPT, Claude, Gemini, and dozens of other models in one subscription. If you want to compare responses across different AI models or use specialized bots, Poe offers better multi-model value.`,
      'you-com': `You.com combines AI chat with privacy-focused web search. It is a solid alternative for users who want ChatGPT-like capabilities with better source citations and a stronger commitment to user data privacy.`,
      'jasper-ai': `Jasper AI is purpose-built for marketing content with brand voice controls, campaign workflows, and marketing-specific templates. If your primary use case is producing on-brand marketing content at scale, Jasper offers more targeted features than ChatGPT.`,
    },
    midjourney: {
      'dall-e-3': `DALL-E 3 integrated into ChatGPT provides the easiest image generation experience. It follows complex prompts more accurately than Midjourney and renders readable text within images, which is crucial for business graphics and marketing materials.`,
      'stable-diffusion': `Stable Diffusion is free and open-source, giving you unlimited generation on your own hardware. With ControlNet, LoRA fine-tuning, and a massive community of models, it offers unmatched customization for teams willing to invest in technical setup.`,
      'leonardo-ai': `Leonardo AI offers a generous free tier and multiple fine-tuned models in a polished web interface. Its real-time canvas and motion generation features make it a versatile platform for creative professionals who need more than static images.`,
      ideogram: `Ideogram has the best text rendering of any AI image generator. If your business needs images with readable text like social media graphics, posters, or logos, Ideogram consistently outperforms Midjourney in this critical area.`,
      'adobe-firefly': `Adobe Firefly is trained on licensed content, making it the safest choice for commercial use. Integrated into Photoshop and Illustrator, its generative fill and expand features fit naturally into professional design workflows.`,
      flux: `Flux is a newer open-source model that rivals Midjourney in photorealism. Available for free local deployment or through affordable hosting services, it offers excellent quality without requiring a Midjourney subscription.`,
    },
    'jasper-ai': {
      'copy-ai': `Copy.ai combines AI copywriting with workflow automation at a lower price point than Jasper. Its workflow builder lets you chain AI tasks together, and it offers a free tier that Jasper does not, making it more accessible for small businesses.`,
      writesonic: `Writesonic provides a comparable AI writing experience at roughly one-third the cost of Jasper. Its built-in Chatsonic chatbot with web access and SEO optimization tools offer strong value for content marketers on a tighter budget.`,
      rytr: `Rytr is the most budget-friendly alternative at just $9/month. While it lacks Jasper's team collaboration features, it covers the essentials for solopreneurs who need blog posts, emails, ad copy, and social media captions without the premium price tag.`,
      anyword: `Anyword brings a unique data-driven approach with its predictive performance scoring. It estimates how well your copy will convert before you publish, making it a smarter choice for performance marketers who measure everything by conversion rates.`,
      'writer-com': `Writer is the enterprise alternative to Jasper, offering strict brand governance, terminology management, and compliance features. For larger organizations that need content governance at scale, Writer provides controls that Jasper cannot match.`,
      'surfer-seo': `Surfer SEO is the better choice if your primary goal is ranking in search engines. Its real-time content scoring against top SERP results provides more actionable SEO guidance than Jasper's built-in optimization features.`,
      chatgpt: `ChatGPT at $20/month is less than half the cost of Jasper and can produce similar quality marketing content with the right prompts. For solopreneurs who do not need brand voice controls or team workflows, ChatGPT offers better value for general content creation.`,
    },
    'github-copilot': {
      'cursor-ai': `Cursor reimagines the entire coding experience around AI. Rather than adding AI as a plugin, it offers codebase-aware chat, multi-file editing, and inline generation that make it feel like a true AI pair programmer instead of just an autocomplete tool.`,
      codeium: `Codeium provides free AI code completion for individual developers with support for 70+ languages and 40+ IDEs. If you want Copilot-quality suggestions without paying a monthly subscription, Codeium is the strongest free alternative.`,
      tabnine: `Tabnine is the privacy-first choice with on-premises deployment and local model options. For enterprises and developers working on proprietary code that cannot leave the network, Tabnine provides AI coding assistance without sending code to external servers.`,
      'amazon-q-developer': `Amazon Q Developer is optimized for AWS development with built-in security scanning and deep knowledge of AWS services. If your development stack is AWS-centric, it offers more relevant suggestions and security features than the general-purpose Copilot.`,
      'replit-ai': `Replit AI provides an AI-powered coding environment with instant deployment in the browser. For rapid prototyping or developers who want code generation plus hosting in one platform, Replit eliminates the friction of local development setup.`,
      'sourcegraph-cody': `Sourcegraph Cody leverages deep code intelligence to understand your entire codebase across multiple repositories. For teams with large, complex codebases where Copilot lacks sufficient context, Cody provides more accurate, codebase-aware assistance.`,
    },
    'grammarly-business': {
      prowritingaid: `ProWritingAid provides over 20 in-depth writing reports covering style, readability, sentence structure, and consistency. For writers who want deeper analysis than Grammarly's corrections, it offers a level of writing feedback that goes well beyond grammar.`,
      'hemingway-editor': `Hemingway Editor takes a focused approach to readability, highlighting complex sentences, passive voice, and hard-to-read passages. Its one-time purchase price and simplicity make it ideal for writers who want clarity feedback without a recurring subscription.`,
      wordtune: `Wordtune specializes in rephrasing and rewriting existing text. Instead of just correcting errors, it offers multiple alternative ways to express the same idea, making it particularly valuable for non-native English speakers who want to improve their phrasing.`,
      quillbot: `QuillBot combines paraphrasing, grammar checking, summarization, citation generation, and translation in one affordable tool. Its multiple paraphrasing modes and generous free tier make it a versatile alternative for professionals and students alike.`,
      'writer-com': `Writer provides enterprise-grade brand governance with strict style guide enforcement, terminology management, and compliance tools. For organizations that need content governance beyond what Grammarly offers, Writer is the more comprehensive enterprise solution.`,
      languagetool: `LanguageTool supports over 30 languages natively, making it the clear choice for multilingual teams and non-English businesses. At just $5/month, it is also significantly more affordable than Grammarly Business for basic grammar and style checking.`,
    },
    'canva-ai': {
      'adobe-express': `Adobe Express brings Firefly AI generation and Adobe Stock assets into a simplified design tool. For businesses already in the Adobe ecosystem, it provides a natural bridge between quick design tasks and professional Creative Cloud workflows.`,
      visme: `Visme specializes in presentations, infographics, and data visualization where Canva is merely adequate. For business teams that create data-driven reports, investor decks, or interactive content, Visme offers significantly deeper visualization capabilities.`,
      vistacreate: `VistaCreate stands out with its animation and motion graphic capabilities. For businesses creating animated social media content, video ads, or motion graphics, it offers features that go beyond Canva's basic animation tools at a comparable price.`,
      snappa: `Snappa is built for speed and simplicity with pre-sized templates for every social media platform. If your primary need is creating social media graphics quickly without the complexity of Canva's full feature set, Snappa delivers a more focused experience.`,
      'designs-ai': `Designs.ai uses AI to generate complete brand assets including logos, videos, and mockups from minimal input. For businesses that need AI-generated brand identity without hiring a designer, it offers capabilities that Canva's templates cannot match.`,
      kittl: `Kittl excels at typography, logo design, and print-ready exports. For businesses focused on merchandise, branding materials, or designs where text and typography are the primary elements, Kittl offers more specialized tools than Canva.`,
    },
  };

  return reasons[subjectName]?.[altSlug] ?? `${altName} offers a different approach that may better suit your specific needs and budget. Compare features and pricing to determine if it is the right fit for your workflow.`;
}

/** Differentiator text */
function getDifferentiator(subjectName: string, altSlug: string): string {
  const diffs: Record<string, Record<string, string>> = {
    chatgpt: {
      'claude-ai': '200K token context window handles documents 4x longer than ChatGPT',
      'perplexity-ai': 'Every response includes inline source citations for verification',
      gemini: 'Native Google Workspace integration across Docs, Gmail, and Drive',
      'copilot-microsoft': 'Works directly inside Word, Excel, PowerPoint, and Teams',
      poe: 'Access to multiple AI models (GPT-4, Claude, Gemini) in one subscription',
      'you-com': 'Privacy-focused AI search with multiple specialized interaction modes',
      'jasper-ai': 'Purpose-built marketing templates and brand voice controls',
    },
    midjourney: {
      'dall-e-3': 'Best text rendering in images and seamless ChatGPT integration',
      'stable-diffusion': 'Free, open-source with unlimited local generation and full customization',
      'leonardo-ai': 'Generous free tier with real-time canvas and motion generation',
      ideogram: 'Industry-leading text rendering accuracy within AI-generated images',
      'adobe-firefly': 'Commercially safe licensing and native Photoshop integration',
      flux: 'Open-source photorealism that rivals closed-source quality',
    },
    'jasper-ai': {
      'copy-ai': 'Workflow automation with free tier and lower price point',
      writesonic: 'One-third the cost with built-in SEO tools and Chatsonic chatbot',
      rytr: 'Budget-friendly at $9/month with built-in plagiarism checker',
      anyword: 'Predictive performance scoring estimates conversion before publishing',
      'writer-com': 'Enterprise-grade brand governance and compliance controls',
      'surfer-seo': 'Real-time SERP-based content scoring for SEO optimization',
      chatgpt: 'General-purpose AI at less than half the price',
    },
    'github-copilot': {
      'cursor-ai': 'AI-native editor with multi-file editing and codebase-aware context',
      codeium: 'Free for individual developers with 70+ language support',
      tabnine: 'On-premises deployment keeps all code on your own servers',
      'amazon-q-developer': 'AWS-optimized suggestions with built-in security scanning',
      'replit-ai': 'Browser-based IDE with instant deployment and hosting included',
      'sourcegraph-cody': 'Cross-repository code intelligence for large codebases',
    },
    'grammarly-business': {
      prowritingaid: '20+ in-depth writing reports covering style, readability, and structure',
      'hemingway-editor': 'One-time purchase focused purely on readability improvement',
      wordtune: 'Specialized sentence rephrasing with multiple alternative suggestions',
      quillbot: 'Combined paraphrasing, summarization, citation, and translation tools',
      'writer-com': 'Enterprise brand governance with terminology and compliance management',
      languagetool: '30+ language support at one-third the price',
    },
    'canva-ai': {
      'adobe-express': 'Adobe Firefly AI and seamless Adobe Creative Cloud connection',
      visme: 'Superior data visualization, infographics, and interactive content',
      vistacreate: 'Stronger animation and motion graphic capabilities',
      snappa: 'Faster, simpler workflow with pre-sized social media templates',
      'designs-ai': 'AI-generated logos, videos, and complete brand assets',
      kittl: 'Advanced typography tools and print-ready vector exports',
    },
  };

  return diffs[subjectName]?.[altSlug] ?? 'Different feature focus and pricing model';
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const content = getAlternativeContent(slug);
  if (!content) notFound();

  const alternativeTools = getAlternativeTools(slug);
  const faqItems = generateFAQItems(
    tool.name,
    alternativeTools.map((t) => ({ name: t.name, pricing: t.pricing, price: t.price }))
  );

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
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
        name: 'Alternatives',
        item: 'https://aibusinessalternative.com/alternatives',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Alternatives to ${tool.name}`,
        item: `https://aibusinessalternative.com/alternatives/${slug}`,
      },
    ],
  };

  // JSON-LD: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // JSON-LD: ItemList
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Alternatives to ${tool.name}`,
    numberOfItems: alternativeTools.length,
    itemListElement: alternativeTools.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: alt.name,
      url: `https://aibusinessalternative.com/tools/${alt.slug}`,
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <AnswerBlock
        what={`A ranked list of the best alternatives to ${tool.name} in 2026, with feature comparisons, pricing breakdowns, and user ratings.`}
        who={`Teams and businesses looking to switch from ${tool.name} or compare it against competing AI tools.`}
        bottomLine={`${alternativeTools.length} alternatives reviewed. The top-rated option is ${alternativeTools[0]?.name ?? 'listed below'} — see the full comparison to find your best match.`}
        lastUpdated="2026-03-25"
      />

      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-600 py-14 sm:py-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-indigo-200">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
              <li>
                <Link href="/alternatives" className="transition hover:text-white">
                  Alternatives
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
              <li className="text-white font-medium" aria-current="page">
                Alternatives to {tool.name}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Best Alternatives to {tool.name} in 2026
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-indigo-100">
            {content.intro}
          </p>
        </div>
      </section>

      {/* ===== Why Look for Alternatives ===== */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Look for {tool.name} Alternatives?
          </h2>
          <ul className="mt-6 space-y-4">
            {content.reasons.map((reason, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-gray-700">{reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Quick Comparison Table ===== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Quick Comparison: {tool.name} vs. Alternatives
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm" aria-label={`Comparison of ${tool.name} and alternatives`}>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Tool</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Pricing</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Rating</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Subject tool row */}
                <tr className="bg-indigo-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <span className="mr-1.5" aria-hidden="true">{tool.icon}</span>
                    {tool.name}
                    <span className="ml-2 inline-block rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                      Current
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <PricingBadge pricing={tool.pricing} price={tool.price} />
                  </td>
                  <td className="px-4 py-3">
                    <RatingStars rating={tool.rating} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{tool.bestFor}</td>
                </tr>
                {/* Alternative rows */}
                {alternativeTools.map((alt) => (
                  <tr key={alt.slug} className="transition hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <Link
                        href={`/tools/${alt.slug}`}
                        className="inline-flex items-center gap-1.5 hover:text-indigo-600"
                      >
                        <span aria-hidden="true">{alt.icon}</span>
                        {alt.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <PricingBadge pricing={alt.pricing} price={alt.price} />
                    </td>
                    <td className="px-4 py-3">
                      <RatingStars rating={alt.rating} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-gray-600">{alt.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== Detailed Alternative Listings ===== */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Detailed Look at Each {tool.name} Alternative
          </h2>
          <div className="mt-10 space-y-10">
            {alternativeTools.map((alt, index) => (
              <article
                key={alt.slug}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      <Link
                        href={`/tools/${alt.slug}`}
                        className="hover:text-indigo-600 transition"
                      >
                        <span className="mr-2" aria-hidden="true">
                          {alt.icon}
                        </span>
                        {index + 1}. {alt.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{alt.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PricingBadge pricing={alt.pricing} price={alt.price} />
                    <RatingStars rating={alt.rating} reviewCount={alt.reviewCount} size="sm" />
                  </div>
                </div>

                {/* Why it's a good alternative */}
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  {getWhyGoodAlternative(slug, alt.slug, alt.name)}
                </p>

                {/* Key differentiator */}
                <div className="mt-4 rounded-lg border-l-4 border-violet-500 bg-violet-50 px-4 py-3">
                  <p className="text-sm font-medium text-violet-900">
                    <span className="font-semibold">Key differentiator vs. {tool.name}:</span>{' '}
                    {getDifferentiator(slug, alt.slug)}
                  </p>
                </div>

                {/* Pricing comparison */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>
                    <span className="font-medium text-gray-900">{tool.name}:</span>{' '}
                    {pricingLabel(tool.pricing)}{tool.price ? ` (${tool.price})` : ''}
                  </span>
                  <span aria-hidden="true" className="text-gray-300">|</span>
                  <span>
                    <span className="font-medium text-gray-900">{alt.name}:</span>{' '}
                    {pricingLabel(alt.pricing)}{alt.price ? ` (${alt.price})` : ''}
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={`/tools/${alt.slug}`}
                    className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Learn More About {alt.name}
                    <svg
                      className="ml-1.5 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently Asked Questions About {tool.name} Alternatives
          </h2>
          <div className="mt-8 max-w-3xl">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* ===== Disclaimer ===== */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <Disclaimer />
        </div>
      </section>
    </>
  );
}
