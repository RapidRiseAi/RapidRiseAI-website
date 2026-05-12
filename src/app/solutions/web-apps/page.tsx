import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FolderUp,
  Gauge,
  History,
  LayoutDashboard,
  ListChecks,
  PanelsTopLeft,
  ShieldCheck,
  Table2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Web Apps and Internal Tools | Rapid Rise AI',
  description: 'Build dashboards, portals, trackers, approval systems, and role-based internal tools around the way your team works.',
  path: '/solutions/web-apps',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Web Apps and Internal Tools | Rapid Rise AI',
    description: 'Replace scattered spreadsheets and updates with practical dashboards, portals, trackers, and role-based tools built around your workflow.',
  },
};

const trustChips = ['Role-based screens', 'Status visibility', 'Handover notes included', 'Built around the workflow first'];

const problems = [
  {
    title: 'Overloaded spreadsheets',
    copy: 'The sheet is doing too much and nobody fully trusts the latest version.',
    visual: 'sheet',
  },
  {
    title: 'Poor visibility',
    copy: 'Owners and managers cannot see what is moving, stuck, or waiting.',
    visual: 'visibility',
  },
  {
    title: 'No permissions',
    copy: 'Everyone sees too much, too little, or the wrong information.',
    visual: 'permissions',
  },
  {
    title: 'Manual approvals',
    copy: 'Approvals happen in chats and get lost.',
    visual: 'approvals',
  },
  {
    title: 'No history',
    copy: 'Changes happen, but there is no reliable timeline or record.',
    visual: 'history',
  },
];

const internalTools = [
  {
    icon: LayoutDashboard,
    title: 'Admin dashboards',
    purpose: 'Give owners and managers a clear view of status, records, actions, and reports.',
    chip: 'Control view',
    visual: 'dashboard',
  },
  {
    icon: PanelsTopLeft,
    title: 'Client portals',
    purpose: 'Let clients see requests, documents, approvals, or updates without asking repeatedly.',
    chip: 'Client visibility',
    visual: 'portal',
  },
  {
    icon: ListChecks,
    title: 'Team status boards',
    purpose: 'Show assigned work, next actions, due dates, and stuck items.',
    chip: 'Team execution',
    visual: 'board',
  },
  {
    icon: ClipboardCheck,
    title: 'Approval systems',
    purpose: 'Move approvals out of chats and into a tracked workflow.',
    chip: 'Approved flow',
    visual: 'approval',
  },
  {
    icon: Table2,
    title: 'Quote or request trackers',
    purpose: 'Track quote requests, service requests, project requests, or internal tasks.',
    chip: 'Tracked pipeline',
    visual: 'pipeline',
  },
  {
    icon: History,
    title: 'Vehicle, job, or project timelines',
    purpose: 'Create a history of updates, documents, decisions, and status changes.',
    chip: 'Reliable history',
    visual: 'timeline',
  },
  {
    icon: FolderUp,
    title: 'Document upload areas',
    purpose: 'Keep files connected to the correct client, job, vehicle, request, or project.',
    chip: 'Files linked',
    visual: 'files',
  },
  {
    icon: Bell,
    title: 'Notification feeds',
    purpose: 'Show what changed and who needs to take action.',
    chip: 'Updates visible',
    visual: 'feed',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based screens',
    purpose: 'Show the right information to the right person.',
    chip: 'Controlled access',
    visual: 'roles',
  },
  {
    icon: Gauge,
    title: 'Reporting views',
    purpose: 'Show what is moving, delayed, completed, or ready.',
    chip: 'Status visible',
    visual: 'reports',
  },
];

const roles = [
  {
    id: 'admin',
    label: 'Admin',
    title: 'Admin control view',
    summary: 'Full dashboard, records, approvals, reports, and role controls.',
    items: ['Full dashboard', 'Records', 'Approvals', 'Reports', 'Role controls'],
    metrics: ['Active records', 'Pending approvals', 'Reports ready'],
  },
  {
    id: 'team',
    label: 'Team',
    title: 'Team execution view',
    summary: 'Assigned work, status updates, notes, next action, and due dates.',
    items: ['Assigned work', 'Status updates', 'Notes', 'Next action', 'Due dates'],
    metrics: ['Jobs assigned', 'Actions due', 'Notes added'],
  },
  {
    id: 'client',
    label: 'Client',
    title: 'Client portal view',
    summary: 'Request status, documents, approvals, updates, and messages.',
    items: ['Request status', 'Documents', 'Approvals', 'Updates', 'Messages'],
    metrics: ['Request active', 'Documents ready', 'Approval needed'],
  },
  {
    id: 'manager',
    label: 'Manager',
    title: 'Manager visibility view',
    summary: 'Summary metrics, bottlenecks, reports, team progress, and overdue items.',
    items: ['Summary metrics', 'Bottlenecks', 'Reports', 'Team progress', 'Overdue items'],
    metrics: ['Stuck items', 'Team progress', 'Overdue actions'],
  },
];

const systemLayer = [
  { title: 'Inputs', items: ['Forms', 'Uploads', 'Staff updates', 'Client requests', 'Imported records'] },
  { title: 'Database', items: ['Clean records', 'History', 'Permissions', 'Linked files'] },
  { title: 'Role-based screens', items: ['Admin', 'Team', 'Client', 'Manager'] },
  { title: 'Notifications', items: ['Owner alert', 'Approval request', 'Status update', 'Follow-up'] },
  { title: 'Reports', items: ['Status dashboard', 'Bottlenecks', 'Activity log', 'Summary view'] },
];

const included = [
  'Workflow mapping',
  'Screen planning',
  'Database structure',
  'User roles',
  'Forms and records',
  'Dashboard views',
  'Status tracking',
  'Notifications',
  'Basic reporting',
  'Handover notes',
  'Testing with real scenarios',
  'Simple operating instructions',
];

const scopedSeparately = [
  'Enterprise-grade ERP replacement',
  'Complex billing system',
  'Large data migration',
  'Advanced analytics warehouse',
  'Complex multi-tenant platform',
  'Complex permission structures',
  'Advanced compliance review',
  'Ongoing support unless support plan is included',
];

const goodFit = [
  'Teams relying on overloaded spreadsheets',
  'Businesses needing dashboards or portals',
  'Teams needing controlled roles and permissions',
  'Processes with approvals or status tracking',
  'Workflows with documents, notes, and history',
  'Clients who need access to updates or requests',
  'Owners who need visibility without asking everyone',
];

const customFit = [
  'Full ERP replacement',
  'Complex billing or accounting logic',
  'Large data migration',
  'Advanced analytics systems',
  'Multi-location permission structures',
  'Complex client portal platforms',
  'High-risk systems with strict compliance needs',
  'Deep integrations with many third-party tools',
];

const exampleBuilds = [
  {
    title: 'Workshop management portal',
    problem: 'Jobs, vehicles, quotes, invoices, and updates are hard to see in one place.',
    output: 'A dashboard with vehicle records, job status, timelines, quote approvals, invoices, and notifications.',
    stack: ['Web app', 'Dashboard', 'Workflows'],
    visual: 'workshop',
  },
  {
    title: 'Quote approval tracker',
    problem: 'Quote details and approvals are spread across messages and documents.',
    output: 'A tracked quote flow with request intake, review, approval, and status.',
    stack: ['Approval flow', 'Tracking', 'Documents'],
    visual: 'quote',
  },
  {
    title: 'Client request portal',
    problem: 'Clients keep asking for updates because there is no clear status view.',
    output: 'A portal where clients can submit requests, view status, and access documents.',
    stack: ['Portal', 'Client view', 'Requests'],
    visual: 'client',
  },
  {
    title: 'Team operations dashboard',
    problem: 'Team work is scattered across spreadsheets, messages, and memory.',
    output: 'A status board showing assigned work, owners, priorities, and next actions.',
    stack: ['Team board', 'Status', 'Reporting'],
    visual: 'team',
  },
  {
    title: 'Document and file system',
    problem: 'Files are hard to find and not linked to the right record.',
    output: 'Upload areas and file records connected to clients, jobs, vehicles, or requests.',
    stack: ['Files', 'Records', 'Storage'],
    visual: 'files',
  },
  {
    title: 'Status reporting board',
    problem: 'Managers cannot see what is moving, delayed, or complete.',
    output: 'A reporting screen showing active work, stuck items, and completed outcomes.',
    stack: ['Reports', 'Metrics', 'Visibility'],
    visual: 'reports',
  },
];

const relatedModules = [
  {
    title: 'Workflow Automation and Integrations',
    copy: 'Connect the internal tool to notifications, updates, reports, and external tools.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Smart Workspace Systems',
    copy: 'Use Gmail, Sheets, Drive, Calendar, and Docs as part of the operating layer.',
    href: '/solutions/google-workspace',
  },
  {
    title: 'Lead Capture and Follow Up',
    copy: 'Route new enquiries into an internal pipeline or dashboard.',
    href: '/solutions/lead-capture',
  },
  {
    title: 'Support Assistant Starter',
    copy: 'Capture support requests and hand them off into the internal system.',
    href: '/solutions/support-assistant',
  },
  {
    title: 'Quote and Document Generator',
    copy: 'Turn captured records into quotes, documents, approvals, and saved files.',
    href: '/solutions',
  },
];

const faqs = [
  {
    question: 'When do I need a custom internal tool instead of a spreadsheet?',
    answer: 'When the spreadsheet is handling too many records, roles, approvals, files, or status updates, a custom internal tool may give your team a cleaner way to run the workflow.',
  },
  {
    question: 'Can different users see different screens?',
    answer: 'Yes. Role-based screens can show different information to admins, team members, managers, or clients depending on the workflow and scope.',
  },
  {
    question: 'Can this include a client portal?',
    answer: 'Yes. A client portal can be included when clients need to submit requests, view status, approve items, or access documents.',
  },
  {
    question: 'Can this replace all of our current tools?',
    answer: 'Not always, and that is not always the best first step. We usually start by improving the workflow and building the screens that are actually needed.',
  },
  {
    question: 'Can it connect to Google Workspace?',
    answer: 'Yes. Internal tools can often connect to tools like Gmail, Sheets, Drive, Calendar, Docs, forms, or Apps Script depending on scope.',
  },
  {
    question: 'Do you provide handover?',
    answer: 'Yes. Handover notes, basic operating instructions, and guidance should be part of delivery.',
  },
  {
    question: 'What if the system is complex?',
    answer: 'If the workflow has complex permissions, many roles, large data movement, or advanced integrations, we will recommend a custom quoted build.',
  },
];

function ProductButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
        variant === 'primary'
          ? 'bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(56,223,255,0.24)] hover:bg-white'
          : 'border border-cyan-300/25 bg-white/[0.03] text-slate-100 hover:border-cyan-300/55 hover:bg-cyan-300/10',
      )}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function SectionHeader({ eyebrow, title, subheading, align = 'center' }: { eyebrow?: string; title: string; subheading?: string; align?: 'center' | 'left' }) {
  return (
    <div className={cn('mx-auto max-w-3xl', align === 'center' ? 'text-center' : 'text-left mx-0')}>
      {eyebrow ? <p className="text-system-eyebrow text-cyan-300">{eyebrow}</p> : null}
      <h2 className="mt-3 text-system-h2 text-slate-50">{title}</h2>
      {subheading ? <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subheading}</p> : null}
    </div>
  );
}

function GlassPanel({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={style} className={cn('rounded-[2rem] border border-cyan-300/20 bg-[#040d1c]/80 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl', className)}>{children}</div>;
}

function ProductHero() {
  return (
    <section className="pt-24 md:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-system-eyebrow text-cyan-300">WEB APPS AND INTERNAL TOOLS</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-50 md:text-6xl">Build the screens your team actually needs.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Replace overloaded spreadsheets and scattered updates with dashboards, portals, trackers, approval systems, and role-based tools built around the work.</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Built for teams that need cleaner visibility, better records, controlled access, and one place to see what is moving, stuck, waiting, or ready.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductButton href={quoteHref}>Request a Quote</ProductButton>
              <ProductButton href={workHref} variant="secondary">View Work</ProductButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustChips.map((chip) => (
                <span key={chip} className="rounded-full border border-cyan-300/20 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">{chip}</span>
              ))}
            </div>
          </div>
          <ProductHeroVisual />
        </div>
      </Container>
    </section>
  );
}

function ProductHeroVisual() {
  return (
    <GlassPanel className="internal-product-visual relative overflow-hidden p-4 sm:p-6">
      <div className="relative z-10 rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/40 p-4">
        <div className="internal-manual-chip absolute left-5 top-5 z-20 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
          Unclear status
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {['Admin', 'Team', 'Client', 'Manager'].map((role, index) => (
            <span key={role} className="internal-role-chip rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100" style={{ '--internal-delay': `${index * 120}ms` } as React.CSSProperties}>{role}</span>
          ))}
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="internal-screen-card rounded-3xl border border-cyan-300/20 bg-[#061326]/90 p-4 shadow-[0_0_45px_rgba(14,165,255,0.18)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Admin dashboard</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Operations control</h3>
              </div>
              <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200">Status visible</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['Active records', 'Approvals', 'Open tasks'].map((metric) => (
                <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="h-2 w-8 rounded-full bg-cyan-300/70" />
                  <p className="mt-3 text-[0.68rem] text-slate-400">{metric}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {['Client request', 'Quote review', 'Job update'].map((row, index) => (
                <div key={row} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-3 py-2">
                  <span className="text-sm text-slate-200">{row}</span>
                  <span className={cn('rounded-full px-2 py-1 text-[0.65rem] font-semibold', index === 1 ? 'bg-amber-300/12 text-amber-200' : 'bg-cyan-300/12 text-cyan-100')}>{index === 1 ? 'Review' : 'Live'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="internal-screen-card rounded-3xl border border-cyan-300/15 bg-[#051022]/88 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Team board</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['Assigned work', 'Next action', 'Notes', 'Due date'].map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</span>)}
              </div>
            </div>
            <div className="internal-screen-card rounded-3xl border border-cyan-300/15 bg-[#051022]/88 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Client portal</p>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between rounded-xl bg-white/[0.05] px-3 py-2"><span>Request status</span><span className="text-emerald-200">Updated</span></div>
                <div className="flex justify-between rounded-xl bg-white/[0.05] px-3 py-2"><span>Documents</span><span className="text-cyan-200">Ready</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="internal-approval-card rounded-3xl border border-emerald-300/20 bg-emerald-300/8 p-4">
            <p className="text-sm font-semibold text-white">Approval card</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-amber-300/12 px-2 py-1 text-amber-200">Pending</span>
              <ArrowRight className="h-3 w-3 text-cyan-200" aria-hidden="true" />
              <span className="rounded-full bg-cyan-300/12 px-2 py-1 text-cyan-100">Reviewed</span>
              <ArrowRight className="h-3 w-3 text-cyan-200" aria-hidden="true" />
              <span className="rounded-full bg-emerald-300/12 px-2 py-1 text-emerald-200">Approved</span>
            </div>
          </div>
          <div className="internal-notification-card rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">Notification feed</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {['Update sent', 'Approval requested', 'Record changed'].map((note) => <span key={note} className="rounded-xl bg-slate-950/60 px-3 py-2 text-xs text-slate-300">{note}</span>)}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function ProblemVisual({ type }: { type: string }) {
  if (type === 'sheet') {
    return <div className="space-y-2 rounded-2xl bg-slate-950/50 p-3"><span className="rounded-full bg-amber-300/12 px-2 py-1 text-[0.65rem] font-semibold text-amber-200">Version unclear</span>{Array.from({ length: 5 }).map((_, i) => <div key={i} className="grid grid-cols-4 gap-1">{Array.from({ length: 4 }).map((__, j) => <span key={j} className="h-2 rounded-full bg-white/10" />)}</div>)}</div>;
  }
  if (type === 'visibility') {
    return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="grid grid-cols-2 gap-2">{['Moving', 'Stuck', 'Waiting', 'Unknown'].map((item, i) => <span key={item} className={cn('rounded-xl px-2 py-2 text-[0.65rem]', i === 3 ? 'bg-amber-300/12 text-amber-200' : 'bg-white/8 text-slate-300')}>{item}</span>)}</div></div>;
  }
  if (type === 'permissions') {
    return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="flex flex-wrap gap-2">{['Admin', 'Team', 'Client'].map((role, i) => <span key={role} className={cn('rounded-full border px-3 py-1 text-xs', i === 1 ? 'border-amber-300/35 bg-amber-300/10 text-amber-200' : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100')}>{role}</span>)}</div><p className="mt-3 text-xs text-amber-200">Wrong view</p></div>;
  }
  if (type === 'approvals') {
    return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="rounded-xl border border-amber-300/25 bg-amber-300/10 p-3 text-xs text-amber-100">Approve quote?</div><div className="mt-2 h-px w-1/2 border-t border-dashed border-amber-300/35" /><div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-2 text-xs text-slate-400">No record linked</div></div>;
  }
  return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="space-y-2 border-l border-dashed border-amber-300/35 pl-3">{['Created', 'Missing update', 'No record'].map((event, i) => <div key={event} className="flex items-center gap-2 text-xs text-slate-300"><span className={cn('h-2 w-2 rounded-full', i === 0 ? 'bg-cyan-300' : 'bg-amber-300')} />{event}</div>)}</div></div>;
}

function InternalToolProblemGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="When spreadsheets stop being enough." subheading="Spreadsheets are useful until they become the system everyone depends on, but nobody fully trusts." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {problems.map((problem, index) => (
            <GlassPanel key={problem.title} className={cn('internal-reveal-card p-5', index < 2 ? 'lg:col-span-3' : 'lg:col-span-2')} style={{ '--internal-delay': `${index * 90}ms` } as React.CSSProperties}>
              <div className="flex items-center gap-2 text-amber-200"><span className="internal-warning-dot h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">Leak point</span></div>
              <h3 className="mt-4 text-xl font-semibold text-white">{problem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p>
              <div className="mt-5"><ProblemVisual type={problem.visual} /></div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MiniVisual({ type }: { type: string }) {
  if (type === 'dashboard' || type === 'reports') return <div className="grid grid-cols-3 gap-1.5"><span className="h-10 rounded-lg bg-cyan-300/15" /><span className="h-10 rounded-lg bg-cyan-300/10" /><span className="h-10 rounded-lg bg-emerald-300/12" /><span className="col-span-3 h-2 rounded-full bg-cyan-300/30" /><span className="col-span-2 h-2 rounded-full bg-white/15" /></div>;
  if (type === 'portal') return <div className="space-y-2"><div className="flex justify-between rounded-lg bg-white/8 p-2 text-[0.65rem]"><span>Request</span><span className="text-emerald-200">Updated</span></div><div className="rounded-lg bg-cyan-300/10 p-2 text-[0.65rem] text-cyan-100">Documents ready</div></div>;
  if (type === 'board') return <div className="grid grid-cols-3 gap-1.5">{['New', 'Doing', 'Done'].map((label) => <div key={label} className="rounded-lg bg-white/8 p-1.5 text-[0.6rem] text-slate-300"><span>{label}</span><div className="mt-2 h-7 rounded bg-cyan-300/10" /></div>)}</div>;
  if (type === 'approval') return <div className="flex items-center gap-1 text-[0.65rem]"><span className="rounded-full bg-amber-300/12 px-2 py-1 text-amber-200">Pending</span><ArrowRight className="h-3 w-3 text-cyan-200" /><span className="rounded-full bg-emerald-300/12 px-2 py-1 text-emerald-200">Approved</span></div>;
  if (type === 'pipeline') return <div className="flex gap-1.5">{['New', 'Review', 'Sent', 'Closed'].map((item, i) => <span key={item} className={cn('h-12 flex-1 rounded-lg border p-1 text-[0.56rem]', i === 1 ? 'border-amber-300/25 bg-amber-300/10 text-amber-200' : 'border-cyan-300/15 bg-cyan-300/8 text-cyan-100')}>{item}</span>)}</div>;
  if (type === 'timeline') return <div className="space-y-1.5 border-l border-cyan-300/30 pl-3">{['Quote sent', 'Client note', 'Status changed'].map((item) => <div key={item} className="text-[0.65rem] text-slate-300"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />{item}</div>)}</div>;
  if (type === 'files') return <div className="flex items-center gap-2"><div className="rounded-lg bg-white/8 p-2 text-[0.65rem] text-slate-300">Upload.pdf</div><ArrowRight className="h-3 w-3 text-cyan-200" /><div className="rounded-lg bg-emerald-300/12 p-2 text-[0.65rem] text-emerald-200">Record</div></div>;
  if (type === 'feed') return <div className="space-y-1.5">{['Record changed', 'Owner alerted', 'Approval due'].map((item) => <div key={item} className="rounded-lg bg-white/8 px-2 py-1.5 text-[0.65rem] text-slate-300">{item}</div>)}</div>;
  return <div className="flex flex-wrap gap-1.5">{['Admin', 'Team', 'Client'].map((item) => <span key={item} className="rounded-full bg-cyan-300/10 px-2 py-1 text-[0.65rem] text-cyan-100">{item}</span>)}</div>;
}

function InternalToolBuildGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Internal tools we can build." subheading="The goal is not to build software for the sake of software. The goal is to create the screens your team actually uses to move work forward." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {internalTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <GlassPanel key={tool.title} className="internal-tool-card internal-reveal-card p-5" style={{ '--internal-delay': `${index * 70}ms` } as React.CSSProperties}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">{tool.chip}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{tool.purpose}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-3"><MiniVisual type={tool.visual} /></div>
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function RoleBasedViewVisual() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Different people. Different screens." subheading="A good internal tool does not show everyone the same thing. It gives each role the view they need to act." />
        <GlassPanel className="role-tabs-shell mt-10 p-4 md:p-6">
          <div className="role-tabs" role="tablist" aria-label="Role-based internal tool views">
            {roles.map((role, index) => (
              <input key={role.id} className="sr-only role-tab-input" type="radio" name="internal-role" id={`role-${role.id}`} defaultChecked={index === 0} />
            ))}
            <div className="role-tab-labels flex gap-2 overflow-x-auto pb-2">
              {roles.map((role) => (
                <label key={role.id} htmlFor={`role-${role.id}`} className={cn('role-tab-label min-w-fit cursor-pointer rounded-full border border-cyan-300/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition focus-within:outline focus-within:outline-2 focus-within:outline-cyan-300')}>{role.label}</label>
              ))}
            </div>
            <div className="mt-6">
              {roles.map((role) => (
                <div key={role.id} className={cn('role-panel role-panel-' + role.id)} role="tabpanel" aria-labelledby={`role-${role.id}`}>
                  <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <p className="text-system-eyebrow text-cyan-300">{role.label} screen</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{role.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{role.summary}</p>
                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {role.items.map((item) => <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"><Check className="mr-2 inline h-4 w-4 text-cyan-200" aria-hidden="true" />{item}</span>)}
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/50 p-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <p className="text-xs text-slate-500">Rapid Rise internal tool</p>
                          <h4 className="font-semibold text-white">{role.label} workspace</h4>
                        </div>
                        <span className="rounded-full bg-cyan-300/12 px-3 py-1 text-xs font-semibold text-cyan-100">Right view</span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {role.metrics.map((metric) => <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><div className="h-2 w-10 rounded-full bg-emerald-300/60" /><p className="mt-3 text-[0.68rem] text-slate-400">{metric}</p></div>)}
                      </div>
                      <div className="mt-4 space-y-2">
                        {role.items.slice(0, 4).map((item, index) => <div key={item} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-3 py-2 text-sm"><span className="text-slate-300">{item}</span><span className={cn('rounded-full px-2 py-1 text-[0.65rem] font-semibold', index === 1 ? 'bg-amber-300/12 text-amber-200' : 'bg-cyan-300/12 text-cyan-100')}>{index === 1 ? 'Needs review' : 'Visible'}</span></div>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function SystemLayerExplainer() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="The system layer behind the screens." subheading="A good internal tool is not just a dashboard. It captures information, stores it cleanly, shows the right view to the right person, and keeps the next step visible." />
        <GlassPanel className="internal-system-map mt-10 overflow-hidden p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-5">
            {systemLayer.map((zone, index) => (
              <div key={zone.title} className="internal-map-zone internal-reveal-card relative rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4" style={{ '--internal-delay': `${index * 100}ms` } as React.CSSProperties}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{zone.title}</h3>
                  <span className="rounded-full bg-cyan-300/12 px-2 py-1 text-[0.65rem] font-semibold text-cyan-100">0{index + 1}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {zone.items.map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 lg:block internal-flow-line" />
        </GlassPanel>
      </Container>
    </section>
  );
}

function ScopeListPanel() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="What can be included." subheading="The exact build depends on your workflow, roles, data, and what your team needs to see." />
        <GlassPanel className="mt-10 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white">Included in a typical internal tool build</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {included.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-3 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />{item}</div>)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Usually scoped separately</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scopedSeparately.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/6 p-3 text-sm text-slate-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300" />{item}</div>)}
              </div>
            </div>
          </div>
          <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">If the workflow is larger than a starter internal tool, we will recommend a custom quote instead of forcing a fixed scope.</p>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFitPanel() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Best fit when your team needs one place to run the work." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FitCard title="Good fit" items={goodFit} tone="cyan" />
          <FitCard title="Needs custom scoping" items={customFit} tone="amber" />
        </div>
        <GlassPanel className="mt-6 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Not sure if this needs a web app?</h3>
            <p className="mt-2 text-sm text-slate-400">Request a quote and we will recommend the cleanest system layer.</p>
          </div>
          <ProductButton href={quoteHref}>Request a Quote</ProductButton>
        </GlassPanel>
      </Container>
    </section>
  );
}

function FitCard({ title, items, tone }: { title: string; items: string[]; tone: 'cyan' | 'amber' }) {
  return (
    <GlassPanel className={cn('p-6', tone === 'cyan' ? 'border-cyan-300/25' : 'border-amber-300/20')}>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', tone === 'cyan' ? 'bg-cyan-300' : 'bg-amber-300')} />{item}</div>)}
      </div>
    </GlassPanel>
  );
}

function ExampleBuildGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Example internal tools." subheading="These are the types of practical systems that replace scattered tracking and make work visible." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exampleBuilds.map((example, index) => (
            <GlassPanel key={example.title} className="internal-reveal-card p-5" style={{ '--internal-delay': `${index * 80}ms` } as React.CSSProperties}>
              <ExampleMiniVisual type={example.visual} />
              <h3 className="mt-5 text-xl font-semibold text-white">{example.title}</h3>
              <p className="mt-3 text-sm font-semibold text-amber-100">Problem</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{example.problem}</p>
              <p className="mt-4 text-sm font-semibold text-cyan-100">Build output</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{example.output}</p>
              <div className="mt-4 flex flex-wrap gap-2">{example.stack.map((pill) => <span key={pill} className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-2 py-1 text-[0.68rem] font-semibold text-cyan-100">{pill}</span>)}</div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExampleMiniVisual({ type }: { type: string }) {
  return <div className="rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/50 p-4"><MiniVisual type={type === 'workshop' || type === 'team' ? 'board' : type === 'quote' ? 'approval' : type === 'client' ? 'portal' : type === 'files' ? 'files' : 'reports'} /></div>;
}

function InternalToolMockup() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Example internal operations dashboard." subheading="A practical internal tool should show records, ownership, status, history, and next actions clearly." />
        <GlassPanel className="internal-dashboard-mockup mt-10 overflow-hidden p-4 md:p-6">
          <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/55">
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Operations dashboard</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Records, approvals, history, and reports</h3>
              </div>
              <div className="flex flex-wrap gap-2">{['Admin', 'Team', 'Client'].map((role, i) => <span key={role} className={cn('rounded-full border px-3 py-1 text-xs font-semibold', i === 0 ? 'border-cyan-300/45 bg-cyan-300/12 text-cyan-100' : 'border-white/10 bg-white/[0.04] text-slate-400')}>{role}</span>)}</div>
            </div>
            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.75fr]">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  {['Active records', 'Waiting approval', 'Overdue actions', 'Updates sent'].map((metric, i) => <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><div className={cn('h-2 w-10 rounded-full', i === 1 ? 'bg-amber-300/70' : 'bg-cyan-300/70')} /><p className="mt-3 text-[0.68rem] text-slate-400">{metric}</p></div>)}
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="grid grid-cols-[1fr_0.6fr_0.6fr] gap-3 px-3 pb-2 text-xs uppercase tracking-[0.14em] text-slate-500"><span>Record</span><span>Owner</span><span>Status</span></div>
                  {['Client request', 'Quote review', 'Job update', 'Document upload', 'Approval needed'].map((row, i) => <div key={row} className="internal-record-row grid grid-cols-[1fr_0.6fr_0.6fr] gap-3 rounded-2xl px-3 py-3 text-sm transition hover:bg-cyan-300/8"><span className="text-slate-200">{row}</span><span className="text-slate-400">{i % 2 ? 'Manager' : 'Team'}</span><span className={cn('font-semibold', i === 4 ? 'text-amber-200' : 'text-cyan-100')}>{i === 4 ? 'Review' : 'Visible'}</span></div>)}
                </div>
              </div>
              <div className="space-y-4">
                <div className="internal-detail-panel rounded-3xl border border-cyan-300/18 bg-[#061326]/80 p-4">
                  <div className="flex items-center justify-between"><h4 className="font-semibold text-white">Active record detail</h4><span className="rounded-full bg-emerald-300/12 px-2 py-1 text-xs font-semibold text-emerald-200">Owner assigned</span></div>
                  <div className="mt-4 space-y-2 border-l border-cyan-300/25 pl-3">{['Record created', 'Document uploaded', 'Approval requested', 'Report ready'].map((event, i) => <div key={event} className="text-sm text-slate-300"><span className={cn('mr-2 inline-block h-2 w-2 rounded-full', i === 2 ? 'bg-amber-300' : 'bg-cyan-300')} />{event}</div>)}</div>
                </div>
                <div className="internal-approval-preview rounded-3xl border border-amber-300/18 bg-amber-300/8 p-4">
                  <h4 className="font-semibold text-white">Approval card</h4>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold"><span className="rounded-full bg-amber-300/12 px-2 py-1 text-amber-200">Pending approvals</span><ArrowRight className="h-3 w-3 text-cyan-200" /><span className="rounded-full bg-emerald-300/12 px-2 py-1 text-emerald-200">Approved preview</span></div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Notification feed</h4>
                  <div className="mt-3 space-y-2">{['Update sent', 'Follow-up due', 'Status visible'].map((note) => <div key={note} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{note}</div>)}</div>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function RelatedSystemModules() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="This internal tool can connect to other layers." subheading="Internal tools often become more powerful when connected to lead capture, workflow automation, workspace systems, and support flows." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {relatedModules.map((module) => (
            <Link key={module.title} href={module.href} className="group rounded-[1.5rem] border border-cyan-300/18 bg-[#040d1c]/80 p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
              <div className="mb-4 h-1 rounded-full bg-gradient-to-r from-cyan-300/80 to-transparent" />
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{module.copy}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-200">View module <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFAQAccordion() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Web app and internal tool questions." />
        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-3xl border border-cyan-300/16 bg-[#040d1c]/82 p-5 open:border-cyan-300/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                {faq.question}
                <span className="rounded-full border border-cyan-300/20 p-1 text-cyan-200 transition group-open:rotate-90"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFinalCTA() {
  return (
    <section className="pb-24 pt-16">
      <Container>
        <GlassPanel className="overflow-hidden p-5 md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-system-h2 text-white">Ready to replace scattered tracking?</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">Tell us what your team is currently tracking manually. We will recommend the cleanest internal tool, dashboard, or portal.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ProductButton href={quoteHref}>Request a Quote</ProductButton>
                <ProductButton href={workHref} variant="secondary">View Work</ProductButton>
              </div>
              <p className="mt-5 text-sm text-slate-500">Built around the workflow first. Screens come after the process is clear.</p>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4">
              <div className="grid gap-3 md:grid-cols-4">
                {['Spreadsheet chaos', 'System layer', 'Role-based dashboard', 'Control visible'].map((step, index) => <div key={step} className={cn('rounded-2xl border p-4 text-sm font-semibold', index === 0 ? 'border-amber-300/25 bg-amber-300/10 text-amber-100' : index === 3 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100')}>{step}</div>)}
              </div>
              <div className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 internal-flow-line" />
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default function WebAppsInternalToolsPage() {
  return (
    <main className="internal-tools-page relative isolate overflow-hidden">
      <ProductHero />
      <InternalToolProblemGrid />
      <InternalToolBuildGrid />
      <RoleBasedViewVisual />
      <SystemLayerExplainer />
      <ScopeListPanel />
      <BestFitPanel />
      <ExampleBuildGrid />
      <InternalToolMockup />
      <RelatedSystemModules />
      <ProductFAQAccordion />
      <ProductFinalCTA />
    </main>
  );
}
