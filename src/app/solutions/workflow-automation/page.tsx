import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ClipboardCheck,
  Code2,
  DatabaseZap,
  FileText,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe2,
  Mail,
  MessageCircle,
  Network,
  RefreshCw,
  Route,
  Sheet,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Workflow Automation and Integrations | Rapid Rise AI',
  description: 'Connect repeated admin tasks, route actions, trigger updates, and report status with practical workflow automation.',
  path: '/solutions/workflow-automation',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Workflow Automation and Integrations | Rapid Rise AI',
    description: 'Connect the tools your business already uses with workflow rules, notifications, status updates, and reports.',
  },
};

const heroTools = ['Website', 'Gmail', 'Sheets', 'Drive', 'WhatsApp', 'Calendar', 'API'];

const problemCards = [
  {
    title: 'Manual copy',
    copy: 'Information is typed or pasted from one place to another.',
    chip: 'Copy again',
  },
  {
    title: 'Missed handoffs',
    copy: 'A task is completed, but the next person or tool is not updated.',
    chip: 'Next step unclear',
  },
  {
    title: 'No status update',
    copy: 'People need to ask what happened because the system does not show it.',
    chip: 'Unknown status',
  },
  {
    title: 'Repeated reporting',
    copy: 'Reports take time because the data is scattered.',
    chip: 'Manual report',
  },
  {
    title: 'Tool gaps',
    copy: 'The tools exist, but they do not talk to each other.',
    chip: 'Disconnected',
  },
];

const automationOutputs = [
  {
    icon: RefreshCw,
    title: 'Sync data between tools',
    value: 'Move clean information from one system into another without repeated copy work.',
    chip: 'Synced',
  },
  {
    icon: GitBranch,
    title: 'Route requests by rules',
    value: 'Send the right request to the right person, folder, sheet, or next step.',
    chip: 'Routed',
  },
  {
    icon: Bell,
    title: 'Send notifications',
    value: 'Alert the team when action is needed or a workflow changes state.',
    chip: 'Notified',
  },
  {
    icon: Sheet,
    title: 'Update dashboards or sheets',
    value: 'Keep tracking views current as the work moves forward.',
    chip: 'Updated',
  },
  {
    icon: FileText,
    title: 'Generate documents or summaries',
    value: 'Create structured outputs from captured details and approved templates.',
    chip: 'Generated',
  },
  {
    icon: ClipboardCheck,
    title: 'Trigger follow-up tasks',
    value: 'Create the next task when a form, status, email, or record changes.',
    chip: 'Task set',
  },
  {
    icon: Gauge,
    title: 'Create reports',
    value: 'Turn scattered workflow activity into a simple summary or log.',
    chip: 'Reported',
  },
];

const inputs = ['Website form', 'Gmail', 'WhatsApp', 'Google Sheet', 'Staff update', 'Customer request'];
const rules = ['If this happens', 'Check details', 'Route next step', 'Update record'];
const outputs = ['Notification', 'Status update', 'Document', 'Dashboard', 'Report'];

const included = [
  'Workflow mapping',
  'Trigger setup',
  'Rule logic',
  'Tool connection',
  'Notification flow',
  'Status update flow',
  'Basic reporting or logs',
  'Handover notes',
];

const customScope = [
  'Large data migration',
  'Complex enterprise integration',
  'Custom app build',
  'Unsupported third-party API work without scoping',
  'Ongoing monitoring unless support plan is included',
];

const toolCards = [
  { name: 'Google Sheets', icon: Sheet },
  { name: 'Gmail', icon: Mail },
  { name: 'Google Drive', icon: FolderKanban },
  { name: 'Google Calendar', icon: CalendarDays },
  { name: 'Forms', icon: ClipboardCheck },
  { name: 'WhatsApp workflows', icon: MessageCircle },
  { name: 'Websites', icon: Globe2 },
  { name: 'APIs', icon: Code2 },
  { name: 'Make', icon: Workflow },
  { name: 'Zapier', icon: Network },
  { name: 'n8n', icon: Route },
  { name: 'Apps Script', icon: DatabaseZap },
];

const fitPanels = [
  {
    title: 'Good fit',
    tone: 'cyan',
    items: [
      'Repeated manual copy tasks',
      'Notification and routing gaps',
      'Google Workspace workflows',
      'Quote/request flows',
      'Internal admin handoffs',
      'Weekly reporting tasks',
    ],
  },
  {
    title: 'Needs custom quote',
    tone: 'amber',
    items: [
      'Multi-department workflows',
      'Many approval branches',
      'Large data movement',
      'Complex API integrations',
      'Custom web app requirements',
    ],
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

function WorkflowHero() {
  return (
    <section className="relative pt-14 md:pt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100">WORKFLOW AUTOMATION</p>
          <h1 className="max-w-4xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-50 md:text-7xl">Connect the tools your work already depends on.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Automate repeated admin, handoffs, notifications, and updates between the systems your business already uses.</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">Stop copying the same information between tools. Build a workflow layer that moves the next action forward.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ProductButton href={quoteHref}>Request a Quote</ProductButton>
            <ProductButton href={workHref} variant="secondary">View Work</ProductButton>
          </div>
        </div>
        <WorkflowHeroVisual />
      </Container>
    </section>
  );
}

function WorkflowHeroVisual() {
  return (
    <GlassPanel className="workflow-product-visual relative overflow-hidden p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(56,223,255,0.14),transparent_36%)]" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030914]/80 p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Connected flow</p>
            <p className="mt-1 text-sm text-slate-400">Tool A, rules, Tool B, notification, report</p>
          </div>
          <span className="rounded-full border border-amber-300/24 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200 workflow-manual-chip">Manual copy fading out</span>
        </div>

        <div className="workflow-route-stage relative grid gap-4 lg:grid-cols-[0.8fr_1fr_0.92fr]">
          <span className="workflow-travel-dot" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {heroTools.map((tool, index) => (
              <div key={tool} className="workflow-tool-node rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.055] p-3" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-100">{tool}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,223,255,0.6)]" />
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center py-4">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 250" aria-hidden="true">
              <path className="workflow-route-line" d="M18 52 C88 52 86 124 128 124" />
              <path className="workflow-route-line workflow-delay-1" d="M18 198 C90 198 84 124 128 124" />
              <path className="workflow-route-line workflow-delay-2" d="M172 124 C214 124 218 62 282 62" />
              <path className="workflow-route-line workflow-delay-3" d="M172 124 C214 124 218 124 282 124" />
              <path className="workflow-route-line workflow-delay-4" d="M172 124 C214 124 218 188 282 188" />
              <circle className="workflow-data-dot" r="4" cx="128" cy="124" />
            </svg>
            <div className="relative w-full max-w-[245px] rounded-[1.4rem] border border-cyan-300/34 bg-[rgba(5,16,34,0.96)] p-5 shadow-[0_0_54px_rgba(14,165,255,0.20)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200"><Workflow className="h-5 w-5" /></span>
                <div>
                  <p className="text-base font-bold text-slate-50">Rule engine</p>
                  <p className="text-xs text-slate-400">Checks, routes, updates</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {rules.map((rule) => <div key={rule} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-300" /> {rule}</div>)}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <OutputMiniCard title="Action output" copy="Tool B is updated" chip="Updated" tone="cyan" />
            <OutputMiniCard title="Notification" copy="Team knows the next step" chip="Sent" tone="blue" />
            <OutputMiniCard title="Report" copy="Status becomes visible" chip="Live" tone="green" />
            <div className="rounded-2xl border border-amber-300/18 bg-amber-300/[0.045] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Before</p>
              <p className="mt-1 text-sm text-slate-400">Manual copy between tools</p>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function OutputMiniCard({ title, copy, chip, tone }: { title: string; copy: string; chip: string; tone: 'cyan' | 'blue' | 'green' }) {
  const toneClass = tone === 'green' ? 'border-emerald-300/24 bg-emerald-300/10 text-emerald-200' : tone === 'blue' ? 'border-blue-300/24 bg-blue-300/10 text-blue-100' : 'border-cyan-300/24 bg-cyan-300/10 text-cyan-100';
  return (
    <div className="rounded-2xl border border-cyan-300/16 bg-white/[0.035] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-slate-50">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{copy}</p>
        </div>
        <span className={cn('rounded-full border px-2 py-1 text-[11px] font-semibold', toneClass)}>{chip}</span>
      </div>
    </div>
  );
}

function ProblemGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Where repeated admin slows the business down." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {problemCards.map((problem, index) => (
            <GlassPanel key={problem.title} className="workflow-reveal-card p-5" style={{ '--workflow-delay': `${index * 80}ms` } as React.CSSProperties}>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,165,36,0.6)]" />
                <span className="rounded-full border border-amber-300/18 bg-amber-300/[0.08] px-2 py-1 text-[11px] font-semibold text-amber-200">{problem.chip}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50">{problem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p>
              <div className="mt-5 flex items-center gap-2">
                <span className="h-8 w-14 rounded-xl border border-white/10 bg-white/[0.03]" />
                <span className="h-px flex-1 border-t border-dashed border-amber-300/35" />
                <span className="h-8 w-14 rounded-xl border border-white/10 bg-white/[0.03] opacity-50" />
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AutomationOutputs() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="What a workflow automation can do." subheading="Automation is useful when it has a clear trigger, a rule, and a next action that should happen the same way every time." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {automationOutputs.map((item) => {
            const Icon = item.icon;
            return (
              <GlassPanel key={item.title} className="group p-5 transition hover:-translate-y-1 hover:border-cyan-200/40">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-xs font-semibold text-cyan-100">{item.chip}</span>
                </div>
                <h3 className="text-base font-bold text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.value}</p>
                <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(56,223,255,0.7),transparent)]" />
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function WorkflowEngineVisual() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="From manual steps to connected flow." subheading="Map the repeated input, apply rules, then push the right output into the place your team already checks." />
        <GlassPanel className="workflow-engine-map relative overflow-hidden p-4 md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,255,0.12),transparent_38%)]" />
          <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
            <WorkflowColumn title="Inputs" items={inputs} tone="amber" />
            <div className="relative rounded-[1.6rem] border border-cyan-300/30 bg-[rgba(5,16,34,0.94)] p-5 shadow-[0_0_54px_rgba(14,165,255,0.18)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200"><Sparkles className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Rules Engine</p>
                  <h3 className="text-2xl font-semibold text-slate-50">Rapid Rise Workflow Layer</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {rules.map((rule, index) => (
                  <div key={rule} className="rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.055] p-3">
                    <p className="text-xs font-bold text-cyan-100">Rule {index + 1}</p>
                    <p className="mt-1 text-sm text-slate-300">{rule}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.07] p-3 text-sm text-emerald-100">Connected flow active</div>
            </div>
            <WorkflowColumn title="Outputs" items={outputs} tone="cyan" />
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function WorkflowColumn({ title, items, tone }: { title: string; items: string[]; tone: 'amber' | 'cyan' }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#030914]/72 p-4">
      <p className={cn('mb-4 text-xs font-bold uppercase tracking-[0.2em]', tone === 'amber' ? 'text-amber-200' : 'text-cyan-200')}>{title}</p>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="workflow-flow-card rounded-2xl border border-white/10 bg-white/[0.035] p-3" style={{ animationDelay: `${index * 90}ms` }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-100">{item}</span>
              <span className={cn('h-2 w-2 rounded-full', tone === 'amber' ? 'bg-amber-300' : 'bg-cyan-300')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScopePanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="What can be included." />
        <GlassPanel className="p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <ScopeList title="Included in a typical automation" items={included} tone="cyan" />
            <ScopeList title="Not usually included in a simple automation" items={customScope} tone="amber" />
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function ScopeList({ title, items, tone }: { title: string; items: string[]; tone: 'cyan' | 'amber' }) {
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

function ToolsLayer() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Built around the tools you already use." subheading="We usually improve what you already use before recommending new software." />
        <GlassPanel className="p-4 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {toolCards.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.name} className="rounded-2xl border border-cyan-300/14 bg-white/[0.035] p-4 transition hover:border-cyan-200/38 hover:bg-cyan-300/[0.055]">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span>
                      <span className="text-sm font-semibold text-slate-100">{tool.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center rounded-[1.5rem] border border-cyan-300/18 bg-[#030914]/72 p-6 text-center">
              <div>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/24 bg-cyan-300/10 text-cyan-200 shadow-[0_0_40px_rgba(14,165,255,0.18)]"><Workflow className="h-7 w-7" /></span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Rapid Rise Workflow Layer</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">A practical connection layer for triggers, rules, updates, notifications, and simple reports.</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFit() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Best fit for businesses with repeated admin." />
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
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-24">
      <Container>
        <GlassPanel className="relative overflow-hidden p-6 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(56,223,255,0.13),transparent_34%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <h2 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-[-0.04em] text-slate-50 md:text-6xl">Ready to connect the workflow?</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Tell us which tasks repeat every week and which tools are involved. We will recommend the simplest automation path.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ProductButton href={quoteHref}>Request a Quote</ProductButton><ProductButton href={workHref} variant="secondary">View Work</ProductButton></div>
              <p className="mt-5 text-sm text-slate-400">Clear scope first. No bloated build.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-[#030914]/78 p-4">
              <div className="grid gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4"><p className="text-sm font-semibold text-slate-100">Repeated admin</p><p className="mt-1 text-xs text-slate-500">Copy, ask, update, report</p></div>
                <div className="flex items-center gap-3"><div className="h-px flex-1 bg-cyan-300/45" /><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Rules and routes</span><div className="h-px flex-1 bg-cyan-300/45" /></div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-slate-100">Connected workflow</p><p className="mt-1 text-xs text-slate-500">Notifications, updates, reports</p></div><span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-bold text-emerald-200">Status visible</span></div></div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default function WorkflowAutomationPage() {
  return (
    <main className="workflow-automation-page relative overflow-hidden">
      <WorkflowHero />
      <ProblemGrid />
      <AutomationOutputs />
      <WorkflowEngineVisual />
      <ScopePanel />
      <ToolsLayer />
      <BestFit />
      <FinalCTA />
    </main>
  );
}
