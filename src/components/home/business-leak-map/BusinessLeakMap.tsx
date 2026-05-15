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
  Mail,
  MessageSquare,
  MousePointerClick,
  Route,
  ScanLine,
  ShieldCheck,
  TriangleAlert,
  UserRound,
} from 'lucide-react';
import { type ComponentType, type CSSProperties, type SVGProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SystemAction = 'Capture' | 'Route' | 'Track' | 'Remind' | 'Report';
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type LeakNode = {
  id: string;
  label: string;
  icon: IconComponent;
  leak: string;
  fixedState: string;
  tooltip: string;
  systemFix: string;
  action: SystemAction;
  state: 'manual' | 'untracked';
  critical?: boolean;
  position: { x: number; y: number };
};

type RoutePath = {
  id: string;
  from: string;
  to: string;
  d: string;
  tone: 'manual' | 'system';
};

type TooltipState = {
  node: LeakNode;
  position: { left: number; top: number };
};

const tooltipSize = { width: 320, height: 170 };

const leakNodes: LeakNode[] = [
  {
    id: 'website',
    label: 'Website enquiry',
    icon: MousePointerClick,
    leak: 'Slow reply',
    fixedState: 'Captured',
    tooltip: 'Lead arrives, but nobody sees it fast enough.',
    systemFix: 'Capture the enquiry and send instant acknowledgement.',
    action: 'Capture',
    state: 'manual',
    critical: true,
    position: { x: 13, y: 18 },
  },
  {
    id: 'email',
    label: 'Email inbox',
    icon: Mail,
    leak: 'No owner',
    fixedState: 'Routed',
    tooltip: 'Messages wait because no owner is assigned.',
    systemFix: 'Assign the message to the right person or process automatically.',
    action: 'Route',
    state: 'untracked',
    position: { x: 36, y: 14 },
  },
  {
    id: 'followup',
    label: 'Follow-up',
    icon: BellRing,
    leak: 'Forgotten follow-up',
    fixedState: 'Reminded',
    tooltip: 'Nobody gets reminded, so opportunities go cold.',
    systemFix: 'Trigger the next follow-up before the opportunity disappears.',
    action: 'Remind',
    state: 'untracked',
    critical: true,
    position: { x: 83, y: 17 },
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp message',
    icon: MessageSquare,
    leak: 'Lost context',
    fixedState: 'Stored',
    tooltip: 'Important requests get buried between normal chats.',
    systemFix: 'Store the request and keep the customer conversation visible.',
    action: 'Capture',
    state: 'manual',
    position: { x: 14, y: 47 },
  },
  {
    id: 'staff',
    label: 'Staff member',
    icon: UserRound,
    leak: 'Repeated admin',
    fixedState: 'Automated',
    tooltip: 'The team becomes the connection between tools.',
    systemFix: 'Route the next step through the system, not memory.',
    action: 'Route',
    state: 'manual',
    position: { x: 50, y: 40 },
  },
  {
    id: 'quote',
    label: 'Quote',
    icon: FileText,
    leak: 'No status',
    fixedState: 'Tracked',
    tooltip: 'Quote status is unclear and approval delays are hard to see.',
    systemFix: 'Track quote status and make the next step visible.',
    action: 'Track',
    state: 'untracked',
    position: { x: 69, y: 38 },
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
    position: { x: 31, y: 68 },
  },
  {
    id: 'customer',
    label: 'Customer update',
    icon: ShieldCheck,
    leak: 'Lost context',
    fixedState: 'Stored',
    tooltip: 'Customers ask for updates, but the answer lives in different places.',
    systemFix: 'Attach updates to the right job, lead, or request.',
    action: 'Remind',
    state: 'manual',
    position: { x: 79, y: 61 },
  },
  {
    id: 'report',
    label: 'Report',
    icon: Gauge,
    leak: 'No report',
    fixedState: 'Reported',
    tooltip: 'The same problems repeat because nobody can see the pattern.',
    systemFix: 'Report the workflow status and show what needs attention.',
    action: 'Report',
    state: 'untracked',
    position: { x: 87, y: 78 },
  },
];

const routePaths: RoutePath[] = [
  { id: 'website-staff', from: 'website', to: 'staff', tone: 'manual', d: 'M21 18 C28 18, 36 28, 41 36' },
  { id: 'whatsapp-staff', from: 'whatsapp', to: 'staff', tone: 'manual', d: 'M22 47 C30 49, 38 47, 42 43' },
  { id: 'email-staff', from: 'email', to: 'staff', tone: 'manual', d: 'M43 18 C46 23, 48 30, 49 34' },
  { id: 'staff-sheet', from: 'staff', to: 'sheet', tone: 'manual', d: 'M44 46 C40 51, 36 58, 34 63' },
  { id: 'staff-quote', from: 'staff', to: 'quote', tone: 'system', d: 'M58 39 C61 38, 63 37, 65 37' },
  { id: 'quote-followup', from: 'quote', to: 'followup', tone: 'system', d: 'M75 33 C78 28, 80 25, 81 22' },
  { id: 'quote-customer', from: 'quote', to: 'customer', tone: 'system', d: 'M74 43 C77 47, 78 52, 78 55' },
  { id: 'customer-report', from: 'customer', to: 'report', tone: 'system', d: 'M83 66 C86 69, 87 72, 87 73' },
  { id: 'sheet-report', from: 'sheet', to: 'report', tone: 'manual', d: 'M38 70 C52 78, 70 81, 81 80' },
];

const systemSteps: SystemAction[] = ['Capture', 'Route', 'Track', 'Remind', 'Report'];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function getTooltipPosition(rect: DOMRect, tooltipWidth = tooltipSize.width, tooltipHeight = tooltipSize.height) {
  const padding = 16;
  let left = rect.left + rect.width / 2 - tooltipWidth / 2;
  left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

  let top = rect.top - tooltipHeight - 14;
  if (top < padding) {
    top = rect.bottom + 14;
  }

  return { left, top };
}

function WorkflowNode({ node, active, dimmed, fixed, delay, onActivate, onClear }: {
  node: LeakNode;
  active: boolean;
  dimmed: boolean;
  fixed: boolean;
  delay: number;
  onActivate: (node: LeakNode, element: HTMLElement) => void;
  onClear: () => void;
}) {
  const Icon = node.icon;

  return (
    <motion.button
      type="button"
      aria-describedby={active ? 'business-leak-tooltip' : undefined}
      aria-label={`${node.label}. Leak: ${node.leak}. ${node.tooltip} System fix: ${node.systemFix}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.45, delay, ease: transitionEase }}
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
      onMouseEnter={(event) => onActivate(node, event.currentTarget)}
      onMouseLeave={onClear}
      onFocus={(event) => onActivate(node, event.currentTarget)}
      onBlur={onClear}
      className={`group pointer-events-auto absolute z-10 min-h-[96px] w-[clamp(155px,12vw,190px)] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border bg-[rgba(3,10,24,0.84)] p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[14px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 ${active ? 'border-cyan-200/62 shadow-[0_0_0_1px_rgba(125,235,255,0.14),0_0_34px_rgba(0,210,255,0.22),0_16px_40px_rgba(0,0,0,0.36)]' : 'border-cyan-200/18'} ${dimmed ? 'opacity-50' : 'opacity-100'}`}
    >
      <span className="mb-3 flex items-center justify-between gap-2">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-950/72 transition ${active ? 'border-cyan-200/60 text-cyan-100 shadow-[inset_0_0_18px_rgba(56,223,255,0.12)]' : 'border-cyan-200/22 text-cyan-200/85'}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${fixed ? 'border-cyan-200/34 bg-cyan-400/10 text-cyan-100' : 'border-slate-400/16 bg-white/[0.03] text-slate-400'}`}>
          {fixed ? node.fixedState : node.state}
        </span>
      </span>
      <span className="block text-[0.92rem] font-bold leading-tight text-white">{node.label}</span>
      <span className="mt-2 block text-[0.78rem] leading-[1.45] text-slate-400">{fixed ? node.systemFix : node.tooltip}</span>
      <span className={`pointer-events-none absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full ${node.critical ? 'bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.42)]' : 'bg-[#f5a524] shadow-[0_0_16px_rgba(245,165,36,0.34)]'} ${fixed ? 'opacity-20' : 'leak-dot-pulse'}`} />
    </motion.button>
  );
}

function LeakTooltipPortal({ tooltip }: { tooltip: TooltipState | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !tooltip) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        id="business-leak-tooltip"
        role="tooltip"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        style={{ left: tooltip.position.left, top: tooltip.position.top } as CSSProperties}
        className="pointer-events-none fixed z-[1000] w-[min(320px,calc(100vw_-_32px))] rounded-2xl border border-cyan-200/22 bg-[rgba(3,10,24,0.96)] p-4 text-left text-slate-50 shadow-[0_24px_70px_rgba(0,0,0,0.55),0_0_30px_rgba(56,223,255,0.15)] backdrop-blur-[18px]"
      >
        <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-amber-200"><TriangleAlert className="h-3.5 w-3.5" /> Problem: {tooltip.node.leak}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{tooltip.node.tooltip}</p>
        <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-cyan-100"><span className="font-semibold">System fix:</span> {tooltip.node.systemFix}</p>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

function MobileLeakCard({ node, isOpen, onToggle, index, reduceMotion }: { node: LeakNode; isOpen: boolean; onToggle: () => void; index: number; reduceMotion: boolean }) {
  const Icon = node.icon;
  const panelId = `mobile-leak-panel-${node.id}`;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.04, ease: transitionEase }}
      className="rounded-2xl border border-cyan-200/16 bg-[rgba(3,12,27,0.78)] shadow-[0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md"
    >
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle} className="flex min-h-[68px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200/24 bg-slate-950/70 text-cyan-200"><Icon className="h-5 w-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">{node.label}</span>
          <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] ${node.critical ? 'border-red-300/28 bg-red-500/10 text-red-100' : 'border-amber-300/34 bg-amber-400/10 text-amber-100'}`}>Leak: {node.leak}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div id={panelId} initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
            <div className="border-t border-white/8 px-4 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-slate-300"><span className="text-slate-100">Problem:</span> {node.tooltip}</p>
              <p className="mt-3 rounded-xl border border-cyan-300/22 bg-cyan-400/8 px-3 py-2 text-sm leading-relaxed text-cyan-100"><span className="font-semibold">System fix:</span> {node.systemFix}</p>
              <p className="mt-3 inline-flex rounded-full border border-cyan-300/24 bg-cyan-400/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-cyan-100">{node.action}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function BusinessLeakMap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-18% 0px -18% 0px' });
  const reduceMotion = useReducedMotion();
  const [systemActive, setSystemActive] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [openCard, setOpenCard] = useState<string>('website');

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setSystemActive(true);
      return;
    }
    const timer = window.setTimeout(() => setSystemActive(true), 900);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  useEffect(() => {
    if (!tooltip) return;
    const handleReposition = () => setTooltip(null);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [tooltip]);

  const activeNode = useMemo(() => leakNodes.find((node) => node.id === hovered) ?? null, [hovered]);

  const handleActivate = useCallback((node: LeakNode, element: HTMLElement) => {
    setHovered(node.id);
    setTooltip({ node, position: getTooltipPosition(element.getBoundingClientRect()) });
  }, []);

  const handleClear = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <section ref={sectionRef} className="business-leak-map-section homepage-section relative overflow-visible px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28" aria-labelledby="business-leak-map-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden border-t border-cyan-200/[0.08] bg-[radial-gradient(circle_at_50%_20%,rgba(0,145,255,0.10),transparent_34%),radial-gradient(circle_at_74%_52%,rgba(0,220,255,0.05),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.055] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1480px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[860px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">BUSINESS LEAK MAP</p>
          <h2 id="business-leak-map-title" className="mt-4 text-[clamp(2.35rem,5.8vw,4.7rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">Where work leaks out.</h2>
          <p className="mt-5 max-w-[760px] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.58] text-slate-300">Most businesses do not lose control in one big moment. They lose it through small manual gaps every day.</p>
        </motion.div>

        <div className="mt-12 hidden lg:block">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px -12% 0px' }} transition={{ duration: 0.58, delay: 0.2, ease: transitionEase }} className="relative overflow-visible rounded-[32px] border border-cyan-200/22 bg-[rgba(3,10,24,0.76)] p-[clamp(20px,2.5vw,36px)] shadow-[0_0_0_1px_rgba(56,223,255,0.06),0_30px_90px_rgba(0,0,0,0.45),inset_0_0_70px_rgba(14,165,255,0.08)] backdrop-blur-[18px]">
            <div className="relative flex min-h-[clamp(620px,52vw,740px)] flex-col overflow-visible rounded-[26px]">
              <div className="relative isolate min-h-[520px] flex-1 overflow-visible rounded-3xl bg-[radial-gradient(circle_at_50%_48%,rgba(56,223,255,0.16),transparent_32%),linear-gradient(180deg,rgba(8,19,39,0.62),rgba(3,8,18,0.88))]">
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.08] [background-image:linear-gradient(rgba(125,190,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.55)_1px,transparent_1px)] [background-size:48px_48px]" />
                {!reduceMotion ? <div className="warning-scan pointer-events-none absolute inset-y-0 left-0 z-[2] w-1/3 bg-[linear-gradient(90deg,transparent,rgba(245,165,36,0.08),transparent)]" /> : null}
                {!reduceMotion && systemActive ? <div className="system-sweep pointer-events-none absolute inset-y-0 left-0 z-[2] w-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,210,255,0.13),transparent)]" /> : null}

                <motion.p initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} className="pointer-events-none absolute left-1/2 top-[46%] z-[1] -translate-x-1/2 -translate-y-1/2 text-[0.78rem] font-semibold uppercase tracking-[0.55em] text-slate-200/[0.085]">Manual workflow</motion.p>

                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-[3] h-full w-full" aria-hidden="true">
                  <defs>
                    <filter id="cyan-route-glow-clean" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  {routePaths.map((path, index) => {
                    const highlighted = hovered ? path.from === hovered || path.to === hovered : false;
                    const manual = path.tone === 'manual';
                    return (
                      <motion.path
                        key={path.id}
                        d={path.d}
                        fill="none"
                        stroke={highlighted ? (manual ? 'rgba(245,165,36,0.78)' : 'rgba(189,239,255,0.95)') : manual ? 'rgba(245,165,36,0.45)' : 'rgba(56,223,255,0.72)'}
                        strokeDasharray={manual ? '8 10' : undefined}
                        strokeWidth={highlighted ? 0.64 : 0.42}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        opacity={highlighted ? 0.95 : 0.52}
                        filter="url(#cyan-route-glow-clean)"
                        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: highlighted ? 0.95 : 0.52 }}
                        viewport={{ once: true }}
                        transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.35 + index * 0.045, ease: transitionEase }}
                      />
                    );
                  })}
                </svg>

                <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={systemActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: transitionEase }} className="system-layer-breathe pointer-events-none absolute inset-x-7 bottom-7 top-7 z-[4] rounded-[28px] border border-cyan-300/16 bg-[radial-gradient(circle_at_50%_42%,rgba(0,210,255,0.10),transparent_34%),linear-gradient(135deg,rgba(0,118,255,0.08),transparent_52%)]" />

                <div className="absolute inset-0 z-10 pointer-events-none">
                  {leakNodes.map((node, index) => {
                    const active = hovered === node.id;
                    const dimmed = Boolean(hovered && hovered !== node.id);
                    return <WorkflowNode key={node.id} node={node} active={active} dimmed={dimmed} fixed={systemActive} delay={0.35 + index * 0.055} onActivate={handleActivate} onClear={handleClear} />;
                  })}
                </div>
              </div>

              <div className="relative z-20 mt-4 flex min-h-[76px] shrink-0 items-center justify-between gap-5 rounded-[18px] border border-cyan-200/14 bg-[rgba(2,8,18,0.88)] px-5 py-4 shadow-[0_16px_38px_rgba(0,0,0,0.22)] backdrop-blur-[14px] max-xl:flex-wrap">
                <p className="max-w-[360px] text-sm leading-relaxed text-slate-300">Manual gaps do not look expensive until they repeat every day.</p>
                <div className="flex flex-wrap items-center justify-center gap-2" aria-label="System layer steps">
                  {systemSteps.map((step) => {
                    const selected = activeNode?.action === step;
                    return (
                      <span key={step} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition ${selected ? 'border-cyan-100/70 bg-cyan-300/18 text-white shadow-[0_0_22px_rgba(56,223,255,0.16)]' : 'border-cyan-300/28 bg-cyan-500/10 text-cyan-100'}`}>
                        <Check className="h-3.5 w-3.5" /> {step}
                      </span>
                    );
                  })}
                </div>
                <Link href="/quote" className="group inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 hover:shadow-[0_0_24px_rgba(0,210,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
                  Find the leaks in your workflow <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 space-y-4 lg:hidden">
          <div className="rounded-[26px] border border-cyan-300/22 bg-[rgba(3,10,24,0.76)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34),inset_0_0_70px_rgba(0,160,255,0.04)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/24 bg-amber-400/10 text-amber-100"><ScanLine className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-white">Manual gaps repeat every day.</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">Open each leak to see where control disappears and how the system layer fixes it.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:hidden">
            {leakNodes.map((node, index) => (
              <MobileLeakCard key={node.id} node={node} index={index} reduceMotion={Boolean(reduceMotion)} isOpen={openCard === node.id} onToggle={() => setOpenCard((current) => (current === node.id ? '' : node.id))} />
            ))}
          </div>

          <div className="rounded-[26px] border border-cyan-300/28 bg-[linear-gradient(180deg,rgba(8,22,45,0.9),rgba(4,11,24,0.96))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.30)]">
            <p className="flex items-center gap-2 text-sm font-semibold text-cyan-100"><Route className="h-[18px] w-[18px]" /> Rapid Rise System Layer</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">The system captures, routes, tracks, reminds, and reports so gaps stop depending on memory.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {systemSteps.map((step) => (
                <span key={step} className="rounded-full border border-cyan-300/36 bg-cyan-500/12 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-cyan-100">{step}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-cyan-200/14 bg-slate-950/52 p-4">
            <p className="text-sm leading-relaxed text-slate-300">Manual gaps do not look expensive until they repeat every day.</p>
            <Link href="/quote" className="mt-3 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 sm:w-auto">
              Find the leaks in your workflow <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <LeakTooltipPortal tooltip={tooltip} />

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .warning-scan,
          .system-sweep,
          .leak-dot-pulse,
          .system-layer-breathe {
            animation: none !important;
          }
        }
        .warning-scan {
          transform: translateX(-130%);
          animation: warningScan 1.25s ease-out 0.7s 1 forwards;
        }
        .system-sweep {
          transform: translateX(-120%);
          animation: systemSweep 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s 1 forwards;
        }
        .leak-dot-pulse {
          animation: leakPulse 4.8s ease-in-out infinite;
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
