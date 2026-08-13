'use client';

import { usePathname } from 'next/navigation';

interface CreatorRevenueLinkProps {
  className: string;
  label: string;
}

export default function CreatorRevenueLink({
  className,
  label,
}: CreatorRevenueLinkProps) {
  const pathname = usePathname();
  const rel =
    pathname === '/' ? 'noopener noreferrer' : 'noopener noreferrer nofollow';

  return (
    <a
      href="https://creatorrevenuecalculator.com"
      target="_blank"
      rel={rel}
      className={className}
    >
      {label}
    </a>
  );
}
