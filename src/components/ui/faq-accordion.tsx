'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from './card';

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="space-y-3">{items.map((item, i) => <Card key={item.q}><button className="flex w-full items-center justify-between text-left font-[var(--font-jakarta)] text-lg font-semibold" onClick={() => setOpen(open === i ? null : i)}>{item.q}<ChevronDown className={`h-4 w-4 transition ${open === i ? 'rotate-180' : ''}`} /></button>{open === i ? <p className="mt-3 text-sm leading-6 text-text1">{item.a}</p> : null}</Card>)}</div>;
}
