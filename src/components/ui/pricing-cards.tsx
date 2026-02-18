import { Check } from 'lucide-react';
import { Card } from './card';
import { cn } from '@/lib/utils';

export function PricingCards({ cards }: { cards: { title: string; bestFor?: string; includes: string[] }[] }) {
  return <div className="grid gap-4 md:grid-cols-3">{cards.map((c) => {
    const featured = c.title.includes('Core System');
    return <Card key={c.title} className={cn(featured && 'border-blue/70 shadow-glow')}><h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{c.title}</h3>{c.bestFor ? <p className="mt-2 text-sm text-text1">Best for: {c.bestFor}</p> : null}<ul className="mt-5 space-y-2 text-sm text-text1">{c.includes.map((i) => <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-blue" />{i}</li>)}</ul></Card>;
  })}</div>;
}
