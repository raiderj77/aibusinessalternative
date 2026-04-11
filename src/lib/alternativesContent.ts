import { getToolBySlug, type AITool } from '@/data/tools';

export interface AlternativeContent {
  intro: string;
  reasons: string[];
}

/** Hardcoded overrides for the 6 original slugs — richer editorial content */
const alternativesOverrides: Record<string, AlternativeContent> = {
  chatgpt: {
    intro:
      'ChatGPT is the world\'s most popular AI assistant, but it is not the only option. Many business users look for alternatives because of usage limits on the free tier, concerns about data privacy when processing sensitive business information, or a need for features that ChatGPT does not prioritize. Some users find that ChatGPT\'s responses can be verbose and require significant editing, while others need deeper integration with specific platforms like Google Workspace or Microsoft 365. Pricing is another factor: at $20 per month for ChatGPT Plus, competitors may offer better value depending on your primary use case. Whether you need more accurate research with citations, longer document handling, better code generation, or simply a second opinion on important tasks, the alternatives below cover a range of strengths that may better fit your workflow and budget.',
    reasons: [
      'ChatGPT\'s free tier has usage caps during peak hours, and the $20/month Plus plan may not justify the cost if you only need specific capabilities like research or writing.',
      'Privacy-conscious businesses may be uncomfortable sending sensitive data to OpenAI\'s servers, especially without a clear enterprise data agreement on the consumer plan.',
      'ChatGPT can produce verbose, generic responses that require heavy editing, and its tendency to hallucinate facts makes it unreliable for research without manual verification.',
    ],
  },
  midjourney: {
    intro:
      'Midjourney has set the standard for AI image generation with its exceptional artistic quality and aesthetic output. However, several factors drive business users to explore alternatives. The tool originally required Discord for its interface, and while a web app now exists, many users prefer a more traditional workflow. Midjourney has no free tier, which makes it harder for small businesses to test before committing. Its strength in artistic, stylized images can actually be a drawback when you need photorealistic product shots, images with accurate text, or designs that integrate into an existing Adobe or Canva workflow. Control over specific image elements like composition, poses, and layout remains limited compared to tools with ControlNet or generative fill. The alternatives below range from free open-source options to commercially licensed solutions, each addressing different gaps in Midjourney\'s offering for business use.',
    reasons: [
      'Midjourney has no free tier, so businesses must pay at least $10/month before generating a single image, making it harder to evaluate for specific use cases.',
      'The tool produces highly stylized images by default, which can be a poor fit for businesses needing photorealistic product shots, images with readable text, or precise layout control.',
      'Midjourney\'s interface and prompt-based workflow offers limited fine-grained control over image composition, making it frustrating for users who need to match a specific brand style or modify parts of an image.',
    ],
  },
  'jasper-ai': {
    intro:
      'Jasper AI is a well-known content marketing platform, but its pricing structure and feature set do not suit every business. Starting at $49 per month with no free tier, Jasper is one of the most expensive AI writing tools on the market. Solopreneurs and small teams often find that general-purpose AI assistants like ChatGPT or Claude can produce similar quality content at a fraction of the cost. Jasper\'s value proposition centers on brand voice control and marketing templates, but competitors have rapidly closed that gap. Some users also report that the output quality depends heavily on prompting skill, and the template-driven workflow can feel rigid for creative work. For teams focused specifically on SEO, the built-in optimization tools are basic compared to dedicated platforms like Surfer SEO. The alternatives below offer a range of price points and specialties, from budget-friendly writing tools to data-driven content optimization platforms.',
    reasons: [
      'Jasper\'s $49/month starting price is steep for solopreneurs and small businesses, especially when free or cheaper alternatives offer similar AI writing capabilities.',
      'The template-driven workflow can feel rigid and limiting for creative content, and output quality depends heavily on the user\'s prompting skills.',
      'Jasper\'s built-in SEO features are basic compared to dedicated SEO content tools, and the brand voice controls, while useful, are now offered by several cheaper competitors.',
    ],
  },
  'github-copilot': {
    intro:
      'GitHub Copilot transformed the way developers write code, but it is not the only AI coding assistant worth considering. At $10 per month for individuals, Copilot is affordable, yet some developers look for alternatives due to privacy concerns about code being sent to external servers, the need for deeper codebase understanding that goes beyond autocomplete, or a desire for a fully AI-native development environment rather than a plugin. Enterprises with strict security policies may require on-premises deployment options that Copilot does not offer. Some developers working primarily with AWS services find that specialized tools offer better integration. Others want free options that match Copilot\'s quality for personal projects. The tools below address these gaps, offering everything from free code completion to full AI-native editors and privacy-first solutions that keep your code on your own servers.',
    reasons: [
      'Copilot sends code context to external servers for processing, which raises concerns for teams working on proprietary or security-sensitive codebases.',
      'As a plugin, Copilot is limited to autocomplete and chat within your existing editor, while newer AI-native editors like Cursor offer deeper multi-file editing and refactoring.',
      'Copilot requires a paid subscription with no permanent free tier for individual developers, while alternatives like Codeium and Amazon Q Developer offer robust free plans.',
    ],
  },
  'grammarly-business': {
    intro:
      'Grammarly Business is the market leader in AI-powered writing assistance, used by millions of professionals worldwide. However, its per-user pricing model makes it expensive for growing teams, and its feature set may not match every organization\'s needs. Some teams need deeper writing analysis beyond grammar, such as the 20-plus reports offered by ProWritingAid, or readability-focused feedback like Hemingway Editor provides. Multilingual businesses often find that Grammarly\'s English-centric approach falls short, while enterprise teams with strict compliance requirements may need the governance controls of specialized platforms like Writer. Writers focused specifically on rephrasing or paraphrasing may prefer dedicated tools like Wordtune or QuillBot that excel at rewriting rather than correction. The alternatives below cover the full spectrum of writing assistance, from budget-friendly grammar checkers to enterprise compliance platforms.',
    reasons: [
      'Per-user pricing at $15/user/month makes Grammarly Business expensive for larger teams, and costs escalate quickly as headcount grows.',
      'Grammarly focuses on English, which makes it a poor fit for multilingual teams or businesses operating in non-English markets.',
      'The AI generative writing features can feel generic compared to specialized tools, and the platform lacks the deep style analysis and writing reports that power users need.',
    ],
  },
  'canva-ai': {
    intro:
      'Canva AI has become the go-to design platform for non-designers and small business teams, but its all-in-one approach is not always the best fit. Some users need deeper specialization: stronger data visualization for business presentations, more advanced typography for branding and merchandise, or professional-grade tools that connect to the Adobe ecosystem. Canva\'s AI features like Magic Design and text-to-image generation are convenient but not best-in-class compared to dedicated AI design tools. The template-dependent workflow can lead to designs that look generic, and advanced users often hit the ceiling of what Canva can do. For businesses focused specifically on animation, video content for social media, or AI-generated brand assets like logos, specialized alternatives may deliver better results. The tools below offer different strengths depending on whether you need infographic excellence, Adobe integration, animation capabilities, or AI-generated brand identity.',
    reasons: [
      'Canva\'s all-in-one approach means its individual features rarely match specialized tools, and designs often look template-dependent and generic.',
      'Advanced AI features like Magic Design and background removal are locked behind the $13/month Pro plan, and the free tier has significant limitations.',
      'Professional designers and brand-focused teams may find Canva\'s customization options too limiting, especially for typography, print-ready exports, and precise layout control.',
    ],
  },
};

/** Build a pricing context sentence from the tool's pricing and price fields */
function pricingContext(tool: AITool): string {
  switch (tool.pricing) {
    case 'paid':
      return `Starting at ${tool.price}, ${tool.name} is a paid-only tool with no free tier, which leads many users to evaluate alternatives before committing.`;
    case 'freemium':
      return `While ${tool.name} offers a free tier, the most useful features require a paid plan at ${tool.price}, which prompts some users to look for better value elsewhere.`;
    case 'free-trial':
      return `${tool.name} offers a free trial but requires a paid subscription at ${tool.price} to continue, leading some users to explore permanently free or lower-cost alternatives.`;
    case 'free':
      return `As a completely free tool, ${tool.name} is popular for cost-conscious users — but price alone doesn't determine the best fit for your workflow.`;
    default:
      return '';
  }
}

/** Derive up to 3 reasons-to-switch from the tool's cons[], padding with generic fallbacks */
function reasonsFromCons(tool: AITool): string[] {
  const shortName = tool.name.replace(/ by .+$/, '').replace(/ AI$/, '').trim();
  const reasons: string[] = tool.cons.slice(0, 3).map((con) =>
    con.endsWith('.') ? con : con + '.'
  );

  if (reasons.length < 3) {
    reasons.push(
      `Some teams may prefer a tool that integrates more naturally with their existing tech stack or offers deeper specialization for their specific use case.`
    );
  }
  if (reasons.length < 3) {
    reasons.push(
      `As the AI landscape evolves rapidly, newer tools may offer better performance or value for your particular workflow than ${shortName}.`
    );
  }

  return reasons.slice(0, 3);
}

/** Auto-generate AlternativeContent from a tool's structured data */
function generateAlternativeContent(tool: AITool): AlternativeContent {
  const shortName = tool.name.replace(/ by .+$/, '').replace(/ AI$/, '').trim();
  const pricing = pricingContext(tool);
  const prosSnippet = tool.pros.slice(0, 2).map((p) => p.toLowerCase()).join(' and ');

  const intro = [
    tool.description,
    pricing,
    `Despite its strengths — ${prosSnippet} — no single tool is the right fit for every team.`,
    `Businesses exploring alternatives to ${shortName} often cite pricing, missing integrations, or the need for more specialized capabilities.`,
    `The tools below were selected based on how well they address those gaps across pricing, features, and use-case fit.`,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    intro,
    reasons: reasonsFromCons(tool),
  };
}

/**
 * Returns AlternativeContent for any tool slug that exists in tools.ts.
 * The 6 original slugs return their richer hardcoded editorial content.
 * All other tools get content auto-generated from their structured data.
 */
export function getAlternativeContent(slug: string): AlternativeContent | undefined {
  if (alternativesOverrides[slug]) return alternativesOverrides[slug];

  const tool = getToolBySlug(slug);
  if (!tool) return undefined;

  return generateAlternativeContent(tool);
}
