'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroCopy, trustItems } from './HeroData';
import { MobileOperationsPreview } from './MobileOperationsPreview';

export function MobileHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home-hero" className="relative overflow-hidden border-b border-white/10 bg-[#030917] px-5 pb-9 pt-5 sm:px-6 xl:hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.35, 0.2], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[480px] rounded-[30px] border border-white/15 bg-slate-950/58 p-5 shadow-[0_16px_50px_rgba(2,6,23,0.72)]">
        <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-[11.5px] font-semibold tracking-[0.22em] text-cyan-300">
          {heroCopy.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-[clamp(2.4rem,10.9vw,3.2rem)] font-semibold leading-[1.01] tracking-[-0.04em] text-white"
        >
          {heroCopy.headlineLead}
          <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{heroCopy.headlineAccent}</span>
        </motion.h1>
        <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} className="mt-5 max-w-[98%] text-[0.98rem] leading-[1.55] text-slate-300">
          {heroCopy.body}
        </motion.p>

        <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }} className="mt-6 grid grid-cols-2 gap-2.5 max-[359px]:grid-cols-1">
          <Link
            href={heroCopy.primaryCta.href}
            className="group inline-flex min-h-[54px] w-full items-center justify-center gap-1.5 rounded-2xl border border-blue-400/58 bg-gradient-to-r from-[#2d7dff] to-[#2f65ff] px-4 text-[0.97rem] font-medium text-white shadow-[0_0_30px_rgba(37,99,235,0.34)] transition duration-300 hover:-translate-y-0.5"
          >
            {heroCopy.primaryCta.label}
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href={heroCopy.secondaryCta.href} className="inline-flex min-h-[54px] w-full items-center justify-center rounded-2xl border border-white/22 bg-slate-900/66 px-4 text-[0.97rem] font-medium text-white transition duration-300 hover:border-cyan-300/40">
            {heroCopy.secondaryCta.label}
          </Link>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            const trustGlow = ['group-hover:shadow-[0_0_14px_rgba(69,245,176,0.2)]', 'group-hover:shadow-[0_0_14px_rgba(88,166,255,0.2)]', 'group-hover:shadow-[0_0_14px_rgba(69,223,255,0.2)]', 'group-hover:shadow-[0_0_14px_rgba(154,108,255,0.22)]'][index];
            return (
              <motion.div
                key={item.label}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.04 }}
                className={`group flex min-h-[56px] items-center gap-2 rounded-xl border border-white/10 bg-slate-900/58 px-2.5 py-2 transition duration-300 hover:border-cyan-300/30 ${trustGlow}`}
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200/22 bg-[radial-gradient(circle,rgba(15,23,42,0.96),rgba(2,6,23,0.9))]">
                  <Icon className={`h-[17px] w-[17px] ${item.accent} transition duration-300 group-hover:brightness-125`} />
                </span>
                <span className="text-[0.79rem] leading-snug text-slate-300">{item.label}</span>
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
