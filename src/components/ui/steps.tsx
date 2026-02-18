import { Card } from './card';

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="relative grid gap-4 md:grid-cols-3">
      <div className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-stroke md:block" />
      {items.map((s, idx) => (
        <Card key={s.title} className="relative">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue bg-blue/15 text-sm font-semibold text-blue">{idx + 1}</div>
          <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{s.title}</h3>
          <p className="mt-3 text-sm leading-6 text-text1">{s.body}</p>
        </Card>
      ))}
    </div>
  );
}
