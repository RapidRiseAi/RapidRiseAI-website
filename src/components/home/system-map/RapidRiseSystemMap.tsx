'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { systemLocations } from './SystemMapData';
import { cn } from '@/lib/utils';

const hub = { x: 50, y: 49 };
const sizeClasses = {
  large: 'w-[220px] h-[120px]',
  medium: 'w-[190px] h-[105px]',
  small: 'w-[170px] h-[96px]',
};

const routePath = (x: number, y: number) => {
  const midY = y > hub.y ? hub.y + 9 : hub.y - 10;
  return `M ${hub.x} ${hub.y} L ${hub.x} ${midY} L ${x} ${midY} L ${x} ${y}`;
};

export function RapidRiseSystemMap() {
  const [activeId, setActiveId] = useState<string>('services');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const active = useMemo(() => systemLocations.find((l) => l.id === activeId) ?? systemLocations[0], [activeId]);
  const selected = useMemo(() => systemLocations.find((l) => l.id === selectedId) ?? null, [selectedId]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedId(null); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <section className='rapid-rise-system-map relative pb-20 pt-10'>
      <div className='system-map-container mx-auto w-full max-w-[1320px] px-4 md:px-8'>
        <div className='system-map-header mx-auto max-w-4xl text-center'>
          <p className='text-xs font-semibold tracking-[0.24em] text-cyan-300'>RAPID RISE SYSTEM MAP</p>
          <h2 className='mt-3 text-[clamp(2rem,4vw,3.3rem)] font-semibold leading-[1.02]'>Explore the Rapid Rise system.</h2>
          <p className='mx-auto mt-4 max-w-3xl text-base text-slate-300 md:text-lg'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
        </div>

        <div className='system-map-board relative mt-10 hidden min-h-[730px] overflow-hidden rounded-[38px] border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_43%,rgba(31,120,188,0.22),transparent_40%),linear-gradient(160deg,#020713,#071126_42%,#020611)] p-10 shadow-[0_32px_120px_rgba(2,8,30,0.7),0_0_70px_rgba(58,164,255,0.25)] lg:block'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(2,7,17,0.75)_100%)]' />
          <div className='system-map-floor pointer-events-none absolute inset-[8%] rounded-[30px] border border-cyan-300/20 bg-[linear-gradient(to_right,rgba(84,180,232,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(84,180,232,0.11)_1px,transparent_1px),radial-gradient(circle_at_50%_46%,rgba(83,230,255,0.2),transparent_46%),linear-gradient(180deg,rgba(7,17,34,0.84),rgba(3,8,21,0.96))] bg-[size:54px_54px,54px_54px,100%_100%,100%_100%] [transform:perspective(1400px)_rotateX(61deg)_translateY(84px)_scale(1.08)]' />
          <div className='pointer-events-none absolute inset-x-[20%] top-[25%] h-[52%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(52,191,255,0.2),rgba(8,26,53,0)_65%)] blur-2xl' />

          <svg className='pointer-events-none absolute inset-[8%]' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden>
            {systemLocations.map((location) => {
              const highlighted = activeId === location.id || selectedId === location.id;
              return (
                <g key={location.id}>
                  {highlighted && <path d={routePath(location.position.x, location.position.y)} stroke='rgba(83,230,255,0.32)' strokeWidth='5' fill='none' strokeLinecap='round' />}
                  <path d={routePath(location.position.x, location.position.y)} stroke={highlighted ? 'rgba(83,230,255,0.72)' : 'rgba(83,230,255,0.18)'} strokeWidth={highlighted ? '3' : '2'} fill='none' strokeLinecap='round' strokeLinejoin='round' />
                </g>
              );
            })}
          </svg>

          <div className='absolute left-1/2 top-[49%] z-20 h-[184px] w-[184px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70 bg-[radial-gradient(circle,rgba(83,230,255,0.56),rgba(3,12,30,0.96))] shadow-[0_0_65px_rgba(83,230,255,0.5)]'>
            <div className='absolute -inset-2 rounded-full border border-cyan-200/20' />
            <div className='absolute inset-3 rounded-full border border-cyan-200/52' />
            <div className='absolute inset-8 rounded-full border border-cyan-200/40' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-sm font-semibold tracking-[0.14em] text-cyan-100'>Rapid Rise AI</p><p className='mt-2 px-4 text-[10px] uppercase tracking-[0.12em] text-cyan-200/90'>Capture • Route • Track • Automate • Report</p></div>
          </div>

          {systemLocations.map((location) => {
            const Icon = location.icon;
            const highlighted = activeId === location.id || selectedId === location.id;
            return (
              <button
                key={location.id}
                type='button'
                onMouseEnter={() => setActiveId(location.id)}
                onFocus={() => setActiveId(location.id)}
                onClick={() => setSelectedId(location.id)}
                className={cn('absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-[linear-gradient(170deg,rgba(8,18,38,0.96),rgba(4,10,22,0.96))] p-3 text-left shadow-[0_18px_28px_rgba(0,0,0,0.48)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70', sizeClasses[location.size], highlighted ? '-translate-y-[calc(50%+7px)] border-cyan-300/80 shadow-[0_0_34px_rgba(83,230,255,0.36)]' : 'border-cyan-300/25 hover:-translate-y-[calc(50%+5px)] hover:border-cyan-300/52')}
                style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
                aria-label={`Open ${location.title} system details`}
              >
                <span className='pointer-events-none absolute -bottom-3 left-4 right-4 h-3 rounded-full bg-cyan-400/30 blur-md' />
                <div className='absolute inset-x-2 -bottom-1 h-[10px] rounded-full border border-cyan-300/25 bg-slate-950/70' />
                <div className='relative flex items-start justify-between gap-2'><span className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-400/10'><Icon className='h-4.5 w-4.5 text-cyan-200' /></span><span className='rounded-full border border-cyan-300/35 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-cyan-100'>{location.status}</span></div>
                <p className='mt-2 text-sm font-semibold text-white'>{location.title}</p>
                <p className='mt-1 text-xs text-slate-300'>{location.description}</p>
              </button>
            );
          })}

          <div className='absolute bottom-6 left-6 z-30 w-[372px] rounded-2xl border border-cyan-300/35 bg-slate-950/70 p-4 shadow-[0_16px_34px_rgba(0,0,0,0.5)] backdrop-blur-md'>
            <p className='text-[11px] uppercase tracking-[0.16em] text-cyan-200'>System Preview</p>
            <h3 className='mt-2 text-lg font-semibold'>{active.title}</h3>
            <p className='mt-1 text-sm text-slate-300'>{active.description}</p>
            <ul className='mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300'>{active.previewBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <p className='mt-3 text-xs uppercase tracking-[0.13em] text-cyan-200/90'>Click to explore</p>
          </div>

          {selected && <aside className='absolute right-6 top-6 z-40 w-[420px] rounded-3xl border border-cyan-300/35 bg-slate-950/85 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.55)] backdrop-blur-sm'>
            <div className='flex items-start justify-between gap-2'><h3 className='text-2xl font-semibold'>{selected.title}</h3><button type='button' onClick={() => setSelectedId(null)} className='rounded-full p-1 text-slate-300 hover:bg-slate-800' aria-label='Close detail panel'><X className='h-5 w-5' /></button></div>
            <p className='mt-2 text-sm text-slate-300'>{selected.description}</p>
            <p className='mt-4 text-sm text-slate-300'><span className='text-cyan-200'>Problem: </span>{selected.detail.problem}</p>
            <p className='mt-2 text-sm text-slate-300'><span className='text-cyan-200'>Rapid Rise fix: </span>{selected.detail.solution}</p>
            <ul className='mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200'>{selected.detail.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            <p className='mt-3 text-xs uppercase tracking-[0.14em] text-cyan-100'>{selected.detail.tools.join(' • ')}</p>
            {selected.id === 'services' && selected.children && <div className='mt-4 rounded-2xl border border-cyan-300/25 bg-slate-900/70 p-3'><p className='text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200'>Service modules</p><ul className='mt-2 space-y-2'>{selected.children.map((service) => <li key={service.id} className='rounded-xl border border-cyan-300/20 bg-slate-950/75 px-3 py-2 text-sm text-slate-200'><p className='font-medium'>{service.title}</p><p className='text-xs text-slate-300'>{service.description}</p></li>)}</ul></div>}
            <Link href={selected.detail.ctaHref} className='mt-4 inline-flex rounded-xl border border-cyan-300/45 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/20'>{selected.detail.ctaLabel ?? 'Request a Quote'}</Link>
          </aside>}
        </div>

        <div className='mt-8 space-y-3 lg:hidden'>
          <div className='rounded-2xl border border-cyan-300/25 bg-slate-950/80 p-4'>
            <p className='text-xs uppercase tracking-[0.14em] text-cyan-300'>Rapid Rise AI Core</p>
            <p className='mt-2 text-sm text-slate-300'>Capture • Route • Track • Automate • Report</p>
          </div>
          {systemLocations.map((location) => {
            const Icon = location.icon;
            return <details key={location.id} className='rounded-2xl border border-cyan-300/25 bg-slate-950/80 p-4'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-3'><span className='inline-flex items-center gap-2'><Icon className='h-4 w-4 text-cyan-200' /><span className='font-semibold'>{location.title}</span></span><span className='text-xs text-cyan-100'>{location.status}</span></summary>
              <p className='mt-2 text-sm text-slate-300'>{location.description}</p>
              <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300'>{location.previewBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              {location.id === 'services' && location.children && <div className='mt-3 rounded-xl border border-cyan-300/25 bg-slate-900/70 p-3'><p className='text-xs uppercase tracking-[0.14em] text-cyan-200'>Service modules</p><ul className='mt-2 space-y-2 text-sm text-slate-300'>{location.children.map((service) => <li key={service.id}>{service.title}</li>)}</ul></div>}
              <Link href={location.detail.ctaHref} className='mt-3 inline-flex rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100'>Request a Quote</Link>
            </details>;
          })}
        </div>
      </div>
    </section>
  );
}
