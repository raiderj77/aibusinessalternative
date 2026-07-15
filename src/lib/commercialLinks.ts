import type { AIToolRaw } from '@/data/tools';

type CommercialTool = Pick<AIToolRaw, 'affiliateUrl' | 'websiteUrl'>;

export type ToolDestination = {
  href: string;
  isAffiliate: boolean;
};

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return value;
  }
}

export function getToolDestination(tool: CommercialTool): ToolDestination {
  const affiliateUrl = tool.affiliateUrl.trim();
  const websiteUrl = tool.websiteUrl.trim();
  const hasUsableAffiliateUrl = affiliateUrl !== '#' && isHttpUrl(affiliateUrl);
  const href = hasUsableAffiliateUrl ? affiliateUrl : websiteUrl;

  return {
    href,
    isAffiliate:
      hasUsableAffiliateUrl && normalizeUrl(affiliateUrl) !== normalizeUrl(websiteUrl),
  };
}
