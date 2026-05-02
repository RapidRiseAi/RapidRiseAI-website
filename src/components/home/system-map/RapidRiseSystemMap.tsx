'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
  const [showNavigationMap, setShowNavigationMap] = useState(false);
  const activeDestination = useMemo(() => destinations.find((d) => d.id === activeId) ?? destinations[0], [activeId]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = showNavigationMap ? 'hidden' : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showNavigationMap]);

  return (
    <section id="home-hero" className="hero-shell relative overflow-visible border-b border-white/10 text-white">
      <div className="hero-bg pointer-events-none absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="hero-atmosphere pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex min-h-[120px] w-full max-w-[1600px] flex-col px-4 pb-6 pt-4 sm:px-8 lg:px-10 xl:px-12">
        <div className="fixed left-0 right-0 top-2 z-[600] flex justify-center px-3">
          <div className="hero-command-nav flex w-full max-w-[520px] items-center justify-end gap-3 rounded-2xl px-3 py-2">
            {showNavigationMap ? (
              <button
                type="button"
                onClick={() => setShowNavigationMap(false)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-300/30 bg-slate-950/70 px-4 text-sm font-medium text-slate-100 transition hover:border-blue-300/55 hover:text-white"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onMouseDown={() => setShowNavigationMap(true)}
              onClick={() => setShowNavigationMap(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-300/30 bg-slate-950/70 px-4 text-sm font-medium text-slate-100 transition hover:border-blue-300/55 hover:text-white"
            >
              Navigation
            </button>
            <Link href="/quote" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563eb,#3b82f6)] px-5 text-sm font-medium text-white shadow-[0_14px_36px_rgba(37,99,235,0.35)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <>
        <div className="hero-main hidden flex-1 lg:grid lg:grid-cols-[minmax(220px,0.72fr)_minmax(520px,1.2fr)_minmax(300px,0.9fr)] lg:gap-8 xl:grid-cols-[minmax(270px,0.82fr)_minmax(640px,1.42fr)_minmax(390px,0.96fr)] xl:gap-[54px] 2xl:grid-cols-[minmax(300px,0.85fr)_minmax(670px,1.46fr)_minmax(400px,1fr)]">
          <div className="pt-14 xl:pt-20 2xl:pt-24">
            <h1 className="max-w-[360px] xl:max-w-[392px] font-serif text-[clamp(40px,3.6vw,72px)] font-medium leading-[0.98] tracking-[-0.04em] text-[#f8fafc]">
              From Chaos<br />to Clarity.<br />From Insight<br />to <span className="text-[#3b82f6] [text-shadow:0_0_32px_rgba(37,99,235,0.25)]">Impact.</span>
            </h1>
            <p className="mt-11 max-w-[400px] text-[17px] leading-[1.7] text-[rgba(226,232,240,0.78)]">Rapid Rise AI connects your people, processes, and data into one intelligent operating system that drives results.</p>
            <p className="mt-9 text-[13px] tracking-[0.02em] text-[rgba(148,163,184,0.72)]">One connected system. Endless impact.</p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[560px] w-[560px] xl:h-[690px] xl:w-[690px] max-w-full">
              <div className="ring-a" />
              <div className="ring-e" />
              <div className="ring-b" />
              <div className="ring-c" />
              <div className="ring-d" />

              <svg viewBox="0 0 1000 1000" className="absolute inset-0 z-[2] h-full w-full" aria-hidden>
                <defs>
                  <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {destinations.map((d) => {
                  const active = d.id === activeId;
                  return (
                    <g key={d.id} opacity={active ? 1 : 0.75}>
                      <line x1="500" y1="500" x2={d.routePoint.x} y2={d.routePoint.y} stroke="rgba(96,165,250,0.22)" strokeWidth={1.6} />
                      <line x1="500" y1="500" x2={d.routePoint.x} y2={d.routePoint.y} stroke={active ? 'rgba(147,197,253,0.95)' : 'rgba(96,165,250,0.42)'} strokeWidth={active ? 2.9 : 2.05} filter="url(#routeGlow)" />
                      <circle cx={d.routePoint.x} cy={d.routePoint.y} r={active ? 7.6 : 5.2} fill={active ? 'rgba(191,219,254,0.98)' : 'rgba(148,163,184,0.86)'} />
                    </g>
                  );
                })}
              </svg>

              <div className="core absolute left-1/2 top-1/2 z-[5] h-[268px] w-[268px] xl:h-[292px] xl:w-[292px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="core-inner absolute inset-[16px] xl:inset-[18px] rounded-full" />
                <div className="core-badge absolute left-1/2 top-[33%] h-[60px] w-[60px] xl:h-[64px] xl:w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full">R</div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-14 text-center">
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
                    className={`destination-card absolute z-[6] ${slotClasses[d.slot]} -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${active ? 'destination-active' : ''} ${d.id === 'services' ? 'destination-services' : ''}`}
                    
                  >
                    <Icon className="mb-2 h-6 w-6 text-[#93c5fd]" strokeWidth={1.85} />
                    <p className="text-[17px] font-semibold leading-tight text-white">{d.title}</p>
                    <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.38] text-[rgba(203,213,225,0.76)]">{d.shortDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside key={activeDestination.id} className="preview-panel relative min-h-[720px] rounded-[32px] p-8 xl:p-10 2xl:min-h-[760px]">
            <p className="inline-flex rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-[#93c5fd]">{activeDestination.label}</p>
            <h2 className="mt-6 font-serif text-[56px] leading-[0.95] text-white">{activeDestination.title}</h2>
            <div className="mt-5 h-[2px] w-12 rounded-full bg-[#f5c451]" />
            <p className="mt-7 text-[16px] leading-[1.65] text-[rgba(226,232,240,0.78)]">{activeDestination.description}</p>

            <ul className="mt-10 space-y-7">
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

        <div className="mx-auto w-full max-w-[1120px] lg:-mt-1 lg:pl-[1%] xl:-mt-2 xl:pl-[2%]">
          <div className="process-strip mt-8 inline-flex h-[90px] w-full max-w-[560px] items-center gap-4 rounded-[24px] px-6">
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

        <div className="space-y-6 lg:hidden">
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
        </>
      </div>


        {showNavigationMap ? (
          <div className="hero-navigation-overlay fixed inset-0 z-[500] overflow-y-auto pt-24" role="dialog" aria-modal="true" aria-label="Navigation map popup">
            <div className="mx-auto w-full max-w-[980px] px-4 pb-12 sm:px-8">
              <div className="rounded-[28px] border border-blue-300/30 bg-[rgba(3,10,24,0.92)] p-6 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                <p className="text-center text-xs font-semibold tracking-[0.14em] text-[#93c5fd]">SYSTEM MAP POPUP</p>
                <h3 className="mt-2 text-center font-serif text-4xl text-white">Navigation</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {destinations.map((d) => (
                    <Link key={`popup-${d.id}`} href={d.href} onClick={() => setShowNavigationMap(false)} className="rounded-xl border border-blue-300/25 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 hover:border-blue-300/55">
                      <span className="block text-base font-semibold text-white">{d.title}</span>
                      <span className="text-slate-300">{d.shortDescription}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

      <style jsx global>{`
        .hero-shell { background: linear-gradient(160deg, #030712 0%, #050b16 35%, #08111f 62%, #020617 100%); }
        .hero-shell .hero-bg { background-image: radial-gradient(circle at 47% 45%, rgba(37, 99, 235, 0.20), transparent 40%), radial-gradient(circle at 84% 44%, rgba(37, 99, 235, 0.14), transparent 32%), linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px); background-size: auto, auto, 78px 78px, 78px 78px; }
        .hero-shell .hero-vignette { box-shadow: inset 0 0 180px rgba(0,0,0,0.6); }
        .hero-shell .hero-atmosphere { background: radial-gradient(circle at 50% 52%, rgba(59,130,246,.18), transparent 34%), radial-gradient(circle at 48% 48%, rgba(96,165,250,.12), transparent 46%); }
        .hero-shell .hero-command-nav { background: rgba(4, 12, 24, 0.78); border: 1px solid rgba(120, 170, 255, 0.2); box-shadow: 0 16px 40px rgba(2,6,23,.45); backdrop-filter: blur(14px); }
        .hero-shell .hero-navigation-overlay { background: linear-gradient(180deg, rgba(2,6,23,.97), rgba(2,6,23,.99)); backdrop-filter: blur(4px); }
        .hero-shell .ring-a, .hero-shell .ring-b, .hero-shell .ring-c, .hero-shell .ring-d, .hero-shell .ring-e { position:absolute; left:50%; top:50%; border-radius:9999px; transform:translate(-50%,-50%); pointer-events:none; }
        .hero-shell .ring-a { width: min(650px, 96%); height: min(650px, 96%); border: 1px solid rgba(148,163,184,.18); box-shadow: 0 0 60px rgba(59,130,246,.08); }
        .hero-shell .ring-b { width: min(585px, 86%); height: min(585px, 86%); border: 1px dashed rgba(96,165,250,.26); }
        .hero-shell .ring-c { width: min(510px, 75%); height: min(510px, 75%); border: 1px solid rgba(148,163,184,.14); }
        .hero-shell .ring-d { width: min(430px, 63%); height: min(430px, 63%); border: 1px solid rgba(59,130,246,.22); }
        .hero-shell .ring-e { width: min(350px, 52%); height: min(350px, 52%); border: 1px solid rgba(148,163,184,.14); }
        .hero-shell .core { border:1px solid rgba(147,197,253,.34); background: radial-gradient(circle at 50% 30%, rgba(96,165,250,.26), rgba(15,23,42,.95) 56%, rgba(2,6,23,1) 100%); box-shadow:0 0 0 1px rgba(59,130,246,.16),0 26px 90px rgba(0,0,0,.58),0 0 118px rgba(37,99,235,.3), inset 0 0 40px rgba(59,130,246,.14); animation: breathe 7s ease-in-out infinite; }
        .hero-shell .core-inner { border: 1px solid rgba(147,197,253,.2); }
        .hero-shell .core-badge { border: 1px solid rgba(96,165,250,.7); display:flex; align-items:center; justify-content:center; font-size:34px; font-weight:600; background: radial-gradient(circle,rgba(30,64,175,.3),rgba(15,23,42,.9)); box-shadow:0 0 30px rgba(59,130,246,.35); }
        .hero-shell .destination-card { display:block; width: 172px; min-height: 132px; border:1px solid rgba(148,163,184,.28); background:linear-gradient(180deg, rgba(20, 32, 52, 0.96), rgba(4, 9, 20, 0.98)); box-shadow:0 22px 60px rgba(0,0,0,.45),0 10px 28px rgba(2,6,23,.35),inset 0 1px 0 rgba(255,255,255,.11); backdrop-filter: blur(4px); transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; overflow:hidden; }
        .hero-shell .destination-card::before { content:''; position:absolute; left:0; right:0; top:0; height:42%; background:linear-gradient(180deg, rgba(255,255,255,.09), transparent); pointer-events:none; }
        .hero-shell .destination-card:hover { transform:translate(-50%,-56%); border-color: rgba(96,165,250,.72); box-shadow:0 30px 82px rgba(0,0,0,.52),0 0 40px rgba(59,130,246,.32),inset 0 1px 0 rgba(255,255,255,.12); }
        .hero-shell .destination-active { border-color:rgba(96,165,250,.9); box-shadow:0 0 0 1px rgba(59,130,246,.4),0 30px 80px rgba(37,99,235,.34),0 0 52px rgba(96,165,250,.22),inset 0 1px 0 rgba(255,255,255,.12); }
        .hero-shell .destination-services { width: 202px; min-height: 156px; }
        .hero-shell .destination-services::after { content:''; position:absolute; left:18%; right:18%; bottom:-16px; height:24px; border-radius:999px; background:rgba(59,130,246,.4); filter:blur(14px); }
        .hero-shell .preview-panel { background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.99)); border:1px solid rgba(148,163,184,.3); box-shadow:0 34px 108px rgba(0,0,0,.6),0 0 108px rgba(37,99,235,.24),inset 0 1px 0 rgba(255,255,255,.1); }
        .hero-shell .preview-panel::after { content:''; position:absolute; right:-40px; bottom:-40px; width:180px; height:180px; border-radius:999px; background:radial-gradient(circle, rgba(37,99,235,.25), transparent 68%); pointer-events:none; }
        .hero-shell .process-strip { background: linear-gradient(180deg, rgba(15,23,42,.8), rgba(2,6,23,.92)); border:1px solid rgba(148,163,184,.24); box-shadow:0 20px 48px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.08); }
        @keyframes breathe { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.07); } }
      `}</style>
    </section>
  );
}
