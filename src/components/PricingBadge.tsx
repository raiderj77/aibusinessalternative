interface PricingBadgeProps {
  pricing: 'free' | 'freemium' | 'paid' | 'free-trial';
  price?: string;
}

const badgeStyles = {
  free: 'bg-green-100 text-green-700',
  freemium: 'bg-blue-100 text-blue-700',
  paid: 'bg-gray-100 text-gray-700',
  'free-trial': 'bg-purple-100 text-purple-700',
} as const;

const labels: Record<PricingBadgeProps['pricing'], string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'free-trial': 'Free Trial',
};

export default function PricingBadge({ pricing, price }: PricingBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[pricing]}`}>
      {labels[pricing]}
      {price && <span className="font-normal">· {price}</span>}
    </span>
  );
}
