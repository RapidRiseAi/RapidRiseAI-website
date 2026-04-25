'use client';

import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChartColumn,
  CheckCircle2,
  Clock3,
  FileText,
  Folder,
  Globe,
  Inbox,
  LayoutPanelLeft,
  Mail,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Table2,
  TrendingUp,
  UserRound,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const trustPills = [
  { label: 'Response within 24h', icon: Zap, accent: 'text-accent-success' },
  { label: 'Clear scope', icon: ShieldCheck, accent: 'text-accent-primary' },
  { label: 'Handover ready', icon: FileText, accent: 'text-accent-secondary' },
  { label: 'Built around your tools', icon: Workflow, accent: 'text-accent-success' },
];

const workflowSteps = [
  { label: 'New Enquiry', status: 'Captured', count: 14, icon: MessageSquare },
  { label: 'Qualified', status: 'In Progress', count: 10, icon: UserRound },
  { label: 'Assigned', status: 'Active', count: 9, icon: Users },
  { label: 'Follow-up Set', status: 'Scheduled', count: 4, icon: CalendarClock },
  { label: 'Quote Ready', status: 'In Progress', count: 3, icon: FileText },
  { label: 'Visible', status: 'Live', count: null, icon: ChartColumn, final: true },
];

const responseHours = [3.0, 2.2, 1.6, 1.5, 1.1, 0.5, 0.2];
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const activityFeedPool = [
  { text: 'New website enquiry captured', time: 'Just now', icon: Inbox, accent: 'text-accent-primary' },
  { text: 'Lead assigned to James', time: '2 min ago', icon: UserRound, accent: 'text-violet-400' },
  { text: 'Follow-up reminder triggered', time: '5 min ago', icon: CalendarClock, accent: 'text-amber-400' },
  { text: 'Quote moved to ready', time: '8 min ago', icon: FileText, accent: 'text-accent-success' },
  { text: 'Dashboard updated', time: '12 min ago', icon: Activity, accent: 'text-accent-primary' },
  { text: 'Client reply received', time: '14 min ago', icon: MessageSquare, accent: 'text-sky-300' },
  { text: 'Task marked complete', time: '17 min ago', icon: CheckCircle2, accent: 'text-emerald-300' },
  { text: 'New quote request captured', time: '21 min ago', icon: FileText, accent: 'text-blue-300' },
  { text: 'Follow-up marked done', time: '26 min ago', icon: BadgeCheck, accent: 'text-lime-300' },
  { text: 'Portal status updated', time: '31 min ago', icon: ChartColumn, accent: 'text-cyan-300' },
];

const overviewCards = [
  {
    label: 'Avg First Response',
    value: '18 min',
    icon: Clock3,
    accent: 'text-emerald-300',
    stroke: '#34d399',
    points: [18, 16, 15, 13, 12, 10, 9],
  },
  {
    label: 'Leads Captured',
    value: '43',
    icon: TrendingUp,
    accent: 'text-cyan-300',
    stroke: '#38bdf8',
    points: [12, 14, 15, 19, 22, 26, 30],
  },
  {
    label: 'Quotes In Progress',
    value: '6',
    icon: FileText,
    accent: 'text-violet-300',
    stroke: '#a78bfa',
    points: [2, 3, 3, 4, 4, 5, 6],
  },
] as const;

const connectedTools = [
  { label: 'Website', icon: Globe },
  { label: 'Email', icon: Mail },
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'Sheets', icon: Table2 },
  { label: 'Drive', icon: Folder },
  { label: 'Calendar', icon: CalendarClock },
  { label: 'Portal', icon: LayoutPanelLeft },
] as const;

// Demo marketing metrics. Replace with verified values when approved.
const impactMetrics = [
  { value: '+320 hrs', label: 'Admin time saved each month', icon: Clock3, accent: 'text-slate-300', tag: 'Time', visual: 'ring' },
  { value: '3.4x', label: 'Faster response time on average', icon: ArrowRight, accent: 'text-accent-success', tag: 'Speed', visual: 'trend' },
  { value: '+58%', label: 'More leads followed up', icon: Users, accent: 'text-violet-300', tag: 'Follow-up', visual: 'bars' },
  { value: '100%', label: 'Visibility across your operations', icon: ShieldCheck, accent: 'text-accent-primary', tag: 'Visibility', visual: 'shield' },
] as const;

function useLoopPhase(durationMs: number, enabled: boolean, tickMs = 120) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setPhase(0);
      return;
    }
    const interval = window.setInterval(() => {
      setPhase((prev) => (prev + tickMs) % durationMs);
    }, tickMs);
    return () => window.clearInterval(interval);
  }, [durationMs, enabled, tickMs]);

  return phase;
}

function CountUp({
  end,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  reduceMotion = false,
  start = true,
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  reduceMotion?: boolean;
  start?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
    if (reduceMotion) {
      setValue(end);
      return;
    }
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, reduceMotion, start]);

  return (
    <>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

function chartPath(hours: number[]) {
  const points = hours.map((h, i) => ({ x: 24 + i * 52, y: 148 - (h / 3) * 118 }));
  return points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = points[index - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${point.x} ${point.y}`;
  }, '');
}

function sparklinePath(values: readonly number[], width = 106, height = 32) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));
  const path = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, '');
  return { path, points };
}

function LiveStatusPill({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-emerald-300">
      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
        {!reduceMotion ? (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60"
            animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        ) : null}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      Live system
    </span>
  );
}

function MobileCommandHeader({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="rounded-2xl border border-border-blue/55 bg-surface-primary/80 p-4 shadow-[0_0_0_1px_rgba(45,124,255,0.35),0_0_26px_rgba(45,124,255,0.16)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xl font-semibold tracking-tight text-text-primary">OPERATIONS COMMAND</p>
        <p className="text-xs text-text-muted">System live</p>
      </div>
      <div className="mt-2">
        <LiveStatusPill reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function WorkflowNode({
  step,
  index,
  reduceMotion,
  isActive,
}: {
  step: (typeof workflowSteps)[number];
  index: number;
  reduceMotion: boolean;
  isActive: boolean;
}) {
  const Icon = step.icon;
  const isInput = step.label === 'New Enquiry';
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index }}
      className={cn(
        'relative min-w-[138px] snap-start rounded-2xl border bg-surface-primary/80 px-3 py-3 text-center shadow-[0_10px_26px_rgba(5,14,40,0.26)] transition md:min-w-0',
        step.final
          ? 'border-emerald-300/35 shadow-[0_10px_26px_rgba(5,40,30,0.26)]'
          : isInput
          ? 'border-cyan-300/35 shadow-[0_10px_26px_rgba(5,24,40,0.28)]'
          : 'border-border-subtle',
        isActive && !reduceMotion && (step.final ? 'ring-1 ring-emerald-300/45' : 'ring-1 ring-accent-primary/40')
      )}
    >
      {!reduceMotion && isActive ? (
        <motion.span
          className={cn('pointer-events-none absolute inset-0 rounded-2xl', step.final ? 'bg-emerald-400/10' : 'bg-blue-400/10')}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.65, 0.12, 0.65] }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      ) : null}
      <div className="relative">
        {step.count ? (
          <span className="absolute -right-1.5 -top-2 rounded-full border border-border-blue bg-background-primary px-2 text-xs font-semibold text-accent-primary">
            {step.count}
          </span>
        ) : (
          <span className="absolute -right-1.5 -top-2 rounded-full border border-emerald-400/70 bg-emerald-500/15 p-1">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
          </span>
        )}
        <span className={cn('mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full border', step.final ? 'border-emerald-300/30 bg-emerald-500/10' : isInput ? 'border-cyan-300/30 bg-cyan-500/10' : 'border-blue-300/25 bg-blue-500/10')}>
          <Icon className={cn('h-[18px] w-[18px]', step.final ? 'text-emerald-300' : 'text-accent-primary')} aria-hidden />
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-text-primary">{step.label}</p>
      <p className={cn('mt-1 text-xs', step.final ? 'text-emerald-300' : 'text-text-secondary')}>{step.status}</p>
    </motion.div>
  );
}

function WorkflowOverview({ reduceMotion }: { reduceMotion: boolean }) {
  const phase = useLoopPhase(8000, !reduceMotion, 120);
  const activeIndex = reduceMotion ? -1 : Math.floor((phase / 8000) * workflowSteps.length);
  const activeStage = activeIndex <= 0 ? 0 : activeIndex <= 2 ? 1 : activeIndex <= 4 ? 2 : 3;

  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-system-eyebrow text-text-muted">Workflow Overview</p>
        <p className="text-xs text-cyan-200/80">Live workflow: captured, assigned, followed up, tracked</p>
      </div>

      <div className="relative mt-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
        <div className="relative flex min-w-[880px] snap-x snap-mandatory items-center gap-3 sm:gap-4 md:min-w-0 md:grid md:grid-cols-6 md:gap-3">
          <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-blue-500/70 via-cyan-300/55 to-emerald-400/60" />
          {workflowSteps.map((step, index) => (
            <div key={step.label} className="relative z-[2] flex-1 md:flex-none">
              <WorkflowNode step={step} index={index} reduceMotion={reduceMotion} isActive={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 hidden items-center gap-2 md:flex">
        {['Capture', 'Route', 'Action', 'Visibility'].map((stage, index) => (
          <div key={stage} className="flex flex-1 items-center gap-2">
            <span className={cn('h-1 flex-1 rounded-full border border-white/10', activeStage >= index && !reduceMotion ? 'bg-cyan-300/70' : 'bg-background-primary/80')} />
            <span className="text-[10px] uppercase tracking-[0.12em] text-text-muted">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponseTimeChart({ reduceMotion }: { reduceMotion: boolean }) {
  const path = useMemo(() => chartPath(responseHours), []);
  const points = responseHours.map((h, i) => ({ x: 24 + i * 52, y: 148 - (h / 3) * 118 }));

  return (
    <div className="relative rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/45 to-cyan-300/0" />
      <p className="text-system-eyebrow text-text-muted">First Response Time</p>
      <p className="mt-1 text-sm text-text-secondary">Last 7 days</p>
      <p className="mt-2 text-4xl font-semibold">
        <CountUp end={18} suffix=" min" reduceMotion={reduceMotion} />
      </p>
      <p className="mt-1 text-sm text-emerald-300">72% improvement</p>
      <svg viewBox="0 0 360 170" className="mt-2 h-52 w-full" role="img" aria-label="Response time trend from Monday to Sunday decreasing from 3 hours to point 2 hours">
        {[0, 1, 2, 3].map((row) => (
          <line key={row} x1="24" y1={30 + row * 39} x2="336" y2={30 + row * 39} stroke="rgba(255,255,255,0.07)" />
        ))}

        <path d={`${path} L 336 148 L 24 148 Z`} fill="url(#rr-chart-fill)" opacity="0.65" />

        <motion.path
          d={path}
          fill="none"
          stroke="url(#rr-chart-gradient)"
          strokeWidth="3.8"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.86, 1, 0.86] }}
          transition={{ pathLength: { duration: 1.1, ease: 'easeOut' }, opacity: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } }}
        />

        {points.map((point, i) => (
          <g key={dayLabels[i]}>
            <circle cx={point.x} cy={point.y} r={i === points.length - 1 ? '4.1' : '3.2'} fill="rgba(56,189,248,1)" />
            <circle cx={point.x} cy={point.y} r={i === points.length - 1 ? '7' : '5.8'} fill="rgba(56,189,248,0.18)" />
          </g>
        ))}

        {!reduceMotion ? (
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="7.5"
            fill="rgba(56,189,248,0.24)"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}

        <text x={points[points.length - 1].x - 14} y={points[points.length - 1].y - 12} fill="rgba(125,211,252,0.95)" fontSize="10" fontWeight="600">
          18 min
        </text>

        <defs>
          <linearGradient id="rr-chart-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="rr-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,0.25)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
        </defs>

        <text x="4" y="33" fill="rgba(255,255,255,0.55)" fontSize="11">
          3h
        </text>
        <text x="4" y="72" fill="rgba(255,255,255,0.55)" fontSize="11">
          2h
        </text>
        <text x="4" y="111" fill="rgba(255,255,255,0.55)" fontSize="11">
          1h
        </text>
        <text x="8" y="149" fill="rgba(255,255,255,0.55)" fontSize="11">
          0
        </text>
        {dayLabels.map((day, i) => (
          <text key={day} x={22 + i * 52} y="166" fill="rgba(255,255,255,0.55)" fontSize="11">
            {day}
          </text>
        ))}
      </svg>
    </div>
  );
}

function ActivityFeed({ reduceMotion, mobileRows = 4 }: { reduceMotion: boolean; mobileRows?: number }) {
  const [rows, setRows] = useState(activityFeedPool.slice(0, 5));
  const [highlightedRow, setHighlightedRow] = useState(0);
  const cursorRef = useRef(5);
  const rowRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      setRows(activityFeedPool.slice(0, 5));
      cursorRef.current = 5;
      rowRef.current = 0;
      setHighlightedRow(-1);
      return;
    }

    let timeoutId: number | undefined;
    const interval = window.setInterval(() => {
      rowRef.current = (rowRef.current + 1) % 4;
      const targetRow = rowRef.current;
      setRows((prev) => {
        const next = [...prev];
        next[targetRow] = activityFeedPool[cursorRef.current % activityFeedPool.length];
        cursorRef.current += 1;
        return next;
      });
      setHighlightedRow(targetRow);
      timeoutId = window.setTimeout(() => setHighlightedRow(-1), 900);
    }, 6000);

    return () => {
      window.clearInterval(interval);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-system-eyebrow text-text-muted">Activity Feed</p>
        <p className="text-[11px] text-cyan-200/75">Live updates</p>
      </div>
      <div className="mt-3 grid gap-2">
        {rows.slice(0, 4).map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={`feed-row-${index}`}
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: highlightedRow === index ? [0.72, 1] : 1, y: highlightedRow === index ? [2, 0] : 0 }
              }
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className={cn(
                'flex min-h-[56px] items-center justify-between gap-4 rounded-xl border border-white/5 px-3 py-2.5',
                highlightedRow === index && !reduceMotion && 'bg-blue-500/10',
                index >= mobileRows && 'hidden sm:flex',
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-background-primary/80', event.accent)}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-sm text-text-primary">{event.text}</p>
              </div>
              <p className="w-14 text-right text-xs text-text-muted">{event.time}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function OverviewSparkline({
  points,
  stroke,
  reduceMotion,
}: {
  points: readonly number[];
  stroke: string;
  reduceMotion: boolean;
}) {
  const { path, points: plotPoints } = useMemo(() => sparklinePath(points), [points]);
  const phase = useLoopPhase(9000, !reduceMotion, 120);
  const progress = phase / 9000;
  const marker = plotPoints[Math.min(plotPoints.length - 1, Math.floor(progress * plotPoints.length))];

  return (
    <svg viewBox="0 0 106 32" className="h-8 w-[106px]" aria-hidden>
      <path d={path} fill="none" stroke={`${stroke}1f`} strokeWidth="8" strokeLinecap="round" />
      <path d={path} fill="none" stroke={`${stroke}33`} strokeWidth="4" strokeLinecap="round" />
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      {!reduceMotion ? <circle cx={marker.x} cy={marker.y} r="2.8" fill={stroke} opacity="0.9" /> : null}
    </svg>
  );
}

function TodayOverviewCards({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Today’s Overview</p>
      <div className="mt-3 space-y-2.5">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="min-h-[116px] rounded-xl border border-border-subtle bg-background-primary/75 p-3 shadow-[0_8px_24px_rgba(5,14,40,0.22)]">
              <div className="flex items-center justify-between gap-2">
                <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
                  <Icon className={cn('h-3.5 w-3.5', card.accent)} aria-hidden />
                  {card.label}
                </p>
                <div className="rounded-md bg-background-secondary/50 px-1 py-0.5 shadow-[0_0_14px_rgba(56,189,248,0.12)]">
                  <OverviewSparkline points={card.points} stroke={card.stroke} reduceMotion={reduceMotion} />
                </div>
              </div>
              <p className="mt-1.5 text-4xl font-semibold text-text-primary">
                {card.label === 'Avg First Response' ? <CountUp end={18} suffix=" min" reduceMotion={reduceMotion} /> : null}
                {card.label === 'Leads Captured' ? <CountUp end={43} reduceMotion={reduceMotion} /> : null}
                {card.label === 'Quotes In Progress' ? <CountUp end={6} reduceMotion={reduceMotion} /> : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConnectedTools({ reduceMotion }: { reduceMotion: boolean }) {
  const tickerTools = [
    ...connectedTools,
    { label: 'Dashboard', icon: LayoutPanelLeft },
    { label: 'Quotes', icon: FileText },
    { label: 'Forms', icon: FileText },
    { label: 'Support', icon: MessageSquare },
    { label: 'Workflows', icon: Workflow },
  ] as const;
  const rowTop = tickerTools.slice(0, 6);
  const rowBottom = tickerTools.slice(6);
  const rowA = [...rowTop, ...rowTop];
  const rowB = [...rowBottom, ...rowBottom];

  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Connected stack</p>
      <p className="mt-1 text-xs text-text-secondary">Works with the tools you already use.</p>
      <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_70%)] py-2 sm:hidden">
        {reduceMotion ? (
          <div className="flex flex-wrap gap-2 px-2">
            {tickerTools.slice(0, 10).map((tool) => {
              const Icon = tool.icon;
              return (
                <span key={tool.label} className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-background-primary/75 px-3 py-1.5 text-xs text-text-secondary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {tool.label}
                </span>
              );
            })}
          </div>
        ) : (
          <motion.div className="flex w-max gap-2 px-1" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 36, ease: 'linear', repeat: Infinity }}>
            {[...tickerTools, ...tickerTools].map((tool, index) => {
              const Icon = tool.icon;
              return (
                <span key={`m-${tool.label}-${index}`} className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-background-primary/75 px-3 py-1.5 text-xs text-text-secondary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {tool.label}
                </span>
              );
            })}
          </motion.div>
        )}
      </div>
      <div className="relative mt-3 hidden overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_70%)] py-2 sm:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-background-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-background-primary to-transparent" />
        <motion.div
          className="flex w-max gap-2"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        >
          {rowA.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <span key={`a-${tool.label}-${index}`} className="inline-flex min-w-[118px] items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-background-primary/78 px-4 py-2 text-xs text-text-secondary transition hover:border-cyan-300/55 hover:text-cyan-100 hover:shadow-[0_0_12px_rgba(56,189,248,0.18)]">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tool.label}
              </span>
            );
          })}
        </motion.div>
        <motion.div
          className="mt-2 flex w-max gap-2"
          animate={reduceMotion ? undefined : { x: ['-50%', '0%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          {rowB.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <span key={`b-${tool.label}-${index}`} className="inline-flex min-w-[118px] items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-background-primary/72 px-4 py-2 text-xs text-text-secondary transition hover:border-cyan-300/55 hover:text-cyan-100 hover:shadow-[0_0_12px_rgba(56,189,248,0.18)]">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tool.label}
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function ImpactMetrics({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="mt-12 rounded-2xl border border-border-subtle bg-background-secondary/45 p-4 lg:mt-14">
      <p className="mb-3 text-system-eyebrow text-text-muted">Impact snapshot</p>
      <div className="grid grid-cols-1 gap-3 [@media(min-width:390px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {impactMetrics.map((metric, index) => (
          <ImpactMetricCard key={metric.label} metric={metric} index={index} reduceMotion={reduceMotion} />
        ))}
      </div>
    </div>
  );
}

function MobileHeroDashboard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="mt-8 space-y-4 lg:hidden">
      <MobileCommandHeader reduceMotion={reduceMotion} />
      <WorkflowOverview reduceMotion={reduceMotion} />
      <ResponseTimeChart reduceMotion={reduceMotion} />
      <ActivityFeed reduceMotion={reduceMotion} mobileRows={3} />
      <TodayOverviewCards reduceMotion={reduceMotion} />
      <ConnectedTools reduceMotion={reduceMotion} />
    </div>
  );
}

function DesktopHeroDashboard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ delay: 0.12 }}
      className="relative mt-2 hidden w-full max-w-[930px] rounded-[30px] border border-border-blue/60 bg-surface-primary/80 p-6 shadow-[0_0_0_1px_rgba(45,124,255,0.4),0_0_30px_rgba(45,124,255,0.2)] backdrop-blur-xl lg:block xl:ml-auto xl:p-6 2xl:p-7"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10" />
      <div className="pointer-events-none absolute left-10 right-10 top-0 h-10 rounded-full bg-gradient-to-b from-white/8 to-transparent" />
      {!reduceMotion ? (
        <motion.div
          className="pointer-events-none absolute inset-3 rounded-[24px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.2),rgba(2,6,23,0))]"
          animate={{ opacity: [0.14, 0.24, 0.14], scale: [0.995, 1.015, 0.995] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[2rem] font-semibold leading-none tracking-tight">
            OPERATIONS COMMAND <span className="ml-2 align-middle"><LiveStatusPill reduceMotion={reduceMotion} /></span>
          </p>
        </div>
        <p className="text-right text-sm text-text-muted">System live</p>
      </div>

      <div className="relative mt-4 space-y-4">
        <WorkflowOverview reduceMotion={reduceMotion} />

        <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr_0.75fr]">
          <ResponseTimeChart reduceMotion={reduceMotion} />
          <ActivityFeed reduceMotion={reduceMotion} />
          <TodayOverviewCards reduceMotion={reduceMotion} />
        </div>

        <ConnectedTools reduceMotion={reduceMotion} />
      </div>
    </motion.div>
  );
}

function ImpactMicroVisual({
  type,
  reduceMotion,
}: {
  type: 'ring' | 'trend' | 'bars' | 'shield';
  reduceMotion: boolean;
}) {
  if (type === 'ring') {
    return (
      <svg viewBox="0 0 30 30" className="h-7 w-7" aria-hidden>
        <circle cx="15" cy="15" r="10.5" stroke="rgba(125,211,252,0.28)" strokeWidth="2" fill="none" />
        <motion.circle
          cx="15"
          cy="15"
          r="10.5"
          stroke="rgba(56,189,248,0.95)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="48 18"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          style={{ transformOrigin: '15px 15px' }}
        />
      </svg>
    );
  }

  if (type === 'trend') {
    return (
      <svg viewBox="0 0 30 30" className="h-7 w-7" aria-hidden>
        <path d="M4 21 L12 16 L18 18 L26 10" stroke="rgba(74,222,128,0.9)" strokeWidth="2" fill="none" />
        {!reduceMotion ? <motion.circle cx="26" cy="10" r="2" fill="rgba(74,222,128,0.95)" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 12, repeat: Infinity }} /> : null}
      </svg>
    );
  }

  if (type === 'bars') {
    return (
      <svg viewBox="0 0 30 30" className="h-7 w-7" aria-hidden>
        {[8, 13, 18].map((h, i) => (
          <motion.rect
            key={h}
            x={6 + i * 7}
            y={24 - h}
            width="4"
            height={h}
            rx="1"
            fill="rgba(167,139,250,0.9)"
            animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 12, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 30 30" className="h-7 w-7" aria-hidden>
      <circle cx="15" cy="15" r="10.5" stroke="rgba(96,165,250,0.28)" strokeWidth="2" fill="none" />
      <path d="M15 6 L22 9 V14 C22 18 19 21 15 24 C11 21 8 18 8 14 V9 Z" fill="rgba(59,130,246,0.4)" />
      {!reduceMotion ? <motion.circle cx="15" cy="15" r="12" stroke="rgba(96,165,250,0.65)" strokeWidth="1" fill="none" animate={{ opacity: [0.15, 0.55, 0.15] }} transition={{ duration: 12, repeat: Infinity }} /> : null}
    </svg>
  );
}

function ImpactMetricCard({
  metric,
  index,
  reduceMotion,
}: {
  metric: (typeof impactMetrics)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = metric.icon;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ delay: 0.08 * index }}
      className="relative flex min-h-[146px] flex-col rounded-xl border border-border-subtle bg-background-primary/60 p-3 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]"
    >
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/60 to-cyan-300/0" />
      <span className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-background-secondary/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted">
        {metric.tag}
      </span>
      <div className="mt-2 flex items-center justify-between">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-background-secondary/70">
        <span className="pointer-events-none absolute inset-0 rounded-md bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)]" />
        <Icon className={cn('h-5.5 w-5.5', metric.accent)} aria-hidden />
      </span>
      <ImpactMicroVisual type={metric.visual} reduceMotion={reduceMotion} />
      </div>
      <p className="mt-2 text-[2.55rem] font-semibold leading-none">
        {metric.value === '+320 hrs' ? <CountUp end={320} prefix="+" suffix=" hrs" reduceMotion={reduceMotion} start={inView} /> : null}
        {metric.value === '3.4x' ? <CountUp end={3.4} decimals={1} suffix="x" reduceMotion={reduceMotion} start={inView} /> : null}
        {metric.value === '+58%' ? <CountUp end={58} prefix="+" suffix="%" reduceMotion={reduceMotion} start={inView} /> : null}
        {metric.value === '100%' ? <CountUp end={100} suffix="%" reduceMotion={reduceMotion} start={inView} /> : null}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{metric.label}</p>
    </motion.div>
  );
}

export function CommandCenterHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home-hero" className="hero-padding relative overflow-x-clip overflow-y-visible pb-10 pt-8 lg:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-background-primary" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,124,255,0.35),transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-[1520px] px-6 md:px-10 xl:px-14 2xl:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(520px,0.9fr)_minmax(820px,1.25fr)] lg:gap-14 xl:grid-cols-[minmax(560px,0.9fr)_minmax(860px,1.3fr)] xl:gap-16 2xl:gap-20">
          <div className="min-w-0 xl:min-w-[400px]">
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} className="text-system-eyebrow text-accent-secondary">
              RAPID RISE AI COMMAND CENTER
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-3 max-w-[620px] text-[clamp(3.05rem,7vw,4.25rem)] font-[var(--font-jakarta)] font-semibold leading-[0.98] tracking-[-0.028em] text-white md:text-[clamp(3.45rem,5.2vw,4.95rem)] 2xl:text-[clamp(4rem,5vw,5.4rem)]"
            >
              Manual work is costing you
              <span className="bg-gradient-to-r from-[#67e8f9] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent"> leads, time, and control.</span>
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-7 max-w-[520px] text-[1.1rem] leading-8 text-text-secondary">
              We build automation systems, dashboards, portals, and workflow tools that help businesses respond faster, track work clearly, and operate with less chaos.
            </motion.p>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-8 flex flex-col gap-3 [@media(min-width:390px)]:flex-row">
              <Link href="/quote" className="group system-btn system-btn-primary w-full justify-center px-7 py-4 text-base [@media(min-width:390px)]:w-auto">
                Request a Quote
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: [0, 0, 0, 2, 0],
                        }
                  }
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </motion.span>
              </Link>
              <Link href="/work" className="group system-btn system-btn-secondary w-full justify-center px-7 py-4 text-base [@media(min-width:390px)]:w-auto">
                View Work
              </Link>
            </motion.div>

            <div className="mt-6 grid gap-2.5 [@media(min-width:390px)]:grid-cols-2">
              {trustPills.map((pill, index) => {
                const Icon = pill.icon;
                return (
                  <motion.div
                    key={pill.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.04 }}
                    className="rounded-xl border border-border-subtle bg-surface-primary/80 px-3.5 py-2.5 shadow-[0_8px_18px_rgba(3,10,25,0.25)] backdrop-blur-[2px]"
                  >
                    <p className="inline-flex items-center gap-2.5 text-sm text-text-secondary">
                      <Icon className={cn('h-[18px] w-[18px]', pill.accent)} aria-hidden /> {pill.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-7 max-w-[560px] text-sm text-text-secondary">Built for South African businesses that need faster response, cleaner tracking, and less manual admin.</p>
          </div>

          <MobileHeroDashboard reduceMotion={Boolean(reduceMotion)} />
          <DesktopHeroDashboard reduceMotion={Boolean(reduceMotion)} />
        </div>

        <ImpactMetrics reduceMotion={Boolean(reduceMotion)} />
      </div>
    </section>
  );
}
