import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type PricingSystemCardProps = {
  title: string;
  bestFor?: string;
  includes: string[];
  featured?: boolean;
};

export function PricingSystemCard({ title, bestFor, includes, featured }: PricingSystemCardProps) {
  return (
    <Card className={cn(featured && 'border-blue/70 shadow-glow')}>
      <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{title}</h3>
      {bestFor ? <p className="mt-2 text-sm text-text1">Best for: {bestFor}</p> : null}
      <ul className="mt-5 space-y-2 text-sm text-text1">{includes.map((i) => <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-blue" />{i}</li>)}</ul>
    </Card>
  );
}
