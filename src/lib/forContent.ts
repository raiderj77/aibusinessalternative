export interface IndustryToolRec {
  slug: string;
  why: string;
}

export interface IndustryStep {
  title: string;
  description: string;
}

export interface IndustryPage {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  toolSlugs: IndustryToolRec[];
  steps: IndustryStep[];
  faq: { question: string; answer: string }[];
  icon: string;
  iconBg: string;
}

const industryPages: Record<string, IndustryPage> = {
  freelancers: {
    slug: 'freelancers',
    name: 'Freelancers',
    tagline: 'Work smarter, win more clients, and charge more per hour.',
    icon: '💼',
    iconBg: 'bg-blue-50',
    intro: `Freelancing means wearing every hat in the business — account manager, writer, designer, bookkeeper, and delivery lead — often simultaneously. The biggest constraint isn't skill: it's time. AI tools don't replace what makes you valuable to clients, but they dramatically reduce the overhead that gets in the way of doing that work.

The freelancers getting the most from AI right now are using it to write faster first drafts, keep admin tasks from eating their evenings, and present themselves at a level that used to require a full agency. You don't need every tool on this list — start with one that solves your most painful bottleneck, then add as you grow.`,
    toolSlugs: [
      {
        slug: 'claude-ai',
        why: 'Freelancers who do client-facing writing — proposals, emails, reports, project scopes — find Claude uniquely useful because it follows nuanced instructions reliably. Give it your tone guidelines and a brief, and it produces drafts that sound like you, not a generic AI. Its 200K context window means you can paste in an entire client brief and ask it to write a response that addresses every point.',
      },
      {
        slug: 'chatgpt',
        why: 'For freelancers who need one tool that does everything, ChatGPT is the Swiss Army knife. Use it to research unfamiliar client industries before a pitch, generate invoice line-item language, brainstorm service offerings, write LinkedIn posts, or talk through a tricky client situation. The breadth of what it handles means fewer tool subscriptions overall.',
      },
      {
        slug: 'canva-ai',
        why: 'Even if you are not a designer, clients expect professional-looking proposals, presentations, and social media. Canva AI closes the gap — its Magic Write drafts copy while its templates handle design. Freelancers use it for client pitch decks, portfolio PDFs, and social media content without needing to hire a graphic designer or learn Figma.',
      },
      {
        slug: 'notion-ai',
        why: 'Notion is already the preferred workspace for solo operators who need a CRM, project tracker, knowledge base, and document editor in one place. The AI add-on makes it genuinely more powerful: summarize client meeting notes, draft follow-up action items, and build templates for recurring deliverables. For freelancers juggling multiple clients, the organizational lift alone is worth the $10/month.',
      },
      {
        slug: 'grammarly',
        why: 'Every piece of client communication you send is a signal about your professionalism. Grammarly runs quietly in the background of your Gmail, Google Docs, and Slack, catching errors before they reach clients. The tone suggestions are particularly useful when you need to be direct without sounding abrupt. For freelancers, it is the cheapest insurance policy against avoidable mistakes.',
      },
      {
        slug: 'zapier-ai',
        why: 'The administrative overhead of freelancing — onboarding new clients, sending invoices, following up on late payments, updating project statuses — can easily consume 20% of your week. Zapier automates the connective tissue between your tools: when a client signs a contract, automatically create a Notion project, send a welcome email, and add a task to your calendar. Its AI workflow builder means you describe what you want in plain English.',
      },
    ],
    steps: [
      {
        title: 'Start with a writing and thinking partner',
        description: 'Claude or ChatGPT should be your first AI investment. Use it for proposals, client emails, project briefs, and research. Even using it for 30 minutes a day on writing tasks typically saves 2–3 hours per week. Most freelancers pay for this back in the first week.',
      },
      {
        title: 'Add a visual tool for client-facing materials',
        description: 'Canva AI lets you produce professional pitch decks, proposals, and social content that elevate your perceived value. Clients make judgments about quality based on presentation — AI-assisted design lets you compete visually with agencies three times your size.',
      },
      {
        title: 'Automate the tasks that eat your evenings',
        description: 'Once you have the creative tools in place, use Zapier to automate the repetitive admin: client onboarding sequences, invoice reminders, project status updates. The goal is to make each new client require progressively less setup time.',
      },
    ],
    faq: [
      {
        question: 'Can AI help me win more freelance clients?',
        answer: 'Yes, in several concrete ways. AI tools like Claude and ChatGPT help you write more compelling proposals faster, letting you bid on more work without burning more hours. Canva AI lets you present yourself at a level that previously required a design retainer. And AI research tools help you understand a prospective client\'s industry before a call, which builds immediate credibility.',
      },
      {
        question: 'What is the best AI tool for a freelancer just getting started?',
        answer: 'Start with either Claude or ChatGPT — both have free tiers that provide genuine value before you pay anything. Use it for a month on real work: proposals, client emails, first drafts of deliverables. Once you see where it saves you the most time, you will know which direction to invest the $20/month for a paid plan.',
      },
      {
        question: 'How much should a freelancer spend on AI tools per month?',
        answer: 'Most freelancers get strong results from $20–40/month covering one general AI assistant and one specialty tool. The test is simple: if a tool saves you two hours per month and you charge $50/hour, it has paid for itself. Many freelancers find that $20/month on Claude or ChatGPT replaces $100+/month in other software they were using for writing, research, and content.',
      },
    ],
  },

  'marketing-agencies': {
    slug: 'marketing-agencies',
    name: 'Marketing Agencies',
    tagline: 'Produce more for more clients without proportionally growing headcount.',
    icon: '📣',
    iconBg: 'bg-orange-50',
    intro: `Marketing agencies live or die on throughput and consistency. The challenge is producing high-quality, on-brand content across multiple clients simultaneously — without letting any single account feel like it is getting the B-team.

AI has shifted the economics of agency work more than any other technology in the past decade. Agencies that have integrated AI into their production workflows are handling 40–60% more client work with the same team size. The tools below are not about replacing creative judgment — they are about removing the commodity work that slows creative people down.`,
    toolSlugs: [
      {
        slug: 'jasper-ai',
        why: 'Jasper is built specifically for agencies managing brand voice across multiple clients. Its brand voice training lets you lock in each client\'s tone, vocabulary, and style guidelines — so every piece of content, regardless of which team member generated it, sounds consistent. Campaign workflows, team permissions, and approval processes make it the production layer for content-heavy agencies.',
      },
      {
        slug: 'semrush-ai',
        why: 'Agencies need to show clients measurable results, and Semrush AI is how you build the strategy behind the content. Its AI-powered keyword research identifies the opportunities worth pursuing for each client\'s specific competitive landscape. Use it for monthly reporting, competitor gap analysis, and identifying quick-win content opportunities that demonstrate value early in a retainer.',
      },
      {
        slug: 'canva-ai',
        why: 'Social media graphics, ad creative, presentation decks, report covers — the visual volume agencies are expected to produce has multiplied while client budgets have not. Canva AI lets non-designers on your team produce on-brand visuals quickly. Set up a brand kit for each client and the entire team can generate consistent assets without routing every request through your art director.',
      },
      {
        slug: 'surfer-seo',
        why: 'When clients hire an agency for SEO content, they expect it to rank. Surfer SEO scores content against the top-ranking pages for every target keyword, giving writers a real-time optimization checklist. For agencies producing 20+ blog posts per month across multiple clients, this tool significantly increases the percentage of content that reaches page one without requiring an SEO specialist to review every piece.',
      },
      {
        slug: 'zapier-ai',
        why: 'Agencies have more process overhead than almost any other business type: client reporting, asset delivery, approval workflows, content calendars, invoicing. Zapier connects your tools — when content is approved in Notion, automatically publish to your scheduling tool, notify the client via Slack, and log the deliverable in your project tracker. Its AI workflow builder means ops improvements happen faster and require less technical resource.',
      },
      {
        slug: 'writesonic',
        why: 'When you need high volume of solid first drafts — product descriptions, ad variations, email sequences, landing page copy — Writesonic handles it at a pace no human writer can match. Its Chatsonic interface adds live web search, useful for keeping client content current. Agencies use it for the commodity copy that needs to exist without being the centerpiece of the creative strategy.',
      },
    ],
    steps: [
      {
        title: 'Build a client-specific content production system',
        description: 'Set up brand voices in Jasper for each client. Document their tone, vocabulary, prohibited phrases, and target personas. This upfront investment means every piece of AI-assisted content is immediately on-brand, reducing revision cycles and making output usable without heavy editing.',
      },
      {
        title: 'Layer SEO intelligence into your content workflow',
        description: 'Use Semrush AI to identify the keyword opportunities for each client, then Surfer SEO to make sure each piece of content is optimized before delivery. This two-tool combination transforms content production from a quantity game into a quality-plus-quantity operation that actually moves rankings.',
      },
      {
        title: 'Automate reporting and delivery to reclaim capacity',
        description: 'Zapier can automatically pull data from Semrush, compile it into a Notion template, and distribute it to clients on a set schedule. Automating reporting — which typically consumes 3–5 hours per client per month — is often where agencies find the most capacity to take on additional clients.',
      },
    ],
    faq: [
      {
        question: 'Can AI write client content without them noticing it is AI-generated?',
        answer: 'With proper brand voice setup and human editing, yes — clients consistently cannot distinguish AI-assisted content from purely human-written content. The key is using AI for first drafts and structure, then having an experienced writer refine the output to match the client\'s voice. Most agencies that do this well report that AI-assisted content actually performs better because writers spend their time on refinement rather than starting from a blank page.',
      },
      {
        question: 'How do agencies manage brand voice consistency across multiple clients?',
        answer: 'Tools like Jasper have brand voice training built specifically for this use case — you define each client\'s voice parameters once and every team member generates within those guardrails. Beyond dedicated tools, the most effective agencies create detailed voice prompts that can be prepended to any AI request, ensuring consistency even when using general-purpose tools like Claude or ChatGPT.',
      },
      {
        question: 'Which AI tools have the best ROI for marketing agencies?',
        answer: 'Surfer SEO and Jasper consistently top agency ROI analyses because the value is directly measurable: Surfer improves content ranking rates, Jasper reduces first-draft time. Zapier ROI is high but less visible — its value shows in capacity freed up for client work rather than in a deliverable. Most agencies see full cost recovery within the first month of using any of these tools consistently.',
      },
    ],
  },

  'ecommerce-businesses': {
    slug: 'ecommerce-businesses',
    name: 'E-commerce Businesses',
    tagline: 'Convert more visitors, serve customers faster, and scale without proportional hiring.',
    icon: '🛒',
    iconBg: 'bg-green-50',
    intro: `Running an e-commerce business means operating a store, a warehouse, a marketing department, and a customer service team — sometimes with a team of two. Every hour spent writing product descriptions or answering repetitive customer questions is an hour not spent on growth.

The e-commerce operators ahead of the curve are using AI to handle the volume work: product copywriting, customer support triage, social media content, and email sequences. The result is a leaner operation that punches significantly above its headcount.`,
    toolSlugs: [
      {
        slug: 'chatgpt',
        why: 'E-commerce operators use ChatGPT as a versatile production tool: writing product descriptions at scale, drafting email marketing sequences, creating social media captions for new arrivals, and researching competitor positioning. With a well-crafted prompt template for your brand voice, you can generate a complete product listing in under a minute — a transformation for stores with hundreds of SKUs.',
      },
      {
        slug: 'canva-ai',
        why: 'Product photography, promotional banners, social media ads, and email headers — the visual production demands of e-commerce are constant. Canva AI handles background removal, image generation for lifestyle shots, and rapid template-based ad creation. For small stores that cannot afford a graphic designer, it is the difference between looking professional and looking homemade.',
      },
      {
        slug: 'tidio-ai',
        why: 'The most common e-commerce customer questions — order status, return policy, size guides, shipping times — are perfectly suited for AI. Tidio\'s Lyro AI chatbot handles these queries instantly, 24/7, without human intervention. The result is fewer support tickets reaching humans, faster response times that reduce cart abandonment, and a support experience that feels premium even for a small store.',
      },
      {
        slug: 'zapier-ai',
        why: 'E-commerce operations involve dozens of tools that need to talk to each other: your Shopify store, email platform, inventory system, accounting software, and fulfillment partner. Zapier automates the connections — when an order ships, trigger a review request email; when inventory drops below threshold, alert the buying team; when a new customer signs up, add them to the right email sequence. The e-commerce use case for automation is particularly high-ROI.',
      },
      {
        slug: 'semrush-ai',
        why: 'Product page SEO is often the biggest untapped growth lever for e-commerce businesses. Semrush AI identifies the keywords your product pages should rank for, audits technical issues preventing them from ranking, and tracks competitor movements. For stores that depend on organic search for discovery, investing in SEO intelligence is foundational — every improvement compounds over time.',
      },
      {
        slug: 'elevenlabs',
        why: 'Video commerce is growing fast — product explainer videos, unboxing content, TikTok ads, and Instagram reels all perform better with professional voiceover. ElevenLabs produces broadcast-quality AI voice narration in minutes. For e-commerce brands producing regular video content, it eliminates the recording setup and re-recording cycles that make video production slow and expensive.',
      },
    ],
    steps: [
      {
        title: 'Fix customer support first — it is your highest-leverage AI opportunity',
        description: 'Deploy Tidio AI to handle the top 10 questions your support team answers every week. Most e-commerce stores can automate 60–70% of their support volume with a properly configured AI chatbot, freeing human agents for the complex issues that actually require judgment.',
      },
      {
        title: 'Scale your product content with AI',
        description: 'Build a product description template in ChatGPT that captures your brand voice, key features, and SEO requirements. Use it to generate first drafts for every product — then do a quick human review. What previously took 30 minutes per product can be done in 5, transforming how fast you can launch new inventory.',
      },
      {
        title: 'Add AI to your marketing funnel',
        description: 'Use Canva AI for ad creative, Semrush for SEO strategy, and Zapier to automate your email and review collection flows. These three tools together cover most of what a part-time marketing hire would handle — at a fraction of the cost.',
      },
    ],
    faq: [
      {
        question: 'Can AI write product descriptions that actually convert?',
        answer: 'Yes, with the right approach. AI-generated product descriptions are most effective when you give them specific product details, target customer information, and brand voice guidelines — not just a generic prompt. Many e-commerce operators report that AI-written descriptions (with light human editing) perform comparably or better than purely human-written ones, likely because they are more consistently structured and keyword-optimized.',
      },
      {
        question: 'Is AI customer service good enough for e-commerce?',
        answer: 'For handling FAQs, order status questions, and policy questions, AI chatbots like Tidio are genuinely good — often faster and more consistent than human agents for these query types. Where AI still needs human backup is for complex situations: damaged orders, unusual requests, or emotionally charged complaints. The best e-commerce setups use AI for tier-1 triage with seamless escalation to humans for anything outside the standard playbook.',
      },
      {
        question: 'How does AI help with e-commerce SEO?',
        answer: 'AI helps at every stage of e-commerce SEO: identifying which keywords each product page should target, generating SEO-optimized descriptions and titles at scale, auditing technical issues that suppress rankings, and tracking competitor keyword movements. The highest-leverage application is usually systematic optimization of existing product pages — many stores see meaningful traffic increases just from properly optimizing pages that already exist.',
      },
    ],
  },

  'real-estate-agents': {
    slug: 'real-estate-agents',
    name: 'Real Estate Agents',
    tagline: 'Write listings faster, follow up smarter, and close more deals with less admin.',
    icon: '🏠',
    iconBg: 'bg-emerald-50',
    intro: `Real estate is a relationship business that runs on paperwork. Listing descriptions, buyer correspondence, market reports, social media posts, follow-up sequences, and transaction coordination — the administrative burden of a busy agent's week can easily consume the time that should go toward client relationships and closings.

AI tools do not replace the market knowledge, negotiation skill, and local expertise that make a great agent. They eliminate the commodity tasks around it, giving you more time for the conversations that actually move deals forward.`,
    toolSlugs: [
      {
        slug: 'chatgpt',
        why: 'ChatGPT is the tool most real estate agents reach for first — and for good reason. It writes compelling MLS listing descriptions from a feature list in under two minutes, generates neighborhood market reports from data you paste in, drafts offer letters and correspondence, and can roleplay difficult client conversations so you can prepare your response. For agents new to AI, this is the right starting point.',
      },
      {
        slug: 'canva-ai',
        why: 'Property marketing lives and dies on visual presentation — listing flyers, open house materials, just-sold posts, market update graphics, and social media content. Canva AI handles all of it with professional templates that match your brand. Agents who post consistently on social media see measurably higher inbound leads, and Canva reduces the time it takes to produce that content from hours to minutes.',
      },
      {
        slug: 'tidio-ai',
        why: 'Buyer and seller inquiries come in at all hours — from listing platforms, your website, and social media. Tidio AI handles the initial response instantly: qualifying interest, answering common questions about properties, capturing contact information, and scheduling showings. An agent who responds in under five minutes converts significantly more leads than one who responds the next morning. Tidio closes that gap.',
      },
      {
        slug: 'zapier-ai',
        why: 'Transaction coordination involves the same repetitive tasks for every deal: document collection, status updates, deadline reminders, and handoffs between parties. Zapier automates the workflow — when a listing goes under contract, automatically notify your transaction coordinator, set deadline reminders, and send the buyer their checklist. The best agents use this time savings to handle more transactions simultaneously without the associated stress.',
      },
      {
        slug: 'claude-ai',
        why: 'When clients send you long emails, contracts with unusual clauses, or HOA documents they want you to review, Claude is the right tool. Paste in the document and ask specific questions — it processes lengthy real estate documents accurately and helps you identify issues or craft a thoughtful response. Agents also use Claude for writing market commentary, buyer guides, and the longer-form content that positions them as the local expert.',
      },
      {
        slug: 'notion-ai',
        why: 'Top agents run their business from a well-organized knowledge system: client CRM, transaction timelines, market notes, vendor lists, and scripts. Notion AI turns this workspace into an active tool — summarize meeting notes, draft follow-up emails from call notes, and answer questions about your own data. Agents who build a solid Notion workspace in year one find it becomes their most valuable business asset.',
      },
    ],
    steps: [
      {
        title: 'Build your listing description workflow',
        description: 'Create a ChatGPT prompt template that includes your brand voice, the property details format you use, and your target buyer persona. Use it for every listing from day one. A good listing description takes 2 minutes instead of 20 — and the quality is consistently strong because you have engineered the output rather than starting from a blank page each time.',
      },
      {
        title: 'Set up automated lead follow-up',
        description: 'Deploy Tidio on your website to capture and qualify leads instantly, then use Zapier to route those leads into your CRM and trigger a follow-up sequence. Speed-to-lead is one of the most reliable predictors of conversion in real estate — AI gives you an instant response to every inquiry even when you are at a showing.',
      },
      {
        title: 'Build your market authority content machine',
        description: 'Use Claude for thoughtful market commentary and buyer guides, Canva AI for the visual versions of that content, and schedule everything via your social media tool. Agents who consistently publish useful local market insights generate significantly more organic referrals and inbound inquiries than those who only post listings.',
      },
    ],
    faq: [
      {
        question: 'Can AI write MLS listing descriptions that comply with fair housing rules?',
        answer: 'Yes, but you need to verify the output. AI tools like ChatGPT can write strong listing descriptions, but they can occasionally include language that raises fair housing concerns — references to neighborhood demographics or school district language that violates regulations. Always review AI-generated listings before publishing, and add a reminder to your prompt to avoid protected-class language. The efficiency gain is still significant even with a review step.',
      },
      {
        question: 'How do real estate agents use AI for lead follow-up?',
        answer: 'The most effective approach combines AI chatbots for instant first response with automated email sequences for longer-term nurture. When a lead comes in from Zillow or your website, Tidio responds within seconds to capture interest and qualify intent. Zapier then routes that lead into a 30-day follow-up email sequence written with ChatGPT — personalized to whether they are a buyer, seller, or investor. The combination means no lead goes cold because you were busy.',
      },
      {
        question: 'Will AI replace real estate agents?',
        answer: 'No — but agents who use AI will increasingly displace those who do not. The tasks AI handles well (writing, research, scheduling, follow-up) are time-consuming but not the core of what makes a great agent. Local market knowledge, negotiation, relationship management, and guiding clients through one of the largest financial decisions of their lives require human judgment that AI does not replicate. AI makes great agents more productive, not redundant.',
      },
    ],
  },

  'lawyers-and-law-firms': {
    slug: 'lawyers-and-law-firms',
    name: 'Lawyers & Law Firms',
    tagline: 'Research faster, draft more precisely, and reduce the administrative cost of legal work.',
    icon: '⚖️',
    iconBg: 'bg-slate-50',
    intro: `Legal work is information-intensive by nature — researching precedent, reviewing documents, drafting correspondence, and managing the administrative overhead of a busy practice. AI tools do not practice law, but they dramatically reduce the time cost of the surrounding work that eats into billable hours.

The law firms integrating AI most effectively are not replacing attorney judgment — they are eliminating the commodity tasks that slow that judgment down. Research that took four hours can take forty minutes. First drafts of standard correspondence that took an hour can take five minutes. The productivity gain compounds significantly across a full year of practice.`,
    toolSlugs: [
      {
        slug: 'claude-ai',
        why: 'Claude is the AI most frequently recommended for legal professionals because of two characteristics: its exceptional ability to process and reason about long documents, and its tendency to follow nuanced instructions precisely without adding unsolicited content. Lawyers use it to review contracts (paste in the full document and ask targeted questions), draft correspondence in a specific firm voice, summarize deposition transcripts, and structure legal arguments. Its 200K context window handles documents that would overwhelm other AI tools.',
      },
      {
        slug: 'chatgpt',
        why: 'For legal research, drafting, and general knowledge queries, ChatGPT is the broadest tool in the stack. Lawyers use it to research the legal landscape around unfamiliar practice areas before client calls, generate first drafts of standard letters and motions, understand complex regulatory documents in plain language, and brainstorm counterarguments. It is the most versatile general-purpose assistant for legal work, though output should always be verified for accuracy.',
      },
      {
        slug: 'notebooklm',
        why: 'Google NotebookLM is a document intelligence tool that lets lawyers upload case files, contracts, deposition transcripts, and research materials — then ask questions across all of them simultaneously. It stays grounded in the documents you upload rather than generating from training data, which reduces hallucination risk. For building a research corpus around a specific case and querying it efficiently, it is one of the most practical tools in a litigator\'s AI stack.',
      },
      {
        slug: 'notion-ai',
        why: 'Law firms that build their matter management, client notes, standard clauses, and procedure documentation in Notion gain a compounding advantage from the AI add-on. It can summarize long case notes, draft client update emails from meeting notes, extract action items from calls, and answer questions about your own stored knowledge. For solo practitioners especially, having all case knowledge in one queryable system transforms how you manage a full caseload.',
      },
      {
        slug: 'grammarly',
        why: 'Every document that leaves a law firm is a representation of the firm\'s precision and professionalism. Grammarly runs in the background of every writing surface — email, Word, document editors — catching errors before they reach clients or courts. For lawyers who produce high volumes of written work across multiple matters, it is the last line of defense against the typos and grammatical errors that should never appear in legal correspondence.',
      },
      {
        slug: 'perplexity-ai',
        why: 'Legal research often starts with understanding the landscape — recent regulatory changes, agency guidance, industry developments, or news about a client\'s sector. Perplexity AI provides cited, current-information answers that link to source material you can verify. For preliminary research before diving into Westlaw or LexisNexis, it identifies the relevant areas and key issues faster than a keyword search, with every claim attributed to a verifiable source.',
      },
    ],
    steps: [
      {
        title: 'Augment research before billing begins',
        description: 'Use Perplexity AI for initial landscape research on any new matter or unfamiliar area of law. Its cited responses surface relevant cases, regulations, and recent developments in minutes. This does not replace formal legal research — it informs the direction so your billable research time is more targeted and efficient.',
      },
      {
        title: 'Build a document drafting workflow for standard work',
        description: 'Identify the 10 most common documents your practice produces — engagement letters, demand letters, standard agreements, motion templates. Build Claude or ChatGPT prompts that produce solid first drafts for each one. The goal is not to eliminate attorney review — it is to make the starting point so good that review takes 10 minutes instead of 30.',
      },
      {
        title: 'Build a matter knowledge system',
        description: 'Use Notion to create a structured workspace for each matter: key facts, timeline, documents, and correspondence. The AI add-on lets you query this knowledge base in plain English. NotebookLM can sit alongside it for deep document analysis. The investment pays off when you can answer a client\'s question in 30 seconds instead of digging through email threads.',
      },
    ],
    faq: [
      {
        question: 'Is it safe to use AI for legal work?',
        answer: 'AI tools are safe for legal work when used with appropriate judgment. The key risks are hallucination (AI generating plausible but inaccurate legal citations) and confidentiality (uploading client information to third-party services). For hallucination risk: always verify AI-generated legal content against authoritative sources before relying on it. For confidentiality: review the data policies of any tool before uploading client materials, and use enterprise or privacy-focused tiers where appropriate. Neither risk eliminates AI\'s usefulness — they just require professional judgment in applying it.',
      },
      {
        question: 'Can AI review contracts reliably?',
        answer: 'AI tools like Claude are genuinely useful for contract review at the preliminary stage — identifying unusual clauses, flagging potential issues, summarizing key terms, and cross-referencing defined terms throughout a document. Where they fall short is in applying jurisdiction-specific legal judgment about risk tolerance and enforceability. The most effective approach is using AI for the first pass (what does this say, are there obvious issues?) and attorney judgment for the substantive legal analysis (what does this mean for this client in this situation?).',
      },
      {
        question: 'What AI tools do law firms actually use?',
        answer: 'Solo practitioners and small firms most commonly use Claude for document analysis and drafting, ChatGPT for research and general correspondence, and Grammarly for proofreading. Larger firms are increasingly adopting purpose-built legal AI tools like Harvey and Clio Duo, but these are enterprise products with enterprise pricing. For most small and mid-size practices, the general-purpose AI tools on this list deliver most of the practical value at a fraction of the cost.',
      },
    ],
  },

  'content-creators': {
    slug: 'content-creators',
    name: 'Content Creators',
    tagline: 'Produce more, faster — without burning out or losing your creative edge.',
    icon: '🎬',
    iconBg: 'bg-purple-50',
    intro: `The content creator economy has an output problem. Audiences expect a consistent presence across YouTube, Instagram, TikTok, podcasts, and newsletters simultaneously — and the production overhead of each platform is substantial. Most creators are spending more time on production logistics than on the creative work that actually built their audience.

AI tools are changing this equation. The creators pulling ahead right now are not using AI to replace their voice or creative vision — they are using it to eliminate the production bottlenecks that slow them down: scripting first drafts, generating thumbnail concepts, producing voiceovers, editing audio, and repurposing content across formats.`,
    toolSlugs: [
      {
        slug: 'claude-ai',
        why: 'Claude is the preferred AI writing partner for creators who care about voice. Where other AI tools produce generic content, Claude follows nuanced style instructions reliably — give it three examples of your best scripts and ask it to match the structure and tone, and the output is genuinely close. Creators use it for YouTube script first drafts, newsletter outlines, video description SEO copy, and the analytical content (explainers, breakdowns) that is time-consuming to write from scratch.',
      },
      {
        slug: 'chatgpt',
        why: 'For ideation, research, and quick content generation, ChatGPT is the all-rounder most creators keep open alongside their main tools. Use it to generate 20 video title variations for A/B testing, research a topic you\'re covering for the first time, draft social captions in bulk, or think through a content series structure. Its breadth makes it the best tool for the varied creative problem-solving that content creation requires.',
      },
      {
        slug: 'canva-ai',
        why: 'Thumbnails and channel art have an outsized impact on click-through rates, and Canva AI makes it possible to produce professional thumbnail variations quickly without a design background. Its text-to-image generation helps when you need custom illustrations, its background removal handles product shots and talking-head cutouts, and its templates ensure your channel has a consistent visual identity that builds brand recognition over time.',
      },
      {
        slug: 'elevenlabs',
        why: 'For creators who produce voiceover content — explainer videos, documentary-style narration, audio-only formats, or dubbed content for international audiences — ElevenLabs produces the most natural-sounding AI voice available. Its voice cloning feature can create a model of your own voice from a short recording, allowing you to generate narration without a recording setup, fix errors without re-recording, and produce content in languages you do not speak.',
      },
      {
        slug: 'descript',
        why: 'Descript is the AI-native editing tool that fundamentally changes how creators work with audio and video. Edit your recording by editing the transcript — delete a sentence in the text and it disappears from the video. Overdub corrects recording mistakes by typing. Studio Sound removes background noise and room echo with one click. For podcast creators and talking-head YouTube channels, Descript removes the most time-consuming parts of post-production.',
      },
      {
        slug: 'midjourney',
        why: 'For creators who produce visual content — thumbnails, channel banners, educational illustration, brand imagery, or conceptual visuals for their niche — Midjourney produces stunning results that are consistently better than stock photography. Creators use it for thumbnail background plates, custom illustrations that match their visual brand, and concept art for video series. The quality ceiling is higher than any other AI image tool, which matters when thumbnail performance directly impacts revenue.',
      },
    ],
    steps: [
      {
        title: 'Build a scriptwriting system that preserves your voice',
        description: 'Give Claude three of your best scripts and ask it to analyze the structure, pacing, and voice patterns it observes. Use that analysis as the brief for future scripts — you\'ll get first drafts that require editing rather than complete rewrites. Most creators using this approach report cutting script production time by 50–70% while maintaining the authentic voice their audience expects.',
      },
      {
        title: 'Add visual and audio production tools',
        description: 'Once your script workflow is efficient, layer in Canva AI for thumbnails and Descript for audio/video editing. These two tools together address the highest-time-cost production tasks after scripting. ElevenLabs and Midjourney are worth adding once you have a clear use case — voiceover production or custom visuals — rather than adopting them speculatively.',
      },
      {
        title: 'Automate content repurposing and distribution',
        description: 'Every long-form piece you produce should generate multiple short-form outputs: clips, carousels, email newsletters, tweets. Build a workflow that takes your main content and prompts AI to extract the best moments, reformat for each platform, and batch-produce the distribution assets. This is where creators get the compounding benefit — one hour of filming becomes a week of content.',
      },
    ],
    faq: [
      {
        question: 'Which AI is best for YouTube scripts?',
        answer: 'Claude is consistently the top recommendation for YouTube scripts because its output sounds more like a specific person and less like generic AI content. The key is feeding it examples of your existing work and being specific about your audience and style. ChatGPT is a strong second choice and better for rapid ideation and title/thumbnail brainstorming. Many successful creators use both: ChatGPT to develop the concept and structure, Claude to write the script.',
      },
      {
        question: 'Can AI actually help with video editing?',
        answer: 'For transcript-based editing (podcasts, talking-head videos, interviews), Descript is a genuine game-changer — editing by text rather than timeline is dramatically faster. For more complex narrative or cinematic editing, current AI tools are less helpful. The audio processing features in Descript (noise removal, leveling, Studio Sound) work well across all video types and save meaningful time even if you do the cut in a traditional timeline editor.',
      },
      {
        question: 'Will audiences know if I use AI in my content creation?',
        answer: 'If used well, no — and this is the wrong question. Audiences care about value, entertainment, and authenticity. AI tools that help you produce cleaner audio, better thumbnails, and more tightly structured scripts improve the viewer experience. The risk is using AI to generate content without adding genuine creative judgment — that produces generic output that audiences do sense, even if they cannot name why. The best creators use AI for production efficiency while keeping their perspective, opinions, and personality fully intact.',
      },
    ],
  },

  startups: {
    slug: 'startups',
    name: 'Startups',
    tagline: 'Move faster, spend less, and compete above your weight class.',
    icon: '🚀',
    iconBg: 'bg-indigo-50',
    intro: `Startups face an asymmetric challenge: they need to do everything a mature company does — product, marketing, sales, operations, customer support — with a fraction of the resources. AI does not solve the resource constraint, but it fundamentally changes the leverage ratio. A five-person team with the right AI stack can operate at the output level of a ten-person team without the associated burn rate.

The startups using AI most effectively are not using it for one-off tasks — they are building it into their operating system. Every recurring task that is AI-compatible gets automated or AI-assisted, freeing the human team for the judgment-intensive work that actually differentiates the company.`,
    toolSlugs: [
      {
        slug: 'claude-ai',
        why: 'Startups produce an enormous volume of written output: pitch decks, investor updates, product specs, job descriptions, customer emails, help documentation, and blog content. Claude handles all of it, and its 200K context window means you can paste in your entire product brief and get output that is coherent with your positioning. Founders use it as a thinking partner for strategy and a production tool for everything that needs to be written — often replacing multiple software subscriptions in the process.',
      },
      {
        slug: 'chatgpt',
        why: 'For a startup team that needs one versatile AI tool across all functions, ChatGPT\'s breadth is hard to beat. Use it for competitor research and market analysis, generating sales email sequences, drafting investor FAQs, writing onboarding documentation, debugging code, and a hundred other tasks that come up in the first year of building a company. The custom GPT feature lets you build specialized assistants for repeated use cases — a sales copilot, a documentation writer, a product spec reviewer.',
      },
      {
        slug: 'notion-ai',
        why: 'Most fast-growing startups run on Notion — it serves as wiki, project tracker, meeting notes system, and CRM simultaneously. The AI add-on transforms this from a passive repository into an active knowledge system. Summarize a month of meeting notes to identify recurring themes, draft OKR updates from raw data, extract action items from design review sessions, and answer questions about your own institutional knowledge. For startups where speed depends on shared context, this is high-leverage.',
      },
      {
        slug: 'zapier-ai',
        why: 'Startups accumulate operational overhead fast — onboarding workflows, CRM updates, notification routing, data sync between tools. Zapier automates the connective tissue before it becomes a headache. Its AI workflow builder means a non-technical founder can describe a workflow in plain English and have it running in an hour. The startups that build clean automation early find that their operations scale much more smoothly than those that build manual processes and try to automate them later.',
      },
      {
        slug: 'perplexity-ai',
        why: 'Competitive intelligence is a full-time job at a startup, and Perplexity AI makes it dramatically more efficient. Use it for rapid research on competitor positioning, industry trends, regulatory changes, and customer pain points. Every answer cites sources you can verify — critical when you are briefing investors or making product decisions based on market research. Founders use it for the background research that used to require a few hours of Googling and reading.',
      },
      {
        slug: 'cursor-ai',
        why: 'For technical startups, Cursor is the AI coding environment that most engineers refuse to give up once they have tried it. Its codebase-aware AI understands your entire project, handles multi-file refactoring, and generates implementations from plain English descriptions. Early-stage startups use it to move faster in the initial build phase — a solo developer with Cursor can maintain the output pace of a small team during the critical months when speed is the primary competitive advantage.',
      },
    ],
    steps: [
      {
        title: 'Build your knowledge infrastructure first',
        description: 'Set up Notion as your central operating system for the company: product decisions, meeting notes, customer insights, and OKRs. Do this in the first month, before institutional knowledge starts living in people\'s heads and email threads. With Notion AI active, this becomes a queryable knowledge base that every team member can search and build on.',
      },
      {
        title: 'Automate your most time-consuming non-core workflows',
        description: 'Make a list of the recurring tasks your team does that are not core to your product or differentiation. Customer onboarding emails, lead routing, meeting summaries, weekly status updates — these are automation opportunities. Use Zapier to automate the ones with clear triggers and outputs. The goal is for your team to spend zero time on any process that does not require judgment.',
      },
      {
        title: 'Use AI for competitive intelligence continuously',
        description: 'Perplexity AI and Claude together make competitive intelligence a daily practice rather than a quarterly exercise. Set a recurring prompt to research your top three competitors each week: new features, pricing changes, job postings (which signal strategic priorities), and customer reviews. Startups that maintain continuous competitive awareness make better product and positioning decisions than those who do competitive analysis once a quarter.',
      },
    ],
    faq: [
      {
        question: 'How do startups use AI to compete with larger companies?',
        answer: 'The leverage is in output-per-person. A startup using AI effectively can produce marketing content, customer support, documentation, and code at a pace that would require a team twice the size without AI. The most effective startup AI applications are: writing (proposals, content, documentation), research (market analysis, competitor intelligence), customer support (AI chatbots for tier-1 queries), and development (AI-assisted coding for technical founders). Combined, these address the core areas where limited headcount creates the biggest bottlenecks.',
      },
      {
        question: 'What is the best AI stack for a 5-person startup?',
        answer: 'The essentials: Claude or ChatGPT ($20/month) for writing and thinking, Notion + Notion AI ($26/month) for knowledge management, and Zapier ($20/month) for automation. That\'s $66/month covering most of what a startup needs AI to do. For technical startups, add Cursor ($20/month). For startups focused on content marketing, add Perplexity Pro ($20/month) for research. The total for a comprehensive AI stack is typically $60–100/month — less than a single hourly consulting engagement.',
      },
      {
        question: 'Can AI help with fundraising preparation?',
        answer: 'Yes — Claude and ChatGPT are particularly useful for pitch preparation. Use them to stress-test your narrative by prompting them to identify the weakest assumptions in your pitch, generate likely investor questions for each part of your deck, draft responses to common objections, and refine your written materials for clarity and conviction. Perplexity is useful for rapid market sizing research with citations. The preparation advantage is real: founders who have worked through their pitch with AI tend to walk into investor meetings with more complete, stress-tested answers.',
      },
    ],
  },

  'restaurant-and-hospitality': {
    slug: 'restaurant-and-hospitality',
    name: 'Restaurants & Hospitality',
    tagline: 'Market smarter, serve faster, and run leaner operations.',
    icon: '🍽️',
    iconBg: 'bg-amber-50',
    intro: `Restaurants and hospitality businesses operate on thin margins with high labor costs and relentless customer expectations. Marketing budgets are small, staff bandwidth is limited, and the operational complexity of running a service business means there is little time for anything beyond getting through service.

AI tools built for other industries adapt surprisingly well to hospitality — and the ROI case is clear. If an AI tool saves a restaurant owner two hours of marketing work per week, that is 100 hours per year returned to the business. For hospitality operators running on tight margins, efficiency gains compound directly into profitability.`,
    toolSlugs: [
      {
        slug: 'chatgpt',
        why: 'Restaurant owners use ChatGPT for almost every piece of writing the business produces: menu descriptions, social media captions for daily specials, responses to online reviews, job postings, event promotion copy, and press releases for new openings or chef changes. It also handles one-off operational tasks — write a staff handbook section, draft a vendor email, create a training checklist. For a business owner who is constantly context-switching, having one tool that handles all written communication is genuinely transformative.',
      },
      {
        slug: 'canva-ai',
        why: 'Food is visual. Social media is the most cost-effective marketing channel for restaurants, and the restaurants with the most engaging social presence consistently produce more visually compelling content. Canva AI handles daily specials graphics, event posters, holiday promotions, gift card designs, and social media templates — all with background removal and AI image generation for food photography enhancements. For restaurant operators without a marketing budget, this is how you produce professional-quality visual marketing.',
      },
      {
        slug: 'tidio-ai',
        why: 'Restaurant websites and Google Business profiles generate a constant stream of questions: hours, reservations, dietary restrictions, private event availability, parking. Tidio AI answers these instantly, 24/7, without requiring staff attention. For restaurants that take reservations through their website, an AI chatbot that qualifies and routes inquiries can meaningfully increase booking conversion. It also handles the review responses and follow-up messages that build guest loyalty.',
      },
      {
        slug: 'zapier-ai',
        why: 'Hospitality operations involve repetitive coordination: shift scheduling communications, supplier order confirmations, reservation confirmations, event follow-ups, and review management. Zapier connects your reservation system, email platform, and operations tools so that recurring tasks happen automatically. When a large party books, trigger a confirmation email, alert the kitchen manager, and add it to the event calendar — without anyone manually touching each step.',
      },
      {
        slug: 'claude-ai',
        why: 'For hospitality businesses that produce more substantive written content — hotel blog posts, destination guides, event venue descriptions, catering proposals — Claude produces higher-quality long-form writing than most AI tools. Restaurant groups and hotels use it for the content that represents the brand at its most considered: website copy, press materials, and the longer descriptions that set guest expectations before they arrive.',
      },
      {
        slug: 'notion-ai',
        why: 'Running a restaurant involves an enormous amount of procedural knowledge: opening and closing checklists, training materials, recipe documentation, vendor contacts, maintenance schedules, and event timelines. Notion organizes all of this in one place, and the AI add-on lets you query and update it quickly. Managers use it to draft shift briefings from the day\'s notes, update training materials, and give new staff instant access to the institutional knowledge that would otherwise take months to absorb.',
      },
    ],
    steps: [
      {
        title: 'Fix your social media and online presence first',
        description: 'Use ChatGPT to batch-write two weeks of social media captions at once — daily specials, behind-the-scenes content, staff spotlights, and seasonal promotions. Combine with Canva AI for the visual assets. Set up a weekly 30-minute session to produce your next two weeks of content. Most restaurants that do this see meaningful engagement improvements within the first month.',
      },
      {
        title: 'Handle guest inquiries automatically',
        description: 'Deploy Tidio AI on your website to answer the FAQs that currently reach your front desk by phone or email. Properly configured, an AI chatbot can handle 60–70% of inbound guest questions without human involvement — reservations, hours, menus, private dining availability. The staff hours this recovers can go directly to the guest experience inside the restaurant.',
      },
      {
        title: 'Build operational systems that survive staff turnover',
        description: 'Use Notion to document every procedure, checklist, and piece of institutional knowledge that currently lives in long-tenured staff members\' heads. With Notion AI, new employees can query this knowledge base in plain English rather than waiting for someone to train them. In an industry with high turnover, a well-maintained knowledge system is one of the most valuable operational investments you can make.',
      },
    ],
    faq: [
      {
        question: 'Can AI actually help a small restaurant with marketing?',
        answer: 'Absolutely — and the ROI is particularly clear for restaurants because the alternative (hiring a marketing person or agency) is expensive relative to the margins. ChatGPT and Canva AI together handle most of what a part-time marketing coordinator would do: social media content, email newsletters, event promotions, and review responses. The investment is roughly $35–40/month for both tools. Most restaurants that use them consistently see higher engagement and more direct reservations within 60–90 days.',
      },
      {
        question: 'How do hotels use AI for customer service?',
        answer: 'Hotels primarily use AI for pre-arrival communications (answering guest questions, providing local recommendations, confirming amenities), in-stay service requests (room service, housekeeping, maintenance routing), and post-stay follow-up (review requests, loyalty program communications). AI chatbots like Tidio handle the first and last categories well as a starting point. Larger hotel groups are increasingly deploying purpose-built hospitality AI platforms, but for independent properties, general-purpose AI chatbots deliver most of the practical benefit at a fraction of the cost.',
      },
      {
        question: 'What is the ROI of AI tools for a small restaurant?',
        answer: 'The clearest ROI comes from time savings on marketing and administrative tasks. A typical small restaurant spends 3–5 hours per week on social media, review responses, and routine written communications. AI tools can reduce this to 60–90 minutes. At a manager\'s hourly cost of $25–35/hour, that\'s $75–175/week in recovered labor value — roughly $4,000–9,000 per year — from a toolset that costs less than $100/month. The less quantifiable but equally real benefit is the improvement in marketing consistency and quality that comes from having professional-grade tools rather than improvised solutions.',
      },
    ],
  },
};

export function getAllIndustryPages(): IndustryPage[] {
  return Object.values(industryPages);
}

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages[slug];
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(industryPages);
}
