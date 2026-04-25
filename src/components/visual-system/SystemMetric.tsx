import { GlassPanel } from './GlassPanel';

export function SystemMetric({ label, value }: { label: string; value: string }) {
  return (
    <GlassPanel className="p-4 text-center">
      <p className="text-xl font-semibold text-text0">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text2">{label}</p>
    </GlassPanel>
  );
}
