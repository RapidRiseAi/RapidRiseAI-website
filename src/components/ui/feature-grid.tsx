import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card } from './card';

export function FeatureGrid({ items }: { items: { title: string; description: string; href?: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Card key={i.title}>
          <Sparkles className="mb-4 h-5 w-5 text-blue" />
          <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{i.title}</h3>
          <p className="mt-3 text-sm leading-6 text-text1">{i.description}</p>
          {i.href ? <Link href={i.href} className="mt-4 inline-flex items-center gap-2 text-sm text-blue">View solution <ArrowRight className="h-4 w-4" /></Link> : null}
        </Card>
      ))}
    </div>
  );
}
