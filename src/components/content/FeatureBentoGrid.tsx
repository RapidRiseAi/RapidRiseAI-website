import { FeatureGrid } from '@/components/ui/feature-grid';

export type FeatureBentoItem = { title: string; description: string; href?: string };

export function FeatureBentoGrid({ items }: { items: FeatureBentoItem[] }) {
  return <FeatureGrid items={items} />;
}
