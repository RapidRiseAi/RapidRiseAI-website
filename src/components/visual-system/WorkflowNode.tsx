import { GlassPanel } from './GlassPanel';

export function WorkflowNode({ title, body }: { title: string; body: string }) {
  return (
    <GlassPanel className="p-4">
      <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text1">{body}</p>
    </GlassPanel>
  );
}
