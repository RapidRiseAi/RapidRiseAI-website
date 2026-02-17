export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-blue/60 bg-blue/10 px-3 py-1 text-xs font-medium text-blue">{children}</span>;
}
