'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { destinations, processSteps, type DestinationId, type OrbitSlot } from './SystemMapData';

const DEFAULT_ID: DestinationId = 'services';


const slotClasses: Record<OrbitSlot, string> = {
  top: 'left-1/2 top-[4%]',
  upperLeft: 'left-[16%] top-[15%]',
  upperRight: 'left-[84%] top-[15%]',
  left: 'left-[6%] top-[39%]',
  right: 'left-[94%] top-[39%]',
  lowerLeft: 'left-[16%] top-[75%]',
  lowerRight: 'left-[84%] top-[75%]',
  bottom: 'left-1/2 top-[92%]',
};

export function RapidRiseSystemMap() {
  const [activeId, setActiveId] = useState<DestinationId>(DEFAULT_ID);
  const activeDestination = useMemo(() => destinations.find((d) => d.id === activeId) ?? destinations[0], [activeId]);

  return (
    <section id="home-hero" className="hero-shell relative overflow-hidden border-b border-white/10 text-white">
      <div className="hero-bg pointer-events-none absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex min-h-[920px] w-full max-w-[1600px] flex-col px-4 pb-12 pt-7 sm:px-8 lg:px-10 xl:px-12">
        <header className="hero-nav mx-auto mb-10 flex h-[68px] w-full max-w-[1420px] items-center justify-between gap-4 rounded-[20px] px-5 md:px-7">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" width={236} height={52} className="h-10 w-auto md:h-11" priority />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-100 lg:flex">
            {['Solutions:/solutions', 'Work:/work', 'Pricing:/pricing', 'Education:/education', 'About:/about', 'Contact:/contact'].map((item) => {
              const [label, href] = item.split(':');
              return (
                <Link key={label} href={href} className="transition-colors duration-300 hover:text-[#60a5fa] focus-visible:text-[#93c5fd]">
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden h-9 items-center rounded-full border border-emerald-300/25 bg-emerald-500/10 px-3 text-xs text-emerald-100 md:inline-flex"> 
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />Response within 24h
            </span>
            <Link href="/quote" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563eb,#3b82f6)] px-5 text-sm font-medium text-white shadow-[0_14px_36px_rgba(37,99,235,0.35)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="hero-main hidden flex-1 xl:grid xl:grid-cols-[minmax(280px,0.82fr)_minmax(640px,1.42fr)_minmax(390px,0.96fr)] xl:gap-[54px] 2xl:grid-cols-[minmax(300px,0.85fr)_minmax(670px,1.46fr)_minmax(400px,1fr)]">
          <div className="pt-20 2xl:pt-24">
            <h1 className="max-w-[392px] font-serif text-[clamp(48px,4.2vw,72px)] font-medium leading-[0.98] tracking-[-0.04em] text-[#f8fafc]">
              From Chaos<br />to Clarity.<br />From Insight<br />to <span className="text-[#3b82f6] [text-shadow:0_0_32px_rgba(37,99,235,0.25)]">Impact.</span>
            </h1>
            <p className="mt-11 max-w-[400px] text-[17px] leading-[1.7] text-[rgba(226,232,240,0.78)]">Rapid Rise AI connects your people, processes, and data into one intelligent operating system that drives results.</p>
            <p className="mt-9 text-[13px] tracking-[0.02em] text-[rgba(148,163,184,0.72)]">One connected system. Endless impact.</p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[690px] w-[690px] max-w-full">
              <div className="ring-a" />
              <div className="ring-e" />
              <div className="ring-b" />
              <div className="ring-c" />
              <div className="ring-d" />

              <svg viewBox="0 0 1000 1000" className="absolute inset-0 z-[2] h-full w-full" aria-hidden>
                {destinations.map((d) => {
                  const active = d.id === activeId;
                  return (
                    <g key={d.id} opacity={active ? 1 : 0.6}>
                      <line x1="500" y1="500" x2={d.routePoint.x} y2={d.routePoint.y} stroke={active ? 'rgba(96,165,250,0.85)' : 'rgba(96,165,250,0.27)'} strokeWidth={active ? 2 : 1.35} />
                      <circle cx={d.routePoint.x} cy={d.routePoint.y} r={active ? 6.5 : 4} fill={active ? 'rgba(147,197,253,0.95)' : 'rgba(148,163,184,0.72)'} />
                    </g>
                  );
                })}
              </svg>

              <div className="core absolute left-1/2 top-1/2 z-[5] h-[238px] w-[238px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="core-inner absolute inset-[18px] rounded-full" />
                <div className="core-badge absolute left-1/2 top-[34%] h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full">R</div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-11 text-center">
                  <p className="text-[19px] font-semibold tracking-[0.12em] text-[#f8fafc]">OPERATING CORE</p>
                  <p className="mt-1 text-[10.5px] tracking-[0.13em] text-[#93c5fd]">CAPTURE • AUTOMATE • GROW</p>
                </div>
              </div>

              {destinations.map((d) => {
                const Icon = d.icon;
                const active = d.id === activeId;
                return (
                  <Link
                    key={d.id}
                    href={d.href}
                    onMouseEnter={() => setActiveId(d.id)}
                    onFocus={() => setActiveId(d.id)}
                    className={`destination-card absolute z-[6] ${slotClasses[d.slot]} -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${active ? 'destination-active' : ''} ${d.id === 'services' ? 'destination-services' : ''}`}
                    
                  >
                    <Icon className="mb-[9px] h-6 w-6 text-[#93c5fd]" strokeWidth={1.85} />
                    <p className="text-[16.5px] font-semibold leading-[1.12] tracking-[0.01em] text-white">{d.title}</p>
                    <p className="mt-[6px] line-clamp-2 text-[12.25px] leading-[1.42] text-[rgba(203,213,225,0.8)]">{d.shortDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside key={activeDestination.id} className="preview-panel relative min-h-[650px] rounded-[32px] p-10">
            <p className="inline-flex rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-[#93c5fd]">{activeDestination.label}</p>
            <h2 className="mt-6 font-serif text-[56px] leading-[0.95] text-white">{activeDestination.title}</h2>
            <div className="mt-5 h-[2px] w-12 rounded-full bg-[#f5c451]" />
            <p className="mt-7 text-[16px] leading-[1.65] text-[rgba(226,232,240,0.78)]">{activeDestination.description}</p>

            <ul className="mt-8 space-y-6">
              {activeDestination.benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li key={benefit.title} className="flex gap-4">
                    <Icon className="mt-0.5 h-6 w-6 text-[#60a5fa]" strokeWidth={1.9} />
                    <div>
                      <p className="text-[16px] font-semibold text-white">{benefit.title}</p>
                      <p className="text-[14px] leading-[1.45] text-[rgba(148,163,184,0.9)]">{benefit.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link href={activeDestination.href} className="mt-8 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563eb,#3b82f6)] text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110">
              {activeDestination.cta} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/solutions" className="mt-4 inline-flex items-center gap-1 text-[15px] text-[#60a5fa] hover:text-[#93c5fd]">
              {activeDestination.secondaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>

        <div className="mx-auto w-full max-w-[1120px] xl:-mt-2 xl:pl-[2%]">
          <div className="process-strip mt-8 inline-flex h-[86px] w-full max-w-[530px] items-center gap-4 rounded-[24px] px-6">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-4 text-[15px] text-slate-200">
                  <span className="inline-flex items-center gap-2"><Icon className="h-5 w-5 text-[#60a5fa]" />{step.label}</span>
                  {idx < processSteps.length - 1 ? <span className="text-slate-500">→</span> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 xl:hidden">
          <h1 className="max-w-[720px] font-serif text-[clamp(48px,10vw,72px)] leading-[0.98] tracking-[-0.04em]">From Chaos to Clarity. From Insight to <span className="text-[#3b82f6]">Impact.</span></h1>
          <p className="max-w-[700px] text-[17px] leading-[1.65] text-[rgba(226,232,240,0.78)]">Rapid Rise AI connects your people, processes, and data into one intelligent operating system that drives results.</p>
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-blue-300/25 bg-[radial-gradient(circle,rgba(17,30,53,.92),rgba(5,12,22,.96))] text-sm tracking-[0.1em]">OPERATING CORE</div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {destinations.map((d) => (
              <button key={d.id} onClick={() => setActiveId(d.id)} className={`min-h-[126px] min-w-[240px] rounded-2xl border p-4 text-left ${activeId === d.id ? 'border-blue-400/80 bg-blue-500/10 shadow-[0_14px_30px_rgba(37,99,235,0.25)]' : 'border-slate-400/30 bg-slate-900/70'}`}>
                <p className="text-lg font-semibold text-white">{d.title}</p>
                <p className="mt-1 text-[13px] leading-[1.4] text-slate-300">{d.shortDescription}</p>
              </button>
            ))}
          </div>
          <aside className="preview-panel relative rounded-[28px] p-7">
            <p className="inline-flex rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-[11px] tracking-[0.12em] text-[#93c5fd]">{activeDestination.label}</p>
            <h2 className="mt-4 font-serif text-5xl">{activeDestination.title}</h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-slate-300">{activeDestination.description}</p>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .hero-shell { background: linear-gradient(160deg, #030712 0%, #050b16 35%, #08111f 62%, #020617 100%); }
        .hero-bg { background-image: radial-gradient(circle at 47% 45%, rgba(37, 99, 235, 0.20), transparent 40%), radial-gradient(circle at 84% 44%, rgba(37, 99, 235, 0.14), transparent 32%), linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px); background-size: auto, auto, 78px 78px, 78px 78px; }
        .hero-vignette { box-shadow: inset 0 0 180px rgba(0,0,0,0.6); }
        .hero-nav { background: rgba(4, 12, 24, 0.72); border: 1px solid rgba(120, 170, 255, 0.14); box-shadow: 0 16px 40px rgba(2,6,23,.45); backdrop-filter: blur(14px); }
        .ring-a, .ring-b, .ring-c, .ring-d, .ring-e { position:absolute; left:50%; top:50%; border-radius:9999px; transform:translate(-50%,-50%); pointer-events:none; }
        .ring-a { width: 650px; height: 650px; border: 1px solid rgba(148,163,184,.12); }
        .ring-b { width: 585px; height: 585px; border: 1px dashed rgba(96,165,250,.19); }
        .ring-c { width: 510px; height: 510px; border: 1px solid rgba(148,163,184,.1); }
        .ring-d { width: 430px; height: 430px; border: 1px solid rgba(59,130,246,.14); }
        .ring-e { width: 350px; height: 350px; border: 1px solid rgba(148,163,184,.09); }
        .core { border:1px solid rgba(147,197,253,.22); background: radial-gradient(circle at 50% 35%, rgba(96,165,250,.18), rgba(15,23,42,.96) 55%, rgba(2,6,23,1) 100%); box-shadow:0 0 0 1px rgba(59,130,246,.08),0 24px 80px rgba(0,0,0,.55),0 0 90px rgba(37,99,235,.22); animation: breathe 7s ease-in-out infinite; }
        .core-inner { border: 1px solid rgba(147,197,253,.2); }
        .core-badge { border: 1px solid rgba(96,165,250,.7); display:flex; align-items:center; justify-content:center; font-size:34px; font-weight:600; background: radial-gradient(circle,rgba(30,64,175,.3),rgba(15,23,42,.9)); box-shadow:0 0 30px rgba(59,130,246,.35); }
        .destination-card { display:block; width: 172px; min-height: 132px; padding: 15px 15px 14px; border:1px solid rgba(156,176,201,.36); border-radius:20px; background:linear-gradient(180deg, rgba(23, 37, 59, 0.97), rgba(6, 12, 25, 0.985)); box-shadow:0 34px 86px rgba(0,0,0,.56),0 14px 36px rgba(2,6,23,.42),0 2px 0 rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.14),inset 0 0 0 1px rgba(148,163,184,.2); backdrop-filter: blur(5px); transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; overflow:hidden; }
        .destination-card::before { content:''; position:absolute; left:0; right:0; top:0; height:50%; background:linear-gradient(180deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.04) 36%, transparent 100%); pointer-events:none; }
        .destination-card:hover { transform:translate(-50%,-56%); border-color: rgba(125,186,255,.84); box-shadow:0 38px 94px rgba(0,0,0,.58),0 12px 32px rgba(2,6,23,.45),0 0 40px rgba(59,130,246,.34),inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 0 1px rgba(147,197,253,.3); }
        .destination-active { border-color:rgba(147,197,253,.98); box-shadow:0 0 0 1px rgba(147,197,253,.72),0 0 0 2px rgba(37,99,235,.38),0 34px 92px rgba(14,42,104,.62),0 0 56px rgba(96,165,250,.34),inset 0 1px 0 rgba(255,255,255,.2),inset 0 0 0 1px rgba(191,219,254,.38); }
        .destination-services { width: 202px; min-height: 156px; border-radius:20px; padding: 16px 16px 15px; }
        .destination-services::after { content:''; position:absolute; left:14%; right:14%; bottom:-17px; height:26px; border-radius:999px; background:radial-gradient(ellipse at center, rgba(96,165,250,.58) 0%, rgba(59,130,246,.36) 48%, rgba(37,99,235,0) 100%); filter:blur(12px); pointer-events:none; }
        .preview-panel { background: linear-gradient(180deg, rgba(15, 23, 42, 0.94), rgba(2, 6, 23, 0.98)); border:1px solid rgba(148,163,184,.24); box-shadow:0 30px 100px rgba(0,0,0,.58),0 0 92px rgba(37,99,235,.18),inset 0 1px 0 rgba(255,255,255,.08); }
        .preview-panel::after { content:''; position:absolute; right:-40px; bottom:-40px; width:180px; height:180px; border-radius:999px; background:radial-gradient(circle, rgba(37,99,235,.25), transparent 68%); pointer-events:none; }
        .process-strip { background: rgba(15,23,42,.72); border:1px solid rgba(148,163,184,.18); box-shadow:0 16px 45px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05); }
        @keyframes breathe { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.07); } }
      `}</style>
    </section>
  );
}
