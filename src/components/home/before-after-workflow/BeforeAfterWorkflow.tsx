'use client';

import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  Eye,
  FolderOpen,
  Gauge,
  RadioTower,
  Route,
  ScanLine,
  ShieldCheck,
  UserCheck,
  UserX,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type WorkflowMode = 'both' | 'manual' | 'systemized';
type MobileMode = 'manual' | 'systemized';

type WorkflowTransform = {
  id: string;
  before: string;
  after: string;
  beforeDetail: string;
  afterDetail: string;
  capability: string;
  beforeStatus: string;
  icon: LucideIcon;
  afterIcon: LucideIcon;
  critical?: boolean;
  beforePosition: { left: string; top: string; rotate: string };
  afterPosition: { left: string; top: string };
};

type RoutePath = {
  id: string;
  from: string;
  to: string;
  d: string;
};

const workflowTransforms: WorkflowTransform[] = [
  {
    id: 'leads',
    before: 'Leads wait',
    after: 'Captured',
    beforeDetail: 'New enquiries sit until someone notices.',
    afterDetail: 'The request is captured and acknowledged quickly.',
    capability: 'Enquiries are collected from the right channel and acknowledged fast.',
    beforeStatus: 'waiting',
    icon: Clock3,
    afterIcon: RadioTower,
    critical: true,
    beforePosition: { left: '7%', top: '18%', rotate: '-2deg' },
    afterPosition: { left: '9%', top: '18%' },
  },
  {
    id: 'copy',
    before: 'Data copied by hand',
    after: 'Synced',
    beforeDetail: 'People retype the same details into different tools.',
    afterDetail: 'Tools sync in the background without manual copy and paste.',
    capability: 'Key fields move between tools without repeated admin.',
    beforeStatus: 'manual',
    icon: Copy,
    afterIcon: Database,
    beforePosition: { left: '38%', top: '13%', rotate: '1.8deg' },
    afterPosition: { left: '42%', top: '18%' },
  },
  {
    id: 'owner',
    before: 'No single owner',
    after: 'Assigned',
    beforeDetail: 'Tasks wait because nobody is clearly responsible.',
    afterDetail: 'Work is routed to the right owner or process.',
    capability: 'Ownership is assigned before the work disappears into inboxes.',
    beforeStatus: 'unassigned',
    icon: UserX,
    afterIcon: UserCheck,
    beforePosition: { left: '22%', top: '41%', rotate: '2.2deg' },
    afterPosition: { left: '69%', top: '18%' },
  },
  {
    id: 'followups',
    before: 'Follow-ups forgotten',
    after: 'Reminded',
    beforeDetail: 'Nobody gets prompted before opportunities go cold.',
    afterDetail: 'Follow-ups trigger before leads and tasks stall.',
    capability: 'Reminder triggers keep the next action moving.',
    beforeStatus: 'forgotten',
    icon: BellRing,
    afterIcon: BellRing,
    critical: true,
    beforePosition: { left: '61%', top: '38%', rotate: '-1.4deg' },
    afterPosition: { left: '9%', top: '48%' },
  },
  {
    id: 'files',
    before: 'Files scattered',
    after: 'Stored',
    beforeDetail: 'Documents live in different folders, chats, and inboxes.',
    afterDetail: 'Files and context are stored against the right job.',
    capability: 'Documents stay attached to the work they belong to.',
    beforeStatus: 'scattered',
    icon: FolderOpen,
    afterIcon: FolderOpen,
    beforePosition: { left: '8%', top: '67%', rotate: '1.2deg' },
    afterPosition: { left: '42%', top: '48%' },
  },
  {
    id: 'status',
    before: 'Status unclear',
    after: 'Tracked',
    beforeDetail: 'Nobody knows what is moving, waiting, or blocked.',
    afterDetail: 'Status stays visible from request to result.',
    capability: 'Every important step has a visible status and next action.',
    beforeStatus: 'unknown',
    icon: Eye,
    afterIcon: Gauge,
    beforePosition: { left: '43%', top: '67%', rotate: '-2.1deg' },
    afterPosition: { left: '69%', top: '48%' },
  },
  {
    id: 'reports',
    before: 'Reports missing',
    after: 'Reported',
    beforeDetail: 'Problems repeat because there is no clear performance view.',
    afterDetail: 'Dashboards show status, bottlenecks, and next actions.',
    capability: 'Progress and bottlenecks become visible before they repeat.',
    beforeStatus: 'missing',
    icon: BarChart3,
    afterIcon: BarChart3,
    beforePosition: { left: '70%', top: '70%', rotate: '1.5deg' },
    afterPosition: { left: '42%', top: '77%' },
  },
];

const beforePaths: RoutePath[] = [
  { id: 'before-1', from: 'leads', to: 'owner', d: 'M72 90 C122 84, 148 126, 188 176' },
  { id: 'before-2', from: 'copy', to: 'owner', d: 'M244 72 C230 106, 206 136, 188 176' },
  { id: 'before-3', from: 'owner', to: 'followups', d: 'M188 176 C250 156, 310 170, 360 165' },
  { id: 'before-4', from: 'owner', to: 'files', d: 'M188 176 C142 210, 112 250, 76 286' },
  { id: 'before-5', from: 'files', to: 'status', d: 'M76 286 C142 310, 206 294, 252 286' },
  { id: 'before-6', from: 'status', to: 'reports', d: 'M252 286 C318 278, 374 300, 410 306' },
];

const afterPaths: RoutePath[] = [
  { id: 'after-1', from: 'leads', to: 'copy', d: 'M84 90 C150 82, 206 82, 256 90' },
  { id: 'after-2', from: 'copy', to: 'owner', d: 'M256 90 C308 88, 360 88, 410 90' },
  { id: 'after-3', from: 'leads', to: 'followups', d: 'M84 90 C76 142, 76 184, 84 220' },
  { id: 'after-4', from: 'copy', to: 'files', d: 'M256 90 C250 144, 250 184, 256 220' },
  { id: 'after-5', from: 'owner', to: 'status', d: 'M410 90 C414 142, 414 184, 410 220' },
  { id: 'after-6', from: 'files', to: 'reports', d: 'M256 220 C252 265, 252 302, 256 334' },
  { id: 'after-7', from: 'status', to: 'reports', d: 'M410 220 C370 280, 316 318, 256 334' },
];

const systemActions = ['Capture', 'Route', 'Track', 'Remind', 'Report'];

const comparisons = [
  {
    before: 'Leads wait hours.',
    after: 'Instant acknowledgement and owner routing.',
  },
  {
    before: 'Data gets copied manually.',
    after: 'Tools sync in the background.',
  },
  {
    before: 'No one sees what is stuck.',
    after: 'Dashboards show status and next actions.',
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function modeAllows(mode: WorkflowMode, tone: 'manual' | 'systemized') {
  return mode === 'both' || mode === tone;
}

function ManualWorkflowCard({ item, active, dimmed, systemized, delay, onActivate, onClear }: {
  item: WorkflowTransform;
  active: boolean;
  dimmed: boolean;
  systemized: boolean;
  delay: number;
  onActivate: () => void;
  onClear: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      aria-label={`Before: ${item.before}. ${item.beforeDetail} After: ${item.after}. ${item.afterDetail}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.45, delay, ease: transitionEase }}
      style={{ left: item.beforePosition.left, top: item.beforePosition.top, rotate: item.beforePosition.rotate }}
      onMouseEnter={onActivate}
      onMouseLeave={onClear}
      onFocus={onActivate}
      onBlur={onClear}
      className={`before-drift absolute z-30 w-[min(15vw,174px)] rounded-2xl border bg-[rgba(8,11,20,0.82)] px-3 py-3 text-left shadow-[0_16px_34px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 ${active ? 'border-amber-200/55 shadow-[0_0_28px_rgba(245,165,36,0.18),0_16px_34px_rgba(0,0,0,0.38)]' : 'border-[rgba(245,165,36,0.20)]'} ${dimmed ? 'opacity-35' : systemized ? 'opacity-48' : 'opacity-95'}`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${item.critical ? 'border-red-300/28 bg-red-500/10 text-red-200' : 'border-amber-300/22 bg-amber-400/10 text-amber-200'}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.13em] ${item.critical ? 'border-red-300/28 bg-red-500/10 text-red-100' : 'border-amber-300/28 bg-amber-400/10 text-amber-100'}`}>{item.beforeStatus}</span>
      </span>
      <span className="mt-3 block text-[0.82rem] font-semibold leading-tight text-slate-100">{item.before}</span>
      <span className="mt-1.5 block text-[0.67rem] leading-snug text-slate-400">{item.beforeDetail}</span>
      <span className={`pointer-events-none absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full ${item.critical ? 'bg-[#ff5a5f] shadow-[0_0_16px_rgba(255,90,95,0.35)]' : 'bg-[#f5a524] shadow-[0_0_16px_rgba(245,165,36,0.30)]'} warning-pulse`} />
    </motion.button>
  );
}

function SystemizedWorkflowCard({ item, active, dimmed, activePanel, delay, onActivate, onClear }: {
  item: WorkflowTransform;
  active: boolean;
  dimmed: boolean;
  activePanel: boolean;
  delay: number;
  onActivate: () => void;
  onClear: () => void;
}) {
  const Icon = item.afterIcon;

  return (
    <motion.button
      type="button"
      aria-label={`After: ${item.after}. ${item.afterDetail} Capability: ${item.capability}`}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={activePanel ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.2, y: 12, scale: 0.98 }}
      transition={{ duration: 0.46, delay, ease: transitionEase }}
      style={{ left: item.afterPosition.left, top: item.afterPosition.top }}
      onMouseEnter={onActivate}
      onMouseLeave={onClear}
      onFocus={onActivate}
      onBlur={onClear}
      className={`absolute z-30 w-[min(15.5vw,182px)] rounded-2xl border bg-[rgba(3,14,30,0.88)] px-3 py-3 text-left shadow-[0_18px_40px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${active ? 'border-cyan-100/70 shadow-[0_0_34px_rgba(0,220,255,0.24),0_18px_40px_rgba(0,0,0,0.38)]' : 'border-[rgba(0,220,255,0.32)]'} ${dimmed ? 'opacity-45' : ''}`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200/30 bg-cyan-400/10 text-[#63e8ff]">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-cyan-100">live</span>
      </span>
      <span className="mt-3 block text-[0.85rem] font-semibold leading-tight text-white">{item.after}</span>
      <span className="mt-1.5 block text-[0.67rem] leading-snug text-slate-300">{item.afterDetail}</span>
    </motion.button>
  );
}

function WorkflowStatePanel({ tone, activeMode, hoveredId, systemActive, reduceMotion, onHover }: {
  tone: 'manual' | 'systemized';
  activeMode: WorkflowMode;
  hoveredId: string | null;
  systemActive: boolean;
  reduceMotion: boolean;
  onHover: (id: string | null) => void;
}) {
  const isManual = tone === 'manual';
  const active = modeAllows(activeMode, tone);

  return (
    <div className={`relative min-h-[486px] overflow-hidden rounded-[28px] border p-5 transition duration-500 ${isManual ? 'border-amber-300/16 bg-[linear-gradient(160deg,rgba(18,10,12,0.70),rgba(5,12,24,0.88))]' : 'border-cyan-300/22 bg-[linear-gradient(160deg,rgba(4,22,44,0.72),rgba(5,12,24,0.90))]'} ${active ? 'opacity-100' : 'opacity-42'}`}>
      <div className={`pointer-events-none absolute inset-0 ${isManual ? 'bg-[radial-gradient(circle_at_24%_20%,rgba(245,165,36,0.10),transparent_28%)]' : 'bg-[radial-gradient(circle_at_70%_32%,rgba(0,220,255,0.12),transparent_32%)]'}`} />
      <div className="relative z-40 flex items-start justify-between gap-4">
        <div>
          <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.2em] ${isManual ? 'text-amber-200' : 'text-cyan-200'}`}>{isManual ? 'Before' : 'After'}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{isManual ? 'Manual workflow' : 'Operating layer'}</h3>
          <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-slate-300">{isManual ? 'Scattered tasks, delayed replies, copied data, and unclear ownership.' : 'Captured, assigned, tracked, reminded, stored, reported, and visible.'}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${isManual ? 'border-amber-300/22 bg-amber-400/10 text-amber-100' : 'border-cyan-300/32 bg-cyan-400/10 text-cyan-100'}`}>{isManual ? 'Risk detected' : 'Control visible'}</span>
      </div>

      <svg viewBox="0 0 480 390" className="absolute inset-x-0 bottom-3 z-10 h-[390px] w-full" aria-hidden="true">
        <defs>
          <filter id={`${tone}-route-glow`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {(isManual ? beforePaths : afterPaths).map((path, index) => {
          const highlighted = hoveredId ? path.from === hoveredId || path.to === hoveredId : false;
          if (isManual) {
            return <motion.path key={path.id} d={path.d} fill="none" stroke={highlighted ? 'rgba(255,184,77,0.82)' : 'rgba(245,165,36,0.34)'} strokeDasharray="7 10" strokeWidth={highlighted ? 2.3 : 1.45} strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: systemActive ? 0.28 : 0.9 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.9 + index * 0.06, ease: transitionEase }} />;
          }
          return <motion.path key={path.id} d={path.d} fill="none" stroke={highlighted ? 'rgba(190,245,255,0.98)' : 'rgba(56,223,255,0.72)'} strokeWidth={highlighted ? 3 : 2.1} strokeLinecap="round" filter={`url(#${tone}-route-glow)`} initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={systemActive ? { pathLength: 1, opacity: active ? 0.9 : 0.3 } : { pathLength: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.35 + index * 0.055, ease: transitionEase }} />;
        })}
        {!isManual && systemActive && !reduceMotion ? afterPaths.slice(0, 4).map((path, index) => (
          <circle key={`after-particle-${path.id}`} r="2.8" fill="rgba(190,245,255,0.96)" className="workflow-data-particle" style={{ animationDelay: `${index * 0.75}s` }}>
            <animateMotion dur="5.7s" repeatCount="indefinite" path={path.d} />
          </circle>
        )) : null}
      </svg>

      {workflowTransforms.map((item, index) => {
        const itemActive = hoveredId === item.id;
        const dimmed = Boolean(hoveredId && hoveredId !== item.id);
        return isManual ? (
          <ManualWorkflowCard key={item.id} item={item} active={itemActive} dimmed={dimmed} systemized={activeMode === 'systemized'} delay={0.4 + index * 0.055} onActivate={() => onHover(item.id)} onClear={() => onHover(null)} />
        ) : (
          <SystemizedWorkflowCard key={item.id} item={item} active={itemActive} dimmed={dimmed} activePanel={systemActive || reduceMotion} delay={reduceMotion ? 0 : 0.35 + index * 0.075} onActivate={() => onHover(item.id)} onClear={() => onHover(null)} />
        );
      })}
    </div>
  );
}

function TransformationBridge({ active, highlighted, reduceMotion, onHover }: { active: boolean; highlighted: boolean; reduceMotion: boolean; onHover: (hovering: boolean) => void }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 1.1, ease: transitionEase }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
      role="button"
      aria-label="Rapid Rise System Layer connects the gaps into one operating flow using capture, route, track, remind, and report steps."
      className={`relative flex min-h-[486px] flex-col items-center justify-between overflow-hidden rounded-[28px] border bg-[linear-gradient(180deg,rgba(5,20,42,0.78),rgba(3,10,24,0.92))] px-4 py-5 text-center shadow-[inset_0_0_70px_rgba(0,160,255,0.05),0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${active || highlighted ? 'border-cyan-200/42 shadow-[0_0_42px_rgba(0,220,255,0.16),inset_0_0_80px_rgba(0,160,255,0.08)]' : 'border-cyan-300/22'}`}
    >
      <div className="pointer-events-none absolute inset-x-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-200/50 to-transparent" />
      {active && !reduceMotion ? <div className="bridge-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(56,223,255,0.18),transparent)]" /> : null}
      <span className="rounded-full border border-cyan-300/28 bg-cyan-400/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">Manual input</span>
      <div className="relative z-10 flex flex-col items-center">
        <div className={`system-core relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-200/36 bg-[radial-gradient(circle,rgba(56,223,255,0.18),rgba(13,33,61,0.72)_58%,rgba(3,10,24,0.95))] ${active ? 'system-core-active' : ''}`}>
          <Route className="h-8 w-8 text-cyan-100" />
        </div>
        <p className="mt-4 text-sm font-semibold leading-tight text-white">Rapid Rise<br />System Layer</p>
        <p className="mt-2 max-w-[140px] text-[0.72rem] leading-relaxed text-slate-300">Connects the gaps into one operating flow.</p>
      </div>
      <div className="relative z-10 flex flex-col gap-1.5">
        {systemActions.map((action, index) => (
          <motion.span key={action} initial={reduceMotion ? false : { opacity: 0, x: -8 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0.45, x: 0 }} transition={{ duration: 0.32, delay: reduceMotion ? 0 : 0.2 + index * 0.055 }} className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-cyan-100">{action}</motion.span>
        ))}
      </div>
      <span className="rounded-full border border-cyan-300/28 bg-cyan-400/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">Controlled output</span>
    </motion.div>
  );
}

function MiniDashboardPreview({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const rows = [
    { label: 'New enquiries', value: '12' },
    { label: 'Assigned', value: '9' },
    { label: 'Follow-ups due', value: '3' },
    { label: 'Reports updated', value: '100%' },
  ];

  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.65 }} className="rounded-2xl border border-cyan-300/22 bg-slate-950/54 p-4 shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">Visibility dashboard</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200" /> Live</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {rows.map((row, index) => (
          <div key={row.label} className="rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
            <p className="text-[0.62rem] uppercase tracking-[0.1em] text-slate-500">{row.label}</p>
            <motion.p initial={reduceMotion ? false : { opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0.4 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.82 + index * 0.08 }} className="mt-1 text-lg font-semibold text-cyan-100">{row.value}</motion.p>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800/80">
        <motion.div initial={reduceMotion ? false : { width: '12%' }} animate={active ? { width: '100%' } : { width: '12%' }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.9, ease: transitionEase }} className="h-full rounded-full bg-gradient-to-r from-[#1d7dff] via-[#0ea5ff] to-[#38dfff]" />
      </div>
    </motion.div>
  );
}

function ComparisonRow({ before, after, active }: { before: string; after: string; active: boolean }) {
  return (
    <div className="grid items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm md:grid-cols-[1fr_auto_1.2fr]">
      <p className="text-amber-100/86"><span className="text-amber-300/90">Before:</span> {before}</p>
      <span className={`hidden h-7 w-7 items-center justify-center rounded-full border border-cyan-300/24 bg-cyan-400/10 text-cyan-100 transition md:inline-flex ${active ? 'shadow-[0_0_18px_rgba(56,223,255,0.16)]' : ''}`}><ArrowRight className="h-3.5 w-3.5" /></span>
      <p className="text-cyan-100/92"><span className="text-cyan-200">After:</span> {after}</p>
    </div>
  );
}

function MobileWorkflowToggle({ mode, onChange }: { mode: MobileMode; onChange: (mode: MobileMode) => void }) {
  return (
    <div className="grid min-h-[48px] grid-cols-2 rounded-2xl border border-cyan-200/16 bg-slate-950/56 p-1" role="tablist" aria-label="Workflow transformation view">
      {(['manual', 'systemized'] as const).map((item) => (
        <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => onChange(item)} className={`min-h-[44px] rounded-xl px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${mode === item ? 'bg-cyan-400/12 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(56,223,255,0.26)]' : 'text-slate-400'}`}>
          {item === 'manual' ? 'Manual' : 'Systemized'}
        </button>
      ))}
    </div>
  );
}

function MobileWorkflowCard({ item, mode }: { item: WorkflowTransform; mode: MobileMode }) {
  const isManual = mode === 'manual';
  const Icon = isManual ? item.icon : item.afterIcon;

  return (
    <div className={`rounded-2xl border p-4 ${isManual ? 'border-amber-300/18 bg-[rgba(8,11,20,0.82)]' : 'border-cyan-300/24 bg-[rgba(3,14,30,0.86)]'}`}>
      <div className="flex items-start gap-3">
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${isManual ? 'border-amber-300/22 bg-amber-400/10 text-amber-200' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100'}`}><Icon className="h-5 w-5" /></span>
        <div className="min-w-0">
          <p className="text-base font-semibold text-white">{isManual ? item.before : item.after}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{isManual ? item.beforeDetail : item.afterDetail}</p>
          <p className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.1em] ${isManual ? 'border-amber-300/28 bg-amber-400/10 text-amber-100' : 'border-cyan-300/32 bg-cyan-400/10 text-cyan-100'}`}>{isManual ? item.beforeStatus : 'visible'}</p>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterWorkflow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-18% 0px -18% 0px' });
  const reduceMotion = useReducedMotion();
  const [systemActive, setSystemActive] = useState(false);
  const [activeMode, setActiveMode] = useState<WorkflowMode>('both');
  const [mobileMode, setMobileMode] = useState<MobileMode>('manual');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [bridgeHovered, setBridgeHovered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setSystemActive(true);
      return;
    }
    const timer = window.setTimeout(() => setSystemActive(true), 1500);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  const activeItem = useMemo(() => workflowTransforms.find((item) => item.id === hoveredId) ?? null, [hoveredId]);
  const showManual = modeAllows(activeMode, 'manual');
  const showSystemized = modeAllows(activeMode, 'systemized');

  return (
    <section ref={sectionRef} className="workflow-transformation-section homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="workflow-transformation-title">
      <div className="pointer-events-none absolute inset-0 border-t border-cyan-200/[0.07] bg-[radial-gradient(circle_at_50%_34%,rgba(0,220,255,0.10),transparent_34%),radial-gradient(circle_at_18%_46%,rgba(245,165,36,0.055),transparent_26%),radial-gradient(circle_at_82%_56%,rgba(29,125,255,0.09),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[900px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">WORKFLOW TRANSFORMATION</p>
          <h2 id="workflow-transformation-title" className="mt-4 text-[clamp(2.15rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">From scattered work to one operating layer.</h2>
          <p className="mt-5 max-w-[820px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Connect enquiries, tools, tasks, documents, updates, and reports into workflows your team can actually use.</p>
        </motion.div>

        <div className="mt-12 hidden lg:block">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px -12% 0px' }} transition={{ duration: 0.58, delay: 0.2, ease: transitionEase }} className={`relative overflow-hidden rounded-[34px] border bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.08),transparent_38%),rgba(3,10,24,0.76)] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(120,220,255,0.06),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-[18px] transition duration-700 ${systemActive ? 'border-[rgba(0,210,255,0.30)] shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_46px_rgba(0,220,255,0.13),0_0_0_1px_rgba(120,220,255,0.08),inset_0_0_92px_rgba(0,160,255,0.07)]' : 'border-[rgba(0,210,255,0.22)]'}`}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(125,190,255,0.60)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.60)_1px,transparent_1px)] [background-size:48px_48px]" />
            {systemActive && !reduceMotion ? <div className="workflow-system-scan pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(56,223,255,0.13),transparent)]" /> : null}

            <div className="relative z-40 mb-5 flex items-center justify-between gap-5">
              <div className="inline-grid grid-cols-3 rounded-2xl border border-cyan-200/14 bg-slate-950/54 p-1" role="group" aria-label="Transformation emphasis">
                {([
                  ['both', 'Both'],
                  ['manual', 'Manual'],
                  ['systemized', 'Systemized'],
                ] as const).map(([value, label]) => (
                  <button key={value} type="button" onClick={() => setActiveMode(value)} className={`min-h-[40px] rounded-xl px-4 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${activeMode === value ? 'bg-cyan-400/12 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(56,223,255,0.26)]' : 'text-slate-400 hover:text-slate-200'}`}>{label}</button>
                ))}
              </div>
              <div className="text-right text-xs leading-relaxed text-slate-400">
                <span className="text-cyan-200">Rapid Rise AI creates control</span><br />by pulling scattered steps into one operating flow.
              </div>
            </div>

            <div className="relative z-30 grid grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)] gap-5">
              <WorkflowStatePanel tone="manual" activeMode={activeMode} hoveredId={hoveredId} systemActive={systemActive} reduceMotion={Boolean(reduceMotion)} onHover={setHoveredId} />
              <TransformationBridge active={systemActive} highlighted={Boolean(hoveredId || bridgeHovered)} reduceMotion={Boolean(reduceMotion)} onHover={setBridgeHovered} />
              <div className="space-y-4">
                <WorkflowStatePanel tone="systemized" activeMode={activeMode} hoveredId={hoveredId} systemActive={systemActive || reduceMotion === true} reduceMotion={Boolean(reduceMotion)} onHover={setHoveredId} />
                <MiniDashboardPreview active={systemActive || showSystemized || reduceMotion === true} reduceMotion={Boolean(reduceMotion)} />
              </div>
            </div>

            <AnimatePresence>
              {activeItem ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="relative z-50 mt-5 rounded-2xl border border-cyan-200/16 bg-slate-950/58 px-4 py-3 text-sm leading-relaxed text-slate-200 backdrop-blur-md">
                  <span className="text-amber-200">{activeItem.before}</span>
                  <ArrowRight className="mx-2 inline h-3.5 w-3.5 text-cyan-200" />
                  <span className="text-cyan-100">{activeItem.after}</span>
                  <span className="ml-2 text-slate-400">{activeItem.capability}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="relative z-40 mt-5 grid gap-3 xl:grid-cols-3">
              {comparisons.map((comparison) => <ComparisonRow key={comparison.before} before={comparison.before} after={comparison.after} active={systemActive} />)}
            </div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={systemActive ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.7 }} className="relative z-40 mt-5 flex items-center justify-between gap-5 rounded-2xl border border-cyan-200/14 bg-slate-950/52 px-5 py-4 backdrop-blur-md">
              <p className="text-sm text-slate-300">Manual work does not disappear by itself. It needs a system.</p>
              <Link href="/quote" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 hover:shadow-[0_0_24px_rgba(0,210,255,0.16)]">
                Build your operating layer <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-10 space-y-4 lg:hidden">
          <MobileWorkflowToggle mode={mobileMode} onChange={setMobileMode} />
          <div className="rounded-[28px] border border-[rgba(0,210,255,0.22)] bg-[rgba(3,10,24,0.76)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34),inset_0_0_70px_rgba(0,160,255,0.04)] backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/26 bg-cyan-400/10 text-cyan-100"><ScanLine className="h-5 w-5" /></span>
              <div>
                <p className="text-base font-semibold text-white">Rapid Rise System Layer</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">Connects scattered inputs into one controlled operating flow.</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {systemActions.map((action) => <span key={action} className="shrink-0 rounded-full border border-cyan-300/34 bg-cyan-400/10 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.09em] text-cyan-100">{action}</span>)}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mobileMode} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-3">
              {workflowTransforms.map((item) => <MobileWorkflowCard key={item.id} item={item} mode={mobileMode} />)}
              {mobileMode === 'systemized' ? <MiniDashboardPreview active reduceMotion={Boolean(reduceMotion)} /> : null}
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-3">
            {comparisons.map((comparison) => <ComparisonRow key={comparison.before} before={comparison.before} after={comparison.after} active />)}
          </div>

          <div className="rounded-[24px] border border-cyan-200/14 bg-slate-950/52 p-4">
            <p className="text-sm leading-relaxed text-slate-300">Manual work does not disappear by itself. It needs a system.</p>
            <Link href="/quote" className="mt-3 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100">
              Build your operating layer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .before-drift,
          .warning-pulse,
          .bridge-scan,
          .system-core,
          .workflow-system-scan,
          .workflow-data-particle {
            animation: none !important;
          }
        }
        .before-drift {
          animation: beforeSettle 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s 1 both;
        }
        .warning-pulse {
          animation: warningPulse 1.25s ease-out 1.2s 2;
        }
        .bridge-scan {
          transform: translateY(-120%);
          animation: bridgeScan 2.7s ease-in-out 0.1s infinite;
        }
        .workflow-system-scan {
          transform: translateX(-130%);
          animation: workflowSystemScan 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.05s 1 forwards;
        }
        .system-core-active {
          animation: systemCoreBreathe 5.8s ease-in-out infinite;
        }
        .workflow-data-particle {
          filter: drop-shadow(0 0 8px rgba(56, 223, 255, 0.78));
          opacity: 0.82;
        }
        @keyframes beforeSettle {
          0%, 100% { transform: translate3d(0, 0, 0); }
          45% { transform: translate3d(3px, -2px, 0); }
        }
        @keyframes warningPulse {
          0%, 100% { transform: scale(1); opacity: 0.65; }
          50% { transform: scale(1.28); opacity: 1; }
        }
        @keyframes bridgeScan {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: 1; }
          70% { opacity: 0.65; }
          100% { transform: translateY(320%); opacity: 0; }
        }
        @keyframes workflowSystemScan {
          from { transform: translateX(-130%); opacity: 0; }
          22% { opacity: 1; }
          to { transform: translateX(360%); opacity: 0; }
        }
        @keyframes systemCoreBreathe {
          0%, 100% { box-shadow: 0 0 0 rgba(56, 223, 255, 0), inset 0 0 26px rgba(56, 223, 255, 0.08); }
          50% { box-shadow: 0 0 34px rgba(56, 223, 255, 0.18), inset 0 0 44px rgba(56, 223, 255, 0.12); }
        }
      `}</style>
    </section>
  );
}
