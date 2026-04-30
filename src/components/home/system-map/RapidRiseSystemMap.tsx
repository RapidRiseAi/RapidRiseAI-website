'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Check, Eye, Star, Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact } from 'lucide-react';
import { useMemo, useState } from 'react';
import { accentStyles, systemMapDestinations } from './SystemMapData';

const SystemMapScene3D = dynamic(() => import('./SystemMapScene3D').then((m) => m.SystemMapScene3D), { ssr: false });
const tools = [Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact, Star, Eye];

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const activeId = hoveredId ?? 'services';
  const active = useMemo(() => systemMapDestinations.find((d) => d.id === activeId) ?? systemMapDestinations[0], [activeId]);

  return <section id='system-map' className='relative overflow-hidden px-6 pb-16 pt-[140px] [scroll-margin-top:120px] max-md:px-4 max-md:pt-[88px] md:pt-[110px]'>
    <div className='mx-auto mb-12 max-w-[780px] px-6 text-center max-md:px-2'>
      <p className='mb-4 text-[13px] font-black uppercase tracking-[0.22em] text-[#32E6FF] md:text-[14px]'>RAPID RISE SYSTEM MAP</p>
      <h2 className='mb-[18px] text-[clamp(42px,4.8vw,64px)] font-black leading-[1.04] tracking-[-0.03em] text-[#F6FAFF]'>Explore the Rapid Rise system.</h2>
      <p className='mx-auto max-w-[720px] text-[clamp(18px,2vw,20px)] leading-[1.58] text-[rgba(220,232,255,0.78)]'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
    </div>

    <div className='map-stage relative mx-auto hidden h-[860px] min-h-[860px] w-[calc(100%-48px)] max-w-[1540px] overflow-hidden rounded-[38px] border border-[rgba(50,230,255,0.34)] lg:block'>
      <div className='stage-map-area absolute inset-y-0 left-0 right-0 xl:right-[345px]'>
        <SystemMapScene3D activeId={activeId} setHoveredId={setHoveredId} reducedMotion={reducedMotion} />
      </div>

      <aside className='services-panel absolute bottom-8 right-7 top-8 z-[20] hidden w-[310px] rounded-[30px] border border-[rgba(255,203,46,.38)] bg-[linear-gradient(180deg,rgba(5,15,30,.98),rgba(2,7,17,1))] p-[30px_24px] xl:block'>
        <p className='text-center text-[13px] font-black tracking-[.18em] text-[#FFCB2E]'>SERVICES</p><div className='mx-auto mt-6 flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[rgba(255,203,46,.48)] bg-[rgba(255,203,46,.10)] text-[#FFCB2E] shadow-[0_0_36px_rgba(255,203,46,.22)]'><Star className='h-9 w-9' /></div>
        <h3 className='mt-6 text-center text-[36px] font-black leading-none text-[#F6FAFF]'>Services</h3><p className='mx-auto mt-3 max-w-[240px] text-center text-[15px] leading-[1.55] text-[rgba(220,232,255,.78)]'>Core offerings and strategic systems that drive results.</p>
        <div className='my-6 h-px bg-white/10' /><ul className='space-y-3 text-[14px] text-[#F6FAFF]'>{systemMapDestinations.find((d) => d.id === 'services')?.previewBullets.map((b) => <li key={b} className='flex gap-2.5'><span className='mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FFCB2E] text-[#051120]'><Check className='h-3 w-3' /></span>{b}</li>)}</ul>
        <p className='mt-6 text-[12px] font-black tracking-[.14em] text-[#FFCB2E]'>CORE TOOLS</p><div className='mt-2 grid grid-cols-5 gap-2.5'>{tools.map((I, i) => <span key={i} className='flex h-[35px] w-[35px] items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-[#53E6FF]'><I className='h-4 w-4' /></span>)}</div>
        <Link href='/solutions' className='mt-6 flex h-[54px] items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#FFCB2E,#FFB000)] text-[15px] font-black text-[#06101C] shadow-[0_0_34px_rgba(255,203,46,.24)]'>Explore Services <ArrowRight className='ml-2 h-4 w-4' /></Link>
      </aside>

      <aside className='absolute bottom-7 left-6 z-[20] hidden w-[250px] rounded-[18px] border border-[rgba(83,230,255,.3)] bg-[rgba(4,14,28,.92)] p-[18px] shadow-[0_18px_48px_rgba(0,0,0,.5),0_0_30px_rgba(31,140,255,.16)] backdrop-blur-[14px] xl:block'>
        <div className='flex items-center justify-between text-[12px] font-black tracking-[.16em] text-[#32E6FF]'>{hoveredId ? active.title.toUpperCase() : 'SYSTEM PREVIEW'} <Eye className='h-4 w-4' /></div>
        <p className='mt-2 text-sm text-[rgba(220,232,255,.78)]'>{hoveredId ? active.description : 'Hover any area to preview how we help.'}</p>
        <ul className='mt-3 space-y-1.5 text-sm text-[#F6FAFF]'>{(hoveredId ? active.previewBullets : ['Capture Leads', 'Automate Work', 'Track Progress', 'Report Results']).slice(0, 5).map((b, i) => <li key={b} className='flex items-center gap-2'><span className='h-2 w-2 rounded-full' style={{ background: ['#32E6FF', '#27EF7D', '#8B5CFF', '#A066FF', '#FFCB2E'][i] }} />{b}</li>)}</ul>
        <p className='mt-[18px] text-[13px] text-[#32E6FF]'>Click a destination to explore &gt;</p>
      </aside>
    </div>

    <div className='mx-auto mt-4 grid max-w-[1540px] gap-3 rounded-[24px] border border-[rgba(83,230,255,.26)] bg-[linear-gradient(180deg,rgba(4,14,28,.88),rgba(2,7,17,.95))] p-4 lg:hidden sm:grid-cols-2'>
      <div className='col-span-full mb-1 flex items-center gap-3 rounded-2xl border border-cyan-300/25 bg-[rgba(8,22,40,.8)] p-4'><div className='h-10 w-10 rounded-full bg-cyan-300/25 shadow-[0_0_20px_rgba(50,230,255,.45)]' /><p className='text-sm text-cyan-100'>Mobile Explorer</p></div>
      {systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon; return <Link key={item.id} href={item.href} className='rounded-2xl border border-[rgba(83,230,255,.26)] bg-[rgba(5,15,30,.88)] p-4'><div className='flex items-start justify-between gap-3'><span className='inline-flex h-10 w-10 items-center justify-center rounded-xl border' style={{ borderColor: `${accent.main}88`, background: accent.soft }}><Icon className='h-5 w-5' style={{ color: accent.main }} /></span><span className='rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase' style={{ borderColor: `${accent.main}66`, color: accent.main }}>{item.tag}</span></div><p className='mt-2 text-base font-bold text-[#F6FAFF]'>{item.title}</p><p className='mt-1 text-sm text-[rgba(220,232,255,.76)]'>{item.description}</p></Link>; })}
    </div>

    <style jsx>{`
      .map-stage{isolation:isolate;background:radial-gradient(circle at 43% 46%, rgba(50,230,255,0.20), transparent 28%),radial-gradient(circle at 44% 76%, rgba(20,121,255,0.18), transparent 32%),radial-gradient(circle at 70% 55%, rgba(139,92,255,0.12), transparent 28%),linear-gradient(180deg,#03101D 0%,#020711 100%);box-shadow:0 0 0 1px rgba(255,255,255,0.035) inset,0 45px 110px rgba(0,0,0,0.58),0 0 95px rgba(20,121,255,0.18)}
      .map-stage:before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center, transparent 36%, rgba(0,0,0,.42) 100%);pointer-events:none;z-index:30}
      .map-stage:after{content:'';position:absolute;left:20px;right:20px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(83,230,255,.65),transparent);pointer-events:none;z-index:31}
      .services-panel{box-shadow:0 22px 70px rgba(0,0,0,.58),0 0 50px rgba(255,203,46,.15),inset 0 1px 0 rgba(255,255,255,.06)}
      .services-panel:before{content:'';position:absolute;left:24px;right:24px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,203,46,.7),transparent)}
      :global(.map3d-card){background:linear-gradient(180deg,rgba(8,22,40,.985),rgba(2,8,18,.98));border:1px solid color-mix(in srgb,var(--accent) 48%, transparent);box-shadow:0 18px 38px rgba(0,0,0,.56),0 0 30px var(--accent-glow),inset 0 1px 0 rgba(255,255,255,.08)}
      :global(.map3d-card:hover),:global(.map3d-card:focus-visible){border-color:var(--accent);box-shadow:0 24px 42px rgba(0,0,0,.6),0 0 36px var(--accent-glow);outline:none}
    `}</style>
  </section>;
}
