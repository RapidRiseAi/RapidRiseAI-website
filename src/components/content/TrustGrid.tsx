import { SystemMetric } from '@/components/visual-system/SystemMetric';

export function TrustGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((item) => (
        <SystemMetric key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
