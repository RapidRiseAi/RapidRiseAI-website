'use client';
import Link from 'next/link';
import { ArrowRight, Check, Eye, Star, Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact, X } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { accentStyles, systemMapDestinations } from './SystemMapData';
const tools = [Bot, Workflow, BarChart3, Globe, Wrench, GraduationCap, DollarSign, Contact, Star, Eye];
const nodes = Array.from({ length: 180 }, (_, i) => ({ x: 40 + ((i * 73) % 1120), y: 120 + ((i * 59) % 530), r: 1.2 + (i % 5) * 0.24, o: 0.25 + ((i * 7) % 60) / 100 }));

// ACTIVE_RENDERED_SYSTEM_MAP_COMPONENT
export function RapidRiseSystemMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? 'services';
  const active = useMemo(() => systemMapDestinations.find((d) => d.id === activeId) ?? systemMapDestinations[0], [activeId]);

  return <section id='system-map' className='relative overflow-visible px-6 pb-20 pt-[150px] [scroll-margin-top:120px] max-md:px-4 max-md:pt-[96px] md:pt-[120px]'>
    <div className='mx-auto mb-[42px] max-w-[820px] px-6 text-center'><p className='mb-4 text-[13px] font-black uppercase tracking-[0.22em] text-[#32E6FF]'>RAPID RISE SYSTEM MAP</p><h2 className='mb-4 text-[clamp(42px,4.8vw,64px)] font-black leading-[1.04] tracking-[-0.045em] text-[#F6FAFF]'>Explore the Rapid Rise system.</h2><p className='mx-auto max-w-[720px] text-[18px] leading-[1.55] text-[rgba(220,232,255,0.78)]'>Choose a business area to see how we connect tools, workflows, dashboards, websites, and follow-ups into one operating layer.</p></div>

    <div className='map-stage relative mx-auto hidden h-[940px] w-[calc(100%-48px)] max-w-[1580px] overflow-hidden rounded-[34px] border border-[rgba(50,230,255,0.34)] lg:block'>
      <div className='absolute inset-x-0 top-0 h-[760px] overflow-hidden'>
        <div className='absolute inset-y-0 left-0 right-0 bg-[radial-gradient(circle_at_50%_48%,rgba(50,230,255,0.22),transparent_28%)] xl:right-[340px]'>
          {/* ACTIVE_SINGLE_PLANE_KEEP: restored pre-reset CSS 3D floor viewport + transformed floor surface */}
          <div className='floor-perspective pointer-events-none absolute inset-0 z-[1]'>
            <div className='floor-plane'>
              {/* REMOVED_DUPLICATE_PLANE: removed hard-reset SVG floor system and extra floor silhouette */}
              {/* ACTIVE_SYSTEM_MAP_GRID_LAYER */}
              {/* REMOVED_DUPLICATE_FLOOR_LAYER: removed hard-reset SVG floor system */}
              <div className='floor-grid' />
              {/* REMOVED_DUPLICATE_GRID_LAYER: consolidated major+minor grid into single layer */}
              <div className='floor-vignette' />
            </div>
            <svg className='absolute inset-0 h-full w-full' viewBox='0 0 1200 760' preserveAspectRatio='none'>
              {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i % 11 === 0 ? 'rgba(139,92,255,.56)' : i % 16 === 0 ? 'rgba(46,139,255,.56)' : i % 19 === 0 ? 'rgba(51,230,138,.40)' : 'rgba(50,230,255,.48)'} opacity={n.o} />)}
              {/* REMOVED_DUPLICATE_GRID_LAYER: removed secondary floor-like ellipse glow */}
            </svg>
          </div>

          <svg className='pointer-events-none absolute inset-0 z-[4] h-full w-full' viewBox='0 0 1200 760' preserveAspectRatio='none'>
            {systemMapDestinations.map((item) => { const a = activeId === item.id; const accent = accentStyles[item.accent].main; return <g key={item.id} opacity={a ? 1 : hoveredId ? 0.26 : item.id === 'services' ? 1 : 0.58}><path d={item.route} stroke={accent} strokeWidth='18' opacity={a ? .55 : .18} fill='none' filter='blur(7px)' /><path d={item.route} stroke={accent} strokeWidth='9' opacity={a ? .68 : .2} fill='none' strokeLinecap='round' /><path d={item.route} stroke={accent} strokeWidth='3.2' opacity={a ? 1 : .45} fill='none' strokeLinecap='round' filter={`drop-shadow(0 0 8px ${accent})`} /><path d={item.route} stroke='rgba(255,255,255,0.72)' strokeWidth='1.1' strokeDasharray='5 8' opacity={a ? .85 : .18} fill='none' /><circle cx={item.anchor.x} cy={item.anchor.y} r={a ? 6 : 4.5} fill={accent} opacity={a ? 1 : .45} /> </g>; })}
          </svg>

          <div className='hub absolute left-1/2 top-[50.6%] z-[10] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
            <div className='absolute left-1/2 top-[57%] h-[94px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(50,230,255,0.35),rgba(46,139,255,0.16)_48%,transparent_74%)] blur-[22px]' />
            <div className='absolute inset-[-34px] rounded-full bg-[radial-gradient(circle,rgba(50,230,255,0.28),transparent_66%)] blur-[10px]' />
            <div className='absolute inset-[24px] rounded-full border-2 border-[rgba(50,230,255,0.78)] bg-[radial-gradient(circle_at_50%_48%,rgba(50,230,255,0.28),transparent_48%),linear-gradient(180deg,rgba(6,35,58,0.92),rgba(2,10,22,0.98))] shadow-[0_0_38px_rgba(50,230,255,0.58),0_0_95px_rgba(46,139,255,0.30),inset_0_0_42px_rgba(50,230,255,0.16)]'><div className='absolute inset-[44px] rounded-full border border-[rgba(50,230,255,0.36)]' /><div className='absolute inset-[62px] rounded-full border border-[rgba(50,230,255,0.24)]' /><div className='absolute inset-[80px] rounded-full border border-[rgba(50,230,255,0.16)]' /><div className='absolute left-1/2 top-1/2 h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6FAFF] shadow-[0_0_24px_#33E6FF,0_0_70px_rgba(50,230,255,0.88)]' /><div className='absolute inset-0 flex flex-col items-center justify-center text-center'><p className='text-[20px] font-black text-[#57E8FF]'>Rapid Rise AI</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.86)]'>CAPTURE • ROUTE</p><p className='text-[10px] uppercase tracking-[.14em] text-[rgba(220,245,255,.86)]'>TRACK • AUTOMATE • REPORT</p></div></div>
          </div>

          <div className='absolute inset-0 z-[20] pointer-events-none'>{systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon; const st = { left: `${item.left}%`, top: `${item.top}%`, '--accent': accent.main, '--accent-glow': accent.glow, '--scale': item.scale } as CSSProperties; return <Link key={item.id} href={item.href} style={st} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(item.id)} onBlur={() => setHoveredId(null)} className='map-card absolute pointer-events-auto w-[215px] min-h-[118px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] p-4'><span className='pill absolute right-[15px] top-[15px] rounded-full px-[9px] py-[3px] text-[9.5px] font-black uppercase tracking-[.08em]' style={{ color: accent.main, background: `color-mix(in srgb, ${accent.main} 12%, transparent)`, borderColor: `color-mix(in srgb, ${accent.main} 45%, transparent)` }}>{item.tag}</span><span className='badge mb-2 grid h-[44px] w-[44px] place-items-center rounded-[14px] border' style={{ background: `color-mix(in srgb, ${accent.main} 15%, transparent)`, borderColor: `color-mix(in srgb, ${accent.main} 60%, transparent)`, boxShadow: `0 0 24px ${accent.glow}` }}><Icon className='h-[23px] w-[23px]' style={{ color: accent.main }} /></span><p className='mt-[10px] text-[16.5px] font-black leading-[1.1] text-[#F6FAFF]'>{item.title}</p><p className='mt-[6px] text-[12.2px] leading-[1.35] text-[rgba(220,232,255,0.76)]'>{item.description}</p></Link>; })}</div>

          <aside className='absolute bottom-[34px] left-6 z-[38] w-[250px] rounded-[18px] border border-[rgba(83,230,255,.30)] bg-[rgba(4,14,28,.93)] p-[18px] shadow-[0_18px_48px_rgba(0,0,0,.50),0_0_30px_rgba(31,140,255,.16)]'><div className='flex items-center justify-between text-[12px] font-black tracking-[.16em] text-[#32E6FF]'>{hoveredId ? active.title.toUpperCase() : 'SYSTEM PREVIEW'} <Eye className='h-4 w-4' /></div><p className='mt-2 text-sm text-[rgba(220,232,255,.78)]'>{hoveredId ? active.description : 'Hover any area to preview how we help.'}</p><ul className='mt-3 space-y-1.5 text-sm text-[#F6FAFF]'>{(hoveredId ? active.previewBullets : ['Capture Leads', 'Automate Work', 'Track Progress', 'Report Results']).slice(0, 5).map((b, i) => <li key={b} className='flex items-center gap-2'><span className='h-2 w-2 rounded-full' style={{ background: ['#32E6FF', '#27EF7D', '#8B5CFF', '#A066FF', '#FFCB2E'][i] }} />{b}</li>)}</ul><p className='mt-[18px] text-[13px] text-[#32E6FF]'>Click a destination to explore &gt;</p></aside>
          <div className='pointer-events-none absolute bottom-4 left-1/2 z-[30] -translate-x-1/2 text-[13px] text-[rgba(220,232,255,.72)]'>Hover to preview  •  Click to explore  •  Navigate to destinations</div>
        </div>

        <aside className='services-panel absolute right-[26px] top-[26px] z-[40] hidden h-[708px] w-[300px] rounded-[30px] border border-[rgba(244,197,58,0.42)] bg-[linear-gradient(180deg,rgba(5,15,30,0.98),rgba(2,7,17,1))] p-[30px_24px] xl:block'><X className='absolute right-6 top-6 h-[18px] w-[18px] text-white/65' /><p className='mb-[26px] text-[13px] font-black tracking-[.18em] text-[#F4C53A]'>SERVICES</p><div className='mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-[24px] border border-[rgba(244,197,58,.42)] bg-[rgba(244,197,58,.08)] text-[#F4C53A] shadow-[0_0_30px_rgba(244,197,58,.2)]'><Star className='h-9 w-9' /></div><h3 className='mt-7 text-center text-[36px] font-black leading-none text-[#F6FAFF]'>Services</h3><p className='mt-4 text-center text-[15px] leading-[1.5] text-[rgba(220,232,255,.78)]'>Core offerings and strategic systems that drive results.</p><div className='my-[26px] border-t border-white/10' /><ul className='space-y-3 text-[14px] text-[#F6FAFF]'>{systemMapDestinations.find((d) => d.id === 'services')?.previewBullets.map((b) => <li key={b} className='flex gap-2.5'><span className='mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F4C53A] text-[#051120]'><Check className='h-3 w-3' /></span>{b}</li>)}</ul><p className='mt-[26px] text-[12px] font-black tracking-[.14em] text-[#F4C53A]'>CORE TOOLS</p><div className='mt-2 grid grid-cols-5 gap-2'>{tools.map((I, i) => <span key={i} className='flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-white/10 bg-white/5 text-[#53E6FF]'><I className='h-4 w-4' /></span>)}</div><Link href='/solutions' className='mt-[26px] flex h-[54px] w-full items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#F4C53A,#FFB000)] text-[15px] font-black text-[#06101C] shadow-[0_0_34px_rgba(244,197,58,.24)]'>Explore Services <ArrowRight className='ml-2 h-4 w-4' /></Link></aside>
      </div>

      <div className='absolute inset-x-0 bottom-0 z-[50] h-[180px] border-t border-[rgba(83,230,255,0.18)] bg-[rgba(3,10,20,0.78)] px-5 pt-[18px] pb-[22px] backdrop-blur-[14px]'><p className='mb-4 text-center text-[12px] font-black uppercase tracking-[.18em] text-[rgba(220,232,255,.78)]'>MOBILE VIEW (STACKED EXPLORER)</p><div className='grid grid-cols-9 gap-[10px] overflow-x-auto pb-1'>{['services','automation','websites','dashboards','google-workspace','internal-tools','training','pricing','contact'].map((id) => {const item = systemMapDestinations.find((d) => d.id === id); if (!item) return null; const accent = accentStyles[item.accent]; const Icon = item.icon; return <Link key={id} href={item.href} className='min-h-[90px] min-w-[120px] rounded-xl border border-[rgba(83,230,255,.20)] bg-[rgba(7,20,35,.92)] p-3 transition hover:border-cyan-300/60'><div className='flex items-center justify-between'><span className='inline-flex h-7 w-7 items-center justify-center rounded-lg border' style={{ borderColor: `${accent.main}88`, background: accent.soft }}><Icon className='h-4 w-4' style={{ color: accent.main }} /></span><ArrowRight className='h-3 w-3 text-cyan-200/80' /></div><p className='mt-1 text-[13px] font-bold text-white'>{item.title}</p><p className='line-clamp-2 text-[11px] text-[rgba(220,232,255,.74)]'>{item.description}</p></Link>;})}</div></div>
    </div>

    <div className='mx-auto mt-4 grid max-w-[1540px] gap-3 rounded-[24px] border border-[rgba(83,230,255,.26)] bg-[linear-gradient(180deg,rgba(4,14,28,.88),rgba(2,7,17,.95))] p-4 lg:hidden sm:grid-cols-2'>{systemMapDestinations.map((item) => { const accent = accentStyles[item.accent]; const Icon = item.icon; return <Link key={item.id} href={item.href} className='rounded-2xl border border-[rgba(83,230,255,.26)] bg-[rgba(5,15,30,.88)] p-4'><div className='flex items-start justify-between gap-3'><span className='inline-flex h-10 w-10 items-center justify-center rounded-xl border' style={{ borderColor: `${accent.main}88`, background: accent.soft }}><Icon className='h-5 w-5' style={{ color: accent.main }} /></span><span className='rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase' style={{ borderColor: `${accent.main}66`, color: accent.main }}>{item.tag}</span></div><p className='mt-2 text-base font-bold text-[#F6FAFF]'>{item.title}</p><p className='mt-1 text-sm text-[rgba(220,232,255,.76)]'>{item.description}</p></Link>; })}</div>

    <style jsx>{`
      
      .floor-perspective{perspective:1600px;transform-style:preserve-3d}
      .floor-plane{position:absolute;left:75%;top:39.1%;width:950%;height:468%;transform:translate(-50%,-50%) rotateX(60deg) rotateZ(45deg) scale(1.66);transform-origin:36% 57%;transform-style:preserve-3d;border:none;background:radial-gradient(circle at 52% 50%, rgba(50,230,255,.15), rgba(5,18,36,.72) 56%, rgba(2,8,18,.9) 100%);box-shadow:0 0 50px rgba(30,144,255,.2), inset 0 0 40px rgba(50,230,255,.08)}
      .floor-grid{position:absolute;inset:0;background-image:linear-gradient(0deg, rgba(45,160,255,.14) 1px, transparent 1px),linear-gradient(90deg, rgba(45,160,255,.14) 1px, transparent 1px);background-size:26px 26px;background-repeat:repeat;opacity:.84;mix-blend-mode:screen}
      .floor-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 6% 96%, transparent 96%, rgba(1,6,14,.06) 100%)}

      .map-stage{background:radial-gradient(circle at 38% 43%, rgba(50,230,255,0.18), transparent 30%),radial-gradient(circle at 44% 75%, rgba(20,121,255,0.18), transparent 32%),radial-gradient(circle at 70% 55%, rgba(139,92,255,0.10), transparent 28%),linear-gradient(180deg,#03101D 0%,#020711 100%);box-shadow:0 0 0 1px rgba(255,255,255,0.035) inset,0 45px 110px rgba(0,0,0,0.58),0 0 95px rgba(20,121,255,0.18)}
      .hub{animation:breath 5s ease-in-out infinite}
      .map-card{border:1px solid color-mix(in srgb,var(--accent) 55%, rgba(255,255,255,0.08));background:linear-gradient(180deg, rgba(7,20,35,0.98), rgba(3,11,20,0.99));box-shadow:0 22px 45px rgba(0,0,0,0.52),0 0 30px var(--accent-glow),inset 0 1px 0 rgba(255,255,255,0.06);transition:all .22s ease}
      .map-card:before{content:'';position:absolute;left:14%;right:14%;bottom:-5px;height:4px;border-radius:999px;background:var(--accent);box-shadow:0 0 18px var(--accent);opacity:.85}
      .map-card:after{content:'';position:absolute;left:12%;right:12%;bottom:-14px;height:18px;border-radius:999px;background:var(--accent);filter:blur(13px);opacity:.36}
      .pill{border:1px solid}
      .map-card:hover,.map-card:focus-visible{transform:translate(-50%,-50%) scale(calc(var(--scale) * 1.025)) translateY(-6px);z-index:35;outline:none}
      .services-panel{box-shadow:0 22px 70px rgba(0,0,0,0.58),0 0 50px rgba(244,197,58,0.15),inset 0 1px 0 rgba(255,255,255,0.06)}
      @keyframes breath{0%,100%{filter:brightness(1)}50%{filter:brightness(1.08)}}
    `}</style>
  </section>;
}
