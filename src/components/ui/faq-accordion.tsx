'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from './card';

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="space-y-3 max-[640px]:space-y-2">{items.map((item, i) => <Card key={item.q} className="max-[640px]:p-3.5"><button className="flex min-h-11 w-full items-center justify-between text-left font-[var(--font-jakarta)] text-lg font-semibold max-[640px]:text-base" onClick={() => setOpen(open === i ? null : i)}>{item.q}<ChevronDown className={`h-4 w-4 shrink-0 transition ${open === i ? 'rotate-180' : ''}`} /></button>{open === i ? <p className="mt-2.5 text-sm leading-[1.55] text-text1 max-[640px]:text-[15px]">{item.a}</p> : null}</Card>)}</div>;
}
