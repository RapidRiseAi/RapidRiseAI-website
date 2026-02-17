'use client';

import { useState } from 'react';
import { Card } from './card';
import { Pill } from './pill';

export function WorkGrid({ filters, items }: { filters: string[]; items: { title: string; problem: string; build: string; tools: string[]; outcome: string; tag: string; sample?: boolean }[] }) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? items : items.filter((i) => i.tag === active);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">{filters.map((f) => <button key={f} className={`rounded-full border px-3 py-1 text-sm ${f === active ? 'bg-blue text-white' : 'bg-transparent'}`} onClick={() => setActive(f)}>{f}</button>)}</div>
      <div className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <Card key={item.title}><div className="mb-2 flex items-center gap-2"><h3 className="font-semibold">{item.title}</h3>{item.sample ? <Pill>Sample build</Pill> : null}</div><p className="text-sm text-text1"><strong>Problem:</strong> {item.problem}</p><p className="text-sm text-text1"><strong>Build:</strong> {item.build}</p><p className="text-sm text-text1"><strong>Outcome:</strong> {item.outcome}</p><div className="mt-3 flex flex-wrap gap-2">{item.tools.map((t) => <Pill key={t}>{t}</Pill>)}</div></Card>)}</div>
    </div>
  );
}
