'use client';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { systemModules, serviceModules, type ServiceModule } from './SystemMapData';
import { ServiceTicker } from './ServiceTicker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { useMemo, useState } from 'react';

export function RapidRiseSystemMapExperience() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [detail, setDetail] = useState<ServiceModule | null>(null);
  const selected = useMemo(() => systemModules.find((m) => m.id === active), [active]);

  return <div className='relative overflow-hidden bg-[#040916] text-white'>
    <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25' />
    <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_40%),radial-gradient(circle_at_80%_55%,rgba(37,99,235,0.16),transparent_44%)]' />
    <HomeHero />
    <div className='relative -mt-8'><ServiceTicker /></div>
    <section className='relative z-10 mx-auto hidden max-w-[1400px] px-8 pb-28 pt-20 xl:block'>
      <h2 className='text-system-h2'>Rapid Rise System Map</h2><p className='mt-2 max-w-3xl text-text-secondary'>Enter the operating layer. Hover locations, then click to zoom and explore modules.</p>
      <motion.div className='relative mt-10 h-[760px] [perspective:1200px]'>
        <div className={cn('absolute inset-0 rounded-[2rem] border border-cyan-300/25 bg-slate-950/55 [transform:rotateX(56deg)_translateY(130px)]', active && !reduceMotion ? 'scale-[0.95]' : 'scale-100')} />
        <svg className='pointer-events-none absolute inset-0' viewBox='0 0 100 100' preserveAspectRatio='none'>
          {systemModules.map((m) => <line key={m.id} x1='50' y1='50' x2={m.position.x} y2={m.position.y} stroke={active===m.id?'#67e8f9':'rgba(103,232,249,.24)'} strokeWidth='0.32' />)}
        </svg>
        <div className='absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-cyan-400/15 text-center shadow-[0_0_50px_rgba(56,189,248,.35)]'><p className='mt-6 text-xs tracking-[.2em] text-cyan-200'>RAPID RISE AI</p><p className='text-[10px] text-slate-300'>Capture · Route · Track · Automate · Report</p></div>
        {systemModules.map((m)=>{ const Icon=m.icon; return <button key={m.id} onClick={()=>setActive(m.id)} onMouseEnter={()=>setActive(m.id)} className={cn('absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-slate-950/80 p-3 text-left transition', m.accent==='cyan'?'border-cyan-300/45':'border-blue-300/35', active===m.id?'scale-105 shadow-[0_0_28px_rgba(56,189,248,.35)]':'hover:-translate-y-[55%]')} style={{left:`${m.position.x}%`, top:`${m.position.y}%`}}><Icon className='h-4 w-4 text-cyan-200'/><p className='mt-2 text-sm font-semibold'>{m.title}</p><p className='text-xs text-slate-300'>{m.description}</p></button>;})}
      </motion.div>
      <AnimatePresence>{selected && <motion.aside initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} className='rounded-2xl border border-cyan-300/35 bg-slate-950/88 p-5'>
        <div className='flex items-center justify-between'><h3 className='text-xl'>{selected.title}</h3><Link href={selected.ctaHref} className='text-cyan-200'>{selected.ctaLabel}</Link></div>
        <ul className='mt-3 list-disc pl-5 text-sm text-slate-300'>{selected.previewBullets.map((b)=><li key={b}>{b}</li>)}</ul>
        {selected.id==='services' && <div className='mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3'>{serviceModules.map((s)=><button key={s.id} onClick={()=>setDetail(s)} className='rounded-xl border border-cyan-300/20 bg-slate-900/70 p-3 text-left'><p className='text-sm font-semibold'>{s.title}</p><p className='text-xs text-slate-300'>{s.outcome}</p></button>)}</div>}
      </motion.aside>}</AnimatePresence>
    </section>
    <section className='relative z-10 px-4 pb-20 pt-10 xl:hidden'><h2 className='text-2xl font-semibold'>Explore the Rapid Rise system</h2><div className='mt-4 space-y-3'>{systemModules.map((m)=> <details key={m.id} className='rounded-xl border border-cyan-300/25 bg-slate-950/75 p-3'><summary className='cursor-pointer text-sm font-semibold'>{m.title} <span className='text-slate-300'>— {m.description}</span></summary><ul className='mt-2 list-disc pl-5 text-sm text-slate-300'>{m.previewBullets.map((b)=><li key={b}>{b}</li>)}</ul>{m.id==='services' && <div className='mt-3 grid gap-2'>{serviceModules.map((s)=><button key={s.id} onClick={()=>setDetail(s)} className='rounded-lg border border-cyan-300/20 bg-slate-900/75 p-2 text-left text-sm'>{s.title}</button>)}</div>}<Link href={m.ctaHref} className='mt-3 inline-flex text-cyan-200'>{m.ctaLabel}</Link></details>)}</div></section>
    <AnimatePresence>{detail && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='fixed inset-0 z-50 bg-slate-950/80 p-4 backdrop-blur-sm'><motion.div initial={{y:24}} animate={{y:0}} exit={{y:24}} className='mx-auto mt-10 max-w-2xl rounded-2xl border border-cyan-300/35 bg-slate-950 p-5'><div className='flex items-start justify-between'><h3 className='text-2xl'>{detail.title}</h3><button onClick={()=>setDetail(null)} aria-label='Close detail panel'><X/></button></div><p className='mt-3 text-sm text-slate-300'><span className='text-cyan-200'>Pain:</span> {detail.pain}</p><p className='mt-2 text-sm text-slate-300'><span className='text-cyan-200'>Solution:</span> {detail.solution}</p><ul className='mt-3 list-disc pl-5 text-sm text-slate-300'>{detail.outcomes.map((o)=><li key={o}>{o}</li>)}</ul><p className='mt-3 text-xs text-cyan-100'>{detail.tools.join(' · ')}</p><Button href={detail.ctaHref} className='mt-4'>{detail.ctaLabel}</Button></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
