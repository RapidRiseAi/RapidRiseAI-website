'use client';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MousePointerClick, X } from 'lucide-react';
import { systemModules, serviceModules, type ServiceModule, type SystemModule } from './SystemMapData';
import { ServiceTicker } from './ServiceTicker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { useMemo, useState } from 'react';

const routePath = (m: SystemModule) => `M 50 48 L ${m.position.x} 48 L ${m.position.x} ${m.position.y}`;

export function RapidRiseSystemMapExperience() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>('services');
  const [detail, setDetail] = useState<ServiceModule | null>(null);
  const selected = useMemo(() => systemModules.find((m) => m.id === active), [active]);

  return <div className='relative overflow-hidden bg-[#040916] text-white'>
    <HomeHero />
    <div className='relative -mt-8'><ServiceTicker /></div>

    <section className='relative z-10 mx-auto hidden max-w-[1500px] px-8 pb-28 pt-20 xl:block'>
      <p className='text-xs font-semibold tracking-[.22em] text-cyan-300'>INTERACTIVE SYSTEM MAP</p>
      <h2 className='mt-3 text-[clamp(2.4rem,4vw,4.2rem)] font-semibold leading-[.98]'>Navigate your business systems.</h2>
      <p className='mt-3 max-w-3xl text-lg text-slate-300'>Click any destination to explore the systems, services, and workflows your business needs next.</p>

      <div className='relative mt-8 h-[860px] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_62%_42%,rgba(33,107,255,.25),transparent_38%),linear-gradient(160deg,#020815,#030b1c_38%,#030a18)] [perspective:1500px]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,8,21,.72)_100%)]' />
        <div className='absolute inset-x-[3%] top-[13%] h-[83%] [transform-style:preserve-3d]'>
          <div className='absolute inset-0 rounded-[2.5rem] border border-cyan-400/15 bg-[linear-gradient(to_right,rgba(56,189,248,.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,.11)_1px,transparent_1px),radial-gradient(circle_at_50%_45%,rgba(56,189,248,.18),transparent_45%)] bg-[size:58px_58px,58px_58px,100%_100%] [transform:rotateX(62deg)_rotateZ(-2deg)_translateY(90px)_scale(1.16)]' />
          <svg className='pointer-events-none absolute inset-0 [transform:rotateX(62deg)_rotateZ(-2deg)_translateY(92px)_scale(1.16)]' viewBox='0 0 100 100' preserveAspectRatio='none'>
            {systemModules.map((m) => <path key={m.id} d={routePath(m)} stroke={active===m.id?'rgba(90,235,255,.95)':'rgba(48,145,255,.34)'} strokeWidth={active===m.id?1.15:0.7} fill='none' strokeLinecap='round' />)}
          </svg>

          <div className='absolute left-1/2 top-[48%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/45 bg-[radial-gradient(circle,rgba(56,189,248,.35),rgba(3,18,44,.95))] shadow-[0_0_60px_rgba(56,189,248,.5)]'>
            <div className='absolute inset-3 animate-pulse rounded-full border border-cyan-200/40' />
            <div className='absolute inset-8 rounded-full border border-cyan-300/55 bg-cyan-400/10 text-center pt-10 text-sm tracking-[.14em] text-cyan-100'>RAPID RISE AI</div>
          </div>

          {systemModules.map((m)=>{ const Icon = m.icon; const isActive = active===m.id; return <button key={m.id} onFocus={()=>setActive(m.id)} onMouseEnter={()=>setActive(m.id)} onClick={()=>setActive(m.id)} className={cn('group absolute -translate-x-1/2 -translate-y-1/2 text-left transition focus:outline-none', isActive?'z-30 scale-110':'z-20 hover:scale-105', active && !isActive && !reduceMotion && 'opacity-50')} style={{left:`${m.position.x}%`, top:`${m.position.y}%`}}>
            <div className={cn('relative h-20 w-28 rounded-[1.2rem] border bg-[linear-gradient(170deg,rgba(9,20,44,.92),rgba(2,8,21,.95))] shadow-[0_14px_24px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.05)]', isActive?'border-cyan-300/70 shadow-[0_0_32px_rgba(56,189,248,.48)]':'border-blue-300/30')}><div className='absolute -bottom-2 left-3 right-3 h-2 rounded-full bg-cyan-400/30 blur-sm' /><Icon className='ml-3 mt-3 h-4 w-4 text-cyan-200'/><div className='absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-300/80'/></div>
            <div className='mt-2 w-44 rounded-xl border border-cyan-200/30 bg-slate-950/85 p-2 backdrop-blur-sm'><p className='text-sm font-semibold'>{m.title}</p><p className='text-xs text-slate-300'>{m.description}</p></div>
          </button>;})}
        </div>

        <div className='absolute bottom-6 left-6 rounded-xl border border-cyan-300/20 bg-slate-950/80 p-4 text-sm'><p className='text-xs tracking-[.14em] text-cyan-200'>SYSTEM OVERVIEW</p><p className='mt-3 text-slate-300'>System Status</p><p className='mt-1 inline-flex items-center gap-2 text-emerald-300'><span className='h-2 w-2 rounded-full bg-emerald-400'/>All Systems Operational</p></div>
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/25 bg-slate-950/85 px-6 py-3 text-slate-200'><span className='inline-flex items-center gap-2'><MousePointerClick className='h-4 w-4 text-cyan-200'/>Click any destination to explore</span></div>
      </div>

      <AnimatePresence>{selected && <motion.aside initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} className='mt-5 rounded-2xl border border-cyan-300/30 bg-slate-950/85 p-5'>
        <div className='flex items-center justify-between'><h3 className='text-xl'>{selected.title}</h3><Link href={selected.ctaHref} className='text-cyan-200'>{selected.ctaLabel}</Link></div>
        <ul className='mt-2 list-disc pl-5 text-sm text-slate-300'>{selected.previewBullets.map((b)=><li key={b}>{b}</li>)}</ul>
        {selected.id === 'services' && <div className='mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4'>{serviceModules.map((s)=><button key={s.id} onClick={()=>setDetail(s)} className='rounded-xl border border-cyan-300/22 bg-slate-900/80 p-3 text-left hover:border-cyan-300/50'><p className='text-sm font-semibold'>{s.title}</p><p className='text-xs text-slate-300'>{s.outcome}</p></button>)}</div>}
      </motion.aside>}</AnimatePresence>
    </section>

    <section className='relative z-10 px-4 pb-20 pt-10 xl:hidden'><h2 className='text-2xl font-semibold'>Explore the Rapid Rise system</h2><div className='mt-3 rounded-xl border border-cyan-300/20 bg-slate-950/75 p-4 text-sm text-slate-300'>Tap a destination to open its module and tools.</div><div className='mt-4 space-y-3'>{systemModules.map((m)=> <details key={m.id} className='rounded-xl border border-cyan-300/25 bg-slate-950/75 p-3'><summary className='cursor-pointer text-sm font-semibold'>{m.title} <span className='text-slate-300'>— {m.description}</span></summary><ul className='mt-2 list-disc pl-5 text-sm text-slate-300'>{m.previewBullets.map((b)=><li key={b}>{b}</li>)}</ul>{m.id==='services' && <div className='mt-3 grid gap-2'>{serviceModules.map((s)=><button key={s.id} onClick={()=>setDetail(s)} className='rounded-lg border border-cyan-300/20 bg-slate-900/75 p-2 text-left text-sm'>{s.title}</button>)}</div>}<Link href={m.ctaHref} className='mt-3 inline-flex text-cyan-200'>{m.ctaLabel}</Link></details>)}</div></section>

    <AnimatePresence>{detail && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='fixed inset-0 z-50 bg-slate-950/80 p-4 backdrop-blur-sm'><motion.div initial={{y:20}} animate={{y:0}} exit={{y:20}} className='mx-auto mt-10 max-w-2xl rounded-2xl border border-cyan-300/35 bg-slate-950 p-5'><div className='flex items-start justify-between'><h3 className='text-2xl'>{detail.title}</h3><button onClick={()=>setDetail(null)} aria-label='Close detail panel'><X/></button></div><p className='mt-3 text-sm text-slate-300'><span className='text-cyan-200'>Pain:</span> {detail.pain}</p><p className='mt-2 text-sm text-slate-300'><span className='text-cyan-200'>Solution:</span> {detail.solution}</p><ul className='mt-3 list-disc pl-5 text-sm text-slate-300'>{detail.outcomes.map((o)=><li key={o}>{o}</li>)}</ul><p className='mt-3 text-xs text-cyan-100'>{detail.tools.join(' · ')}</p><Button href={detail.ctaHref} className='mt-4'>{detail.ctaLabel}</Button></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
