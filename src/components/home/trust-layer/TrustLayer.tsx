'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ListChecks,
  Plug,
  Scissors,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

type TrustVisual = 'verified-business-card' | 'scope-checklist' | 'tool-connections' | 'handover-pack' | 'response-timer' | 'complexity-slider';

type TrustCardData = {
  id: string;
  label: string;
  title: string;
  content: string[];
  visual: TrustVisual;
  icon: LucideIcon;
  status: string;
  featured?: boolean;
};

type StatusItem = {
  label: string;
  icon: LucideIcon;
};

const trustCards: TrustCardData[] = [
  {
    id: 'registered-company',
    label: 'Verified details',
    title: 'Registered company',
    content: ['Rapid Rise AI (Pty) Ltd', 'CIPC 2024/727338/07', 'Not VAT registered'],
    visual: 'verified-business-card',
    icon: Building2,
    status: 'Company record',
    featured: true,
  },
  {
    id: 'clear-scope',
    label: 'Delivery clarity',
    title: 'Clear scope',
    content: ['We define workflow, outcome, tools, and next step before build.'],
    visual: 'scope-checklist',
    icon: ListChecks,
    status: 'Scope locked',
  },
  {
    id: 'built-around-tools',
    label: 'Practical stack',
    title: 'Built around your tools',
    content: ['We usually improve what you already use before recommending new software.'],
    visual: 'tool-connections',
    icon: Plug,
    status: 'Connected layer',
  },
  {
    id: 'handover-ready',
    label: 'Usable delivery',
    title: 'Handover ready',
    content: ['Documentation, training, and ownership are part of delivery.'],
    visual: 'handover-pack',
    icon: BookOpenCheck,
    status: 'Ready',
  },
  {
    id: 'response-24h',
    label: 'Clear next step',
    title: 'Response within 24h',
    content: ['Enquiries are reviewed and answered with clear next steps.'],
    visual: 'response-timer',
    icon: Clock3,
    status: 'Reviewed',
  },
  {
    id: 'practical-systems',
    label: 'Useful by design',
    title: 'Practical systems',
    content: ['No bloated software. No unnecessary complexity. Build what gets used.'],
    visual: 'complexity-slider',
    icon: SlidersHorizontal,
    status: 'Gets used',
  },
];

const statusItems: StatusItem[] = [
  { label: 'Real company details', icon: BadgeCheck },
  { label: 'Clear delivery scope', icon: Target },
  { label: 'Practical handover', icon: FileCheck2 },
  { label: 'Built around business tools', icon: Workflow },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function VisualShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-cyan-300/14 bg-slate-950/58 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function VerifiedBusinessCardVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <VisualShell className="min-h-[230px] sm:min-h-[250px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(56,223,255,0.12),transparent_34%),radial-gradient(circle_at_82%_80%,rgba(51,230,138,0.08),transparent_32%)]" />
      <div className="relative flex h-full flex-col justify-between rounded-2xl border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(6,18,34,0.96),rgba(2,8,18,0.98))] p-4 shadow-[0_18px_46px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {!reduceMotion && (
          <motion.span
            className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-cyan-100/12 to-transparent"
            initial={{ x: '-30%' }}
            whileInView={{ x: active ? '360%' : '280%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.15, delay: 0.38, ease: transitionEase }}
          />
        )}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/78">Company record</p>
            <h3 className="mt-2 text-xl font-semibold leading-tight text-white">Rapid Rise AI (Pty) Ltd</h3>
          </div>
          <motion.span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/28 bg-emerald-300/10 text-emerald-100" animate={active && !reduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }} transition={{ duration: 1.7, repeat: active && !reduceMotion ? Infinity : 0 }}>
            <ShieldCheck className="h-5 w-5" />
          </motion.span>
        </div>
        <div className="relative mt-6 grid gap-2">
          <div className="rounded-xl border border-cyan-300/14 bg-white/[0.03] px-3 py-2">
            <span className="text-[0.58rem] uppercase tracking-[0.13em] text-slate-500">CIPC</span>
            <p className="mt-1 text-sm font-semibold text-slate-100">2024/727338/07</p>
          </div>
          <div className="rounded-xl border border-cyan-300/14 bg-white/[0.03] px-3 py-2">
            <span className="text-[0.58rem] uppercase tracking-[0.13em] text-slate-500">VAT</span>
            <p className="mt-1 text-sm font-semibold text-slate-100">Not registered</p>
          </div>
        </div>
        <div className="relative mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/24 bg-emerald-300/10 px-3 py-1 text-[0.62rem] font-semibold text-emerald-100"><CheckCircle2 className="h-3.5 w-3.5" /> Verified details</span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan-200/35 to-transparent" />
        </div>
      </div>
    </VisualShell>
  );
}

function ScopeChecklistVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const rows = ['Workflow', 'Outcome', 'Tools', 'Next step'];

  return (
    <VisualShell className="h-40">
      <div className="grid h-full gap-2">
        {rows.map((row, index) => (
          <motion.div key={row} className="flex items-center justify-between rounded-xl border border-cyan-300/14 bg-white/[0.03] px-3 py-2 text-[0.62rem] text-slate-200" animate={{ opacity: active || reduceMotion ? 1 : 0.68, x: active || reduceMotion ? 0 : -4 }} transition={{ duration: reduceMotion ? 0 : 0.3, delay: index * 0.07 }}>
            <span>{row}</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-200" />
          </motion.div>
        ))}
      </div>
      <motion.span className="absolute bottom-2 right-3 rounded-full border border-emerald-200/24 bg-emerald-300/10 px-2 py-0.5 text-[0.55rem] font-semibold text-emerald-100" animate={{ opacity: active || reduceMotion ? 1 : 0.62 }}>Scope locked</motion.span>
    </VisualShell>
  );
}

function ToolConnectionVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const tools = ['Email', 'Sheets', 'WhatsApp', 'Forms', 'Calendar'];

  return (
    <VisualShell className="h-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,223,255,0.10),transparent_34%)]" />
      <div className="relative grid h-full grid-cols-[1fr_0.85fr] gap-3">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool, index) => (
            <motion.div key={tool} className="rounded-xl border border-cyan-300/16 bg-white/[0.03] px-2 py-2 text-[0.56rem] text-slate-300" animate={active && !reduceMotion ? { borderColor: 'rgba(56,223,255,0.34)', color: '#f8fafc' } : {}} transition={{ delay: index * 0.06 }}>
              <span className="mb-1 block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />{tool}
            </motion.div>
          ))}
        </div>
        <motion.div className="flex flex-col items-center justify-center rounded-2xl border border-cyan-300/24 bg-cyan-300/[0.06] text-center" animate={active && !reduceMotion ? { boxShadow: '0 0 24px rgba(56,223,255,0.14)' } : {}}>
          <Workflow className="h-6 w-6 text-cyan-100" />
          <span className="mt-2 text-[0.58rem] font-semibold text-cyan-100">System layer</span>
        </motion.div>
      </div>
      {!reduceMotion && <motion.span className="absolute left-[54%] top-1/2 h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(56,223,255,0.85)]" animate={{ x: active ? [-46, 16] : -20, opacity: active ? [0, 1, 0] : 0.3 }} transition={{ duration: 1.3, repeat: active ? Infinity : 0, repeatDelay: 0.8 }} />}
    </VisualShell>
  );
}

function HandoverPackVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const items = ['Docs', 'Training', 'Access', 'Ownership'];

  return (
    <VisualShell className="h-40">
      <div className="relative flex h-full items-center gap-3">
        <motion.div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/22 bg-cyan-300/[0.055] text-cyan-100" animate={active && !reduceMotion ? { y: [0, -3, 0] } : { y: 0 }} transition={{ duration: 1.8, repeat: active && !reduceMotion ? Infinity : 0 }}>
          <FileCheck2 className="h-8 w-8" />
        </motion.div>
        <div className="grid flex-1 gap-1.5">
          {items.map((item, index) => (
            <motion.div key={item} className="flex items-center justify-between rounded-lg border border-cyan-300/14 bg-white/[0.03] px-2 py-1.5 text-[0.56rem] text-slate-200" animate={{ opacity: active || reduceMotion ? 1 : 0.66 }} transition={{ delay: index * 0.06 }}>
              {item}<CheckCircle2 className="h-3 w-3 text-emerald-200" />
            </motion.div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-2 right-3 rounded-full border border-emerald-200/24 bg-emerald-300/10 px-2 py-0.5 text-[0.55rem] font-semibold text-emerald-100">Ready</span>
    </VisualShell>
  );
}

function ResponseTimerVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const circumference = 2 * Math.PI * 28;

  return (
    <VisualShell className="h-40">
      <div className="grid h-full grid-cols-[0.7fr_1fr] gap-3">
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90" aria-hidden="true">
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(56,223,255,0.14)" strokeWidth="7" />
            <motion.circle cx="36" cy="36" r="28" fill="none" stroke="#38DFFF" strokeLinecap="round" strokeWidth="7" strokeDasharray={circumference} initial={reduceMotion ? false : { strokeDashoffset: circumference }} animate={{ strokeDashoffset: active || reduceMotion ? circumference * 0.18 : circumference * 0.48 }} transition={{ duration: reduceMotion ? 0 : 0.85, ease: transitionEase }} />
          </svg>
          <span className="absolute text-sm font-semibold text-white">24h</span>
        </div>
        <div className="grid content-center gap-2 text-[0.58rem] text-slate-200">
          <div className="rounded-xl border border-cyan-300/16 bg-white/[0.03] px-2 py-1.5">Enquiry received</div>
          <motion.div className="rounded-xl border border-amber-300/18 bg-amber-300/[0.055] px-2 py-1.5 text-amber-100" animate={active && !reduceMotion ? { borderColor: ['rgba(245,165,36,0.18)', 'rgba(56,223,255,0.38)', 'rgba(245,165,36,0.18)'] } : {}}>Reviewed</motion.div>
          <div className="flex items-center gap-2 rounded-xl border border-cyan-300/16 bg-cyan-300/[0.055] px-2 py-1.5 text-cyan-100"><Send className="h-3 w-3" /> Next step sent</div>
        </div>
      </div>
    </VisualShell>
  );
}

function ComplexitySliderVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <VisualShell className="h-40">
      <div className="relative flex h-full flex-col justify-center gap-5 px-2">
        <div className="flex items-center justify-between text-[0.58rem] font-semibold uppercase tracking-[0.12em]"><span className="text-slate-500">Bloated</span><span className="text-emerald-100">Clean</span></div>
        <div className="relative h-2 rounded-full bg-slate-800/90">
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#38dfff] shadow-[0_0_20px_rgba(56,223,255,0.44)]" animate={{ width: active || reduceMotion ? '82%' : '38%' }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: transitionEase }} />
          <motion.span className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-cyan-100 bg-slate-950 shadow-[0_0_22px_rgba(56,223,255,0.44)]" animate={{ left: active || reduceMotion ? '78%' : '34%' }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: transitionEase }} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1.5 opacity-50">
            {[0, 1, 2, 3, 4].map((dot) => <motion.span key={dot} className="h-2 w-2 rounded-full bg-slate-500" animate={{ opacity: active || reduceMotion ? 0.26 : 0.7 }} transition={{ delay: dot * 0.03 }} />)}
          </div>
          <span className="rounded-full border border-emerald-200/24 bg-emerald-300/10 px-3 py-1 text-[0.58rem] font-semibold text-emerald-100">Gets used</span>
        </div>
      </div>
    </VisualShell>
  );
}

function TrustMiniVisual({ visual, active, reduceMotion }: { visual: TrustVisual; active: boolean; reduceMotion: boolean }) {
  if (visual === 'verified-business-card') return <VerifiedBusinessCardVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'scope-checklist') return <ScopeChecklistVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'tool-connections') return <ToolConnectionVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'handover-pack') return <HandoverPackVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'response-timer') return <ResponseTimerVisual active={active} reduceMotion={reduceMotion} />;
  return <ComplexitySliderVisual active={active} reduceMotion={reduceMotion} />;
}

function TrustCard({ card, index, active, reduceMotion, onActive }: { card: TrustCardData; index: number; active: boolean; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const Icon = card.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.5, delay: card.featured ? 0.3 : 0.46 + index * 0.08, ease: transitionEase }}
      onMouseEnter={() => onActive(card.id)}
      onMouseLeave={() => onActive(null)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border bg-[linear-gradient(180deg,rgba(6,18,34,0.92),rgba(2,8,18,0.96))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/48 ${active ? 'border-cyan-200/44' : 'border-cyan-300/16'} ${card.featured ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-4'}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.10),transparent_38%)] opacity-70 transition group-hover:opacity-100" />
      {card.featured && <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#f4c53a]/58 to-transparent" />}
      <div className="relative flex grow flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${active ? 'border-cyan-200/46 bg-cyan-300/14 text-cyan-100 shadow-[0_0_20px_rgba(56,223,255,0.16)]' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100/82'}`}><Icon className="h-[18px] w-[18px]" /></span>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/74">{card.label}</p>
              <h3 className="mt-1 text-xl font-semibold leading-tight text-white">{card.title}</h3>
            </div>
          </div>
          <span className={`rounded-full border px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.11em] ${card.featured ? 'border-emerald-200/24 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/16 bg-slate-950/44 text-cyan-100/72'}`}>{card.status}</span>
        </div>
        <div className="space-y-1 text-sm leading-relaxed text-slate-300">
          {card.content.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="mt-5"><TrustMiniVisual visual={card.visual} active={active} reduceMotion={reduceMotion} /></div>
      </div>
    </motion.article>
  );
}

function TrustStatusBar({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, delay: 0.92, ease: transitionEase }} className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {statusItems.map(({ label, icon: Icon }) => (
        <div key={label} className="flex items-center gap-2 rounded-2xl border border-cyan-300/14 bg-[rgba(4,13,28,0.70)] px-3 py-3 text-sm font-semibold text-slate-200">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-300/8 text-cyan-100"><Icon className="h-4 w-4" /></span>
          {label}
        </div>
      ))}
    </motion.div>
  );
}

function TrustPanel({ activeId, reduceMotion, onActive }: { activeId: string | null; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.62, delay: 0.18, ease: transitionEase }}
      className="relative mt-12 overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_42%,rgba(0,180,255,0.07),transparent_38%),rgba(3,10,24,0.76)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(120,220,255,0.06),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-[18px] sm:p-6 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-x-[18%] top-10 h-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        {trustCards.map((card, index) => (
          <TrustCard key={card.id} card={card} index={index} active={activeId === card.id || (!activeId && card.featured === true)} reduceMotion={reduceMotion} onActive={onActive} />
        ))}
      </div>
      <TrustStatusBar reduceMotion={reduceMotion} />
    </motion.div>
  );
}

export function TrustLayer() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | null>('registered-company');

  return (
    <section className="trust-layer-section homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="trust-layer-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_28%,rgba(0,145,255,0.10),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(0,220,255,0.05),transparent_30%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020711] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020711] to-transparent" />

      <div className="section-shell relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="section-heading max-w-[880px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> TRUST LAYER</div>
          <h2 id="trust-layer-title" className="text-[clamp(2.15rem,5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">Built for real businesses, not demos.</h2>
          <p className="mt-5 max-w-[800px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Practical systems, clear scope, and handover your team can actually use.</p>
        </motion.div>

        <TrustPanel activeId={activeId} reduceMotion={reduceMotion} onActive={setActiveId} />

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.3, ease: transitionEase }} className="mt-6 flex flex-col gap-4 rounded-3xl border border-cyan-200/14 bg-slate-950/44 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <p className="max-w-[760px] text-sm leading-relaxed text-slate-300"><span className="font-semibold text-white">Want a clear next step before you commit?</span> Start with a practical quote request and we will map the first system layer.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0ea5ff,#1d7dff)] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(14,165,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
              Request a Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/#delivery-timeline-title" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-cyan-300/28 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">View our process</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
