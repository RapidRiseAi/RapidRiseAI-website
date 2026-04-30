'use client';
import Link from 'next/link';
import { ArrowRight, Check, Eye, Star, Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { accentStyles, systemMapDestinations } from './SystemMapData';

const nodes = Array.from({ length: 130 }, (_, i) => ({ x: 30 + ((i * 67) % 1080), y: 165 + ((i * 61) % 540), r: 1.2 + (i % 4) * 0.25, o: 0.25 + ((i * 3) % 50) / 100, p: i % 10 === 0 }));
const air = Array.from({ length: 56 }, (_, i) => ({ x: (i * 79) % 1150, y: (i * 113) % 820, o: 0.06 + (i % 5) * 0.03 }));
const tools = [Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact, Star, Eye];

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? 'services';
  const active = useMemo(() => systemMapDestinations.find((d) => d.id === activeId) ?? systemMapDestinations[0], [activeId]);

  return <section className='relative overflow-hidden px-6 pb-16 pt-[132px] [scroll-margin-top:120px] max-md:px-4 max-md:pt-20'>
    <div className='mx-auto mb-12 max-w-[780px] px-6 text-center max-md:px-2'>
      <p className='mb-4 text-[14px] font-extrabold uppercase tracking-[0.22em] text-[#32E6FF]'>RAPID RISE SYSTEM MAP</p>
      <h2 className='mb-[18px] text-[clamp(44px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#F6FAFF] max-md:text-[clamp(34px,8vw,42px)]'>Explore the Rapid Rise system.</h2>
      <p className='mx-auto max-w-[720px] text-[clamp(18px,2vw,20px)] leading-[1.6] text-[rgba(220,232,255,0.78)]'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
    </div>
    <div className='map-stage relative mx-auto hidden h-[848px] w-[calc(100%-48px)] max-w-[1540px] overflow-hidden rounded-[40px] border border-[rgba(50,230,255,0.34)] lg:block'>
      <div className='stage-map-area absolute inset-y-0 left-0 right-0 xl:right-[330px]'>
        <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_49%,rgba(50,230,255,0.18),transparent_42%)]' />
        <svg className='pointer-events-none absolute inset-0 z-[2] h-full w-full' viewBox='0 0 1150 820' preserveAspectRatio='none'>
          <defs><clipPath id='floor'><polygon points='80,155 1070,155 1140,710 20,710' /></clipPath></defs>
          <ellipse cx='575' cy='655' rx='350' ry='90' fill='rgba(20,121,255,.13)' /><ellipse cx='575' cy='402' rx='300' ry='180' fill='rgba(50,230,255,.1)' /><polygon points='80,155 1070,155 1140,710 20,710' fill='rgba(4,18,34,0.5)' stroke='rgba(50,230,255,0.17)' strokeWidth='1.3' />
          <g clipPath='url(#floor)'>{Array.from({ length: 54 }).map((_, i) => <line key={`a${i}`} x1={-300 + i * 32} y1='710' x2={250 + i * 32} y2='155' stroke={i % 5 === 0 ? 'rgba(50,230,255,0.18)' : 'rgba(50,160,255,0.12)'} strokeWidth={i % 5 === 0 ? 1.2 : 1} />)}{Array.from({ length: 54 }).map((_, i) => <line key={`b${i}`} x1={1450 - i * 32} y1='710' x2={900 - i * 32} y2='155' stroke={i % 5 === 0 ? 'rgba(50,230,255,0.18)' : 'rgba(50,160,255,0.12)'} strokeWidth={i % 5 === 0 ? 1.2 : 1} />)}</g>
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.p ? 'rgba(139,92,255,.55)' : 'rgba(50,230,255,.45)'} opacity={n.o} />)}
          {air.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r='1.2' fill='rgba(220,232,255,.9)' opacity={a.o} />)}
        </svg>

        <svg className='pointer-events-none absolute inset-0 z-[4] h-full w-full' viewBox='0 0 1150 820' preserveAspectRatio='none'>
          {systemMapDestinations.map((item) => {
            const a = activeId === item.id; const accent = accentStyles[item.accent].main;
            return <g key={item.id} opacity={a ? 1 : hoveredId ? 0.34 : item.id === 'services' ? 1 : 0.58}>
              <path d={item.route} stroke='rgba(0,194,255,0.28)' strokeWidth='14' fill='none' strokeLinecap='round' opacity={a ? .75 : .18} filter='blur(6px)' />
              <path d={item.route} stroke={a ? accent : 'rgba(36,220,255,0.90)'} strokeWidth='4' fill='none' strokeLinecap='round' opacity={a ? 1 : .32} />
              <path d={item.route} stroke='rgba(255,255,255,.66)' strokeWidth='1.2' strokeDasharray='6 8' fill='none' strokeLinecap='round' opacity={a ? .92 : .2} />
              <circle cx={item.anchor.x} cy={item.anchor.y} r='6' fill={accent} opacity={a ? .95 : .35} />
              {a ? <circle r='4' fill={accent}><animateMotion dur='3s' repeatCount='indefinite' path={item.route} /></circle> : null}
            </g>;
          })}
        </svg>

        <div className='pointer-events-none absolute left-1/2 top-[49%] z-[8] h-[235px] w-[235px] -translate-x-1/2 -translate-y-1/2'>
          <div className='absolute left-1/2 top-[calc(50%+48px)] h-[120px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(50,230,255,.38),rgba(20,121,255,.18)_42%,transparent_72%)] blur-[24px]' />
          <div className='absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(50,230,255,.22),transparent_65%)] blur-[10px]' />
          <div className='h-full w-full rounded-full border-2 border-[rgba(50,230,255,.65)] bg-[linear-gradient(180deg,rgba(5,35,55,0.82),rgba(2,10,22,0.96))] shadow-[0_0_34px_rgba(50,230,255,.55)]'>
            <div className='absolute inset-[20px] rounded-full border border-[rgba(83,230,255,.36)]' /><div className='absolute inset-[40px] rounded-full border border-[rgba(83,230,255,.26)]' /><div className='absolute inset-[62px] rounded-full border border-[rgba(83,230,255,.18)]' />
            <div className='absolute left-1/2 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#32E6FF] shadow-[0_0_22px_#32E6FF,0_0_60px_rgba(50,230,255,.8),0_0_120px_rgba(20,121,255,.45)]' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-[21px] font-black text-[#53E6FF]'>Rapid Rise AI</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.82)]'>CAPTURE • ROUTE</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.82)]'>TRACK • AUTOMATE</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.82)]'>REPORT</p></div>
          </div>
        </div>

        {systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon;
          const st = { left: `${item.position.left}%`, top: `${item.position.top}%`, '--accent': accent.main, '--accent-glow': accent.glow, '--scale': item.scale } as CSSProperties;
          return <Link key={item.id} href={item.href} style={st} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(item.id)} onBlur={() => setHoveredId(null)} className='map-card absolute z-[9] block w-[215px] min-h-[132px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border p-[18px] [transform:translate(-50%,-50%)_scale(var(--scale))]'>
            <span className='glint absolute left-3 right-3 top-1 h-px' /><span className='absolute inset-x-3 -bottom-[13px] h-5 rounded-full bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] blur-[10px] opacity-75' /><span className='absolute inset-x-3 -bottom-1 h-1 rounded-full bg-[var(--accent)] opacity-80 shadow-[0_0_22px_var(--accent-glow)]' />
            <span className='absolute right-4 top-4 rounded-full border px-[10px] py-1 text-[10px] font-black uppercase tracking-[.08em]' style={{ borderColor: `${accent.main}73`, background: accent.soft, color: accent.main }}>{item.tag}</span>
            <span className='mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border' style={{ borderColor: `${accent.main}8c`, background: accent.soft, boxShadow: `0 0 24px ${accent.glow}` }}><Icon className='h-6 w-6' style={{ color: accent.main }} /></span>
            <p className='mt-1 text-[17px] font-black leading-[1.1] text-[#F6FAFF]'>{item.title}</p><p className='mt-2 max-w-[170px] text-[12.5px] leading-[1.35] text-[rgba(220,232,255,.76)]'>{item.description}</p>
          </Link>; })}
      </div>

      <aside className='services-panel absolute bottom-8 right-7 top-8 z-[12] hidden w-[308px] rounded-[28px] border border-[rgba(255,203,46,.38)] bg-[linear-gradient(180deg,rgba(5,15,30,.97),rgba(2,7,17,.99))] p-[30px_24px] xl:block'>
        <p className='text-center text-[13px] font-black tracking-[.18em] text-[#FFCB2E]'>SERVICES</p><div className='mx-auto mt-6 flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[rgba(255,203,46,.45)] bg-[rgba(255,203,46,.08)] text-[#FFCB2E] shadow-[0_0_32px_rgba(255,203,46,.2)]'><Star className='h-9 w-9' /></div>
        <h3 className='mt-6 text-center text-[36px] font-black leading-none text-[#F6FAFF]'>Services</h3><p className='mx-auto mt-3 max-w-[240px] text-center text-[15px] leading-[1.55] text-[rgba(220,232,255,.78)]'>Core offerings and strategic systems that drive results.</p>
        <div className='my-6 h-px bg-white/10' /><ul className='space-y-3 text-[14px] text-[#F6FAFF]'>{systemMapDestinations.find((d) => d.id === 'services')?.previewBullets.map((b) => <li key={b} className='flex gap-2.5'><span className='mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FFCB2E] text-[#051120]'><Check className='h-3 w-3' /></span>{b}</li>)}</ul>
        <p className='mt-6 text-[12px] font-black tracking-[.14em] text-[#FFCB2E]'>CORE TOOLS</p><div className='mt-2 grid grid-cols-5 gap-2'>{tools.map((I, i) => <span key={i} className='flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-white/10 bg-white/5 text-[#53E6FF]'><I className='h-4 w-4' /></span>)}</div>
        <Link href='/solutions' className='mt-6 flex h-[54px] items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#FFCB2E,#FFB000)] text-[15px] font-black text-[#06101C] shadow-[0_0_34px_rgba(255,203,46,.24)]'>Explore Services <ArrowRight className='ml-2 h-4 w-4' /></Link>
      </aside>

      <aside className='absolute bottom-[30px] left-6 z-[12] w-[255px] rounded-[18px] border border-[rgba(83,230,255,.28)] bg-[rgba(4,14,28,.92)] p-5 shadow-[0_18px_48px_rgba(0,0,0,.5),0_0_30px_rgba(31,140,255,.16)] backdrop-blur-[14px]'>
        <div className='flex items-center justify-between text-[12px] font-black tracking-[.16em] text-[#32E6FF]'>{hoveredId ? active.title.toUpperCase() : 'SYSTEM PREVIEW'} <Eye className='h-4 w-4' /></div>
        <p className='mt-2 text-sm text-[rgba(220,232,255,.78)]'>{hoveredId ? active.description : 'Hover any area to preview how we help.'}</p>
        <ul className='mt-3 space-y-1.5 text-sm text-[#F6FAFF]'>{(hoveredId ? active.previewBullets : ['Capture Leads', 'Automate Work', 'Track Progress', 'Report Results']).slice(0, 5).map((b, i) => <li key={b} className='flex items-center gap-2'><span className='h-2 w-2 rounded-full' style={{ background: ['#32E6FF', '#27EF7D', '#8B5CFF', '#A066FF', '#FFCB2E'][i] }} />{b}</li>)}</ul>
        <p className='mt-[18px] text-[13px] text-[#32E6FF]'>Click a destination to explore &gt;</p>
      </aside>
      <div className='absolute bottom-3 left-1/2 z-[11] -translate-x-1/2 text-sm text-[rgba(220,232,255,.72)]'>Hover to preview • Click to explore • Navigate to destinations</div>
    </div>

    <div className='mx-auto mt-4 grid max-w-[1540px] gap-3 rounded-[24px] border border-[rgba(83,230,255,.26)] bg-[linear-gradient(180deg,rgba(4,14,28,.88),rgba(2,7,17,.95))] p-4 lg:hidden sm:grid-cols-2'>
      <div className='col-span-full mb-1 flex items-center gap-3 rounded-2xl border border-cyan-300/25 bg-[rgba(8,22,40,.8)] p-4'><div className='h-10 w-10 rounded-full bg-cyan-300/25 shadow-[0_0_20px_rgba(50,230,255,.45)]' /><p className='text-sm text-cyan-100'>Mobile Explorer</p></div>
      {systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon; return <Link key={item.id} href={item.href} className='rounded-2xl border border-[rgba(83,230,255,.26)] bg-[rgba(5,15,30,.88)] p-4'><div className='flex items-start justify-between gap-3'><span className='inline-flex h-10 w-10 items-center justify-center rounded-xl border' style={{ borderColor: `${accent.main}88`, background: accent.soft }}><Icon className='h-5 w-5' style={{ color: accent.main }} /></span><span className='rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase' style={{ borderColor: `${accent.main}66`, color: accent.main }}>{item.tag}</span></div><p className='mt-2 text-base font-bold text-[#F6FAFF]'>{item.title}</p><p className='mt-1 text-sm text-[rgba(220,232,255,.76)]'>{item.description}</p></Link>; })}
    </div>

    <style jsx>{`
      .map-stage{background:radial-gradient(circle at 50% 48%, rgba(50,230,255,.22), transparent 28%),radial-gradient(circle at 50% 78%, rgba(20,121,255,.18), transparent 34%),radial-gradient(circle at 75% 58%, rgba(139,92,255,.14), transparent 24%),linear-gradient(180deg,#03101D 0%,#020711 100%);box-shadow:0 0 0 1px rgba(255,255,255,.03) inset,0 45px 110px rgba(0,0,0,.58),0 0 90px rgba(20,121,255,.18)}
      .map-stage:before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center, transparent 34%, rgba(0,0,0,.3) 100%);pointer-events:none;z-index:30}
      .map-stage:after{content:'';position:absolute;left:20px;right:20px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(83,230,255,.6),transparent);pointer-events:none;z-index:31}
      .map-card{background:linear-gradient(180deg, rgba(8,22,40,.98), rgba(2,8,18,.98));border-color:rgba(83,230,255,.38);box-shadow:0 18px 36px rgba(0,0,0,.55),0 0 28px var(--accent-glow),inset 0 1px 0 rgba(255,255,255,.08);transition:all .22s ease}
      .map-card:hover,.map-card:focus-visible{transform:translate(-50%,-58%) scale(calc(var(--scale) * 1.025));z-index:12;border-color:var(--accent);outline:none;box-shadow:0 20px 40px rgba(0,0,0,.6),0 0 36px var(--accent-glow),0 0 0 2px rgba(83,230,255,.32)}
      .services-panel{box-shadow:0 22px 70px rgba(0,0,0,.58),0 0 45px rgba(255,203,46,.16),inset 0 1px 0 rgba(255,255,255,.06)}
    `}</style>
  </section>;
}
