'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, CircleDot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'Leads captured', value: '128' },
  { label: 'Avg response', value: '4 min' },
  { label: 'Tasks routed', value: '94%' },
  { label: 'Quotes ready', value: '36' },
];

const toolPills = ['Website', 'Email', 'WhatsApp', 'Sheets', 'Drive', 'Calendar', 'Portal'];

const floatingEvents = [
  'New enquiry captured',
  'Auto reply sent',
  'Owner assigned',
  'Follow-up scheduled',
  'Quote ready',
  'Dashboard updated',
];

const activityFeed = [
  'New lead • Assigned',
  'Follow-up • Sent',
  'Quote • Ready',
  'Tracked • Dashboard synced',
  'Client reply • Logged',
  'Ready • Next action queued',
];

const chartSeries = [
  {
    primary: [18, 22, 20, 30, 28, 36, 34, 42, 40, 48],
    secondary: [14, 17, 16, 21, 25, 29, 33, 37, 35, 41],
  },
  {
    primary: [16, 18, 24, 22, 30, 33, 31, 40, 44, 46],
    secondary: [11, 13, 17, 19, 23, 27, 30, 33, 37, 39],
  },
  {
    primary: [20, 24, 26, 25, 34, 32, 38, 43, 41, 49],
    secondary: [12, 16, 18, 22, 20, 26, 31, 34, 36, 38],
  },
];

function pointsToPath(values: number[]) {
  const step = 240 / (values.length - 1);
  const points = values.map((v, i) => ({ x: Math.round(i * step), y: 72 - v }));
  if (points.length < 2) return '';

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    path += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
  }
  const last = points[points.length - 1];
  path += ` T ${last.x} ${last.y}`;
  return path;
}

function StatusPill({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-secondary/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-text2', className)}>
      {children}
    </span>
  );
}

function MiniMetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-background-secondary/65 p-2.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">{label}</p>
      <p className="mt-1 text-base font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function ActivityFeed({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % activityFeed.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="rounded-xl border border-border-subtle bg-background-secondary/55 p-3">
      <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Activity feed</p>
      <motion.p
        key={active}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="mt-2 text-sm text-text-secondary"
      >
        {activityFeed[active]}
      </motion.p>
    </div>
  );
}

function AnimatedChart({ reduceMotion }: { reduceMotion: boolean }) {
  const [seriesIndex, setSeriesIndex] = useState(0);
  const series = chartSeries[seriesIndex];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSeriesIndex((prev) => (prev + 1) % chartSeries.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const primaryPath = pointsToPath(series.primary);
  const secondaryPath = pointsToPath(series.secondary);

  return (
    <svg viewBox="0 0 240 72" className="mt-2 h-20 w-full" aria-hidden>
      <motion.path
        key={`p-${seriesIndex}`}
        d={primaryPath}
        fill="none"
        stroke="rgba(103,217,255,0.9)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0.2, opacity: 0.45 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        key={`s-${seriesIndex}`}
        d={secondaryPath}
        fill="none"
        stroke="rgba(45,124,255,0.7)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0.2, opacity: 0.35 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.08 }}
      />
      {!reduceMotion ? (
        <motion.circle
          r="2.4"
          fill="rgba(103,217,255,0.95)"
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
          style={{ offsetPath: `path('${primaryPath}')` as any }}
        />
      ) : null}
    </svg>
  );
}

function EventCyclePanel({ reduceMotion }: { reduceMotion: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % floatingEvents.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = floatingEvents[index];
  const next = floatingEvents[(index + 1) % floatingEvents.length];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <motion.div
        key={active}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="rounded-xl border border-border-subtle bg-surface-primary/75 p-3"
      >
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Live event</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary">
          <CheckCircle2 className="h-4 w-4 text-accent-success" /> {active}
        </p>
      </motion.div>
      <div className="rounded-xl border border-border-subtle bg-background-secondary/55 p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Next in queue</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary">
          <CircleDot className="h-4 w-4 text-accent-primary" /> {next}
        </p>
      </div>
    </div>
  );
}

export function CommandCenterHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home-hero" className="hero-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-background-primary" />
      <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: 1 }} className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      <div className="pointer-events-none absolute left-[56%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-glow-blue blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,transparent,rgba(103,217,255,0.14),transparent)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-74px)] w-full max-w-[1700px] items-center gap-8 px-6 md:px-9 xl:px-12 lg:grid-cols-[0.43fr_0.57fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          className="order-1"
        >
          <p className="text-system-eyebrow text-accent-secondary">Rapid Rise AI Command Center</p>
          <h1 className="mt-3 max-w-2xl font-[var(--font-jakarta)] text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Manual work is costing you leads, time, and control.
          </h1>
          <p className="mt-4 max-w-xl text-system-body text-text-secondary">
            Rapid Rise AI builds automation systems, dashboards, portals, and workflow tools that help businesses respond faster, track better, and operate with less chaos.
          </p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link href="/quote" className="group system-btn system-btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link href="/work" className="group system-btn system-btn-secondary">View Work</Link>
          </motion.div>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill><CircleDot className="h-3.5 w-3.5 text-accent-success" /> Response within 24h</StatusPill>
            <StatusPill>Clear scope</StatusPill>
            <StatusPill>Handover ready</StatusPill>
            <StatusPill>Built around your tools</StatusPill>
          </div>
        </motion.div>

        <div className="order-2 relative">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="relative z-[2] rounded-[24px] border border-border-blue/45 bg-surface-primary/85 p-5 shadow-[0_0_0_1px_rgba(45,124,255,0.36),0_0_36px_rgba(45,124,255,0.22)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-system-micro text-accent-secondary">Operations Command</p>
                <p className="mt-1 text-sm text-text-secondary">Status: Live system</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background-secondary/60 px-2 py-1 text-[11px] text-text-secondary">
                <Activity className="h-3.5 w-3.5 text-accent-primary" /> Live system
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {metrics.map((metric) => <MiniMetricCard key={metric.label} label={metric.label} value={metric.value} />)}
            </div>

            <div className="mt-3 rounded-xl border border-border-subtle bg-background-secondary/55 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Mini activity graph</p>
              <AnimatedChart reduceMotion={Boolean(reduceMotion)} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {['New lead', 'Assigned', 'Follow-up', 'Quote', 'Tracked', 'Ready'].map((item) => (
                <div key={item} className="rounded-lg border border-border-subtle bg-background-secondary/60 px-2 py-1.5 text-center text-[11px] text-text-secondary">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <ActivityFeed reduceMotion={Boolean(reduceMotion)} />
              <div className="rounded-xl border border-border-subtle bg-background-secondary/55 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Tool connections</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {toolPills.map((pill) => <span key={pill} className="rounded-full border border-border-subtle bg-background-primary/70 px-2 py-1 text-[11px] text-text-secondary">{pill}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mt-3">
            <EventCyclePanel reduceMotion={Boolean(reduceMotion)} />
          </div>
        </div>
      </div>
    </section>
  );
}
