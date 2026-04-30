import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { RapidRiseSystemMap } from '@/components/home/system-map/RapidRiseSystemMap';

export const metadata: Metadata = buildMetadata({
  title: 'Rapid Rise AI | AI Automation and Education',
  description: 'AI automations, chatbots, and AI education for businesses and professionals.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <RapidRiseSystemMap />
    </>
  );
}
