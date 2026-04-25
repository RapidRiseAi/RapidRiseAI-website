'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, CircleDot } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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

function FloatingSystemCard({ text, index, reduceMotion }: { text: string; index: number; reduceMotion: boolean }) {
  const drift = useMemo(() => [0, -2 - (index % 3), 0], [index]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 0.45 + index * 0.05 }}
      className="rounded-xl border border-border-subtle bg-surface-primary/85 px-3 py-2 text-xs text-text-secondary"
    >
      <motion.div animate={reduceMotion ? undefined : { y: drift }} transition={{ duration: 5 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-accent-success" /> {text}</span>
      </motion.div>
    </motion.div>
  );
}

function MotionConnector({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 440 280" className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-85" aria-hidden>
      {[
        'M40 62 C150 62, 160 110, 220 112',
        'M35 210 C140 200, 155 164, 220 156',
        'M400 84 C300 84, 290 120, 220 126',
        'M398 226 C300 220, 282 170, 220 164',
      ].map((d, idx) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(103,217,255,0.45)"
            strokeWidth="1.4"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.72 + idx * 0.08, duration: 0.55 }}
          />
          {!reduceMotion ? (
            <motion.circle
              r="2.4"
              fill="rgba(45,124,255,0.95)"
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{ duration: 3.8 + idx * 0.4, repeat: Infinity, ease: 'linear', delay: idx * 0.22 }}
              style={{ offsetPath: `path('${d}')` as any }}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

export function CommandCenterHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home-hero" className="hero-padding relative overflow-hidden border-b border-border-subtle">
      <div className="pointer-events-none absolute inset-0 bg-background-primary" />
      <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: 1 }} className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      <div className="pointer-events-none absolute left-[56%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-glow-blue blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(90deg,transparent,rgba(103,217,255,0.22),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-content items-center gap-7 px-4 md:px-8 lg:grid-cols-[0.45fr_0.55fr]">
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

        <div className="order-2 relative xl:px-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="relative z-[2] rounded-[24px] border border-border-blue/45 bg-surface-primary/85 p-4 shadow-[0_0_0_1px_rgba(45,124,255,0.36),0_0_36px_rgba(45,124,255,0.22)]"
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
              <svg viewBox="0 0 240 52" className="mt-2 h-12 w-full" aria-hidden>
                <polyline points="0,36 32,32 64,34 96,22 128,26 160,18 192,20 224,10 240,14" fill="none" stroke="rgba(103,217,255,0.82)" strokeWidth="2" />
                <polyline points="0,44 32,40 64,43 96,36 128,38 160,28 192,30 224,22 240,24" fill="none" stroke="rgba(45,124,255,0.62)" strokeWidth="2" />
              </svg>
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

            <MotionConnector reduceMotion={Boolean(reduceMotion)} />
          </motion.div>

          <div className="pointer-events-none absolute -left-16 top-10 hidden w-[200px] space-y-2 xl:block">
            {floatingEvents.slice(0, 3).map((event, index) => (
              <FloatingSystemCard key={event} text={event} index={index} reduceMotion={Boolean(reduceMotion)} />
            ))}
          </div>

          <div className="pointer-events-none absolute -right-16 bottom-10 hidden w-[200px] space-y-2 xl:block">
            {floatingEvents.slice(3).map((event, index) => (
              <FloatingSystemCard key={event} text={event} index={index + 3} reduceMotion={Boolean(reduceMotion)} />
            ))}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:hidden">
            {floatingEvents.map((event, index) => (
              <FloatingSystemCard key={event} text={event} index={index} reduceMotion={Boolean(reduceMotion)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
