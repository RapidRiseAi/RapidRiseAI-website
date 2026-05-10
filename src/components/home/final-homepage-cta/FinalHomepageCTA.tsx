'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Gauge,
  Layers3,
  Route,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import type { ReactNode } from 'react';

const systemLayerChips = ['Capture', 'Route', 'Track', 'Report'];
const messyLabels = ['Delayed', 'Manual', 'Untracked'];
const dashboardRows = ['Owner assigned', 'Follow-up ready', 'Status visible'];
const transitionEase = [0.22, 1, 0.36, 1] as const;

function TransformationSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-cyan-300/18 bg-slate-950/66 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(56,223,255,0.13),transparent_38%),radial-gradient(circle_at_20%_72%,rgba(245,165,36,0.06),transparent_26%),radial-gradient(circle_at_86%_72%,rgba(51,230,138,0.08),transparent_28%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function ManualProcessCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -18, rotate: -4 }}
      whileInView={{ opacity: 1, x: 0, rotate: -2 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.52, delay: 0.55, ease: transitionEase }}
      className="relative rounded-3xl border border-amber-300/24 bg-[linear-gradient(180deg,rgba(42,25,9,0.68),rgba(6,18,34,0.88))] p-4 shadow-[0_22px_56px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] lg:-rotate-2"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <motion.span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(245,165,36,0.74)]" animate={reduceMotion ? {} : { scale: [1, 1.22, 1] }} transition={{ duration: 1.2, delay: 0.8 }} />
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-amber-100">Manual process</p>
        </div>
        <TriangleAlert className="h-4 w-4 text-amber-200" />
      </div>
      <div className="grid gap-2">
        {[74, 46, 62].map((width, index) => (
          <div key={width} className="rounded-xl border border-amber-300/14 bg-amber-300/[0.045] px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.58rem] text-slate-300">{messyLabels[index]}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
            </div>
            <motion.div className="mt-2 h-1.5 rounded-full bg-amber-200/24" animate={{ width: `${width}%` }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.75 + index * 0.08 }} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[0.58rem] text-amber-100/86">
        <span className="h-px flex-1 border-t border-dashed border-amber-300/35" />
        status unclear
      </div>
    </motion.div>
  );
}

function SystemLayerCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.82, ease: transitionEase }}
      className="group/system relative overflow-hidden rounded-3xl border border-cyan-200/38 bg-[linear-gradient(180deg,rgba(14,165,255,0.18),rgba(4,13,28,0.94))] p-4 shadow-[0_28px_74px_rgba(0,0,0,0.38),0_0_42px_rgba(56,223,255,0.14),inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      {!reduceMotion && (
        <motion.span
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-cyan-100/16 to-transparent"
          initial={{ x: '-20%' }}
          whileInView={{ x: '360%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 1.0, ease: transitionEase }}
        />
      )}
      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-200/34 bg-cyan-300/12 text-cyan-100"><Layers3 className="h-4 w-4" /></span>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">System layer</p>
        </div>
        <span className="rounded-full border border-cyan-200/28 bg-cyan-300/10 px-2.5 py-1 text-[0.56rem] font-semibold text-cyan-100">Live route</span>
      </div>
      <div className="relative grid grid-cols-2 gap-2">
        {systemLayerChips.map((chip, index) => (
          <motion.div
            key={chip}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.32, delay: 1.05 + index * 0.08 }}
            className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-2 text-center text-[0.62rem] font-semibold text-cyan-50 transition group-hover/system:border-cyan-100/44"
          >
            {chip}
          </motion.div>
        ))}
      </div>
      <div className="relative mt-4 flex items-center gap-2 text-[0.58rem] text-cyan-100/82">
        <Route className="h-3.5 w-3.5" /> capture, route, track, report
      </div>
    </motion.div>
  );
}

function DashboardReadyCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 18, rotate: 3 }}
      whileInView={{ opacity: 1, x: 0, rotate: 2 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: 1.42, ease: transitionEase }}
      className="relative rounded-3xl border border-emerald-300/24 bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-4 shadow-[0_24px_62px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.06)] lg:rotate-2"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-200" />
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-emerald-100">Next step ready</p>
        </div>
        <span className="rounded-full border border-emerald-200/24 bg-emerald-300/10 px-2.5 py-1 text-[0.56rem] font-semibold text-emerald-100">Ready</span>
      </div>
      <div className="grid gap-2">
        {dashboardRows.map((row, index) => (
          <motion.div key={row} className="flex items-center justify-between rounded-xl border border-cyan-300/14 bg-white/[0.03] px-3 py-2 text-[0.6rem] text-slate-200" initial={reduceMotion ? false : { opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.28, delay: 1.58 + index * 0.08 }}>
            {row}
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-200" />
          </motion.div>
        ))}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800/90">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#33e68a] shadow-[0_0_18px_rgba(51,230,138,0.42)]" initial={reduceMotion ? false : { width: '26%' }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.72, delay: 1.66, ease: transitionEase }} />
      </div>
    </motion.div>
  );
}

function ConnectionLines({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 720 420" aria-hidden="true">
      <defs>
        <filter id="final-cta-line-glow" x="-30%" y="-90%" width="160%" height="280%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="final-cta-line-a" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F5A524" stopOpacity="0.78" />
          <stop offset="0.55" stopColor="#38DFFF" />
          <stop offset="1" stopColor="#0EA5FF" />
        </linearGradient>
        <linearGradient id="final-cta-line-b" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0EA5FF" />
          <stop offset="0.72" stopColor="#38DFFF" />
          <stop offset="1" stopColor="#33E68A" />
        </linearGradient>
      </defs>
      <path d="M 156 222 C 250 146, 310 146, 365 205" fill="none" stroke="rgba(56,223,255,0.14)" strokeLinecap="round" strokeWidth="14" />
      <path d="M 358 214 C 430 270, 506 278, 584 210" fill="none" stroke="rgba(56,223,255,0.14)" strokeLinecap="round" strokeWidth="14" />
      <motion.path d="M 156 222 C 250 146, 310 146, 365 205" fill="none" filter="url(#final-cta-line-glow)" stroke="url(#final-cta-line-a)" strokeDasharray={reduceMotion ? undefined : '8 10'} strokeLinecap="round" strokeWidth="3" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: 1.24, ease: transitionEase }} />
      <motion.path d="M 358 214 C 430 270, 506 278, 584 210" fill="none" filter="url(#final-cta-line-glow)" stroke="url(#final-cta-line-b)" strokeLinecap="round" strokeWidth="3" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: 1.36, ease: transitionEase }} />
      {!reduceMotion && (
        <motion.circle r="4" fill="#EAFBFF" filter="url(#final-cta-line-glow)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 6.2, repeat: Infinity, delay: 2.2 }}>
          <animateMotion dur="6.2s" repeatCount="indefinite" path="M 358 214 C 430 270, 506 278, 584 210" />
        </motion.circle>
      )}
    </svg>
  );
}

function FinalCTATransformationVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.6, delay: 0.52, ease: transitionEase }} className="relative">
      <TransformationSurface className="min-h-[520px] p-4 sm:p-5 lg:p-7">
        <ConnectionLines reduceMotion={reduceMotion} />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-cyan-300/18 bg-slate-950/52 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cyan-100">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(56,223,255,0.78)]" /> System activation
        </div>
        <div className="grid min-h-[470px] content-center gap-4 pt-10 lg:grid-cols-3 lg:items-center lg:gap-3 lg:pt-0">
          <ManualProcessCard reduceMotion={reduceMotion} />
          <SystemLayerCard reduceMotion={reduceMotion} />
          <DashboardReadyCard reduceMotion={reduceMotion} />
        </div>
      </TransformationSurface>
    </motion.div>
  );
}

function CTAButtonGroup({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.42, ease: transitionEase }} className="mt-9 flex flex-col gap-3 sm:flex-row">
      <Link href="/quote" className="group relative inline-flex min-h-[54px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] px-6 text-sm font-bold text-white shadow-[0_14px_38px_rgba(14,165,255,0.30),inset_0_1px_0_rgba(255,255,255,0.34)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(14,165,255,0.42),inset_0_1px_0_rgba(255,255,255,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 sm:min-w-[178px]">
        <span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/8" />
        <span className="relative">Request a Quote</span>
        <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
      <Link href="/work" className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-cyan-300/28 bg-white/[0.04] px-6 text-sm font-semibold text-cyan-50 transition hover:-translate-y-1 hover:border-cyan-200/62 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 sm:min-w-[148px]">
        View Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

function TrustLine({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.p initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.38, delay: 1.82, ease: transitionEase }} className="mt-5 inline-flex items-center gap-2 text-sm leading-relaxed text-slate-300/82">
      <Clock3 className="h-4 w-4 text-cyan-200" /> Response within 24 hours. No spam. No pressure.
    </motion.p>
  );
}

export function FinalHomepageCTA() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="final-homepage-cta homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="final-homepage-cta-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(0,145,255,0.14),transparent_34%),radial-gradient(circle_at_72%_60%,rgba(0,220,255,0.08),transparent_32%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 120 C 260 180, 380 280, 600 392 S 980 520, 1220 650" fill="none" stroke="rgba(56,223,255,0.28)" strokeWidth="1" />
        <path d="M-30 650 C 260 560, 390 450, 610 392 S 980 260, 1230 120" fill="none" stroke="rgba(14,165,255,0.22)" strokeWidth="1" />
        <path d="M330 -20 C 420 180, 500 282, 610 392 S 790 590, 860 790" fill="none" stroke="rgba(56,223,255,0.18)" strokeWidth="1" />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020711] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020711] to-transparent" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
          transition={{ duration: 0.65, ease: transitionEase }}
          className="relative overflow-hidden rounded-[34px] border border-cyan-300/24 bg-[radial-gradient(circle_at_70%_50%,rgba(0,180,255,0.12),transparent_36%),linear-gradient(180deg,rgba(6,18,34,0.92),rgba(2,8,18,0.98))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.46),0_0_0_1px_rgba(120,220,255,0.06),0_0_70px_rgba(0,145,255,0.14),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_90px_rgba(0,160,255,0.04)] backdrop-blur-[18px] sm:p-8 lg:min-h-[540px] lg:p-14 xl:p-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:58px_58px]" />
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 left-12 h-24 w-44 rounded-full bg-[#0ea5ff]/18 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-14 xl:gap-18">
            <div className="final-cta-content">
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.12, ease: transitionEase }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" /> System activation
              </motion.div>
              <motion.h2 id="final-homepage-cta-title" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15, ease: transitionEase }} className="max-w-[620px] text-[clamp(2.45rem,6vw,4.75rem)] font-black leading-[0.98] tracking-[-0.055em] text-white">
                Stop the leaks. Build the system.
              </motion.h2>
              <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.46, delay: 0.28, ease: transitionEase }} className="mt-6 max-w-[580px] text-[clamp(1rem,1.42vw,1.28rem)] leading-[1.62] text-slate-300">
                Tell us what is manual, delayed, or hard to track. We will recommend the cleanest next step.
              </motion.p>
              <CTAButtonGroup reduceMotion={reduceMotion} />
              <TrustLine reduceMotion={reduceMotion} />
              <div className="mt-8 grid max-w-[560px] gap-3 sm:grid-cols-3">
                {[['Manual leak', TriangleAlert], ['System layer', Gauge], ['Ready next step', ShieldCheck]].map(([label, Icon], index) => (
                  <motion.div key={label as string} initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.55 + index * 0.06 }} className="flex items-center gap-2 rounded-2xl border border-cyan-300/14 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-slate-300">
                    <Icon className="h-3.5 w-3.5 text-cyan-200" /> {label as string}
                  </motion.div>
                ))}
              </div>
            </div>

            <FinalCTATransformationVisual reduceMotion={reduceMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
