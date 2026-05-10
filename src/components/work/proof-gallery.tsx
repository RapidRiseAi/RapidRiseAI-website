'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Gauge,
  Globe2,
  LayoutDashboard,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

type CaseStudy = {
  id: 'tj-service-repairs' | 'petguardian';
  type: 'Client' | 'Internal';
  project: string;
  title: string;
  problem: string;
  build: string;
  outcome: string;
  tags: string[];
  cta: string;
  tabs: string[];
};

type SampleBuild = {
  id: string;
  category: string;
  title: string;
  problem: string;
  build: string;
  outcome: string;
  stack: string[];
  icon: LucideIcon;
};

const quoteHref = '/quote';

const caseStudies: CaseStudy[] = [
  {
    id: 'tj-service-repairs',
    type: 'Client',
    project: 'TJ Service & Repairs',
    title: 'Business management system with a client dashboard',
    problem: 'Operations were tracked manually and status was hard to see at a glance.',
    build: 'Management system with client dashboard and structured tracking.',
    outcome: 'Cleaner tracking and better visibility across jobs and updates.',
    tags: ['Web app', 'Dashboard', 'Workflows'],
    cta: 'Request something similar',
    tabs: ['Overview', 'Workshop Dashboard', 'Client Dashboard', 'Vehicle Timeline', 'Quotes', 'Invoices', 'Notifications', 'Handover'],
  },
  {
    id: 'petguardian',
    type: 'Internal',
    project: 'PetGuardian',
    title: 'Quote request and follow-up system',
    problem: 'Quote requests needed structured intake and consistent follow-up.',
    build: 'Simple quote request flow that captures details and tracks status.',
    outcome: 'Faster response and cleaner tracking from request to close.',
    tags: ['Intake', 'Tracking', 'Follow-up'],
    cta: 'Request a similar workflow',
    tabs: ['Request Intake', 'Estimate Summary', 'Status Pipeline', 'Follow-up Reminder', 'Owner Dashboard'],
  },
];

const filters = ['All', 'Lead capture', 'Automations', 'Google Workspace', 'Web apps', 'Websites', 'Training'];

const sampleBuilds: SampleBuild[] = [
  {
    id: 'quote-request-follow-up',
    category: 'Lead capture',
    title: 'Quote request and follow-up system',
    problem: 'Enquiries arrive from multiple places and follow-ups are inconsistent.',
    build: 'Quote request flow writes to a pipeline, assigns owner, tracks status from New to Won or Lost.',
    outcome: 'Faster response, fewer missed leads, cleaner tracking.',
    stack: ['Next.js', 'Google Sheets', 'Apps Script'],
    icon: MessageSquareText,
  },
  {
    id: 'lead-routing',
    category: 'Lead capture',
    title: 'Lead qualification and owner routing flow',
    problem: 'Leads are manually triaged and delayed during busy periods.',
    build: 'Automated qualification path routes leads by service type, priority, and availability.',
    outcome: 'Quicker handoff and better visibility.',
    stack: ['Apps Script', 'Gmail', 'Google Sheets'],
    icon: Route,
  },
  {
    id: 'workspace-onboarding',
    category: 'Google Workspace',
    title: 'Workspace onboarding and permissions system',
    problem: 'User provisioning is inconsistent and checks are missed.',
    build: 'Workspace onboarding system with role templates, approval checks, and checklist tracking.',
    outcome: 'Cleaner onboarding and fewer access gaps.',
    stack: ['Google Workspace', 'Apps Script', 'Admin Console'],
    icon: Users,
  },
  {
    id: 'internal-operations-app',
    category: 'Web apps',
    title: 'Internal operations web app',
    problem: 'Teams rely on spreadsheets and disconnected tools.',
    build: 'Lightweight web app with forms, status boards, and controlled roles.',
    outcome: 'Fewer manual updates and faster execution.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    icon: LayoutDashboard,
  },
  {
    id: 'conversion-website',
    category: 'Websites',
    title: 'Conversion-focused service website',
    problem: 'Existing site does not guide users toward clear next actions.',
    build: 'Structured website with positioning, lead capture, and mobile UX.',
    outcome: 'More qualified enquiries and better conversion flow.',
    stack: ['Next.js', 'Tailwind CSS', 'Cloudflare'],
    icon: Globe2,
  },
  {
    id: 'training-handover',
    category: 'Training',
    title: 'Team enablement and handover training',
    problem: 'Systems are delivered but adoption is inconsistent.',
    build: 'Training workflow with role-specific walkthroughs, SOPs, and support notes.',
    outcome: 'Higher adoption and fewer repeated support requests.',
    stack: ['Google Meet', 'SOPs', 'Templates'],
    icon: ClipboardCheck,
  },
];

const capabilityRows = [
  { label: 'Capture', tj: 'Client + job intake', pet: 'Quote intake', samples: 'Forms + lead flows' },
  { label: 'Automate', tj: 'Status updates', pet: 'Follow-up reminders', samples: 'Handoffs + routing' },
  { label: 'Track', tj: 'Vehicle timeline', pet: 'Request pipeline', samples: 'Boards + owners' },
  { label: 'Report', tj: 'Dashboard metrics', pet: 'Owner summary', samples: 'Reports + exports' },
  { label: 'Portal', tj: 'Client dashboard', pet: 'Internal view', samples: 'Role-based screens' },
  { label: 'Train', tj: 'Handover', pet: 'Internal process', samples: 'SOPs + adoption' },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };
const transition = (reduceMotion: boolean, delay = 0) => ({ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const });

export function WorkProofGalleryPage() {
  return (
    <div className="relative overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_82%_52%,rgba(0,220,255,0.06),transparent_30%),#020711]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(80,210,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />
      <WorkHero />
      {caseStudies.map((study) => <CaseStudyPanel key={study.id} study={study} />)}
      <SampleBuildGallery />
      <CapabilityMap />
      <WorkPageCTA />
    </div>
  );
}

function SectionShell({ eyebrow, title, subtitle, children }: React.PropsWithChildren<{ eyebrow: string; title: string; subtitle: string }>) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section className="relative z-[1] py-12 md:py-18 lg:py-24" initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={transition(Boolean(reduceMotion))}>
      <Container>
        <div className="mb-8 max-w-3xl md:mb-12">
          <p className="text-system-eyebrow text-[#38DFFF]">{eyebrow}</p>
          <h2 className="mt-3 font-[var(--font-jakarta)] text-[clamp(2rem,4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subtitle}</p>
        </div>
        {children}
      </Container>
    </motion.section>
  );
}

function WorkHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative z-[1] overflow-hidden pb-10 pt-16 md:pb-16 md:pt-24 lg:pt-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={transition(Boolean(reduceMotion), 0.05)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" /> Work Gallery</p>
            <p className="mt-5 text-system-eyebrow text-slate-500">Systems we build</p>
            <h1 className="mt-3 max-w-4xl font-[var(--font-jakarta)] text-[clamp(2.55rem,5.8vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-white">Proof of systems built for real operations.</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-cyan-100 md:text-2xl">Dashboards, portals, workflows, and automation layers designed to remove friction.</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 md:text-lg">Clean workflows, reliable tracking, faster operations.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProofCTA href={quoteHref} variant="primary">Request a Quote</ProofCTA>
              <ProofCTA href="#featured-proof" variant="secondary">View proof</ProofCTA>
            </div>
          </motion.div>
          <PortfolioDeckVisual />
        </div>
      </Container>
    </section>
  );
}

function PortfolioDeckVisual() {
  const reduceMotion = useReducedMotion();
  const cards = [
    { label: 'Dashboard', icon: Gauge, x: 0, y: 0, z: 30 },
    { label: 'Quote flow', icon: CircleDollarSign, x: -18, y: 26, z: 20 },
    { label: 'Workflow board', icon: Workflow, x: 20, y: 52, z: 10 },
  ];
  return (
    <div className="relative min-h-[420px] rounded-[34px] border border-cyan-300/18 bg-[rgba(5,16,34,0.62)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.42),0_0_70px_rgba(14,165,255,0.13),inset_0_1px_0_rgba(255,255,255,0.08)]" aria-label="Layered portfolio deck of dashboard, quote, and workflow screens.">
      <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_50%_45%,rgba(56,223,255,0.15),transparent_36%)]" />
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={card.label} className="absolute left-[8%] right-[8%] top-[12%] rounded-[28px] border border-cyan-300/22 bg-[rgba(4,13,28,0.94)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]" style={{ zIndex: card.z, transform: `translate(${card.x}px, ${card.y}px)` }} initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: card.y, scale: 1, x: card.x }} transition={transition(Boolean(reduceMotion), 0.16 + index * 0.12)}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/22 bg-cyan-300/10 text-cyan-100"><Icon className="h-5 w-5" /></span><div><p className="font-semibold text-white">{card.label}</p><p className="text-xs text-slate-500">Built for operations</p></div></div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">Real systems</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {['Active jobs', 'Pending quotes', 'Updates sent'].map((metric, metricIndex) => <div key={metric} className="rounded-2xl border border-cyan-300/12 bg-slate-950/45 p-3"><p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">{metric}</p><p className="mt-2 text-xl font-semibold text-white">{[18, 7, 42][metricIndex]}</p></div>)}
            </div>
            <div className="mt-4 space-y-2">
              {['Request received', 'Owner assigned', 'Follow-up scheduled'].map((row, rowIndex) => <div key={row} className="flex items-center justify-between rounded-xl border border-cyan-300/10 bg-white/[0.025] px-3 py-2 text-sm text-slate-300"><span>{row}</span><span className={cn('h-2 w-2 rounded-full', rowIndex === 0 ? 'bg-amber-300' : rowIndex === 1 ? 'bg-cyan-300' : 'bg-emerald-300')} /></div>)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CaseStudyPanel({ study }: { study: CaseStudy }) {
  const [activeTab, setActiveTab] = useState(study.tabs[0]);
  return (
    <section id={study.id === 'tj-service-repairs' ? 'featured-proof' : undefined} className="relative z-[1] py-10 md:py-16">
      <Container>
        <div className="grid gap-6 rounded-[34px] border border-cyan-300/24 bg-[rgba(5,16,34,0.92)] p-5 shadow-[0_28px_85px_rgba(0,0,0,0.42),0_0_58px_rgba(14,165,255,0.11),inset_0_1px_0_rgba(255,255,255,0.08)] lg:grid-cols-[0.72fr_1.28fr] lg:p-7">
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-300/22 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{study.type}</span><span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-400">{study.project}</span></div>
              <h2 className="mt-4 font-[var(--font-jakarta)] text-3xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-4xl">{study.title}</h2>
            </div>
            <ProblemBuildOutcomeRows problem={study.problem} build={study.build} outcome={study.outcome} />
            <div className="flex flex-wrap gap-2">{study.tags.map((tag) => <StackPill key={tag}>{tag}</StackPill>)}</div>
            <ProofCTA href={quoteHref} variant="primary">{study.cta}</ProofCTA>
          </div>
          <div className="min-w-0">
            <CaseStudyVisualTabs tabs={study.tabs} activeTab={activeTab} onSelect={setActiveTab} />
            <CaseStudyMockup study={study} activeTab={activeTab} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CaseStudyVisualTabs({ tabs, activeTab, onSelect }: { tabs: string[]; activeTab: string; onSelect: (tab: string) => void }) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Case study visuals">
      {tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => onSelect(tab)} className={cn('shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80', activeTab === tab ? 'border-cyan-200/42 bg-cyan-300/12 text-cyan-50 shadow-[0_0_22px_rgba(56,223,255,0.12)]' : 'border-cyan-300/12 bg-slate-950/44 text-slate-400 hover:border-cyan-300/28 hover:text-cyan-100')}>{tab}</button>)}
    </div>
  );
}

function CaseStudyMockup({ study, activeTab }: { study: CaseStudy; activeTab: string }) {
  const rows = getMockupRows(study.id, activeTab);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={`${study.id}-${activeTab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="overflow-hidden rounded-[28px] border border-cyan-300/18 bg-[rgba(4,13,28,0.84)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" aria-label={`${study.project} ${activeTab} software mockup`}>
        <div className="flex items-center justify-between gap-3 border-b border-cyan-300/10 pb-4"><div><p className="text-sm font-semibold text-white">{activeTab}</p><p className="mt-1 text-xs text-slate-500">{study.project} operating view</p></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">Live workflow</span></div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {rows.metrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-cyan-300/12 bg-slate-950/46 p-4 transition hover:border-cyan-300/28"><p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">{metric.label}</p><p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p><p className="mt-1 text-xs text-cyan-100/70">{metric.note}</p></div>)}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-cyan-300/12 bg-slate-950/44 p-4"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Status board</p>{rows.items.map((item, index) => <div key={item} className="mb-2 flex items-center justify-between rounded-xl border border-cyan-300/10 bg-white/[0.025] px-3 py-2 text-sm text-slate-300 last:mb-0"><span>{item}</span><span className={cn('rounded-full px-2 py-1 text-[0.65rem] font-semibold', index === 0 ? 'bg-amber-300/10 text-amber-100' : index === rows.items.length - 1 ? 'bg-emerald-300/10 text-emerald-100' : 'bg-cyan-300/10 text-cyan-100')}>{rows.statuses[index]}</span></div>)}</div>
          <div className="rounded-2xl border border-cyan-300/12 bg-slate-950/44 p-4"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Next actions</p>{rows.actions.map((action) => <div key={action} className="mb-3 flex items-center gap-2 text-sm text-slate-300 last:mb-0"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{action}</div>)}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function getMockupRows(id: CaseStudy['id'], tab: string) {
  if (id === 'petguardian') {
    const petMap: Record<string, { metrics: Array<{ label: string; value: string; note: string }>; items: string[]; statuses: string[]; actions: string[] }> = {
      'Request Intake': { metrics: [{ label: 'New requests', value: '12', note: 'this week' }, { label: 'Details captured', value: '98%', note: 'complete' }, { label: 'Owners assigned', value: '6', note: 'active' }], items: ['Customer details', 'Pet profile', 'Service requested'], statuses: ['Received', 'Complete', 'New'] , actions: ['Validate request', 'Assign owner', 'Send confirmation']},
      'Estimate Summary': { metrics: [{ label: 'Estimate', value: 'R1.8k', note: 'average' }, { label: 'Breakdown', value: '4', note: 'line items' }, { label: 'Next step', value: 'Send', note: 'ready' }], items: ['Service breakdown', 'Care notes', 'Quote summary'], statuses: ['Ready', 'Added', 'Draft'], actions: ['Review amount', 'Add notes', 'Send estimate']},
      'Status Pipeline': { metrics: [{ label: 'New', value: '5', note: 'requests' }, { label: 'Quoted', value: '9', note: 'active' }, { label: 'Closed', value: '4', note: 'won' }], items: ['New', 'Reviewed', 'Quoted', 'Follow-up', 'Closed'], statuses: ['Open', 'Done', 'Active', 'Due', 'Won'], actions: ['Move stages', 'Track owner', 'Close request']},
      'Follow-up Reminder': { metrics: [{ label: 'Due today', value: '3', note: 'follow-ups' }, { label: 'Owner', value: 'Team', note: 'assigned' }, { label: 'Reminder', value: '09:00', note: 'scheduled' }], items: ['Calendar reminder', 'Email follow-up', 'Owner alert'], statuses: ['Set', 'Queued', 'Active'], actions: ['Send reminder', 'Update status', 'Log outcome']},
      'Owner Dashboard': { metrics: [{ label: 'Open', value: '18', note: 'requests' }, { label: 'Due', value: '3', note: 'today' }, { label: 'Closed', value: '74%', note: 'rate' }], items: ['Request list', 'Follow-ups due', 'Recent updates'], statuses: ['Live', 'Priority', 'Synced'], actions: ['Review list', 'Call next lead', 'Update pipeline']},
    };
    return petMap[tab] ?? petMap['Request Intake'];
  }
  const tjMap: Record<string, { metrics: Array<{ label: string; value: string; note: string }>; items: string[]; statuses: string[]; actions: string[] }> = {
    Overview: { metrics: [{ label: 'Active jobs', value: '18', note: 'tracked' }, { label: 'Pending quotes', value: '7', note: 'awaiting approval' }, { label: 'Updates sent', value: '42', note: 'customer messages' }], items: ['Toyota Hilux service', 'BMW diagnostic', 'Ford Ranger repair'], statuses: ['In workshop', 'Waiting approval', 'Ready'], actions: ['Review pending quotes', 'Send client update', 'Prepare handover']},
    'Workshop Dashboard': { metrics: [{ label: 'Technicians', value: '5', note: 'assigned' }, { label: 'Ready jobs', value: '4', note: 'handover' }, { label: 'Blocked', value: '2', note: 'approval' }], items: ['Inspection bay', 'Parts ordered', 'Final checks'], statuses: ['Active', 'Waiting', 'Ready'], actions: ['Filter by technician', 'Update job stage', 'Notify customer']},
    'Client Dashboard': { metrics: [{ label: 'Vehicle', value: '1', note: 'active' }, { label: 'Next step', value: 'Approve', note: 'quote' }, { label: 'Messages', value: '5', note: 'updates' }], items: ['Vehicle card', 'Quote approval', 'Notification feed'], statuses: ['Open', 'Pending', 'Sent'], actions: ['Approve quote', 'View timeline', 'Confirm collection']},
    'Vehicle Timeline': { metrics: [{ label: 'Events', value: '6', note: 'logged' }, { label: 'Current', value: 'Quote', note: 'sent' }, { label: 'ETA', value: '2d', note: 'remaining' }], items: ['Inspection complete', 'Quote sent', 'Approval received', 'Invoice issued'], statuses: ['Done', 'Sent', 'Next', 'Queued'], actions: ['Review history', 'Update status', 'Send timeline note']},
    Quotes: { metrics: [{ label: 'Pending', value: '7', note: 'approval' }, { label: 'Total', value: 'R8.4k', note: 'quote' }, { label: 'Changes', value: '2', note: 'requested' }], items: ['Brake pads', 'Labour', 'Diagnostic fee'], statuses: ['Line', 'Line', 'Line'], actions: ['Approve quote', 'Request changes', 'Log decision']},
    Invoices: { metrics: [{ label: 'Outstanding', value: 'R12k', note: 'open' }, { label: 'Paid', value: '82%', note: 'this month' }, { label: 'Follow-up', value: '3', note: 'due' }], items: ['Invoice summary', 'Payment status', 'Receipt handover'], statuses: ['Open', 'Partial', 'Ready'], actions: ['Send invoice', 'Track payment', 'Close job']},
    Notifications: { metrics: [{ label: 'Sent', value: '42', note: 'updates' }, { label: 'Reminders', value: '9', note: 'queued' }, { label: 'Replies', value: '14', note: 'logged' }], items: ['Customer update sent', 'Quote reminder', 'Payment follow-up', 'Job status update'], statuses: ['Sent', 'Due', 'Queued', 'Live'], actions: ['Send update', 'Schedule reminder', 'Log response']},
    Handover: { metrics: [{ label: 'Roles', value: '4', note: 'trained' }, { label: 'Docs', value: '12', note: 'ready' }, { label: 'Launch', value: 'Ready', note: 'checked' }], items: ['Admin role', 'Workshop role', 'Client view', 'Support notes'], statuses: ['Done', 'Done', 'Live', 'Ready'], actions: ['Confirm owners', 'Share SOPs', 'Launch handover']},
  };
  return tjMap[tab] ?? tjMap.Overview;
}

function ProblemBuildOutcomeRows({ problem, build, outcome }: { problem: string; build: string; outcome: string }) {
  const rows = [
    { label: 'Problem', text: problem, icon: AlertTriangle, tone: 'text-amber-100 border-amber-300/18 bg-amber-300/8' },
    { label: 'Build', text: build, icon: Workflow, tone: 'text-cyan-100 border-cyan-300/18 bg-cyan-300/8' },
    { label: 'Outcome', text: outcome, icon: CheckCircle2, tone: 'text-emerald-100 border-emerald-300/18 bg-emerald-300/8' },
  ];
  return <div className="grid gap-3">{rows.map(({ label, text, icon: Icon, tone }) => <div key={label} className={cn('rounded-2xl border p-4 transition hover:bg-white/[0.045]', tone)}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"><Icon className="h-4 w-4" />{label}</p><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div>)}</div>;
}

function SampleBuildGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const visible = useMemo(() => sampleBuilds.filter((build) => activeFilter === 'All' || build.category === activeFilter || (activeFilter === 'Automations' && build.id === 'quote-request-follow-up')), [activeFilter]);
  return (
    <SectionShell eyebrow="Sample builds" title="More systems we can build." subtitle="Examples of practical workflows, tools, and training layers that can be adapted to different businesses.">
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Build filters">
        {filters.map((filter) => <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={cn('shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80', activeFilter === filter ? 'border-cyan-200/45 bg-cyan-300/12 text-cyan-50 shadow-[0_0_24px_rgba(56,223,255,0.13)]' : 'border-cyan-300/12 bg-slate-950/44 text-slate-400 hover:border-cyan-300/28 hover:text-cyan-100')}>{filter}</button>)}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">{visible.map((build) => <SampleBuildCard key={build.id} build={build} />)}</AnimatePresence>
      </motion.div>
    </SectionShell>
  );
}

function SampleBuildCard({ build }: { build: SampleBuild }) {
  const Icon = build.icon;
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="group flex min-h-full flex-col rounded-[28px] border border-cyan-300/16 bg-[rgba(4,13,28,0.84)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/36 hover:shadow-[0_28px_75px_rgba(0,0,0,0.40),0_0_38px_rgba(14,165,255,0.13),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="rounded-[22px] border border-cyan-300/12 bg-slate-950/44 p-4"><div className="relative grid grid-cols-3 gap-3"><div className="absolute left-[16%] right-[16%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-cyan-300/10 via-cyan-200/70 to-cyan-300/10" />{['Problem', 'System', 'Proof'].map((label, index) => <div key={label} className="relative rounded-2xl border border-cyan-300/14 bg-[rgba(4,13,28,0.9)] p-3 text-center transition group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.06]"><div className={cn('mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl border', index === 0 ? 'border-amber-300/24 bg-amber-300/10 text-amber-100' : index === 2 ? 'border-emerald-300/24 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/28 bg-cyan-300/10 text-cyan-100')}><Icon className="h-4 w-4" /></div><p className="text-xs font-semibold text-slate-300">{label}</p></div>)}</div></div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{build.category}</p>
      <h3 className="mt-2 font-[var(--font-jakarta)] text-xl font-semibold leading-tight text-white">{build.title}</h3>
      <ProblemBuildOutcomeRows problem={build.problem} build={build.build} outcome={build.outcome} />
      <div className="mt-5 flex flex-wrap gap-2">{build.stack.map((item) => <StackPill key={item}>{item}</StackPill>)}</div>
      <Link href={quoteHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 rounded-md">View proof <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
    </motion.article>
  );
}

function CapabilityMap() {
  return (
    <SectionShell eyebrow="Capability map" title="Capability map." subtitle="Different builds use different layers, but they all connect to the same goal: cleaner operations.">
      <div className="hidden overflow-hidden rounded-[34px] border border-cyan-300/18 bg-[rgba(5,16,34,0.92)] p-4 shadow-[0_28px_85px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] md:block">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 text-sm">
          {['Capability', 'TJ', 'PetGuardian', 'Sample builds'].map((head) => <div key={head} className="rounded-2xl border border-cyan-300/10 bg-slate-950/46 p-4 font-semibold text-cyan-100">{head}</div>)}
          {capabilityRows.map((row) => <CapabilityRow key={row.label} row={row} />)}
        </div>
      </div>
      <div className="grid gap-3 md:hidden">{capabilityRows.map((row) => <div key={row.label} className="rounded-2xl border border-cyan-300/16 bg-[rgba(4,13,28,0.84)] p-4"><p className="font-semibold text-white">{row.label}</p><div className="mt-3 grid gap-2 text-sm text-slate-300"><CapabilityCell text={`TJ: ${row.tj}`} /><CapabilityCell text={`PetGuardian: ${row.pet}`} /><CapabilityCell text={`Sample builds: ${row.samples}`} /></div></div>)}</div>
    </SectionShell>
  );
}

function CapabilityRow({ row }: { row: (typeof capabilityRows)[number] }) {
  return <><div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.055] p-4 font-semibold text-white">{row.label}</div><CapabilityCell text={row.tj} /><CapabilityCell text={row.pet} /><CapabilityCell text={row.samples} /></>;
}

function CapabilityCell({ text }: { text: string }) {
  return <div className="rounded-2xl border border-cyan-300/10 bg-slate-950/36 p-4 text-slate-300 transition hover:border-cyan-300/28 hover:bg-cyan-300/[0.055]"><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 align-middle text-emerald-100"><CheckCircle2 className="h-3.5 w-3.5" /></span>{text}</div>;
}

function WorkPageCTA() {
  return (
    <section className="relative z-[1] pb-16 pt-8 md:pb-24">
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-[34px] border border-cyan-300/22 bg-[radial-gradient(circle_at_86%_12%,rgba(14,165,255,0.18),transparent_34%),rgba(5,16,34,0.92)] p-6 shadow-[0_28px_85px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] md:grid-cols-[1fr_0.8fr] md:p-8 lg:p-10">
          <div><p className="text-system-eyebrow text-cyan-200">Build next</p><h2 className="mt-3 font-[var(--font-jakarta)] text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">Want a system like this?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Tell us what is manual and what keeps slipping through.</p><p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-100"><ShieldCheck className="h-4 w-4" /> Practical next step first.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><ProofCTA href={quoteHref} variant="primary">Request a Quote</ProofCTA><ProofCTA href="/solutions" variant="secondary">View Solutions</ProofCTA></div></div>
          <div className="rounded-[28px] border border-cyan-300/18 bg-slate-950/44 p-5"><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center"><RouteChip tone="problem" label="Manual work" /><RouteLine /><RouteChip tone="system" label="Rapid Rise system" /><RouteLine /><RouteChip tone="proof" label="Clean operation" /></div></div>
        </div>
      </Container>
    </section>
  );
}

function RouteChip({ tone, label }: { tone: 'problem' | 'system' | 'proof'; label: string }) {
  const styles = { problem: 'border-amber-300/24 bg-amber-300/10 text-amber-100', system: 'border-cyan-300/28 bg-cyan-300/10 text-cyan-100', proof: 'border-emerald-300/24 bg-emerald-300/10 text-emerald-100' };
  return <div className={cn('min-h-[68px] rounded-2xl border p-4 text-sm font-semibold', styles[tone])}>{label}</div>;
}

function RouteLine() {
  return <div className="hidden h-px w-10 bg-gradient-to-r from-cyan-300/10 via-cyan-200/80 to-cyan-300/10 md:block" aria-hidden="true" />;
}

function StackPill({ children }: React.PropsWithChildren) {
  return <span className="rounded-full border border-cyan-300/14 bg-cyan-300/[0.045] px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-cyan-300/28 hover:text-cyan-100">{children}</span>;
}

function ProofCTA({ href, children, variant }: React.PropsWithChildren<{ href: string; variant: 'primary' | 'secondary' }>) {
  return <Link href={href} className={cn('group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80', variant === 'primary' ? 'bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] text-white shadow-[0_16px_42px_rgba(14,165,255,0.30),inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-0.5 hover:brightness-110' : 'border border-cyan-300/22 bg-white/[0.035] text-slate-200 hover:border-cyan-200/56 hover:bg-cyan-300/10 hover:text-white')}>{children}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>;
}
