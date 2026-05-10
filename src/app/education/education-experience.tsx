import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  Headphones,
  Library,
  MonitorCheck,
  PlayCircle,
  RefreshCw,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ProgramVisual = 'ai-learning-path' | 'team-enablement' | 'one-to-one';
type FormatIcon = 'online' | 'coaching' | 'workshop' | 'recordings' | 'templates' | 'sops' | 'handover';

type Program = {
  id: string;
  title: string;
  who: string;
  outcome: string;
  cta: string;
  href: string;
  visual: ProgramVisual;
};

type JourneyStep = {
  id: string;
  step: string;
  title: string;
  microcopy: string;
};

type TrainingFormat = {
  id: string;
  name: string;
  purpose: string;
  bestFor: string;
  icon: FormatIcon;
};

const programs: Program[] = [
  {
    id: 'ai-for-work',
    title: 'AI for Work',
    who: 'People and teams who need modern AI tools safely and effectively.',
    outcome: 'Better prompts, better judgement, faster daily work.',
    cta: 'View program',
    href: '/education/ai-for-work',
    visual: 'ai-learning-path',
  },
  {
    id: 'team-enablement',
    title: 'Team Enablement',
    who: 'Businesses rolling out workflows, dashboards, automations.',
    outcome: 'Higher adoption and fewer repeated questions.',
    cta: 'Request a Quote',
    href: '/quote?service=team-enablement',
    visual: 'team-enablement',
  },
  {
    id: 'one-to-one-assistance',
    title: '1:1 Assistance',
    who: 'Individuals needing help with specific workflows/tools.',
    outcome: 'Fast clarity and setup help.',
    cta: 'Contact',
    href: '/contact?service=one-to-one-assistance',
    visual: 'one-to-one',
  },
];

const learningJourney: JourneyStep[] = [
  {
    id: 'understand-ai',
    step: '01',
    title: 'Understand AI safely',
    microcopy: 'Learn what AI can help with, where it fails, and how to use it responsibly.',
  },
  {
    id: 'better-prompts',
    step: '02',
    title: 'Write better prompts',
    microcopy: 'Use clear context, examples, role instructions, and output formats.',
  },
  {
    id: 'repeatable-workflows',
    step: '03',
    title: 'Build repeatable workflows',
    microcopy: 'Turn one-off prompting into reliable task systems.',
  },
  {
    id: 'use-templates',
    step: '04',
    title: 'Use templates',
    microcopy: 'Create reusable prompt, document, and workflow templates.',
  },
  {
    id: 'automate-small-tasks',
    step: '05',
    title: 'Automate small tasks',
    microcopy: 'Start with low-risk automation that saves time without creating chaos.',
  },
  {
    id: 'adopt-dashboards-sops',
    step: '06',
    title: 'Adopt dashboards and SOPs',
    microcopy: 'Use clear screens and instructions so work stays consistent.',
  },
  {
    id: 'improve-feedback',
    step: '07',
    title: 'Improve from feedback',
    microcopy: 'Review usage, confusion, and results so the workflow keeps improving.',
  },
];

const trainingFormats: TrainingFormat[] = [
  {
    id: 'online-class',
    name: 'Online class',
    purpose: 'Structured training session for groups or individuals.',
    bestFor: 'Learning a topic with examples and live explanation.',
    icon: 'online',
  },
  {
    id: 'one-to-one-coaching',
    name: '1:1 coaching',
    purpose: 'Direct help with a specific tool, workflow, or setup.',
    bestFor: 'Fast clarity and personal support.',
    icon: 'coaching',
  },
  {
    id: 'team-workshop',
    name: 'Team workshop',
    purpose: 'Practical workshop for a team adopting a system or workflow.',
    bestFor: 'Getting everyone aligned.',
    icon: 'workshop',
  },
  {
    id: 'class-recordings',
    name: 'Class recordings',
    purpose: 'Reusable training material for people who need to revisit lessons.',
    bestFor: 'Ongoing learning and onboarding.',
    icon: 'recordings',
  },
  {
    id: 'templates',
    name: 'Templates',
    purpose: 'Reusable prompts, forms, checklists, and workflow documents.',
    bestFor: 'Making good work repeatable.',
    icon: 'templates',
  },
  {
    id: 'sops',
    name: 'SOPs',
    purpose: 'Clear step-by-step instructions for how the workflow should run.',
    bestFor: 'Reducing repeated questions and mistakes.',
    icon: 'sops',
  },
  {
    id: 'handover-support',
    name: 'Handover support',
    purpose: 'Guidance after delivery so the team knows what to own and how to use it.',
    bestFor: 'Making sure the system does not sit unused.',
    icon: 'handover',
  },
];

const adoptionStages = ['System built', 'Team trained', 'SOP followed', 'Usage improves', 'Data improves'];

const quoteHref = '/quote?service=education';
const contactHref = '/contact?service=education';

export function EducationExperience() {
  return (
    <main className="education-command-shell overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <EducationHero />
      <EducationProgramCards />
      <LearningJourney />
      <TrainingFormats />
      <AdoptionMatters />
      <EducationCTA />
    </main>
  );
}

function SectionHeader({ eyebrow, title, subtitle, centered = false }: { eyebrow: string; title: string; subtitle: string; centered?: boolean }) {
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">{eyebrow}</p>
      <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] text-[#F8FAFC] md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#94A3B8] md:text-lg">{subtitle}</p>
    </div>
  );
}

function EducationButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020711] max-sm:w-full',
        variant === 'primary' && 'bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] text-[#020711] shadow-[0_0_30px_rgba(14,165,255,0.28)] hover:brightness-110',
        variant === 'secondary' && 'border border-[#50D2FF33] bg-white/[0.04] text-[#F8FAFC] hover:border-[#38DFFF99] hover:bg-[#0EA5FF1A]',
        variant === 'ghost' && 'text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F8FAFC]',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function EducationHero() {
  return (
    <section className="relative px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_80%_56%,rgba(0,220,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(80,210,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.5)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="education-reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#50D2FF33] bg-[#051022CC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]">
            <Sparkles className="h-3.5 w-3.5" /> Education and enablement
          </p>
          <h1 className="mt-6 max-w-3xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#F8FAFC] md:text-7xl">
            Training that turns tools into daily execution.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#CBD5E1]">Practical AI, automation, and workflow training for teams that need to move faster without creating chaos.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8]">Practical training for modern work. Systems only create value when people understand how to use them.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EducationButton href={quoteHref}>Request a Quote</EducationButton>
            <EducationButton href="#programs" variant="secondary">View programs</EducationButton>
          </div>
        </div>
        <TrainingDashboardVisual />
      </div>
    </section>
  );
}

function TrainingDashboardVisual() {
  return (
    <div className="education-reveal training-dashboard relative rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:120ms] md:p-7">
      <div className="absolute inset-6 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.16),transparent_34%)]" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Training dashboard</p>
          <p className="mt-1 text-sm text-[#94A3B8]">Adoption: 72% · Templates ready</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Handover ready</span>
      </div>
      <div className="relative mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.1fr_0.75fr]">
        <div className="dashboard-panel">
          <p className="dashboard-label">Learning path</p>
          {['AI for Work', 'Prompt library', 'SOP checklist'].map((item, index) => (
            <div key={item} className="dashboard-list-item" style={{ animationDelay: `${180 + index * 90}ms` }}>
              <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {item}
            </div>
          ))}
        </div>
        <div className="dashboard-panel active-lesson">
          <p className="dashboard-label">Active lesson card</p>
          <h3 className="mt-2 font-[var(--font-jakarta)] text-xl font-semibold">Next lesson: Automate small tasks</h3>
          <p className="mt-3 text-sm leading-6 text-[#94A3B8]">Connect prompts, templates, and a simple approval step before automating anything risky.</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]"><span className="education-progress block h-full rounded-full bg-[linear-gradient(90deg,#38DFFF,#22C55E)]" /></div>
        </div>
        <div className="dashboard-panel">
          <p className="dashboard-label">Team progress</p>
          <div className="mt-3 flex items-end gap-2">{[42, 58, 72].map((height, index) => <span key={height} className="progress-column" style={{ height: `${height}px`, animationDelay: `${260 + index * 110}ms` }} />)}</div>
          <p className="mt-4 text-sm font-semibold text-emerald-300">Usage improving</p>
        </div>
      </div>
      <div className="relative mt-4 grid gap-3 md:grid-cols-3">
        {[
          ['Prompt library', WandSparkles],
          ['SOP checklist', ClipboardCheck],
          ['Handover pack', FileCheck2],
        ].map(([label, Icon]) => (
          <div key={label as string} className="bottom-module">
            <Icon className="h-4 w-4 text-[#38DFFF]" />
            <span>{label as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationProgramCards() {
  return (
    <section id="programs" className="education-section pt-0">
      <SectionHeader eyebrow="Programs" title="Choose the training path that fits the work." subtitle="From AI basics to team adoption, each program helps people use modern tools with more confidence and less confusion." />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {programs.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}
      </div>
    </section>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const Icon = program.visual === 'ai-learning-path' ? Bot : program.visual === 'team-enablement' ? UsersRound : UserRoundCheck;
  return (
    <article id={program.id} className="education-card group flex flex-col p-5" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
        <span className="rounded-full border border-[#50D2FF24] bg-white/[0.03] px-3 py-1 text-xs text-[#94A3B8]">Training module</span>
      </div>
      <ProgramMiniVisual visual={program.visual} />
      <h3 className="mt-5 font-[var(--font-jakarta)] text-2xl font-semibold">{program.title}</h3>
      <p className="mt-4 text-sm font-semibold text-[#F8FAFC]">Who it is for</p>
      <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{program.who}</p>
      <p className="mt-4 text-sm font-semibold text-[#F8FAFC]">Outcome</p>
      <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">{program.outcome}</p>
      <EducationButton href={program.href} variant="secondary" className="mt-auto pt-6">{program.cta}</EducationButton>
    </article>
  );
}

function ProgramMiniVisual({ visual }: { visual: ProgramVisual }) {
  if (visual === 'ai-learning-path') {
    return (
      <MiniVisualShell>
        <div className="education-mini-flow"><span>Prompt</span><ArrowRight /><span>Context</span><ArrowRight /><span>Task</span><ArrowRight /><span className="lit">Output</span></div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs"><span className="mini-panel">Assistant ready</span><span className="mini-panel">Review</span></div>
        <p className="education-mini-chip">Better output</p>
      </MiniVisualShell>
    );
  }
  if (visual === 'team-enablement') {
    return (
      <MiniVisualShell>
        <svg className="h-16 w-full" viewBox="0 0 260 64" aria-hidden="true"><path className="education-draw-line" d="M8 34 C58 6 88 58 130 34 S206 12 252 34" fill="none" stroke="#38DFFF" strokeWidth="2" strokeDasharray="5 7" /></svg>
        <div className="grid grid-cols-3 gap-2 text-[11px]"><span className="mini-panel">Roles</span><span className="mini-panel">SOPs</span><span className="mini-panel">Dashboard</span></div>
        <p className="education-mini-chip">Adoption</p>
      </MiniVisualShell>
    );
  }
  return (
    <MiniVisualShell>
      <div className="space-y-2 text-xs"><div className="mini-panel">Current problem</div><div className="mini-panel lit-panel">Task breakdown</div><div className="mini-panel">Setup checklist</div></div>
      <p className="education-mini-chip">Clarity</p>
    </MiniVisualShell>
  );
}

function MiniVisualShell({ children }: { children: ReactNode }) {
  return <div className="education-mini-visual mt-5 min-h-[150px] rounded-[22px] border border-[#50D2FF24] bg-[#02071199] p-4">{children}</div>;
}

function LearningJourney() {
  return (
    <section className="education-section">
      <SectionHeader eyebrow="Learning journey" title="A practical learning journey." subtitle="Training should move people from understanding to execution, not leave them with theory they never use." />
      <div className="journey-panel mt-10 rounded-[30px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:p-7">
        <div className="journey-line" />
        <div className="grid gap-4 lg:grid-cols-7">
          {learningJourney.map((item, index) => <LearningJourneyStep key={item.id} item={item} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function LearningJourneyStep({ item, index }: { item: JourneyStep; index: number }) {
  return (
    <article className="journey-step relative rounded-[22px] border border-[#50D2FF24] bg-[#020711B8] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38DFFF88]" style={{ animationDelay: `${index * 85}ms` }}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-200">{item.step}</div>
      <h3 className="font-[var(--font-jakarta)] text-base font-semibold leading-tight text-[#F8FAFC]">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{item.microcopy}</p>
    </article>
  );
}

function TrainingFormats() {
  return (
    <section className="education-section">
      <SectionHeader eyebrow="Formats" title="Training formats built around real work." subtitle="Choose the format that fits the team, workflow, or problem you need help with." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainingFormats.map((format, index) => <TrainingFormatCard key={format.id} format={format} index={index} />)}
      </div>
    </section>
  );
}

function TrainingFormatCard({ format, index }: { format: TrainingFormat; index: number }) {
  const icons: Record<FormatIcon, ComponentType<{ className?: string }>> = {
    online: MonitorCheck,
    coaching: Headphones,
    workshop: UsersRound,
    recordings: PlayCircle,
    templates: Library,
    sops: ClipboardCheck,
    handover: FileText,
  };
  const Icon = icons[format.icon];
  return (
    <article className={cn('format-card rounded-[24px] border border-[#50D2FF2E] bg-[#040D1CD6] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#38DFFF99]', format.id === 'handover-support' && 'lg:col-span-3')} style={{ animationDelay: `${index * 70}ms` }}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
        <div>
          <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{format.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">Purpose: {format.purpose}</p>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Best for: {format.bestFor}</p>
        </div>
        <span className="ml-auto mt-1 h-2 w-16 rounded-full bg-[linear-gradient(90deg,#38DFFF,#0EA5FF)] opacity-70" />
      </div>
    </article>
  );
}

function AdoptionMatters() {
  return (
    <section className="education-section">
      <div className="adoption-panel rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] md:p-8">
        <SectionHeader eyebrow="Adoption" title="Systems fail when teams do not adopt them." subtitle="A tool only creates value when people know when to use it, how to use it, and what happens next." />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="rounded-[26px] border border-amber-300/24 bg-amber-300/[0.07] p-5">
            <p className="text-sm font-semibold text-amber-100">Without adoption</p>
            <div className="mt-5 space-y-3">
              {['system delivered', 'team confused', 'repeated questions', 'low usage'].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-amber-300/20 bg-[#02071180] px-4 py-3 text-sm text-amber-100"><span className="h-2 w-2 rounded-full bg-amber-300" />{item}</div>)}
            </div>
            <p className="mt-5 text-sm leading-6 text-[#CBD5E1]">Without adoption, even a good system becomes another thing people avoid.</p>
          </div>
          <AdoptionFlow />
        </div>
        <p className="mt-6 max-w-3xl text-base leading-7 text-[#CBD5E1]">With training and SOPs, the system becomes part of daily execution.</p>
      </div>
    </section>
  );
}

function AdoptionFlow() {
  return (
    <div className="relative rounded-[26px] border border-[#50D2FF24] bg-[#02071199] p-5">
      <div className="adoption-route" />
      <div className="grid gap-3 md:grid-cols-5">
        {adoptionStages.map((stage, index) => {
          const icons = [Workflow, UsersRound, ClipboardCheck, Gauge, RefreshCw];
          const Icon = icons[index];
          return (
            <div key={stage} className="adoption-stage relative rounded-[20px] border border-[#50D2FF2E] bg-[#061222] p-4" style={{ animationDelay: `${index * 110}ms` }}>
              <Icon className="h-5 w-5 text-[#38DFFF]" />
              <p className="mt-4 text-sm font-semibold text-[#F8FAFC]">{stage}</p>
              <Check className="mt-4 h-4 w-4 text-emerald-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EducationCTA() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[1200px] rounded-[34px] border border-[#50D2FF33] bg-[linear-gradient(135deg,rgba(5,16,34,0.96),rgba(2,7,17,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">Training and adoption</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Train your team to use modern tools properly.</h2>
            <p className="mt-4 text-lg leading-8 text-[#94A3B8]">Whether you need AI training, workflow adoption, or handover support, we can help your team use the tools with confidence.</p>
            <p className="mt-4 text-sm font-semibold text-[#CBD5E1]">Practical training. Clear examples. No unnecessary complexity.</p>
            <div className="mt-7 flex flex-wrap gap-3"><EducationButton href={quoteHref}>Request a Quote</EducationButton><EducationButton href={contactHref} variant="secondary">Contact</EducationButton></div>
          </div>
          <div className="rounded-[28px] border border-[#50D2FF24] bg-[#02071199] p-5">
            <div className="education-mini-flow"><span>Lesson path</span><ArrowRight /><span>SOP checklist</span><ArrowRight /><span className="lit">Team progress</span></div>
            <div className="mt-5 grid gap-3 text-sm text-[#CBD5E1]"><div className="mini-panel">Adoption ready</div><div className="h-2 rounded-full bg-[linear-gradient(90deg,#38DFFF,#22C55E)]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
