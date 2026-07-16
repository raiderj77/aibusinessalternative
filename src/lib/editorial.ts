import type { Metadata } from 'next';

export const unreviewedRobots: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};
