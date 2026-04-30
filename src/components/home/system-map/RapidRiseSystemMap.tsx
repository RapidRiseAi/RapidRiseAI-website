'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MousePointerClick, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { serviceModules, systemModules, type ServiceModule, type SystemModule } from './SystemMapData';

type DetailState = { type: 'system'; module: SystemModule } | { type: 'service'; module: ServiceModule } | null;
const hub = { x: 50, y: 50 };

const pathFor = (x: number, y: number) => `M ${hub.x} ${hub.y} L ${(hub.x + x) / 2} ${hub.y} L ${(hub.x + x) / 2} ${y} L ${x} ${y}`;

export function RapidRiseSystemMapExperience() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailState>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>('services');

  const activeId = hovered ?? selected;
  const activeModule = useMemo(() => systemModules.find((m) => m.id === activeId), [activeId]);

  return (
    <section className='relative overflow-hidden px-4 pb-24 pt-20 text-[#F5F8FF] lg:px-8'>
      <div className='mx-auto max-w-[1400px]'>
        <p className='text-xs font-semibold tracking-[.22em] text-cyan-300'>INTERACTIVE SYSTEM MAP</p>
        <h2 className='mt-4 text-[clamp(2.3rem,4.6vw,4.35rem)] font-semibold leading-[.95]'>Navigate your business systems.</h2>
        <p className='mt-4 max-w-3xl text-lg text-slate-300'>Click any destination to explore the systems, services, and workflows your business needs next.</p>

        <div className='mt-10 hidden overflow-hidden rounded-[2.2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_52%_40%,rgba(31,140,255,.22),transparent_34%),linear-gradient(180deg,#020814,#030A16_44%,#04101D)] lg:block'>
          <div className='relative h-[860px] [perspective:1400px]'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_42%,rgba(2,8,20,.75)_100%)]' />
            <motion.div animate={selected && !reduceMotion ? { scale: 1.04 } : { scale: 1 }} className='absolute inset-0 [transform-style:preserve-3d]'>
              <div className='absolute inset-x-[-8%] inset-y-[14%] rounded-[2.3rem] border border-cyan-300/15 bg-[linear-gradient(to_right,rgba(79,181,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,181,255,.12)_1px,transparent_1px),radial-gradient(circle_at_50%_45%,rgba(31,140,255,0.22),transparent_42%),linear-gradient(180deg,rgba(4,12,24,.96),rgba(2,6,14,.98))] bg-[size:86px_86px,86px_86px,100%_100%,100%_100%] [transform:rotateX(58deg)_rotateZ(-2deg)_translateY(95px)_scale(1.12)]' />
              <svg className='pointer-events-none absolute inset-[5%]'>
                {systemModules.map((m) => {
                  const active = activeId === m.id;
                  return <path key={m.id} d={pathFor(m.position.x, m.position.y)} fill='none' stroke={active ? 'rgba(83,230,255,.88)' : 'rgba(31,140,255,.28)'} strokeWidth={active ? 2.8 : 1.8} strokeLinecap='round' strokeLinejoin='round' strokeDasharray={!active && !reduceMotion ? '6 8' : undefined} />;
                })}
              </svg>

              <div className='absolute left-1/2 top-1/2 z-30 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40 bg-[radial-gradient(circle,rgba(83,230,255,.3),rgba(7,18,37,.95)_56%)] shadow-[0_0_70px_rgba(31,140,255,.45)]'>
                <div className='absolute inset-2 rounded-full border border-cyan-200/35' />
                <div className='absolute inset-7 rounded-full border border-cyan-300/45' />
                <div className='absolute inset-12 flex items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-300/10 text-center text-xs font-semibold tracking-[.15em] text-cyan-100'>
                  RAPID RISE AI
                </div>
              </div>

              {systemModules.map((m) => {
                const Icon = m.icon;
                const isActive = activeId === m.id;
                return (
                  <button
                    key={m.id}
                    className={cn('absolute z-40 -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80', selected && selected !== m.id ? 'opacity-45' : 'opacity-100')}
                    style={{ left: `${m.position.x}%`, top: `${m.position.y}%` }}
                    onMouseEnter={() => setHovered(m.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(m.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => {
                      setSelected(m.id);
                      setDetail({ type: 'system', module: m });
                    }}
                    aria-label={`Open ${m.title}`}
                  >
                    <div className={cn('rounded-2xl border bg-[linear-gradient(168deg,rgba(8,18,34,.94),rgba(5,12,24,.9))] p-3 transition', m.size === 'large' ? 'w-44' : m.size === 'medium' ? 'w-40' : 'w-36', isActive ? 'border-cyan-300/70 shadow-[0_0_26px_rgba(83,230,255,.32)] -translate-y-1' : 'border-cyan-300/30')}>
                      <div className='flex items-center justify-between text-[10px] text-cyan-100/80'><Icon className='h-4 w-4' /><span>LIVE</span></div>
                      <p className='mt-2 text-sm font-semibold'>{m.title}</p>
                      <p className='mt-1 text-xs text-slate-300'>{m.description}</p>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {activeModule && (
              <div className='absolute right-6 top-6 z-50 max-w-xs rounded-2xl border border-cyan-300/40 bg-[#071225d9] p-4 backdrop-blur'>
                <p className='text-sm font-semibold text-cyan-100'>{activeModule.title}</p>
                <ul className='mt-2 space-y-1 text-xs text-slate-300'>{activeModule.previewBullets.map((b) => <li key={b}>• {b}</li>)}</ul>
                <p className='mt-3 text-xs text-cyan-200'>Click to explore</p>
              </div>
            )}

            <div className='absolute bottom-6 left-6 rounded-xl border border-cyan-300/30 bg-[#071225d9] px-4 py-2 text-sm text-slate-200'>System Layer: 13 destinations connected</div>
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-[#071225d9] px-5 py-2 text-sm text-slate-200'><span className='inline-flex items-center gap-2'><MousePointerClick className='h-4 w-4 text-cyan-200' />Click a destination to open detail</span></div>
          </div>
        </div>

        <div className='mt-8 space-y-3 lg:hidden'>
          {systemModules.map((m) => (
            <div key={m.id} className='rounded-2xl border border-cyan-300/25 bg-[#071225d9] p-4'>
              <button className='w-full text-left' onClick={() => setMobileOpen((v) => (v === m.id ? null : m.id))} aria-expanded={mobileOpen === m.id}>
                <p className='text-base font-semibold'>{m.title}</p><p className='mt-1 text-sm text-slate-300'>{m.description}</p>
              </button>
              {mobileOpen === m.id && <div className='mt-3 space-y-3 text-sm text-slate-300'><ul className='space-y-1'>{m.previewBullets.map((b) => <li key={b}>• {b}</li>)}</ul>{m.id === 'services' && <div className='grid gap-2'>{serviceModules.map((s) => <button key={s.id} onClick={() => setDetail({ type: 'service', module: s })} className='rounded-lg border border-cyan-300/25 bg-[#0a1630] px-3 py-2 text-left text-xs text-cyan-100'>{s.title}</button>)}</div>}<button onClick={() => setDetail({ type: 'system', module: m })} className='text-cyan-200'>Open detail</button></div>}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {detail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 z-[80] bg-[#020814cc] p-4 backdrop-blur-sm'>
            <motion.div initial={{ y: 24 }} animate={{ y: 0 }} exit={{ y: 24 }} className='mx-auto mt-8 max-w-2xl rounded-3xl border border-cyan-300/40 bg-[linear-gradient(160deg,rgba(8,18,34,.96),rgba(4,11,21,.96))] p-6 text-[#F5F8FF] shadow-[0_18px_80px_rgba(4,16,40,.7)]'>
              <div className='flex items-start justify-between gap-4'><h3 className='text-2xl font-semibold'>{detail.module.title}</h3><button onClick={() => setDetail(null)} aria-label='Close panel' className='rounded-full border border-cyan-300/40 p-2'><X className='h-4 w-4' /></button></div>
              <p className='mt-3 text-sm text-slate-300'>{'outcome' in detail.module ? detail.module.outcome : detail.module.description}</p>
              <p className='mt-4 text-sm text-slate-300'><span className='text-cyan-200'>Problem:</span> {'pain' in detail.module ? detail.module.pain : detail.module.detail.pain}</p>
              <p className='mt-2 text-sm text-slate-300'><span className='text-cyan-200'>Solution:</span> {'solution' in detail.module ? detail.module.solution : detail.module.detail.solution}</p>
              <ul className='mt-4 space-y-1 text-sm text-slate-200'>{('outcomes' in detail.module ? detail.module.outcomes : detail.module.detail.outcomes).map((o) => <li key={o}>• {o}</li>)}</ul>
              <p className='mt-4 text-xs text-cyan-100/90'>{('tools' in detail.module ? detail.module.tools : detail.module.detail.tools).join(' • ')}</p>
              <div className='mt-5 flex gap-3'>
                <Button href={'ctaHref' in detail.module ? detail.module.ctaHref : detail.module.detail.ctaHref}>{'ctaLabel' in detail.module ? detail.module.ctaLabel : detail.module.detail.ctaLabel}</Button>
                <Link href='/contact' className='rounded-full border border-cyan-300/40 px-4 py-2 text-sm text-cyan-100'>Talk to Rapid Rise</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
