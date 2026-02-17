'use client';

import { useState } from 'react';
import { Card } from './card';

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="space-y-3">{items.map((item, i) => <Card key={item.q}><button className="w-full text-left font-semibold" onClick={() => setOpen(open === i ? null : i)}>{item.q}</button>{open === i ? <p className="mt-3 text-text1 text-sm">{item.a}</p> : null}</Card>)}</div>;
}
