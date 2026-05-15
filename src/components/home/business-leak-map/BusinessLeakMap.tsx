'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Gauge,
  Globe2,
  Mail,
  MessageSquare,
  MousePointerClick,
  Route,
  ScanLine,
  ShieldCheck,
  TriangleAlert,
  UserRound,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type SystemAction = 'Capture' | 'Route' | 'Track' | 'Remind' | 'Report';

type LeakNode = {
  id: string;
  label: string;
  icon: typeof Globe2;
  leak: string;
  fixedState: string;
  tooltip: string;
  systemFix: string;
  action: SystemAction;
  state: 'manual' | 'untracked';
  critical?: boolean;
  position: { left: string; top: string };
  point: { x: number; y: number };
  tilt: string;
};

type SystemPill = {
  label: SystemAction;
  x: string;
  y: string;
  description: string;
};

const leakNodes: LeakNode[] = [
  {
    id: 'website',
    label: 'Website enquiry',
    icon: MousePointerClick,
    leak: 'Slow reply',
    fixedState: 'Captured',
    tooltip: 'Lead arrives, but nobody sees it fast enough.',
    systemFix: 'Capture the enquiry and trigger instant acknowledgement.',
    action: 'Capture',
    state: 'manual',
    critical: true,
    position: { left: '8%', top: '15%' },
    point: { x: 145, y: 135 },
    tilt: '-1.8deg',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp message',
    icon: MessageSquare,
    leak: 'Lost context',
    fixedState: 'Stored',
    tooltip: 'Important requests get buried between normal chats.',
    systemFix: 'Store the request against the customer and keep the conversation visible.',
    action: 'Capture',
    state: 'manual',
    position: { left: '10%', top: '43%' },
    point: { x: 155, y: 286 },
    tilt: '1.6deg',
  },
  {
    id: 'email',
    label: 'Email inbox',
    icon: Mail,
    leak: 'No owner',
    fixedState: 'Routed',
    tooltip: 'Messages wait because nobody is clearly responsible.',
    systemFix: 'Assign the message to the right person or process automatically.',
    action: 'Route',
    state: 'untracked',
    position: { left: '33%', top: '12%' },
    point: { x: 370, y: 118 },
    tilt: '1deg',
  },
  {
    id: 'sheet',
    label: 'Spreadsheet',
    icon: FileSpreadsheet,
    leak: 'Manual copy',
    fixedState: 'Synced',
    tooltip: 'Data gets copied by hand and mistakes creep in.',
    systemFix: 'Sync the key fields once so updates do not depend on copy and paste.',
    action: 'Track',
    state: 'manual',
    position: { left: '27%', top: '59%' },
    point: { x: 315, y: 380 },
    tilt: '-2deg',
  },
  {
    id: 'staff',
    label: 'Staff member',
    icon: UserRound,
    leak: 'Repeated admin',
    fixedState: 'Automated',
    tooltip: 'People spend time moving information instead of doing valuable work.',
    systemFix: 'Automate the repeat handoffs so staff can focus on the work that matters.',
    action: 'Route',
    state: 'manual',
    position: { left: '44%', top: '39%' },
    point: { x: 488, y: 274 },
    tilt: '0.8deg',
  },
  {
    id: 'quote',
    label: 'Quote',
    icon: FileText,
    leak: 'No status',
    fixedState: 'Tracked',
    tooltip: 'Quotes are delayed because details are scattered.',
    systemFix: 'Track quote status from request to approval so delays are visible.',
    action: 'Track',
    state: 'untracked',
    position: { left: '62%', top: '33%' },
    point: { x: 666, y: 245 },
    tilt: '-1.2deg',
  },
  {
    id: 'followup',
    label: 'Follow-up',
    icon: BellRing,
    leak: 'Forgotten follow-up',
    fixedState: 'Reminded',
    tooltip: 'Nobody gets reminded, so opportunities go cold.',
    systemFix: 'Trigger the next follow-up before the opportunity goes cold.',
    action: 'Remind',
    state: 'untracked',
    critical: true,
    position: { left: '77%', top: '13%' },
    point: { x: 820, y: 130 },
    tilt: '2deg',
  },
  {
    id: 'customer',
    label: 'Customer update',
    icon: ShieldCheck,
    leak: 'Lost context',
    fixedState: 'Stored',
    tooltip: 'Customers ask for updates because nobody can see what changed.',
    systemFix: 'Keep the latest customer update attached to the job or request.',
    action: 'Remind',
    state: 'manual',
    position: { left: '73%', top: '49%' },
    point: { x: 782, y: 332 },
    tilt: '-1deg',
  },
  {
    id: 'report',
    label: 'Report',
    icon: Gauge,
    leak: 'No report',
    fixedState: 'Reported',
    tooltip: 'Without tracking, the same problems repeat.',
    systemFix: 'Show what changed, what is stuck, and where follow-up is needed.',
    action: 'Report',
    state: 'untracked',
    position: { left: '81%', top: '72%' },
    point: { x: 860, y: 462 },
    tilt: '1.4deg',
  },
];

const manualPaths = [
  { id: 'website-staff', from: 'website', to: 'staff', d: 'M145 135 C240 124, 382 184, 488 274' },
  { id: 'whatsapp-staff', from: 'whatsapp', to: 'staff', d: 'M155 286 C254 302, 375 290, 488 274' },
  { id: 'email-staff', from: 'email', to: 'staff', d: 'M370 118 C424 160, 448 205, 488 274' },
  { id: 'staff-sheet', from: 'staff', to: 'sheet', d: 'M488 274 C441 308, 380 340, 315 380' },
  { id: 'staff-quote', from: 'staff', to: 'quote', d: 'M488 274 C548 244, 602 238, 666 245' },
  { id: 'quote-followup', from: 'quote', to: 'followup', d: 'M666 245 C709 202, 768 162, 820 130' },
  { id: 'followup-customer', from: 'followup', to: 'customer', d: 'M820 130 C804 204, 816 264, 782 332' },
  { id: 'customer-report', from: 'customer', to: 'report', d: 'M782 332 C836 365, 854 410, 860 462' },
  { id: 'sheet-report', from: 'sheet', to: 'report', d: 'M315 380 C460 442, 670 462, 860 462' },
];

const systemPills: SystemPill[] = [
  { label: 'Capture', x: '13%', y: '82%', description: 'Collect the request from the right channel.' },
  { label: 'Route', x: '31%', y: '82%', description: 'Assign it to the right person or process.' },
  { label: 'Track', x: '49%', y: '82%', description: 'Keep status visible.' },
  { label: 'Remind', x: '67%', y: '82%', description: 'Trigger follow-up before it goes cold.' },
  { label: 'Report', x: '85%', y: '82%', description: 'Show what changed and what is stuck.' },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;


type FloatingPosition = { left: number; top: number };

function getFloatingPosition(rect: DOMRect, floatingWidth = 320, floatingHeight = 170): FloatingPosition {
  const padding = 16;
  let left = rect.left + rect.width / 2 - floatingWidth / 2;
  left = Math.max(padding, Math.min(left, window.innerWidth - floatingWidth - padding));

  let top = rect.top - floatingHeight - 14;
  if (top < padding) top = rect.bottom + 14;
  top = Math.max(padding, Math.min(top, window.innerHeight - floatingHeight - padding));

  return { left, top };
}

function FloatingLeakTooltip({ node, position }: { node: LeakNode; position: FloatingPosition }) {
  if (typeof document === 'undefined') return null;
  return createPortal(<LeakTooltip node={node} position={position} />, document.body);
}

function FloatingPillTooltip({ pill, position }: { pill: SystemPill; position: FloatingPosition }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      style={{ left: position.left, top: position.top }}
      className="floating-tooltip pointer-events-none px-3 py-2 text-[0.76rem] leading-relaxed text-cyan-50"
    >
      {pill.description}
    </motion.div>,
    document.body,
  );
}

function WorkflowNode({ node, active, dimmed, fixed, delay, onActivate, onClear }: {
  node: LeakNode;
  active: boolean;
  dimmed: boolean;
  fixed: boolean;
  delay: number;
  onActivate: (target: HTMLElement) => void;
  onClear: () => void;
}) {
  const Icon = node.icon;

  return (
    <motion.button
      type="button"
      aria-label={`${node.label}. Leak: ${node.leak}. ${node.tooltip} System fix: ${node.systemFix}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.45, delay, ease: transitionEase }}
      style={{ left: node.position.left, top: node.position.top, rotate: node.tilt }}
      onMouseEnter={(event) => onActivate(event.currentTarget)}
      onMouseLeave={onClear}
      onFocus={(event) => onActivate(event.currentTarget)}
      onBlur={onClear}
      className={`group absolute z-30 w-[min(17vw,184px)] rounded-2xl border bg-[rgba(3,12,27,0.86)] px-3.5 py-3 text-left shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${active ? 'border-cyan-200/60 shadow-[0_0_0_1px_rgba(125,235,255,0.14),0_0_34px_rgba(0,210,255,0.24),0_18px_42px_rgba(0,0,0,0.38)]' : 'border-[rgba(120,190,255,0.18)]'} ${dimmed ? 'opacity-45' : 'opacity-100'}`}
    >
      <span className="mb-2 flex items-center justify-between gap-2">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-950/72 transition ${active ? 'border-cyan-200/55 text-cyan-100' : 'border-cyan-200/18 text-cyan-200/80'}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.16em] ${fixed ? 'border-cyan-200/32 bg-cyan-400/10 text-cyan-100' : 'border-slate-400/16 bg-white/[0.03] text-slate-400'}`}>
          {fixed ? 'system' : node.state}
        </span>
      </span>
      <span className="block text-[0.83rem] font-semibold leading-tight text-slate-50">{node.label}</span>
      <span className="mt-2 block text-[0.68rem] leading-snug text-slate-400">{fixed ? node.systemFix : node.tooltip}</span>
      <span className={`pointer-events-none absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full ${node.critical ? 'bg-[rgba(255,80,80,0.78)] shadow-[0_0_18px_rgba(255,80,80,0.36)]' : 'bg-[#f5a524] shadow-[0_0_16px_rgba(245,165,36,0.32)]'} ${fixed ? 'opacity-20' : 'leak-dot-pulse'}`} />
      <span className={`absolute -bottom-7 right-2 flex items-center gap-1 text-[0.68rem] font-medium text-cyan-100 transition ${active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
        Fix this gap <ArrowRight className="h-3 w-3" />
      </span>
    </motion.button>
  );
}

function LeakTooltip({ node, position }: { node: LeakNode; position: FloatingPosition }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      style={{ left: position.left, top: position.top }}
      className="floating-tooltip pointer-events-none w-[min(320px,calc(100vw-32px))] rounded-2xl border border-cyan-200/18 bg-slate-950/95 p-3 text-left shadow-[0_18px_54px_rgba(0,0,0,0.62)] backdrop-blur-xl"
    >
      <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-200"><TriangleAlert className="h-3.5 w-3.5" /> {node.leak}</p>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-200">{node.tooltip}</p>
      <p className="mt-2 border-t border-white/8 pt-2 text-[0.76rem] leading-relaxed text-cyan-100"><span className="font-semibold">System fix:</span> {node.systemFix}</p>
    </motion.div>
  );
}

function LeakBadge({ node, active, dimmed, fixed, delay, onActivate, onClear }: {
  node: LeakNode;
  active: boolean;
  dimmed: boolean;
  fixed: boolean;
  delay: number;
  onActivate: (target: HTMLElement) => void;
  onClear: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`${node.leak} on ${node.label}. ${node.tooltip}`}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: transitionEase }}
      style={{ left: `calc(${node.position.left} + 104px)`, top: `calc(${node.position.top} + 72px)` }}
      onMouseEnter={(event) => onActivate(event.currentTarget)}
      onMouseLeave={onClear}
      onFocus={(event) => onActivate(event.currentTarget)}
      onBlur={onClear}
      className={`absolute z-40 inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${fixed ? 'border-[rgba(0,210,255,0.38)] bg-[rgba(0,210,255,0.10)] text-[#bdefff] shadow-[0_0_18px_rgba(0,210,255,0.16)]' : node.critical ? 'border-[rgba(255,80,80,0.28)] bg-[rgba(70,16,18,0.55)] text-red-100' : 'border-[rgba(245,165,36,0.36)] bg-[rgba(245,165,36,0.10)] text-amber-100'} ${active ? 'scale-[1.03] shadow-[0_0_24px_rgba(245,165,36,0.25)]' : ''} ${dimmed ? 'opacity-40' : 'opacity-100'}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${fixed ? 'bg-cyan-200' : node.critical ? 'bg-red-300' : 'bg-[#f5a524]'} ${fixed ? '' : 'leak-dot-pulse'}`} />
      {fixed ? node.fixedState : node.leak}
    </motion.button>
  );
}

function SystemLayerPill({ pill, active, selected, onActivate, onClear, reduceMotion }: {
  pill: SystemPill;
  active: boolean;
  selected: boolean;
  onActivate: (target: HTMLElement) => void;
  onClear: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      style={{ left: pill.x, top: pill.y }}
      onMouseEnter={(event) => onActivate(event.currentTarget)}
      onMouseLeave={onClear}
      onFocus={(event) => onActivate(event.currentTarget)}
      onBlur={onClear}
      className={`absolute z-40 inline-flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border border-[rgba(0,210,255,0.38)] bg-[rgba(0,210,255,0.10)] px-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#bdefff] backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${selected ? 'border-cyan-100/70 bg-cyan-300/18 shadow-[0_0_24px_rgba(0,210,255,0.22)]' : ''}`}
    >
      <Check className="h-3.5 w-3.5" /> {pill.label}
    </motion.button>
  );
}

function MobileLeakCard({ node, isOpen, onToggle }: { node: LeakNode; isOpen: boolean; onToggle: () => void }) {
  const Icon = node.icon;

  return (
    <div className="rounded-2xl border border-[rgba(120,190,255,0.16)] bg-[rgba(3,12,27,0.78)] shadow-[0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <button type="button" onClick={onToggle} className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/20 bg-slate-950/70 text-cyan-200"><Icon className="h-4.5 w-4.5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">{node.label}</span>
          <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] ${node.critical ? 'border-red-300/28 bg-red-500/10 text-red-100' : 'border-amber-300/34 bg-amber-400/10 text-amber-100'}`}>Leak: {node.leak}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
            <div className="border-t border-white/8 px-4 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-slate-300"><span className="text-slate-100">Problem:</span> {node.tooltip}</p>
              <p className="mt-3 rounded-xl border border-cyan-300/22 bg-cyan-400/8 px-3 py-2 text-sm leading-relaxed text-cyan-100"><span className="font-semibold">System fix:</span> {node.systemFix}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function BusinessLeakMap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-18% 0px -18% 0px' });
  const reduceMotion = useReducedMotion();
  const [systemActive, setSystemActive] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredPill, setHoveredPill] = useState<SystemAction | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<FloatingPosition | null>(null);
  const [pillTooltipPosition, setPillTooltipPosition] = useState<FloatingPosition | null>(null);
  const [openCards, setOpenCards] = useState<string[]>(['website']);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setSystemActive(true);
      return;
    }
    const timer = window.setTimeout(() => setSystemActive(true), 2400);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  const hoveredNode = useMemo(() => leakNodes.find((node) => node.id === hovered) ?? null, [hovered]);
  const activePill = systemPills.find((pill) => pill.label === hoveredPill) ?? null;

  function activateNode(nodeId: string, target: HTMLElement) {
    setHovered(nodeId);
    setTooltipPosition(getFloatingPosition(target.getBoundingClientRect()));
  }

  function clearNode() {
    setHovered(null);
    setTooltipPosition(null);
  }

  function activatePill(label: SystemAction, target: HTMLElement) {
    setHoveredPill(label);
    setPillTooltipPosition(getFloatingPosition(target.getBoundingClientRect(), 260, 90));
  }

  function clearPill() {
    setHoveredPill(null);
    setPillTooltipPosition(null);
  }

  return (
    <section ref={sectionRef} className="business-leak-map-section homepage-section relative overflow-visible px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28" aria-labelledby="business-leak-map-title">
      <div className="pointer-events-none absolute inset-0 border-t border-cyan-200/[0.08] bg-[radial-gradient(circle_at_50%_20%,rgba(0,145,255,0.10),transparent_34%),radial-gradient(circle_at_74%_52%,rgba(0,220,255,0.05),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[860px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">BUSINESS LEAK MAP</p>
          <h2 id="business-leak-map-title" className="mt-4 text-[clamp(2.35rem,5.8vw,4.7rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">Where work leaks out.</h2>
          <p className="mt-5 max-w-[760px] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.58] text-slate-300">Most businesses do not lose control in one big moment. They lose it through small manual gaps every day.</p>
        </motion.div>

        <div className="mt-12 hidden lg:block">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px -12% 0px' }} transition={{ duration: 0.58, delay: 0.2, ease: transitionEase }} className={`relative min-h-[650px] overflow-hidden rounded-[34px] border bg-[rgba(3,10,24,0.72)] p-8 shadow-[0_0_0_1px_rgba(120,220,255,0.06),0_24px_80px_rgba(0,0,0,0.42),inset_0_0_80px_rgba(0,160,255,0.04)] backdrop-blur-[18px] transition duration-700 ${systemActive ? 'border-[rgba(0,210,255,0.32)] shadow-[0_0_0_1px_rgba(120,220,255,0.09),0_24px_80px_rgba(0,0,0,0.42),0_0_46px_rgba(0,210,255,0.10),inset_0_0_90px_rgba(0,160,255,0.07)]' : 'border-[rgba(0,210,255,0.22)]'}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(0,210,255,0.08),transparent_30%),radial-gradient(circle_at_15%_22%,rgba(245,165,36,0.055),transparent_28%),linear-gradient(180deg,rgba(2,7,17,0.10),rgba(0,0,0,0.25))]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(125,190,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.55)_1px,transparent_1px)] [background-size:48px_48px]" />
            {!reduceMotion ? <div className="warning-scan pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(245,165,36,0.08),transparent)]" /> : null}
            {!reduceMotion && systemActive ? <div className="system-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,210,255,0.13),transparent)]" /> : null}

            <motion.p initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.8 }} className="pointer-events-none absolute left-1/2 top-[45%] z-10 -translate-x-1/2 -translate-y-1/2 text-[0.78rem] font-semibold uppercase tracking-[0.55em] text-slate-200/[0.085]">Manual workflow</motion.p>

            <svg viewBox="0 0 960 560" className="absolute inset-0 z-10 h-full w-full" aria-hidden="true">
              <defs>
                <filter id="cyan-route-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              {manualPaths.map((path, index) => {
                const highlighted = hovered ? path.from === hovered || path.to === hovered : false;
                return (
                  <motion.path key={path.id} d={path.d} fill="none" stroke={highlighted ? 'rgba(255,188,105,0.86)' : 'rgba(245,165,36,0.38)'} strokeDasharray="8 11" strokeWidth={highlighted ? 2.4 : 1.55} strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: systemActive ? 0.32 : 0.9 }} viewport={{ once: true }} transition={{ duration: 0.95, delay: 0.8 + index * 0.055, ease: transitionEase }} />
                );
              })}
              {manualPaths.map((path, index) => {
                const highlighted = hovered ? path.from === hovered || path.to === hovered : false;
                return (
                  <motion.path key={`system-${path.id}`} d={path.d} fill="none" stroke={highlighted ? 'rgba(189,239,255,0.98)' : 'rgba(0,210,255,0.70)'} strokeWidth={highlighted ? 3.2 : 2.15} strokeLinecap="round" filter="url(#cyan-route-glow)" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={systemActive ? { pathLength: 1, opacity: highlighted ? 1 : 0.86 } : { pathLength: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.35 + index * 0.05, ease: transitionEase }} />
                );
              })}
              {systemActive && !reduceMotion ? manualPaths.slice(0, 5).map((path, index) => <circle key={`particle-${path.id}`} r="3" fill="rgba(189,239,255,0.96)" className="data-particle" style={{ animationDelay: `${index * 0.85}s` }}><animateMotion dur="5.8s" repeatCount="indefinite" path={path.d} /></circle>) : null}
            </svg>

            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={systemActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: transitionEase }} className="pointer-events-none absolute inset-x-8 bottom-20 top-8 z-20 rounded-[28px] border border-cyan-300/16 bg-[radial-gradient(circle_at_50%_42%,rgba(0,210,255,0.12),transparent_34%),linear-gradient(135deg,rgba(0,118,255,0.09),transparent_52%)] system-layer-breathe" />

            {systemPills.map((pill) => (
              <SystemLayerPill key={pill.label} pill={pill} active={systemActive} selected={hoveredPill === pill.label} onActivate={(target) => activatePill(pill.label, target)} onClear={clearPill} reduceMotion={Boolean(reduceMotion)} />
            ))}
            {activePill && pillTooltipPosition ? <FloatingPillTooltip pill={activePill} position={pillTooltipPosition} /> : null}

            {leakNodes.map((node, index) => {
              const active = hovered === node.id;
              const dimmed = Boolean(hovered && hovered !== node.id);
              return <WorkflowNode key={node.id} node={node} active={active} dimmed={dimmed} fixed={systemActive} delay={0.4 + index * 0.07} onActivate={(target) => activateNode(node.id, target)} onClear={clearNode} />;
            })}

            {leakNodes.map((node, index) => {
              const active = hovered === node.id;
              const dimmed = Boolean(hovered && hovered !== node.id);
              return <LeakBadge key={`${node.id}-badge`} node={node} active={active} dimmed={dimmed} fixed={systemActive} delay={1.3 + index * 0.075} onActivate={(target) => activateNode(node.id, target)} onClear={clearNode} />;
            })}

            <AnimatePresence>
              {hoveredNode && tooltipPosition ? <FloatingLeakTooltip node={hoveredNode} position={tooltipPosition} /> : null}
            </AnimatePresence>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={systemActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.7 }} className="absolute inset-x-8 bottom-6 z-50 flex items-center justify-between gap-5 rounded-2xl border border-cyan-200/14 bg-slate-950/52 px-5 py-4 backdrop-blur-md">
              <p className="text-sm text-slate-300">Manual gaps do not look expensive until they repeat every day.</p>
              <Link href="/quote" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 hover:shadow-[0_0_24px_rgba(0,210,255,0.16)]">
                Find the leaks in your workflow <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-10 space-y-4 lg:hidden">
          <div className="rounded-[26px] border border-[rgba(0,210,255,0.22)] bg-[rgba(3,10,24,0.76)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34),inset_0_0_70px_rgba(0,160,255,0.04)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/24 bg-amber-400/10 text-amber-100"><ScanLine className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-white">Manual workflow leaking control</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">Scattered messages, delayed quotes, forgotten follow-ups, and missing visibility.</p>
              </div>
            </div>
          </div>

          {leakNodes.map((node) => (
            <MobileLeakCard key={node.id} node={node} isOpen={openCards.includes(node.id)} onToggle={() => setOpenCards((prev) => (prev.includes(node.id) ? prev.filter((id) => id !== node.id) : [...prev, node.id]))} />
          ))}

          <div className="rounded-[26px] border border-cyan-300/28 bg-[linear-gradient(180deg,rgba(8,22,45,0.9),rgba(4,11,24,0.96))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.30)]">
            <p className="flex items-center gap-2 text-sm font-semibold text-cyan-100"><Route className="h-4.5 w-4.5" /> Rapid Rise System Layer</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">The system captures, routes, tracks, reminds, and reports so gaps stop depending on memory.</p>
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
              {systemPills.map((pill, index) => (
                <span key={pill.label} className="flex shrink-0 items-center gap-2 text-cyan-100">
                  <span className="rounded-full border border-cyan-300/36 bg-cyan-500/12 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em]">{pill.label}</span>
                  {index < systemPills.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-cyan-300/60" /> : null}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-cyan-200/14 bg-slate-950/52 p-4">
            <p className="text-sm leading-relaxed text-slate-300">Manual gaps do not look expensive until they repeat every day.</p>
            <Link href="/quote" className="mt-3 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100">
              Find the leaks in your workflow <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .warning-scan,
          .system-sweep,
          .data-particle,
          .leak-dot-pulse,
          .system-layer-breathe {
            animation: none !important;
          }
        }
        .warning-scan {
          transform: translateX(-130%);
          animation: warningScan 1.25s ease-out 2.1s 1 forwards;
        }
        .system-sweep {
          transform: translateX(-120%);
          animation: systemSweep 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s 1 forwards;
        }
        .leak-dot-pulse {
          animation: leakPulse 4.8s ease-in-out infinite;
        }
        .data-particle {
          filter: drop-shadow(0 0 8px rgba(0, 210, 255, 0.75));
          opacity: 0.82;
        }
        .system-layer-breathe {
          animation: systemBreathe 6.5s ease-in-out infinite;
        }
        @keyframes warningScan {
          from { transform: translateX(-130%); opacity: 0; }
          18% { opacity: 1; }
          to { transform: translateX(360%); opacity: 0; }
        }
        @keyframes systemSweep {
          from { transform: translateX(-120%); opacity: 0; }
          22% { opacity: 1; }
          to { transform: translateX(260%); opacity: 0; }
        }
        @keyframes leakPulse {
          0%, 100% { opacity: 0.62; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.26); }
        }
        @keyframes systemBreathe {
          0%, 100% { opacity: 0.74; box-shadow: inset 0 0 42px rgba(0, 210, 255, 0.035); }
          50% { opacity: 0.98; box-shadow: inset 0 0 70px rgba(0, 210, 255, 0.065); }
        }
      `}</style>
    </section>
  );
}
