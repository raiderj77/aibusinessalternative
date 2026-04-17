export const stacks = [
  {
    id: "freelancer",
    name: "Freelancer Stack",
    slug: "freelancer",
    description: "Essential AI tools for solo freelancers to automate writing, design, and scheduling.",
    bestFor: "Solo freelancers, consultants, digital nomads",
    estimatedMonthlyCost: { low: 0, high: 20 },
    tools: [
      {
        name: "Claude",
        purpose: "Writing, code, analysis, brainstorming",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "Notion",
        purpose: "Project management, note-taking, CRM",
        url: "https://notion.so",
        pricing: "Free tier available",
        tier: "free"
      },
      {
        name: "Canva",
        purpose: "Design graphics, social posts, presentations",
        url: "https://canva.com",
        pricing: "Free tier available, Pro $180/year",
        tier: "free"
      },
      {
        name: "Otter.ai",
        purpose: "Meeting transcription and notes",
        url: "https://otter.ai",
        pricing: "Free tier available, Pro $10/mo",
        tier: "free"
      }
    ]
  },
  {
    id: "marketing-agency",
    name: "Marketing Agency Stack",
    slug: "marketing-agency",
    description: "Complete suite for agencies managing multiple client campaigns.",
    bestFor: "Marketing agencies, in-house marketing teams",
    estimatedMonthlyCost: { low: 400, high: 800 },
    tools: [
      {
        name: "Claude",
        purpose: "Content creation, strategy, campaign ideation",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "Semrush",
        purpose: "SEO, competitive analysis, keyword research",
        url: "https://semrush.com",
        pricing: "From $139.95/mo",
        tier: "paid"
      },
      {
        name: "Canva Pro",
        purpose: "Design and templates for all marketing materials",
        url: "https://canva.com",
        pricing: "$180/year or $15/mo",
        tier: "paid"
      },
      {
        name: "Buffer",
        purpose: "Social media scheduling and analytics",
        url: "https://buffer.com",
        pricing: "Free tier available, Pro from $5/mo",
        tier: "free"
      }
    ]
  },
  {
    id: "saas-startup",
    name: "SaaS Startup Stack",
    slug: "saas-startup",
    description: "Everything needed to build, launch, and scale a SaaS product.",
    bestFor: "Startup founders, product teams, developers",
    estimatedMonthlyCost: { low: 0, high: 100 },
    tools: [
      {
        name: "Claude",
        purpose: "Product spec writing, API integration, debugging",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "Linear",
        purpose: "Issue tracking and product management",
        url: "https://linear.app",
        pricing: "Free tier available, Pro $8/mo per seat",
        tier: "free"
      },
      {
        name: "Vercel",
        purpose: "Deploy and host web applications instantly",
        url: "https://vercel.com",
        pricing: "Free tier available, Pro $20/mo",
        tier: "free"
      },
      {
        name: "GitHub",
        purpose: "Code repository and collaboration",
        url: "https://github.com",
        pricing: "Free tier available",
        tier: "free"
      }
    ]
  },
  {
    id: "content-creator",
    name: "Content Creator Stack",
    slug: "content-creator",
    description: "AI-powered tools for YouTube creators, podcasters, and content producers.",
    bestFor: "YouTube creators, podcasters, video producers",
    estimatedMonthlyCost: { low: 0, high: 50 },
    tools: [
      {
        name: "Claude",
        purpose: "Script writing, video outlines, content ideas",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "Descript",
        purpose: "Video editing, transcription, captions",
        url: "https://descript.com",
        pricing: "Free tier available, Creator $12/mo",
        tier: "free"
      },
      {
        name: "Canva",
        purpose: "Thumbnails, graphics, video templates",
        url: "https://canva.com",
        pricing: "Free tier available, Pro $15/mo",
        tier: "free"
      },
      {
        name: "Buffer",
        purpose: "Schedule and distribute across social platforms",
        url: "https://buffer.com",
        pricing: "Free tier available, Creator $8/mo",
        tier: "free"
      }
    ]
  },
  {
    id: "ecommerce",
    name: "E-commerce Stack",
    slug: "ecommerce",
    description: "AI and automation tools for online store owners to manage products, marketing, and customer service.",
    bestFor: "E-commerce store owners, product managers",
    estimatedMonthlyCost: { low: 100, high: 300 },
    tools: [
      {
        name: "Claude",
        purpose: "Product descriptions, customer service, marketing copy",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "Shopify",
        purpose: "Online store platform and hosting",
        url: "https://shopify.com",
        pricing: "From $39/mo",
        tier: "paid"
      },
      {
        name: "Klaviyo",
        purpose: "Email marketing and customer data",
        url: "https://klaviyo.com",
        pricing: "Free up to 250 contacts",
        tier: "free"
      },
      {
        name: "Canva",
        purpose: "Product images and marketing graphics",
        url: "https://canva.com",
        pricing: "Free tier available",
        tier: "free"
      }
    ]
  },
  {
    id: "legal-contracts",
    name: "Legal/Contract Stack",
    slug: "legal-contracts",
    description: "AI tools for legal professionals and business owners to extract, analyze, and manage contracts.",
    bestFor: "Lawyers, legal teams, small business owners",
    estimatedMonthlyCost: { low: 0, high: 50 },
    tools: [
      {
        name: "Claude",
        purpose: "Contract analysis, legal research, document review",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "ContractExtract",
        purpose: "AI-powered contract extraction and analysis",
        url: "https://contractextract.com",
        pricing: "Free tier + pay-per-use",
        tier: "free"
      },
      {
        name: "Notion",
        purpose: "Document management and knowledge base",
        url: "https://notion.so",
        pricing: "Free tier available, Plus $10/mo",
        tier: "free"
      }
    ]
  },
  {
    id: "small-business",
    name: "Small Business Stack",
    slug: "small-business",
    description: "Affordable suite of tools for small business owners to manage operations and growth.",
    bestFor: "Small business owners, solo entrepreneurs",
    estimatedMonthlyCost: { low: 80, high: 150 },
    tools: [
      {
        name: "Claude",
        purpose: "Business planning, customer communication, content",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "QuickBooks",
        purpose: "Accounting and invoicing",
        url: "https://quickbooks.intuit.com",
        pricing: "From $30/mo",
        tier: "paid"
      },
      {
        name: "Mailchimp",
        purpose: "Email marketing and customer communication",
        url: "https://mailchimp.com",
        pricing: "Free tier available",
        tier: "free"
      },
      {
        name: "Calendly",
        purpose: "Scheduling and appointment booking",
        url: "https://calendly.com",
        pricing: "Free tier available",
        tier: "free"
      }
    ]
  },
  {
    id: "developer",
    name: "Developer Stack",
    slug: "developer",
    description: "Essential AI coding tools and platforms for building modern applications faster.",
    bestFor: "Software developers, engineering teams",
    estimatedMonthlyCost: { low: 10, high: 50 },
    tools: [
      {
        name: "Claude Code",
        purpose: "AI-assisted coding, debugging, architecture",
        url: "https://anthropic.com",
        pricing: "Free tier available, Claude Pro $20/mo",
        tier: "free"
      },
      {
        name: "GitHub Copilot",
        purpose: "AI code completion and suggestions",
        url: "https://github.com",
        pricing: "$10/mo or free with GitHub Pro",
        tier: "paid"
      },
      {
        name: "Vercel",
        purpose: "Deploy and host full-stack applications",
        url: "https://vercel.com",
        pricing: "Free tier available, Pro $20/mo",
        tier: "free"
      },
      {
        name: "Linear",
        purpose: "Issue tracking and sprint planning",
        url: "https://linear.app",
        pricing: "Free tier available",
        tier: "free"
      }
    ]
  }
];

export type Stack = typeof stacks[0];
