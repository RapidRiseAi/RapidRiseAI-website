'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { destinations, processSteps, type DestinationId } from './SystemMapData';

const DEFAULT_ID: DestinationId = 'services';

export function RapidRiseSystemMap() {
  const [activeId, setActiveId] = useState<DestinationId>(DEFAULT_ID);
  const activeDestination = useMemo(() => destinations.find((d) => d.id === activeId) ?? destinations[0], [activeId]);

  return (
    <section id="home-hero" className="relative overflow-hidden border-b border-white/10 bg-[#05080d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(59,130,246,0.20),transparent_42%),radial-gradient(circle_at_86%_50%,rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

      <div className="relative mx-auto max-w-[1540px] px-4 pb-12 pt-6 sm:px-8 lg:pb-16">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[rgba(4,12,22,0.72)] px-4 py-3 backdrop-blur md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" width={184} height={38} className="h-9 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-slate-200 lg:flex">
            {['Solutions:/solutions','Work:/work','Pricing:/pricing','Education:/education','About:/about','Contact:/contact'].map((item) => {
              const [label, href] = item.split(':');
              return <Link key={label} href={href} className="transition hover:text-sky-300">{label}</Link>;
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-emerald-400/25 bg-emerald-500/8 px-3 py-1 text-xs text-emerald-200 md:inline-flex">●&nbsp;Response within 24h</span>
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-xl bg-[#2f7cff] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,124,255,0.35)] hover:bg-[#3f88ff]">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </header>

        <div className="hidden grid-cols-[0.8fr_1.3fr_0.82fr] gap-6 xl:grid">
          <div className="pt-16">
            <h1 className="font-serif text-[clamp(3rem,4.7vw,5.2rem)] leading-[0.98] tracking-tight text-slate-50">From Chaos<br/>to Clarity.<br/>From Insight<br/>to <span className="text-[#3b82f6]">Impact.</span></h1>
            <p className="mt-8 max-w-[420px] text-lg leading-relaxed text-slate-300">Rapid Rise AI connects your people, processes, and data into one intelligent operating system that drives results.</p>
            <p className="mt-10 text-sm text-slate-400">One connected system. Endless impact.</p>
          </div>

          <div className="relative h-[760px]">
            <svg viewBox="0 0 1000 760" className="absolute inset-0 h-full w-full" aria-hidden>
              {destinations.map((d) => {
                const active = activeId === d.id;
                return <g key={d.id} opacity={active ? 1 : 0.45}><line x1="500" y1="380" x2={d.position.x} y2={d.position.y} stroke={active ? 'rgba(96,165,250,0.95)' : 'rgba(148,163,184,0.35)'} strokeWidth={active ? 2.4 : 1.1} /><circle cx={d.position.x} cy={d.position.y} r={active ? 6 : 4} fill={active ? '#60a5fa' : '#64748b'} /></g>;
              })}
            </svg>
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/35 bg-[radial-gradient(circle,rgba(17,30,53,0.92)_0%,rgba(5,12,22,0.94)_68%)] shadow-[0_0_70px_rgba(59,130,246,0.24),inset_0_0_40px_rgba(96,165,250,0.12)]">
              <div className="absolute inset-5 rounded-full border border-blue-200/30" />
              <div className="absolute inset-12 rounded-full border border-blue-100/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-semibold">R</span>
                <p className="mt-4 text-[12px] tracking-[0.18em] text-slate-100">OPERATING CORE</p>
                <p className="mt-2 text-[11px] tracking-[0.08em] text-sky-300">CAPTURE • AUTOMATE • GROW</p>
              </div>
            </div>
            {destinations.map((d) => {
              const Icon = d.icon;
              const active = activeId === d.id;
              return <Link key={d.id} href={d.href} onMouseEnter={() => setActiveId(d.id)} onFocus={() => setActiveId(d.id)} className={`absolute w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-4 backdrop-blur transition ${active ? 'border-blue-400/80 bg-[linear-gradient(180deg,rgba(18,32,52,0.98),rgba(7,13,24,0.95))] shadow-[0_16px_40px_rgba(59,130,246,0.35)]' : 'border-slate-400/25 bg-[linear-gradient(180deg,rgba(18,32,52,0.88),rgba(7,13,24,0.84))] hover:-translate-y-[52%] hover:border-blue-300/60'}`} style={{ left: `${(d.position.x / 1000) * 100}%`, top: `${(d.position.y / 760) * 100}%` }}>
                <Icon className="mb-2 h-5 w-5 text-sky-300" />
                <p className="text-lg font-medium text-white">{d.title}</p>
                <p className="mt-1 text-sm text-slate-300">{d.shortDescription}</p>
              </Link>;
            })}
          </div>

          <aside className="rounded-[28px] border border-blue-200/30 bg-[linear-gradient(180deg,rgba(8,18,32,0.9),rgba(6,12,22,0.92))] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.9),0_0_40px_rgba(59,130,246,0.2)]">
            <p className="inline-flex rounded-full border border-blue-300/30 px-3 py-1 text-xs tracking-[0.12em] text-blue-300">{activeDestination.label}</p>
            <h2 className="mt-5 font-serif text-6xl leading-none">{activeDestination.title}</h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-[#d8a84f]" />
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{activeDestination.description}</p>
            <ul className="mt-8 space-y-5">
              {activeDestination.benefits.map((benefit) => {
                const Icon = benefit.icon;
                return <li key={benefit.title} className="flex gap-3"><Icon className="mt-0.5 h-5 w-5 text-sky-300" /><div><p className="text-xl text-slate-100">{benefit.title}</p><p className="text-slate-400">{benefit.text}</p></div></li>;
              })}
            </ul>
            <Link href={activeDestination.href} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f7cff] px-5 py-3 text-lg">{activeDestination.cta} <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/solutions" className="mt-4 inline-flex text-base text-blue-300">{activeDestination.secondaryCta}</Link>
          </aside>
        </div>

        <div className="space-y-5 xl:hidden">
          <h1 className="font-serif text-5xl leading-tight">From Chaos to Clarity. From Insight to <span className="text-[#3b82f6]">Impact.</span></h1>
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-blue-300/30 bg-slate-900/70">OPERATING CORE</div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {destinations.map((d) => <button key={d.id} onClick={() => setActiveId(d.id)} className={`min-w-[220px] rounded-xl border p-3 text-left ${activeId === d.id ? 'border-blue-400 bg-blue-500/10' : 'border-slate-500/40 bg-slate-900/60'}`}><p className="font-medium">{d.title}</p><p className="text-sm text-slate-400">{d.shortDescription}</p></button>)}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[rgba(8,16,28,0.72)] p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return <div key={step.label} className="flex items-center gap-3"><span className="inline-flex items-center gap-2"><Icon className="h-4 w-4 text-sky-300" />{step.label}</span>{idx < processSteps.length - 1 ? <span className="text-slate-500">→</span> : null}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
