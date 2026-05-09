'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  Globe2,
  Mail,
  MessageSquare,
  Quote,
  RadioTower,
  ScanLine,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type VisualState = 'inputs' | 'intake' | 'qualification' | 'owner' | 'reminder' | 'quote' | 'dashboard' | 'control';

type StoryStep = {
  id: string;
  step: number;
  title: string;
  microcopy: string;
  state: string;
  visualState: VisualState;
  visualLabels: string[];
  icon: LucideIcon;
};

const systemStorySteps: StoryStep[] = [
  {
    id: 'enquiry-arrives',
    step: 1,
    title: 'Enquiry arrives',
    microcopy: 'Requests can come from anywhere.',
    state: 'Scattered manual inputs',
    visualState: 'inputs',
    visualLabels: ['Website form', 'WhatsApp', 'Email'],
    icon: RadioTower,
  },
  {
    id: 'system-captures',
    step: 2,
    title: 'System captures it',
    microcopy: 'Details are collected before they disappear.',
    state: 'Central intake activates',
    visualState: 'intake',
    visualLabels: ['New request', 'Captured', 'Details saved'],
    icon: Database,
  },
  {
    id: 'lead-qualified',
    step: 3,
    title: 'Lead gets qualified',
    microcopy: 'The system sorts what matters.',
    state: 'Qualification layer',
    visualState: 'qualification',
    visualLabels: ['Service', 'Urgency', 'Timeline'],
    icon: ScanLine,
  },
  {
    id: 'owner-assigned',
    step: 4,
    title: 'Owner gets assigned',
    microcopy: 'Everyone knows who is responsible.',
    state: 'Routing and accountability',
    visualState: 'owner',
    visualLabels: ['Assigned', 'Owner ready', 'Next action'],
    icon: UserCheck,
  },
  {
    id: 'follow-up-scheduled',
    step: 5,
    title: 'Follow-up is scheduled',
    microcopy: 'Nothing relies on memory.',
    state: 'Reminder automation',
    visualState: 'reminder',
    visualLabels: ['Scheduled', 'Reminder active', 'No memory gap'],
    icon: CalendarClock,
  },
  {
    id: 'quote-triggered',
    step: 6,
    title: 'Quote or next step triggers',
    microcopy: 'The next action moves faster.',
    state: 'Action generation',
    visualState: 'quote',
    visualLabels: ['Quote ready', 'Approval', 'Next step'],
    icon: FileText,
  },
  {
    id: 'dashboard-updates',
    step: 7,
    title: 'Dashboard updates',
    microcopy: 'Status becomes visible.',
    state: 'Visibility',
    visualState: 'dashboard',
    visualLabels: ['New enquiries', 'Assigned', 'Visible'],
    icon: Gauge,
  },
  {
    id: 'owner-control',
    step: 8,
    title: 'Owner gets control',
    microcopy: 'You see what is moving, stuck, or ready.',
    state: 'Final operating layer',
    visualState: 'control',
    visualLabels: ['Moving', 'Stuck', 'Ready'],
    icon: ShieldCheck,
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function visibleFor(activeStep: number, from: number, reduceMotion: boolean) {
  return activeStep + 1 >= from || reduceMotion;
}

function StoryStepList({ activeIndex, onStepClick }: { activeIndex: number; onStepClick: (index: number) => void }) {
  return (
    <nav aria-label="System story steps" className="relative rounded-[30px] border border-cyan-200/14 bg-slate-950/46 p-3 shadow-[0_18px_54px_rgba(0,0,0,0.30)] backdrop-blur-md">
      <div className="absolute bottom-6 left-[28px] top-6 w-px bg-cyan-200/12" aria-hidden="true" />
      <motion.div
        className="absolute left-[28px] top-6 w-px bg-gradient-to-b from-cyan-200 via-[#38dfff] to-cyan-500/20 shadow-[0_0_18px_rgba(56,223,255,0.34)]"
        animate={{ height: `${Math.max(8, (activeIndex / (systemStorySteps.length - 1)) * 88)}%` }}
        transition={{ duration: 0.35, ease: transitionEase }}
        aria-hidden="true"
      />
      <ol className="relative space-y-2">
        {systemStorySteps.map((step, index) => {
          const Icon = step.icon;
          const active = index === activeIndex;
          const complete = index < activeIndex;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onStepClick(index)}
                aria-current={active ? 'step' : undefined}
                className={`group relative grid w-full grid-cols-[34px_1fr] gap-3 rounded-2xl border px-3 py-3 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${
                  active
                    ? 'border-cyan-200/42 bg-cyan-400/10 shadow-[0_0_24px_rgba(56,223,255,0.12)]'
                    : complete
                      ? 'border-cyan-300/14 bg-cyan-400/[0.045]'
                      : 'border-white/[0.06] bg-white/[0.018] opacity-72 hover:opacity-100'
                }`}
              >
                <span className={`relative z-10 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border text-[0.72rem] font-semibold ${active ? 'border-cyan-200/58 bg-cyan-400/16 text-cyan-50 shadow-[0_0_18px_rgba(56,223,255,0.24)]' : complete ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100' : 'border-slate-500/24 bg-slate-950/70 text-slate-500'}`}>
                  {complete ? <Check className="h-3.5 w-3.5" /> : String(step.step).padStart(2, '0')}
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <Icon className={`h-3.5 w-3.5 ${active ? 'text-cyan-100' : complete ? 'text-cyan-300/80' : 'text-slate-500'}`} />
                    <span className={`text-sm font-semibold ${active ? 'text-white' : complete ? 'text-cyan-100/82' : 'text-slate-400'}`}>{step.title}</span>
                  </span>
                  <span className={`mt-1 block text-xs leading-relaxed ${active ? 'text-slate-200' : 'text-slate-500'}`}>{step.microcopy}</span>
                  <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[0.56rem] font-semibold uppercase tracking-[0.12em] ${active ? 'border-cyan-300/34 bg-cyan-400/10 text-cyan-100' : complete ? 'border-cyan-300/20 bg-cyan-400/7 text-cyan-200/70' : 'border-slate-500/18 bg-slate-900/50 text-slate-500'}`}>{complete ? 'Completed' : active ? step.state : 'Upcoming'}</span>
                </span>
                {active ? <span className="pointer-events-none absolute right-[-42px] top-1/2 hidden h-px w-10 bg-gradient-to-r from-cyan-300/70 to-transparent lg:block" /> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function PanelCard({ children, className = '', active = true, amber = false }: { children: React.ReactNode; className?: string; active?: boolean; amber?: boolean }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.985 }}
      transition={{ duration: 0.45, ease: transitionEase }}
      className={`absolute rounded-2xl border bg-[rgba(4,13,28,0.86)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-md ${amber ? 'border-amber-300/24' : 'border-cyan-300/24'} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function InputCard({ label, icon: Icon, className, activeStep, index }: { label: string; icon: LucideIcon; className: string; activeStep: number; index: number }) {
  const captured = activeStep >= 1;
  return (
    <PanelCard className={`w-[168px] ${className}`} amber={!captured} active>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index, duration: 0.35 }} className="flex items-center gap-2">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${captured ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100' : 'border-amber-300/28 bg-amber-400/10 text-amber-100'}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">{label}</span>
          <span className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.1em] ${captured ? 'border-cyan-300/26 bg-cyan-400/8 text-cyan-100' : 'border-amber-300/28 bg-amber-400/10 text-amber-100'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${captured ? 'bg-cyan-200' : 'bg-amber-300 story-amber-pulse'}`} /> {captured ? 'Connected' : 'Manual'}
          </span>
        </span>
      </motion.div>
    </PanelCard>
  );
}

function StoryConnectionLines({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const showIntake = activeStep >= 1;
  const showOwner = activeStep >= 3;
  const showReminder = activeStep >= 4;
  const showQuote = activeStep >= 5;
  const showDashboard = activeStep >= 6;
  const paths = [
    { key: 'input-a', d: 'M132 108 C238 112, 300 168, 384 224', visible: showIntake, amber: activeStep === 0 },
    { key: 'input-b', d: 'M124 292 C230 286, 300 252, 384 224', visible: showIntake, amber: activeStep === 0 },
    { key: 'input-c', d: 'M238 418 C302 374, 344 300, 384 224', visible: showIntake, amber: activeStep === 0 },
    { key: 'owner', d: 'M458 224 C540 200, 596 188, 674 188', visible: showOwner, amber: false },
    { key: 'reminder', d: 'M674 220 C642 285, 590 336, 520 372', visible: showReminder, amber: false },
    { key: 'quote', d: 'M520 372 C598 388, 664 402, 724 434', visible: showQuote, amber: false },
    { key: 'dashboard', d: 'M724 434 C676 492, 560 518, 430 502', visible: showDashboard, amber: false },
  ];

  return (
    <svg viewBox="0 0 860 580" className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
      <defs>
        <filter id="story-route-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {paths.map((path, index) => (
        <motion.path
          key={path.key}
          d={path.d}
          fill="none"
          stroke={path.amber ? 'rgba(245,165,36,0.42)' : 'rgba(56,223,255,0.70)'}
          strokeWidth={path.amber ? 1.6 : 2.2}
          strokeDasharray={path.amber ? '7 10' : undefined}
          strokeLinecap="round"
          filter={path.amber ? undefined : 'url(#story-route-glow)'}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: path.visible || path.amber ? 1 : 0, opacity: path.visible || path.amber ? (path.amber ? 0.65 : 0.88) : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : index * 0.04, ease: transitionEase }}
        />
      ))}
      {!reduceMotion && activeStep >= 1 ? (
        <circle r="3" fill="rgba(190,245,255,0.96)" className="story-route-particle">
          <animateMotion dur="6.4s" repeatCount="indefinite" path="M132 108 C238 112, 300 168, 384 224 C540 200, 596 188, 674 188 C642 285, 590 336, 520 372 C598 388, 664 402, 724 434" />
        </circle>
      ) : null}
    </svg>
  );
}

function IntakeCard({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 2, reduceMotion);
  return (
    <PanelCard className="left-[39%] top-[29%] z-30 w-[210px]" active={active}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/82">New request</p>
          <p className="mt-1 text-base font-semibold text-white">Central intake</p>
        </div>
        <Database className="h-5 w-5 text-cyan-100" />
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-2 rounded-full bg-slate-700/80" />
        <span className="block h-2 w-4/5 rounded-full bg-slate-700/80" />
        <motion.span animate={active ? { width: '92%' } : { width: '40%' }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="block h-2 rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#38dfff]" />
      </div>
      <motion.span initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }} className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100"><CheckCircle2 className="h-3.5 w-3.5" /> Captured</motion.span>
    </PanelCard>
  );
}

function LeadQualificationCard({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 3, reduceMotion);
  const tags = ['Service', 'Urgency', 'Location', 'Budget', 'Timeline'];
  return (
    <PanelCard className="left-[31%] top-[14%] z-40 w-[290px]" active={active}>
      <div className="relative overflow-hidden rounded-xl border border-cyan-300/14 bg-slate-950/42 p-3">
        {!reduceMotion && active ? <span className="story-scan-line absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(56,223,255,0.16),transparent)]" /> : null}
        <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/82">Lead profile</p>
        <p className="mt-1 text-base font-semibold text-white">Qualified request</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <motion.span key={tag} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 6 }} transition={{ duration: 0.25, delay: reduceMotion ? 0 : index * 0.08 }} className="rounded-full border border-cyan-300/28 bg-cyan-400/10 px-2 py-1 text-[0.58rem] text-cyan-100">{tag}</motion.span>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}

function OwnerAssignmentCard({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 4, reduceMotion);
  return (
    <PanelCard className="right-[8%] top-[20%] z-35 w-[205px]" active={active}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-100"><UserCheck className="h-5 w-5" /></span>
        <div>
          <p className="text-sm font-semibold text-white">Assigned to team</p>
          <p className="text-[0.66rem] text-slate-400">Owner: ready</p>
        </div>
      </div>
      <motion.span initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }} className="mt-3 inline-flex rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100">Assigned</motion.span>
    </PanelCard>
  );
}

function ReminderCard({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 5, reduceMotion);
  return (
    <PanelCard className="left-[49%] top-[59%] z-35 w-[218px]" active={active}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Follow-up scheduled</p>
          <p className="mt-1 text-[0.66rem] text-slate-400">Tomorrow · 09:00</p>
        </div>
        <motion.span animate={active && !reduceMotion ? { scale: [1, 1.12, 1] } : { scale: 1 }} transition={{ duration: 0.7 }} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/28 bg-cyan-400/10 text-cyan-100"><BellRing className="h-5 w-5" /></motion.span>
      </div>
      <span className="mt-3 inline-flex rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100">Reminder active</span>
    </PanelCard>
  );
}

function QuoteActionCard({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 6, reduceMotion);
  return (
    <PanelCard className="right-[7%] top-[65%] z-35 w-[225px]" active={active}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Quote ready</p>
          <p className="mt-1 text-[0.66rem] text-slate-400">Next step sent</p>
        </div>
        <Quote className="h-5 w-5 text-cyan-100" />
      </div>
      <div className="mt-3 space-y-1.5">
        <motion.span animate={active ? { width: '100%' } : { width: '55%' }} transition={{ duration: reduceMotion ? 0 : 0.5 }} className="block h-2 rounded-full bg-slate-600/70" />
        <motion.span animate={active ? { width: '82%' } : { width: '42%' }} transition={{ duration: reduceMotion ? 0 : 0.6 }} className="block h-2 rounded-full bg-slate-600/70" />
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100"><ClipboardCheck className="h-3.5 w-3.5" /> Approval needed</span>
    </PanelCard>
  );
}

function DashboardPreview({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 7, reduceMotion);
  const metrics = [
    ['New enquiries', '12'],
    ['Assigned', '9'],
    ['Follow-ups due', '3'],
    ['Status visible', '100%'],
  ];
  return (
    <motion.div animate={{ opacity: active ? 1 : 0, y: active ? 0 : 18 }} transition={{ duration: 0.5, ease: transitionEase }} className="absolute bottom-[8%] left-[9%] z-40 w-[360px] rounded-3xl border border-cyan-300/24 bg-[rgba(3,10,24,0.90)] p-4 shadow-[0_22px_58px_rgba(0,0,0,0.42),0_0_32px_rgba(56,223,255,0.10)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">Visibility dashboard</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-1 text-[0.58rem] uppercase tracking-[0.1em] text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-[#33e68a]" /> Visible</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {metrics.map(([label, value], index) => (
          <div key={label} className="rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
            <p className="text-[0.58rem] uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <motion.p initial={reduceMotion ? false : { opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.07 }} className="mt-1 text-lg font-semibold text-cyan-100">{value}</motion.p>
          </div>
        ))}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800/90"><motion.div animate={active ? { width: '100%' } : { width: '12%' }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: transitionEase }} className="h-full rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#38dfff]" /></div>
    </motion.div>
  );
}

function CommandCenterSummary({ activeStep, reduceMotion }: { activeStep: number; reduceMotion: boolean }) {
  const active = visibleFor(activeStep, 8, reduceMotion);
  return (
    <motion.div animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.98 }} transition={{ duration: 0.55, ease: transitionEase }} className="absolute inset-8 z-50 rounded-[28px] border border-cyan-200/28 bg-[radial-gradient(circle_at_50%_26%,rgba(56,223,255,0.12),transparent_32%),rgba(3,10,24,0.92)] p-5 shadow-[0_0_52px_rgba(56,223,255,0.14),inset_0_0_80px_rgba(0,160,255,0.06)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">Command center</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Operating layer live</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#33e68a]/34 bg-[#33e68a]/10 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#bfffd9]"><CheckCircle2 className="h-3.5 w-3.5" /> Control restored</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          ['Moving', '14', 'Requests in flow'],
          ['Stuck', '2', 'Needs owner'],
          ['Ready', '6', 'Next actions'],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-2xl border border-cyan-300/18 bg-slate-950/52 p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.13em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-cyan-100">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-cyan-300/16 bg-white/[0.025] p-4">
        <div className="grid grid-cols-[0.8fr_1.2fr_auto] items-center gap-3 border-b border-white/8 pb-3 text-xs text-slate-400"><span>Route status</span><span>Next action</span><span>Owner</span></div>
        {['Website enquiry captured', 'Quote ready for review', 'Follow-up due tomorrow'].map((row, index) => (
          <motion.div key={row} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.08 }} className="grid grid-cols-[0.8fr_1.2fr_auto] items-center gap-3 border-b border-white/6 py-3 text-sm last:border-b-0">
            <span className="text-cyan-100">{index === 0 ? 'Captured' : index === 1 ? 'Ready' : 'Scheduled'}</span>
            <span className="text-slate-200">{row}</span>
            <span className="rounded-full border border-cyan-300/24 bg-cyan-400/8 px-2 py-1 text-[0.62rem] text-cyan-100">Owner</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StickySystemVisual({ activeIndex, reduceMotion }: { activeIndex: number; reduceMotion: boolean }) {
  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[620px] max-h-[720px] overflow-hidden rounded-[34px] border border-[rgba(0,210,255,0.24)] bg-[radial-gradient(circle_at_50%_45%,rgba(0,180,255,0.10),transparent_36%),rgba(3,10,24,0.78)] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_0_80px_rgba(0,160,255,0.05)] backdrop-blur-[18px]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,220,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,220,255,0.72)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative z-20 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">Live workflow view</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{systemStorySteps[activeIndex].title}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-cyan-100">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 story-cyan-pulse" /> {systemStorySteps[activeIndex].visualState}
        </span>
      </div>

      <StoryConnectionLines activeStep={activeIndex} reduceMotion={reduceMotion} />
      <InputCard label="Website form" icon={Globe2} className="left-[8%] top-[18%] -rotate-2" activeStep={activeIndex} index={0} />
      <InputCard label="WhatsApp" icon={MessageSquare} className="left-[7%] top-[45%] rotate-1" activeStep={activeIndex} index={1} />
      <InputCard label="Email" icon={Mail} className="left-[18%] top-[69%] -rotate-1" activeStep={activeIndex} index={2} />
      <IntakeCard activeStep={activeIndex} reduceMotion={reduceMotion} />
      <LeadQualificationCard activeStep={activeIndex} reduceMotion={reduceMotion} />
      <OwnerAssignmentCard activeStep={activeIndex} reduceMotion={reduceMotion} />
      <ReminderCard activeStep={activeIndex} reduceMotion={reduceMotion} />
      <QuoteActionCard activeStep={activeIndex} reduceMotion={reduceMotion} />
      <DashboardPreview activeStep={activeIndex} reduceMotion={reduceMotion} />
      <CommandCenterSummary activeStep={activeIndex} reduceMotion={reduceMotion} />
    </div>
  );
}

function MobileMiniVisual({ index }: { index: number }) {
  const step = systemStorySteps[index];
  const Icon = step.icon;
  return (
    <div className="mt-4 rounded-2xl border border-cyan-300/16 bg-[rgba(3,10,24,0.76)] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/26 bg-cyan-400/10 text-cyan-100"><Icon className="h-5 w-5" /></span>
        <span className="rounded-full border border-cyan-300/28 bg-cyan-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100">{step.state}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {step.visualLabels.map((label, item) => (
          <div key={label} className={`min-h-14 rounded-xl border p-2 ${item <= Math.min(2, Math.floor(index / 2)) ? 'border-cyan-300/24 bg-cyan-400/10' : 'border-amber-300/18 bg-amber-400/8'}`}>
            <span className="block text-[0.62rem] font-semibold leading-tight text-slate-100">{label}</span>
            <span className={`mt-2 block h-1.5 rounded-full ${item <= Math.min(2, Math.floor(index / 2)) ? 'bg-cyan-300/42' : 'bg-amber-300/32'}`} />
          </div>
        ))}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800/90"><div className="h-full rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#38dfff]" style={{ width: `${((index + 1) / systemStorySteps.length) * 100}%` }} /></div>
    </div>
  );
}

function MobileStoryStepCard({ step, index }: { step: StoryStep; index: number }) {
  return (
    <article className="rounded-[26px] border border-cyan-300/16 bg-[rgba(4,13,28,0.80)] p-4 shadow-[0_16px_44px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-sm font-semibold text-cyan-100">{String(step.step).padStart(2, '0')}</span>
        <div>
          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.microcopy}</p>
        </div>
      </div>
      <MobileMiniVisual index={index} />
    </article>
  );
}

export function StickySystemStory() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const markers = markerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!markers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.stepIndex ?? 0);
        setActiveIndex(index);
      },
      { root: null, rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.2, 0.5, 0.8, 1] },
    );

    markers.forEach((marker) => observer.observe(marker));
    return () => observer.disconnect();
  }, []);

  const handleStepClick = useCallback((index: number) => {
    markerRefs.current[index]?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    setActiveIndex(index);
  }, [reduceMotion]);

  const activeStep = useMemo(() => systemStorySteps[activeIndex], [activeIndex]);

  return (
    <section className="sticky-system-story homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-36" aria-labelledby="sticky-system-story-title">
      <div className="pointer-events-none absolute inset-0 border-t border-cyan-200/[0.07] bg-[radial-gradient(circle_at_70%_28%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_30%_62%,rgba(0,220,255,0.06),transparent_30%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[820px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">SYSTEM STORY</p>
          <h2 id="sticky-system-story-title" className="mt-4 text-[clamp(2.15rem,5.2vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">Watch the system take over.</h2>
          <p className="mt-5 max-w-[720px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">From first enquiry to tracked outcome, every step becomes visible.</p>
        </motion.div>

        <div className="relative mt-14 hidden min-h-[180vh] lg:block">
          <div className="sticky top-24 z-20 grid grid-cols-[0.38fr_0.62fr] items-start gap-14">
            <div>
              <div className="mb-5 rounded-3xl border border-cyan-200/14 bg-slate-950/42 p-5 backdrop-blur-md" aria-live="polite">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-200">Active state</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{activeStep.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeStep.microcopy}</p>
              </div>
              <StoryStepList activeIndex={activeIndex} onStepClick={handleStepClick} />
            </div>
            <StickySystemVisual activeIndex={activeIndex} reduceMotion={Boolean(reduceMotion)} />
          </div>

          <div className="absolute inset-x-0 top-0 z-0" aria-hidden="true">
            {systemStorySteps.map((step, index) => (
              <div
                key={step.id}
                ref={(element) => { markerRefs.current[index] = element; }}
                data-step-index={index}
                className="absolute left-0 h-[34vh] w-px"
                style={{ top: `${index * 20}vh` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4 lg:hidden">
          <div className="flex gap-1.5 overflow-x-auto pb-1" aria-label="Story progress">
            {systemStorySteps.map((step) => <span key={step.id} className="h-1.5 min-w-10 rounded-full bg-cyan-300/28" />)}
          </div>
          {systemStorySteps.map((step, index) => <MobileStoryStepCard key={step.id} step={step} index={index} />)}
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: transitionEase }} className="mt-10 rounded-[32px] border border-cyan-300/18 bg-[rgba(3,10,24,0.72)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-md md:flex md:items-center md:justify-between md:gap-6 md:p-8 lg:mt-16">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">Operating layer live</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Want this kind of visibility in your business?</h3>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
            <Link href="/quote" className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0ea5ff,#1d7dff)] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(14,165,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
              Request a Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/work" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/8 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/58 hover:bg-cyan-300/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
              View Work
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .story-amber-pulse,
          .story-cyan-pulse,
          .story-route-particle,
          .story-scan-line {
            animation: none !important;
          }
        }
        .story-amber-pulse {
          animation: storyAmberPulse 4.8s ease-in-out infinite;
        }
        .story-cyan-pulse {
          animation: storyCyanPulse 4.6s ease-in-out infinite;
        }
        .story-route-particle {
          filter: drop-shadow(0 0 8px rgba(56, 223, 255, 0.82));
          opacity: 0.82;
        }
        .story-scan-line {
          transform: translateX(-120%);
          animation: storyScan 1.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes storyAmberPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.22); }
        }
        @keyframes storyCyanPulse {
          0%, 100% { opacity: 0.68; box-shadow: 0 0 0 rgba(56, 223, 255, 0); }
          50% { opacity: 1; box-shadow: 0 0 16px rgba(56, 223, 255, 0.28); }
        }
        @keyframes storyScan {
          from { transform: translateX(-120%); opacity: 0; }
          20% { opacity: 1; }
          to { transform: translateX(360%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
