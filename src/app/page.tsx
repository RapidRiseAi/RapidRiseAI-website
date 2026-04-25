import type { Metadata } from 'next';
import { HomePageSections } from '@/components/content/HomePageSections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rapid Rise AI | AI Automation and Education',
  description: 'AI automations, chatbots, and AI education for businesses and professionals.',
  path: '/',
});

export default function HomePage() {
  return <HomePageSections />;
}
