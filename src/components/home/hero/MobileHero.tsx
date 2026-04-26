'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroCopy, trustItems } from './HeroData';
import { MobileOperationsPreview } from './MobileOperationsPreview';

export function MobileHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#030917] px-4 pb-10 pt-6 sm:px-5 xl:hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.35, 0.2], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[520px] rounded-[28px] border border-white/15 bg-slate-950/55 p-5 shadow-[0_16px_50px_rgba(2,6,23,0.72)] backdrop-blur-md">
        <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-xs font-semibold tracking-[0.24em] text-cyan-300">
          {heroCopy.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-[clamp(2.7rem,12vw,4.1rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
        >
          {heroCopy.headlineLead}
          <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{heroCopy.headlineAccent}</span>
        </motion.h1>
        <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="mt-4 max-w-[96%] text-[1.72rem] leading-[1.32] text-slate-300">
          {heroCopy.body}
        </motion.p>

        <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }} className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={heroCopy.primaryCta.href}
            className="group inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl border border-blue-400/50 bg-gradient-to-r from-blue-500 to-blue-600 px-5 text-[1.95rem] font-medium text-white shadow-[0_0_30px_rgba(37,99,235,0.34)] transition duration-300 hover:-translate-y-0.5"
          >
            {heroCopy.primaryCta.label}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href={heroCopy.secondaryCta.href} className="inline-flex min-h-[58px] w-full items-center justify-center rounded-2xl border border-white/20 bg-slate-900/65 px-5 text-[1.95rem] font-medium text-white transition duration-300 hover:border-cyan-300/40">
            {heroCopy.secondaryCta.label}
          </Link>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.04 }}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/55 px-3 py-2.5 transition duration-300 hover:border-cyan-300/30"
              >
                <Icon className={`h-4 w-4 ${item.accent} transition duration-300 group-hover:brightness-125`} />
                <span className="text-sm text-slate-300">{item.label}</span>
              </motion.div>
            );
          })}
        </div>

        <MobileOperationsPreview />
      </div>

      <div className="pointer-events-none relative mx-auto mt-5 h-12 max-w-[520px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.5),transparent_70%)]" />
    </section>
  );
}
