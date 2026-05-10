import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  GitBranch,
  Handshake,
  MessageSquare,
  Network,
  Plug,
  ReceiptText,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type PrincipleVisual = 'assignment-flow' | 'status-board' | 'clean-slider' | 'handover-pack';
type TrustIcon = 'Building2' | 'MessageSquare' | 'ReceiptText' | 'Plug' | 'Handshake' | 'Network';

type Principle = {
  id: string;
  title: string;
  copy: string;
  chips: string[];
  visual: PrincipleVisual;
};

type DifferenceRow = {
  generic: string;
  rapidRise: string;
};

type SouthAfricaTrustCard = {
  id: string;
  title: string;
  copy: string;
  icon: TrustIcon;
};

const principles: Principle[] = [
  {
    id: 'speed-clarity',
    title: 'Speed and clarity',
    copy: 'Work moves faster when requests, owners, and next steps are clear.',
    chips: ['Faster replies', 'Clear next step', 'Less waiting'],
    visual: 'assignment-flow',
  },
  {
    id: 'reliability-tracking',
    title: 'Reliability and tracking',
    copy: 'Systems should show what is moving, what is stuck, and what needs attention.',
    chips: ['Visible status', 'Owner tracking', 'Follow-up reminders'],
    visual: 'status-board',
  },
  {
    id: 'practical-delivery',
    title: 'Practical delivery',
    copy: 'We build what gets used, not bloated software that adds more confusion.',
    chips: ['No bloat', 'Useful screens', 'Built around the workflow'],
    visual: 'clean-slider',
  },
  {
    id: 'documentation-handover',
    title: 'Documentation and handover',
    copy: 'A system is only valuable if your team knows how to use it and own it.',
    chips: ['SOPs', 'Training', 'Ownership'],
    visual: 'handover-pack',
  },
];

const differenceRows: DifferenceRow[] = [
  { generic: 'Sells tools', rapidRise: 'Maps workflow' },
  { generic: 'Talks in hype', rapidRise: 'Fixes leaks' },
  { generic: 'Vague scope', rapidRise: 'Builds practical systems' },
  { generic: 'Poor handover', rapidRise: 'Documents handover' },
  { generic: 'Overbuilds', rapidRise: 'Improves after launch' },
];

const southAfricaTrustCards: SouthAfricaTrustCard[] = [
  {
    id: 'registered',
    title: 'Registered company',
    copy: 'Rapid Rise AI (Pty) Ltd, CIPC 2024/727338/07.',
    icon: 'Building2',
  },
  {
    id: 'communication',
    title: 'Direct communication',
    copy: 'Clear next steps, direct updates, and practical explanations.',
    icon: 'MessageSquare',
  },
  {
    id: 'pricing',
    title: 'Practical pricing',
    copy: 'Fixed products where scope is clear. Custom quotes where the workflow needs proper planning.',
    icon: 'ReceiptText',
  },
  {
    id: 'existing-tools',
    title: 'Built around existing tools',
    copy: 'We usually improve what you already use before recommending new software.',
    icon: 'Plug',
  },
  {
    id: 'small-business',
    title: 'Small business friendly',
    copy: 'Start with one painful workflow and build from there.',
    icon: 'Handshake',
  },
  {
    id: 'scalable',
    title: 'Scalable for bigger teams',
    copy: 'Systems can grow into dashboards, portals, reporting, and support layers.',
    icon: 'Network',
  },
];

const quoteHref = '/quote?source=about';
const workHref = '/work';

export function AboutExperience() {
  return (
    <main className="about-command-shell overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <AboutHero />
      <WhyWeExist />
      <FounderCompanyTrust />
      <OperatingPrinciples />
      <DifferenceComparison />
      <SouthAfricanBusinessTrust />
      <AboutFinalCTA />
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

function AboutButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string }) {
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

function AboutHero() {
  return (
    <section className="relative px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_82%_54%,rgba(0,220,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(80,210,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.5)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="about-reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#50D2FF33] bg-[#051022CC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]">
            <Sparkles className="h-3.5 w-3.5" /> Operating philosophy
          </p>
          <h1 className="mt-6 max-w-3xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#F8FAFC] md:text-7xl">
            We build systems that make work easier to run.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#CBD5E1]">Less chaos. Better tracking. Faster response.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8]">Most growing businesses do not need more noise. They need cleaner workflows, clearer ownership, and systems that help the team execute.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AboutButton href={quoteHref}>Request a Quote</AboutButton>
            <AboutButton href={workHref} variant="secondary">View Work</AboutButton>
          </div>
        </div>
        <WorkflowBlueprintVisual />
      </div>
    </section>
  );
}

function WorkflowBlueprintVisual() {
  return (
    <div className="about-reveal workflow-blueprint relative rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:120ms] md:p-7">
      <div className="absolute inset-6 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.16),transparent_34%)]" />
      <div className="relative mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Workflow blueprint</p>
          <p className="mt-1 text-sm text-[#94A3B8]">Manual process → System layer → Dashboard</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Handover ready</span>
      </div>
      <div className="relative grid gap-4 lg:grid-cols-3">
        <BlueprintColumn title="Manual process" tone="warning" items={['Lead waiting', 'No owner', 'Copied data']} />
        <div className="blueprint-system-layer rounded-[24px] border border-[#38DFFF55] bg-[#0EA5FF1A] p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38DFFF55] bg-[#02071199] text-[#38DFFF]"><GitBranch className="h-5 w-5" /></div>
          <h3 className="mt-4 font-[var(--font-jakarta)] text-lg font-semibold">System layer</h3>
          <svg className="mt-4 h-20 w-full" viewBox="0 0 220 80" aria-hidden="true">
            <path className="about-draw-line" d="M8 40 C52 10 76 68 110 40 S176 12 212 40" fill="none" stroke="#38DFFF" strokeWidth="3" strokeDasharray="6 8" />
          </svg>
          <div className="flex flex-wrap gap-2 text-xs"><span className="about-mini-chip">Owner assigned</span><span className="about-mini-chip">Status visible</span></div>
        </div>
        <div className="rounded-[24px] border border-[#50D2FF33] bg-[#02071199] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#38DFFF]">Dashboard</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <span className="dashboard-tile">12 active</span>
            <span className="dashboard-tile">4 waiting</span>
            <span className="dashboard-tile col-span-2">Response visible</span>
          </div>
          <div className="mt-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">Handover ready</div>
        </div>
      </div>
    </div>
  );
}

function BlueprintColumn({ title, items, tone = 'system' }: { title: string; items: string[]; tone?: 'warning' | 'system' }) {
  return (
    <div className="rounded-[24px] border border-[#50D2FF24] bg-[#02071199] p-4">
      <p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', tone === 'warning' ? 'text-amber-200' : 'text-[#38DFFF]')}>{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-[#CBD5E1]">
            <span className={cn('h-2 w-2 rounded-full', tone === 'warning' ? 'bg-amber-300 about-warning-pulse' : 'bg-[#38DFFF]')} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyWeExist() {
  return (
    <section className="about-section pt-0">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Why we exist"
            title="Most businesses do not have a work problem. They have a system problem."
            subtitle="Manual processes create delays, mistakes, and missed opportunities. Rapid Rise AI builds clean workflows and tools so teams can execute faster and with less effort."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['Less chaos', 'Better tracking', 'Faster response'].map((statement) => <span key={statement} className="rounded-full border border-[#50D2FF2E] bg-[#0EA5FF12] px-4 py-2 text-sm font-semibold text-[#CBD5E1]">{statement}</span>)}
          </div>
        </div>
        <ManualChaosVisual />
      </div>
    </section>
  );
}

function ManualChaosVisual() {
  return (
    <div className="about-panel grid gap-4 rounded-[30px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:grid-cols-2 md:p-6">
      <div className="rounded-[24px] border border-amber-300/24 bg-amber-300/[0.07] p-4">
        <p className="text-sm font-semibold text-amber-100">Manual chaos</p>
        <div className="mt-4 space-y-3">
          {['Leads wait', 'Data gets copied', 'Status is unclear'].map((item) => <div key={item} className="manual-card"><span className="about-warning-pulse h-2 w-2 rounded-full bg-amber-300" />{item}</div>)}
        </div>
      </div>
      <div className="relative rounded-[24px] border border-[#38DFFF3D] bg-[#0EA5FF12] p-4">
        <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 260 220" aria-hidden="true"><path className="about-draw-line" d="M28 56 C86 24 104 96 132 86 S194 42 232 66 M28 154 C88 126 104 172 150 150 S202 124 232 142" fill="none" stroke="#38DFFF" strokeWidth="2" strokeDasharray="6 8" /></svg>
        <p className="relative text-sm font-semibold text-[#38DFFF]">System layer</p>
        <div className="relative mt-4 grid gap-3">
          {['Captured', 'Assigned', 'Visible'].map((item) => <div key={item} className="system-card-row"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</div>)}
        </div>
      </div>
    </div>
  );
}

function FounderCompanyTrust() {
  const trustChips = ['Practical builds', 'Clear handover', 'South African company', 'Built around real workflows'];
  return (
    <section className="about-section">
      <SectionHeader eyebrow="Company trust" title="Built by a company focused on practical systems." subtitle="Rapid Rise AI is positioned around business automation and software systems that make real workflows clearer, faster, and easier to own." />
      <div className="about-panel mt-8 grid gap-6 rounded-[32px] border border-[#50D2FF33] bg-[#040D1CD6] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] lg:grid-cols-[0.7fr_1.3fr] lg:p-8">
        <div className="rounded-[28px] border border-[#50D2FF24] bg-[#02071199] p-5">
          <div className="flex aspect-[4/5] items-center justify-center rounded-[24px] border border-dashed border-[#50D2FF33] bg-[#030914] text-center">
            <div className="px-6">
              <Building2 className="mx-auto h-10 w-10 text-[#38DFFF]" />
              <p className="mt-4 font-[var(--font-jakarta)] text-lg font-semibold">Founder photo placeholder</p>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Real image can be added here.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"><BadgeCheck className="h-5 w-5" /></span>
            <div>
              <h3 className="font-[var(--font-jakarta)] text-3xl font-semibold">Rapid Rise AI</h3>
              <p className="mt-1 text-[#94A3B8]">Business automation and software systems</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {trustChips.map((chip) => <span key={chip} className="rounded-full border border-[#50D2FF24] bg-white/[0.035] px-4 py-2 text-sm text-[#CBD5E1]">{chip}</span>)}
          </div>
          <div className="mt-7 grid gap-3">
            <CompanyDetail label="Registered name" value="Rapid Rise AI (Pty) Ltd" />
            <CompanyDetail label="CIPC" value="2024/727338/07" />
            <CompanyDetail label="VAT" value="Not VAT registered" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#50D2FF20] bg-[#02071180] px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">{label}</span>
      <span className="font-semibold text-[#F8FAFC]">{value}</span>
    </div>
  );
}

function OperatingPrinciples() {
  return (
    <section className="about-section">
      <SectionHeader eyebrow="Operating principles" title="What we focus on." subtitle="Every build should make work clearer, faster, easier to track, and easier to hand over." />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {principles.map((principle, index) => <OperatingPrincipleCard key={principle.id} principle={principle} index={index} />)}
      </div>
    </section>
  );
}

function OperatingPrincipleCard({ principle, index }: { principle: Principle; index: number }) {
  const icons: Record<PrincipleVisual, ComponentType<{ className?: string }>> = {
    'assignment-flow': Zap,
    'status-board': Gauge,
    'clean-slider': Wrench,
    'handover-pack': ClipboardCheck,
  };
  const Icon = icons[principle.visual];
  return (
    <article className="about-card group p-5" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
        <div className="flex flex-wrap justify-end gap-2">{principle.chips.map((chip) => <span key={chip} className="rounded-full border border-[#50D2FF24] bg-white/[0.035] px-3 py-1 text-xs text-[#CBD5E1]">{chip}</span>)}</div>
      </div>
      <PrincipleMiniVisual visual={principle.visual} />
      <h3 className="mt-5 font-[var(--font-jakarta)] text-2xl font-semibold">{principle.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{principle.copy}</p>
    </article>
  );
}

function PrincipleMiniVisual({ visual }: { visual: PrincipleVisual }) {
  if (visual === 'assignment-flow') {
    return <MiniVisualShell><div className="about-mini-flow"><span>Enquiry</span><ArrowRight /><span className="lit">Owner</span><ArrowRight /><span>Next step</span></div><p className="about-mini-status">Assigned task</p></MiniVisualShell>;
  }
  if (visual === 'status-board') {
    return <MiniVisualShell><div className="grid grid-cols-3 gap-2 text-[11px]"><span className="mini-lane">Active</span><span className="mini-lane lit-lane">Waiting</span><span className="mini-lane">Done</span></div><div className="mt-4 h-2 rounded-full bg-[linear-gradient(90deg,#38DFFF,#22C55E)]" /><p className="about-mini-status">Metric visible</p></MiniVisualShell>;
  }
  if (visual === 'clean-slider') {
    return <MiniVisualShell><div className="flex items-center justify-between text-xs text-[#94A3B8]"><span>Bloated</span><span>Clean</span></div><div className="mt-5 h-2 rounded-full bg-white/[0.08]"><span className="block h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#FBBF24,#38DFFF)]" /></div><p className="about-mini-status">Useful screens</p></MiniVisualShell>;
  }
  return <MiniVisualShell><div className="grid gap-2 text-xs">{['Docs', 'SOPs', 'Training', 'Ownership'].map((item) => <span key={item} className="mini-lane flex items-center gap-2"><Check className="h-3 w-3 text-emerald-300" />{item}</span>)}</div><p className="about-mini-status">Handover ready</p></MiniVisualShell>;
}

function MiniVisualShell({ children }: { children: ReactNode }) {
  return <div className="about-mini-visual mt-5 min-h-[140px] rounded-[22px] border border-[#50D2FF24] bg-[#02071199] p-4">{children}</div>;
}

function DifferenceComparison() {
  return (
    <section className="about-section">
      <SectionHeader eyebrow="Difference" title="What makes us different." subtitle="The goal is not to sell tools. The goal is to fix the workflow so your team can execute." />
      <div className="about-panel mt-8 rounded-[32px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] md:p-7">
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonSide title="Generic provider" copy="May add more tools without fixing the workflow." tone="generic" items={differenceRows.map((row) => row.generic)} />
          <ComparisonSide title="Rapid Rise AI" copy="Starts with the leak, then builds the cleanest system around it." tone="rapid" items={differenceRows.map((row) => row.rapidRise)} />
        </div>
      </div>
    </section>
  );
}

function ComparisonSide({ title, copy, items, tone }: { title: string; copy: string; items: string[]; tone: 'generic' | 'rapid' }) {
  return (
    <div className={cn('rounded-[26px] border p-5', tone === 'generic' ? 'border-amber-300/20 bg-amber-300/[0.06]' : 'border-[#38DFFF4D] bg-[#0EA5FF12]')}>
      <p className={cn('text-sm font-semibold', tone === 'generic' ? 'text-amber-100' : 'text-[#38DFFF]')}>{title}</p>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{copy}</p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => <div key={item} className="comparison-row"><span className={cn('flex h-6 w-6 items-center justify-center rounded-full', tone === 'generic' ? 'bg-amber-300/10 text-amber-200' : 'bg-emerald-400/10 text-emerald-300')}>{tone === 'generic' ? '!' : <Check className="h-3.5 w-3.5" />}</span>{item}</div>)}
      </div>
    </div>
  );
}

function SouthAfricanBusinessTrust() {
  return (
    <section className="about-section">
      <SectionHeader eyebrow="South African business" title="Built for South African businesses." subtitle="Practical systems, direct communication, and clear delivery for businesses that need work to move better." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {southAfricaTrustCards.map((card, index) => <SouthAfricaTrustGrid key={card.id} card={card} index={index} />)}
      </div>
    </section>
  );
}

function SouthAfricaTrustGrid({ card, index }: { card: SouthAfricaTrustCard; index: number }) {
  const icons: Record<TrustIcon, ComponentType<{ className?: string }>> = { Building2, MessageSquare, ReceiptText, Plug, Handshake, Network };
  const Icon = icons[card.icon];
  return (
    <article className="trust-card rounded-[24px] border border-[#50D2FF2E] bg-[#040D1CD6] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#38DFFF99]" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
      <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{card.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{card.copy}</p>
      {card.id === 'pricing' ? <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="about-mini-chip">Fixed</span><span className="about-mini-chip">Quoted</span></div> : null}
    </article>
  );
}

function AboutFinalCTA() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[1200px] rounded-[34px] border border-[#50D2FF33] bg-[linear-gradient(135deg,rgba(5,16,34,0.96),rgba(2,7,17,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">Next step</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Tell us what is currently manual.</h2>
            <p className="mt-4 text-lg leading-8 text-[#94A3B8]">We will look at the workflow, identify the clearest next step, and recommend the system that makes sense.</p>
            <p className="mt-4 text-sm font-semibold text-[#CBD5E1]">Clear scope first. No pressure.</p>
            <div className="mt-7 flex flex-wrap gap-3"><AboutButton href={quoteHref}>Request a Quote</AboutButton><AboutButton href={workHref} variant="secondary">View Work</AboutButton></div>
          </div>
          <div className="rounded-[28px] border border-[#50D2FF24] bg-[#02071199] p-5">
            <div className="about-mini-flow"><span>Manual task</span><ArrowRight /><span>System layer</span><ArrowRight /><span className="lit">Visible status</span></div>
            <div className="mt-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200">Ready to scope</div>
          </div>
        </div>
      </div>
    </section>
  );
}
