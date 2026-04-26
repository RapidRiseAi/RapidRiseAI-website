'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCount } from './AnimatedCount';
import { impactMetrics } from './HeroData';

export function ImpactSnapshotDesktop() {
  const reduceMotion = useReducedMotion();
  const accentShell: Record<string, string> = {
    TIME: 'border-cyan-300/25 bg-[linear-gradient(165deg,rgba(8,24,45,0.94)_0%,rgba(4,10,22,0.82)_55%,rgba(6,31,54,0.7)_100%)]',
    SPEED: 'border-sky-300/25 bg-[linear-gradient(165deg,rgba(4,22,38,0.94)_0%,rgba(2,12,25,0.82)_56%,rgba(8,45,56,0.65)_100%)]',
    'FOLLOW-UP': 'border-violet-300/22 bg-[linear-gradient(165deg,rgba(26,14,42,0.9)_0%,rgba(13,10,30,0.82)_54%,rgba(32,22,58,0.66)_100%)]',
    VISIBILITY: 'border-indigo-300/25 bg-[linear-gradient(165deg,rgba(7,18,46,0.94)_0%,rgba(3,9,24,0.82)_55%,rgba(10,28,62,0.66)_100%)]',
  };
  const iconAccent: Record<string, string> = {
    TIME: 'group-hover:shadow-[0_0_18px_rgba(34,211,238,0.24)]',
    SPEED: 'group-hover:shadow-[0_0_18px_rgba(45,212,191,0.24)]',
    'FOLLOW-UP': 'group-hover:shadow-[0_0_18px_rgba(167,139,250,0.24)]',
    VISIBILITY: 'group-hover:shadow-[0_0_18px_rgba(96,165,250,0.24)]',
  };

  return (
    <div className="mt-16">
      <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-5 text-sm font-semibold tracking-[0.22em] text-cyan-300">
        IMPACT SNAPSHOT
      </motion.p>
      <div className="grid grid-cols-4 gap-5">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.article
              key={metric.tag}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className={`group min-h-[248px] rounded-2xl border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_38px_rgba(2,6,23,0.62)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_48px_rgba(2,6,23,0.7)] ${accentShell[metric.tag]}`}
            >
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-slate-900/88 transition duration-300 group-hover:border-cyan-300/35 ${iconAccent[metric.tag]}`}>
                  <Icon className={`h-5 w-5 ${metric.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="text-sm font-semibold tracking-[0.22em] text-white/88">{metric.tag}</p>
              </div>
              <p className="mt-5 text-[3.7rem] font-semibold leading-none tracking-[-0.045em] text-white">
                {metric.tag === 'TIME' ? (
                  <>
                    <AnimatedCount value={metric.countTo} prefix="+" duration={metric.duration} />
                    <span className="ml-1.5 text-[0.62em] font-medium tracking-[-0.01em] text-cyan-100/90">hrs</span>
                  </>
                ) : (
                  <AnimatedCount value={metric.countTo} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} duration={metric.duration} />
                )}
              </p>
              <p className="mt-3 text-[1.58rem] leading-tight text-slate-300">{metric.label}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
