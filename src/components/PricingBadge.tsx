interface PricingBadgeProps {
  pricing: 'free' | 'freemium' | 'paid' | 'free-trial';
  price?: string;
}

const badgeClass: Record<PricingBadgeProps['pricing'], string> = {
  free: 'badge badge-green',
  freemium: 'badge badge-blue',
  paid: 'badge badge-gray',
  'free-trial': 'badge badge-amber',
};

const labels: Record<PricingBadgeProps['pricing'], string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'free-trial': 'Free Trial',
};

export default function PricingBadge({ pricing, price }: PricingBadgeProps) {
  return (
    <span className={badgeClass[pricing]}>
      {labels[pricing]}
      {price && <span className="font-normal opacity-75"> · {price}</span>}
    </span>
  );
}
