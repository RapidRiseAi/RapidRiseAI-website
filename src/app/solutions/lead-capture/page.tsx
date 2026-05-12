import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Gauge,
  Inbox,
  Mail,
  Route,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Lead Capture and Follow Up | Rapid Rise AI',
  description: 'Capture enquiries, assign owners, schedule follow-up, and track lead status with a practical lead capture system.',
  path: '/solutions/lead-capture',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Lead Capture and Follow Up | Rapid Rise AI',
    description: 'Turn scattered enquiries into tracked opportunities with a practical lead capture and follow-up system.',
  },
};

const trustChips = ['Response within 24 hours', 'Clear scope before build', 'Built around your current tools'];

const problems = [
  {
    title: 'Slow replies',
    copy: 'New enquiries wait too long before someone responds.',
    visual: 'waiting',
  },
  {
    title: 'No clear owner',
    copy: 'Everyone sees the lead, but nobody is clearly responsible.',
    visual: 'owner',
  },
  {
    title: 'Forgotten follow-ups',
    copy: 'The lead goes cold because the next step depends on memory.',
    visual: 'missed',
  },
  {
    title: 'No lead visibility',
    copy: 'There is no simple view of what is new, pending, followed up, or closed.',
    visual: 'dashboard',
  },
];

const outputs = [
  {
    icon: Inbox,
    title: 'Lead intake flow',
    value: 'Collect the request before it disappears in chat, email, or a form inbox.',
    chip: 'Captured',
  },
  {
    icon: Mail,
    title: 'Auto-confirmation message',
    value: 'Let the customer know their enquiry was received.',
    chip: 'Reply sent',
  },
  {
    icon: UserCheck,
    title: 'Owner assignment',
    value: 'Make one person responsible for the next step.',
    chip: 'Owner set',
  },
  {
    icon: Bell,
    title: 'Follow-up reminders',
    value: 'Create a reminder before the lead goes cold.',
    chip: 'Due visible',
  },
  {
    icon: ClipboardList,
    title: 'Lead status tracking',
    value: 'See what is new, assigned, followed up, quoted, won, or lost.',
    chip: 'Status live',
  },
  {
    icon: Gauge,
    title: 'Basic report or summary view',
    value: 'Understand where leads are coming from and what still needs attention.',
    chip: 'Reported',
  },
];

const timeline = [
  {
    title: 'Enquiry arrives',
    microcopy: 'A lead comes through your website, WhatsApp, email, or form.',
    tags: ['Website', 'WhatsApp', 'Email', 'Form'],
  },
  {
    title: 'System captures it',
    microcopy: 'The lead details are saved before they disappear in a chat or inbox.',
    tags: ['Saved', 'Source tagged'],
  },
  {
    title: 'Owner gets assigned',
    microcopy: 'The right person is responsible for the next step.',
    tags: ['Owner set', 'Next action'],
  },
  {
    title: 'Follow-up is scheduled',
    microcopy: 'The system creates a reminder so the lead does not go cold.',
    tags: ['Reminder', 'Due date'],
  },
  {
    title: 'Status becomes visible',
    microcopy: 'You can see what is new, waiting, followed up, won, or lost.',
    tags: ['Dashboard', 'Pipeline'],
  },
];

const included = [
  'Lead capture point or intake flow',
  'Auto-confirmation message',
  'Owner assignment',
  'Follow-up reminder',
  'Basic lead status tracking',
  'Summary view or simple dashboard',
  'Optional Google Sheets, Gmail, WhatsApp, or form connection',
  'Handover notes',
];

const customScope = [
  'Full CRM replacement',
  'Complex multi-team sales process',
  'Advanced reporting suite',
  'Large data migration',
  'Complex call center logic',
  'Deep third-party CRM integration',
  'Paid ad campaign management',
  'Ongoing support unless support plan is included',
];

const fitPanels = [
  {
    title: 'Good fit',
    tone: 'cyan',
    items: [
      'Service businesses receiving website enquiries',
      'Businesses using WhatsApp or email for leads',
      'Teams that forget follow-ups',
      'Owners who need a simple lead status view',
      'Businesses not ready for a full CRM',
      'Teams that want one clear first step after every enquiry',
    ],
  },
  {
    title: 'Needs custom scoping',
    tone: 'amber',
    items: [
      'Enterprise CRM replacement',
      'Full sales department restructure',
      'Complex call center logic',
      'Multi-branch lead routing',
      'Advanced analytics',
      'High-volume integrations with strict compliance requirements',
    ],
  },
];

const summaryCards = [
  { label: 'New leads', value: 'New', tone: 'cyan' },
  { label: 'Follow-ups due', value: 'Due today', tone: 'amber' },
  { label: 'Quotes pending', value: 'Pending', tone: 'blue' },
  { label: 'Response needed', value: 'Needs owner', tone: 'amber' },
];

const leadRows = [
  { name: 'Website quote request', source: 'Website', owner: 'Aisha', status: 'New', next: 'Assign first call', tone: 'cyan' },
  { name: 'WhatsApp service enquiry', source: 'WhatsApp', owner: 'Marco', status: 'Follow-up set', next: 'Reminder 10:30', tone: 'green' },
  { name: 'Email pricing question', source: 'Email', owner: 'Priya', status: 'Quote pending', next: 'Send proposal', tone: 'blue' },
];

const pipelineLabels = ['New', 'Assigned', 'Follow-up set', 'Quote pending', 'Won', 'Lost'];

const relatedModules = [
  {
    title: 'Quote and Document Generator',
    copy: 'Turn captured lead details into quote or proposal steps.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Custom Dashboard Starter',
    copy: 'Track lead volume, follow-up status, and conversion movement.',
    href: '/solutions/web-apps',
  },
  {
    title: 'Websites That Convert',
    copy: 'Connect the website CTA and form directly into lead capture.',
    href: '/solutions/websites',
  },
  {
    title: 'Support Assistant Starter',
    copy: 'Capture repeated questions and hand off cleaner support requests.',
    href: '/solutions/support-assistant',
  },
];

const faqs = [
  {
    question: 'Do I need a full CRM for this?',
    answer: 'Not always. Many businesses first need a simple lead capture and follow-up layer before investing in a full CRM.',
  },
  {
    question: 'Can this work with WhatsApp or email?',
    answer: 'Yes, depending on your current setup and what needs to happen after the enquiry arrives. We will confirm what is possible during scope.',
  },
  {
    question: 'Can the system send automatic replies?',
    answer: 'Yes, auto-confirmation can be included when it fits the workflow and channel.',
  },
  {
    question: 'Will this replace my sales team?',
    answer: 'No. The system supports the team by capturing the lead, assigning ownership, and making follow-up visible.',
  },
  {
    question: 'Can this connect to a dashboard?',
    answer: 'Yes. A simple dashboard or summary view can show new leads, follow-ups, quote status, and other useful signals.',
  },
  {
    question: 'What if my lead process is complex?',
    answer: 'If the workflow has multiple teams, advanced routing, or CRM requirements, we will recommend a custom quoted build instead of forcing a starter scope.',
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

function SectionHeader({ eyebrow, title, subheading, centered = false }: { eyebrow?: string; title: string; subheading?: string; centered?: boolean }) {
  return (
    <div className={cn('mb-8 max-w-3xl', centered && 'mx-auto text-center')}>
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p> : null}
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
      <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100">LEAD CAPTURE SYSTEM</p>
          <h1 className="max-w-4xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-50 md:text-7xl">Turn enquiries into tracked opportunities.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Capture website, WhatsApp, email, and form enquiries, assign an owner, and schedule follow-up before leads go cold.</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">Built for businesses that receive leads from multiple places but need a cleaner way to respond, assign, follow up, and track status.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ProductButton href={quoteHref}>Request a Quote</ProductButton>
            <ProductButton href={workHref} variant="secondary">View Work</ProductButton>
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
    <GlassPanel className="lead-product-hero-visual relative overflow-hidden p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,223,255,0.12),transparent_34%)]" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-[#030914]/80 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Lead flow live</p>
            <p className="mt-1 text-sm text-slate-400">Intake, ownership, follow-up, status</p>
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Follow-up set</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.75fr_1fr_0.95fr]">
          <div className="space-y-2">
            {['Website', 'WhatsApp', 'Email', 'Form'].map((source, index) => (
              <div key={source} className="hero-source-card rounded-2xl border border-amber-300/20 bg-amber-300/[0.045] p-3" style={{ animationDelay: `${index * 120}ms` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-100">{source}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,165,36,0.65)]" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Unassigned enquiry</p>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center py-4">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 220" aria-hidden="true">
              <path className="lead-route-line" d="M18 45 C90 45 82 110 132 110" />
              <path className="lead-route-line line-delay-1" d="M18 165 C90 165 82 110 132 110" />
              <path className="lead-route-line line-delay-2" d="M168 110 C210 110 218 62 282 62" />
              <path className="lead-route-line line-delay-3" d="M168 110 C210 110 218 158 282 158" />
            </svg>
            <div className="relative w-full max-w-[230px] rounded-[1.4rem] border border-cyan-300/30 bg-[rgba(5,16,34,0.94)] p-4 shadow-[0_0_48px_rgba(14,165,255,0.18)]">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200"><Inbox className="h-4 w-4" /></span>
                <div>
                  <p className="text-sm font-bold text-slate-50">New lead captured</p>
                  <p className="text-xs text-slate-400">Source identified</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Contact details saved</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Confirmation sent</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Owner assigned</div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <MiniSystemCard title="Auto reply" copy="Customer knows request was received" chip="Sent" tone="cyan" />
            <MiniSystemCard title="Owner assignment" copy="Next action clear for the team" chip="Assigned" tone="blue" />
            <MiniSystemCard title="Follow-up reminder" copy="Due date visible before it goes cold" chip="Ready" tone="green" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Dashboard</p>
              <div className="flex flex-wrap gap-1.5">
                {['New', 'Assigned', 'Follow-up set', 'Quote pending', 'Won / Lost'].map((label) => (
                  <span key={label} className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.07] px-2 py-1 text-[11px] text-cyan-100">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function MiniSystemCard({ title, copy, chip, tone }: { title: string; copy: string; chip: string; tone: 'cyan' | 'blue' | 'green' }) {
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

function ProblemVisual({ type }: { type: string }) {
  if (type === 'owner') {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3"><div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-3 text-sm text-slate-200">New enquiry</div><div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500"><span className="rounded-full border border-white/10 py-1">Sales</span><span className="rounded-full border border-white/10 py-1">Admin</span><span className="rounded-full border border-white/10 py-1">Owner</span></div></div>;
  }
  if (type === 'missed') {
    return <div className="mt-5 rounded-2xl border border-amber-300/18 bg-[#030914]/70 p-3"><div className="flex items-center justify-between"><Clock3 className="h-5 w-5 text-amber-300" /><span className="rounded-full bg-amber-300/12 px-2 py-1 text-xs text-amber-200">Missed</span></div><p className="mt-4 text-sm text-slate-300">Follow-up reminder</p><div className="mt-3 h-1.5 rounded-full bg-amber-300/20"><div className="h-full w-2/3 rounded-full bg-amber-300/70" /></div></div>;
  }
  if (type === 'dashboard') {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-[#030914]/70 p-3"><div className="grid grid-cols-2 gap-2">{['New', 'Pending', 'Followed', 'Closed'].map((item) => <span key={item} className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2 text-xs text-slate-500">{item}</span>)}</div><div className="mt-3 h-12 rounded-xl border border-dashed border-amber-300/20" /></div>;
  }
  return <div className="mt-5 rounded-2xl border border-amber-300/18 bg-[#030914]/70 p-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-200">Incoming lead</span><span className="rounded-full bg-amber-300/12 px-2 py-1 text-xs text-amber-200">Waiting</span></div><div className="mt-3 flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-300 lead-warning-dot" /><div className="h-px flex-1 border-t border-dashed border-amber-300/30" /></div></div>;
}

function LeadLeakProblemGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Where leads usually leak." subheading="Most leads are not lost because people do not care. They are lost because the process is manual, delayed, or unclear." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problems.map((problem, index) => (
            <GlassPanel key={problem.title} className="lead-reveal-card p-5" style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties}>
              <p className="text-lg font-semibold text-slate-50">{problem.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p>
              <ProblemVisual type={problem.visual} />
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LeadCaptureOutput() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="What the system gives you." subheading="A simple lead operating layer that makes every enquiry easier to capture, route, follow up, and track." />
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {outputs.map((output) => {
              const Icon = output.icon;
              return (
                <GlassPanel key={output.title} className="group p-5 transition hover:-translate-y-1 hover:border-cyan-200/40">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-xs font-semibold text-cyan-100">{output.chip}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-50">{output.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{output.value}</p>
                  <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(56,223,255,0.7),transparent)]" />
                </GlassPanel>
              );
            })}
          </div>
          <SystemOutputBoard />
        </div>
      </Container>
    </section>
  );
}

function SystemOutputBoard() {
  const stages = ['Captured', 'Assigned', 'Follow-up set', 'Status visible', 'Reported'];
  return (
    <GlassPanel className="group relative overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,255,0.14),transparent_42%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">System board</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-50">Lead flow live</h3>
          </div>
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">Ready</span>
        </div>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div key={stage} className="relative flex items-center gap-3 rounded-2xl border border-cyan-300/14 bg-white/[0.035] p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-bold text-cyan-100">{index + 1}</span>
              <span className="text-sm font-semibold text-slate-100">{stage}</span>
              {index < stages.length - 1 ? <span className="ml-auto h-px w-10 bg-cyan-300/35" /> : <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-300" />}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#020711]/60 p-4">
          <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Dashboard summary</span><span className="text-cyan-100">Source, status, next action</span></div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded-xl bg-cyan-300/10 py-2 text-cyan-100">New</span><span className="rounded-xl bg-emerald-300/10 py-2 text-emerald-100">Ready</span><span className="rounded-xl bg-blue-300/10 py-2 text-blue-100">Report</span></div>
        </div>
      </div>
    </GlassPanel>
  );
}

function LeadFlowTimeline() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="How the lead flow works." subheading="The system does not replace your sales process. It makes the first response, ownership, and follow-up easier to control." />
        <GlassPanel className="relative overflow-hidden p-5 md:p-6">
          <div className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-cyan-300/18 lg:block" />
          <div className="lead-timeline-line absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-[linear-gradient(90deg,#38DFFF,#0EA5FF)] lg:block" />
          <div className="grid gap-4 lg:grid-cols-5">
            {timeline.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-[#030914]/72 p-4">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/28 bg-cyan-300/10 text-sm font-bold text-cyan-100 shadow-[0_0_24px_rgba(14,165,255,0.18)]">{index + 1}</div>
                <h3 className="text-base font-bold text-slate-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.microcopy}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => <span key={tag} className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.07] px-2 py-1 text-[11px] text-cyan-100">{tag}</span>)}
                </div>
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
        <SectionHeader title="What can be included." subheading="The exact setup depends on your current tools, lead sources, and workflow. The goal is to keep the first version clear and useful." />
        <GlassPanel className="p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <ScopeListPanel title="Included in a typical lead capture build" items={included} tone="cyan" />
            <ScopeListPanel title="Usually scoped separately" items={customScope} tone="amber" />
          </div>
          <p className="mt-5 rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.06] p-4 text-sm leading-6 text-slate-300">If the workflow is bigger than a starter system, we will recommend a custom quote instead of forcing a fixed package.</p>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFitPanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Best fit for businesses that need faster lead handling." />
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
            <p className="text-sm font-semibold text-cyan-100">Not sure if this fits?</p>
            <p className="mt-1 text-sm text-slate-400">Request a quote and we will recommend the cleanest next step.</p>
          </div>
          <ProductButton href={quoteHref}>Request a Quote</ProductButton>
        </GlassPanel>
      </Container>
    </section>
  );
}

function LeadBoardMockup() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Example lead follow-up board." subheading="A simple board can show what arrived, who owns it, and what needs to happen next." />
        <GlassPanel className="overflow-hidden p-4 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Lead board</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-50">Follow-up control room</h3>
            </div>
            <Link href={quoteHref} className="group inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/60">Scope this flow <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {summaryCards.map((card) => (
                <div key={card.label} className="group rounded-2xl border border-white/10 bg-[#030914]/72 p-4 transition hover:border-cyan-300/38 hover:bg-cyan-300/[0.06]">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-lg font-bold text-slate-50">{card.value}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/8"><div className={cn('h-full rounded-full transition-all group-hover:w-full', card.tone === 'amber' ? 'w-2/3 bg-amber-300' : 'w-1/2 bg-cyan-300')} /></div>
                </div>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#020711]/64 p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {pipelineLabels.map((label) => <span key={label} className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.055] px-3 py-1 text-xs font-semibold text-slate-300">{label}</span>)}
              </div>
              <div className="space-y-3">
                {leadRows.map((lead) => (
                  <div key={lead.name} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/42 hover:bg-cyan-300/[0.06]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-50">{lead.name}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-cyan-100">{lead.source}</span><span className="rounded-full bg-emerald-300/10 px-2 py-1 text-emerald-100">Auto reply sent</span></div>
                      </div>
                      <span className={cn('rounded-full border px-3 py-1 text-xs font-bold', lead.tone === 'green' ? 'border-emerald-300/24 bg-emerald-300/10 text-emerald-200' : 'border-cyan-300/24 bg-cyan-300/10 text-cyan-100')}>{lead.status}</span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                      <p className="rounded-xl border border-white/10 bg-[#020711]/50 px-3 py-2">Owner assigned: <span className="text-slate-100 group-hover:text-cyan-100">{lead.owner}</span></p>
                      <p className="rounded-xl border border-white/10 bg-[#020711]/50 px-3 py-2">Next action: <span className="text-slate-100 group-hover:text-emerald-100">{lead.next}</span></p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.045] p-3 text-sm text-slate-300">Report row: lead source, status, owner, next step, and close result stay visible.</div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function RelatedSystemModules() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="This system can connect to other layers." subheading="Lead capture is often the first layer. From there, the system can connect into quotes, dashboards, websites, and support workflows." />
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
        <SectionHeader title="Lead capture questions." />
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
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-[-0.04em] text-slate-50 md:text-6xl">Ready to stop losing leads?</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Tell us where your enquiries come from and what currently happens after they arrive. We will recommend the cleanest lead capture flow.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ProductButton href={quoteHref}>Request a Quote</ProductButton><ProductButton href={workHref} variant="secondary">View Work</ProductButton></div>
              <p className="mt-5 text-sm text-slate-400">Response within 24 hours. Clear scope before build. No pressure.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-[#030914]/78 p-4">
              <div className="grid gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4"><p className="text-sm font-semibold text-slate-100">Manual enquiry</p><p className="mt-1 text-xs text-slate-500">Messages, inboxes, memory</p></div>
                <div className="flex items-center gap-3"><div className="h-px flex-1 bg-cyan-300/45" /><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Lead capture system</span><div className="h-px flex-1 bg-cyan-300/45" /></div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-slate-100">Clean lead dashboard</p><p className="mt-1 text-xs text-slate-500">Owner, reminder, status</p></div><span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-bold text-emerald-200">Next step visible</span></div></div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default function LeadCapturePage() {
  return (
    <main className="lead-capture-page relative overflow-hidden">
      <ProductHero />
      <LeadLeakProblemGrid />
      <LeadCaptureOutput />
      <LeadFlowTimeline />
      <IncludedScopePanel />
      <BestFitPanel />
      <LeadBoardMockup />
      <RelatedSystemModules />
      <ProductFAQAccordion />
      <ProductFinalCTA />
    </main>
  );
}
