'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCount } from './AnimatedCount';
import { impactMetrics } from './HeroData';

export function ImpactSnapshotDesktop() {
  const reduceMotion = useReducedMotion();

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
              className="group rounded-2xl border border-white/15 bg-slate-950/65 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_38px_rgba(2,6,23,0.62)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_48px_rgba(2,6,23,0.7)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/85 transition duration-300 group-hover:border-cyan-300/35 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.22)]">
                  <Icon className={`h-5 w-5 ${metric.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <p className="text-sm font-semibold tracking-[0.22em] text-white/80">{metric.tag}</p>
              </div>
              <p className="mt-5 text-[3.6rem] font-semibold leading-none tracking-[-0.04em] text-white">
                <AnimatedCount value={metric.countTo} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} />
              </p>
              <p className="mt-3 text-[1.75rem] leading-tight text-slate-300">{metric.label}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
