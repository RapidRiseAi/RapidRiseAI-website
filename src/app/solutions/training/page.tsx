import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Library,
  ListChecks,
  MessageSquareText,
  PlayCircle,
  Repeat2,
  UserCheck,
  Users,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const educationHref = '/education';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Training and Enablement | Rapid Rise AI',
  description: 'Help your team use AI, automation, dashboards, SOPs, templates, and workflows properly with practical training and handover support.',
  path: '/solutions/training',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Training and Enablement | Rapid Rise AI',
    description: 'Training turns tools into daily execution. Help your team adopt systems, follow SOPs, use templates, and work with more confidence.',
  },
};

const trustChips = ['Practical examples', 'SOPs and templates', 'Team handover', 'Adoption support'];

const lessonPath = ['AI basics', 'Prompts', 'Workflows', 'Templates', 'Automations', 'Dashboards', 'SOPs'];

const trainingPaths = [
  {
    icon: BrainCircuit,
    title: 'AI for Work',
    audience: 'People and teams who need modern AI tools safely and effectively.',
    outcome: 'Better prompts, better judgement, faster daily work.',
    labels: ['Context', 'Prompt', 'Task', 'Output', 'Review'],
    cta: 'View program',
    href: '/education/ai-for-work',
    visual: 'ai',
  },
  {
    icon: Users,
    title: 'Team Enablement',
    audience: 'Businesses rolling out workflows, dashboards, automations.',
    outcome: 'Higher adoption and fewer repeated questions.',
    labels: ['Roles', 'SOPs', 'Dashboard', 'Handover', 'Adoption'],
    cta: 'Request a Quote',
    href: quoteHref,
    visual: 'team',
  },
  {
    icon: UserCheck,
    title: '1:1 Assistance',
    audience: 'Individuals needing help with specific workflows or tools.',
    outcome: 'Fast clarity and setup help.',
    labels: ['Problem', 'Setup', 'Fix', 'Next step'],
    cta: 'Contact',
    href: '/contact',
    visual: 'assist',
  },
];

const deliverables = [
  {
    icon: GraduationCap,
    title: 'Online class',
    purpose: 'Structured training session for a group or individual.',
    bestUse: 'Learning a topic with examples and live explanation.',
    visual: 'lesson',
  },
  {
    icon: MessageSquareText,
    title: '1:1 coaching',
    purpose: 'Direct help with a specific tool, workflow, or setup.',
    bestUse: 'Fast clarity and personal support.',
    visual: 'coaching',
  },
  {
    icon: Users,
    title: 'Team workshop',
    purpose: 'Practical workshop for a team adopting a system or workflow.',
    bestUse: 'Getting everyone aligned on how the workflow should run.',
    visual: 'workshop',
  },
  {
    icon: PlayCircle,
    title: 'Class recordings',
    purpose: 'Reusable training material for people who need to revisit lessons.',
    bestUse: 'Ongoing learning and onboarding.',
    visual: 'recording',
  },
  {
    icon: Library,
    title: 'Templates',
    purpose: 'Reusable prompts, forms, checklists, and workflow documents.',
    bestUse: 'Making good work repeatable.',
    visual: 'templates',
  },
  {
    icon: ListChecks,
    title: 'SOPs',
    purpose: 'Clear step-by-step instructions for how the workflow should run.',
    bestUse: 'Reducing repeated questions and mistakes.',
    visual: 'sops',
  },
  {
    icon: FileCheck2,
    title: 'Handover support',
    purpose: 'Guidance after delivery so the team knows what to own and how to use it.',
    bestUse: 'Making sure the system does not sit unused.',
    visual: 'handover',
  },
  {
    icon: Repeat2,
    title: 'Adoption check-ins',
    purpose: 'Review what is being used, what is confusing, and what should improve.',
    bestUse: 'Keeping the system alive after launch.',
    visual: 'checkin',
  },
];

const journeySteps = [
  {
    title: 'Understand AI safely',
    microcopy: 'Learn what AI can help with, where it fails, and how to use it responsibly.',
  },
  {
    title: 'Write better prompts',
    microcopy: 'Use clear context, examples, role instructions, and output formats.',
  },
  {
    title: 'Build repeatable workflows',
    microcopy: 'Turn single prompts into reliable task systems.',
  },
  {
    title: 'Use templates',
    microcopy: 'Create reusable prompt, document, and workflow templates.',
  },
  {
    title: 'Automate small tasks',
    microcopy: 'Start with low-risk automation that saves time without creating chaos.',
  },
  {
    title: 'Adopt dashboards and SOPs',
    microcopy: 'Use clear screens and instructions so work stays consistent.',
  },
  {
    title: 'Improve from feedback',
    microcopy: 'Review usage, confusion, and results so the workflow keeps improving.',
  },
];

const handoverSteps = [
  { title: 'Build delivered', items: ['System ready card', 'Launch status chip'], chip: 'Ready' },
  { title: 'Docs', items: ['Documentation card', 'Guide file', 'Process notes'], chip: 'Saved' },
  { title: 'Training', items: ['Session card', 'Recording card', 'Lesson checklist'], chip: 'Trained' },
  { title: 'Ownership', items: ['Role owner chip', 'Responsibility map', 'Access notes'], chip: 'Owned' },
  { title: 'Improvement', items: ['Feedback card', 'Usage review', 'Next improvement chip'], chip: 'Improving' },
];

const connectionColumns = [
  { title: 'Systems', items: ['Dashboards', 'Automations', 'Internal tools', 'Websites', 'Quote flows', 'Workspace systems'] },
  { title: 'Training and Enablement', items: ['Lessons', 'SOPs', 'Templates', 'Handover', 'Coaching'] },
  { title: 'Adoption outcomes', items: ['Clear ownership', 'Better usage', 'Fewer repeated questions', 'Faster execution', 'Cleaner feedback'] },
];

const goodFit = [
  'Teams adopting a new dashboard or workflow',
  'Businesses rolling out AI or automation tools',
  'People struggling with prompts and daily AI use',
  'Teams that keep asking the same workflow questions',
  'Businesses that need SOPs and handover',
  'Owners who want staff to use the system properly',
  'Individuals needing help with specific tools or workflows',
];

const customScope = [
  'Large multi-team training rollout',
  'Complex internal change management',
  'Formal certification programs',
  'Large training content library',
  'Advanced technical team training',
  'Ongoing training across many departments',
  'Custom LMS or learning platform build',
];

const relatedModules = [
  {
    title: 'Web Apps and Internal Tools',
    copy: 'Train teams to use dashboards, portals, trackers, roles, and status boards.',
    href: '/solutions/web-apps',
  },
  {
    title: 'Workflow Automation and Integrations',
    copy: 'Help teams understand what triggers the workflow and what happens next.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Smart Workspace Systems',
    copy: 'Teach staff how Gmail, Sheets, Drive, Calendar, and Docs connect into operating rules.',
    href: '/solutions/google-workspace',
  },
  {
    title: 'Websites That Convert',
    copy: 'Train owners or teams to manage enquiry flows, quote requests, and handover basics.',
    href: '/solutions/websites',
  },
  {
    title: 'Lead Capture and Follow Up',
    copy: 'Teach teams how to respond, assign, follow up, and track lead status.',
    href: '/solutions/lead-capture',
  },
];

const faqs = [
  {
    question: 'Is this only AI training?',
    answer: 'No. AI for Work is one training path, but Training and Enablement can also cover dashboards, automations, SOPs, templates, handover, and workflow adoption.',
  },
  {
    question: 'Can you train a team after building a system?',
    answer: 'Yes. Team enablement and handover can be included so the people using the system understand what to do and what happens next.',
  },
  {
    question: 'Do you provide SOPs?',
    answer: 'Yes. SOPs, templates, checklists, and handover notes can be included depending on the scope.',
  },
  {
    question: 'Can you help one person instead of a whole team?',
    answer: 'Yes. 1:1 Assistance is for individuals who need help with specific tools, workflows, prompts, setup, or execution.',
  },
  {
    question: 'Can training be recorded?',
    answer: 'Yes, class recordings or handover recordings can be included when suitable.',
  },
  {
    question: 'How does training connect to automation?',
    answer: 'Training helps the team understand what the automation does, when it runs, what to check, and how to handle exceptions.',
  },
  {
    question: 'What if my team is not technical?',
    answer: 'That is exactly why practical training matters. The goal is to explain the workflow in plain language and give the team usable steps.',
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

function SectionHeader({ eyebrow, title, subheading }: { eyebrow?: string; title: string; subheading?: string }) {
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
            <p className="text-system-eyebrow text-cyan-300">TRAINING AND ENABLEMENT</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-50 md:text-6xl">Help your team actually use the system.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Practical AI, automation, workflow, and handover training for teams that need faster execution without more confusion.</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Built for businesses that want their team to understand the tools, follow the workflow, use the dashboards, and keep the system alive after launch.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductButton href={quoteHref}>Request a Quote</ProductButton>
              <ProductButton href={educationHref} variant="secondary">View Education</ProductButton>
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
    <GlassPanel className="training-product-visual relative overflow-hidden p-4 sm:p-6">
      <div className="relative z-10 rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/40 p-4">
        <div className="training-warning-chip absolute left-5 top-5 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">Low adoption</div>
        <div className="flex justify-end">
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">Team ready</span>
        </div>
        <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="training-hero-card rounded-3xl border border-cyan-300/20 bg-[#061326]/90 p-4 shadow-[0_0_45px_rgba(14,165,255,0.18)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Lesson path</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Training dashboard</h3>
              </div>
              <BookOpenCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {lessonPath.map((lesson, index) => <span key={lesson} className={cn('rounded-xl border px-3 py-2 text-xs', index < 4 ? 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-white/[0.04] text-slate-400')}>{lesson}</span>)}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="training-progress h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="training-hero-card rounded-3xl border border-cyan-300/15 bg-[#051022]/88 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Template library</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['Reusable prompt', 'Workflow template', 'Document template', 'Checklist template'].map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</span>)}
              </div>
            </div>
            <div className="training-hero-card rounded-3xl border border-emerald-300/15 bg-emerald-300/8 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Adoption score</p>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                {['Usage improving', 'Questions reduced', 'Confidence up'].map((item) => <div key={item} className="flex justify-between rounded-xl bg-white/[0.05] px-3 py-2"><span>{item}</span><Check className="h-4 w-4 text-emerald-200" aria-hidden="true" /></div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="training-hero-card rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">SOP checklist</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {['Step 1 complete', 'Step 2 complete', 'Owner assigned', 'Handover ready'].map((item) => <span key={item} className="rounded-xl bg-emerald-300/10 px-3 py-2 text-xs text-emerald-100"><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{item}</span>)}
            </div>
          </div>
          <div className="training-hero-card rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">Handover pack</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['Documentation', 'Training recording', 'SOPs', 'Support notes'].map((item) => <span key={item} className="rounded-xl bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function AdoptionMattersPanel() {
  const before = ['System delivered', 'Team confused', 'Repeated questions', 'Low usage', 'No clear owner', 'No SOP followed'];
  const after = ['Team trained', 'SOP followed', 'Ownership clear', 'Workflow used', 'Feedback captured', 'Data improves'];

  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Systems fail when teams do not adopt them." subheading="A tool only creates value when people know when to use it, how to use it, and what happens next." />
        <GlassPanel className="mt-10 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-amber-300/18 bg-amber-300/7 p-4">
              <h3 className="text-lg font-semibold text-white">Before adoption</h3>
              <div className="mt-4 space-y-2">
                {before.map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-950/50 px-3 py-2 text-sm text-slate-300"><span className="training-warning-dot h-2 w-2 rounded-full bg-amber-300" />{item}</div>)}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-300/18 bg-cyan-300/7 p-4">
              <h3 className="text-lg font-semibold text-white">Adoption path</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {['System built', 'Team trained', 'SOP followed', 'Usage improves', 'Data improves'].map((step, index) => <div key={step} className="training-reveal-card rounded-2xl border border-cyan-300/15 bg-slate-950/45 p-3 text-center text-xs font-semibold text-cyan-100" style={{ '--training-delay': `${index * 100}ms` } as CSSProperties}>{step}</div>)}
              </div>
              <div className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 training-flow-line" />
              <p className="mt-5 text-sm leading-6 text-slate-300">Without adoption, even a good system becomes another thing people avoid. With training and SOPs, the system becomes part of daily execution.</p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-300/18 bg-emerald-300/7 p-4">
              <h3 className="text-lg font-semibold text-white">After adoption</h3>
              <div className="mt-4 space-y-2">
                {after.map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-950/50 px-3 py-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-200" aria-hidden="true" />{item}</div>)}
              </div>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function MiniPathVisual({ path }: { path: string[] }) {
  return (
    <div className="training-mini-path flex flex-wrap items-center gap-2">
      {path.map((item, index) => <span key={item} className={cn('rounded-full border px-2 py-1 text-[0.65rem] font-semibold', index === path.length - 1 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100')}>{item}</span>)}
    </div>
  );
}

function TrainingPathCards() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Training paths we can support." subheading="Choose the support level that matches the people, workflow, or tool your team needs help with." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {trainingPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <GlassPanel key={path.title} className="training-path-card training-reveal-card p-5" style={{ '--training-delay': `${index * 100}ms` } as CSSProperties}>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">Adoption path</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{path.title}</h3>
                <p className="mt-3 text-sm font-semibold text-cyan-100">Who it is for</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{path.audience}</p>
                <p className="mt-4 text-sm font-semibold text-emerald-100">Outcome</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{path.outcome}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-3"><MiniPathVisual path={path.labels} /></div>
                <Link href={path.href} className="group mt-5 inline-flex items-center text-sm font-semibold text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                  {path.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DeliverableVisual({ type }: { type: string }) {
  if (type === 'sops' || type === 'handover') return <div className="space-y-2">{['Step complete', 'Owner set', 'Ready'].map((item) => <div key={item} className="rounded-xl bg-emerald-300/10 px-3 py-2 text-[0.68rem] text-emerald-100"><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{item}</div>)}</div>;
  if (type === 'templates') return <div className="grid grid-cols-2 gap-2">{['Prompt', 'Form', 'Checklist', 'Workflow'].map((item) => <div key={item} className="rounded-xl bg-cyan-300/10 px-3 py-2 text-[0.68rem] text-cyan-100">{item}</div>)}</div>;
  if (type === 'recording') return <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/8 p-3 text-sm text-cyan-100"><PlayCircle className="mb-2 h-5 w-5" aria-hidden="true" />Replay lesson</div>;
  if (type === 'checkin') return <div className="space-y-2"><div className="h-2 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-emerald-300" /></div><div className="rounded-xl bg-white/[0.05] px-3 py-2 text-[0.68rem] text-slate-300">Feedback captured</div></div>;
  return <div className="space-y-2"><div className="h-2 rounded-full bg-cyan-300/40" /><div className="h-2 w-2/3 rounded-full bg-white/15" /><div className="rounded-xl bg-cyan-300/10 px-3 py-2 text-[0.68rem] text-cyan-100">Training step</div></div>;
}

function EnablementDeliverables() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="What training can include." subheading="Training can be delivered as live support, reusable material, handover resources, or workflow adoption guidance." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassPanel key={item.title} className="training-deliverable-card training-reveal-card p-5" style={{ '--training-delay': `${index * 70}ms` } as CSSProperties}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">Useful</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.purpose}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Best use case</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.bestUse}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-3"><DeliverableVisual type={item.visual} /></div>
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function LearningJourneyRoadmap() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="From understanding to execution." subheading="Training should move people from basic understanding to repeatable daily use." />
        <GlassPanel className="mt-10 p-5 md:p-7">
          <div className="relative grid gap-4 lg:grid-cols-7">
            <div className="absolute left-0 right-0 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 lg:block training-flow-line" />
            {journeySteps.map((step, index) => <LearningJourneyStep key={step.title} step={step} index={index} />)}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function LearningJourneyStep({ step, index }: { step: { title: string; microcopy: string }; index: number }) {
  return (
    <div className="training-reveal-card relative rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-4" style={{ '--training-delay': `${index * 90}ms` } as CSSProperties}>
      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/15 text-sm font-bold text-cyan-100">{index + 1}</span>
      <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{step.microcopy}</p>
    </div>
  );
}

function HandoverSystemFlow() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Handover that helps the system survive." subheading="A system should not live only in the builder’s head. Your team needs clear instructions, ownership, and a way to keep improving." />
        <GlassPanel className="training-handover-map mt-10 p-5 md:p-7">
          <div className="grid gap-4 lg:grid-cols-5">
            {handoverSteps.map((step, index) => (
              <div key={step.title} className="training-reveal-card rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4" style={{ '--training-delay': `${index * 100}ms` } as CSSProperties}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">{step.chip}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {step.items.map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 lg:block training-flow-line" />
        </GlassPanel>
      </Container>
    </section>
  );
}

function TrainingSystemsConnection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Training connects directly to the systems we build." subheading="Enablement works best when it is tied to the actual workflow, dashboard, automation, or SOP your team uses." />
        <GlassPanel className="training-connection-map mt-10 p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr_1fr]">
            {connectionColumns.map((column, index) => (
              <div key={column.title} className={cn('training-reveal-card rounded-[1.5rem] border p-5', index === 1 ? 'border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_45px_rgba(56,223,255,0.12)]' : index === 2 ? 'border-emerald-300/20 bg-emerald-300/7' : 'border-cyan-300/15 bg-slate-950/45')} style={{ '--training-delay': `${index * 120}ms` } as CSSProperties}>
                <h3 className="text-xl font-semibold text-white">{column.title}</h3>
                <div className="mt-5 grid gap-2">
                  {column.items.map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

function BestFitPanel() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Best fit when people need to use the tools properly." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FitCard title="Good fit" items={goodFit} tone="cyan" />
          <FitCard title="Needs custom scoping" items={customScope} tone="amber" />
        </div>
        <GlassPanel className="mt-6 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Not sure what training path fits?</h3>
            <p className="mt-2 text-sm text-slate-400">Request a quote and we will recommend the cleanest enablement plan.</p>
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

function TrainingDashboardMockup() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Example adoption dashboard." subheading="A simple training system can show lessons, SOPs, progress, and handover resources in one place." />
        <GlassPanel className="training-dashboard-mockup mt-10 overflow-hidden p-4 md:p-6">
          <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/55">
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Adoption dashboard</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Lessons, SOPs, templates, and handover</h3>
              </div>
              <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200">Adoption improving</span>
            </div>
            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.75fr]">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  {['Lessons complete', 'SOPs ready', 'Templates available', 'Questions reduced'].map((metric, index) => <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><div className={cn('h-2 rounded-full', index === 3 ? 'w-8 bg-emerald-300/70' : 'w-10 bg-cyan-300/70')} /><p className="mt-3 text-[0.68rem] text-slate-400">{metric}</p></div>)}
                </div>
                <div className="training-lesson-path rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3"><h4 className="font-semibold text-white">AI for Work</h4><span className="rounded-full bg-cyan-300/12 px-2 py-1 text-xs text-cyan-100">Next lesson</span></div>
                  <div className="mt-4 grid gap-2 md:grid-cols-4">
                    {['Prompt template', 'SOP checklist', 'Workflow map', 'Dashboard use'].map((item, index) => <div key={item} className={cn('rounded-2xl border p-3 text-sm', index === 0 ? 'border-cyan-300/35 bg-cyan-300/12 text-cyan-100' : 'border-white/10 bg-white/[0.04] text-slate-300')}>{item}</div>)}
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="training-progress h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" /></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="training-sop-card rounded-3xl border border-emerald-300/15 bg-emerald-300/7 p-4">
                    <h4 className="font-semibold text-white">SOP checklist</h4>
                    <div className="mt-3 space-y-2">{['Workflow steps', 'Owner assigned', 'Handover ready'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-emerald-100"><CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />{item}</div>)}</div>
                  </div>
                  <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/7 p-4">
                    <h4 className="font-semibold text-white">Template library</h4>
                    <div className="mt-3 grid grid-cols-2 gap-2">{['Prompt', 'Checklist', 'Form', 'Doc'].map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-cyan-100">{item}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="training-progress-card rounded-3xl border border-cyan-300/18 bg-[#061326]/80 p-4">
                  <h4 className="font-semibold text-white">Team progress</h4>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="training-progress h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" /></div>
                  <p className="mt-3 text-sm text-slate-400">Active users are moving through lessons and SOPs.</p>
                </div>
                <div className="training-handover-card rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-4">
                  <h4 className="font-semibold text-white">Handover pack</h4>
                  <div className="mt-3 space-y-2">{['Documentation saved', 'Recording linked', 'Support notes ready'].map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Feedback notes</h4>
                  <div className="mt-3 space-y-2">{['Question captured', 'Template updated', 'Next lesson set'].map((note) => <div key={note} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{note}</div>)}</div>
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
        <SectionHeader title="Training can support every system layer." subheading="Training is often added after a system is built so the team knows how to use it properly." />
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
        <SectionHeader title="Training and enablement questions." />
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
              <h2 className="text-system-h2 text-white">Ready to train your team properly?</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">Tell us what tools, workflows, or systems your team needs help adopting. We will recommend the cleanest training path.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ProductButton href={quoteHref}>Request a Quote</ProductButton>
                <ProductButton href={educationHref} variant="secondary">View Education</ProductButton>
              </div>
              <p className="mt-5 text-sm text-slate-500">Practical examples. Clear SOPs. No unnecessary complexity.</p>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4">
              <div className="grid gap-3 md:grid-cols-4">
                {['System built', 'Training path', 'SOP followed', 'Team ready'].map((step, index) => <div key={step} className={cn('rounded-2xl border p-4 text-sm font-semibold', index === 3 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100')}>{step}</div>)}
              </div>
              <div className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 training-flow-line" />
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default function TrainingEnablementPage() {
  return (
    <main className="training-enablement-page relative isolate overflow-hidden">
      <ProductHero />
      <AdoptionMattersPanel />
      <TrainingPathCards />
      <EnablementDeliverables />
      <LearningJourneyRoadmap />
      <HandoverSystemFlow />
      <TrainingSystemsConnection />
      <BestFitPanel />
      <TrainingDashboardMockup />
      <RelatedSystemModules />
      <ProductFAQAccordion />
      <ProductFinalCTA />
    </main>
  );
}
