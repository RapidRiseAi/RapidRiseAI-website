'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { DesktopOperationsPreview } from './DesktopOperationsPreview';
import { heroCopy, trustItems } from './HeroData';
import { ImpactSnapshotDesktop } from './ImpactSnapshotDesktop';

export function DesktopHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative hidden overflow-hidden border-b border-white/10 bg-[#030916] pb-18 pt-14 xl:block">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.45, 0.3], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-[-15%] top-[10%] h-[660px] w-[660px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.32),transparent_68%)]"
      />
      <div className="pointer-events-none absolute -bottom-32 right-[18%] h-72 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25),transparent_72%)] blur-2xl" />

      <div className="relative mx-auto max-w-[1520px] px-8 2xl:px-12">
        <div className="grid grid-cols-[minmax(500px,0.84fr)_minmax(760px,1.16fr)] items-start gap-14">
          <div className="min-w-0 pt-8">
            <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-sm font-semibold tracking-[0.24em] text-cyan-300">
              {heroCopy.eyebrow}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 max-w-[700px] text-[clamp(3.6rem,5.2vw,6.4rem)] font-semibold leading-[0.93] tracking-[-0.048em] text-white"
            >
              {heroCopy.headlineLead}
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{heroCopy.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-7 max-w-[600px] text-[1.72rem] leading-[1.38] text-slate-300"
            >
              {heroCopy.body}
            </motion.p>

            <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="mt-9 flex items-center gap-4">
              <Link
                href={heroCopy.primaryCta.href}
                className="group inline-flex min-h-[64px] min-w-[252px] items-center justify-center gap-2 rounded-2xl border border-blue-400/55 bg-gradient-to-r from-blue-500 to-blue-600 px-8 text-[1.7rem] font-medium text-white shadow-[0_0_35px_rgba(37,99,235,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]"
              >
                {heroCopy.primaryCta.label}
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={heroCopy.secondaryCta.href}
                className="group inline-flex min-h-[64px] min-w-[226px] items-center justify-center rounded-2xl border border-white/20 bg-slate-950/55 px-8 text-[1.7rem] font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
              >
                {heroCopy.secondaryCta.label}
              </Link>
            </motion.div>

            <div className="mt-9 grid grid-cols-4 gap-2 border-y border-white/10 py-4">
              {trustItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.22 + index * 0.04 }}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.03]"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 transition duration-300 group-hover:border-cyan-300/40 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]">
                      <Icon className={`h-5 w-5 ${item.accent} transition duration-300 group-hover:brightness-125`} />
                    </span>
                    <span className="text-[1.1rem] leading-tight text-slate-300">{item.label}</span>
                    {index < trustItems.length - 1 ? <span className="ml-auto h-10 w-px bg-white/15" /> : null}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <DesktopOperationsPreview />
        </div>

        <ImpactSnapshotDesktop />
      </div>
    </section>
  );
}
