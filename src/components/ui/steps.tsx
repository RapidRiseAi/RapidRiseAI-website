import { Card } from './card';

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="relative grid gap-4 max-[640px]:gap-2.5 md:grid-cols-3">
      <div className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-stroke md:block" />
      {items.map((s, idx) => (
        <Card key={s.title} className="relative max-[640px]:p-4">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue bg-blue/15 text-sm font-semibold text-blue max-[640px]:mb-3 max-[640px]:h-8 max-[640px]:w-8 max-[640px]:text-xs">{idx + 1}</div>
          <h3 className="font-[var(--font-jakarta)] text-lg font-semibold max-[640px]:text-base">{s.title}</h3>
          <p className="mt-3 text-sm leading-6 text-text1 max-[640px]:mt-2 max-[640px]:text-[15px] max-[640px]:leading-[1.45]">{s.body}</p>
        </Card>
      ))}
    </div>
  );
}
