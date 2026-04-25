import type { Metadata } from 'next';
import { SolutionsPageSections } from '@/components/content/SolutionsPageSections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Solutions | Rapid Rise AI',
  description: 'Explore Rapid Rise AI solutions for lead capture, workflow automation, workspace systems, web apps, websites, and team training.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return <SolutionsPageSections />;
}
