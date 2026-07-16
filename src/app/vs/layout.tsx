import type { Metadata } from 'next';
import ResearchArchive from '@/components/ResearchArchive';
import { unreviewedRobots } from '@/lib/editorial';

export const metadata: Metadata = { robots: unreviewedRobots };
export default function VersusLayout({ children }: { children: React.ReactNode }) { void children; return <ResearchArchive section="AI-versus-service comparisons" />; }
