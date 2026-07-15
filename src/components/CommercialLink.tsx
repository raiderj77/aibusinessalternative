'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

type CommercialLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'rel' | 'onClick'
> & {
  href: string;
  toolSlug: string;
  placement: string;
  isAffiliate?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function CommercialLink({
  href,
  toolSlug,
  placement,
  isAffiliate = false,
  children,
  onClick,
  ...props
}: CommercialLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    window.dispatchEvent(
      new CustomEvent('commercial-outbound-click', {
        detail: { toolSlug, placement },
      }),
    );
    onClick?.(event);
  };

  return (
    <a
      {...props}
      href={href}
      rel={isAffiliate ? 'nofollow sponsored noopener noreferrer' : 'nofollow noopener noreferrer'}
      data-commercial-outbound="true"
      data-tool-slug={toolSlug}
      data-placement={placement}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
