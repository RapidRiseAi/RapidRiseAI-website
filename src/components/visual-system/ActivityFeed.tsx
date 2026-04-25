import { StatusPill } from './StatusPill';

export function ActivityFeed({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center justify-between gap-3 rounded-xl border border-stroke px-3 py-2 text-sm text-text1">
          <span>{item}</span>
          <StatusPill>Live</StatusPill>
        </div>
      ))}
    </div>
  );
}
