import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  FolderKanban,
  Gauge,
  Mail,
  Route,
  Sheet,
  ShieldCheck,
  Tags,
  UserCheck,
  Workflow,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Smart Workspace Systems | Rapid Rise AI',
  description: 'Connect Gmail, Sheets, Drive, Calendar, Docs, and forms with practical rules, reminders, storage, tracking, and reporting systems.',
  path: '/solutions/google-workspace',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Smart Workspace Systems | Rapid Rise AI',
    description: 'Make your current tools work together with practical workspace automations built around your business process.',
  },
};

const quoteRoute = quoteHref;
const viewWorkRoute = workHref;

const trustChips = ['Built around your existing tools', 'Google Workspace friendly', 'Handover notes included', 'Clear scope before build'];

const heroTools = ['Gmail', 'Sheets', 'Drive', 'Calendar', 'Docs', 'Forms'];
const engineRules = ['Label', 'Store', 'Remind', 'Track', 'Report'];
const heroOutputs = ['Request captured', 'Sheet updated', 'File stored', 'Reminder scheduled', 'Report updated'];

const problemCards = [
  {
    title: 'Messy files',
    copy: 'Documents and uploads end up in inconsistent places.',
    chip: 'Wrong folder',
    visual: 'files',
  },
  {
    title: 'Manual reporting',
    copy: 'Reports take time because data lives in different sheets, inboxes, or folders.',
    chip: 'Delayed report',
    visual: 'report',
  },
  {
    title: 'Inconsistent updates',
    copy: 'People forget to update the status after something changes.',
    chip: 'Not updated',
    visual: 'sheet',
  },
  {
    title: 'Missed reminders',
    copy: 'Follow-ups depend on memory or manual calendar entries.',
    chip: 'Missed',
    visual: 'calendar',
  },
  {
    title: 'Inbox overload',
    copy: 'Important emails sit beside everything else with no clear routing.',
    chip: 'Buried',
    visual: 'inbox',
  },
];

const workspaceRules = [
  {
    icon: Tags,
    title: 'Label incoming requests',
    value: 'Sort emails, form entries, or requests into useful categories.',
    chip: 'Label applied',
  },
  {
    icon: FolderKanban,
    title: 'Save files to the right folder',
    value: 'Store documents, uploads, and outputs where the team can find them.',
    chip: 'File stored',
  },
  {
    icon: Sheet,
    title: 'Update a tracking sheet',
    value: 'Keep records and statuses updated without repeated manual entry.',
    chip: 'Sheet updated',
  },
  {
    icon: CalendarDays,
    title: 'Create a calendar reminder',
    value: 'Trigger follow-ups before tasks or leads go cold.',
    chip: 'Reminder set',
  },
  {
    icon: FileText,
    title: 'Generate a document',
    value: 'Use templates to create repeatable documents from captured details.',
    chip: 'Doc ready',
  },
  {
    icon: UserCheck,
    title: 'Notify the right person',
    value: 'Send the next step to the right person at the right time.',
    chip: 'Owner notified',
  },
  {
    icon: Gauge,
    title: 'Build a basic report',
    value: 'Show what moved, what is waiting, and what needs attention.',
    chip: 'Report live',
  },
];

const workspaceModules = [
  {
    icon: Mail,
    title: 'Gmail routing',
    problem: 'Important messages get buried or handled too late.',
    output: 'Labels, routing rules, owner notifications, or summary views.',
    chip: 'Priority lane',
  },
  {
    icon: Sheet,
    title: 'Sheets tracking',
    problem: 'Manual updates make trackers unreliable.',
    output: 'Cleaner rows, status updates, filters, and summary views.',
    chip: 'Status updated',
  },
  {
    icon: FolderKanban,
    title: 'Drive organization',
    problem: 'Files are scattered across folders or saved inconsistently.',
    output: 'Folder structure, file naming, storage rules, and easy retrieval.',
    chip: 'Stored correctly',
  },
  {
    icon: CalendarDays,
    title: 'Calendar reminders',
    problem: 'Follow-ups depend on memory.',
    output: 'Scheduled reminders, due dates, and follow-up prompts.',
    chip: 'Reminder set',
  },
  {
    icon: FileText,
    title: 'Docs generation',
    problem: 'Teams recreate the same documents by hand.',
    output: 'Templates that fill from captured details.',
    chip: 'Template filled',
  },
  {
    icon: Gauge,
    title: 'Reporting dashboard',
    problem: 'Status and performance are hard to see.',
    output: 'Basic reports, summaries, and visibility panels.',
    chip: 'Report updated',
  },
  {
    icon: ShieldCheck,
    title: 'Onboarding and permissions',
    problem: 'Access and setup are inconsistent.',
    output: 'Role-based checklists, permission steps, and onboarding tracking.',
    chip: 'Handover ready',
  },
];

const workflowSteps = [
  {
    title: 'Request arrives',
    microcopy: 'A request comes through Gmail or a form.',
    chip: 'Request received',
  },
  {
    title: 'Details are captured',
    microcopy: 'The system records the important information.',
    chip: 'Label applied',
  },
  {
    title: 'Tracker updates',
    microcopy: 'A Sheet or tracking view gets the latest status.',
    chip: 'Sheet updated',
  },
  {
    title: 'Files are organized',
    microcopy: 'The correct folder or document location is selected.',
    chip: 'File stored',
  },
  {
    title: 'Reminder is scheduled',
    microcopy: 'A follow-up or next action is created.',
    chip: 'Reminder set',
  },
  {
    title: 'Report updates',
    microcopy: 'The summary view shows what changed.',
    chip: 'Report updated',
  },
];

const included = [
  'Workflow mapping',
  'Gmail labels or filters',
  'Sheet structure',
  'Drive folder structure',
  'Calendar reminders',
  'Docs templates',
  'Apps Script automation',
  'Basic reporting',
  'Handover notes',
  'Testing with real scenarios',
  'Simple operating instructions',
];

const customScope = [
  'Full ERP replacement',
  'Unsupported enterprise admin changes',
  'Complex security review',
  'Large data cleanup without custom scope',
  'Complex permissions migration',
  'Advanced analytics warehouse',
  'Ongoing support unless support plan is included',
  'Third-party tools that need separate API scoping',
];

const fitPanels = [
  {
    title: 'Good fit',
    tone: 'cyan',
    items: [
      'Teams using Gmail and Sheets for operations',
      'Businesses manually updating trackers',
      'Businesses losing files in Drive',
      'Teams needing reminders and handoffs',
      'Owners needing basic reports from existing tools',
      'Admin-heavy teams using forms, folders, and documents',
      'Businesses that want to improve current tools before buying new software',
    ],
  },
  {
    title: 'Needs custom scoping',
    tone: 'amber',
    items: [
      'Complex security or admin changes',
      'Large Drive cleanup or migration',
      'Multi-location permissions setup',
      'Enterprise-level reporting',
      'Complex API connections',
      'Full internal tool or portal build',
      'Advanced data migration',
      'High-risk automation decisions',
    ],
  },
];

const boardSummary = [
  { label: 'Requests captured', value: 'Request received', tone: 'cyan' },
  { label: 'Files stored', value: 'File stored', tone: 'green' },
  { label: 'Reminders due', value: 'Due today', tone: 'amber' },
  { label: 'Reports updated', value: 'Report updated', tone: 'cyan' },
];

const relatedModules = [
  {
    title: 'Workflow Automation and Integrations',
    copy: 'Connect Workspace actions to other tools, notifications, and reports.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Lead Capture and Follow Up',
    copy: 'Capture enquiries and route them into Sheets, Gmail, reminders, and reports.',
    href: '/solutions/lead-capture',
  },
  {
    title: 'Quote and Document Generator',
    copy: 'Use captured details to generate repeatable quote or document outputs.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Custom Dashboard Starter',
    copy: 'Turn Workspace data into a cleaner status and reporting view.',
    href: '/solutions/web-apps',
  },
];

const faqs = [
  {
    question: 'Do I need to stop using Gmail, Sheets, or Drive?',
    answer: 'No. The goal is usually to improve the tools you already use before recommending new software.',
  },
  {
    question: 'Can this work with Google Sheets?',
    answer: 'Yes. Sheets can often become the tracking layer for requests, statuses, reminders, and reports.',
  },
  {
    question: 'Can files be organized automatically?',
    answer: 'Yes, depending on the workflow. The system can help route files, create folders, or store documents in a cleaner structure when scoped.',
  },
  {
    question: 'Can reminders be created automatically?',
    answer: 'Yes. Calendar reminders or follow-up tasks can be created from the workflow when the rules are clear.',
  },
  {
    question: 'Can this generate documents?',
    answer: 'Yes. Docs templates can be used to create repeatable documents from captured details when the structure is defined.',
  },
  {
    question: 'What if our Drive or Sheets are already messy?',
    answer: 'A small cleanup can be included if it fits the scope. Larger cleanup or migration work should be quoted separately.',
  },
  {
    question: 'Will this replace a full business system?',
    answer: 'Not always. A Smart Workspace build is often a practical first layer. If you need dashboards, portals, or permissions, we may recommend a custom web app.',
  },
];

function ProductButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 max-sm:w-full',
        variant === 'primary'
          ? 'bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] text-white shadow-[0_16px_44px_rgba(14,165,255,0.30)] hover:-translate-y-0.5 hover:shadow-[0_20px_54px_rgba(14,165,255,0.42)]'
          : 'border border-cyan-300/30 bg-cyan-300/8 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/14',
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function SectionHeader({ title, subheading }: { title: string; subheading?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] text-slate-50 md:text-5xl">{title}</h2>
      {subheading ? <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subheading}</p> : null}
    </div>
  );
}

function GlassPanel({ children, className, style }: React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  return <div style={style} className={cn('rounded-[2rem] border border-cyan-300/20 bg-[rgba(4,13,28,0.84)] shadow-[0_24px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl', className)}>{children}</div>;
}

function ProductHero() {
  return (
    <section className="relative pt-14 md:pt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100">SMART WORKSPACE SYSTEMS</p>
          <h1 className="max-w-4xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-50 md:text-7xl">Make your current tools work like one system.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Connect Gmail, Sheets, Drive, Calendar, Docs, and forms with rules that label, store, remind, track, and report.</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">Built for teams already using everyday business tools, but still losing time to manual updates, messy files, missed reminders, and repeated reporting.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ProductButton href={quoteRoute}>Request a Quote</ProductButton>
            <ProductButton href={viewWorkRoute} variant="secondary">View Work</ProductButton>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">{chip}</span>
            ))}
          </div>
        </div>
        <ProductHeroVisual />
      </Container>
    </section>
  );
}

function ProductHeroVisual() {
  return (
    <GlassPanel className="smart-workspace-visual relative overflow-hidden p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,223,255,0.13),transparent_36%)]" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030914]/80 p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Workspace connected</p>
            <p className="mt-1 text-sm text-slate-400">Label, store, remind, track, report</p>
          </div>
          <span className="smart-manual-chip rounded-full border border-amber-300/24 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">Manual update fading out</span>
        </div>

        <div className="smart-route-stage relative grid gap-4 lg:grid-cols-[0.82fr_1fr_0.95fr]">
          <span className="smart-travel-dot" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {heroTools.map((tool, index) => (
              <div key={tool} className="smart-tool-node rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.055] p-3" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-100">{tool}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,223,255,0.6)]" />
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center py-4">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 250" aria-hidden="true">
              <path className="smart-route-line" d="M18 52 C88 52 86 124 128 124" />
              <path className="smart-route-line smart-delay-1" d="M18 198 C90 198 84 124 128 124" />
              <path className="smart-route-line smart-delay-2" d="M172 124 C214 124 218 58 282 58" />
              <path className="smart-route-line smart-delay-3" d="M172 124 C214 124 218 124 282 124" />
              <path className="smart-route-line smart-delay-4" d="M172 124 C214 124 218 190 282 190" />
            </svg>
            <div className="relative w-full max-w-[250px] rounded-[1.4rem] border border-cyan-300/34 bg-[rgba(5,16,34,0.96)] p-5 shadow-[0_0_54px_rgba(14,165,255,0.20)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200"><Workflow className="h-5 w-5" /></span>
                <div>
                  <p className="text-base font-bold text-slate-50">Rules Engine</p>
                  <p className="text-xs text-slate-400">Workspace operating layer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                {engineRules.map((rule) => <span key={rule} className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.07] px-2 py-1 text-cyan-100">{rule}</span>)}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {heroOutputs.map((output, index) => (
              <div key={output} className="smart-output-card rounded-2xl border border-cyan-300/16 bg-white/[0.035] p-3" style={{ animationDelay: `${520 + index * 90}ms` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-50">{output}</span>
                  <Check className="h-4 w-4 text-emerald-300" />
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.06] p-3">
              <div className="flex flex-wrap gap-1.5">
                {['Status visible', 'Follow-ups due', 'Files stored', 'Reports updated'].map((label) => <span key={label} className="rounded-full bg-emerald-300/10 px-2 py-1 text-[11px] font-semibold text-emerald-100">{label}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function ProblemVisual({ type, chip }: { type: string; chip: string }) {
  if (type === 'report') {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3"><div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400"><span className="rounded-xl bg-white/[0.04] p-2">Inbox</span><span className="rounded-xl bg-white/[0.04] p-2">Sheet</span><span className="rounded-xl bg-white/[0.04] p-2">Folder</span></div><div className="mt-3 rounded-xl border border-amber-300/18 bg-amber-300/[0.06] p-3 text-xs text-amber-100">{chip}</div></div>;
  }
  if (type === 'sheet') {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3"><div className="grid grid-cols-[1fr_0.7fr] gap-2 text-xs"><span className="rounded-xl bg-white/[0.04] p-2 text-slate-300">Request row</span><span className="rounded-xl bg-amber-300/[0.08] p-2 text-amber-100">Unknown</span></div><div className="mt-3 h-px border-t border-dashed border-amber-300/30" /></div>;
  }
  if (type === 'calendar') {
    return <div className="mt-5 rounded-2xl border border-amber-300/18 bg-[#030914]/70 p-3"><div className="flex items-center justify-between"><CalendarDays className="h-5 w-5 text-amber-300" /><span className="rounded-full bg-amber-300/12 px-2 py-1 text-xs text-amber-200">{chip}</span></div><p className="mt-4 text-sm text-slate-300">Follow-up reminder</p></div>;
  }
  if (type === 'inbox') {
    return <div className="mt-5 space-y-2 rounded-2xl border border-white/10 bg-[#030914]/70 p-3">{['General update', 'Request hidden', 'Newsletter'].map((item, index) => <div key={item} className={cn('rounded-xl border p-2 text-xs', index === 1 ? 'border-amber-300/20 bg-amber-300/[0.06] text-amber-100' : 'border-white/10 bg-white/[0.03] text-slate-500')}>{item}</div>)}</div>;
  }
  return <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3"><div className="flex gap-2"><span className="h-12 flex-1 rounded-xl border border-amber-300/18 bg-amber-300/[0.05]" /><span className="h-12 flex-1 translate-y-3 rounded-xl border border-white/10 bg-white/[0.03]" /></div><span className="mt-4 inline-flex rounded-full bg-amber-300/12 px-2 py-1 text-xs text-amber-200">{chip}</span></div>;
}

function WorkspaceGapProblemGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Your tools are useful. The gaps between them are the problem." subheading="Most teams already have the tools. What they need is cleaner structure, rules, reminders, and reporting between those tools." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {problemCards.map((problem, index) => (
            <GlassPanel key={problem.title} className="smart-reveal-card p-5" style={{ '--smart-delay': `${index * 80}ms` } as React.CSSProperties}>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="smart-warning-dot h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="rounded-full border border-amber-300/18 bg-amber-300/[0.08] px-2 py-1 text-[11px] font-semibold text-amber-200">{problem.chip}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50">{problem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p>
              <ProblemVisual type={problem.visual} chip={problem.chip} />
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WorkspaceRulesPanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Rules your workspace can follow." subheading="Simple operating rules can turn everyday tools into a cleaner workflow." />
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workspaceRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <GlassPanel key={rule.title} className="group p-5 transition hover:-translate-y-1 hover:border-cyan-200/40">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-xs font-semibold text-cyan-100">{rule.chip}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-50">{rule.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{rule.value}</p>
                  <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(56,223,255,0.7),transparent)]" />
                </GlassPanel>
              );
            })}
          </div>
          <RulesEnginePanel />
        </div>
      </Container>
    </section>
  );
}

function RulesEnginePanel() {
  const stages = ['Request arrives', 'Apply rule', 'Update workspace', 'Show status'];
  return (
    <GlassPanel className="relative overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(14,165,255,0.14),transparent_42%)]" />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Rules engine</p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-50">If request arrives, the workspace updates.</h3>
        <div className="mt-6 space-y-3">
          {stages.map((stage, index) => (
            <div key={stage} className="flex items-center gap-3 rounded-2xl border border-cyan-300/14 bg-white/[0.035] p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-bold text-cyan-100">{index + 1}</span>
              <span className="text-sm font-semibold text-slate-100">{stage}</span>
              {index === stages.length - 1 ? <span className="ml-auto rounded-full bg-emerald-300/10 px-2 py-1 text-[11px] font-semibold text-emerald-100">Ready</span> : <span className="ml-auto h-px w-10 bg-cyan-300/35" />}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-amber-300/18 bg-amber-300/[0.05] p-3 text-sm text-amber-100">Manual state fades as rules take over.</div>
      </div>
    </GlassPanel>
  );
}

function WorkspaceModuleGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Workspace modules we can build." subheading="Start with the part of your workspace causing the most friction." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workspaceModules.map((module) => {
            const Icon = module.icon;
            return (
              <GlassPanel key={module.title} className="group p-5 transition hover:-translate-y-1 hover:border-cyan-200/40">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2.5 py-1 text-xs font-semibold text-emerald-100">{module.chip}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-50">{module.title}</h3>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Problem it fixes</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{module.problem}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Output it creates</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{module.output}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3">
                  <div className="flex items-center gap-2"><span className="h-8 flex-1 rounded-xl bg-white/[0.04]" /><ArrowRight className="h-4 w-4 text-cyan-200 transition-transform group-hover:translate-x-1" /><span className="h-8 flex-1 rounded-xl bg-cyan-300/[0.08]" /></div>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function RequestToReportWorkflow() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Example: request to report." subheading="One request can trigger a clean chain of workspace actions." />
        <GlassPanel className="relative overflow-hidden p-5 md:p-6">
          <div className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-cyan-300/18 lg:block" />
          <div className="smart-flow-line absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-[linear-gradient(90deg,#38DFFF,#0EA5FF)] lg:block" />
          <div className="grid gap-4 lg:grid-cols-6">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-[#030914]/72 p-4">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/28 bg-cyan-300/10 text-sm font-bold text-cyan-100 shadow-[0_0_24px_rgba(14,165,255,0.18)]">{index + 1}</div>
                <h3 className="text-base font-bold text-slate-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.microcopy}</p>
                <span className="mt-4 inline-flex rounded-full border border-cyan-300/16 bg-cyan-300/[0.07] px-2 py-1 text-[11px] font-semibold text-cyan-100">{step.chip}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function ScopeListPanel({ title, items, tone }: { title: string; items: string[]; tone: 'cyan' | 'amber' }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', tone === 'cyan' ? 'bg-cyan-300/12 text-cyan-200' : 'bg-amber-300/12 text-amber-200')}>{tone === 'cyan' ? <Check className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IncludedScopePanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="What can be included." subheading="The exact build depends on your current Workspace setup, file structure, workflows, and reporting needs." />
        <GlassPanel className="p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <ScopeListPanel title="Included in a typical Smart Workspace build" items={included} tone="cyan" />
            <ScopeListPanel title="Usually scoped separately" items={customScope} tone="amber" />
          </div>
          <p className="mt-5 rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.06] p-4 text-sm leading-6 text-slate-300">If the workflow is bigger than a workspace automation, we will recommend a custom quote instead of forcing a starter scope.</p>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFitPanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Best fit if your business already uses Google Workspace." />
        <div className="grid gap-4 lg:grid-cols-2">
          {fitPanels.map((panel) => (
            <GlassPanel key={panel.title} className={cn('p-6', panel.tone === 'cyan' ? 'border-cyan-300/24' : 'border-amber-300/18')}>
              <h3 className="text-2xl font-semibold text-slate-50">{panel.title}</h3>
              <ul className="mt-5 space-y-3">
                {panel.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><ShieldCheck className={cn('mt-1 h-4 w-4 shrink-0', panel.tone === 'cyan' ? 'text-cyan-200' : 'text-amber-200')} />{item}</li>
                ))}
              </ul>
            </GlassPanel>
          ))}
        </div>
        <GlassPanel className="mt-4 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Not sure what to automate first?</p>
            <p className="mt-1 text-sm text-slate-400">Request a quote and we will map the easiest win.</p>
          </div>
          <ProductButton href={quoteRoute}>Request a Quote</ProductButton>
        </GlassPanel>
      </Container>
    </section>
  );
}

function WorkspaceSystemMockup() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Example workspace operating board." subheading="A simple board can show requests, folders, reminders, and reports in one place." />
        <GlassPanel className="overflow-hidden p-4 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Workspace board</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-50">Requests, files, reminders, reports</h3>
            </div>
            <Link href={quoteRoute} className="group inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/60">Scope this workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {boardSummary.map((card) => (
                <div key={card.label} className="group rounded-2xl border border-white/10 bg-[#030914]/72 p-4 transition hover:border-cyan-300/38 hover:bg-cyan-300/[0.06]">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-lg font-bold text-slate-50">{card.value}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/8"><div className={cn('h-full rounded-full transition-all group-hover:w-full', card.tone === 'amber' ? 'w-2/3 bg-amber-300' : card.tone === 'green' ? 'w-3/4 bg-emerald-300' : 'w-1/2 bg-cyan-300')} /></div>
                </div>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#020711]/64 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <BoardCard icon={<Mail className="h-4 w-4" />} title="Gmail request card" chip="Request received" copy="New service request labelled and captured." />
                <BoardCard icon={<Sheet className="h-4 w-4" />} title="Sheet tracker preview" chip="Sheet updated" copy="Row created with status and owner." />
                <BoardCard icon={<FolderKanban className="h-4 w-4" />} title="Drive folder card" chip="File stored" copy="Folder selected and document saved." />
                <BoardCard icon={<CalendarDays className="h-4 w-4" />} title="Calendar reminder card" chip="Reminder set" copy="Follow-up due date is visible." />
                <BoardCard icon={<FileText className="h-4 w-4" />} title="Docs template card" chip="Handover ready" copy="Template filled from captured details." />
                <BoardCard icon={<Gauge className="h-4 w-4" />} title="Report summary card" chip="Report updated" copy="Status log and summary refreshed." />
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.045] p-3 text-sm text-slate-300">Status log row: label applied, sheet updated, file stored, reminder set, report updated.</div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BoardCard({ icon, title, chip, copy }: { icon: React.ReactNode; title: string; chip: string; copy: string }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/42 hover:bg-cyan-300/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-50"><span className="text-cyan-200">{icon}</span><p className="font-semibold">{title}</p></div>
        <span className="rounded-full border border-emerald-300/22 bg-emerald-300/10 px-2 py-1 text-[11px] font-bold text-emerald-100">{chip}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
    </div>
  );
}

function RelatedSystemModules() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="This workspace system can connect to other layers." subheading="Workspace automation often becomes more powerful when connected to lead capture, dashboards, quote flows, or internal tools." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedModules.map((module) => (
            <Link key={module.title} href={module.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
              <GlassPanel className="h-full p-5 transition group-hover:-translate-y-1 group-hover:border-cyan-200/42">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-200"><Route className="h-5 w-5" /></div>
                <h3 className="text-lg font-semibold text-slate-50">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{module.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-100">View module <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFAQAccordion() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Smart Workspace questions." />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-3xl border border-cyan-300/16 bg-[rgba(4,13,28,0.84)] p-5 transition open:border-cyan-200/42">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-100 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFinalCTA() {
  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-24">
      <Container>
        <GlassPanel className="relative overflow-hidden p-6 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(56,223,255,0.13),transparent_34%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <h2 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-[-0.04em] text-slate-50 md:text-6xl">Ready to make your workspace smarter?</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Tell us what you currently use and what keeps getting missed. We will recommend the cleanest workspace automation.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ProductButton href={quoteRoute}>Request a Quote</ProductButton><ProductButton href={viewWorkRoute} variant="secondary">View Work</ProductButton></div>
              <p className="mt-5 text-sm text-slate-400">Built around your tools first. Clear scope before build. No pressure.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-[#030914]/78 p-4">
              <div className="grid gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4"><p className="text-sm font-semibold text-slate-100">Gmail request</p><p className="mt-1 text-xs text-slate-500">Manual updates waiting</p></div>
                <div className="flex items-center gap-3"><div className="h-px flex-1 bg-cyan-300/45" /><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Rules Engine</span><div className="h-px flex-1 bg-cyan-300/45" /></div>
                <div className="grid gap-2 sm:grid-cols-3"><span className="rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.06] p-3 text-xs font-semibold text-cyan-100">Sheet updated</span><span className="rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.06] p-3 text-xs font-semibold text-emerald-100">Reminder set</span><span className="rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.06] p-3 text-xs font-semibold text-cyan-100">Report updated</span></div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-100">Workspace connected</p><span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-bold text-emerald-200">Ready</span></div></div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default function SmartWorkspacePage() {
  return (
    <main className="smart-workspace-page relative overflow-hidden">
      <ProductHero />
      <WorkspaceGapProblemGrid />
      <WorkspaceRulesPanel />
      <WorkspaceModuleGrid />
      <RequestToReportWorkflow />
      <IncludedScopePanel />
      <BestFitPanel />
      <WorkspaceSystemMockup />
      <RelatedSystemModules />
      <ProductFAQAccordion />
      <ProductFinalCTA />
    </main>
  );
}
