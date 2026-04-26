'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCount } from './AnimatedCount';
import { heroMetrics, processSteps } from './HeroData';

const signalPath =
  'M0 178 C70 168, 104 212, 148 194 C192 177, 236 188, 286 112 C332 46, 380 112, 428 124 C478 138, 536 120, 596 138 C652 154, 708 150, 764 112 C806 84, 848 88, 900 96';

export function DesktopOperationsPreview() {
  const reduceMotion = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 68, y: 42 });

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.26 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
      }}
      className="relative rounded-[30px] border border-cyan-400/50 bg-slate-950/58 p-8 shadow-[0_0_0_1px_rgba(59,130,246,0.34),0_28px_98px_rgba(2,6,23,0.92),0_0_60px_rgba(14,116,255,0.3)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10" />
      <div
        className="pointer-events-none absolute inset-2 rounded-[24px] opacity-70 transition duration-500"
        style={{ background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(56,189,248,0.24), rgba(2,6,23,0) 45%)` }}
      />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-x-16 bottom-[-26px] h-32 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.62),transparent_72%)]"
      />

      <p className="relative text-sm font-semibold tracking-[0.24em] text-white/85">OPERATIONS PREVIEW</p>

      <div className="relative mt-7 grid grid-cols-3 divide-x divide-cyan-200/10 rounded-xl border border-cyan-200/12 bg-[linear-gradient(180deg,rgba(8,17,35,0.82)_0%,rgba(5,11,23,0.72)_100%)] py-5">
        {heroMetrics.map((metric) => (
          <div key={metric.label} className="px-4 text-center">
            <p className="text-[4.35rem] font-semibold leading-none tracking-[-0.04em] text-white">
              <span className={metric.accent ?? ''}>
                {metric.suffix === ' min' ? (
                  <>
                    <AnimatedCount value={metric.countTo} decimals={metric.decimals} duration={metric.duration} />
                    <span className="ml-1.5 text-[0.62em] font-medium tracking-[-0.02em]">min</span>
                  </>
                ) : (
                  <AnimatedCount value={metric.countTo} decimals={metric.decimals} suffix={metric.suffix} duration={metric.duration} />
                )}
              </span>
            </p>
            <p className="mt-2 text-[1.85rem] font-medium text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-9 h-[250px] overflow-hidden rounded-2xl border border-cyan-200/10 bg-[radial-gradient(circle_at_22%_80%,rgba(14,165,233,0.2),transparent_46%),radial-gradient(circle_at_54%_66%,rgba(56,189,248,0.16),transparent_42%),radial-gradient(circle_at_82%_22%,rgba(37,99,235,0.16),transparent_35%)]">
        <svg viewBox="0 0 900 245" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="signal-line-desktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="45%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <motion.path
            d={signalPath}
            stroke="url(#signal-line-desktop)"
            strokeWidth="2.7"
            fill="none"
            strokeLinecap="round"
            className="opacity-[0.96]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.5 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.88, 1, 0.9] }}
            transition={{ pathLength: { duration: 1.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 8.2, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.path
            d={signalPath}
            stroke="rgba(56,189,248,0.26)"
            strokeWidth="6.2"
            fill="none"
            strokeLinecap="round"
            className="blur-[2.4px]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          {[148, 286, 428, 596, 764, 848].map((x, i) => (
            <circle key={x} cx={x} cy={[194, 112, 124, 138, 112, 88][i]} r="3.3" fill="rgba(219,234,254,0.82)" />
          ))}
        </svg>

        {!reduceMotion ? <motion.div className="pointer-events-none absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-cyan-200/22 to-transparent blur-[6px]" animate={{ x: ['-12%', '105%'] }} transition={{ duration: 8.2, repeat: Infinity, repeatDelay: 5.5, ease: 'linear' }} /> : null}

        <div className="absolute left-1/2 top-[56%] h-[6.4rem] w-[6.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/45 bg-cyan-400/12 shadow-[0_0_28px_rgba(56,189,248,0.2)]" />
        <motion.div
          className="absolute left-1/2 top-[56%] h-[9.7rem] w-[9.7rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/22"
          animate={reduceMotion ? undefined : { scale: [1, 1.07, 1], opacity: [0.36, 0.1, 0.36] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[56%] h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/12"
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.24, 0.08, 0.24] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-1/2 top-[56%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/95 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
      </div>

      <div className="mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="contents">
              <motion.div
                className="group text-center"
                animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.8, delay: index * 0.22, repeat: Infinity, repeatDelay: 2.8 }}
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/22 bg-slate-950/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.22)]">
                  <Icon className={`h-7 w-7 ${step.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="mt-3 text-xl text-slate-300 transition duration-300 group-hover:text-white">{step.label}</p>
              </motion.div>
              {index < processSteps.length - 1 ? <span className="flex h-px w-12 items-center justify-center bg-gradient-to-r from-cyan-200/10 via-cyan-200/45 to-cyan-200/10 text-sm text-cyan-100/55">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
