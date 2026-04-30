'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { systemLocations } from './SystemMapData';
import { cn } from '@/lib/utils';

const routes: Record<string, string> = {
  work: 'M600 390 L520 345 L430 305 L340 255',
  dashboards: 'M600 390 L600 330 L600 225',
  'google-workspace': 'M600 390 L690 335 L790 300 L870 270',
  automation: 'M600 390 L500 405 L395 405 L300 405',
  'internal-tools': 'M600 390 L705 405 L800 425 L880 430',
  training: 'M600 390 L700 455 L800 520 L885 555',
  websites: 'M600 390 L500 450 L405 515 L300 555',
  services: 'M600 390 L600 465 L600 535',
  pricing: 'M600 390 L535 485 L485 575 L430 640',
  contact: 'M600 390 L705 485 L820 580 L930 640',
  'support-assistant': 'M600 390 L485 430 L390 500 L280 545',
  process: 'M600 390 L640 470 L690 560 L735 640',
};

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState('services');
  const hovered = useMemo(() => systemLocations.find((l) => l.id === hoveredId) ?? systemLocations[0], [hoveredId]);

  return <section className='rapid-rise-system-map relative pb-20 pt-12'>
    <div className='mx-auto max-w-[1360px] px-6'>
      <header className='mx-auto max-w-4xl text-center'>
        <p className='text-xs font-semibold tracking-[0.24em] text-cyan-300'>RAPID RISE SYSTEM MAP</p>
        <h2 className='mt-4 text-[clamp(2.1rem,4.4vw,4.2rem)] font-semibold leading-[1.02]'>Explore the Rapid Rise system.</h2>
        <p className='mx-auto mt-5 max-w-3xl text-lg text-slate-300'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
      </header>

      <div className='relative mt-12 hidden h-[780px] w-full overflow-hidden rounded-[36px] border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_50%,rgba(16,190,255,0.16),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(31,140,255,0.16),transparent_24%),linear-gradient(180deg,#03101d_0%,#020712_100%)] shadow-[0_0_70px_rgba(31,140,255,0.12),inset_0_1px_0_rgba(255,255,255,0.05)] lg:block'>
        <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,7,18,0.64)_100%)]' />
        <svg className='pointer-events-none absolute inset-0 z-[2]' viewBox='0 0 1200 720' preserveAspectRatio='none' aria-hidden>
          <defs>
            <clipPath id='floor-clip'><polygon points='160,210 1040,210 1180,660 20,660' /></clipPath>
          </defs>
          <polygon points='160,210 1040,210 1180,660 20,660' fill='rgba(4,18,34,0.48)' stroke='rgba(83,230,255,0.16)' strokeWidth='1' />
          <g clipPath='url(#floor-clip)'>
            {[...Array(22)].map((_, i) => <line key={`a-${i}`} x1={120 + i * 55} y1='210' x2={-160 + i * 55} y2='660' stroke='rgba(83,230,255,0.11)' strokeWidth='1' />)}
            {[...Array(22)].map((_, i) => <line key={`b-${i}`} x1={1080 - i * 55} y1='210' x2={1360 - i * 55} y2='660' stroke='rgba(83,230,255,0.11)' strokeWidth='1' />)}
          </g>
        </svg>

        <svg className='pointer-events-none absolute inset-0 z-[3]' viewBox='0 0 1200 720' preserveAspectRatio='none' aria-hidden>
          {systemLocations.map((location) => {
            const active = hoveredId === location.id || location.id === 'services';
            const path = routes[location.id];
            return <g key={`r-${location.id}`}>
              <path d={path} stroke='rgba(31,140,255,0.16)' strokeWidth='8' strokeLinecap='round' strokeLinejoin='round' fill='none' opacity={active ? 0.6 : 0.15} />
              <path d={path} stroke={active ? 'rgba(83,230,255,0.9)' : 'rgba(83,230,255,0.2)'} strokeWidth={active ? 3 : 2} strokeLinecap='round' strokeLinejoin='round' fill='none' />
            </g>;
          })}
        </svg>

        <div className='pointer-events-none absolute left-1/2 top-[52%] z-[4] h-[70px] w-[230px] -translate-x-1/2 translate-y-[42px] rounded-full bg-[radial-gradient(ellipse,rgba(83,230,255,0.30),transparent_70%)] blur-[18px]' />
        <div className='pointer-events-none absolute left-1/2 top-[52%] z-[5] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-[radial-gradient(circle_at_50%_45%,rgba(83,230,255,0.34),transparent_42%),linear-gradient(180deg,rgba(10,35,52,0.92),rgba(3,12,24,0.96))] shadow-[0_0_55px_rgba(83,230,255,0.22),inset_0_0_35px_rgba(83,230,255,0.10)]'>
          <div className='absolute inset-4 rounded-full border border-cyan-300/30' /><div className='absolute inset-8 rounded-full border border-cyan-300/30' />
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-xl font-semibold text-cyan-100'>Rapid Rise AI</p><p className='text-[10px] uppercase tracking-[0.16em] text-cyan-100'>Capture • Route</p><p className='text-[10px] uppercase tracking-[0.16em] text-cyan-100'>Track • Automate • Report</p></div>
        </div>

        {systemLocations.map((location) => {
          const Icon = location.icon;
          const active = hoveredId === location.id;
          return <Link key={location.id} href={location.href} onMouseEnter={() => setHoveredId(location.id)} onFocus={() => setHoveredId(location.id)} className={cn('absolute z-[6] -translate-x-1/2 -translate-y-1/2 transition duration-200', active ? 'scale-[1.02] -translate-y-[calc(50%+6px)]' : '')} style={{ left: location.position.left, top: location.position.top }}>
            <span className='pointer-events-none absolute left-1/2 top-full h-10 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/40 to-transparent' />
            <span className='pointer-events-none absolute left-1/2 top-[calc(100%+8px)] h-[18px] w-[78%] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[12px]' />
            <span className={cn('block w-[185px] min-h-[104px] rounded-[18px] border bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.96))] p-[14px] shadow-[0_16px_34px_rgba(0,0,0,0.48),0_0_22px_rgba(31,140,255,0.14),inset_0_1px_0_rgba(255,255,255,0.05)]', active ? 'border-cyan-300/70' : 'border-cyan-300/32')}>
              <span className='flex items-start justify-between gap-2'><span className='inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-cyan-300/40'><Icon className='h-4.5 w-4.5 text-cyan-300' /></span><span className='rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-100'>{location.status}</span></span>
              <span className='mt-2 block text-base font-bold text-white'>{location.title}</span>
              <span className='mt-1 block text-xs leading-[1.35] text-slate-300'>{location.description}</span>
            </span>
          </Link>;
        })}

        <aside className='absolute bottom-8 left-8 z-[8] w-[260px] rounded-[20px] border border-cyan-300/30 bg-slate-950/65 p-[18px]'>
          <p className='text-xs font-semibold tracking-[0.16em] text-cyan-200'>SYSTEM PREVIEW</p>
          <p className='mt-2 text-sm text-slate-300'>Hover a destination to preview the system path.</p>
          <ul className='mt-3 space-y-1 text-sm text-slate-200'>{hovered.previewBullets.slice(0, 4).map((b) => <li key={b}>• {b}</li>)}</ul>
          <p className='mt-3 text-xs text-cyan-100'>Click to explore</p>
        </aside>
        <div className='absolute bottom-4 left-1/2 z-[9] -translate-x-1/2 text-sm text-slate-300'>Hover to preview • Click to explore • Navigate to destinations</div>
      </div>

      <div className='mt-8 grid gap-3 lg:hidden'>
        {systemLocations.filter((item) => !['support-assistant','process'].includes(item.id)).map((item) => {
          const Icon = item.icon;
          return <Link key={`m-${item.id}`} href={item.href} className='rounded-2xl border border-cyan-300/30 bg-slate-950/70 p-4'>
            <div className='flex items-center justify-between'><span className='inline-flex items-center gap-2'><Icon className='h-4 w-4 text-cyan-200' /><span className='font-semibold'>{item.title}</span></span><span className='text-[10px] uppercase text-cyan-100'>{item.status}</span></div>
            <p className='mt-2 text-sm text-slate-300'>{item.description}</p>
          </Link>;
        })}
      </div>
    </div>
  </section>;
}
