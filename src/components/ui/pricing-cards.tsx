import { Card } from './card';

export function PricingCards({ cards }: { cards: { title: string; bestFor?: string; includes: string[] }[] }) {
  return <div className="grid gap-4 md:grid-cols-3">{cards.map((c) => <Card key={c.title}><h3 className="font-semibold mb-2">{c.title}</h3>{c.bestFor ? <p className="text-sm text-text1 mb-3">Best for: {c.bestFor}</p> : null}<ul className="space-y-2 text-sm text-text1">{c.includes.map((i) => <li key={i}>• {i}</li>)}</ul></Card>)}</div>;
}
