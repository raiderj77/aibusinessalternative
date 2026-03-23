export interface AICategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  featured: boolean;
}

export const categories: AICategory[] = [
  {
    slug: 'writing',
    name: 'AI Writing & Content',
    description: 'AI-powered writing assistants, content generators, and editing tools that help you create blog posts, marketing copy, emails, and more in a fraction of the time.',
    icon: '✍️',
    toolCount: 8,
    featured: true,
  },
  {
    slug: 'image-generation',
    name: 'AI Image Generation',
    description: 'Create stunning visuals, illustrations, and artwork using AI. From photorealistic images to artistic styles, these tools turn text prompts into professional graphics.',
    icon: '🎨',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'video-creation',
    name: 'AI Video Creation',
    description: 'Produce professional videos with AI-powered editing, generation, and avatar technology. Create marketing videos, tutorials, and social content without a film crew.',
    icon: '🎬',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'coding',
    name: 'AI Coding & Development',
    description: 'Accelerate software development with AI code assistants, full-stack agents, and automated debugging tools that help developers ship faster.',
    icon: '💻',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'marketing',
    name: 'AI Marketing & SEO',
    description: 'Optimize your marketing strategy with AI tools for SEO analysis, content optimization, social media management, and campaign automation.',
    icon: '📈',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'customer-service',
    name: 'AI Customer Service',
    description: 'Automate customer support with AI chatbots, ticket routing, and intelligent response systems that provide 24/7 assistance and reduce response times.',
    icon: '🎧',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'productivity',
    name: 'AI Productivity & Automation',
    description: 'Streamline workflows and automate repetitive tasks with AI-powered productivity tools for scheduling, note-taking, transcription, and process automation.',
    icon: '⚡',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'design',
    name: 'AI Design & Creative',
    description: 'Design logos, presentations, websites, and marketing materials with AI-assisted creative tools that make professional design accessible to everyone.',
    icon: '🎯',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'business-intelligence',
    name: 'AI Business Intelligence',
    description: 'Transform raw data into actionable insights with AI-powered analytics, reporting, and data visualization tools that help you make smarter business decisions.',
    icon: '📊',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'audio-voice',
    name: 'AI Audio & Voice',
    description: 'Generate realistic voiceovers, edit podcasts, create music, and clone voices with AI audio tools that are revolutionizing sound production.',
    icon: '🎙️',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'research',
    name: 'AI Research & Knowledge',
    description: 'Accelerate research with AI tools that search academic papers, summarize documents, answer questions with citations, and help you learn faster.',
    icon: '🔬',
    toolCount: 6,
    featured: true,
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents & Automation',
    description: 'Deploy autonomous AI agents that can plan, execute, and complete complex multi-step tasks with minimal human intervention.',
    icon: '🤖',
    toolCount: 6,
    featured: true,
  },
];

export function getCategoryBySlug(slug: string): AICategory | undefined {
  return categories.find(c => c.slug === slug);
}
