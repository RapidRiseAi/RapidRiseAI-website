'use client';

import { motion, useReducedMotion } from 'framer-motion';
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

export function MobileOperationsPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28 }}
      className="mt-8 w-full max-w-full rounded-[27px] border border-cyan-400/45 bg-[linear-gradient(180deg,#071320_0%,#081524_55%,#081726_100%)] p-5 pb-6 shadow-[0_18px_55px_rgba(2,6,23,0.7),0_0_26px_rgba(14,116,255,0.22)]"
    >
      <p className="text-[12px] font-semibold tracking-[0.2em] text-white/86">OPERATIONS PREVIEW</p>

      <div className="relative mt-5 grid min-h-[114px] grid-cols-3 items-center rounded-[16px] border border-white/12 bg-[linear-gradient(180deg,rgba(9,19,36,0.94)_0%,rgba(6,14,28,0.86)_100%)] px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <span className="pointer-events-none absolute left-1/3 top-1/2 h-[58%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(150,190,245,0.18)_18%,rgba(155,220,255,0.36)_50%,rgba(150,190,245,0.18)_82%,transparent)]" />
        <span className="pointer-events-none absolute left-2/3 top-1/2 h-[58%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(150,190,245,0.18)_18%,rgba(155,220,255,0.36)_50%,rgba(150,190,245,0.18)_82%,transparent)]" />
        {heroMetrics.map((metric) => (
          <div key={metric.label} className="min-w-0 px-1">
            <p className={`inline-flex items-baseline justify-center gap-1 whitespace-nowrap text-[2rem] font-semibold leading-none tracking-[-0.035em] text-white max-[359px]:text-[1.82rem] ${metric.accent ?? ''}`}>
              {metric.suffix === ' min' ? (
                <>
                  <AnimatedCount value={metric.countTo} decimals={metric.decimals} duration={metric.duration} />
                  <span className="text-[0.57em] font-medium max-[359px]:text-[0.54em]">min</span>
                </>
              ) : (
                <AnimatedCount value={metric.countTo} decimals={metric.decimals} suffix={metric.suffix} duration={metric.duration} />
              )}
            </p>
            <p className="mx-auto mt-1 max-w-[90%] text-[0.75rem] leading-[1.2] text-slate-300 max-[359px]:text-[0.69rem]">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="operations-graph-panel relative mt-6 flex min-h-[152px] items-center justify-center overflow-hidden rounded-[18px] border border-cyan-200/20 bg-[linear-gradient(180deg,#050a14_0%,rgba(4,10,22,0.98)_48%,rgba(2,7,18,0.99)_100%)] px-3 py-3 max-[359px]:min-h-[142px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_44%,rgba(38,190,255,0.18),transparent_42%),radial-gradient(circle_at_50%_50%,rgba(69,223,255,0.26),transparent_34%),radial-gradient(circle_at_80%_42%,rgba(46,140,255,0.2),transparent_36%)]" />
        <svg viewBox="0 0 900 245" className="mobile-graph-svg relative z-[1] block w-full max-w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <linearGradient id="signal-line-mobile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#32DFFF" />
              <stop offset="45%" stopColor="#67E8FF" />
              <stop offset="100%" stopColor="#2E8CFF" />
            </linearGradient>
            <linearGradient id="signal-line-mobile-live" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(125,211,252,0)" />
              <stop offset="40%" stopColor="rgba(165,243,252,0.82)" />
              <stop offset="62%" stopColor="rgba(191,246,255,0.96)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0)" />
            </linearGradient>
            <radialGradient id="signal-mobile-node-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8FDFF" />
              <stop offset="100%" stopColor="#AEEFFF" />
            </radialGradient>
            <radialGradient id="signal-mobile-orb-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(103,232,255,0.26)" />
              <stop offset="52%" stopColor="rgba(46,140,255,0.1)" />
              <stop offset="78%" stopColor="rgba(46,140,255,0.02)" />
              <stop offset="100%" stopColor="rgba(46,140,255,0)" />
            </radialGradient>
            <filter id="signal-mobile-orb-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <motion.path
            d={signalPath}
            stroke="url(#signal-line-mobile)"
            strokeWidth="2.95"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.88, 1, 0.9] }}
            transition={{ duration: 1.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={signalPath}
            stroke="rgba(56,189,248,0.3)"
            strokeWidth="7.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="blur-[4px]"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 1.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduceMotion ? (
            <motion.path
              d={signalPath}
              stroke="url(#signal-line-mobile-live)"
              strokeWidth="8.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80 760"
              className="blur-[1.3px]"
              animate={{ strokeDashoffset: [760, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          ) : null}
          <motion.g
            animate={reduceMotion ? undefined : { scale: [0.98, 1.04, 0.98], opacity: [0.84, 1, 0.84] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '470px 124px', transformBox: 'fill-box' }}
          >
            <g transform="translate(470 124) scale(0.66) translate(-470 -124)">
              <circle cx="470" cy="124" r="52" fill="rgba(69,223,255,0.3)" opacity="0.36" filter="url(#signal-mobile-orb-glow)" />
              <circle cx="470" cy="124" r="50" fill="url(#signal-mobile-orb-fill)" stroke="rgba(103,232,255,0.36)" strokeWidth="1.05" />
              <ellipse cx="470" cy="124" rx="41" ry="13.5" fill="none" stroke="rgba(103,232,255,0.22)" strokeWidth="0.9" />
              <ellipse cx="470" cy="124" rx="31" ry="9.5" fill="none" stroke="rgba(103,232,255,0.2)" strokeWidth="0.85" />
              <ellipse cx="470" cy="124" rx="21" ry="6.5" fill="none" stroke="rgba(103,232,255,0.18)" strokeWidth="0.8" />
              <ellipse cx="470" cy="124" rx="14.5" ry="40" fill="none" stroke="rgba(103,232,255,0.2)" strokeWidth="0.9" />
              <ellipse cx="470" cy="124" rx="26" ry="40" fill="none" stroke="rgba(103,232,255,0.14)" strokeWidth="0.85" />
              <motion.circle cx="470" cy="124" r="53" fill="none" stroke="rgba(69,223,255,0.16)" strokeWidth="1" animate={reduceMotion ? undefined : { scale: [0.92, 1.2], opacity: [0.22, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeOut' }} style={{ transformOrigin: '470px 124px' }} />
              <motion.circle cx="470" cy="124" r="57" fill="none" stroke="rgba(69,223,255,0.14)" strokeWidth="1" animate={reduceMotion ? undefined : { scale: [0.94, 1.18], opacity: [0.16, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeOut', delay: 1.4 }} style={{ transformOrigin: '470px 124px' }} />
              <circle cx="470" cy="124" r="5.8" fill="#D7FBFF" />
              <circle cx="470" cy="124" r="9.8" fill="rgba(103,232,255,0.32)" filter="url(#signal-mobile-orb-glow)" />
            </g>
          </motion.g>
          {signalNodes.map((node, i) => (
            <g key={node.x}>
              <motion.circle cx={node.x} cy={node.y} r="3.4" fill="rgba(56,189,248,0.24)" animate={reduceMotion ? undefined : { opacity: [0.24, 0.38, 0.24] }} transition={{ duration: 6.1, delay: 1.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.circle cx={node.x} cy={node.y} r="2.5" fill="url(#signal-mobile-node-core)" animate={reduceMotion ? undefined : { opacity: [0.5, 0.84, 1, 0.68, 0.5], scale: [1, 1, 1.13, 1, 1] }} transition={{ duration: 6.1, delay: 1.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }} />
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const accentRing = ['border-[rgba(69,223,255,0.42)]', 'border-[rgba(138,108,255,0.42)]', 'border-[rgba(88,166,255,0.44)]', 'border-[rgba(162,118,255,0.44)]'][index];
          return (
            <div key={step.label} className="group relative min-w-0">
              <span className={`mx-auto inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border ${accentRing} bg-[radial-gradient(circle,rgba(15,23,42,0.98),rgba(2,6,23,0.95))] transition duration-300 group-hover:border-cyan-300/52 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.24)]`}>
                  <Icon className={`h-[18px] w-[18px] ${step.accent} transition duration-300 group-hover:brightness-125`} />
              </span>
              <p className="mt-1.5 text-[0.73rem] leading-[1.15] text-slate-300">{step.label}</p>
              {index < processSteps.length - 1 ? <span className="pointer-events-none absolute -right-[9px] top-[14px] text-[0.75rem] text-white/38">→</span> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
