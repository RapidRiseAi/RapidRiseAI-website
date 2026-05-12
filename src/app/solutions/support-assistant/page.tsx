import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  HelpCircle,
  Inbox,
  Mail,
  MessageCircle,
  MessagesSquare,
  Route,
  SearchCheck,
  Send,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const pricingHref = '/products/pricing';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Support Assistant | Rapid Rise AI',
  description: 'Create a support assistant that answers common questions, captures context, summarizes requests, and hands off cleaner when your team needs to respond.',
  path: '/solutions/support-assistant',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Support Assistant | Rapid Rise AI',
    description: 'Answer faster and hand off cleaner with a practical support assistant built around approved knowledge, intake questions, and human escalation rules.',
  },
};

const trustChips = ['Human handoff rules', 'Approved knowledge only', 'Support context captured', 'Clear scope before build'];

const problems = [
  {
    title: 'Repeated questions',
    copy: 'Staff answer the same questions again and again.',
    visual: 'repeat',
  },
  {
    title: 'Missing context',
    copy: 'The team receives vague messages and has to ask follow-up questions.',
    visual: 'context',
  },
  {
    title: 'Slow handoff',
    copy: 'Requests sit in the wrong place before the right person sees them.',
    visual: 'handoff',
  },
  {
    title: 'No support record',
    copy: 'Conversations happen, but nothing useful is tracked.',
    visual: 'record',
  },
  {
    title: 'Inconsistent answers',
    copy: 'Customers get different answers depending on who replies.',
    visual: 'answers',
  },
];

const capabilities = [
  {
    icon: HelpCircle,
    title: 'Answer common questions',
    value: 'Respond to approved FAQs, service details, and simple support questions.',
    chip: 'Approved answer',
    visual: 'answer',
  },
  {
    icon: ClipboardList,
    title: 'Capture customer details',
    value: 'Collect useful information before your team gets involved.',
    chip: 'Context captured',
    visual: 'capture',
  },
  {
    icon: MessagesSquare,
    title: 'Ask structured follow-up questions',
    value: 'Guide the customer to provide the context your team needs.',
    chip: 'Details requested',
    visual: 'question',
  },
  {
    icon: FileText,
    title: 'Summarize the issue',
    value: 'Turn the conversation into a cleaner summary for the team.',
    chip: 'Summary ready',
    visual: 'summary',
  },
  {
    icon: UserCheck,
    title: 'Hand off to the right person',
    value: 'Route requests based on issue type, urgency, or channel when scoped.',
    chip: 'Handoff ready',
    visual: 'handoff',
  },
  {
    icon: Inbox,
    title: 'Create a support record',
    value: 'Log key details so the request does not disappear inside chat.',
    chip: 'Logged',
    visual: 'record',
  },
  {
    icon: Send,
    title: 'Send next-step instructions',
    value: 'Tell the customer what will happen next.',
    chip: 'Next step sent',
    visual: 'next',
  },
  {
    icon: Gauge,
    title: 'Show basic reporting',
    value: 'Review repeated questions, handoffs, and support patterns when scoped.',
    chip: 'Review view',
    visual: 'report',
  },
];

const supportFlow = [
  {
    title: 'Customer asks a question',
    microcopy: 'A visitor or customer starts with a common question, support request, or enquiry.',
    tag: 'Question received',
  },
  {
    title: 'Assistant checks approved knowledge',
    microcopy: 'The assistant uses approved FAQs, service rules, and business information.',
    tag: 'Approved knowledge',
  },
  {
    title: 'Assistant answers or asks for context',
    microcopy: 'The assistant responds or collects the missing details needed for next step.',
    tag: 'Context requested',
  },
  {
    title: 'Details are summarized',
    microcopy: 'The conversation becomes a clean support summary.',
    tag: 'Summary ready',
  },
  {
    title: 'Human handoff happens when needed',
    microcopy: 'If the request needs a person, the assistant routes a cleaner handoff.',
    tag: 'Human handoff',
  },
  {
    title: 'Request is tracked or logged',
    microcopy: 'The request can be saved to a log, sheet, inbox, dashboard, or support workflow when scoped.',
    tag: 'Logged',
  },
];

const ruleZones = [
  {
    title: 'Knowledge Base',
    items: ['Approved answers', 'Business information', 'Service details', 'Pricing notes if approved', 'Process information', 'Contact rules'],
  },
  {
    title: 'Assistant',
    items: ['Asks questions', 'Gives approved answers', 'Captures details', 'Summarizes request', 'Identifies next step'],
  },
  {
    title: 'Handoff Rules',
    items: ['Issue type', 'Urgency', 'Contact capture', 'Escalation path', 'Handoff destination', 'When to stop and send to human'],
  },
  {
    title: 'Team',
    items: ['Email', 'Sheet', 'Inbox', 'Dashboard', 'Support board', 'Internal tool'],
  },
];

const channels = [
  {
    icon: MessageCircle,
    title: 'Website assistant',
    copy: 'Answer common questions and capture enquiries directly from the website.',
  },
  {
    icon: Route,
    title: 'Contact page assistant',
    copy: 'Guide users toward the right enquiry, quote request, or next step.',
  },
  {
    icon: ShieldCheck,
    title: 'Internal support assistant',
    copy: 'Help staff find information, SOPs, or process steps faster.',
  },
  {
    icon: MessagesSquare,
    title: 'WhatsApp assistant when scoped',
    copy: 'Support WhatsApp-based flows when the channel and integration are properly scoped.',
  },
  {
    icon: SearchCheck,
    title: 'Knowledge base assistant',
    copy: 'Help users search approved answers, service details, and internal guidance.',
  },
  {
    icon: Mail,
    title: 'Handoff to email, sheet, inbox, or dashboard',
    copy: 'Send cleaner summaries into the right support destination.',
  },
];

const included = [
  'Assistant conversation design',
  'FAQ or knowledge structure',
  'Intake questions',
  'Handoff summary',
  'Basic support log',
  'Website embed where suitable',
  'Reporting or review view',
  'Handover notes',
  'Testing with real scenarios',
  'Simple operating instructions',
  'Escalation or human handoff logic',
];

const customScope = [
  'Full support department replacement',
  'Unlimited knowledge base writing',
  'Complex CRM or helpdesk integrations',
  'Advanced multilingual setup unless scoped',
  'Fully autonomous high-risk decisions',
  'Complex WhatsApp setup or channel approval',
  'Large document knowledge base cleanup',
  'Ongoing monitoring unless support plan is included',
];

const goodFit = [
  'Businesses answering the same questions often',
  'Websites with repeated pre-sale questions',
  'Teams receiving vague support messages',
  'Businesses needing cleaner enquiry intake',
  'Teams that need support summaries before replying',
  'Owners who want common questions handled consistently',
  'Businesses needing a simple support log or handoff flow',
];

const needsScope = [
  'Full helpdesk replacement',
  'High-risk support decisions',
  'Complex CRM or ticketing integrations',
  'Advanced multilingual support',
  'Large knowledge base creation',
  'WhatsApp flows with complex requirements',
  'Regulated or sensitive support environments',
  '24/7 managed support operations',
];

const relatedModules = [
  {
    title: 'Lead Capture and Follow Up',
    copy: 'Send qualified enquiries into an assigned lead flow with follow-up reminders.',
    href: '/solutions/lead-capture',
  },
  {
    title: 'Workflow Automation and Integrations',
    copy: 'Route assistant handoffs into notifications, logs, dashboards, and next actions.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Smart Workspace Systems',
    copy: 'Save support details to Sheets, Drive, Gmail, Calendar, or Docs workflows when scoped.',
    href: '/solutions/google-workspace',
  },
  {
    title: 'Web Apps and Internal Tools',
    copy: 'Send support records into a portal, dashboard, tracker, or team board.',
    href: '/solutions/web-apps',
  },
  {
    title: 'Websites That Convert',
    copy: 'Place the assistant on a website to answer common questions and guide users to the right next step.',
    href: '/solutions/websites',
  },
];

const faqs = [
  {
    question: 'Will the assistant replace my staff?',
    answer: 'No. The assistant should reduce repetitive questions, collect useful context, and hand off cleaner when a person needs to respond.',
  },
  {
    question: 'Can the assistant answer customer questions?',
    answer: 'Yes, if the answers are approved and the knowledge is structured clearly. The assistant should not guess beyond the rules you approve.',
  },
  {
    question: 'Can it hand off to a person?',
    answer: 'Yes. Human handoff is an important part of a trustworthy support assistant, especially when the request needs judgement or action.',
  },
  {
    question: 'Can it live on my website?',
    answer: 'Yes, a website assistant can be included when suitable. Other channels depend on the scope and integration requirements.',
  },
  {
    question: 'Can it work on WhatsApp?',
    answer: 'Possibly, but WhatsApp flows depend on channel setup, integration requirements, and scope. We will confirm what is realistic before build.',
  },
  {
    question: 'Do I need a knowledge base first?',
    answer: 'You need approved information for the assistant to use. We can help structure FAQs, service rules, handoff rules, and intake questions.',
  },
  {
    question: 'Can it create a support record?',
    answer: 'Yes, when scoped. The assistant can log key details to a sheet, inbox, dashboard, or internal system.',
  },
  {
    question: 'What should not be automated?',
    answer: 'High-risk decisions, sensitive issues, unclear requests, and anything that needs human judgement should be escalated or handed off.',
  },
];

function ProductButton({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
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

function SectionHeader({ title, subheading, eyebrow }: { title: string; subheading?: string; eyebrow?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-system-eyebrow text-cyan-300">{eyebrow}</p> : null}
      <h2 className="mt-3 text-system-h2 text-slate-50">{title}</h2>
      {subheading ? <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subheading}</p> : null}
    </div>
  );
}

function GlassPanel({ className, children, style }: { className?: string; children: ReactNode; style?: CSSProperties }) {
  return <div style={style} className={cn('rounded-[2rem] border border-cyan-300/20 bg-[#040d1c]/80 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl', className)}>{children}</div>;
}

function ProductHero() {
  return (
    <section className="pt-24 md:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-system-eyebrow text-cyan-300">SUPPORT ASSISTANT</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-50 md:text-6xl">Answer faster and hand off cleaner.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Create a support assistant that handles common questions, captures context, and sends cleaner requests to your team.</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Built for businesses that answer the same questions often, receive vague support messages, or need a cleaner way to collect context before a human responds.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductButton href={quoteHref}>Request a Quote</ProductButton>
              <ProductButton href={pricingHref} variant="secondary">View Pricing</ProductButton>
              <ProductButton href={workHref} variant="secondary">View Work</ProductButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustChips.map((chip) => <span key={chip} className="rounded-full border border-cyan-300/20 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">{chip}</span>)}
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
    <GlassPanel className="support-product-visual relative overflow-hidden p-4 sm:p-6">
      <div className="relative z-10 rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/40 p-4">
        <div className="support-warning-chip absolute left-5 top-5 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">Needs human</div>
        <div className="flex justify-end"><span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">Clean handoff ready</span></div>
        <div className="mt-9 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="support-hero-card rounded-3xl border border-cyan-300/20 bg-[#061326]/90 p-4 shadow-[0_0_45px_rgba(14,165,255,0.18)]">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Customer chat</p>
            <div className="mt-4 space-y-2">
              {['I need help with my booking', 'What is included?', 'Can someone contact me?'].map((message) => <div key={message} className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{message}</div>)}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="support-hero-card rounded-3xl border border-cyan-300/15 bg-[#051022]/88 p-4">
              <div className="flex items-center justify-between gap-3"><p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Assistant answer</p><Bot className="h-5 w-5 text-cyan-200" aria-hidden="true" /></div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {['Approved answer', 'Next question', 'Helpful response'].map((item) => <span key={item} className="rounded-xl bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">{item}</span>)}
              </div>
            </div>
            <div className="support-hero-card rounded-3xl border border-emerald-300/15 bg-emerald-300/8 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Captured details summary</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['Name', 'Contact', 'Issue type', 'Urgency', 'Preferred next step'].map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <div className="support-hero-card rounded-3xl border border-amber-300/18 bg-amber-300/8 p-4">
            <p className="text-sm font-semibold text-white">Handoff card</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-cyan-300/12 px-2 py-1 text-cyan-100">Assigned to team</span><span className="rounded-full bg-amber-300/12 px-2 py-1 text-amber-200">Needs human review</span><span className="rounded-full bg-emerald-300/12 px-2 py-1 text-emerald-200">Summary included</span></div>
          </div>
          <div className="support-hero-card rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">Status tracking</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {['New', 'Answered', 'Context captured', 'Handed off', 'Tracked'].map((item, index) => <span key={item} className={cn('rounded-xl px-2 py-2 text-center text-[0.65rem] font-semibold', index > 1 ? 'bg-emerald-300/10 text-emerald-100' : 'bg-cyan-300/10 text-cyan-100')}>{item}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{['Approved FAQs', 'Service rules', 'Handoff rules'].map((item) => <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-semibold text-cyan-100">{item}</span>)}</div>
      </div>
    </GlassPanel>
  );
}

function ProblemVisual({ type }: { type: string }) {
  if (type === 'repeat') return <div className="space-y-2 rounded-2xl bg-slate-950/50 p-3">{['What is included?', 'What is included?', 'What is included?'].map((item, index) => <div key={`${item}-${index}`} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</div>)}<span className="inline-flex rounded-full bg-amber-300/12 px-2 py-1 text-[0.65rem] font-semibold text-amber-200">Again</span></div>;
  if (type === 'context') return <div className="rounded-2xl bg-slate-950/50 p-3"><span className="rounded-full bg-amber-300/12 px-2 py-1 text-[0.65rem] font-semibold text-amber-200">Missing details</span><div className="mt-3 grid gap-2">{['Name', 'Contact', 'Issue'].map((field) => <div key={field} className="flex justify-between rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-400"><span>{field}</span><span>Empty</span></div>)}</div></div>;
  if (type === 'handoff') return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><span className="rounded-xl bg-cyan-300/10 p-2 text-xs text-cyan-100">Assistant</span><span className="h-px w-8 border-t border-dashed border-amber-300/60" /><span className="rounded-xl bg-white/[0.05] p-2 text-xs text-slate-400">Team</span></div><p className="mt-3 text-xs text-amber-200">Stuck route</p></div>;
  if (type === 'record') return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="rounded-xl bg-white/[0.05] p-2 text-xs text-slate-300">Chat thread</div><div className="my-2 h-px w-1/2 border-t border-dashed border-amber-300/40" /><div className="rounded-xl bg-white/[0.03] p-2 text-xs text-slate-500">No log</div></div>;
  return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="grid gap-2 sm:grid-cols-2"><span className="rounded-xl bg-cyan-300/10 p-2 text-xs text-cyan-100">Answer A</span><span className="rounded-xl bg-amber-300/10 p-2 text-xs text-amber-100">Answer B</span></div><p className="mt-3 text-xs text-amber-200">Inconsistent</p></div>;
}

function SupportProblemGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Where support usually gets messy." subheading="Support does not only slow down because the team is busy. It slows down when answers, context, and handoff rules are unclear." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {problems.map((problem, index) => <GlassPanel key={problem.title} className={cn('support-reveal-card p-5', index < 2 ? 'lg:col-span-3' : 'lg:col-span-2')} style={{ '--support-delay': `${index * 90}ms` } as CSSProperties}><div className="flex items-center gap-2 text-amber-200"><span className="support-warning-dot h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">Support leak</span></div><h3 className="mt-4 text-xl font-semibold text-white">{problem.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p><div className="mt-5"><ProblemVisual type={problem.visual} /></div></GlassPanel>)}
        </div>
      </Container>
    </section>
  );
}

function CapabilityVisual({ type }: { type: string }) {
  if (type === 'answer') return <div className="rounded-2xl bg-cyan-300/10 p-3 text-xs text-cyan-100">Approved FAQ response</div>;
  if (type === 'capture') return <div className="grid gap-2">{['Name captured', 'Contact captured', 'Issue captured'].map((item) => <span key={item} className="rounded-xl bg-emerald-300/10 px-3 py-2 text-[0.68rem] text-emerald-100">{item}</span>)}</div>;
  if (type === 'handoff') return <div className="flex items-center gap-2 text-[0.68rem]"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-cyan-100">Issue type</span><ArrowRight className="h-3 w-3 text-cyan-200" aria-hidden="true" /><span className="rounded-full bg-emerald-300/10 px-2 py-1 text-emerald-100">Team</span></div>;
  if (type === 'report') return <div className="grid grid-cols-3 gap-2"><span className="h-9 rounded-lg bg-cyan-300/15" /><span className="h-9 rounded-lg bg-cyan-300/10" /><span className="h-9 rounded-lg bg-emerald-300/12" /></div>;
  return <div className="space-y-2"><div className="h-2 rounded-full bg-cyan-300/40" /><div className="h-2 w-2/3 rounded-full bg-white/15" /><div className="rounded-xl bg-white/[0.05] px-3 py-2 text-[0.68rem] text-slate-300">Support detail</div></div>;
}

function AssistantCapabilityGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="What a support assistant can do." subheading="The assistant should handle clear, repeatable support moments and hand off cleaner when the request needs a person." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return <GlassPanel key={capability.title} className="support-capability-card support-reveal-card p-5" style={{ '--support-delay': `${index * 70}ms` } as CSSProperties}><div className="flex items-center justify-between gap-3"><span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">{capability.chip}</span></div><h3 className="mt-4 text-lg font-semibold text-white">{capability.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{capability.value}</p><div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-3"><CapabilityVisual type={capability.visual} /></div></GlassPanel>;
          })}
        </div>
      </Container>
    </section>
  );
}

function SupportFlowTimeline() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="From question to clean handoff." subheading="A support assistant should make the first response cleaner, not hide when a human is needed." />
        <GlassPanel className="mt-10 p-5 md:p-7">
          <div className="relative grid gap-4 lg:grid-cols-6">
            <div className="absolute left-0 right-0 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 lg:block support-flow-line" />
            {supportFlow.map((step, index) => <div key={step.title} className="support-reveal-card relative rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-4" style={{ '--support-delay': `${index * 90}ms` } as CSSProperties}><span className={cn('relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold', step.tag === 'Human handoff' ? 'border-amber-300/35 bg-amber-300/12 text-amber-100' : 'border-cyan-300/30 bg-cyan-300/15 text-cyan-100')}>{index + 1}</span><h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{step.microcopy}</p><span className={cn('mt-4 inline-flex rounded-full px-2 py-1 text-[0.65rem] font-semibold', step.tag === 'Human handoff' ? 'bg-amber-300/12 text-amber-200' : 'bg-emerald-300/10 text-emerald-100')}>{step.tag}</span></div>)}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function KnowledgeHandoffRules() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="The assistant is only as useful as the rules behind it." subheading="A support assistant needs approved answers, clean intake questions, and clear escalation rules. Without that, it becomes another messy channel." />
        <GlassPanel className="support-rules-map mt-10 p-5 md:p-7">
          <div className="grid gap-4 lg:grid-cols-4">
            {ruleZones.map((zone, index) => <div key={zone.title} className={cn('support-reveal-card rounded-[1.5rem] border p-4', index === 1 ? 'border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_45px_rgba(56,223,255,0.12)]' : 'border-cyan-300/15 bg-slate-950/45')} style={{ '--support-delay': `${index * 100}ms` } as CSSProperties}><div className="flex items-center justify-between gap-3"><h3 className="font-semibold text-white">{zone.title}</h3><span className={cn('rounded-full px-2 py-1 text-[0.65rem] font-semibold', index === 2 ? 'bg-amber-300/12 text-amber-200' : 'bg-cyan-300/12 text-cyan-100')}>{index === 2 ? 'Human review' : `0${index + 1}`}</span></div><div className="mt-4 space-y-2">{zone.items.map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div>)}
          </div>
          <div className="mt-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 lg:block support-flow-line" />
        </GlassPanel>
      </Container>
    </section>
  );
}

function ChannelsAndIntegrations() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Where it can live." subheading="The right channel depends on your workflow, tools, and support requirements." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return <GlassPanel key={channel.title} className="support-reveal-card p-5" style={{ '--support-delay': `${index * 80}ms` } as CSSProperties}><span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200 inline-flex"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="mt-4 text-xl font-semibold text-white">{channel.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{channel.copy}</p></GlassPanel>;
          })}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4 text-center text-sm leading-6 text-slate-300">Available channels depend on scope, tools, and integration requirements.</p>
      </Container>
    </section>
  );
}

function ScopeListPanel() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="What can be included." subheading="The exact build depends on the channel, knowledge base, handoff destination, and the level of support logic required." />
        <GlassPanel className="mt-10 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-2">
            <div><h3 className="text-xl font-semibold text-white">Included in a typical Support Assistant build</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{included.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-3 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />{item}</div>)}</div></div>
            <div><h3 className="text-xl font-semibold text-white">Usually scoped separately</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{customScope.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/6 p-3 text-sm text-slate-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300" />{item}</div>)}</div></div>
          </div>
          <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">If the assistant needs complex integrations, large knowledge bases, or advanced channels, we will recommend a custom quote instead of forcing a starter scope.</p>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFitPanel() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Best fit for repeated questions and cleaner handoff." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FitCard title="Good fit" items={goodFit} tone="cyan" />
          <FitCard title="Needs custom scoping" items={needsScope} tone="amber" />
        </div>
        <GlassPanel className="mt-6 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center"><div><h3 className="text-xl font-semibold text-white">Not sure if an assistant fits your workflow?</h3><p className="mt-2 text-sm text-slate-400">Request a quote and we will recommend the cleanest assistant flow.</p></div><ProductButton href={quoteHref}>Request a Quote</ProductButton></GlassPanel>
      </Container>
    </section>
  );
}

function FitCard({ title, items, tone }: { title: string; items: string[]; tone: 'cyan' | 'amber' }) {
  return <GlassPanel className={cn('p-6', tone === 'cyan' ? 'border-cyan-300/25' : 'border-amber-300/20')}><h3 className="text-2xl font-semibold text-white">{title}</h3><div className="mt-5 space-y-3">{items.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', tone === 'cyan' ? 'bg-cyan-300' : 'bg-amber-300')} />{item}</div>)}</div></GlassPanel>;
}

function SupportAssistantMockup() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Example assistant handoff flow." subheading="A practical assistant should answer what it can, collect what matters, and hand off clearly." />
        <GlassPanel className="support-assistant-mockup mt-10 overflow-hidden p-4 md:p-6">
          <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/55">
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Support assistant flow</p><h3 className="mt-1 text-xl font-semibold text-white">Question, answer, context, handoff, log</h3></div><span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200">Handoff ready</span></div>
            <div className="grid gap-4 p-4 lg:grid-cols-[0.85fr_1fr_0.75fr]">
              <div className="support-chat-panel rounded-3xl border border-white/10 bg-white/[0.03] p-4"><h4 className="font-semibold text-white">Chat panel</h4><div className="mt-4 space-y-3"><div className="rounded-2xl bg-white/[0.06] p-3 text-sm text-slate-300"><p className="text-xs text-slate-500">Customer</p>Can you help me with my booking?</div><div className="rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-3 text-sm text-cyan-50"><p className="text-xs text-cyan-200">Assistant</p>I can help collect the details. What date, service, and contact number should the team use?</div></div><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">Approved answer</span><span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs text-amber-200">Needs human</span></div></div>
              <div className="space-y-4"><div className="support-summary-card rounded-3xl border border-emerald-300/15 bg-emerald-300/7 p-4"><h4 className="font-semibold text-white">Captured details summary</h4><div className="mt-4 grid gap-2 sm:grid-cols-2">{['Issue: Booking help', 'Urgency: Normal', 'Contact: Captured', 'Next step: Team reply'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div><div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/7 p-4"><h4 className="font-semibold text-white">Dashboard summary</h4><div className="mt-3 grid gap-3 sm:grid-cols-4">{['Questions answered', 'Handoffs ready', 'Missing details captured', 'Support log updated'].map((metric) => <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><div className="h-2 w-10 rounded-full bg-cyan-300/70" /><p className="mt-3 text-[0.68rem] text-slate-400">{metric}</p></div>)}</div></div></div>
              <div className="space-y-4"><div className="support-handoff-card rounded-3xl border border-amber-300/18 bg-amber-300/8 p-4"><h4 className="font-semibold text-white">Handoff destination</h4><div className="mt-3 space-y-2">{['Review queue', 'Assigned to team', 'Summary included'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"><h4 className="font-semibold text-white">Support log row</h4><div className="mt-3 space-y-2">{['Question received', 'Reply sent', 'Logged'].map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">Knowledge base</span><span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs text-amber-200">Escalation rule</span></div></div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function RelatedSystemModules() {
  return (
    <section className="py-20"><Container><SectionHeader title="This assistant can connect to other layers." subheading="A support assistant becomes stronger when it connects to lead capture, workflow automation, workspace systems, and internal tools." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{relatedModules.map((module) => <Link key={module.title} href={module.href} className="group rounded-[1.5rem] border border-cyan-300/18 bg-[#040d1c]/80 p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"><div className="mb-4 h-1 rounded-full bg-gradient-to-r from-cyan-300/80 to-transparent" /><h3 className="text-lg font-semibold text-white">{module.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{module.copy}</p><span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-200">View module <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}</div></Container></section>
  );
}

function ProductFAQAccordion() {
  return (
    <section className="py-20"><Container><SectionHeader title="Support assistant questions." /><div className="mx-auto mt-10 max-w-4xl space-y-3">{faqs.map((faq) => <details key={faq.question} className="group rounded-3xl border border-cyan-300/16 bg-[#040d1c]/82 p-5 open:border-cyan-300/40"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">{faq.question}<span className="rounded-full border border-cyan-300/20 p-1 text-cyan-200 transition group-open:rotate-90"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></summary><p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p></details>)}</div></Container></section>
  );
}

function ProductFinalCTA() {
  return (
    <section className="pb-24 pt-16"><Container><GlassPanel className="overflow-hidden p-5 md:p-8"><div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><h2 className="text-system-h2 text-white">Ready to clean up repeated support?</h2><p className="mt-4 text-base leading-7 text-slate-400">Tell us what customers keep asking and where your team currently handles support. We will recommend the cleanest assistant flow.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><ProductButton href={quoteHref}>Request a Quote</ProductButton><ProductButton href={pricingHref} variant="secondary">View Pricing</ProductButton><ProductButton href={workHref} variant="secondary">View Work</ProductButton></div><p className="mt-5 text-sm text-slate-500">Clear handoff rules. Human escalation where needed. No unrealistic autonomy claims.</p></div><div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4"><div className="grid gap-3 md:grid-cols-5">{['Repeated question', 'Assistant answer', 'Context captured', 'Human handoff', 'Handoff ready'].map((step, index) => <div key={step} className={cn('rounded-2xl border p-4 text-sm font-semibold', index === 0 ? 'border-amber-300/25 bg-amber-300/10 text-amber-100' : index === 4 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100')}>{step}</div>)}</div><div className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 support-flow-line" /></div></div></GlassPanel></Container></section>
  );
}

export default function SupportAssistantPage() {
  return (
    <main className="support-assistant-page relative isolate overflow-hidden">
      <ProductHero />
      <SupportProblemGrid />
      <AssistantCapabilityGrid />
      <SupportFlowTimeline />
      <KnowledgeHandoffRules />
      <ChannelsAndIntegrations />
      <ScopeListPanel />
      <BestFitPanel />
      <SupportAssistantMockup />
      <RelatedSystemModules />
      <ProductFAQAccordion />
      <ProductFinalCTA />
    </main>
  );
}
