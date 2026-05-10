'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Globe2,
  Inbox,
  LayoutDashboard,
  MonitorCog,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

type VisualType = 'lead-capture' | 'workflow' | 'workspace' | 'internal-tools' | 'websites' | 'training';

type SolutionModule = {
  id: VisualType;
  title: string;
  outcome: string;
  problems: string[];
  output: string;
  stack: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
};

type SelectorOption = {
  id: string;
  label: string;
  leak: string;
  recommendedModule: string;
  recommendation: string;
  outcome: string;
  visual: VisualType;
};

const quoteHref = '/quote';

const solutionModules: SolutionModule[] = [
  {
    id: 'lead-capture',
    title: 'Lead Capture and Follow Up',
    outcome: 'Turn enquiries into tracked opportunities.',
    problems: ['Slow replies', 'No owner', 'Forgotten follow-ups'],
    output: 'Tracked lead pipeline with auto-confirmation and reminders.',
    stack: ['Forms', 'Email', 'WhatsApp', 'CRM'],
    cta: 'Build a lead system',
    href: '/solutions/lead-capture',
    icon: Inbox,
  },
  {
    id: 'workflow',
    title: 'Workflow Automation and Integrations',
    outcome: 'Remove repetitive admin between tools.',
    problems: ['Manual copy', 'Repeated admin', 'Missed handoffs'],
    output: 'Connected tools, status updates, notifications, and reports.',
    stack: ['Zapier', 'Make', 'APIs', 'Reports'],
    cta: 'Connect my workflow',
    href: '/solutions/workflow-automation',
    icon: Workflow,
  },
  {
    id: 'workspace',
    title: 'Smart Workspace Systems',
    outcome: 'Make your current tools work together.',
    problems: ['Messy files', 'Inconsistent updates', 'Manual reporting'],
    output: 'Clean Workspace automations and operating rules.',
    stack: ['Gmail', 'Sheets', 'Drive', 'Calendar'],
    cta: 'Automate my workspace',
    href: '/solutions/google-workspace',
    icon: MonitorCog,
  },
  {
    id: 'internal-tools',
    title: 'Web Apps and Internal Tools',
    outcome: 'Build the screens your team actually needs.',
    problems: ['Overloaded spreadsheets', 'Poor visibility', 'No permissions'],
    output: 'Custom portal, tracker, approval system, or dashboard.',
    stack: ['Dashboards', 'Portals', 'Approvals', 'Roles'],
    cta: 'Plan an internal tool',
    href: '/solutions/web-apps',
    icon: LayoutDashboard,
  },
  {
    id: 'websites',
    title: 'Websites That Convert',
    outcome: 'Turn visitors into clear next actions.',
    problems: ['Weak messaging', 'Poor mobile UX', 'Low enquiries'],
    output: 'Conversion-focused site connected to capture flow.',
    stack: ['Messaging', 'Mobile UX', 'CTA flow', 'Forms'],
    cta: 'Upgrade my website',
    href: '/solutions/websites',
    icon: Globe2,
  },
  {
    id: 'training',
    title: 'Training and Enablement',
    outcome: 'Help your team use modern tools properly.',
    problems: ['Poor adoption', 'Confusion', 'Repeated questions'],
    output: 'Training, templates, SOPs, and workflow confidence.',
    stack: ['SOPs', 'Templates', 'Handover', 'Workshops'],
    cta: 'Train my team',
    href: '/solutions/training',
    icon: BookOpenCheck,
  },
];

const selectorOptions: SelectorOption[] = [
  {
    id: 'lose-leads',
    label: 'We lose leads',
    leak: 'Unanswered enquiry',
    recommendedModule: 'Lead Capture and Follow Up',
    recommendation: 'Start with a lead capture system that acknowledges enquiries, assigns an owner, and schedules follow-up before the lead goes cold.',
    outcome: 'Lead tracked',
    visual: 'lead-capture',
  },
  {
    id: 'admin',
    label: 'We waste time on admin',
    leak: 'Repeated manual task',
    recommendedModule: 'Workflow Automation and Integrations',
    recommendation: 'Start with the manual task that repeats every week and connect the tools around it.',
    outcome: 'Workflow connected',
    visual: 'workflow',
  },
  {
    id: 'track-work',
    label: 'We cannot track work',
    leak: 'Unknown status',
    recommendedModule: 'Web Apps and Internal Tools',
    recommendation: 'Build a simple dashboard or tracker that shows status, owner, next action, and history.',
    outcome: 'Work visible',
    visual: 'internal-tools',
  },
  {
    id: 'portals',
    label: 'We need client or team portals',
    leak: 'Wrong people asking for updates',
    recommendedModule: 'Web Apps and Internal Tools',
    recommendation: 'Create role-based screens so clients, staff, or managers see the right information at the right time.',
    outcome: 'Portal live',
    visual: 'internal-tools',
  },
  {
    id: 'documents',
    label: 'We need better quotes or documents',
    leak: 'Document bottleneck',
    recommendedModule: 'Workflow Automation and Integrations',
    recommendation: 'Create a structured quote or document flow that captures details, generates the next step, and tracks status.',
    outcome: 'Quote flow tracked',
    visual: 'workflow',
  },
  {
    id: 'website',
    label: 'Our website does not convert',
    leak: 'Visitors leave unsure',
    recommendedModule: 'Websites That Convert',
    recommendation: 'Fix messaging, mobile experience, CTA flow, and lead capture so visitors know what to do next.',
    outcome: 'Clear next action',
    visual: 'websites',
  },
  {
    id: 'training',
    label: 'Our team needs training',
    leak: 'Low adoption',
    recommendedModule: 'Training and Enablement',
    recommendation: 'Give the team practical training, SOPs, templates, and handover so the system actually gets used.',
    outcome: 'Team confident',
    visual: 'training',
  },
];

const heroModules = ['Capture', 'Route', 'Automate', 'Dashboard', 'Portal', 'Train'];
const layerSteps = ['Capture', 'Route', 'Automate', 'Track', 'Report'];
const inputItems = ['Website', 'Email', 'WhatsApp', 'Forms', 'Staff', 'Customers'];
const outputItems = ['Dashboard', 'Portal', 'Quote', 'Notification', 'Report', 'Handover'];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function sectionTransition(reduceMotion: boolean, delay = 0) {
  return { duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const };
}

export function SolutionsSystemLibrary() {
  return (
    <div className="relative overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_4%,rgba(14,165,255,0.16),transparent_32%),radial-gradient(circle_at_18%_28%,rgba(56,223,255,0.07),transparent_30%),linear-gradient(180deg,#020711_0%,#030914_52%,#020711_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(80,210,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />
      <SolutionsHero />
      <InteractiveSolutionSelector />
      <SolutionModuleLibrary />
      <ConnectedModulesMap />
      <SolutionsDiagnosticCTA />
    </div>
  );
}

function SectionShell({ eyebrow, title, subtitle, children, className }: React.PropsWithChildren<{ eyebrow: string; title: string; subtitle: string; className?: string }>) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className={cn('relative z-[1] py-12 md:py-18 lg:py-24', className)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={sectionTransition(Boolean(reduceMotion))}
    >
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

function SolutionsHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative z-[1] overflow-hidden pb-10 pt-16 md:pb-16 md:pt-24 lg:pt-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={sectionTransition(Boolean(reduceMotion), 0.05)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" /> System Library
            </p>
            <h1 className="mt-6 max-w-4xl font-[var(--font-jakarta)] text-[clamp(2.55rem,6vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-white">
              Choose the system layer your business needs next.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-cyan-100 md:text-2xl">Start with the leak that costs the most time, money, or control.</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 md:text-lg">We build systems that reduce admin, speed up response, and make operations easier to run.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CommandLink href={quoteHref} variant="primary">Request a Quote</CommandLink>
              <CommandLink href="/work" variant="secondary">View Work</CommandLink>
            </div>
          </motion.div>
          <SystemLibraryBoard />
        </div>
      </Container>
    </section>
  );
}

function SystemLibraryBoard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="relative rounded-[32px] border border-cyan-300/20 bg-[rgba(5,16,34,0.92)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.48),0_0_70px_rgba(14,165,255,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-6"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={sectionTransition(Boolean(reduceMotion), 0.18)}
      aria-label="Modular system board showing Capture, Route, Automate, Dashboard, Portal, and Train connecting into the Operating Layer."
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_44%,rgba(56,223,255,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[24px] border border-cyan-200/8" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 430" aria-hidden="true">
        <defs>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop stopColor="#38DFFF" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#38DFFF" stopOpacity="0.72" />
            <stop offset="1" stopColor="#0EA5FF" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {[
          'M134 108 C225 112 245 190 310 210',
          'M126 216 C202 216 238 216 310 216',
          'M146 324 C220 305 246 245 310 226',
          'M484 108 C392 112 375 190 310 210',
          'M494 216 C420 216 382 216 310 216',
          'M472 324 C398 305 374 245 310 226',
        ].map((d, index) => (
          <motion.path key={d} d={d} fill="none" stroke="url(#heroLine)" strokeWidth="2" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={sectionTransition(Boolean(reduceMotion), 0.35 + index * 0.08)} />
        ))}
      </svg>
      <div className="relative grid min-h-[390px] grid-cols-2 grid-rows-[1fr_auto_1fr] gap-3 md:gap-4">
        {heroModules.map((label, index) => (
          <motion.div
            key={label}
            className={cn('relative rounded-2xl border border-cyan-300/18 bg-[rgba(4,13,28,0.84)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]', index > 2 ? 'self-end' : 'self-start')}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition(Boolean(reduceMotion), 0.22 + index * 0.07)}
          >
            <div className="mb-3 h-1.5 w-10 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(56,223,255,0.45)]" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="mt-1 text-xs text-slate-500">Module ready</p>
          </motion.div>
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[min(72%,270px)] -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-cyan-200/35 bg-[linear-gradient(180deg,rgba(7,28,54,0.98),rgba(3,11,24,0.98))] p-5 text-center shadow-[0_0_55px_rgba(56,223,255,0.24),inset_0_1px_0_rgba(255,255,255,0.14)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={sectionTransition(Boolean(reduceMotion), 0.78)}
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Operating Layer</p>
          <p className="mt-2 text-sm text-slate-300">One connected layer for capture, routing, tracking, and reporting.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InteractiveSolutionSelector() {
  const [selectedId, setSelectedId] = useState(selectorOptions[0].id);
  const selected = useMemo(() => selectorOptions.find((option) => option.id === selectedId) ?? selectorOptions[0], [selectedId]);

  return (
    <SectionShell
      eyebrow="Choose by problem"
      title="What do you want to improve?"
      subtitle="Choose the problem that sounds closest to your business. We will point you toward the system layer that usually fixes it."
    >
      <div className="grid gap-5 rounded-[32px] border border-cyan-300/18 bg-[rgba(5,16,34,0.72)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_70px_rgba(0,0,0,0.36)] lg:grid-cols-[0.9fr_1.1fr] lg:p-5">
        <div className="grid gap-2.5" role="listbox" aria-label="Business problems">
          {selectorOptions.map((option, index) => (
            <SolutionSelectorOption key={option.id} option={option} index={index} selected={selectedId === option.id} onSelect={() => setSelectedId(option.id)} />
          ))}
        </div>
        <SolutionRecommendationPanel option={selected} />
      </div>
    </SectionShell>
  );
}

function SolutionSelectorOption({ option, selected, onSelect, index }: { option: SelectorOption; selected: boolean; onSelect: () => void; index: number }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        'group flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80',
        selected ? 'border-cyan-200/45 bg-cyan-300/10 shadow-[0_0_28px_rgba(56,223,255,0.12)]' : 'border-cyan-300/10 bg-[rgba(4,13,28,0.62)] hover:border-cyan-300/28 hover:bg-cyan-300/[0.055]',
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold', selected ? 'border-cyan-200/45 bg-cyan-300/16 text-cyan-100' : 'border-slate-700 bg-slate-950/60 text-slate-500')}>{String(index + 1).padStart(2, '0')}</span>
        <span>
          <span className="block text-sm font-semibold text-white">{option.label}</span>
          <span className="mt-1 block text-xs text-slate-500">{option.leak}</span>
        </span>
      </span>
      <ArrowRight className={cn('h-4 w-4 shrink-0 transition', selected ? 'translate-x-0 text-cyan-200' : 'text-slate-600 group-hover:translate-x-1 group-hover:text-cyan-200')} />
    </button>
  );
}

function SolutionRecommendationPanel({ option }: { option: SelectorOption }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[rgba(4,13,28,0.84)] p-5 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(14,165,255,0.18),transparent_35%)]" />
      <AnimatePresence mode="wait">
        <motion.div key={option.id} className="relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">Problem: {option.leak}</span>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">Output: {option.outcome}</span>
          </div>
          <h3 className="mt-5 font-[var(--font-jakarta)] text-2xl font-semibold text-white md:text-3xl">{option.recommendedModule}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{option.recommendation}</p>
          <SelectorMiniRoute option={option} />
          <CommandLink href={quoteHref} variant="primary" className="mt-6 w-full sm:w-auto">Request a Quote</CommandLink>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SelectorMiniRoute({ option }: { option: SelectorOption }) {
  return (
    <div className="mt-6 rounded-[24px] border border-cyan-300/14 bg-slate-950/45 p-4" aria-label={`${option.leak} connects to ${option.recommendedModule} and creates ${option.outcome}.`}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <RouteChip tone="problem" label={option.leak} />
        <RouteLine />
        <RouteChip tone="module" label={option.recommendedModule} />
        <RouteLine />
        <RouteChip tone="output" label={option.outcome} />
      </div>
    </div>
  );
}

function RouteChip({ tone, label }: { tone: 'problem' | 'module' | 'output'; label: string }) {
  const styles = {
    problem: 'border-amber-300/24 bg-amber-300/10 text-amber-100',
    module: 'border-cyan-300/28 bg-cyan-300/10 text-cyan-100',
    output: 'border-emerald-300/24 bg-emerald-300/10 text-emerald-100',
  };
  return <div className={cn('min-h-[68px] rounded-2xl border p-4 text-sm font-semibold', styles[tone])}>{label}</div>;
}

function RouteLine() {
  return <div className="hidden h-px w-12 bg-gradient-to-r from-cyan-300/10 via-cyan-200/80 to-cyan-300/10 md:block" aria-hidden="true" />;
}

function SolutionModuleLibrary() {
  return (
    <SectionShell
      eyebrow="Module library"
      title="System modules we can build."
      subtitle="Each module fixes a specific operational leak. Start with one, or connect several into a full operating layer."
    >
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {solutionModules.map((module) => (
          <SolutionModuleCard key={module.id} module={module} />
        ))}
      </div>
    </SectionShell>
  );
}

function SolutionModuleCard({ module }: { module: SolutionModule }) {
  const Icon = module.icon;
  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-[28px] border border-cyan-300/16 bg-[rgba(4,13,28,0.84)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/38 hover:shadow-[0_28px_75px_rgba(0,0,0,0.40),0_0_38px_rgba(14,165,255,0.13),inset_0_1px_0_rgba(255,255,255,0.1)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-100">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-cyan-300/14 bg-slate-950/50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Module</span>
      </div>
      <h3 className="mt-5 font-[var(--font-jakarta)] text-2xl font-semibold leading-tight text-white">{module.title}</h3>
      <p className="mt-2 text-sm leading-6 text-cyan-100/86">{module.outcome}</p>
      <SolutionMiniVisual visual={module.id} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100/80">Problems</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {module.problems.map((problem) => <li key={problem} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />{problem}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/80">Output</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{module.output}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {module.stack.map((item) => <span key={item} className="rounded-full border border-cyan-300/12 bg-cyan-300/[0.045] px-3 py-1 text-xs font-medium text-slate-400 transition group-hover:border-cyan-300/24 group-hover:text-cyan-100">{item}</span>)}
      </div>
      <Link href={module.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 rounded-md">
        {module.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

function SolutionMiniVisual({ visual }: { visual: VisualType }) {
  const labels: Record<VisualType, string[]> = {
    'lead-capture': ['Form', 'Owner', 'Reminder'],
    workflow: ['Tool', 'Engine', 'Report'],
    workspace: ['Gmail', 'Rules', 'Drive'],
    'internal-tools': ['Admin', 'Team', 'Metric'],
    websites: ['Hero', 'CTA', 'Lead'],
    training: ['Lesson', 'SOP', 'Adopt'],
  };
  return (
    <div className="mt-5 rounded-[22px] border border-cyan-300/12 bg-slate-950/44 p-4" aria-label={`${visual} mini system visual`}>
      <div className="relative grid grid-cols-3 gap-3">
        <div className="absolute left-[16%] right-[16%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-cyan-300/10 via-cyan-200/70 to-cyan-300/10" />
        {labels[visual].map((label, index) => (
          <div key={label} className="relative rounded-2xl border border-cyan-300/14 bg-[rgba(4,13,28,0.9)] p-3 text-center transition group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.06]">
            <div className={cn('mx-auto mb-2 h-2.5 w-2.5 rounded-full', index === 0 ? 'bg-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.45)]' : index === 2 ? 'bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.45)]' : 'bg-cyan-300 shadow-[0_0_14px_rgba(56,223,255,0.45)]')} />
            <p className="text-xs font-semibold text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectedModulesMap() {
  return (
    <SectionShell
      eyebrow="Connected operating logic"
      title="How the modules connect."
      subtitle="Inputs come from different places. The Rapid Rise layer captures, routes, automates, tracks, and reports the work."
    >
      <div className="relative overflow-hidden rounded-[34px] border border-cyan-300/18 bg-[rgba(5,16,34,0.92)] p-5 shadow-[0_28px_85px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,223,255,0.12),transparent_35%)]" />
        <div className="relative grid gap-5 lg:grid-cols-[0.85fr_1fr_0.85fr] lg:items-center">
          <MapColumn title="Inputs" items={inputItems} tone="input" />
          <div className="rounded-[30px] border border-cyan-200/32 bg-[linear-gradient(180deg,rgba(7,28,54,0.96),rgba(3,11,24,0.98))] p-5 text-center shadow-[0_0_55px_rgba(56,223,255,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/32 bg-cyan-300/12 text-cyan-100">
              <Route className="h-7 w-7" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Rapid Rise Layer</p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1 xl:grid-cols-5">
              {layerSteps.map((step) => <span key={step} className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-2 text-xs font-semibold text-cyan-50">{step}</span>)}
            </div>
          </div>
          <MapColumn title="Outputs" items={outputItems} tone="output" />
        </div>
      </div>
    </SectionShell>
  );
}

function MapColumn({ title, items, tone }: { title: string; items: string[]; tone: 'input' | 'output' }) {
  return (
    <div>
      <p className={cn('mb-3 text-xs font-semibold uppercase tracking-[0.16em]', tone === 'input' ? 'text-amber-100/80' : 'text-emerald-100/80')}>{title}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-cyan-300/12 bg-[rgba(4,13,28,0.74)] p-3 text-sm font-semibold text-slate-300">
            <span className={cn('mb-2 block h-1.5 w-8 rounded-full', tone === 'input' ? 'bg-amber-300/75' : 'bg-emerald-300/75')} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsDiagnosticCTA() {
  return (
    <section className="relative z-[1] pb-16 pt-8 md:pb-24">
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-[34px] border border-cyan-300/22 bg-[radial-gradient(circle_at_86%_12%,rgba(14,165,255,0.18),transparent_34%),rgba(5,16,34,0.92)] p-6 shadow-[0_28px_85px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] md:grid-cols-[1fr_0.8fr] md:p-8 lg:p-10">
          <div>
            <p className="text-system-eyebrow text-cyan-200">Diagnostic next step</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">Not sure what to build first?</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Tell us what is manual, delayed, or hard to track. We will recommend the cleanest next step.</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-100"><ShieldCheck className="h-4 w-4" /> No pressure. Clear next step first.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CommandLink href={quoteHref} variant="primary">Request a Quote</CommandLink>
              <CommandLink href="/work" variant="secondary">View Work</CommandLink>
            </div>
          </div>
          <div className="rounded-[28px] border border-cyan-300/18 bg-slate-950/44 p-5">
            <SelectorMiniRoute option={{ ...selectorOptions[1], leak: 'Manual / delayed / hard to track', recommendedModule: 'Recommended system layer', outcome: 'Clear next step' }} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CommandLink({ href, children, variant, className }: React.PropsWithChildren<{ href: string; variant: 'primary' | 'secondary'; className?: string }>) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80',
        variant === 'primary'
          ? 'bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] text-white shadow-[0_16px_42px_rgba(14,165,255,0.30),inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-0.5 hover:brightness-110'
          : 'border border-cyan-300/22 bg-white/[0.035] text-slate-200 hover:border-cyan-200/56 hover:bg-cyan-300/10 hover:text-white',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </Link>
  );
}
