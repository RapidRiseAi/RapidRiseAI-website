'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { systemLocations } from './SystemMapData';
import { cn } from '@/lib/utils';

const hubPoint = { x: 50, y: 48 };

const routeFor = (left: string, top: string) => {
  const x = Number.parseFloat(left);
  const y = Number.parseFloat(top);
  const middleX = x > hubPoint.x ? x - 4 : x + 4;
  const middleY = y > hubPoint.y ? hubPoint.y + 8 : hubPoint.y - 8;
  return `M ${hubPoint.x} ${hubPoint.y} L ${hubPoint.x} ${middleY} L ${middleX} ${middleY} L ${x} ${y}`;
};

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string>('services');
  const [selectedId, setSelectedId] = useState<string>('services');

  const hovered = useMemo(() => systemLocations.find((item) => item.id === hoveredId) ?? systemLocations[8], [hoveredId]);
  return (
    <section className='rapid-rise-system-map relative pb-20 pt-12'>
      <div className='mx-auto w-full max-w-[1500px] px-6'>
        <header className='mx-auto max-w-4xl text-center'>
          <p className='text-xs font-semibold tracking-[0.24em] text-cyan-300'>RAPID RISE SYSTEM MAP</p>
          <h2 className='mt-4 text-[clamp(2.1rem,4.4vw,4.2rem)] font-semibold leading-[1.02]'>Explore the Rapid Rise system.</h2>
          <p className='mx-auto mt-5 max-w-3xl text-lg text-slate-300'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
        </header>

        <div className='relative mt-12 hidden h-[750px] w-full overflow-hidden rounded-[34px] border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_52%,rgba(0,194,255,0.20),transparent_28%),radial-gradient(circle_at_78%_35%,rgba(72,64,255,0.10),transparent_30%),linear-gradient(180deg,#03101d_0%,#020711_100%)] shadow-[0_0_50px_rgba(31,140,255,0.14),inset_0_1px_0_rgba(255,255,255,0.05)] xl:block'>
          <svg className='pointer-events-none absolute inset-0 z-[1]' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden>
            <defs>
              <linearGradient id='grid-fade' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='rgba(83,230,255,0.18)' />
                <stop offset='100%' stopColor='rgba(83,230,255,0.04)' />
              </linearGradient>
            </defs>
            {[...Array(44)].map((_, i) => <line key={`v-${i}`} x1={-40 + i * 4} y1='10' x2={10 + i * 4} y2='100' stroke='url(#grid-fade)' strokeWidth='0.08' />)}
            {[...Array(44)].map((_, i) => <line key={`d-${i}`} x1={140 - i * 4} y1='10' x2={90 - i * 4} y2='100' stroke='url(#grid-fade)' strokeWidth='0.08' />)}
          </svg>

          <svg className='pointer-events-none absolute inset-0 z-[2]' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden>
            {systemLocations.map((item) => {
              const active = hoveredId === item.id || selectedId === item.id;
              const path = routeFor(item.position.left, item.position.top);
              return <g key={`route-${item.id}`}>
                {active && <path d={path} stroke='rgba(31,140,255,0.16)' strokeWidth='0.6' fill='none' strokeLinecap='round' />}
                <path d={path} stroke={active ? 'rgba(83,230,255,0.9)' : 'rgba(83,230,255,0.2)'} strokeWidth={active ? '0.22' : '0.14'} fill='none' strokeLinecap='round' />
              </g>;
            })}
          </svg>

          <div className='pointer-events-none absolute left-1/2 top-[48%] z-[4] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/75 bg-[radial-gradient(circle,rgba(41,227,255,0.44),rgba(4,20,43,0.95))] shadow-[0_0_85px_rgba(51,224,255,0.45)]'>
            <div className='absolute inset-3 rounded-full border border-cyan-200/50' />
            <div className='absolute inset-8 rounded-full border border-cyan-200/40' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
              <p className='text-[2rem] font-semibold text-cyan-100'>Rapid Rise AI</p>
              <p className='mt-2 text-[0.72rem] uppercase tracking-[0.17em] text-cyan-100/90'>Capture • Route</p>
              <p className='text-[0.72rem] uppercase tracking-[0.17em] text-cyan-100/90'>Track • Automate • Report</p>
            </div>
          </div>

          {systemLocations.map((item) => {
            const Icon = item.icon;
            const active = hoveredId === item.id || selectedId === item.id;
            return <Link key={item.id} href={item.href} onMouseEnter={() => setHoveredId(item.id)} onFocus={() => setHoveredId(item.id)} onClick={() => setSelectedId(item.id)} className={cn('absolute z-[5] block w-[182px] min-h-[98px] rounded-[17px] border bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.96))] p-[14px] text-left shadow-[0_12px_30px_rgba(0,0,0,0.42),0_0_20px_rgba(31,140,255,0.14)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80', item.id === 'services' ? 'w-[198px] min-h-[110px]' : '', active ? 'scale-[1.02] -translate-y-1 border-cyan-300/75' : 'border-cyan-300/35 hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-300/70')} style={{ left: item.position.left, top: item.position.top }}>
              <span className='pointer-events-none absolute -bottom-[10px] left-[8%] right-[8%] h-3 rounded-full bg-cyan-300/40 blur-[14px]' />
              <div className='flex items-start justify-between gap-2'>
                <span className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/45 bg-cyan-400/12'><Icon className='h-4.5 w-4.5 text-cyan-200' /></span>
                <span className='rounded-full border border-cyan-300/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-cyan-100'>{item.status}</span>
              </div>
              <p className='mt-1.5 text-[17px] font-semibold text-white'>{item.title}</p>
              <p className='mt-1 text-[12px] leading-tight text-slate-300'>{item.description}</p>
            </Link>;
          })}

          <aside className='absolute bottom-6 left-6 z-[6] w-[268px] rounded-[18px] border border-cyan-300/28 bg-slate-950/62 p-[18px] backdrop-blur-md'>
            <p className='text-xs font-semibold tracking-[0.16em] text-cyan-200'>SYSTEM PREVIEW</p>
            <p className='mt-2 text-lg text-slate-200'>{hovered.title}</p>
            <p className='mt-1 text-sm text-slate-300'>{hovered.description}</p>
            <ul className='mt-3 space-y-1 text-sm text-slate-200'>{hovered.previewBullets.slice(0, 3).map((b) => <li key={b}>• {b}</li>)}</ul>
            <p className='mt-4 text-xs text-cyan-100/90'>Click a destination to explore</p>
          </aside>

          

          <div className='absolute bottom-4 left-1/2 z-[6] -translate-x-1/2 text-sm text-slate-300'>Hover to preview • Click to explore • Navigate to destinations</div>
        </div>

        <div className='mt-8 xl:hidden'>
          <div className='rounded-3xl border border-cyan-300/30 bg-[linear-gradient(180deg,rgba(3,15,31,0.92),rgba(2,8,18,0.96))] p-5'>
            <p className='text-xs uppercase tracking-[0.14em] text-cyan-300'>Mobile view (stacked explorer)</p>
            <div className='mt-4 grid gap-3'>
              {systemLocations.map((item) => {
                const Icon = item.icon;
                return <Link key={`m-${item.id}`} href={item.href} className='rounded-2xl border border-cyan-300/30 bg-slate-950/70 p-4'>
                  <div className='flex items-center justify-between'><span className='inline-flex items-center gap-2'><Icon className='h-4 w-4 text-cyan-200' /><span className='font-semibold'>{item.title}</span></span><span className='text-[10px] uppercase text-cyan-100'>{item.status}</span></div>
                  <p className='mt-2 text-sm text-slate-300'>{item.description}</p>
                </Link>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
