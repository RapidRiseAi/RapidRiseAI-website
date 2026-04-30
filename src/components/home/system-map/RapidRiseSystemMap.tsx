'use client';

import Link from 'next/link';
import { Eye, Check, ArrowRight, Star } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { accentStyles, systemMapDestinations } from './SystemMapData';

const svgNodes = Array.from({ length: 84 }, (_, i) => ({
  x: 84 + ((i * 137) % 1300),
  y: 142 + ((i * 89) % 510),
  r: 1.3 + (i % 3) * 0.35,
  o: 0.25 + ((i * 7) % 50) / 100,
  p: i % 9 === 0,
}));
const stars = Array.from({ length: 40 }, (_, i) => ({ x: (i * 71) % 1480, y: (i * 113) % 780, o: 0.08 + (i % 5) * 0.03 }));

export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? 'services';
  const active = useMemo(() => systemMapDestinations.find((d) => d.id === activeId) ?? systemMapDestinations[0], [activeId]);

  return <section className='relative overflow-hidden px-6 pb-16 pt-24 max-md:px-4 max-md:pt-16'>
    <div className='mx-auto mb-10 max-w-[780px] px-6 text-center max-md:px-2'>
      <p className='mb-4 text-[14px] font-extrabold uppercase tracking-[0.22em] text-[#32E6FF]'>RAPID RISE SYSTEM MAP</p>
      <h2 className='mb-[18px] text-[clamp(44px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#F6FAFF] max-md:text-[clamp(34px,8vw,42px)]'>Explore the Rapid Rise system.</h2>
      <p className='mx-auto max-w-[720px] text-[clamp(18px,2vw,20px)] leading-[1.6] text-[rgba(220,232,255,0.78)]'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p>
    </div>

    <div className='map-stage relative mx-auto hidden h-[780px] w-[calc(100%-48px)] max-w-[1480px] overflow-hidden rounded-[34px] border border-[rgba(50,230,255,0.30)] lg:block'>
      <svg className='pointer-events-none absolute inset-0 z-[1] h-full w-full' viewBox='0 0 1480 780' preserveAspectRatio='none' aria-hidden>
        <defs><clipPath id='floorClip'><polygon points='100,130 1380,130 1460,675 20,675' /></clipPath><radialGradient id='centerGlow' cx='50%' cy='50%' r='48%'><stop offset='0%' stopColor='rgba(50,230,255,0.24)' /><stop offset='100%' stopColor='rgba(50,230,255,0)' /></radialGradient></defs>
        <rect width='1480' height='780' fill='url(#centerGlow)' />
        <polygon points='100,130 1380,130 1460,675 20,675' fill='rgba(4,18,34,0.48)' stroke='rgba(50,230,255,0.16)' strokeWidth='1.3' />
        <g clipPath='url(#floorClip)'>{Array.from({ length: 43 }).map((_, i) => <line key={`a${i}`} x1={-400 + i * 56} y1='675' x2={300 + i * 56} y2='130' stroke='rgba(50,160,255,0.11)' strokeWidth='1' />)}{Array.from({ length: 43 }).map((_, i) => <line key={`b${i}`} x1={1880 - i * 56} y1='675' x2={1180 - i * 56} y2='130' stroke='rgba(50,160,255,0.11)' strokeWidth='1' />)}</g>
        <g>{svgNodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.p ? 'rgba(139,92,255,0.52)' : 'rgba(50,230,255,0.45)'} opacity={n.o} />)}</g>
        <g>{stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r='1.1' fill='rgba(220,232,255,0.9)' opacity={s.o} />)}</g>
      </svg>

      <div className='map-scene-content absolute inset-0 z-[4] 2xl:right-[340px] xl:right-[340px]'>
        <svg className='pointer-events-none absolute inset-0 z-[3] h-full w-full' viewBox='0 0 1480 780' preserveAspectRatio='none' aria-hidden>
          {systemMapDestinations.map((item) => {
            const a = activeId === item.id;
            return <g key={item.id} opacity={a ? 1 : hoveredId ? 0.35 : item.id === 'services' ? 1 : 0.6}>
              <path d={item.route} stroke='rgba(0,194,255,0.24)' strokeWidth='12' fill='none' strokeLinecap='round' filter='blur(5px)' opacity={a ? 0.72 : 0.18} />
              <path d={item.route} stroke='rgba(36,220,255,0.84)' strokeWidth='4' fill='none' strokeLinecap='round' strokeLinejoin='round' opacity={a ? 1 : 0.35} />
              <path d={item.route} stroke='rgba(255,255,255,0.58)' strokeWidth='1.2' strokeDasharray='5 8' fill='none' strokeLinecap='round' opacity={a ? 0.95 : 0.2} />
              {a ? <path d={item.route} stroke='rgba(255,255,255,0.9)' strokeWidth='1.5' strokeDasharray='1 22' fill='none'><animate attributeName='stroke-dashoffset' from='0' to='-130' dur='3s' repeatCount='indefinite' /></path> : null}
            </g>;
          })}
        </svg>

        <div className='pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2'>
          <div className='absolute left-1/2 top-[calc(50%+50px)] h-[105px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(50,230,255,0.36),rgba(20,121,255,0.18)_38%,transparent_72%)] blur-[22px]' />
          <div className='h-full w-full rounded-full border border-[rgba(83,230,255,0.55)] bg-[radial-gradient(circle_at_50%_48%,rgba(50,230,255,0.25),transparent_42%),linear-gradient(180deg,rgba(5,35,55,0.82),rgba(2,10,22,0.96))] shadow-[0_0_55px_rgba(50,230,255,0.45),0_0_110px_rgba(20,121,255,0.22),inset_0_0_38px_rgba(50,230,255,0.18)]'>
            <div className='absolute inset-[18px] rounded-full border border-[rgba(83,230,255,0.35)]' /><div className='absolute inset-[36px] rounded-full border border-[rgba(83,230,255,0.28)]' /><div className='absolute inset-[56px] rounded-full border border-[rgba(83,230,255,0.16)]' />
            <div className='absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#32E6FF] shadow-[0_0_35px_rgba(50,230,255,0.85)]' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-[20px] font-extrabold tracking-[0.04em] text-[#53E6FF]'>Rapid Rise AI</p><p className='text-[10px] uppercase tracking-[0.12em] text-[rgba(220,245,255,.82)]'>CAPTURE • ROUTE • TRACK</p><p className='text-[10px] uppercase tracking-[0.12em] text-[rgba(220,245,255,.82)]'>AUTOMATE • REPORT</p></div>
          </div>
        </div>

        {systemMapDestinations.map((item) => {
          const Icon = item.icon;
          const accent = accentStyles[item.accent];
          const st = { left: `${item.position.left}%`, top: `${item.position.top}%`, '--scale': item.scale, '--accent': accent.main, '--accent-glow': accent.glow } as CSSProperties;
          return <Link key={item.id} href={item.href} className='group absolute z-[7] block w-[210px] min-h-[118px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-[rgba(83,230,255,0.34)] bg-[linear-gradient(180deg,rgba(8,22,40,0.96),rgba(2,8,18,0.98))] p-[18px] text-decoration-none shadow-[0_18px_34px_rgba(0,0,0,0.50),0_0_24px_rgba(31,140,255,0.16),inset_0_1px_0_rgba(255,255,255,0.06)] [opacity:.9] transition-all duration-200 hover:-translate-y-[calc(50%+7px)] hover:scale-[1.03] focus-visible:-translate-y-[calc(50%+7px)] focus-visible:scale-[1.03]' style={st} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(item.id)} onBlur={() => setHoveredId(null)}>
            <span className='pointer-events-none absolute inset-x-[12px] -bottom-[3px] h-1 rounded-full bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-80' /><span className='pointer-events-none absolute inset-x-[10%] -bottom-3 h-[18px] rounded-full bg-[var(--accent-glow)] blur-[12px]' />
            <span className='absolute right-4 top-4 rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]' style={{ borderColor: `${accent.main}6b`, background: `${accent.soft}`, color: accent.main }}>{item.tag}</span>
            <span className='mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-xl border' style={{ borderColor: `${accent.main}88`, background: accent.soft, boxShadow: `0 0 18px ${accent.glow}` }}><Icon className='h-5 w-5' style={{ color: accent.main }} /></span>
            <p className='mb-[7px] pr-20 text-[16px] font-extrabold leading-[1.12] text-[#F6FAFF]'>{item.title}</p>
            <p className='max-w-[160px] text-[12.5px] leading-[1.35] text-[rgba(220,232,255,.76)]'>{item.description}</p>
          </Link>;
        })}
      </div>

      <aside className='absolute bottom-7 left-6 z-[10] w-[250px] rounded-[18px] border border-[rgba(83,230,255,.24)] bg-[rgba(4,14,28,.90)] p-5 shadow-[0_18px_45px_rgba(0,0,0,.45),0_0_26px_rgba(31,140,255,.14)] backdrop-blur-[14px]'>
        <div className='mb-3 flex items-center justify-between text-[12px] font-black tracking-[0.16em] text-[#32E6FF]'>SYSTEM PREVIEW <Eye className='h-4 w-4' /></div>
        <p className='text-sm text-[rgba(220,232,255,.78)]'>{hoveredId ? active.description : 'Hover any area to preview how we help.'}</p>
        <ul className='mt-3 space-y-1.5 text-sm text-[#F6FAFF]'>{(hoveredId ? active.previewBullets : ['Capture Leads', 'Automate Work', 'Track Progress', 'Report Results']).slice(0, 5).map((b, i) => <li key={b} className='flex items-center gap-2'><span className='h-2 w-2 rounded-full' style={{ background: ['#32E6FF', '#27EF7D', '#8B5CFF', '#A066FF', '#FFCB2E'][i] }} />{b}</li>)}</ul>
        <p className='mt-4 text-[13px] text-[#32E6FF]'>Click a destination to explore &gt;</p>
      </aside>

      <aside className='absolute bottom-[34px] right-7 top-[34px] z-[10] hidden w-[300px] rounded-[24px] border border-[rgba(255,203,46,0.35)] bg-[linear-gradient(180deg,rgba(5,15,30,0.96),rgba(2,7,17,0.98))] p-6 shadow-[0_20px_60px_rgba(0,0,0,.55),0_0_38px_rgba(255,203,46,.14),inset_0_1px_0_rgba(255,255,255,.05)] xl:block'>
        <p className='text-center text-[13px] font-black tracking-[0.18em] text-[#FFCB2E]'>SERVICES</p>
        <div className='mx-auto mt-6 flex h-[86px] w-[86px] items-center justify-center rounded-[24px] border border-[#FFCB2E66] text-[#FFCB2E] shadow-[0_0_28px_rgba(255,203,46,.22)]'><Star className='h-8 w-8' /></div>
        <h3 className='mt-5 text-center text-[34px] font-extrabold leading-none text-[#F6FAFF]'>Services</h3>
        <p className='mt-3 text-center text-[15px] leading-[1.55] text-[rgba(220,232,255,.78)]'>Core offerings and strategic systems that drive results.</p>
        <div className='my-4 h-px bg-white/10' />
        <p className='text-sm font-semibold text-[#FFCB2E]'>We help you:</p>
        <ul className='mt-2 space-y-2 text-sm text-[#F6FAFF]'>{systemMapDestinations[0].previewBullets.map((b) => <li key={b} className='flex items-start gap-2'><span className='mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FFCB2E] text-[#051120]'><Check className='h-3 w-3' /></span>{b}</li>)}</ul>
        <Link href='/solutions' className='mt-5 flex h-[54px] items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FFCB2E,#FFB300)] text-sm font-black text-[#06101C] shadow-[0_0_32px_rgba(255,203,46,.24)]'>Explore Services <ArrowRight className='ml-2 h-4 w-4' /></Link>
      </aside>
      <div className='absolute bottom-2 left-1/2 z-[9] -translate-x-1/2 text-sm text-[rgba(220,232,255,.72)]'>Hover to preview • Click to explore • Navigate to destinations</div>
    </div>

    <div className='mx-auto mt-4 grid max-w-[1480px] gap-3 rounded-[24px] border border-[rgba(83,230,255,.26)] bg-[linear-gradient(180deg,rgba(4,14,28,.88),rgba(2,7,17,.95))] p-4 lg:hidden sm:grid-cols-2'>
      {systemMapDestinations.map((item) => {
        const Icon = item.icon;
        const accent = accentStyles[item.accent];
        return <Link key={item.id} href={item.href} className='rounded-2xl border border-[rgba(83,230,255,.26)] bg-[rgba(5,15,30,.88)] p-4'>
          <div className='flex items-start justify-between gap-3'><span className='inline-flex h-10 w-10 items-center justify-center rounded-xl border' style={{ borderColor: `${accent.main}88`, background: accent.soft }}><Icon className='h-5 w-5' style={{ color: accent.main }} /></span><span className='rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase' style={{ borderColor: `${accent.main}66`, color: accent.main }}>{item.tag}</span></div>
          <p className='mt-2 text-base font-bold text-[#F6FAFF]'>{item.title}</p><p className='mt-1 text-sm text-[rgba(220,232,255,.76)]'>{item.description}</p>
        </Link>;
      })}
    </div>

    <style jsx>{`
      .map-stage {background: radial-gradient(circle at 50% 50%, rgba(0, 185, 255, 0.24), transparent 24%), radial-gradient(circle at 50% 72%, rgba(0, 92, 255, 0.20), transparent 30%), radial-gradient(circle at 78% 58%, rgba(139, 92, 255, 0.11), transparent 24%), linear-gradient(180deg, #03101D 0%, #020711 100%); box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 35px 100px rgba(0,0,0,0.55), 0 0 80px rgba(20,121,255,0.16);} 
      .map-stage::before {content:''; position:absolute; inset:0; background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 100%); z-index:20; pointer-events:none;}
      .map-stage::after {content:''; position:absolute; left:20px; right:20px; top:0; height:1px; background:linear-gradient(90deg, transparent, rgba(83,230,255,.45), transparent); pointer-events:none; z-index:21;}
    `}</style>
  </section>;
}
