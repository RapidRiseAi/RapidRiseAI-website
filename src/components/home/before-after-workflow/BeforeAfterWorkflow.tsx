'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Activity, AlertTriangle, BellRing, Copy, Eye, FileText, Gauge, Route, UserX, CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';

const beforeItems = [
  { label: 'Leads wait', icon: AlertTriangle },
  { label: 'Data copied by hand', icon: Copy },
  { label: 'No single owner', icon: UserX },
  { label: 'Follow-ups forgotten', icon: BellRing },
  { label: 'Files scattered', icon: FileText },
  { label: 'Status unclear', icon: Eye },
  { label: 'Reports missing', icon: Gauge },
];

const afterItems = [
  { label: 'Captured', icon: CheckCircle2 },
  { label: 'Assigned', icon: CheckCircle2 },
  { label: 'Tracked', icon: CheckCircle2 },
  { label: 'Reminded', icon: CheckCircle2 },
  { label: 'Stored', icon: CheckCircle2 },
  { label: 'Reported', icon: CheckCircle2 },
  { label: 'Visible', icon: CheckCircle2 },
];

function WorkflowNode({ label, icon: Icon, tone }: { label: string; icon: typeof Activity; tone: 'before' | 'after' }) {
  const beforeTone = tone === 'before';
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs ${
        beforeTone
          ? 'border-amber-300/26 bg-[rgba(42,18,12,0.42)] text-amber-100/90'
          : 'border-cyan-300/30 bg-cyan-500/10 text-cyan-100'
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${beforeTone ? 'text-amber-300/90' : 'text-cyan-200'}`} />
      <span>{label}</span>
    </div>
  );
}

function WorkflowSide({ title, tone, children }: { title: string; tone: 'before' | 'after'; children: ReactNode }) {
  const beforeTone = tone === 'before';
  return (
    <div
      className={`relative rounded-[26px] border p-5 lg:p-6 ${
        beforeTone
          ? 'border-amber-300/16 bg-[linear-gradient(170deg,rgba(22,10,8,0.72),rgba(8,13,24,0.9))]'
          : 'border-cyan-300/24 bg-[linear-gradient(170deg,rgba(8,20,42,0.72),rgba(8,13,24,0.9))]'
      } shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_46px_rgba(0,0,0,0.35)]`}
    >
      <p className={`text-sm font-medium ${beforeTone ? 'text-amber-100/85' : 'text-cyan-100'}`}>{title}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function ComparisonRow({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid gap-1.5 rounded-xl border border-white/10 bg-white/[0.015] px-4 py-3 text-sm lg:grid-cols-2">
      <p className="text-amber-100/84">{before}</p>
      <p className="text-cyan-100/92">{after}</p>
    </div>
  );
}

export function BeforeAfterWorkflow() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="homepage-section relative overflow-hidden bg-transparent px-5 pb-20 pt-16 sm:px-7 lg:px-10 lg:pb-26 lg:pt-20">
      <div className="relative mx-auto max-w-[1380px]">
        <motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-xs font-semibold tracking-[0.24em] text-cyan-300">
          WORKFLOW TRANSFORMATION
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.04 }} className="mt-3 max-w-[900px] text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
          From scattered work to one operating layer.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="mt-4 max-w-[820px] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.58] text-slate-300">
          Connect enquiries, tools, tasks, documents, updates, and reports into workflows your team can actually use.
        </motion.p>

        <div className="mt-10 hidden grid-cols-[1fr_0.26fr_1fr] gap-5 lg:grid">
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <WorkflowSide title="Before" tone="before">
              <div className="flex flex-wrap gap-2.5">
                {beforeItems.map((item) => <WorkflowNode key={item.label} label={item.label} icon={item.icon} tone="before" />)}
              </div>
              <svg viewBox="0 0 320 120" className="mt-4 h-20 w-full" aria-hidden>
                <motion.path d="M12 92 C52 72, 92 96, 132 74 C164 56, 184 34, 220 42 C254 50, 276 72, 306 56" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="2" strokeDasharray="6 9" strokeLinecap="round" initial={reduceMotion ? undefined : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
                <circle cx="92" cy="96" r="4" className="fill-amber-300/85" />
                <circle cx="184" cy="34" r="4" className="fill-amber-300/85" />
              </svg>
            </WorkflowSide>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="relative rounded-[24px] border border-cyan-300/22 bg-[linear-gradient(180deg,rgba(10,20,42,0.66),rgba(8,16,32,0.86))] p-4">
            <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-500/14 px-2.5 py-1 text-[0.66rem] tracking-[0.1em] text-cyan-100">System Layer</span>
              <Route className="h-6 w-6 text-cyan-200" />
              <div className="flex flex-wrap justify-center gap-1.5">
                {['Capture', 'Route', 'Track', 'Remind', 'Report'].map((item) => (
                  <span key={item} className="rounded-full border border-cyan-300/34 bg-cyan-400/10 px-2 py-0.5 text-[0.58rem] text-cyan-100">{item}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}>
            <WorkflowSide title="After" tone="after">
              <div className="flex flex-wrap gap-2.5">
                {afterItems.map((item, index) => (
                  <motion.div key={item.label} initial={reduceMotion ? undefined : { opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.18 + index * 0.05 }}>
                    <WorkflowNode label={item.label} icon={item.icon} tone="after" />
                  </motion.div>
                ))}
              </div>
              <svg viewBox="0 0 320 120" className="mt-4 h-20 w-full" aria-hidden>
                <motion.path d="M12 82 C56 70, 90 54, 132 50 C168 46, 210 38, 250 32 C270 28, 286 24, 306 20" fill="none" stroke="rgba(103,232,255,0.72)" strokeWidth="2.2" strokeLinecap="round" initial={reduceMotion ? undefined : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
                <circle cx="132" cy="50" r="4" className="fill-cyan-200" />
                <circle cx="250" cy="32" r="4" className="fill-cyan-200" />
              </svg>
            </WorkflowSide>
          </motion.div>
        </div>

        <div className="mt-8 space-y-3 lg:hidden">
          <WorkflowSide title="Before" tone="before">
            <div className="flex flex-wrap gap-2.5">{beforeItems.map((item) => <WorkflowNode key={item.label} label={item.label} icon={item.icon} tone="before" />)}</div>
          </WorkflowSide>
          <div className="rounded-2xl border border-cyan-300/22 bg-cyan-500/10 px-4 py-3 text-center">
            <p className="text-xs tracking-[0.1em] text-cyan-100">SYSTEM LAYER</p>
            <p className="mt-1 text-sm text-slate-200">Capture • Route • Track • Remind • Report</p>
          </div>
          <WorkflowSide title="After" tone="after">
            <div className="flex flex-wrap gap-2.5">{afterItems.map((item) => <WorkflowNode key={item.label} label={item.label} icon={item.icon} tone="after" />)}</div>
          </WorkflowSide>
        </div>

        <div className="mt-8 grid gap-2.5">
          <ComparisonRow before="Before: Leads wait hours." after="After: Instant acknowledgement and owner routing." />
          <ComparisonRow before="Before: Data gets copied manually." after="After: Tools sync in the background." />
          <ComparisonRow before="Before: No one sees what is stuck." after="After: Dashboards show status and next actions." />
        </div>
      </div>
    </section>
  );
}
