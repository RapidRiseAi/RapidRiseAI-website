'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCount } from './AnimatedCount';
import { heroMetrics, processSteps } from './HeroData';

const signalPath =
  'M0 168 C58 160, 88 186, 138 176 C194 162, 214 110, 248 96 C288 80, 310 108, 350 110 C394 112, 426 104, 474 118 C526 132, 560 112, 612 94 C654 80, 690 86, 730 84 C772 82, 816 64, 860 58 C880 56, 892 58, 900 60';
const signalNodes = [
  { x: 156, y: 191 },
  { x: 298, y: 116 },
  { x: 438, y: 121 },
  { x: 602, y: 138 },
  { x: 768, y: 110 },
  { x: 856, y: 86 },
];

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
      className="relative rounded-[32px] border border-[rgba(94,162,255,0.32)] bg-[linear-gradient(180deg,#07101c_0%,#081320_54%,#091624_100%)] p-9 shadow-[0_0_0_1px_rgba(84,190,255,0.16),0_34px_112px_rgba(2,6,22,0.94),0_0_82px_rgba(12,61,167,0.2),inset_0_1px_0_rgba(219,234,254,0.08)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-[rgba(84,190,255,0.2)]" />
      <div className="pointer-events-none absolute inset-x-9 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/58 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-[32px] bg-[linear-gradient(180deg,rgba(56,189,248,0.1),transparent)]" />
      <div
        className="pointer-events-none absolute inset-2 rounded-[26px] opacity-75 transition duration-500"
        style={{ background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(56,189,248,0.22), rgba(2,6,23,0) 46%)` }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%+2px)] h-12 w-[30%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,140,255,0.44),rgba(19,123,255,0.24)_24%,rgba(12,58,168,0.11)_45%,transparent_72%)] blur-[16px]" />
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-18px)] h-10 w-[13%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(69,216,255,0.2),transparent_72%)] blur-[9px]" />
      <div className="pointer-events-none absolute left-1/2 top-[74%] h-40 w-[66%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,112,230,0.2),transparent_72%)] blur-2xl" />

      <p className="relative text-sm font-semibold tracking-[0.24em] text-slate-100/88">OPERATIONS PREVIEW</p>

      <div className="relative mt-7 grid grid-cols-3 rounded-[17px] border border-[rgba(84,190,255,0.18)] bg-[linear-gradient(180deg,rgba(9,19,36,0.94)_0%,rgba(6,14,28,0.86)_100%)] py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-12px_30px_rgba(2,6,23,0.3)]">
        {heroMetrics.map((metric, index) => (
          <div key={metric.label} className="relative px-4 text-center">
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
            {index < heroMetrics.length - 1 ? <span className="pointer-events-none absolute right-0 top-1/2 h-[61%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(125,142,176,0.18),rgba(148,163,184,0.48),rgba(125,142,176,0.18),transparent)]" /> : null}
          </div>
        ))}
      </div>

      <div className="relative mt-9 h-[280px] overflow-hidden rounded-[19px] border border-cyan-200/20 bg-[linear-gradient(180deg,#050a14_0%,rgba(4,10,22,0.98)_48%,rgba(2,7,18,0.99)_100%)] shadow-[inset_0_1px_0_rgba(191,219,254,0.08)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_45%,rgba(38,190,255,0.18),transparent_42%),radial-gradient(circle_at_48%_50%,rgba(69,223,255,0.28),transparent_32%),radial-gradient(circle_at_78%_42%,rgba(46,140,255,0.18),transparent_36%),linear-gradient(180deg,rgba(3,7,14,0.2),rgba(1,4,10,0.55))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_56%,rgba(69,223,255,0.14),transparent_30%),radial-gradient(ellipse_at_50%_56%,rgba(46,140,255,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(2,8,22,0.72))]" />
        <svg viewBox="0 0 900 245" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="signal-line-desktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="45%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="signal-line-live-desktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(125,211,252,0)" />
              <stop offset="38%" stopColor="rgba(186,230,253,0.92)" />
              <stop offset="62%" stopColor="rgba(255,255,255,0.98)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0)" />
            </linearGradient>
            <radialGradient id="signal-node-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(240,249,255,1)" />
              <stop offset="100%" stopColor="rgba(186,230,253,0.88)" />
            </radialGradient>
          </defs>
          <motion.path
            d={signalPath}
            stroke="url(#signal-line-desktop)"
            strokeWidth="2.85"
            fill="none"
            strokeLinecap="round"
            className="opacity-[0.98]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.5 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.88, 1, 0.9] }}
            transition={{ pathLength: { duration: 1.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.path
            d={signalPath}
            stroke="rgba(56,189,248,0.3)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            className="blur-[2.4px]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduceMotion ? (
            <motion.path
              d={signalPath}
              stroke="url(#signal-line-live-desktop)"
              strokeWidth="8.6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="300 1380"
              className="blur-[1.4px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, strokeDashoffset: [0, -1680] }}
              transition={{ opacity: { duration: 0.35, delay: 1.55 }, strokeDashoffset: { duration: 6.05, repeat: Infinity, ease: 'linear' } }}
            />
          ) : null}
          {!reduceMotion ? (
            <motion.path
              d={signalPath}
              stroke="url(#signal-line-live-desktop)"
              strokeWidth="7.8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="240 1440"
              className="opacity-70 blur-[1.2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.72, strokeDashoffset: [0, -1680] }}
              transition={{ opacity: { duration: 0.35, delay: 1.55 }, strokeDashoffset: { duration: 6.05, repeat: Infinity, ease: 'linear', delay: -3.02 } }}
            />
          ) : null}
          {signalNodes.map((node, i) => (
            <g key={node.x}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="7.2"
                fill="rgba(56,189,248,0.16)"
                animate={reduceMotion ? undefined : { opacity: [0.18, 0.34, 0.18] }}
                transition={{ duration: 6.1, delay: 1.55 + i * 0.42, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="url(#signal-node-core)"
                animate={reduceMotion ? undefined : { opacity: [0.5, 0.84, 1, 0.68, 0.5], scale: [1, 1, 1.15, 1, 1] }}
                transition={{ duration: 6.1, delay: 1.55 + i * 0.42, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          ))}
        </svg>

        {!reduceMotion ? <motion.div className="pointer-events-none absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-cyan-100/28 to-transparent blur-[6px]" initial={{ opacity: 0 }} animate={{ opacity: 1, x: ['-14%', '108%'] }} transition={{ opacity: { duration: 0.35, delay: 1.55 }, x: { duration: 6.05, repeat: Infinity, ease: 'linear' } }} /> : null}

        <motion.div
          className="absolute left-1/2 top-[56%] h-[7.4rem] w-[7.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,246,255,0.22),rgba(46,140,255,0.07),transparent_72%)] shadow-[0_0_38px_rgba(56,189,248,0.34)]"
          animate={reduceMotion ? undefined : { opacity: [0.28, 0.56, 0.28], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-1/2 top-[56%] h-[6.7rem] w-[6.7rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/48 bg-[radial-gradient(circle,rgba(103,232,255,0.2),rgba(46,140,255,0.06),transparent_70%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[56%] h-[6.7rem] w-[6.7rem] -translate-x-1/2 -translate-y-1/2 rounded-full">
          <span className="absolute inset-[18%] rounded-full border border-cyan-200/28" />
          <span className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-cyan-200/22" />
          <span className="absolute left-1/2 top-[8%] bottom-[8%] w-px -translate-x-1/2 bg-cyan-200/18" />
          <span className="absolute inset-x-[14%] top-[31%] h-px bg-cyan-200/14" />
          <span className="absolute inset-x-[14%] bottom-[31%] h-px bg-cyan-200/14" />
        </div>
        <motion.div
          className="absolute left-1/2 top-[56%] h-[9.8rem] w-[9.8rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/26"
          animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.34, 0.14, 0.34] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[56%] h-[12.4rem] w-[12.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15"
          animate={reduceMotion ? undefined : { scale: [1, 1.03, 1], opacity: [0.22, 0.08, 0.22] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[56%] h-[0.9rem] w-[0.9rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9F6FF] shadow-[0_0_28px_rgba(34,211,238,0.98)]"
          animate={reduceMotion ? undefined : { scale: [1, 1.14, 1], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-5">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const accentRing = ['border-cyan-300/42', 'border-indigo-300/40', 'border-blue-300/42', 'border-violet-300/42'][index];
          const accentGlow = ['group-hover:shadow-[0_0_21px_rgba(34,211,238,0.24)]', 'group-hover:shadow-[0_0_21px_rgba(129,140,248,0.24)]', 'group-hover:shadow-[0_0_21px_rgba(59,130,246,0.24)]', 'group-hover:shadow-[0_0_21px_rgba(167,139,250,0.24)]'][index];
          return (
            <div key={step.label} className="contents">
              <motion.div
                className="group text-center"
                animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.8, delay: index * 0.22, repeat: Infinity }}
              >
                <span className={`mx-auto inline-flex h-[4.08rem] w-[4.08rem] items-center justify-center rounded-full border ${accentRing} bg-[radial-gradient(circle,rgba(15,23,42,0.98),rgba(2,6,23,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1px_rgba(56,189,248,0.12)] transition duration-300 group-hover:border-cyan-300/60 ${accentGlow}`}>
                  <Icon strokeWidth={2.05} className={`h-[1.72rem] w-[1.72rem] ${step.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="mt-2.5 text-[1.86rem] text-slate-200 transition duration-300 group-hover:text-white">{step.label}</p>
              </motion.div>
              {index < processSteps.length - 1 ? <span className="flex h-px w-14 items-center justify-center bg-gradient-to-r from-cyan-200/10 via-cyan-200/62 to-cyan-200/10 text-[0.75rem] text-cyan-100/78">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
