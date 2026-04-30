'use client';
import Link from 'next/link';
import { ArrowRight, Check, Eye, Star, Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { accentStyles, systemMapDestinations } from './SystemMapData';

const nodes = Array.from({ length: 156 }, (_, i) => ({ x: 56 + ((i * 71) % 1030), y: 135 + ((i * 53) % 620), r: 1.2 + (i % 5) * 0.24, o: 0.2 + ((i * 7) % 60) / 100 }));
const air = Array.from({ length: 68 }, (_, i) => ({ x: (i * 79) % 1150, y: (i * 113) % 840, o: 0.05 + (i % 5) * 0.03 }));
const tools = [Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact, Star, Eye];

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? 'services';
  const active = useMemo(() => systemMapDestinations.find((d) => d.id === activeId) ?? systemMapDestinations[0], [activeId]);

  return <section id='system-map' className='relative overflow-hidden px-6 pb-16 pt-[140px] [scroll-margin-top:120px] max-md:px-4 max-md:pt-[88px] md:pt-[110px]'>
    <div className='mx-auto mb-12 max-w-[780px] px-6 text-center max-md:px-2'>
      <p className='mb-4 text-[13px] font-black uppercase tracking-[0.22em] text-[#32E6FF] md:text-[14px]'>RAPID RISE SYSTEM MAP</p>
      <h2 className='mb-[18px] text-[clamp(42px,4.8vw,64px)] font-black leading-[1.04] tracking-[-0.03em] text-[#F6FAFF]'>Explore the Rapid Rise system.</h2>
      <p className='mx-auto max-w-[720px] text-[clamp(18px,2vw,20px)] leading-[1.58] text-[rgba(220,232,255,0.78)]'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
    </div>
    <div className='map-stage relative mx-auto hidden h-[840px] min-h-[840px] w-[calc(100%-48px)] max-w-[1540px] overflow-hidden rounded-[38px] border border-[rgba(50,230,255,0.34)] lg:block'>
      <div className='stage-map-area absolute inset-y-0 left-0 right-0 xl:right-[345px]'>
        <svg className='pointer-events-none absolute inset-0 z-[1] h-full w-full' viewBox='0 0 1150 840' preserveAspectRatio='none'>
          <defs><clipPath id='floor'><polygon points='60,125 1090,125 1140,755 10,755' /></clipPath><linearGradient id='floorFade' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stopColor='rgba(50,230,255,.03)' /><stop offset='1' stopColor='rgba(50,230,255,.22)' /></linearGradient></defs>
          <polygon points='60,125 1090,125 1140,755 10,755' fill='rgba(4,18,34,.52)' stroke='rgba(83,230,255,.18)' strokeWidth='1.25' />
          <g clipPath='url(#floor)'>{Array.from({ length: 56 }).map((_, i) => <line key={`a${i}`} x1={-280 + i * 46} y1='755' x2={220 + i * 46} y2='125' stroke={i % 5 === 0 ? 'rgba(50,230,255,0.18)' : 'rgba(50,160,255,0.115)'} strokeWidth={i % 5 === 0 ? 1.1 : 1} />)}{Array.from({ length: 56 }).map((_, i) => <line key={`b${i}`} x1={1440 - i * 46} y1='755' x2={940 - i * 46} y2='125' stroke={i % 5 === 0 ? 'rgba(50,230,255,0.18)' : 'rgba(50,160,255,0.115)'} strokeWidth={i % 5 === 0 ? 1.1 : 1} />)}<rect x='0' y='120' width='1150' height='190' fill='url(#floorFade)' /></g>
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i % 10 === 0 ? 'rgba(139,92,255,.55)' : i % 14 === 0 ? 'rgba(39,239,125,.4)' : 'rgba(50,230,255,.48)'} opacity={n.o} />)}
          <ellipse cx='575' cy='730' rx='380' ry='78' fill='rgba(20,121,255,.16)' filter='blur(7px)' />
          {air.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r='1.1' fill='rgba(220,232,255,.9)' opacity={a.o} />)}
        </svg>

        <svg className='pointer-events-none absolute inset-0 z-[3] h-full w-full' viewBox='0 0 1150 840' preserveAspectRatio='none'>
          {systemMapDestinations.map((item, i) => {
            const a = activeId === item.id; const accent = accentStyles[item.accent].main;
            return <g key={item.id} opacity={a ? 1 : hoveredId ? 0.28 : item.id === 'services' ? 1 : 0.56}>
              <path d={item.route} stroke={accent} strokeWidth='16' fill='none' strokeLinecap='round' opacity={a ? .65 : .14} filter='blur(8px)' />
              <path d={item.route} stroke={accent} strokeWidth='4.5' fill='none' strokeLinecap='round' opacity={a ? 1 : .34} />
              <path d={item.route} stroke='rgba(255,255,255,.9)' strokeWidth='1.2' strokeDasharray='6 9' fill='none' strokeLinecap='round' opacity={a ? .85 : .18} />
              <circle cx={item.anchor.x} cy={item.anchor.y} r='5.2' fill={accent} opacity={a ? .98 : .4} filter='blur(.4px)' />
              {a ? <circle r='3.4' fill={accent}><animateMotion dur={`${2.8 + (i % 4) * 0.2}s`} repeatCount='indefinite' path={item.route} /></circle> : null}
            </g>;
          })}
        </svg>

        <div className='pointer-events-none absolute left-1/2 top-[49%] z-[8] h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2'>
          <div className='absolute left-1/2 top-[calc(50%+58px)] h-[125px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(50,230,255,.40),rgba(20,121,255,.20)_44%,transparent_75%)] blur-[26px]' />
          <div className='hub h-full w-full rounded-full border-2 border-[rgba(83,230,255,0.64)] bg-[radial-gradient(circle_at_50%_48%,rgba(50,230,255,0.32),transparent_42%),linear-gradient(180deg,rgba(6,35,58,0.90),rgba(2,10,22,0.98))] shadow-[0_0_48px_rgba(50,230,255,0.55),0_0_120px_rgba(20,121,255,0.28),inset_0_0_46px_rgba(50,230,255,0.18)]'>
            <div className='ring absolute inset-[18px] rounded-full border border-[rgba(83,230,255,.4)]' /><div className='ring absolute inset-[38px] rounded-full border border-[rgba(83,230,255,.29)]' /><div className='ring absolute inset-[60px] rounded-full border border-[rgba(83,230,255,.2)]' />
            <div className='core absolute left-1/2 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#32E6FF] shadow-[0_0_26px_#32E6FF,0_0_70px_rgba(50,230,255,.85)]' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-[21px] font-black text-[#53E6FF]'>Rapid Rise AI</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.84)]'>CAPTURE • ROUTE</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.84)]'>TRACK • AUTOMATE • REPORT</p></div>
          </div>
        </div>

        {systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon;
          const st = { left: `${item.position.left}%`, top: `${item.position.top}%`, '--accent': accent.main, '--accent-glow': accent.glow, '--scale': item.scale } as CSSProperties;
          return <Link key={item.id} href={item.href} style={st} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(item.id)} onBlur={() => setHoveredId(null)} className={`map-card absolute z-[9] block min-h-[136px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border p-[18px] [transform:translate(-50%,-50%)_scale(var(--scale))] ${item.id === 'support-assistant' ? 'w-[190px]' : 'w-[214px]'}`}>
            <span className='absolute right-4 top-[18px] rounded-full border px-[10px] py-1 text-[10px] font-black uppercase tracking-[.08em]' style={{ borderColor: `${accent.main}73`, background: accent.soft, color: accent.main }}>{item.tag}</span>
            <span className='mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border' style={{ borderColor: `${accent.main}8c`, background: accent.soft, boxShadow: `0 0 24px ${accent.glow}` }}><Icon className='h-6 w-6' style={{ color: accent.main }} /></span>
            <p className='mt-1 text-[17px] font-black leading-[1.1] text-[#F6FAFF]'>{item.title}</p><p className='mt-2 text-[12.5px] leading-[1.35] text-[rgba(220,232,255,.76)]'>{item.description}</p>
          </Link>; })}
      </div>

      <aside className='services-panel absolute bottom-8 right-7 top-8 z-[14] hidden w-[310px] rounded-[30px] border border-[rgba(255,203,46,.38)] bg-[linear-gradient(180deg,rgba(5,15,30,.98),rgba(2,7,17,1))] p-[30px_24px] xl:block'>
        <p className='text-center text-[13px] font-black tracking-[.18em] text-[#FFCB2E]'>SERVICES</p><div className='mx-auto mt-6 flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[rgba(255,203,46,.48)] bg-[rgba(255,203,46,.10)] text-[#FFCB2E] shadow-[0_0_36px_rgba(255,203,46,.22)]'><Star className='h-9 w-9' /></div>
        <h3 className='mt-6 text-center text-[36px] font-black leading-none text-[#F6FAFF]'>Services</h3><p className='mx-auto mt-3 max-w-[240px] text-center text-[15px] leading-[1.55] text-[rgba(220,232,255,.78)]'>Core offerings and strategic systems that drive results.</p>
        <div className='my-6 h-px bg-white/10' /><ul className='space-y-3 text-[14px] text-[#F6FAFF]'>{systemMapDestinations.find((d) => d.id === 'services')?.previewBullets.map((b) => <li key={b} className='flex gap-2.5'><span className='mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FFCB2E] text-[#051120]'><Check className='h-3 w-3' /></span>{b}</li>)}</ul>
        <p className='mt-6 text-[12px] font-black tracking-[.14em] text-[#FFCB2E]'>CORE TOOLS</p><div className='mt-2 grid grid-cols-5 gap-2.5'>{tools.map((I, i) => <span key={i} className='flex h-[35px] w-[35px] items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-[#53E6FF]'><I className='h-4 w-4' /></span>)}</div>
        <Link href='/solutions' className='mt-6 flex h-[54px] items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#FFCB2E,#FFB000)] text-[15px] font-black text-[#06101C] shadow-[0_0_34px_rgba(255,203,46,.24)]'>Explore Services <ArrowRight className='ml-2 h-4 w-4' /></Link>
      </aside>

      <aside className='absolute bottom-7 left-[18px] z-[14] w-[235px] rounded-[18px] border border-[rgba(83,230,255,.3)] bg-[rgba(4,14,28,.92)] p-[18px] shadow-[0_18px_48px_rgba(0,0,0,.5),0_0_30px_rgba(31,140,255,.16)] backdrop-blur-[14px]'>
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
      .map-stage{isolation:isolate;background:radial-gradient(circle at 43% 46%, rgba(50,230,255,0.26), transparent 28%),radial-gradient(circle at 44% 76%, rgba(20,121,255,0.20), transparent 32%),radial-gradient(circle at 70% 55%, rgba(139,92,255,0.13), transparent 28%),linear-gradient(180deg,#03101D 0%,#020711 100%);box-shadow:0 0 0 1px rgba(255,255,255,0.035) inset,0 45px 110px rgba(0,0,0,0.58),0 0 95px rgba(20,121,255,0.18)}
      .map-stage:before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center, transparent 36%, rgba(0,0,0,.42) 100%);pointer-events:none;z-index:30}
      .map-stage:after{content:'';position:absolute;left:20px;right:20px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(83,230,255,.65),transparent);pointer-events:none;z-index:31}
      .map-card{background:linear-gradient(180deg,rgba(8,22,40,.985),rgba(2,8,18,.98));border-color:color-mix(in srgb,var(--accent) 48%, transparent);box-shadow:0 18px 38px rgba(0,0,0,.56),0 0 30px var(--accent-glow),inset 0 1px 0 rgba(255,255,255,.08);transition:all .23s ease}
      .map-card:before{content:'';position:absolute;bottom:-13px;left:14px;right:14px;height:18px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--accent),transparent);filter:blur(10px);opacity:.78}
      .map-card:after{content:'';position:absolute;bottom:-2px;left:18px;right:18px;height:4px;background:var(--accent);box-shadow:0 0 22px var(--accent-glow)}
      .map-card:hover,.map-card:focus-visible{transform:translate(-50%,-58%) scale(calc(var(--scale) * 1.035));z-index:20;border-color:var(--accent);outline:none;box-shadow:0 26px 46px rgba(0,0,0,.62),0 0 40px var(--accent-glow),0 0 0 2px rgba(83,230,255,.34)}
      .services-panel{box-shadow:0 22px 70px rgba(0,0,0,.58),0 0 50px rgba(255,203,46,.15),inset 0 1px 0 rgba(255,255,255,.06)}
      .services-panel:before{content:'';position:absolute;left:24px;right:24px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,203,46,.7),transparent)}
      .hub{animation:breath 5s ease-in-out infinite}
      .core{animation:pulse 3.5s ease-in-out infinite}
      .ring{animation:ringPulse 6s ease-in-out infinite}
      @keyframes breath{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}
      @keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.08)}}
      @keyframes ringPulse{0%,100%{opacity:.9}50%{opacity:.55}}
      @media (prefers-reduced-motion:reduce){.hub,.core,.ring{animation:none}svg animateMotion{display:none}}
    `}</style>
  </section>;
}
