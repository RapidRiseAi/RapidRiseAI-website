import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { QuoteExperience } from './quote-experience';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Quote | Rapid Rise AI',
  description: 'Start a guided system diagnostic for AI automations, web apps, websites, and workflow systems tailored to your business.',
  path: '/quote',
});

export default function QuotePage() {
  return <QuoteExperience />;
}
