'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  Gauge,
  Layers3,
  MonitorSmartphone,
  Route,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type ProofItem = {
  id: string;
  name: string;
  type: 'Client' | 'Internal' | 'Sample';
  title: string;
  problem: string;
  build: string;
  outcome: string;
  image: string;
  imageAlt: string;
  stack: string[];
  visual: 'workshop' | 'petguardian' | 'lead' | 'workspace' | 'app' | 'website' | 'training';
  icon: LucideIcon;
};

const featuredProofs: ProofItem[] = [
  {
    id: 'tj-service-repairs',
    name: 'TJ Service & Repairs',
    type: 'Client',
    title: 'Business management system with a client dashboard',
    problem: 'Manual tracking made job status hard to see.',
    build: 'Client dashboard, workshop tracking, vehicle records, quotes, invoices, notifications.',
    outcome: 'Cleaner tracking and better visibility.',
    image: '/images/work/workshop-client-portal/workshop-client-portal-01.png',
    imageAlt: 'TJ Service & Repairs workshop dashboard preview',
    stack: ['Web app', 'Dashboard', 'Workflows'],
    visual: 'workshop',
    icon: Wrench,
  },
  {
    id: 'petguardian-quote',
    name: 'PetGuardian',
    type: 'Internal',
    title: 'Quote request and follow-up system',
    problem: 'Requests needed structure and consistent follow-up.',
    build: 'Intake form, quote estimate, status tracking, follow-up reminders.',
    outcome: 'Faster response and cleaner request handling.',
    image: '/images/work/petguardian-quote/petguardian-quote-01.png',
    imageAlt: 'PetGuardian quote request and follow-up system preview',
    stack: ['Intake', 'Tracking', 'Follow-up'],
    visual: 'petguardian',
    icon: ClipboardList,
  },
];

const sampleProofs: ProofItem[] = [
  {
    id: 'quote-follow-up',
    name: 'Quote System',
    type: 'Sample',
    title: 'Quote request and follow-up system',
    problem: 'Enquiries arrive from multiple places and follow-ups are inconsistent.',
    build: 'A request flow that writes to a pipeline, assigns an owner, and tracks status.',
    outcome: 'Faster response and cleaner tracking.',
    image: '/images/work/rapid-rise-ai-sample-build-lead-capture.jpg',
    imageAlt: 'Quote request and follow-up sample build preview',
    stack: ['Intake', 'Tracking', 'Follow-up'],
    visual: 'lead',
    icon: BellRing,
  },
  {
    id: 'lead-routing',
    name: 'Lead Routing',
    type: 'Sample',
    title: 'Lead qualification and owner routing flow',
    problem: 'Leads are manually triaged and delayed during busy periods.',
    build: 'Qualification rules route leads by service type, priority, and availability.',
    outcome: 'Quicker handoff and better visibility.',
    image: '/images/work/rapid-rise-ai-sample-build-automations.jpg',
    imageAlt: 'Lead qualification and owner routing sample preview',
    stack: ['Apps Script', 'Gmail', 'Sheets'],
    visual: 'lead',
    icon: Route,
  },
  {
    id: 'workspace-onboarding',
    name: 'Workspace',
    type: 'Sample',
    title: 'Workspace onboarding and permissions system',
    problem: 'User provisioning is inconsistent and manual checks are missed.',
    build: 'Role templates, approval checks, and checklist tracking.',
    outcome: 'Cleaner onboarding and fewer access gaps.',
    image: '/images/work/rapid-rise-ai-sample-build-workspace.jpg',
    imageAlt: 'Workspace onboarding and permissions sample preview',
    stack: ['Google Workspace', 'Apps Script', 'Admin Console'],
    visual: 'workspace',
    icon: ShieldCheck,
  },
  {
    id: 'internal-ops-app',
    name: 'Ops App',
    type: 'Sample',
    title: 'Internal operations web app',
    problem: 'Teams rely on spreadsheets and disconnected tools for day-to-day work.',
    build: 'Forms, status boards, dashboards, and controlled user roles.',
    outcome: 'Fewer manual updates and faster execution.',
    image: '/images/work/rapid-rise-ai-sample-build-web-apps.jpg',
    imageAlt: 'Internal operations web app sample preview',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    visual: 'app',
    icon: MonitorSmartphone,
  },
  {
    id: 'conversion-website',
    name: 'Website',
    type: 'Sample',
    title: 'Conversion-focused service website',
    problem: 'Existing site does not guide users toward clear next actions.',
    build: 'Service positioning, lead capture, trust blocks, and clean mobile UX.',
    outcome: 'More qualified enquiries and better conversion flow.',
    image: '/images/work/rapid-rise-ai-sample-build-websites.jpg',
    imageAlt: 'Conversion-focused website sample preview',
    stack: ['Next.js', 'Tailwind', 'Cloudflare'],
    visual: 'website',
    icon: Eye,
  },
  {
    id: 'team-enablement',
    name: 'Enablement',
    type: 'Sample',
    title: 'Team enablement and handover training',
    problem: 'Systems are delivered but team adoption is inconsistent.',
    build: 'Role-specific walkthroughs, SOPs, and handover templates.',
    outcome: 'Higher adoption and fewer repeated support requests.',
    image: '/images/work/rapid-rise-ai-sample-build-training.jpg',
    imageAlt: 'Team enablement and handover training sample preview',
    stack: ['Google Meet', 'SOPs', 'Templates'],
    visual: 'training',
    icon: FileText,
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function StackPill({ label }: { label: string }) {
  return <span className="rounded-full border border-cyan-200/16 bg-slate-950/48 px-2.5 py-1 text-[0.68rem] text-slate-300 transition group-hover:border-cyan-200/30 group-hover:text-slate-100">{label}</span>;
}

function ProofMetric({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-3">
      <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cyan-200"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}

function UiMockOverlay({ visual, active }: { visual: ProofItem['visual']; active: boolean }) {
  const rowsByVisual: Record<ProofItem['visual'], string[]> = {
    workshop: ['Job status', 'Vehicle timeline', 'Quote approval', 'Invoice status'],
    petguardian: ['Request received', 'Estimate generated', 'Follow-up scheduled', 'Status tracked'],
    lead: ['Qualified', 'Owner routed', 'Follow-up set'],
    workspace: ['Account created', 'Permissions checked', 'Admin approved'],
    app: ['Tasks active', 'Roles secured', 'Report live'],
    website: ['Trust block', 'CTA clicked', 'Lead captured'],
    training: ['SOP saved', 'Checklist done', 'Handover ready'],
  };

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-cyan-300/18 bg-slate-950/78 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cyan-200">System preview</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/26 bg-cyan-400/10 px-2 py-0.5 text-[0.56rem] text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200" /> Live</span>
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {rowsByVisual[visual].map((row, index) => (
          <motion.div key={row} animate={active ? { opacity: 1, x: 0 } : { opacity: 0.74, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.025] px-2.5 py-1.5 text-[0.62rem] text-slate-200">
            <span>{row}</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-200" />
          </motion.div>
        ))}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800/90"><motion.div animate={active ? { width: '100%' } : { width: '68%' }} transition={{ duration: 0.8, ease: transitionEase }} className="h-full rounded-full bg-gradient-to-r from-[#0ea5ff] to-[#38dfff]" /></div>
    </div>
  );
}

function ProofImage({ item, active, priority = false }: { item: ProofItem; active: boolean; priority?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-300/16 bg-slate-950/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="relative aspect-[16/10] w-full">
        <Image src={item.image} alt={item.imageAlt} fill priority={priority} sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover object-top opacity-[0.88] transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,17,0.04),rgba(2,7,17,0.66))]" />
      </div>
      <UiMockOverlay visual={item.visual} active={active} />
    </div>
  );
}

function FeaturedProofCard({ item, active, index, onHover }: { item: ProofItem; active: boolean; index: number; onHover: (id: string | null) => void }) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.52, delay: index * 0.08, ease: transitionEase }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      className="group relative overflow-hidden rounded-[32px] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(6,18,34,0.92),rgba(2,8,18,0.96))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/48 hover:shadow-[0_30px_82px_rgba(0,0,0,0.44),0_0_36px_rgba(56,223,255,0.12)] lg:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,223,255,0.10),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(14,165,255,0.08),transparent_34%)]" />
      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/28 bg-cyan-400/10 text-cyan-100"><Icon className="h-5 w-5" /></span>
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/82">{item.type} proof</p>
              <h3 className="mt-1 text-2xl font-semibold leading-tight text-white">{item.name}</h3>
            </div>
          </div>
          <span className="rounded-full border border-cyan-300/26 bg-cyan-400/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cyan-100">Featured</span>
        </div>

        <ProofImage item={item} active={active} priority={index === 0} />

        <div className="mt-5">
          <h4 className="text-xl font-semibold leading-tight text-white">{item.title}</h4>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            <ProofMetric icon={Gauge} label="Problem" text={item.problem} />
            <ProofMetric icon={Layers3} label="Build" text={item.build} />
            <ProofMetric icon={Eye} label="Outcome" text={item.outcome} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{item.stack.map((stack) => <StackPill key={stack} label={stack} />)}</div>
          <Link href={`/work#proof`} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cyan-300/34 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
            View proof <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function CompactProofCard({ item, index, onHover, active }: { item: ProofItem; index: number; onHover: (id: string | null) => void; active: boolean }) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.45, delay: 0.16 + index * 0.055, ease: transitionEase }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      className="group relative min-w-[290px] overflow-hidden rounded-[26px] border border-cyan-300/16 bg-[rgba(4,13,28,0.82)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/42 md:min-w-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-cyan-300/12 bg-slate-950/70">
        <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 24vw, 86vw" className="object-cover object-top opacity-[0.86] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,7,17,0.68))]" />
        <motion.div animate={active ? { opacity: 1, y: 0 } : { opacity: 0.86, y: 2 }} className="absolute bottom-3 left-3 right-3 rounded-xl border border-cyan-300/16 bg-slate-950/72 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[0.62rem] text-cyan-100"><Icon className="h-3.5 w-3.5" /> {item.type}</div>
        </motion.div>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-tight text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.outcome}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{item.stack.map((stack) => <StackPill key={stack} label={stack} />)}</div>
      <Link href="/work#proof" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
        View proof <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}

export function ProofGalleryPreview() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(featuredProofs[0].id);
  const allSwipeCards = [...featuredProofs, ...sampleProofs];

  return (
    <section className="proof-gallery-preview homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="proof-gallery-title">
      <div className="pointer-events-none absolute inset-0 border-t border-cyan-200/[0.07] bg-[radial-gradient(circle_at_62%_24%,rgba(0,145,255,0.12),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(0,220,255,0.05),transparent_30%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[860px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">PROOF GALLERY</p>
          <h2 id="proof-gallery-title" className="mt-4 text-[clamp(2.15rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">Proof that the systems are real.</h2>
          <p className="mt-5 max-w-[820px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Dashboards, portals, workflows, and automation layers built for practical business problems.</p>
        </motion.div>

        <div className="mt-12 hidden grid-cols-[1.12fr_0.88fr] gap-5 lg:grid">
          <FeaturedProofCard item={featuredProofs[0]} active={activeId === featuredProofs[0].id} index={0} onHover={setActiveId} />
          <div className="grid gap-5">
            <FeaturedProofCard item={featuredProofs[1]} active={activeId === featuredProofs[1].id} index={1} onHover={setActiveId} />
            <div className="grid grid-cols-2 gap-5">
              {sampleProofs.slice(0, 2).map((item, index) => <CompactProofCard key={item.id} item={item} index={index} active={activeId === item.id} onHover={setActiveId} />)}
            </div>
          </div>
        </div>

        <div className="mt-6 hidden gap-4 overflow-x-auto pb-3 lg:flex">
          {sampleProofs.slice(2).map((item, index) => <CompactProofCard key={item.id} item={item} index={index + 2} active={activeId === item.id} onHover={setActiveId} />)}
        </div>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 lg:hidden">
          {allSwipeCards.map((item, index) => (
            <div key={item.id} className="w-[86vw] max-w-[390px] shrink-0 snap-center">
              <CompactProofCard item={item} index={index} active={activeId === item.id} onHover={setActiveId} />
            </div>
          ))}
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.25 }} className="mt-6 flex flex-col gap-4 rounded-3xl border border-cyan-200/14 bg-slate-950/44 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <p className="max-w-[760px] text-sm leading-relaxed text-slate-300">Want to see the full proof gallery and build notes?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/work#proof" className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">View Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
            <Link href="/quote" className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#0ea5ff,#1d7dff)] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(14,165,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">Request a Quote</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
