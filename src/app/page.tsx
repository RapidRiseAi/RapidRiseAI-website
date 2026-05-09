import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { BusinessLeakMap } from '@/components/home/business-leak-map/BusinessLeakMap';
import { BeforeAfterWorkflow } from '@/components/home/before-after-workflow/BeforeAfterWorkflow';
import { SystemModuleBentoGrid } from '@/components/home/system-module-bento-grid/SystemModuleBentoGrid';
import { StickySystemStory } from '@/components/home/sticky-system-story/StickySystemStory';
import { ProofGalleryPreview } from '@/components/home/proof-gallery-preview/ProofGalleryPreview';
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
      <BusinessLeakMap />
      <BeforeAfterWorkflow />
      <SystemModuleBentoGrid />
      <StickySystemStory />
      <ProofGalleryPreview />
      <RapidRiseSystemMap />
    </>
  );
}
