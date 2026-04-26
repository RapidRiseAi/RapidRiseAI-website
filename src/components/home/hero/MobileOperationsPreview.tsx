'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCount } from './AnimatedCount';
import { heroMetrics, processSteps } from './HeroData';

export function MobileOperationsPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28 }}
      className="mt-8 rounded-[26px] border border-cyan-400/45 bg-slate-950/70 p-5 shadow-[0_18px_55px_rgba(2,6,23,0.7),0_0_26px_rgba(14,116,255,0.22)] backdrop-blur-lg"
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-white/85">OPERATIONS PREVIEW</p>

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/10 bg-slate-900/55 px-2 py-3 text-center">
        {heroMetrics.map((metric) => (
          <div key={metric.label} className="px-2">
            <p className={`text-4xl font-semibold tracking-[-0.03em] text-white ${metric.accent ?? ''}`}>
              <AnimatedCount value={metric.countTo} decimals={metric.decimals} suffix={metric.suffix} />
            </p>
            <p className="mt-1 text-sm text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 h-36 overflow-hidden rounded-xl border border-white/10 bg-slate-950/85">
        <svg viewBox="0 0 340 144" className="absolute inset-0 h-full w-full" aria-hidden>
          <motion.path
            d="M0 96 C24 96, 45 112, 64 108 C85 102, 108 96, 132 62 C148 44, 168 74, 186 78 C214 88, 238 92, 264 84 C286 75, 304 56, 340 62"
            stroke="#0ea5e9"
            strokeWidth="2.7"
            fill="none"
            className="drop-shadow-[0_0_6px_rgba(34,211,238,0.75)]"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
          />
          <circle cx="168" cy="74" r="5" fill="#e0f2fe" />
          <circle cx="168" cy="74" r="18" fill="none" stroke="rgba(14,165,233,0.45)" className="motion-safe:animate-pulse" />
          <circle cx="168" cy="74" r="30" fill="none" stroke="rgba(14,165,233,0.2)" />
        </svg>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="contents">
              <div className="group">
                <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 transition duration-300 group-hover:border-cyan-300/35 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.24)]">
                  <Icon className={`h-[18px] w-[18px] ${step.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="mt-2 text-sm text-slate-300">{step.label}</p>
              </div>
              {index < processSteps.length - 1 ? <span className="text-lg text-white/40">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
