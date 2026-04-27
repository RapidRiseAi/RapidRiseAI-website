'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, BellRing, FileText, Gauge, Mail, MessageSquare, TriangleAlert, UserRound, UserSquare2, WalletCards, Workflow } from 'lucide-react';
import { useMemo, useState } from 'react';

type LeakNode = {
  id: string;
  label: string;
  leak: string;
  tooltip: string;
  solution: 'Capture' | 'Route' | 'Track' | 'Remind' | 'Report';
  position: { left: string; top: string };
  icon: typeof Activity;
};

const leakNodes: LeakNode[] = [
  { id: 'website', label: 'Website enquiry', leak: 'Slow reply', tooltip: 'Lead arrives, but nobody sees it fast enough.', solution: 'Capture', position: { left: '8%', top: '18%' }, icon: Workflow },
  { id: 'whatsapp', label: 'WhatsApp message', leak: 'Lost context', tooltip: 'Important requests get buried between normal chats.', solution: 'Capture', position: { left: '12%', top: '46%' }, icon: MessageSquare },
  { id: 'email', label: 'Email inbox', leak: 'No owner', tooltip: 'Messages wait because no owner is assigned.', solution: 'Route', position: { left: '32%', top: '16%' }, icon: Mail },
  { id: 'staff', label: 'Staff member', leak: 'Repeated admin', tooltip: 'Staff repeat the same manual steps instead of moving work forward.', solution: 'Route', position: { left: '43%', top: '43%' }, icon: UserRound },
  { id: 'sheet', label: 'Spreadsheet', leak: 'Manual copy', tooltip: 'Data gets copied by hand and mistakes creep in.', solution: 'Track', position: { left: '27%', top: '70%' }, icon: FileText },
  { id: 'quote', label: 'Quote', leak: 'No status', tooltip: 'Quotes are delayed because details are scattered.', solution: 'Track', position: { left: '62%', top: '32%' }, icon: WalletCards },
  { id: 'followup', label: 'Follow-up', leak: 'Forgotten follow-up', tooltip: 'Nobody gets reminded, so opportunities go cold.', solution: 'Remind', position: { left: '76%', top: '17%' }, icon: BellRing },
  { id: 'customer', label: 'Customer update', leak: 'Lost context', tooltip: 'Customers ask for updates because nobody knows the latest status.', solution: 'Remind', position: { left: '72%', top: '56%' }, icon: UserSquare2 },
  { id: 'report', label: 'Report', leak: 'No report', tooltip: 'Without tracking, the same problems repeat.', solution: 'Report', position: { left: '82%', top: '75%' }, icon: Gauge },
];

const links = [
  'M110 130 C210 140, 300 190, 400 250',
  'M120 285 C210 284, 290 280, 400 250',
  'M280 110 C340 145, 365 180, 400 250',
  'M400 250 C370 320, 330 360, 290 420',
  'M400 250 C500 220, 560 205, 620 190',
  'M620 190 C680 150, 730 125, 760 115',
  'M760 115 C760 185, 760 235, 735 305',
  'M735 305 C760 355, 790 400, 820 445',
  'M290 420 C430 450, 620 460, 820 445',
];

function WorkflowNode({ node, active, delay }: { node: LeakNode; active: boolean; delay: number }) {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.38, delay }}
      style={node.position}
      className={`absolute z-20 w-[168px] rounded-2xl border bg-[rgba(5,12,24,0.84)] px-3.5 py-3 text-left shadow-[0_8px_26px_rgba(2,6,23,0.55)] transition duration-300 ${active ? 'border-cyan-300/55 shadow-[0_0_20px_rgba(56,189,248,0.26)]' : 'border-[rgba(125,165,220,0.16)]'}`}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/22 bg-slate-950/80">
          <Icon className="h-4.5 w-4.5 text-cyan-200" />
        </span>
        <p className="text-[0.78rem] font-medium leading-tight text-white">{node.label}</p>
      </div>
    </motion.div>
  );
}

function LeakTooltip({ text }: { text: string }) {
  return <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-40 w-[260px] -translate-x-1/2 rounded-xl border border-white/14 bg-slate-950/95 px-3 py-2 text-[0.76rem] leading-relaxed text-slate-200 shadow-[0_16px_40px_rgba(2,6,23,0.7)]">{text}</div>;
}

function LeakBadge({ node, active, onHover, onLeave, delay, upgraded }: { node: LeakNode; active: boolean; onHover: () => void; onLeave: () => void; delay: number; upgraded: boolean }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay }}
      style={{ left: `calc(${node.position.left} + 108px)`, top: `calc(${node.position.top} + 42px)` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`absolute z-30 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] transition duration-300 ${upgraded ? 'border-cyan-300/38 bg-cyan-500/15 text-cyan-100 shadow-[0_0_18px_rgba(56,189,248,0.18)]' : 'border-[rgba(255,160,70,0.35)] bg-[rgba(46,20,12,0.74)] text-[rgba(255,210,170,0.96)]'} ${active ? 'shadow-[0_0_18px_rgba(255,126,55,0.22)]' : ''}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${upgraded ? 'bg-cyan-200' : 'bg-[#ff9d3d]'}`} />
      {upgraded ? `${node.solution}d` : node.leak}
    </motion.button>
  );
}

function SystemLayer({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={active ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="pointer-events-none absolute inset-x-8 bottom-6 top-8 z-10 rounded-[22px] border border-cyan-300/22 bg-[linear-gradient(160deg,rgba(14,116,255,0.15),rgba(6,18,38,0.04)_58%,transparent)]"
    >
      <div className="absolute inset-x-8 bottom-5 flex flex-wrap gap-2">
        {['Capture', 'Route', 'Track', 'Remind', 'Report'].map((label) => (
          <span key={label} className="rounded-full border border-cyan-300/38 bg-cyan-400/12 px-2.5 py-1 text-[0.66rem] tracking-[0.08em] text-cyan-100">
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MobileLeakCard({ node, isOpen, onToggle }: { node: LeakNode; isOpen: boolean; onToggle: () => void }) {
  const Icon = node.icon;
  return (
    <div className="rounded-2xl border border-white/12 bg-[rgba(5,12,24,0.8)]">
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-200/24 bg-slate-950/85">
            <Icon className="h-4.5 w-4.5 text-cyan-200" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">{node.label}</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-300/34 bg-amber-900/30 px-2 py-0.5 text-[0.65rem] text-amber-100">
              <TriangleAlert className="h-3 w-3" /> {node.leak}
            </span>
          </div>
        </div>
        <span className="text-xs text-slate-400">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="border-t border-white/10 px-4 pb-4 pt-3 text-sm text-slate-300">
              <p>{node.tooltip}</p>
              <p className="mt-2 text-cyan-100">Rapid Rise layer: <span className="font-medium">{node.solution}</span> this step automatically.</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function BusinessLeakMap() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [openCards, setOpenCards] = useState<string[]>(['website']);
  const [systemActive, setSystemActive] = useState<boolean>(Boolean(reduceMotion));
  const activeSet = useMemo(() => new Set(openCards), [openCards]);
  const hoveredNode = useMemo(() => leakNodes.find((n) => n.id === hovered) ?? null, [hovered]);

  return (
    <section className="business-leak-map-section relative overflow-hidden bg-[linear-gradient(180deg,#030815_0%,#04101f_46%,#030814_100%)] px-5 pb-[88px] pt-[26px] scroll-mt-[120px] sm:px-7 lg:px-10 lg:pb-[116px] lg:pt-[34px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(60,120,190,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,120,190,0.08)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_74%_44%,rgba(30,120,255,0.11),transparent_56%),radial-gradient(ellipse_at_26%_78%,rgba(25,80,180,0.08),transparent_58%)]" />
      <div className="relative mx-auto max-w-[1380px]">
        <motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="text-xs font-semibold tracking-[0.24em] text-cyan-300">
          BUSINESS LEAK MAP
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.04 }} className="mt-4 max-w-[880px] text-[clamp(2.2rem,5.5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
          Where work leaks out.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="mt-5 max-w-[760px] text-[clamp(0.98rem,1.45vw,1.24rem)] leading-[1.55] text-slate-300">
          Most businesses do not lose control in one big moment. They lose it through small manual gaps every day.
        </motion.p>

        <div className="mt-12 hidden lg:block">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px -10% 0px' }} transition={{ duration: 0.55 }} onViewportEnter={() => setSystemActive(true)} className="relative h-[680px] overflow-hidden rounded-[32px] border border-[rgba(90,190,255,0.24)] bg-[linear-gradient(180deg,rgba(8,17,30,0.96),rgba(4,9,18,0.98))] p-8 shadow-[inset_0_0_0_1px_rgba(110,190,255,0.08),0_0_45px_rgba(24,126,255,0.1),0_30px_90px_rgba(0,0,0,0.35)]">
            <p className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-xs tracking-[0.42em] text-slate-400/30">MANUAL WORKFLOW</p>
            <svg viewBox="0 0 920 560" className="absolute inset-0 h-full w-full" aria-hidden>
              {links.map((path, index) => (
                <motion.path key={`manual-${index}`} d={path} fill="none" stroke="rgba(255,150,75,0.44)" strokeDasharray="6 8" strokeWidth="1.5" strokeLinecap="round" initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }} />
              ))}
              {links.map((path, index) => (
                <motion.path key={`system-${index}`} d={path} fill="none" stroke="rgba(69,223,255,0.68)" strokeWidth="2.1" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={systemActive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.9, delay: 1.1 + index * 0.04 }} />
              ))}
            </svg>

            <SystemLayer active={systemActive} />

            {leakNodes.map((node, index) => (
              <WorkflowNode key={node.id} node={node} active={hovered === node.id} delay={0.18 + index * 0.07} />
            ))}

            {leakNodes.map((node, index) => (
              <LeakBadge key={`${node.id}-badge-wrap`} node={node} active={hovered === node.id} onHover={() => setHovered(node.id)} onLeave={() => setHovered(null)} delay={0.52 + index * 0.08} upgraded={systemActive} />
            ))}
            {hoveredNode ? (
              <div style={{ left: `calc(${hoveredNode.position.left} + 108px)`, top: `calc(${hoveredNode.position.top} - 2px)` }} className="absolute z-40">
                <LeakTooltip text={hoveredNode.tooltip} />
              </div>
            ) : null}

            <motion.div initial={{ opacity: 0, y: 8 }} animate={systemActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.45, delay: 1.6 }} className="absolute bottom-7 right-8">
              <Link href="/quote" className="inline-flex items-center rounded-full border border-cyan-300/44 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200/66 hover:bg-cyan-300/16">
                FIX THESE LEAKS
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          <div className="rounded-2xl border border-amber-300/24 bg-amber-950/20 px-4 py-3 text-sm text-amber-100/90">Manual workflow leaks: scattered messages, delayed quotes, forgotten follow-ups, and missing visibility.</div>
          {leakNodes
            .filter((n) => n.id !== 'staff' && n.id !== 'customer')
            .map((node) => (
              <MobileLeakCard key={node.id} node={node} isOpen={activeSet.has(node.id)} onToggle={() => setOpenCards((prev) => (prev.includes(node.id) ? prev.filter((id) => id !== node.id) : [...prev, node.id]))} />
            ))}

          <div className="rounded-2xl border border-cyan-300/34 bg-[linear-gradient(180deg,rgba(8,22,45,0.9),rgba(7,16,32,0.95))] px-4 py-4">
            <p className="text-sm font-medium text-cyan-100">Rapid Rise System Layer</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Capture, route, track, remind, and report from one connected workflow.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Capture', 'Route', 'Track', 'Remind', 'Report'].map((item) => (
                <span key={item} className="rounded-full border border-cyan-300/36 bg-cyan-500/12 px-2.5 py-1 text-[0.66rem] tracking-[0.08em] text-cyan-100">{item}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link href="/quote" className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-blue-300/54 bg-gradient-to-r from-[#2d7dff] to-[#2f65ff] px-4 text-sm font-medium text-white">Request a Quote</Link>
            <Link href="/work" className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-white/22 bg-slate-900/62 px-4 text-sm font-medium text-white">View Work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
