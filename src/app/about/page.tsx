import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { AboutExperience } from './about-experience';

export const metadata: Metadata = buildMetadata({
  title: 'About | Rapid Rise AI',
  description:
    'Learn the Rapid Rise AI operating philosophy: practical systems, cleaner workflows, better tracking, and clear handover for real business work.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutExperience />;
}
