import { Card } from '@/components/ui/card';

export function BeforeAfterWorkflow({ before, after }: { before: string; after: string }) {
  return (
    <Card className="overflow-hidden p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-danger/90">Before</p>
      <p className="mt-2 text-sm text-text1">{before}</p>
      <div className="my-3 h-px w-full bg-stroke" />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-success">After</p>
      <p className="mt-2 text-sm text-text0">{after}</p>
    </Card>
  );
}
