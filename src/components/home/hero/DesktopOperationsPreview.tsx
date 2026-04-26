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
      className="relative rounded-[30px] border border-cyan-400/45 bg-slate-950/55 p-8 shadow-[0_0_0_1px_rgba(59,130,246,0.3),0_24px_90px_rgba(2,6,23,0.9),0_0_46px_rgba(14,116,255,0.26)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10" />
      <div
        className="pointer-events-none absolute inset-2 rounded-[24px] opacity-70 transition duration-500"
        style={{ background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(56,189,248,0.24), rgba(2,6,23,0) 45%)` }}
      />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.42, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-x-20 bottom-[-20px] h-28 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.55),transparent_70%)]"
      />

      <p className="relative text-sm font-semibold tracking-[0.24em] text-white/85">OPERATIONS PREVIEW</p>

      <div className="relative mt-7 grid grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/10 bg-slate-950/45 py-5">
        {heroMetrics.map((metric) => (
          <div key={metric.label} className="px-4 text-center">
            <p className="text-[4.2rem] font-semibold leading-none tracking-[-0.04em] text-white">
              <span className={metric.accent ?? ''}>
                <AnimatedCount value={metric.countTo} decimals={metric.decimals} suffix={metric.suffix} duration={metric.duration} />
              </span>
            </p>
            <p className="mt-2 text-3xl font-medium text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-9 h-[245px] overflow-hidden rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_24%_82%,rgba(14,165,233,0.13),transparent_48%),radial-gradient(circle_at_80%_22%,rgba(37,99,235,0.11),transparent_36%)]">
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
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            className="opacity-90"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.5 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.88, 1, 0.9] }}
            transition={{ pathLength: { duration: 1.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.path
            d={signalPath}
            stroke="rgba(56,189,248,0.23)"
            strokeWidth="5.6"
            fill="none"
            strokeLinecap="round"
            className="blur-[2px]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.42 }}
            transition={{ duration: 1.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          {[148, 286, 428, 596, 764, 848].map((x, i) => (
            <circle key={x} cx={x} cy={[194, 112, 124, 138, 112, 88][i]} r="3.1" fill="rgba(219,234,254,0.7)" />
          ))}
        </svg>

        {!reduceMotion ? <motion.div className="pointer-events-none absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-cyan-200/22 to-transparent blur-[6px]" animate={{ x: ['-12%', '105%'] }} transition={{ duration: 8.2, repeat: Infinity, repeatDelay: 5.5, ease: 'linear' }} /> : null}

        <div className="absolute left-1/2 top-[56%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35 bg-cyan-400/10" />
        <motion.div
          className="absolute left-1/2 top-[56%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/18"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.34, 0.08, 0.34] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[56%] h-[12.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10"
          animate={reduceMotion ? undefined : { scale: [1, 1.03, 1], opacity: [0.22, 0.06, 0.22] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-1/2 top-[56%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/90 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="contents">
              <motion.div
                className="group text-center"
                animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.8, delay: index * 0.22, repeat: Infinity, repeatDelay: 2.8 }}
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-950/78 transition duration-300 group-hover:border-cyan-300/45 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.22)]">
                  <Icon className={`h-7 w-7 ${step.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="mt-3 text-xl text-slate-300 transition duration-300 group-hover:text-white">{step.label}</p>
              </motion.div>
              {index < processSteps.length - 1 ? <span className="text-3xl text-white/40">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
