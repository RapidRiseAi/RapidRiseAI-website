'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileText,
  LayoutTemplate,
  Plug,
  Radar,
  Rocket,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

type DeliveryVisual = 'workflow-map' | 'blueprint' | 'build-connect' | 'test-checklist' | 'handover' | 'data-improvement';

type DeliveryStep = {
  id: string;
  step: string;
  title: string;
  icon: LucideIcon;
  visual: DeliveryVisual;
  microcopy: string;
  status: string;
};

type TrustItem = {
  label: string;
  icon: LucideIcon;
};

const deliverySteps: DeliveryStep[] = [
  {
    id: 'diagnose',
    step: '01',
    title: 'Diagnose the leaks',
    icon: Search,
    visual: 'workflow-map',
    microcopy: 'We map where leads, time, and accuracy are being lost.',
    status: 'Map the problem',
  },
  {
    id: 'design',
    step: '02',
    title: 'Design the operating layer',
    icon: LayoutTemplate,
    visual: 'blueprint',
    microcopy: 'We plan the simplest system that fixes the core problem.',
    status: 'Approve the flow',
  },
  {
    id: 'build',
    step: '03',
    title: 'Build and connect',
    icon: Workflow,
    visual: 'build-connect',
    microcopy: 'We automate, integrate, and build the screens needed.',
    status: 'Connect tools',
  },
  {
    id: 'test',
    step: '04',
    title: 'Test with real scenarios',
    icon: ShieldCheck,
    visual: 'test-checklist',
    microcopy: 'We test with actual business examples before launch.',
    status: 'Prove it works',
  },
  {
    id: 'launch',
    step: '05',
    title: 'Launch and hand over',
    icon: Rocket,
    visual: 'handover',
    microcopy: 'Your team gets docs, training, and ownership.',
    status: 'Handover ready',
  },
  {
    id: 'improve',
    step: '06',
    title: 'Improve from data',
    icon: TrendingUp,
    visual: 'data-improvement',
    microcopy: 'We refine based on usage, bottlenecks, and outcomes.',
    status: 'Optimize',
  },
];

const trustItems: TrustItem[] = [
  { label: 'Clear scope', icon: Target },
  { label: 'No bloated build', icon: Scissors },
  { label: 'Handover ready', icon: FileCheck2 },
  { label: 'Built around your tools', icon: Plug },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function getStepIndex(id: string | null) {
  if (!id) return 2;
  return Math.max(0, deliverySteps.findIndex((step) => step.id === id));
}

function TimelineLine({ activeIndex, reduceMotion }: { activeIndex: number; reduceMotion: boolean }) {
  const path = 'M 42 78 C 175 22, 242 136, 356 78 S 538 22, 642 78 S 818 132, 958 78';

  return (
    <div className="pointer-events-none absolute inset-x-10 top-[49%] z-0 hidden h-36 -translate-y-1/2 lg:block" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 156" preserveAspectRatio="none">
        <defs>
          <filter id="delivery-line-glow" x="-18%" y="-90%" width="136%" height="280%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="delivery-line-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#F5A524" stopOpacity="0.75" />
            <stop offset="0.22" stopColor="#0EA5FF" />
            <stop offset="0.72" stopColor="#38DFFF" />
            <stop offset="1" stopColor="#33E68A" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="rgba(56,223,255,0.12)" strokeLinecap="round" strokeWidth="20" />
        <motion.path
          d={path}
          fill="none"
          filter="url(#delivery-line-glow)"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: reduceMotion ? 0 : 1.18, delay: 0.58, ease: transitionEase }}
          stroke="url(#delivery-line-gradient)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      {!reduceMotion && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(56,223,255,0.95)]"
          animate={{ left: ['4%', '96%'] }}
          transition={{ duration: 7.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      )}
      {[5, 22, 40, 58, 76, 95].map((left, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;
        return (
          <motion.span
            key={left}
            className={`absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border ${active ? 'border-cyan-100 bg-cyan-200 shadow-[0_0_30px_rgba(56,223,255,0.68)]' : complete ? 'border-emerald-200/72 bg-emerald-300/18 text-emerald-100' : 'border-cyan-200/24 bg-slate-950'}`}
            style={{ left: `${left}%` }}
            animate={active && !reduceMotion ? { scale: [1, 1.16, 1] } : { scale: 1 }}
            transition={{ duration: 1.9, repeat: active && !reduceMotion ? Infinity : 0 }}
          >
            {complete ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
          </motion.span>
        );
      })}
    </div>
  );
}

function VisualShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-cyan-300/14 bg-slate-950/58 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(125,190,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.7)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function WorkflowMapVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const nodes = ['Lead', 'Inbox', 'Follow-up'];

  return (
    <VisualShell>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_35%,rgba(245,165,36,0.10),transparent_30%),radial-gradient(circle_at_78%_54%,rgba(56,223,255,0.10),transparent_34%)]" />
      <motion.div className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-100" animate={active && !reduceMotion ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1.6, repeat: active && !reduceMotion ? Infinity : 0, ease: 'linear' }}>
        <Radar className="h-5 w-5" />
        <span className="absolute h-8 w-8 rounded-full border border-cyan-300/12" />
      </motion.div>
      <div className="relative flex h-full items-center gap-2 pr-12">
        {nodes.map((node, index) => (
          <div key={node} className="relative flex-1 rounded-xl border border-amber-300/18 bg-amber-300/[0.045] p-2 text-[0.58rem] text-slate-200">
            <span className="mb-2 block h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(245,165,36,0.75)]" />
            {node}
            {index < nodes.length - 1 && <span className="absolute left-full top-1/2 h-px w-3 border-t border-dashed border-amber-300/38" />}
          </div>
        ))}
      </div>
      <motion.span className="absolute bottom-2 left-3 rounded-full border border-amber-200/26 bg-amber-300/[0.08] px-2 py-0.5 text-[0.55rem] font-semibold text-amber-100" animate={{ opacity: active || reduceMotion ? 1 : 0.58, y: active || reduceMotion ? 0 : 4 }} transition={{ duration: 0.35 }}>Leak found</motion.span>
    </VisualShell>
  );
}

function BlueprintVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const modules = ['Capture', 'Route', 'Track'];

  return (
    <VisualShell>
      <div className="absolute inset-3 rounded-2xl border border-cyan-300/14" />
      <motion.div className="absolute inset-5 rounded-xl border border-cyan-200/28" animate={active && !reduceMotion ? { boxShadow: ['0 0 0 rgba(56,223,255,0)', '0 0 18px rgba(56,223,255,0.16)', '0 0 0 rgba(56,223,255,0)'] } : {}} transition={{ duration: 1.8, repeat: active && !reduceMotion ? Infinity : 0 }} />
      <div className="relative flex h-full items-center justify-center gap-2 px-2">
        {modules.map((module, index) => (
          <motion.div key={module} className="rounded-xl border border-cyan-300/24 bg-cyan-300/[0.055] px-3 py-3 text-center text-[0.58rem] font-semibold text-cyan-100" animate={{ opacity: active || reduceMotion ? 1 : 0.72, y: active || reduceMotion ? 0 : 5 }} transition={{ duration: reduceMotion ? 0 : 0.32, delay: index * 0.08 }}>
            {module}
          </motion.div>
        ))}
      </div>
      <motion.span className="absolute bottom-2 right-3 rounded-full border border-cyan-200/28 bg-cyan-300/10 px-2 py-0.5 text-[0.55rem] font-semibold text-cyan-100" animate={{ opacity: active || reduceMotion ? 1 : 0.6 }}>Approved flow</motion.span>
    </VisualShell>
  );
}

function BuildConnectVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const tools = ['Website', 'Email', 'Sheets'];

  return (
    <VisualShell>
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-3">
        <div className="grid gap-1.5">
          {tools.map((tool, index) => (
            <motion.div key={tool} className="flex items-center justify-between rounded-lg border border-cyan-300/16 bg-white/[0.03] px-2 py-1.5 text-[0.55rem] text-slate-300" animate={active && !reduceMotion ? { x: [0, 3, 0], borderColor: 'rgba(56,223,255,0.34)' } : {}} transition={{ duration: 0.85, delay: index * 0.12 }}>
              {tool}<Plug className="h-3 w-3 text-cyan-200" />
            </motion.div>
          ))}
        </div>
        <motion.div className="rounded-2xl border border-cyan-300/24 bg-[linear-gradient(180deg,rgba(6,18,34,0.95),rgba(2,8,18,0.98))] p-3" animate={active && !reduceMotion ? { boxShadow: '0 0 24px rgba(56,223,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)' } : {}}>
          <div className="mb-2 flex items-center gap-1.5 text-[0.58rem] font-semibold text-cyan-100"><Workflow className="h-3 w-3" /> Dashboard</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/8 bg-cyan-300/[0.055] p-2"><span className="text-[0.5rem] text-slate-400">New</span><p className="text-sm font-semibold text-white">18</p></div>
            <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2"><span className="text-[0.5rem] text-slate-400">Status</span><p className="text-sm font-semibold text-cyan-100">Live</p></div>
          </div>
          <span className="mt-2 inline-flex rounded-full border border-cyan-200/24 bg-cyan-300/10 px-2 py-0.5 text-[0.52rem] text-cyan-100">Connected</span>
        </motion.div>
      </div>
    </VisualShell>
  );
}

function TestChecklistVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const tests = ['Scenario 01', 'Scenario 02', 'Edge case'];

  return (
    <VisualShell>
      <div className="grid h-full gap-2">
        {tests.map((test, index) => (
          <motion.div key={test} className="flex items-center justify-between rounded-xl border border-emerald-300/16 bg-emerald-300/[0.045] px-3 py-2 text-[0.58rem] text-slate-200" animate={{ opacity: active || reduceMotion ? 1 : 0.68, x: active || reduceMotion ? 0 : -4 }} transition={{ duration: reduceMotion ? 0 : 0.34, delay: index * 0.1 }}>
            <span>{test}</span>
            <span className="inline-flex items-center gap-1 text-emerald-100"><CheckCircle2 className="h-3.5 w-3.5" /> {index === 2 ? 'Checked' : 'Passed'}</span>
          </motion.div>
        ))}
      </div>
      <motion.span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/28 bg-emerald-300/10 text-emerald-100" animate={active && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }} transition={{ duration: 1.6, repeat: active && !reduceMotion ? Infinity : 0 }}><ShieldCheck className="h-4 w-4" /></motion.span>
    </VisualShell>
  );
}

function HandoverVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const docs = ['Docs', 'SOPs', 'Training', 'Access'];

  return (
    <VisualShell>
      <div className="relative flex h-full items-center gap-3">
        <motion.div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/22 bg-cyan-300/[0.055] text-cyan-100" animate={active && !reduceMotion ? { y: [0, -3, 0] } : { y: 0 }} transition={{ duration: 1.8, repeat: active && !reduceMotion ? Infinity : 0 }}><FileText className="h-7 w-7" /></motion.div>
        <div className="grid flex-1 grid-cols-2 gap-1.5">
          {docs.map((doc, index) => (
            <motion.div key={doc} className="rounded-lg border border-cyan-300/16 bg-white/[0.03] px-2 py-1.5 text-[0.55rem] text-slate-200" animate={{ opacity: active || reduceMotion ? 1 : 0.64 }} transition={{ delay: index * 0.08 }}>{doc}</motion.div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-2 right-3 rounded-full border border-emerald-200/24 bg-emerald-300/10 px-2 py-0.5 text-[0.55rem] font-semibold text-emerald-100">Handover ready</span>
    </VisualShell>
  );
}

function DataImprovementVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <VisualShell>
      <div className="grid h-full grid-cols-[1fr_0.82fr] gap-3">
        <div className="rounded-2xl border border-cyan-300/18 bg-white/[0.03] p-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-[0.55rem] text-slate-400">Usage</span><span className="text-sm font-semibold text-emerald-100">+24%</span></div>
          <svg viewBox="0 0 120 54" className="h-14 w-full overflow-visible" aria-hidden="true">
            <path d="M4 45 C 25 40, 31 31, 48 33 S 76 18, 96 12 S 114 9, 118 5" fill="none" stroke="rgba(51,230,138,0.22)" strokeWidth="8" strokeLinecap="round" />
            <motion.path d="M4 45 C 25 40, 31 31, 48 33 S 76 18, 96 12 S 114 9, 118 5" fill="none" stroke="#33E68A" strokeWidth="3" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: active || reduceMotion ? 1 : 0.38 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: transitionEase }} />
          </svg>
        </div>
        <div className="grid gap-2 text-[0.55rem] text-slate-200">
          <div className="rounded-xl border border-cyan-300/16 bg-cyan-300/[0.045] p-2">Response faster</div>
          <div className="rounded-xl border border-emerald-300/16 bg-emerald-300/[0.045] p-2">Bottleneck removed</div>
          <div className="rounded-xl border border-cyan-300/16 bg-white/[0.03] p-2">Report updated</div>
        </div>
      </div>
      <span className="absolute bottom-2 left-3 rounded-full border border-emerald-200/24 bg-emerald-300/10 px-2 py-0.5 text-[0.55rem] font-semibold text-emerald-100">Optimized</span>
    </VisualShell>
  );
}

function StepMiniVisual({ visual, active, reduceMotion }: { visual: DeliveryVisual; active: boolean; reduceMotion: boolean }) {
  if (visual === 'workflow-map') return <WorkflowMapVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'blueprint') return <BlueprintVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'build-connect') return <BuildConnectVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'test-checklist') return <TestChecklistVisual active={active} reduceMotion={reduceMotion} />;
  if (visual === 'handover') return <HandoverVisual active={active} reduceMotion={reduceMotion} />;
  return <DataImprovementVisual active={active} reduceMotion={reduceMotion} />;
}

function DeliveryStepCard({ step, index, active, completed, reduceMotion, onActive }: { step: DeliveryStep; index: number; active: boolean; completed: boolean; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const Icon = step.icon;

  return (
    <motion.article
      tabIndex={0}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.5, delay: 0.48 + index * 0.11, ease: transitionEase }}
      onMouseEnter={() => onActive(step.id)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(step.id)}
      onBlur={() => onActive(null)}
      className={`group relative z-10 rounded-[26px] border bg-[linear-gradient(180deg,rgba(6,18,34,0.92),rgba(2,8,18,0.96))] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/54 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 lg:p-5 ${active ? 'border-cyan-200/50 opacity-100 shadow-[0_24px_62px_rgba(0,0,0,0.38),0_0_32px_rgba(56,223,255,0.10),inset_0_1px_0_rgba(255,255,255,0.07)]' : completed ? 'border-emerald-300/24 opacity-95' : 'border-cyan-300/18 opacity-86'}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.10),transparent_40%)] opacity-70 transition group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2 text-[0.62rem] font-semibold tracking-[0.14em] ${active ? 'border-cyan-200/58 bg-cyan-300/14 text-cyan-50' : 'border-cyan-300/18 bg-slate-950/46 text-slate-400'}`}>{step.step}</span>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-2xl border ${active ? 'border-cyan-200/48 bg-cyan-300/14 text-cyan-100 shadow-[0_0_20px_rgba(56,223,255,0.18)]' : 'border-cyan-300/18 bg-cyan-300/8 text-cyan-100/80'}`}><Icon className="h-4 w-4" /></span>
          </div>
          <span className={`rounded-full border px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.11em] ${completed ? 'border-emerald-200/24 bg-emerald-300/10 text-emerald-100' : active ? 'border-cyan-200/30 bg-cyan-300/10 text-cyan-100' : 'border-cyan-300/14 bg-slate-950/44 text-slate-500'}`}>{completed ? 'Done' : step.status}</span>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-white">{step.title}</h3>
        <p className="mt-2 min-h-[62px] text-sm leading-relaxed text-slate-300">{step.microcopy}</p>
        <div className="mt-4"><StepMiniVisual visual={step.visual} active={active} reduceMotion={reduceMotion} /></div>
      </div>
    </motion.article>
  );
}

function MobileTimeline({ activeId, reduceMotion, onActive }: { activeId: string | null; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const activeIndex = getStepIndex(activeId);

  return (
    <div className="relative mt-10 lg:hidden">
      <motion.div className="absolute bottom-8 left-5 top-4 w-px rounded-full bg-cyan-300/18" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.25, ease: transitionEase }} style={{ transformOrigin: 'top' }} aria-hidden="true" />
      <div className="grid gap-5 pl-10">
        {deliverySteps.map((step, index) => (
          <div key={step.id} className="relative">
            <span className={`absolute -left-[29px] top-7 flex h-4 w-4 items-center justify-center rounded-full border ${index === activeIndex ? 'border-cyan-100 bg-cyan-200 shadow-[0_0_24px_rgba(56,223,255,0.62)]' : index < activeIndex ? 'border-emerald-200/58 bg-emerald-300/18 text-emerald-100' : 'border-cyan-300/28 bg-slate-950'}`} aria-hidden="true" />
            <DeliveryStepCard step={step} index={index} active={activeId === step.id || (!activeId && index === 2)} completed={index < activeIndex} reduceMotion={reduceMotion} onActive={onActive} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustPill({ item, index, reduceMotion }: { item: TrustItem; index: number; reduceMotion: boolean }) {
  const Icon = item.icon;
  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.36, delay: 1.05 + index * 0.06 }} className="flex items-center gap-2 rounded-2xl border border-cyan-300/16 bg-[rgba(4,13,28,0.70)] px-3 py-3 text-sm font-semibold text-slate-200">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-300/8 text-cyan-100"><Icon className="h-4 w-4" /></span>
      {item.label}
    </motion.div>
  );
}

function TrustRow({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {trustItems.map((item, index) => <TrustPill key={item.label} item={item} index={index} reduceMotion={reduceMotion} />)}
    </div>
  );
}

function TimelinePanel({ activeId, reduceMotion, onActive }: { activeId: string | null; reduceMotion: boolean; onActive: (id: string | null) => void }) {
  const activeIndex = getStepIndex(activeId);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.62, delay: 0.18, ease: transitionEase }}
      className="relative mt-12 overflow-hidden rounded-[32px] border border-cyan-300/22 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.08),transparent_40%),rgba(3,10,24,0.78)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(120,220,255,0.06),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-[18px] sm:p-6 lg:min-h-[660px] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-x-[18%] top-[22%] h-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <TimelineLine activeIndex={activeIndex} reduceMotion={reduceMotion} />
      <div className="relative z-10 hidden gap-5 lg:grid lg:grid-cols-6 xl:gap-6">
        {deliverySteps.map((step, index) => (
          <div key={step.id} className={index % 2 === 0 ? 'pt-0' : 'pt-24'}>
            <DeliveryStepCard step={step} index={index} active={activeId === step.id || (!activeId && index === 2)} completed={index < activeIndex} reduceMotion={reduceMotion} onActive={onActive} />
          </div>
        ))}
      </div>
      <MobileTimeline activeId={activeId} reduceMotion={reduceMotion} onActive={onActive} />
      <TrustRow reduceMotion={reduceMotion} />
    </motion.div>
  );
}

export function DeliveryTimeline() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | null>('build');

  return (
    <section className="delivery-timeline-section homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="delivery-timeline-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(0,145,255,0.12),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(0,220,255,0.05),transparent_28%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020711] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020711] to-transparent" />

      <div className="section-shell relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="section-heading max-w-[850px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> DELIVERY PROCESS</div>
          <h2 id="delivery-timeline-title" className="text-[clamp(2.15rem,5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">How your system gets shipped.</h2>
          <p className="mt-5 max-w-[760px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Clear scope, clean build, tested handover.</p>
        </motion.div>

        <TimelinePanel activeId={activeId} reduceMotion={reduceMotion} onActive={setActiveId} />

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.3, ease: transitionEase }} className="mt-6 flex flex-col gap-4 rounded-3xl border border-cyan-200/14 bg-slate-950/44 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Ready to ship a cleaner system?</h3>
            <p className="mt-1 max-w-[760px] text-sm leading-relaxed text-slate-300">Start with the workflow that is costing you the most time.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0ea5ff,#1d7dff)] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(14,165,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
              Request a Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/work" className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-cyan-300/28 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">View Work</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
