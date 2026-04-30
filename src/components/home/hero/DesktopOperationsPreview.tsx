'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCount } from './AnimatedCount';
import { heroMetrics, processSteps } from './HeroData';

const signalPath =
  'M0 170 C73 162, 116 187, 179 168 C249 147, 271 97, 328 88 C386 77, 418 119, 471 124 C532 130, 577 139, 630 144 C693 157, 731 129, 783 101 C825 75, 868 82, 900 77';
const signalNodes = [
  { x: 126, y: 174 },
  { x: 247, y: 118 },
  { x: 328, y: 88 },
  { x: 470, y: 124 },
  { x: 628, y: 144 },
  { x: 784, y: 101 },
  { x: 884, y: 79 },
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
      className="relative rounded-[27px] border border-[rgba(94,185,255,0.34)] bg-[linear-gradient(180deg,#06111e_0%,#071423_54%,#081525_100%)] p-[1.9rem] shadow-[0_0_0_1px_rgba(84,190,255,0.2),0_30px_95px_rgba(2,6,22,0.95),0_0_76px_rgba(12,61,167,0.24),inset_0_1px_0_rgba(219,234,254,0.1)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[27px] border border-[rgba(84,190,255,0.2)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/58 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-[27px] bg-[linear-gradient(180deg,rgba(56,189,248,0.1),transparent)]" />
      <div
        className="pointer-events-none absolute inset-2 rounded-[26px] opacity-75 transition duration-500"
        style={{ background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(56,189,248,0.22), rgba(2,6,23,0) 46%)` }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%+3px)] h-11 w-[43%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,140,255,0.46)_0%,rgba(19,123,255,0.24)_24%,rgba(12,58,168,0.11)_45%,transparent_72%)] blur-[17px]" />
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-18px)] h-10 w-[13%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(69,216,255,0.2),transparent_72%)] blur-[9px]" />
      <div className="pointer-events-none absolute left-1/2 top-[74%] h-40 w-[66%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,112,230,0.2),transparent_72%)] blur-2xl" />

      <p className="relative text-[0.74rem] font-semibold tracking-[0.22em] text-slate-100/88">OPERATIONS PREVIEW</p>

      <div className="relative mt-6 grid grid-cols-3 rounded-[14px] border border-[rgba(84,190,255,0.18)] bg-[linear-gradient(180deg,rgba(9,19,36,0.94)_0%,rgba(6,14,28,0.86)_100%)] py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-12px_30px_rgba(2,6,23,0.3)]">
        {heroMetrics.map((metric, index) => (
          <div key={metric.label} className="relative px-4 text-center">
            <p className="text-[3.7rem] font-semibold leading-none tracking-[-0.04em] text-white">
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
            <p className="mt-1.5 text-[1.56rem] font-medium text-slate-300">{metric.label}</p>
            {index < heroMetrics.length - 1 ? <span className="pointer-events-none absolute right-0 top-1/2 h-[61%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(125,142,176,0.18),rgba(148,163,184,0.48),rgba(125,142,176,0.18),transparent)]" /> : null}
          </div>
        ))}
      </div>

      <div className="relative mt-8 h-[238px] overflow-hidden rounded-[16px] border border-cyan-200/24 bg-[linear-gradient(180deg,#050a14_0%,rgba(4,10,22,0.98)_48%,rgba(2,7,18,0.99)_100%)] shadow-[inset_0_1px_0_rgba(191,219,254,0.08)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_45%,rgba(38,190,255,0.2),transparent_42%),radial-gradient(circle_at_48%_50%,rgba(69,223,255,0.32),transparent_32%),radial-gradient(circle_at_78%_42%,rgba(46,140,255,0.22),transparent_36%),linear-gradient(180deg,rgba(3,7,14,0.2),rgba(1,4,10,0.55))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_56%,rgba(69,223,255,0.14),transparent_30%),radial-gradient(ellipse_at_50%_56%,rgba(46,140,255,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(2,8,22,0.72))]" />
        <svg viewBox="0 0 900 245" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="signal-line-desktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#32DFFF" />
              <stop offset="45%" stopColor="#67E8FF" />
              <stop offset="100%" stopColor="#2E8CFF" />
            </linearGradient>
            <linearGradient id="signal-line-live-desktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(125,211,252,0)" />
              <stop offset="40%" stopColor="rgba(165,243,252,0.82)" />
              <stop offset="62%" stopColor="rgba(191,246,255,0.96)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0)" />
            </linearGradient>
            <radialGradient id="signal-node-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8FDFF" />
              <stop offset="100%" stopColor="#AEEFFF" />
            </radialGradient>
            <radialGradient id="signal-orb-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(103,232,255,0.26)" />
              <stop offset="52%" stopColor="rgba(46,140,255,0.1)" />
              <stop offset="78%" stopColor="rgba(46,140,255,0.02)" />
              <stop offset="100%" stopColor="rgba(46,140,255,0)" />
            </radialGradient>
            <filter id="signal-orb-glow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>
          <motion.path
            d={signalPath}
            stroke="url(#signal-line-desktop)"
            strokeWidth="3.05"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-[0.98]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.5 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.88, 1, 0.9] }}
            transition={{ pathLength: { duration: 1.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.path
            d={signalPath}
            stroke="rgba(56,189,248,0.32)"
            strokeWidth="8.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="blur-[5px]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduceMotion ? (
            <motion.path
              d={signalPath}
              stroke="url(#signal-line-live-desktop)"
              strokeWidth="9.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80 760"
              className="blur-[1.6px]"
              animate={{ strokeDashoffset: [760, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          ) : null}
          {!reduceMotion ? (
            <motion.path
              d={signalPath}
              stroke="url(#signal-line-live-desktop)"
              strokeWidth="8.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80 760"
              className="opacity-65 blur-[1.2px]"
              animate={{ strokeDashoffset: [1520, 760] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          ) : null}
          <motion.g
            className="hero-graph-orb"
            animate={reduceMotion ? undefined : { scale: [0.98, 1.04, 0.98], opacity: [0.84, 1, 0.84] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '470px 124px' }}
          >
            <circle cx="470" cy="124" r="52" fill="rgba(69,223,255,0.3)" opacity="0.36" filter="url(#signal-orb-glow)" />
            <circle cx="470" cy="124" r="50" fill="url(#signal-orb-fill)" stroke="rgba(103,232,255,0.36)" strokeWidth="1.05" />
            <ellipse cx="470" cy="124" rx="41" ry="13.5" fill="none" stroke="rgba(103,232,255,0.22)" strokeWidth="0.9" />
            <ellipse cx="470" cy="124" rx="31" ry="9.5" fill="none" stroke="rgba(103,232,255,0.2)" strokeWidth="0.85" />
            <ellipse cx="470" cy="124" rx="21" ry="6.5" fill="none" stroke="rgba(103,232,255,0.18)" strokeWidth="0.8" />
            <ellipse cx="470" cy="124" rx="14.5" ry="40" fill="none" stroke="rgba(103,232,255,0.2)" strokeWidth="0.9" />
            <ellipse cx="470" cy="124" rx="26" ry="40" fill="none" stroke="rgba(103,232,255,0.14)" strokeWidth="0.85" />
            <motion.circle
              cx="470"
              cy="124"
              r="53"
              fill="none"
              stroke="rgba(69,223,255,0.16)"
              strokeWidth="1"
              animate={reduceMotion ? undefined : { scale: [0.92, 1.22], opacity: [0.22, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: '470px 124px' }}
            />
            <motion.circle
              cx="470"
              cy="124"
              r="57"
              fill="none"
              stroke="rgba(69,223,255,0.14)"
              strokeWidth="1"
              animate={reduceMotion ? undefined : { scale: [0.94, 1.18], opacity: [0.16, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
              style={{ transformOrigin: '470px 124px' }}
            />
            <circle cx="470" cy="124" r="5.8" fill="#D7FBFF" />
            <circle cx="470" cy="124" r="9.8" fill="rgba(103,232,255,0.32)" filter="url(#signal-orb-glow)" />
          </motion.g>
          {signalNodes.map((node, i) => (
            <g key={node.x}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="3.8"
                fill="rgba(56,189,248,0.24)"
                animate={reduceMotion ? undefined : { opacity: [0.24, 0.38, 0.24] }}
                transition={{ duration: 6.1, delay: 1.55 + i * 0.42, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="2.9"
                fill="url(#signal-node-core)"
                animate={reduceMotion ? undefined : { opacity: [0.5, 0.84, 1, 0.68, 0.5], scale: [1, 1, 1.15, 1, 1] }}
                transition={{ duration: 6.1, delay: 1.55 + i * 0.42, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          ))}
        </svg>

          {!reduceMotion ? <motion.div className="pointer-events-none absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-cyan-100/32 to-transparent blur-[6px]" initial={{ opacity: 0 }} animate={{ opacity: 1, x: ['-14%', '108%'] }} transition={{ opacity: { duration: 0.35, delay: 1.55 }, x: { duration: 6.05, repeat: Infinity, ease: 'linear' } }} /> : null}
      </div>

      <div className="mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const accentRing = ['border-[rgba(69,223,255,0.5)]', 'border-[rgba(138,108,255,0.5)]', 'border-[rgba(88,166,255,0.52)]', 'border-[rgba(162,118,255,0.54)]'][index];
          const accentGlow = ['group-hover:shadow-[0_0_22px_rgba(69,223,255,0.26)]', 'group-hover:shadow-[0_0_22px_rgba(138,108,255,0.26)]', 'group-hover:shadow-[0_0_22px_rgba(88,166,255,0.28)]', 'group-hover:shadow-[0_0_22px_rgba(162,118,255,0.3)]'][index];
          return (
            <div key={step.label} className="contents">
              <motion.div
                className="group text-center"
                animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.8, delay: index * 0.22, repeat: Infinity }}
              >
                <span className={`mx-auto inline-flex h-[3.7rem] w-[3.7rem] items-center justify-center rounded-full border ${accentRing} bg-[radial-gradient(circle,rgba(15,23,42,0.98),rgba(2,6,23,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_0_1px_rgba(56,189,248,0.14)] transition duration-300 group-hover:border-cyan-300/66 ${accentGlow}`}>
                  <Icon strokeWidth={2.15} className={`h-[1.56rem] w-[1.56rem] ${step.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="mt-2 text-[1.58rem] text-slate-200 transition duration-300 group-hover:text-white">{step.label}</p>
              </motion.div>
              {index < processSteps.length - 1 ? <span className="flex h-px w-12 items-center justify-center bg-gradient-to-r from-cyan-200/18 via-cyan-200/70 to-cyan-200/18 text-[0.65rem] text-cyan-100/82">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
