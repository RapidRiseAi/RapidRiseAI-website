export function SystemOrbit({ label }: { label: string }) {
  return (
    <div className="relative mx-auto h-44 w-44 rounded-full border border-blue/40">
      <div className="absolute inset-4 rounded-full border border-blue/25" />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-blue">{label}</div>
    </div>
  );
}
