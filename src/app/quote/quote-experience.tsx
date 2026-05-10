'use client';

import type { ComponentType, FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Layers3,
  Loader2,
  Route,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/forms/turnstile-widget';
import { CONFIG } from '@/lib/config';
import { getUtmPayload } from '@/lib/utils';
import { isEmail, isWhatsapp, required } from '@/lib/validation';
import { cn } from '@/lib/utils';

type StepId = 'details' | 'build' | 'situation' | 'timeline' | 'review';
type FieldName = 'full_name' | 'company' | 'role' | 'email' | 'whatsapp' | 'website' | 'description' | 'tools' | 'timeline' | 'budget' | 'consent' | 'request_types' | 'turnstile';

type FormState = {
  full_name: string;
  company: string;
  role: string;
  email: string;
  whatsapp: string;
  website: string;
  description: string;
  tools: string;
  timeline: string;
  budget: string;
  consent: boolean;
};

type BuildType = {
  id: string;
  title: string;
  description: string;
  visual: string;
  icon: ComponentType<{ className?: string }>;
};

const steps: { id: StepId; title: string; helper: string }[] = [
  { id: 'details', title: 'Your details', helper: 'Tell us who we are speaking to and how to reach you.' },
  { id: 'build', title: 'What needs fixing?', helper: 'Choose the type of system closest to what you want to build.' },
  { id: 'situation', title: 'Current situation', helper: 'Explain what is currently manual, delayed, messy, or hard to track.' },
  { id: 'timeline', title: 'Timeline and budget', helper: 'This helps us recommend a realistic build path.' },
  { id: 'review', title: 'Review and submit', helper: 'Check your request before sending it through.' },
];

const buildTypes: BuildType[] = [
  { id: 'lead-capture', title: 'Lead capture and follow up', description: 'Capture enquiries, assign an owner, and schedule follow-up before leads go cold.', visual: 'Enquiry → Owner → Follow-up', icon: Zap },
  { id: 'automation', title: 'Workflow automation and integrations', description: 'Connect repeated steps between tools so work moves without manual copying.', visual: 'Tool A → Rule engine → Tool B', icon: Workflow },
  { id: 'workspace', title: 'Smart Google Workspace', description: 'Make your current Google tools work together with rules, reminders, storage, and reports.', visual: 'Gmail · Sheets · Drive · Calendar', icon: Layers3 },
  { id: 'web-app', title: 'Web app or internal tool', description: 'Build custom screens, dashboards, trackers, approval flows, or internal tools.', visual: 'Dashboard · Roles · Client view', icon: Gauge },
  { id: 'website', title: 'Website build', description: 'Create a conversion-focused website connected to lead capture and follow-up.', visual: 'Landing page → CTA → Form', icon: Route },
  { id: 'training', title: 'Training and enablement', description: 'Train your team to use AI, automation, dashboards, templates, and workflows properly.', visual: 'Lesson → SOP → Adoption', icon: ClipboardCheck },
];

const timelineOptions = ['ASAP', '2 to 4 weeks', '1 to 2 months', 'Flexible'];
const budgetOptions = ['Under R10k', 'R10k to R25k', 'R25k to R60k', 'R60k+'];
const helperChips = ['Slow replies', 'Manual copy', 'No owner', 'Forgotten follow-ups', 'Messy files', 'No dashboard', 'Poor website conversion', 'Team confusion'];

const initialForm: FormState = {
  full_name: '',
  company: '',
  role: '',
  email: '',
  whatsapp: '',
  website: '',
  description: '',
  tools: '',
  timeline: '',
  budget: '',
  consent: false,
};

const workHref = '/work';
const pricingHref = '/products/pricing';

export function QuoteExperience() {
  return (
    <main className="quote-command-shell overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <QuoteHero />
      <SystemDiagnosticIntake />
    </main>
  );
}

function QuoteHero() {
  return (
    <section className="relative px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(0,145,255,0.13),transparent_34%),radial-gradient(circle_at_82%_58%,rgba(0,220,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(80,210,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.5)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="quote-reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#50D2FF33] bg-[#051022CC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]"><Sparkles className="h-3.5 w-3.5" /> System diagnostic intake</p>
          <h1 className="mt-6 max-w-3xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#F8FAFC] md:text-7xl">Show us the leak. We will scope the system.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#CBD5E1]">Tell us what is manual, delayed, or hard to track. We will recommend the cleanest next step.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8]">You do not need to know the technical solution. Just explain what is slowing the work down.</p>
          <div className="mt-7 flex flex-wrap gap-2 text-sm text-[#CBD5E1]"><TrustChip>Response within 24 hours</TrustChip><TrustChip>Clear scope before build</TrustChip><TrustChip>No spam</TrustChip></div>
        </div>
        <QuoteHeroVisual />
      </div>
    </section>
  );
}

function TrustChip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-[#50D2FF24] bg-white/[0.035] px-3 py-2">{children}</span>;
}

function QuoteHeroVisual() {
  return (
    <div className="quote-reveal rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:120ms] md:p-7">
      <div className="relative grid gap-4 md:grid-cols-3">
        {[
          ['Manual workflow', 'Delayed / untracked', 'warning'],
          ['System recommendation', 'Route · automate · track', 'system'],
          ['Clear scope', 'Next step ready', 'success'],
        ].map(([title, chip, tone], index) => (
          <div key={title} className={cn('quote-hero-card relative rounded-[24px] border p-4', tone === 'warning' ? 'border-amber-300/24 bg-amber-300/[0.07]' : 'border-[#50D2FF2E] bg-[#02071199]')} style={{ animationDelay: `${index * 140}ms` }}>
            <span className={cn('mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border', tone === 'warning' ? 'border-amber-300/30 bg-amber-300/10 text-amber-200' : 'border-[#38DFFF55] bg-[#0EA5FF1A] text-[#38DFFF]')}>{index === 0 ? '!' : index === 1 ? <Route className="h-4 w-4" /> : <Check className="h-4 w-4" />}</span>
            <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{title}</h3>
            <p className="mt-3 rounded-full border border-[#50D2FF24] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">{chip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemDiagnosticIntake() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const pathname = usePathname();
  const selectedProduct = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('product') || '' : '';

  const selectedBuild = buildTypes.find((build) => requestTypes[0] === build.title);
  const active = steps[activeStep];
  const progress = ((activeStep + 1) / steps.length) * 100;

  function updateField(name: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as FieldName]) return prev;
      const { [name as FieldName]: _removed, ...rest } = prev;
      void _removed;
      return rest;
    });
  }

  function toggleRequestType(title: string) {
    setRequestTypes((prev) => prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]);
    setErrors((prev) => {
      if (!prev.request_types) return prev;
      const { request_types, ...rest } = prev;
      void request_types;
      return rest;
    });
  }

  function validateStep(stepIndex = activeStep) {
    const stepId = steps[stepIndex].id;
    const next: Partial<Record<FieldName, string>> = {};
    if (stepId === 'details') {
      if (!required(form.full_name)) next.full_name = 'Please enter your name.';
      if (!required(form.company)) next.company = 'Please enter your company name.';
      if (!isEmail(form.email)) next.email = 'Please enter a valid email address.';
      if (!isWhatsapp(form.whatsapp)) next.whatsapp = 'Please enter a valid WhatsApp number.';
    }
    if (stepId === 'build' && requestTypes.length < 1) next.request_types = 'Please select at least one option.';
    if (stepId === 'situation' && !required(form.description)) next.description = 'Please add a short description.';
    if (stepId === 'timeline' && !required(form.timeline)) next.timeline = 'Please select a timeline.';
    if (stepId === 'review') {
      if (!form.consent) next.consent = 'Please confirm consent.';
      if (!turnstileToken) next.turnstile = 'Please complete the Turnstile check before submitting.';
    }
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  }

  function canJumpTo(index: number) {
    if (index <= activeStep) return true;
    for (let i = 0; i < index; i += 1) {
      if (!validateStep(i)) return false;
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function goBack() {
    setActiveStep((step) => Math.max(step - 1, 0));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const allValid = steps.every((_, index) => validateStep(index));
    if (!allValid) {
      const firstInvalid = steps.findIndex((_, index) => !validateStep(index));
      setActiveStep(firstInvalid >= 0 ? firstInvalid : 0);
      return;
    }
    setStatus('loading');
    setSubmitError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmPayload(params);
      const body = {
        path: 'quote',
        source_page: pathname,
        ...utm,
        request_types: requestTypes,
        ...form,
        consent: form.consent ? 'on' : '',
        selected_product: selectedProduct,
        turnstileToken,
      };
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        let errorMessage = `Submission failed (${res.status}).`;
        try {
          const failure = await res.json() as { error?: string; detail?: string };
          if (failure?.error) errorMessage = failure.detail ? `${failure.error} ${failure.detail}` : failure.error;
        } catch {
          // Keep fallback message
        }
        throw new Error(errorMessage);
      }
      setStatus('success');
      setTurnstileToken('');
    } catch (error) {
      setStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'Please try again. If the issue continues, email us directly at team@rapidriseai.com.');
    }
  }

  if (status === 'success') return <QuoteSuccessState form={form} requestTypes={requestTypes} />;

  return (
    <section className="quote-section pt-0">
      <div className="quote-diagnostic-grid grid gap-7 lg:grid-cols-[0.6fr_0.4fr] lg:gap-10">
        <form onSubmit={submit} className="quote-form-panel rounded-[34px] border border-[#50D2FF38] bg-[linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_40px_rgba(0,145,255,0.10),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[18px] md:p-8" aria-busy={status === 'loading'}>
          <QuoteProgressRail activeStep={activeStep} progress={progress} onStepClick={(index) => { if (canJumpTo(index)) setActiveStep(index); }} />
          {selectedProduct ? <input type="hidden" name="selected_product" value={selectedProduct} /> : null}
          <div className="mt-8">
            <p className="text-sm font-semibold text-[#38DFFF]">Step {activeStep + 1} of {steps.length}</p>
            <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-semibold">{active.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{active.helper}</p>
          </div>
          <div className="quote-step-body mt-7">
            {active.id === 'details' ? <DetailsStep form={form} errors={errors} updateField={updateField} /> : null}
            {active.id === 'build' ? <BuildStep requestTypes={requestTypes} errors={errors} toggleRequestType={toggleRequestType} /> : null}
            {active.id === 'situation' ? <SituationStep form={form} errors={errors} updateField={updateField} /> : null}
            {active.id === 'timeline' ? <TimelineStep form={form} errors={errors} updateField={updateField} /> : null}
            {active.id === 'review' ? <ReviewStep form={form} requestTypes={requestTypes} errors={errors} updateField={updateField} turnstileToken={turnstileToken} setTurnstileToken={setTurnstileToken} /> : null}
          </div>
          {status === 'error' ? <div className="quote-error-state mt-6" role="alert"><p className="font-semibold">Something went wrong.</p><p className="mt-1 text-sm">{submitError || 'Please try again. If the issue continues, email us directly at team@rapidriseai.com.'}</p></div> : null}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#50D2FF1F] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={goBack} disabled={activeStep === 0 || status === 'loading'} className="quote-back-button"><ArrowLeft className="h-4 w-4" /> Back</button>
            {active.id === 'review' ? <button type="submit" disabled={status === 'loading'} className="quote-primary-button">{status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{status === 'loading' ? 'Submitting request...' : 'Submit request'}{status !== 'loading' ? <ArrowRight className="h-4 w-4" /> : null}</button> : <button type="button" onClick={goNext} className="quote-primary-button">{activeStep === 0 ? 'Continue to system type' : activeStep === 1 ? 'Continue to situation' : activeStep === 2 ? 'Continue to timeline' : 'Review request'}<ArrowRight className="h-4 w-4" /></button>}
          </div>
        </form>
        <DynamicDiagnosticVisual form={form} selectedBuild={selectedBuild} requestTypes={requestTypes} activeStep={active.id} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2 text-sm text-[#CBD5E1]"><TrustChip>Clear scope before build</TrustChip><TrustChip>No pressure</TrustChip><TrustChip>We recommend the cleanest next step first</TrustChip></div>
    </section>
  );
}

function QuoteProgressRail({ activeStep, progress, onStepClick }: { activeStep: number; progress: number; onStepClick: (index: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs text-[#94A3B8]"><span>Diagnostic progress</span><span>{Math.round(progress)}%</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]"><span className="block h-full rounded-full bg-[linear-gradient(90deg,#38DFFF,#22C55E)] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      <div className="mt-5 grid gap-2 md:grid-cols-5" role="list" aria-label="Quote intake steps">
        {steps.map((step, index) => {
          const complete = index < activeStep;
          const active = index === activeStep;
          return <button key={step.id} type="button" onClick={() => onStepClick(index)} className={cn('quote-step-indicator', active && 'is-active', complete && 'is-complete')}><span>{complete ? <Check className="h-3.5 w-3.5" /> : index + 1}</span><strong>{step.title}</strong></button>;
        })}
      </div>
    </div>
  );
}

function Field({ label, error, helper, children }: { label: string; error?: string; helper?: string; children: ReactNode }) {
  return <label className="quote-field block"><span className="mb-2 block text-sm font-semibold text-[#CBD5E1]">{label}</span>{children}{helper ? <span className="mt-1.5 block text-xs text-[#94A3B8]">{helper}</span> : null}{error ? <span className="mt-1.5 block text-sm text-red-300">{error}</span> : null}</label>;
}

function DetailsStep({ form, errors, updateField }: { form: FormState; errors: Partial<Record<FieldName, string>>; updateField: (name: keyof FormState, value: string | boolean) => void }) {
  return <div className="grid gap-5 md:grid-cols-2">
    <Field label="Full name" error={errors.full_name} helper="Use your preferred contact name"><input name="full_name" autoComplete="name" required value={form.full_name} onChange={(e) => updateField('full_name', e.target.value)} placeholder="Your name" /></Field>
    <Field label="Company name" error={errors.company}><input name="company" autoComplete="organization" required value={form.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Company or team name" /></Field>
    <Field label="Role optional"><input name="role" autoComplete="organization-title" value={form.role} onChange={(e) => updateField('role', e.target.value)} placeholder="Manager, Owner, Ops, Admin, etc" /></Field>
    <Field label="Website URL optional"><input name="website" autoComplete="url" value={form.website} onChange={(e) => updateField('website', e.target.value)} placeholder="https://" /></Field>
    <Field label="Email" error={errors.email} helper="We send scope details here"><input name="email" autoComplete="email" required value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@company.com" /></Field>
    <Field label="WhatsApp number" error={errors.whatsapp} helper="For quick updates if needed"><input name="whatsapp" autoComplete="tel" required value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} placeholder="+27 ..." /></Field>
  </div>;
}

function BuildStep({ requestTypes, errors, toggleRequestType }: { requestTypes: string[]; errors: Partial<Record<FieldName, string>>; toggleRequestType: (title: string) => void }) {
  return <fieldset><legend className="sr-only">What do you want to build?</legend><div className="grid gap-4 md:grid-cols-2">{buildTypes.map((build) => <BuildTypeCard key={build.id} build={build} selected={requestTypes.includes(build.title)} onToggle={() => toggleRequestType(build.title)} />)}</div>{errors.request_types ? <p className="mt-3 text-sm text-red-300">{errors.request_types}</p> : null}</fieldset>;
}

function BuildTypeCard({ build, selected, onToggle }: { build: BuildType; selected: boolean; onToggle: () => void }) {
  const Icon = build.icon;
  return <label className={cn('build-type-card cursor-pointer rounded-[22px] border p-4 transition', selected ? 'selected border-[#38DFFF99] bg-[#0EA5FF1A]' : 'border-[#50D2FF24] bg-[#02071199] hover:border-[#38DFFF66]')}><input type="checkbox" className="sr-only" checked={selected} onChange={onToggle} /><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></span><div><div className="flex items-center gap-2"><h3 className="font-[var(--font-jakarta)] font-semibold">{build.title}</h3>{selected ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : null}</div><p className="mt-2 text-sm leading-6 text-[#94A3B8]">{build.description}</p><p className="mt-3 rounded-full border border-[#50D2FF24] bg-white/[0.035] px-3 py-1 text-xs text-[#CBD5E1]">{build.visual}</p></div></div></label>;
}

function SituationStep({ form, errors, updateField }: { form: FormState; errors: Partial<Record<FieldName, string>>; updateField: (name: keyof FormState, value: string | boolean) => void }) {
  function addChip(chip: string) {
    const addition = form.description ? ` ${chip}.` : `${chip}.`;
    updateField('description', `${form.description}${addition}`);
  }
  return <div className="space-y-5"><Field label="Describe your situation" error={errors.description} helper="Explain what is currently manual, delayed, messy, or hard to track."><textarea name="description" rows={7} required value={form.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Example: We receive leads through WhatsApp and email, but follow-ups are manual and nobody can see which quotes are still pending." /></Field><div className="flex flex-wrap gap-2">{helperChips.map((chip) => <button key={chip} type="button" onClick={() => addChip(chip)} className="rounded-full border border-[#50D2FF24] bg-white/[0.035] px-3 py-1.5 text-xs text-[#CBD5E1] transition hover:border-[#38DFFF80]">{chip}</button>)}</div><Field label="Current tools used optional"><input name="tools" autoComplete="off" value={form.tools} onChange={(e) => updateField('tools', e.target.value)} placeholder="Gmail, Google Sheets, WhatsApp, Drive, website form, Calendly, CRM, etc" /></Field></div>;
}

function TimelineStep({ form, errors, updateField }: { form: FormState; errors: Partial<Record<FieldName, string>>; updateField: (name: keyof FormState, value: string | boolean) => void }) {
  return <div className="space-y-7"><OptionGroup title="Timeline" name="timeline" options={timelineOptions} value={form.timeline} error={errors.timeline} required onChange={(value) => updateField('timeline', value)} /><OptionGroup title="Budget optional" name="budget" options={budgetOptions} value={form.budget} onChange={(value) => updateField('budget', value)} /></div>;
}

function OptionGroup({ title, name, options, value, error, required, onChange }: { title: string; name: 'timeline' | 'budget'; options: string[]; value: string; error?: string; required?: boolean; onChange: (value: string) => void }) {
  return <fieldset><legend className="mb-3 text-sm font-semibold text-[#CBD5E1]">{title}</legend><div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <label key={option} className={cn('quote-option-card', value === option && 'selected')}><input className="sr-only" type="radio" name={name} value={option} checked={value === option} required={required} onChange={() => onChange(option)} /><span>{option}</span>{value === option ? <Check className="h-4 w-4 text-emerald-300" /> : null}</label>)}</div>{error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}</fieldset>;
}

function ReviewStep({ form, requestTypes, errors, updateField, turnstileToken, setTurnstileToken }: { form: FormState; requestTypes: string[]; errors: Partial<Record<FieldName, string>>; updateField: (name: keyof FormState, value: string | boolean) => void; turnstileToken: string; setTurnstileToken: (token: string) => void }) {
  return <div className="space-y-6"><DiagnosticSummaryCard form={form} requestTypes={requestTypes} /><label className="flex items-start gap-3 rounded-2xl border border-[#50D2FF24] bg-[#02071199] p-4 text-sm text-[#CBD5E1]"><input type="checkbox" name="consent" checked={form.consent} onChange={(e) => updateField('consent', e.target.checked)} className="mt-1" />I agree to be contacted about this request.</label>{errors.consent ? <p className="text-sm text-red-300">{errors.consent}</p> : null}<div className="quote-turnstile"><TurnstileWidget siteKey={CONFIG.turnstileSiteKey} onTokenChange={setTurnstileToken} error={errors.turnstile} /></div>{turnstileToken ? <p className="text-sm text-emerald-300">Spam protection complete.</p> : null}<p className="text-xs font-semibold text-[#94A3B8]">No spam. Your details are used only to respond to your request.</p></div>;
}

function DiagnosticSummaryCard({ form, requestTypes }: { form: FormState; requestTypes: string[] }) {
  const summary = [
    ['Name', form.full_name || 'Not added'],
    ['Company', form.company || 'Not added'],
    ['Build type', requestTypes.join(', ') || 'Not selected'],
    ['Timeline', form.timeline || 'Not selected'],
    ['Budget', form.budget || 'Not selected'],
    ['Current tools', form.tools || 'Not added'],
  ];
  return <div className="rounded-[24px] border border-[#50D2FF2E] bg-[#02071199] p-5"><div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-[var(--font-jakarta)] text-xl font-semibold">Diagnostic summary</h3><span className="rounded-full border border-[#38DFFF55] bg-[#0EA5FF1A] px-3 py-1 text-xs text-[#38DFFF]">Scope pending</span></div><div className="grid gap-3 sm:grid-cols-2">{summary.map(([label, value]) => <div key={label} className="rounded-2xl border border-[#50D2FF1F] bg-white/[0.03] p-3"><p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">{label}</p><p className="mt-1 text-sm text-[#F8FAFC]">{value}</p></div>)}</div><div className="mt-3 rounded-2xl border border-[#50D2FF1F] bg-white/[0.03] p-3"><p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">Situation preview</p><p className="mt-1 text-sm leading-6 text-[#F8FAFC]">{form.description || 'Not added'}</p></div></div>;
}

function DynamicDiagnosticVisual({ form, selectedBuild, requestTypes, activeStep }: { form: FormState; selectedBuild?: BuildType; requestTypes: string[]; activeStep: StepId }) {
  const title = selectedBuild?.title || 'Choose system type';
  const pathLabel = form.timeline ? timelinePathLabel(form.timeline) : 'Best-fit scope first';
  return <aside className="dynamic-diagnostic-panel rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] lg:sticky lg:top-24 lg:self-start lg:p-6"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Live diagnostic visual</p><h2 className="mt-3 font-[var(--font-jakarta)] text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-[#94A3B8]">{selectedBuild?.description || 'Manual workflow → choose system type → clear scope.'}</p><div className="mt-5 rounded-[24px] border border-[#50D2FF24] bg-[#02071199] p-4"><DiagnosticFlow selectedBuild={selectedBuild} /></div><div className="mt-5 grid gap-3"><VisualRow label="Active step" value={steps.find((step) => step.id === activeStep)?.title || ''} /><VisualRow label="Selected build" value={requestTypes.join(', ') || 'Not selected'} /><VisualRow label="Timeline path" value={pathLabel} /><VisualRow label="Budget scope" value={form.budget ? budgetPathLabel(form.budget) : 'Optional'} /></div><div className="mt-5 flex flex-wrap gap-2 text-xs"><span className="quote-trust-chip">Response within 24h</span><span className="quote-trust-chip">No pressure</span><span className="quote-trust-chip">Cleanest next step first</span></div></aside>;
}

function DiagnosticFlow({ selectedBuild }: { selectedBuild?: BuildType }) {
  const labels = selectedBuild ? flowLabels(selectedBuild.title) : ['Manual workflow', 'Choose system type', 'Clear scope'];
  return <div><svg className="mb-4 h-16 w-full" viewBox="0 0 300 64" aria-hidden="true"><path className="quote-draw-line" d="M8 34 C70 8 92 58 144 34 S228 10 292 34" fill="none" stroke="#38DFFF" strokeWidth="3" strokeDasharray="6 8" /></svg><div className="grid gap-2">{labels.map((label, index) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-[#50D2FF24] bg-white/[0.035] px-3 py-3 text-sm text-[#CBD5E1]"><span className={cn('h-2 w-2 rounded-full', index === 0 ? 'bg-amber-300' : index === labels.length - 1 ? 'bg-emerald-300' : 'bg-[#38DFFF]')} />{label}</div>)}</div></div>;
}

function flowLabels(title: string) {
  if (title.includes('Lead')) return ['Website enquiry', 'Auto reply', 'Owner assigned', 'Reminder', 'Dashboard'];
  if (title.includes('automation')) return ['Tool A', 'Rule engine', 'Tool B', 'Notification', 'Report'];
  if (title.includes('Google')) return ['Gmail inbox', 'Sheets table', 'Drive folder', 'Calendar reminder', 'Report chip'];
  if (title.includes('Web app')) return ['Admin dashboard', 'Role chips', 'Status board', 'Client view'];
  if (title.includes('Website')) return ['Landing page', 'Trust block', 'CTA path', 'Lead form', 'Follow-up'];
  return ['Lesson card', 'Template', 'SOP checklist', 'Team adoption'];
}

function VisualRow({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#50D2FF1F] bg-[#02071199] p-3"><p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">{label}</p><p className="mt-1 text-sm font-semibold text-[#F8FAFC]">{value}</p></div>;
}

function timelinePathLabel(value: string) {
  if (value === 'ASAP') return 'Fastest practical path';
  if (value === '2 to 4 weeks') return 'Focused build window';
  if (value === '1 to 2 months') return 'Structured system build';
  return 'Best-fit scope first';
}

function budgetPathLabel(value: string) {
  if (value === 'Under R10k') return 'Starter / fast win';
  if (value === 'R10k to R25k') return 'Focused system';
  if (value === 'R25k to R60k') return 'Custom system';
  return 'Larger operating layer';
}

function QuoteSuccessState({ form, requestTypes }: { form: FormState; requestTypes: string[] }) {
  return <section className="quote-section pt-0"><div className="mx-auto max-w-4xl rounded-[34px] border border-[#50D2FF33] bg-[linear-gradient(135deg,rgba(5,16,34,0.96),rgba(2,7,17,0.98))] p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"><BadgeCheck className="h-8 w-8" /></div><h2 className="mt-6 font-[var(--font-jakarta)] text-4xl font-semibold">Request received.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#94A3B8]">We will review your workflow and reply with clear next steps.</p><p className="mt-3 text-sm font-semibold text-[#CBD5E1]">Response within 24 hours. No spam. No pressure.</p><div className="mx-auto mt-7 max-w-2xl"><DiagnosticSummaryCard form={form} requestTypes={requestTypes} /></div><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href={workHref} className="quote-secondary-link">View Work</Link><Link href={pricingHref} className="quote-primary-link">Products and Pricing <ArrowRight className="h-4 w-4" /></Link><Link href="/" className="quote-secondary-link">Back to Home</Link></div></div></section>;
}
