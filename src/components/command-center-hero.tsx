'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChartColumn,
  Clock3,
  FileText,
  Inbox,
  Mail,
  MessageSquare,
  ShieldCheck,
  UserRound,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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

const activityEvents = [
  { text: 'New website enquiry captured', time: 'Just now', icon: Inbox, accent: 'text-accent-primary' },
  { text: 'Lead assigned to James', time: '2 min ago', icon: UserRound, accent: 'text-violet-400' },
  { text: 'Follow-up reminder triggered', time: '5 min ago', icon: CalendarClock, accent: 'text-amber-400' },
  { text: 'Quote moved to ready', time: '8 min ago', icon: FileText, accent: 'text-accent-success' },
  { text: 'Dashboard updated', time: '12 min ago', icon: Activity, accent: 'text-accent-primary' },
];

const overviewCards = [
  { label: 'Avg First Response', value: '18 min', color: 'from-emerald-500/30 to-transparent' },
  { label: 'Leads Captured', value: '43', color: 'from-blue-500/30 to-transparent' },
  { label: 'Quotes In Progress', value: '6', color: 'from-violet-500/30 to-transparent' },
];

const connectedTools = ['Website', 'Email', 'WhatsApp', 'Sheets', 'Drive', 'Calendar', 'Portal'];

const impactMetrics = [
  { value: '+320 hrs', label: 'Admin time saved each month', icon: Clock3, accent: 'text-slate-300' },
  { value: '3.4x', label: 'Faster response time on average', icon: ArrowRight, accent: 'text-accent-success' },
  { value: '+58%', label: 'More leads followed up', icon: Users, accent: 'text-violet-400' },
  { value: '100%', label: 'Visibility across your operations', icon: ShieldCheck, accent: 'text-accent-primary' },
];

function CountUp({
  end,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  reduceMotion = false,
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  reduceMotion?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
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
  }, [end, duration, reduceMotion]);

  return <>{prefix}{value.toFixed(decimals)}{suffix}</>;
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

function WorkflowOverview({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Workflow Overview</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * index }}
              className="rounded-2xl border border-border-subtle bg-surface-primary/70 p-3 text-center transition hover:-translate-y-0.5 hover:border-border-blue"
            >
              <div className="relative">
                {step.count ? <span className="absolute -right-1.5 -top-2 rounded-full border border-border-blue bg-background-primary px-2 text-xs font-semibold text-accent-primary">{step.count}</span> : <span className="absolute -right-1.5 -top-2 rounded-full border border-emerald-400/70 bg-emerald-500/15 p-1"><BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /></span>}
                <Icon className="mx-auto h-6 w-6 text-accent-primary" aria-hidden />
              </div>
              <p className="mt-2 text-sm font-medium text-text-primary">{step.label}</p>
              <p className={cn('mt-1 text-xs', step.final ? 'text-emerald-300' : 'text-text-secondary')}>{step.status}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ResponseTimeChart({ reduceMotion }: { reduceMotion: boolean }) {
  const path = useMemo(() => chartPath(responseHours), []);
  const points = responseHours.map((h, i) => ({ x: 24 + i * 52, y: 148 - (h / 3) * 118 }));

  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">First Response Time</p>
      <p className="mt-1 text-sm text-text-secondary">Last 7 days</p>
      <p className="mt-2 text-4xl font-semibold"><CountUp end={18} suffix=" min" reduceMotion={reduceMotion} /></p>
      <p className="mt-1 text-sm text-emerald-300">72% improvement</p>
      <svg viewBox="0 0 360 170" className="mt-3 h-44 w-full" role="img" aria-label="Response time trend from Monday to Sunday decreasing from 3 hours to point 2 hours">
        {[0, 1, 2, 3].map((row) => (
          <line key={row} x1="24" y1={30 + row * 39} x2="336" y2={30 + row * 39} stroke="rgba(255,255,255,0.07)" />
        ))}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#rr-chart-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        {points.map((point, i) => (
          <circle key={dayLabels[i]} cx={point.x} cy={point.y} r="3.2" fill="rgba(58,154,255,1)" />
        ))}
        <defs>
          <linearGradient id="rr-chart-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <text x="4" y="33" fill="rgba(255,255,255,0.55)" fontSize="11">3h</text>
        <text x="4" y="72" fill="rgba(255,255,255,0.55)" fontSize="11">2h</text>
        <text x="4" y="111" fill="rgba(255,255,255,0.55)" fontSize="11">1h</text>
        <text x="8" y="149" fill="rgba(255,255,255,0.55)" fontSize="11">0</text>
        {dayLabels.map((day, i) => (
          <text key={day} x={22 + i * 52} y="166" fill="rgba(255,255,255,0.55)" fontSize="11">{day}</text>
        ))}
      </svg>
    </div>
  );
}

function ActivityFeed({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Activity Feed</p>
      <div className="mt-3 space-y-2">
        {activityEvents.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.text}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/5 px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-background-primary/80', event.accent)}><Icon className="h-4 w-4" aria-hidden /></span>
                <p className="text-sm text-text-primary">{event.text}</p>
              </div>
              <p className="text-xs text-text-muted">{event.time}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TodayOverview() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Today’s Overview</p>
      <div className="mt-3 space-y-2.5">
        {overviewCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border-subtle bg-background-primary/70 p-3">
            <p className="text-sm text-text-secondary">{card.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-4xl font-semibold text-text-primary">
                {card.label === 'Avg First Response' ? <CountUp end={18} suffix=" min" reduceMotion={Boolean(reduceMotion)} /> : null}
                {card.label === 'Leads Captured' ? <CountUp end={43} reduceMotion={Boolean(reduceMotion)} /> : null}
                {card.label === 'Quotes In Progress' ? <CountUp end={6} reduceMotion={Boolean(reduceMotion)} /> : null}
              </p>
              <div className={cn('h-10 w-20 rounded-lg bg-gradient-to-r', card.color)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectedTools() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background-secondary/35 p-4">
      <p className="text-system-eyebrow text-text-muted">Connected Tools</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {connectedTools.map((tool) => (
          <span key={tool} className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background-primary/70 px-3 py-1.5 text-sm text-text-secondary transition hover:border-border-blue hover:text-text-primary">
            {tool === 'Email' ? <Mail className="h-3.5 w-3.5" aria-hidden /> : null}
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CommandCenterHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home-hero" className="hero-padding relative overflow-hidden pb-10 pt-8 lg:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-background-primary" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div className="pointer-events-none absolute right-[10%] top-[24%] h-[520px] w-[520px] rounded-full bg-glow-blue blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,124,255,0.35),transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-[1520px] px-6 md:px-10">
        <div className="grid items-start gap-12 xl:grid-cols-[0.43fr_0.57fr]">
          <div>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} className="text-system-eyebrow text-accent-secondary">
              RAPID RISE AI COMMAND CENTER
            </motion.p>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 max-w-[13ch] text-[clamp(50px,5.5vw,78px)] font-[var(--font-jakarta)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
              Manual work is costing you
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent"> leads, time, and control.</span>
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-[54ch] text-[1.1rem] leading-8 text-text-secondary">
              We build automation systems, dashboards, portals, and workflow tools that help businesses respond faster, track work clearly, and operate with less chaos.
            </motion.p>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="group system-btn system-btn-primary px-7 py-4 text-base">
                Request a Quote
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/work" className="group system-btn system-btn-secondary px-7 py-4 text-base">View Work</Link>
            </motion.div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {trustPills.map((pill, index) => {
                const Icon = pill.icon;
                return (
                  <motion.div
                    key={pill.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.04 }}
                    className="rounded-xl border border-border-subtle bg-surface-primary/75 px-3 py-2"
                  >
                    <p className="inline-flex items-center gap-2 text-sm text-text-secondary"><Icon className={cn('h-4 w-4', pill.accent)} aria-hidden /> {pill.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-text-secondary">Trusted by South African businesses that need clearer systems.</p>
          </div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ delay: 0.12 }} className="mt-2 rounded-[30px] border border-border-blue/60 bg-surface-primary/80 p-5 shadow-[0_0_0_1px_rgba(45,124,255,0.4),0_0_38px_rgba(45,124,255,0.24)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                  <p className="text-[2rem] font-semibold leading-none tracking-tight">OPERATIONS COMMAND <span className="ml-2 text-base text-emerald-300">● Live system</span></p>
              </div>
              <p className="text-right text-sm text-text-muted">System live</p>
            </div>

            <div className="mt-4 space-y-4">
              <WorkflowOverview reduceMotion={Boolean(reduceMotion)} />

              <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr_0.78fr]">
                <ResponseTimeChart reduceMotion={Boolean(reduceMotion)} />
                <ActivityFeed reduceMotion={Boolean(reduceMotion)} />
                <TodayOverview />
              </div>

              <ConnectedTools />
            </div>
          </motion.div>
        </div>

        {/* Demo marketing metrics. Replace with verified values when approved. */}
        <div className="mt-8 grid gap-3 rounded-2xl border border-border-subtle bg-background-secondary/45 p-4 md:grid-cols-2 xl:grid-cols-4">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div key={metric.label} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.22 + index * 0.06 }} className="rounded-xl border border-border-subtle bg-background-primary/60 p-3">
                <Icon className={cn('h-6 w-6', metric.accent)} aria-hidden />
                <p className="mt-2 text-4xl font-semibold">
                  {metric.value === '+320 hrs' ? <CountUp end={320} prefix="+" suffix=" hrs" reduceMotion={Boolean(reduceMotion)} /> : null}
                  {metric.value === '3.4x' ? <CountUp end={3.4} decimals={1} suffix="x" reduceMotion={Boolean(reduceMotion)} /> : null}
                  {metric.value === '+58%' ? <CountUp end={58} prefix="+" suffix="%" reduceMotion={Boolean(reduceMotion)} /> : null}
                  {metric.value === '100%' ? <CountUp end={100} suffix="%" reduceMotion={Boolean(reduceMotion)} /> : null}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
