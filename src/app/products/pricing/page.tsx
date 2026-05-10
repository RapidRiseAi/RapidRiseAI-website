import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ProductsPricingExperience } from './pricing-experience';

export const metadata: Metadata = buildMetadata({
  title: 'Products and Pricing | Rapid Rise AI',
  description:
    'Choose a fixed-price system to remove manual work fast, compare product scope, or request a custom quote for complex operations.',
  path: '/products/pricing',
});

export default function ProductsPricingPage() {
  return <ProductsPricingExperience />;
}
