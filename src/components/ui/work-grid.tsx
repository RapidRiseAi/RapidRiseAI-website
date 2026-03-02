'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from './card';
import { Pill } from './pill';
import { MobileSnapCarousel } from './mobile-snap-carousel';

type WorkItem = {
  title: string;
  problem: string;
  build: string;
  tools: string[];
  outcome: string;
  tag: string;
  sample?: boolean;
  image?: string;
};

const categoryImageMap: Record<string, string> = {
  'Lead capture': '/images/work/rapid-rise-ai-sample-build-lead-capture.jpg',
  Automations: '/images/work/rapid-rise-ai-sample-build-automations.jpg',
  'Google Workspace': '/images/work/rapid-rise-ai-sample-build-workspace.jpg',
  'Web apps': '/images/work/rapid-rise-ai-sample-build-web-apps.jpg',
  Websites: '/images/work/rapid-rise-ai-sample-build-websites.jpg',
  Training: '/images/work/rapid-rise-ai-sample-build-training.jpg',
};

function getThumbnail(tag: string, explicitImage?: string) {
  return explicitImage ?? categoryImageMap[tag] ?? '/images/work/rapid-rise-ai-sample-build-automations.jpg';
}

export function WorkGrid({ filters, items, microcopy }: { filters: string[]; items: WorkItem[]; microcopy?: string }) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? items : items.filter((i) => i.tag === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">{filters.map((f) => <button key={f} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition ${f === active ? 'border-blue bg-blue/20 text-white' : 'text-text1 hover:text-text0'}`} onClick={() => setActive(f)}>{f}</button>)}</div>
      {microcopy ? <p className="mb-4 text-xs text-text1">{microcopy}</p> : null}
      <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
        {filtered.map((item) => <Card key={item.title}><Image src={getThumbnail(item.tag, item.image)} alt={`Sample build thumbnail: ${item.tag}`} width={1200} height={675} className="mb-4 aspect-video w-full rounded-xl border border-stroke object-cover object-center" loading="lazy" /><div className="mb-3 flex flex-wrap items-center gap-2"><h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{item.title}</h3>{item.sample ? <Pill className="border-blue/50 text-blue">Sample build</Pill> : null}</div><div className="space-y-3 text-sm text-text1"><p><strong className="text-text0">Problem:</strong> {item.problem}</p><p><strong className="text-text0">Build:</strong> {item.build}</p><p><strong className="text-text0">Outcome:</strong> {item.outcome}</p></div><div className="mt-4 flex flex-wrap gap-2">{item.tools.map((t) => <Pill key={t}>{t}</Pill>)}</div></Card>)}
      </MobileSnapCarousel>
    </div>
  );
}
