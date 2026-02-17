import { Card } from './card';

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return <div className="grid gap-4 md:grid-cols-3">{items.map((s, idx) => <Card key={s.title}><p className="text-blue text-sm mb-2">Step {idx + 1}</p><h3 className="font-semibold mb-2">{s.title}</h3><p className="text-sm text-text1">{s.body}</p></Card>)}</div>;
}
