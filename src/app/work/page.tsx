import type { Metadata } from 'next';
import { WorkProofGalleryPage } from '@/components/work/proof-gallery';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Work | Rapid Rise AI',
  description: 'View Rapid Rise AI work examples across lead capture, workflow automation, web apps, websites, and training systems.',
  path: '/work',
});

export default function WorkPage() {
  return <WorkProofGalleryPage />;
}
