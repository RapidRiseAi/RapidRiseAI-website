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
    <section className="relative hidden overflow-hidden border-b border-white/10 bg-[linear-gradient(114deg,#030712_0%,#05101c_46%,#061323_100%)] pb-15 pt-14 xl:block">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(2,5,12,0.98)_0%,rgba(3,8,16,0.84)_58%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_24%_20%,rgba(148,163,184,0.1),transparent_50%),radial-gradient(circle_at_74%_20%,rgba(51,65,85,0.12),transparent_54%)] opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(70,120,210,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(70,120,210,0.11)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[57%] bg-[linear-gradient(90deg,rgba(7,17,32,0.46),rgba(7,17,32,0.2),transparent_78%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[54%] bg-[linear-gradient(270deg,rgba(12,52,130,0.24),rgba(8,28,70,0.11),transparent_76%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_44%,rgba(56,189,248,0.08),transparent_58%),radial-gradient(ellipse_at_78%_44%,rgba(37,99,235,0.16),transparent_54%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(2,6,20,0.56)_100%)]" />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.45, 0.3], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-[-15%] top-[10%] h-[660px] w-[660px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)]"
      />
      <div className="pointer-events-none absolute -bottom-32 right-[18%] h-72 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_74%)] blur-2xl" />

      <div className="relative mx-auto max-w-[1520px] px-8 2xl:px-12">
        <div className="grid grid-cols-[minmax(590px,0.95fr)_minmax(790px,1.05fr)] items-start gap-9">
          <div className="min-w-0 pt-7">
            <motion.p initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-sm font-semibold tracking-[0.24em] text-cyan-300">
              {heroCopy.eyebrow}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 max-w-[780px] text-[clamp(2.95rem,4.45vw,5.35rem)] font-semibold leading-[0.95] tracking-[-0.042em] text-white"
            >
              <span className="block whitespace-nowrap">Manual work is</span>
              <span className="block whitespace-nowrap">costing you</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-[#66dfff] via-[#49d6ff] to-[#2e84ff] bg-clip-text text-transparent">leads, time,</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-[#66dfff] via-[#49d6ff] to-[#2e84ff] bg-clip-text text-transparent">and control.</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 max-w-[540px] text-[1.4rem] leading-[1.42] text-slate-300"
            >
              {heroCopy.body}
            </motion.p>

            <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="mt-7 flex items-center gap-3.5">
              <Link
                href={heroCopy.primaryCta.href}
                className="group inline-flex min-h-[64px] min-w-[252px] items-center justify-center gap-2 rounded-2xl border border-blue-300/60 bg-gradient-to-r from-[#2d7dff] to-[#2f65ff] px-8 text-[1.7rem] font-medium text-white shadow-[0_0_36px_rgba(46,140,255,0.34),inset_0_1px_0_rgba(219,234,254,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_54px_rgba(46,140,255,0.45),inset_0_1px_0_rgba(219,234,254,0.28)]"
              >
                {heroCopy.primaryCta.label}
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={heroCopy.secondaryCta.href}
                className="group inline-flex min-h-[64px] min-w-[226px] items-center justify-center rounded-2xl border border-white/22 bg-slate-950/58 px-8 text-[1.7rem] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(34,211,238,0.15)]"
              >
                {heroCopy.secondaryCta.label}
              </Link>
            </motion.div>

            <div className="mt-8 grid grid-cols-4 gap-2.5 border-y border-white/10 bg-white/[0.015] px-2 py-3.5">
              {trustItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.22 + index * 0.04 }}
                    className="group flex items-center gap-3 px-2 py-1.5 transition duration-300 hover:-translate-y-0.5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/20 bg-[radial-gradient(circle,rgba(15,23,42,0.96),rgba(2,6,23,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(125,211,252,0.07)] transition duration-300 group-hover:border-cyan-300/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_16px_rgba(34,211,238,0.2)]">
                      <Icon strokeWidth={2.05} className={`h-[1.08rem] w-[1.08rem] ${item.accent} transition duration-300 group-hover:brightness-125`} />
                    </span>
                    <span className="text-[1rem] leading-tight text-slate-300">{item.label}</span>
                    {index < trustItems.length - 1 ? <span className="ml-auto h-9 w-px bg-cyan-100/14" /> : null}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="-mt-1">
            <DesktopOperationsPreview />
          </div>
        </div>

        <ImpactSnapshotDesktop />
      </div>
    </section>
  );
}
