'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  Network,
  RefreshCw,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type PackageVisual = 'bottleneck-fix' | 'core-dashboard' | 'support-loop';
type PackageAccent = 'cyan' | 'gold' | 'green';

type PackageStage = {
  id: string;
  stage: string;
  title: string;
  time: string;
  label: string;
  bestFor: string;
  includes: string[];
  cta: string;
  href: string;
  visual: PackageVisual;
  accent: PackageAccent;
  icon: LucideIcon;
  recommended?: string;
};

const packageStages: PackageStage[] = [
  {
    id: 'quick-wins',
    stage: '01',
    title: 'Quick Wins',
    time: '2 weeks',
    label: 'Start fast',
    bestFor: 'One painful manual process.',
    includes: ['Lead follow-up', 'Inbox routing', 'Support assistant', 'Small automation'],
    cta: 'View fast wins',
    href: '/pricing',
    visual: 'bottleneck-fix',
    accent: 'cyan',
    icon: Zap,
  },
  {
    id: 'core-system',
    stage: '02',
    title: 'Core System',
    time: '4 to 6 weeks',
    label: 'Build the core',
    bestFor: 'Workflow that needs structure.',
    includes: ['Integrations', 'Dashboards', 'Portals', 'Quote/document flow'],
    cta: 'View core systems',
    href: '/pricing',
    visual: 'core-dashboard',
    accent: 'gold',
    icon: Network,
    recommended: 'Most common starting point',
  },
  {
    id: 'scale-support',
    stage: '03',
    title: 'Scale and Support',
    time: 'Monthly',
    label: 'Keep improving',
    bestFor: 'Ongoing improvements.',
    includes: ['Monitoring', 'Fixes', 'New workflows', 'Reporting improvements'],
    cta: 'View support plans',
    href: '/pricing',
    visual: 'support-loop',
    accent: 'green',
    icon: RefreshCw,
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function getStageIndex(id: string | null) {
  if (!id) return 1;
  return Math.max(0, packageStages.findIndex((stage) => stage.id === id));
}

function StageNumber({ stage, active }: { stage: string; active: boolean }) {
  return (
    <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-[0.66rem] font-semibold tracking-[0.16em] transition duration-300 ${active ? 'border-cyan-200/60 bg-cyan-300/14 text-cyan-100 shadow-[0_0_24px_rgba(56,223,255,0.16)]' : 'border-cyan-300/18 bg-slate-950/46 text-slate-400'}`}>
      {stage}
    </span>
  );
}

function PackagePathLine({ activeIndex, reduceMotion }: { activeIndex: number; reduceMotion: boolean }) {
  const progressWidth = ['21%', '50%', '79%'][activeIndex] ?? '50%';

  return (
    <div className="pointer-events-none absolute inset-x-10 top-[47%] z-0 hidden h-24 -translate-y-1/2 lg:block" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
        <defs>
          <filter id="package-path-glow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="package-path-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0EA5FF" />
            <stop offset="0.52" stopColor="#38DFFF" />
            <stop offset="1" stopColor="#33E68A" />
          </linearGradient>
        </defs>
        <path d="M 78 63 C 260 8, 390 112, 500 58 S 752 18, 922 62" fill="none" stroke="rgba(56,223,255,0.13)" strokeLinecap="round" strokeWidth="18" />
        <motion.path
          d="M 78 63 C 260 8, 390 112, 500 58 S 752 18, 922 62"
          fill="none"
          filter="url(#package-path-glow)"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: reduceMotion ? 0 : 1.05, delay: 0.95, ease: transitionEase }}
          stroke="url(#package-path-gradient)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <motion.div
        className="absolute left-[10%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0ea5ff] via-[#38dfff] to-[#33e68a] shadow-[0_0_28px_rgba(56,223,255,0.52)]"
        animate={{ width: progressWidth }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: transitionEase }}
      />
      {!reduceMotion && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(56,223,255,0.95)]"
          animate={{ left: ['12%', progressWidth, '12%'] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {[13, 50, 87].map((left, index) => (
        <motion.span
          key={left}
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border ${index <= activeIndex ? 'border-cyan-100 bg-cyan-200 shadow-[0_0_26px_rgba(56,223,255,0.58)]' : 'border-cyan-200/28 bg-slate-950'}`}
          style={{ left: `${left}%` }}
          animate={index <= activeIndex && !reduceMotion ? { scale: [1, 1.18, 1] } : { scale: 1 }}
          transition={{ duration: 1.8, repeat: index <= activeIndex && !reduceMotion ? Infinity : 0, delay: index * 0.16 }}
        />
      ))}
    </div>
  );
}

function BottleneckVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-cyan-300/14 bg-slate-950/54 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,197,58,0.08),transparent_34%),radial-gradient(circle_at_82%_42%,rgba(56,223,255,0.10),transparent_32%)]" />
      <div className="relative flex h-full items-center justify-between gap-3">
        <div className="w-[31%] rounded-xl border border-amber-300/22 bg-amber-300/[0.055] p-2.5">
          <div className="mb-2 flex items-center gap-1.5 text-[0.58rem] text-amber-100"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Manual task</div>
          <div className="h-1.5 rounded-full bg-amber-200/22" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-amber-200/14" />
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute h-[2px] w-full border-t border-dashed border-amber-300/30" />
          <motion.div className="absolute h-[3px] rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,223,255,0.76)]" animate={{ width: active || reduceMotion ? '100%' : '38%' }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: transitionEase }} />
          <motion.span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/35 bg-slate-950 text-amber-100" animate={active && !reduceMotion ? { scale: [1, 1.12, 1], borderColor: ['rgba(244,197,58,0.35)', 'rgba(56,223,255,0.65)', 'rgba(244,197,58,0.35)'] } : { scale: 1 }} transition={{ duration: 0.8 }}>
            <Wrench className="h-4 w-4" />
          </motion.span>
          <motion.span className="absolute -bottom-8 rounded-full border border-cyan-200/34 bg-cyan-300/10 px-2 py-0.5 text-[0.58rem] font-semibold text-cyan-100" animate={{ opacity: active || reduceMotion ? 1 : 0, y: active || reduceMotion ? 0 : 5 }} transition={{ duration: 0.32 }}>Fixed</motion.span>
          {!reduceMotion && <motion.span className="absolute h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(56,223,255,0.92)]" animate={{ x: active ? [-48, 48] : [-28, 0], opacity: active ? [0, 1, 0] : 0.4 }} transition={{ duration: 1.2, repeat: active ? Infinity : 0, repeatDelay: 0.8 }} />}
        </div>
        <div className="w-[31%] rounded-xl border border-cyan-300/24 bg-cyan-300/[0.065] p-2.5">
          <div className="mb-2 flex items-center gap-1.5 text-[0.58rem] text-cyan-100"><CheckCircle2 className="h-3 w-3" /> Action sent</div>
          <div className="h-1.5 rounded-full bg-cyan-200/42" />
          <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-cyan-200/22" />
        </div>
      </div>
    </div>
  );
}

function CoreDashboardVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const tools = ['Website', 'Email', 'Sheets', 'WhatsApp'];

  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-cyan-300/14 bg-slate-950/54 p-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(244,197,58,0.10),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(56,223,255,0.10),transparent_42%)]" />
      <div className="relative grid h-full grid-cols-[0.76fr_1fr] gap-3">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool, index) => (
            <motion.div key={tool} className="rounded-xl border border-cyan-300/18 bg-white/[0.03] p-2 text-[0.58rem] text-slate-300" animate={active && !reduceMotion ? { borderColor: 'rgba(56,223,255,0.42)', color: '#f8fafc' } : {}} transition={{ delay: index * 0.08 }}>
              <span className="mb-1.5 block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />{tool}
            </motion.div>
          ))}
        </div>
        <motion.div className="rounded-2xl border border-cyan-300/24 bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" animate={active && !reduceMotion ? { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 26px rgba(244,197,58,0.10)' } : {}}>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[0.58rem] font-semibold text-cyan-100"><LayoutDashboard className="h-3 w-3" /> Dashboard</div>
            <motion.span className="rounded-full border border-cyan-200/26 bg-cyan-300/10 px-1.5 py-0.5 text-[0.52rem] text-cyan-100" animate={{ opacity: active || reduceMotion ? 1 : 0.72 }}>Live</motion.span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <motion.div className="rounded-lg border border-white/8 bg-cyan-300/[0.055] p-2" animate={active && !reduceMotion ? { scale: [1, 1.04, 1] } : { scale: 1 }} transition={{ duration: 1.1, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: 1.2 }}>
              <div className="text-[0.52rem] text-slate-400">Quotes</div><div className="mt-1 text-sm font-semibold text-white">24</div>
            </motion.div>
            <div className="rounded-lg border border-white/8 bg-white/[0.025] p-2"><div className="text-[0.52rem] text-slate-400">Status</div><div className="mt-1 text-sm font-semibold text-cyan-100">Synced</div></div>
          </div>
          <div className="mt-2 rounded-lg border border-amber-200/16 bg-amber-200/[0.045] px-2 py-1.5 text-[0.55rem] text-amber-100">Quote/document flow</div>
        </motion.div>
      </div>
    </div>
  );
}

function SupportLoopVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-cyan-300/14 bg-slate-950/54 p-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_26%,rgba(51,230,138,0.10),transparent_30%),radial-gradient(circle_at_78%_68%,rgba(56,223,255,0.10),transparent_34%)]" />
      <div className="relative grid h-full grid-cols-[0.95fr_1.05fr] gap-3">
        <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.045] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[0.58rem] font-semibold text-emerald-100"><Activity className="h-3 w-3" /> System health</div>
          <motion.div className="mb-2 flex items-center gap-2 rounded-lg border border-emerald-300/18 bg-slate-950/46 px-2 py-1.5 text-[0.56rem] text-emerald-100" animate={active && !reduceMotion ? { borderColor: ['rgba(51,230,138,0.18)', 'rgba(51,230,138,0.56)', 'rgba(51,230,138,0.18)'] } : {}} transition={{ duration: 1.6, repeat: active && !reduceMotion ? Infinity : 0 }}><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(51,230,138,0.75)]" /> Stable</motion.div>
          <div className="flex h-12 items-end gap-1.5">
            {[35, 52, 46, 68, 64, 82].map((height, index) => <motion.span key={index} className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/35 to-cyan-200/80" animate={{ height: active || reduceMotion ? `${height}%` : '28%' }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.04 }} />)}
          </div>
        </div>
        <div className="rounded-2xl border border-cyan-300/18 bg-white/[0.03] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[0.58rem] font-semibold text-cyan-100"><Gauge className="h-3 w-3" /> Roadmap</div>
          {['Monitor', 'Improve', 'Report'].map((item, index) => (
            <motion.div key={item} className="mb-1.5 flex items-center justify-between rounded-lg border border-white/8 bg-slate-950/42 px-2 py-1.5 text-[0.55rem] text-slate-300" animate={active && index === 1 && !reduceMotion ? { x: [0, 5, 0], color: '#f8fafc' } : {}} transition={{ duration: 1.2, repeat: active && index === 1 && !reduceMotion ? Infinity : 0, repeatDelay: 1 }}>
              <span>{item}</span><span className="text-cyan-200">{index === 1 ? 'Next' : 'Live'}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageMiniVisual({ visual, active, reduceMotion }: { visual: PackageVisual; active: boolean; reduceMotion: boolean }) {
  if (visual === 'bottleneck-fix') return <BottleneckVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'core-dashboard') return <CoreDashboardVisual active={active} reduceMotion={reduceMotion} />;
  return <SupportLoopVisual active={active} reduceMotion={reduceMotion} />;
}

function PackageIncludeList({ includes, active }: { includes: string[]; active: boolean }) {
  return (
    <ul className="mt-4 grid gap-2 text-sm text-slate-400">
      {includes.map((item) => (
        <li key={item} className={`flex items-center gap-2 transition duration-300 ${active ? 'text-slate-200' : ''}`}>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-200/84" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PackageCTA({ stage }: { stage: PackageStage }) {
  return (
    <Link href={stage.href} className="group/cta mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-cyan-300/34 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/68 hover:bg-cyan-300/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
      {stage.cta}
      <ArrowRight className="h-4 w-4 transition group-hover/cta:translate-x-1" />
    </Link>
  );
}

function PackageStageCard({ stage, index, active, reduceMotion, onActive }: { stage: PackageStage; index: number; active: boolean; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const Icon = stage.icon;
  const isCore = stage.id === 'core-system';

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.52, delay: 0.34 + index * 0.16, ease: transitionEase }}
      onMouseEnter={() => onActive(stage.id)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(stage.id)}
      onBlur={() => onActive(null)}
      className={`group relative z-10 flex h-full flex-col rounded-[28px] border bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-cyan-200/54 focus-within:border-cyan-200/54 focus-within:ring-2 focus-within:ring-cyan-200/45 lg:p-6 ${active ? 'border-cyan-200/46' : 'border-cyan-300/22'} ${isCore ? 'lg:-mt-5 lg:min-h-[510px] lg:border-[#f4c53a]/34 lg:shadow-[0_28px_76px_rgba(0,0,0,0.40),0_0_36px_rgba(244,197,58,0.08),inset_0_1px_0_rgba(255,255,255,0.07)]' : 'lg:mt-5'}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.10),transparent_36%)] opacity-80 transition group-hover:opacity-100" />
      {isCore && <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#f4c53a]/70 to-transparent" />}
      <div className="relative flex grow flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <StageNumber stage={stage.stage} active={active} />
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-300/24 bg-cyan-300/10 text-cyan-100"><Icon className="h-4 w-4" /></span>
          </div>
          <span className={`rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.13em] transition duration-300 ${active ? 'border-cyan-200/54 bg-cyan-300/12 text-cyan-50' : 'border-cyan-300/20 bg-slate-950/46 text-cyan-100/78'}`}>{stage.time}</span>
        </div>
        {stage.recommended && <span className="mb-3 w-fit rounded-full border border-[#f4c53a]/26 bg-[#f4c53a]/8 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#f4c53a]">{stage.recommended}</span>}
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cyan-200/76">{stage.label}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">{stage.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="text-slate-500">Best for:</span> {stage.bestFor}</p>
        <div className="mt-5"><PackageMiniVisual visual={stage.visual} active={active} reduceMotion={reduceMotion} /></div>
        <PackageIncludeList includes={stage.includes} active={active} />
        <div className="mt-auto"><PackageCTA stage={stage} /></div>
      </div>
    </motion.article>
  );
}

function MobilePackageTimeline({ activeId, reduceMotion, onActive }: { activeId: string | null; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const activeIndex = getStageIndex(activeId);

  return (
    <div className="relative mt-10 lg:hidden">
      <motion.div className="absolute bottom-8 left-5 top-4 w-px rounded-full bg-cyan-300/18" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.3, ease: transitionEase }} style={{ transformOrigin: 'top' }} aria-hidden="true" />
      <div className="grid gap-5 pl-10">
        {packageStages.map((stage, index) => (
          <div key={stage.id} className="relative">
            <span className={`absolute -left-[29px] top-7 h-4 w-4 rounded-full border ${index <= activeIndex ? 'border-cyan-100 bg-cyan-200 shadow-[0_0_24px_rgba(56,223,255,0.62)]' : 'border-cyan-300/28 bg-slate-950'}`} aria-hidden="true" />
            <PackageStageCard stage={stage} index={index} active={activeId === stage.id || (!activeId && index === 1)} reduceMotion={reduceMotion} onActive={onActive} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PackagePathPanel({ activeId, reduceMotion, onActive }: { activeId: string | null; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const activeIndex = getStageIndex(activeId);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.62, delay: 0.18, ease: transitionEase }}
      className="relative mt-12 overflow-hidden rounded-[32px] border border-cyan-300/22 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.10),transparent_36%),rgba(3,10,24,0.78)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(120,220,255,0.06),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-[18px] sm:p-6 lg:min-h-[590px] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-x-[22%] top-20 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <PackagePathLine activeIndex={activeIndex} reduceMotion={reduceMotion} />
      <div className="relative z-10 hidden grid-cols-3 gap-5 lg:grid xl:gap-7">
        {packageStages.map((stage, index) => (
          <PackageStageCard key={stage.id} stage={stage} index={index} active={activeId === stage.id || (!activeId && index === 1)} reduceMotion={reduceMotion} onActive={onActive} />
        ))}
      </div>
      <MobilePackageTimeline activeId={activeId} reduceMotion={reduceMotion} onActive={onActive} />
    </motion.div>
  );
}

export function PackagePathway() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | null>('core-system');

  return (
    <section className="package-pathway-section homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="package-pathway-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(0,145,255,0.12),transparent_36%),radial-gradient(circle_at_82%_70%,rgba(0,220,255,0.05),transparent_30%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020711] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020711] to-transparent" />

      <div className="section-shell relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="section-heading max-w-[850px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> PACKAGE PATHWAY</div>
          <h2 id="package-pathway-title" className="text-[clamp(2.15rem,5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">Choose your growth pace.</h2>
          <p className="mt-5 max-w-[760px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Pick the level that matches the leak you need fixed first.</p>
        </motion.div>

        <PackagePathPanel activeId={activeId} reduceMotion={reduceMotion} onActive={setActiveId} />

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.32, ease: transitionEase }} className="mt-6 flex flex-col gap-4 rounded-3xl border border-cyan-200/14 bg-slate-950/44 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Not sure where to start?</h3>
            <p className="mt-1 max-w-[780px] text-sm leading-relaxed text-slate-300">Tell us where work is leaking and we will recommend the first system layer to build.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0ea5ff,#1d7dff)] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(14,165,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
              Get a system recommendation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/pricing" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-cyan-300/28 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">View pricing</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
