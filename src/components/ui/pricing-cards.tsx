import { Check } from 'lucide-react';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { MobileSnapCarousel } from './mobile-snap-carousel';

export function PricingCards({ cards }: { cards: { title: string; bestFor?: string; includes: string[] }[] }) {
  return (
    <MobileSnapCarousel itemClassName="w-[90%] md:w-auto" desktopClassName="md:grid-cols-3">
      {cards.map((c) => {
        const featured = c.title.includes('Core System');
        return (
          <Card key={c.title} className={cn('h-full', featured && 'border-blue/70 shadow-glow')}>
            <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{c.title}</h3>
            {c.bestFor ? <p className="mt-2 text-sm text-text1">Best for: {c.bestFor}</p> : null}
            <ul className="mt-5 space-y-2 text-sm text-text1">{c.includes.map((i) => <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-blue" />{i}</li>)}</ul>
          </Card>
        );
      })}
    </MobileSnapCarousel>
  );
}
