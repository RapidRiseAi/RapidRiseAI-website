'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCount } from './AnimatedCount';
import { impactMetrics } from './HeroData';

export function ImpactSnapshotDesktop() {
  const reduceMotion = useReducedMotion();
  const accentShell: Record<string, string> = {
    TIME: 'border-cyan-300/34 bg-[linear-gradient(160deg,rgba(6,18,38,0.98)_0%,rgba(3,9,20,0.95)_56%,rgba(8,32,58,0.76)_100%)]',
    SPEED: 'border-teal-300/34 bg-[linear-gradient(160deg,rgba(4,23,36,0.98)_0%,rgba(2,11,23,0.95)_56%,rgba(5,46,54,0.76)_100%)]',
    'FOLLOW-UP': 'border-violet-300/34 bg-[linear-gradient(160deg,rgba(22,13,42,0.98)_0%,rgba(13,9,30,0.95)_56%,rgba(39,20,64,0.76)_100%)]',
    VISIBILITY: 'border-blue-300/34 bg-[linear-gradient(160deg,rgba(7,18,46,0.98)_0%,rgba(2,9,24,0.95)_56%,rgba(8,32,69,0.78)_100%)]',
  };
  const accentAtmosphere: Record<string, string> = {
    TIME: 'before:bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.3),transparent_52%)]',
    SPEED: 'before:bg-[radial-gradient(circle_at_26%_20%,rgba(45,212,191,0.32),transparent_53%)]',
    'FOLLOW-UP': 'before:bg-[radial-gradient(circle_at_28%_20%,rgba(167,139,250,0.3),transparent_54%)]',
    VISIBILITY: 'before:bg-[radial-gradient(circle_at_76%_18%,rgba(59,130,246,0.32),transparent_54%)]',
  };
  const iconAccent: Record<string, string> = {
    TIME: 'border-[rgba(85,207,255,0.48)] group-hover:shadow-[0_0_20px_rgba(85,207,255,0.25)]',
    SPEED: 'border-[rgba(69,240,224,0.48)] group-hover:shadow-[0_0_20px_rgba(69,240,224,0.25)]',
    'FOLLOW-UP': 'border-[rgba(162,118,255,0.52)] group-hover:shadow-[0_0_20px_rgba(162,118,255,0.3)]',
    VISIBILITY: 'border-[rgba(62,140,255,0.52)] group-hover:shadow-[0_0_20px_rgba(62,140,255,0.3)]',
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
              className={`group relative min-h-[172px] overflow-hidden rounded-2xl border p-[1.3rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),inset_0_0_0_1px_rgba(148,163,184,0.08),0_10px_28px_rgba(2,6,23,0.58),0_0_20px_rgba(15,23,42,0.2)] before:pointer-events-none before:absolute before:inset-0 before:opacity-90 before:content-[''] after:pointer-events-none after:absolute after:inset-x-6 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-cyan-100/42 after:to-transparent after:content-[''] transition duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(186,230,253,0.1),0_14px_40px_rgba(2,6,23,0.68)] ${accentShell[metric.tag]} ${accentAtmosphere[metric.tag]}`}
            >
              <div className="relative flex items-center gap-3">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[radial-gradient(circle,rgba(15,23,42,0.99),rgba(2,6,23,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.17),0_0_0_1px_rgba(148,163,184,0.15)] transition duration-300 ${iconAccent[metric.tag]}`}>
                  <Icon strokeWidth={2.05} className={`h-[1.24rem] w-[1.24rem] ${metric.accent} transition duration-300 group-hover:brightness-125`} />
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
