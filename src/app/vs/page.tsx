import type { Metadata } from 'next';
import ResearchArchive from '@/components/ResearchArchive';
import { unreviewedRobots } from '@/lib/editorial';

export const metadata: Metadata = {
  title: 'Tool-versus-Service Records Under Editorial Review | AI Business Alternative',
  description: 'Unreviewed comparison records remain paused while their changing claims are sourced.',
  robots: unreviewedRobots,
};

export default function VsIndexPage() {
  return <ResearchArchive section="Unreviewed AI-versus-service comparisons" />;
}
