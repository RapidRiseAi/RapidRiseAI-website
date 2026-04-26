'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCount } from './AnimatedCount';
import { impactMetrics } from './HeroData';

export function ImpactSnapshotDesktop() {
  const reduceMotion = useReducedMotion();
  const accentShell: Record<string, string> = {
    TIME: 'border-cyan-300/30 bg-[linear-gradient(160deg,rgba(7,20,40,0.97)_0%,rgba(4,10,23,0.94)_56%,rgba(8,34,58,0.74)_100%)]',
    SPEED: 'border-teal-300/30 bg-[linear-gradient(160deg,rgba(5,24,38,0.97)_0%,rgba(3,12,24,0.94)_56%,rgba(5,47,55,0.74)_100%)]',
    'FOLLOW-UP': 'border-violet-300/30 bg-[linear-gradient(160deg,rgba(24,14,44,0.97)_0%,rgba(14,10,31,0.94)_56%,rgba(40,21,66,0.74)_100%)]',
    VISIBILITY: 'border-blue-300/30 bg-[linear-gradient(160deg,rgba(8,20,48,0.97)_0%,rgba(3,10,26,0.94)_56%,rgba(8,33,70,0.76)_100%)]',
  };
  const accentAtmosphere: Record<string, string> = {
    TIME: 'before:bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.24),transparent_54%)]',
    SPEED: 'before:bg-[radial-gradient(circle_at_26%_20%,rgba(45,212,191,0.26),transparent_55%)]',
    'FOLLOW-UP': 'before:bg-[radial-gradient(circle_at_28%_20%,rgba(167,139,250,0.25),transparent_56%)]',
    VISIBILITY: 'before:bg-[radial-gradient(circle_at_76%_18%,rgba(59,130,246,0.26),transparent_56%)]',
  };
  const iconAccent: Record<string, string> = {
    TIME: 'group-hover:shadow-[0_0_18px_rgba(34,211,238,0.26)]',
    SPEED: 'group-hover:shadow-[0_0_18px_rgba(45,212,191,0.3)]',
    'FOLLOW-UP': 'group-hover:shadow-[0_0_18px_rgba(167,139,250,0.28)]',
    VISIBILITY: 'group-hover:shadow-[0_0_18px_rgba(96,165,250,0.3)]',
  };

  return (
    <div className="mt-11">
      <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-5 text-sm font-semibold tracking-[0.22em] text-cyan-300">
        IMPACT SNAPSHOT
      </motion.p>
      <div className="grid grid-cols-4 gap-3.5">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.article
              key={metric.tag}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className={`group relative min-h-[188px] overflow-hidden rounded-2xl border p-[1.05rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(148,163,184,0.06),0_10px_28px_rgba(2,6,23,0.58)] before:pointer-events-none before:absolute before:inset-0 before:opacity-90 before:content-[''] transition duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(186,230,253,0.08),0_14px_40px_rgba(2,6,23,0.68)] ${accentShell[metric.tag]} ${accentAtmosphere[metric.tag]}`}
            >
              <div className="relative flex items-center gap-3">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100/30 bg-[radial-gradient(circle,rgba(15,23,42,0.98),rgba(2,6,23,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_0_1px_rgba(148,163,184,0.14)] transition duration-300 group-hover:border-cyan-200/46 ${iconAccent[metric.tag]}`}>
                  <Icon strokeWidth={2.1} className={`h-[1rem] w-[1rem] ${metric.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="text-[0.8rem] font-semibold tracking-[0.2em] text-white/88">{metric.tag}</p>
              </div>
              <p className="relative mt-2.5 text-[2.62rem] font-semibold leading-none tracking-[-0.04em] text-white">
                {metric.tag === 'TIME' ? (
                  <>
                    <AnimatedCount value={metric.countTo} prefix="+" duration={metric.duration} />
                    <span className="ml-1.5 text-[0.62em] font-medium tracking-[-0.01em] text-cyan-100/90">hrs</span>
                  </>
                ) : (
                  <AnimatedCount value={metric.countTo} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} duration={metric.duration} />
                )}
              </p>
              <p className="relative mt-1.5 text-[1.12rem] leading-tight text-slate-300">{metric.label}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
