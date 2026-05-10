import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  Route,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LeadForm } from '@/components/forms/lead-form';
import { cn } from '@/lib/utils';

type TrustItem = {
  title: string;
  text: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  linkText?: string;
};

type NextStep = {
  title: string;
  text: string;
  icon: ComponentType<{ className?: string }>;
};

const quoteHref = '/quote?source=contact';
const workHref = '/work';
const bookHref = '/book';
const emailHref = 'mailto:team@rapidriseai.com';
const phoneHref = 'tel:+27649031234';

const trustItems: TrustItem[] = [
  {
    title: 'Response within 24 hours',
    text: 'We review enquiries and reply with a clear next step.',
    icon: Clock3,
  },
  {
    title: 'No spam',
    text: 'Your details are used only to respond to your enquiry.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear next steps',
    text: 'We will tell you whether contact, quote scoping, or a call makes sense.',
    icon: Route,
  },
  {
    title: 'Email',
    text: 'team@rapidriseai.com',
    icon: Mail,
    href: emailHref,
    linkText: 'team@rapidriseai.com',
  },
  {
    title: 'Phone',
    text: '+27 64 903 1234',
    icon: Phone,
    href: phoneHref,
    linkText: '+27 64 903 1234',
  },
];

const nextSteps: NextStep[] = [
  {
    title: 'We review your message',
    text: 'We check what you need and where the request should go.',
    icon: Search,
  },
  {
    title: 'We identify the cleanest path',
    text: 'We decide whether a reply, quote scope, or call is the useful next step.',
    icon: Route,
  },
  {
    title: 'We reply with next steps',
    text: 'You get a practical response instead of vague sales follow-up.',
    icon: Send,
  },
  {
    title: 'If needed, we move to quote scoping',
    text: 'For builds, the quote form helps map the manual work, tools, and timeline.',
    icon: ClipboardCheck,
  },
];

export function ContactExperience() {
  return (
    <main className="contact-command-shell overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <ContactHero />
      <ContactHub />
      <WhatHappensNext />
      <ContactCTA />
    </main>
  );
}

function ContactButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string }) {
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

function SectionHeader({ eyebrow, title, subtitle, centered = false }: { eyebrow: string; title: string; subtitle: string; centered?: boolean }) {
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">{eyebrow}</p>
      <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] text-[#F8FAFC] md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#94A3B8] md:text-lg">{subtitle}</p>
    </div>
  );
}

function ContactHero() {
  return (
    <section className="relative px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_18%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_82%_58%,rgba(0,220,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(80,210,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.5)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="contact-reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#50D2FF33] bg-[#051022CC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]">
            <Sparkles className="h-3.5 w-3.5" /> Contact hub
          </p>
          <h1 className="mt-6 max-w-3xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#F8FAFC] md:text-7xl">
            Send the message. We will map the next step.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#CBD5E1]">For general questions, partnerships, or quick enquiries. Use Request a Quote for build scoping.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8]">If you already know what is manual, delayed, or hard to track, the quote form will help us scope faster.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ContactButton href={quoteHref}>Request a Quote</ContactButton>
            <ContactButton href={workHref} variant="secondary">View Work</ContactButton>
            <ContactButton href={bookHref} variant="ghost">Book a Call</ContactButton>
          </div>
        </div>
        <MessageWorkflowVisual />
      </div>
    </section>
  );
}

function MessageWorkflowVisual() {
  const steps = ['Message received', 'Reviewed', 'Next step recommended', 'Reply sent'];
  return (
    <div className="contact-reveal contact-workflow-card relative rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:120ms] md:p-7">
      <div className="absolute inset-6 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.16),transparent_34%)]" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Message workflow</p>
          <p className="mt-1 text-sm text-[#94A3B8]">Received → Reviewed → Recommended → Reply sent</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Reply within 24h</span>
      </div>
      <div className="relative mt-7 rounded-[26px] border border-[#50D2FF24] bg-[#02071199] p-5">
        <svg className="absolute inset-x-7 top-[5.2rem] hidden h-8 md:block" viewBox="0 0 520 32" aria-hidden="true">
          <path className="contact-line-draw" d="M4 16 H516" stroke="#38DFFF" strokeWidth="2" strokeDasharray="8 8" />
        </svg>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="contact-status-chip relative rounded-2xl border border-[#50D2FF24] bg-white/[0.035] p-4 text-center" style={{ animationDelay: `${index * 120}ms` }}>
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#38DFFF55] bg-[#0EA5FF1A] text-[#38DFFF]">
                {index === 0 ? <Inbox className="h-4 w-4" /> : index === 1 ? <CheckCircle2 className="h-4 w-4" /> : index === 2 ? <Route className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </div>
              <p className="text-sm font-semibold text-[#F8FAFC]">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-[22px] border border-[#50D2FF24] bg-[#061222] p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="mt-1 h-5 w-5 text-[#38DFFF]" />
            <div>
              <p className="text-sm font-semibold">Quick enquiry received</p>
              <p className="mt-1 text-sm leading-6 text-[#94A3B8]">We map whether the cleanest next step is a reply, quote scope, or call.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactHub() {
  return (
    <section className="contact-section pt-0">
      <div className="mb-6 rounded-[24px] border border-[#50D2FF24] bg-[#040D1C99] p-4 text-sm leading-6 text-[#CBD5E1] md:hidden">
        This page is for general messages and quick enquiries. For build scoping, use Request a Quote for faster details.
      </div>
      <div className="contact-hub-grid grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10">
        <ContactTrustPanel />
        <ContactFormPanel />
      </div>
    </section>
  );
}

function ContactTrustPanel() {
  return (
    <aside className="contact-trust-panel order-2 rounded-[32px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] lg:order-1 lg:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Contact operations</p>
      <h2 className="mt-3 font-[var(--font-jakarta)] text-2xl font-semibold">Response within 24 hours. No spam. Clear next steps.</h2>
      <ContactOperationsMini />
      <div className="mt-6 grid gap-3">
        {trustItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="contact-trust-row group flex gap-3 rounded-2xl border border-[#50D2FF24] bg-[#02071199] p-4 transition hover:border-[#38DFFF80]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">{item.text}</p>
              </div>
            </div>
          );
          return item.href ? <Link key={item.title} href={item.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020711]">{content}</Link> : <div key={item.title}>{content}</div>;
        })}
      </div>
    </aside>
  );
}

function ContactOperationsMini() {
  return (
    <div className="mt-5 rounded-[24px] border border-[#50D2FF24] bg-[#02071199] p-4">
      <div className="contact-mini-flow"><span>Received</span><ArrowRight /><span>Reviewed</span><ArrowRight /><span className="lit">Reply sent</span></div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><span className="contact-mini-panel">Next step</span><span className="contact-mini-panel">No spam</span></div>
    </div>
  );
}

function ContactFormPanel() {
  return (
    <section className="contact-form-panel order-1 rounded-[34px] border border-[#50D2FF38] bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_40px_rgba(0,145,255,0.10),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[18px] lg:order-2 lg:p-7">
      <div className="mb-6 flex flex-col gap-3 border-b border-[#50D2FF1F] pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Contact form</p>
          <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-semibold">Send us a message</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">For build scoping, Request a Quote will give us the details we need faster.</p>
        </div>
        <ContactButton href={quoteHref} variant="secondary" className="shrink-0">Request a Quote</ContactButton>
      </div>
      <LeadForm type="contact" />
    </section>
  );
}

function WhatHappensNext() {
  return (
    <section className="contact-section">
      <SectionHeader eyebrow="After submit" title="What happens next" subtitle="You will know where the request is going and what the cleanest next step should be." />
      <div className="next-steps-panel relative mt-8 rounded-[30px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:p-7">
        <div className="next-step-line" />
        <div className="grid gap-4 lg:grid-cols-4">
          {nextSteps.map((step, index) => <NextStepCard key={step.title} step={step} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function NextStepCard({ step, index }: { step: NextStep; index: number }) {
  const Icon = step.icon;
  return (
    <article className="next-step-card relative rounded-[22px] border border-[#50D2FF24] bg-[#020711B8] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#38DFFF88]" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
      <p className="text-sm font-semibold text-[#F8FAFC]">{step.title}</p>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{step.text}</p>
    </article>
  );
}

function ContactCTA() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[1200px] rounded-[30px] border border-[#50D2FF33] bg-[linear-gradient(135deg,rgba(5,16,34,0.96),rgba(2,7,17,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Prefer a quote request?</p>
            <h2 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold md:text-3xl">Use Request a Quote for faster build scoping.</h2>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Response within 24 hours. No spam. Clear handover.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ContactButton href={quoteHref}>Request a Quote</ContactButton>
            <ContactButton href={workHref} variant="secondary">View Work</ContactButton>
            <ContactButton href={bookHref} variant="ghost">Book a Call</ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
}
