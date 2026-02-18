'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from './card';
import { Pill } from './pill';

export function WorkGrid({ filters, items }: { filters: string[]; items: { title: string; problem: string; build: string; tools: string[]; outcome: string; tag: string; sample?: boolean; image?: string }[] }) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? items : items.filter((i) => i.tag === active);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">{filters.map((f) => <button key={f} className={`rounded-full border px-4 py-2 text-sm transition ${f === active ? 'border-blue bg-blue/20 text-white' : 'text-text1 hover:text-text0'}`} onClick={() => setActive(f)}>{f}</button>)}</div>
      <div className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <Card key={item.title}>{item.image ? <Image src={item.image} alt="" width={600} height={320} className="mb-4 h-44 w-full rounded-xl border border-stroke object-cover" /> : null}<div className="mb-3 flex flex-wrap items-center gap-2"><h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{item.title}</h3>{item.sample ? <Pill className="border-blue/50 text-blue">Sample build</Pill> : null}</div><div className="space-y-3 text-sm text-text1"><p><strong className="text-text0">Problem:</strong> {item.problem}</p><p><strong className="text-text0">Build:</strong> {item.build}</p><p><strong className="text-text0">Outcome:</strong> {item.outcome}</p></div><div className="mt-4 flex flex-wrap gap-2">{item.tools.map((t) => <Pill key={t}>{t}</Pill>)}</div></Card>)}</div>
    </div>
  );
}
