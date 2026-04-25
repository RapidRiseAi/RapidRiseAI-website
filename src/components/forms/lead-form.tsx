'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, CheckCircle2, LayoutDashboard, Link2, Sparkles, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckboxField, SelectField, TextArea, TextField } from './fields';
import { Toast } from '@/components/ui/toast';
import { CONFIG } from '@/lib/config';
import { getUtmPayload } from '@/lib/utils';
import { isEmail, isWhatsapp, required } from '@/lib/validation';
import { TurnstileWidget } from './turnstile-widget';

const requestOptions = [
  'Lead capture and follow up',
  'Workflow automation and integrations',
  'Smart Google Workspace',
  'Web app or internal tool',
  'Website build',
  'Training and enablement',
] as const;

export function LeadForm({ type, selectedProduct = '' }: { type: 'quote' | 'contact' | 'booking'; selectedProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const pathname = usePathname();
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const productSelection = (selectedProduct || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('product') || '' : '')).trim();

  const selectedVisual = useMemo(() => {
    if (requestTypes.includes('Lead capture and follow up')) return { title: 'Lead pipeline', icon: Workflow, bullets: ['Enquiry captured', 'Owner assigned', 'Follow-up scheduled'] };
    if (requestTypes.includes('Web app or internal tool')) return { title: 'Dashboard and portal', icon: LayoutDashboard, bullets: ['Status board', 'Client view', 'Handover tracked'] };
    if (requestTypes.includes('Training and enablement')) return { title: 'Training journey', icon: Sparkles, bullets: ['Workshop booked', 'SOP shared', 'Usage improved'] };
    if (requestTypes.includes('Website build')) return { title: 'Conversion flow', icon: ArrowRight, bullets: ['Landing page', 'Clear CTA', 'Quote request'] };
    if (requestTypes.includes('Smart Google Workspace')) return { title: 'Workspace map', icon: Link2, bullets: ['Gmail linked', 'Sheets updated', 'Drive structured'] };
    return { title: 'System diagnostic', icon: CheckCircle2, bullets: ['Leak identified', 'Scope defined', 'Build plan ready'] };
  }, [requestTypes]);

  const handleTurnstileTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) {
      setErrors((prev) => {
        if (!prev.turnstile) return prev;
        const { turnstile, ...rest } = prev;
        return rest;
      });
    }
  }, []);

  function validateStep(formData: FormData) {
    const next: Record<string, string> = {};
    if (type !== 'quote') return next;

    const full_name = String(formData.get('full_name') ?? '');
    const company = String(formData.get('company') ?? '');
    const email = String(formData.get('email') ?? '');
    const whatsapp = String(formData.get('whatsapp') ?? '');
    const description = String(formData.get('description') ?? '');
    const timeline = String(formData.get('timeline') ?? '');
    const consent = formData.get('consent') === 'on';

    if (step === 1) {
      if (!required(full_name)) next.full_name = 'Please enter your name.';
      if (!required(company)) next.company = 'Please enter your company name.';
      if (!isEmail(email)) next.email = 'Please enter a valid email address.';
      if (!isWhatsapp(whatsapp)) next.whatsapp = 'Please enter a valid WhatsApp number.';
    }
    if (step === 2 && requestTypes.length < 1) next.request_types = 'Please select at least one option.';
    if (step === 3 && !required(description)) next.description = 'Please add a short description.';
    if (step === 4 && !required(timeline)) next.timeline = 'Please select a timeline.';
    if (step === 5) {
      if (!consent) next.consent = 'Please confirm consent.';
      if (!turnstileToken) next.turnstile = 'Please complete the Turnstile check before submitting.';
    }

    return next;
  }

  async function submit(formData: FormData) {
    const full_name = String(formData.get('full_name') ?? '');
    const company = String(formData.get('company') ?? '');
    const email = String(formData.get('email') ?? '');
    const whatsapp = String(formData.get('whatsapp') ?? '');
    const description = String(formData.get('description') ?? '');
    const timeline = String(formData.get('timeline') ?? '');
    const consent = formData.get('consent') === 'on';
    const next: Record<string, string> = {};

    if (!required(full_name)) next.full_name = 'Please enter your name.';
    if (type === 'quote' && !required(company)) next.company = 'Please enter your company name.';
    if (!isEmail(email)) next.email = 'Please enter a valid email address.';
    if (!isWhatsapp(whatsapp)) next.whatsapp = 'Please enter a valid WhatsApp number.';
    if (type === 'quote' && requestTypes.length < 1) next.request_types = 'Please select at least one option.';
    if ((type === 'quote' || type === 'contact') && !required(description)) next.description = type === 'quote' ? 'Please add a short description.' : 'Please enter a message.';
    if (type === 'quote' && !required(timeline)) next.timeline = 'Please select a timeline.';
    if (type === 'quote' && !consent) next.consent = 'Please confirm consent.';
    if (!turnstileToken) next.turnstile = 'Please complete the Turnstile check before submitting.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    setSubmitError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmPayload(params);
      const body = {
        path: type,
        source_page: pathname,
        ...utm,
        request_types: requestTypes,
        ...Object.fromEntries(formData.entries()),
        turnstileToken,
      };
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        let errorMessage = `Submission failed (${res.status}).`;
        try {
          const failure = (await res.json()) as { error?: string; detail?: string };
          if (failure?.error) errorMessage = failure.detail ? `${failure.error} ${failure.detail}` : failure.error;
        } catch {
          // fallback
        }
        throw new Error(errorMessage);
      }
      setStatus('success');
      setTurnstileToken('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
      setStatus('error');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (type === 'quote' && step < 5) {
      const stepErrors = validateStep(formData);
      setErrors(stepErrors);
      if (Object.keys(stepErrors).length) return;
      setStep((s) => Math.min(s + 1, 5));
      return;
    }

    await submit(formData);
  }

  const steps = ['Your details', 'What needs fixing?', 'Current situation', 'Timeline and budget', 'Review and submit'];

  return (
    <div className={type === 'quote' ? 'grid gap-5 lg:grid-cols-[1fr_280px]' : ''}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {type === 'quote' && productSelection ? <input type="hidden" name="selected_product" value={productSelection} /> : null}
        {status === 'success' ? <Toast message={type === 'quote' ? 'Request received. We will review and respond within 24 hours.' : type === 'contact' ? 'Message received. We will reply within 24 hours.' : 'Request received. We will confirm a time within 24 hours.'} /> : null}
        {status === 'error' ? <Toast message={submitError || 'Something went wrong. Please try again.'} type="error" /> : null}

        {type === 'quote' ? (
          <div className="flex flex-wrap gap-2">
            {steps.map((item, idx) => (
              <div key={item} className={`rounded-full border px-3 py-1 text-xs ${idx + 1 === step ? 'border-blue/70 bg-blue/15 text-blue' : 'border-stroke text-text2'}`}>
                {idx + 1}. {item}
              </div>
            ))}
          </div>
        ) : null}

        {(type !== 'quote' || step === 1) ? (
          <>
            <TextField name="full_name" autoComplete="name" label={type === 'booking' ? 'Name' : 'Full name'} placeholder="Your name" helper="Use your preferred contact name" error={errors.full_name} required />
            {type === 'quote' ? <TextField name="company" autoComplete="organization" label="Company name" placeholder="Company or team name" error={errors.company} required /> : null}
            <TextField name="role" autoComplete="organization-title" label={type === 'quote' ? 'Role optional' : type === 'booking' ? 'Preferred day/time' : 'WhatsApp (optional)'} placeholder={type === 'quote' ? 'Manager, Owner, Ops, Admin, etc' : ''} />
            <TextField name="email" autoComplete="email" label="Email" placeholder="you@company.com" helper="We send scope details here" error={errors.email} required />
            <TextField name="whatsapp" autoComplete="tel" label="WhatsApp number" placeholder="+27 ..." helper="For quick updates if needed" error={errors.whatsapp} required />
            {type === 'quote' ? <TextField name="website" autoComplete="url" label="Website URL optional" placeholder="https://" /> : null}
          </>
        ) : null}

        {(type !== 'quote' || step === 2) ? (
          type === 'quote' ? (
            <fieldset>
              <legend className="mb-2 text-sm text-text1">What do you want to build?</legend>
              {requestOptions.map((option) => (
                <label key={option} className="mb-2 flex gap-2 text-sm">
                  <input type="checkbox" checked={requestTypes.includes(option)} onChange={(e) => setRequestTypes((prev) => (e.target.checked ? [...prev, option] : prev.filter((p) => p !== option)))} />
                  {option}
                </label>
              ))}
              {errors.request_types ? <p className="text-sm text-red-400">{errors.request_types}</p> : null}
            </fieldset>
          ) : null
        ) : null}

        {(type !== 'quote' || step === 3) ? (
          <>
            <TextArea name="description" autoComplete="off" label={type === 'contact' ? 'Message' : type === 'booking' ? 'Notes' : 'Describe your situation'} placeholder={type === 'quote' ? 'What is manual right now? What keeps going wrong? What should improve first?' : ''} error={errors.description} required={type !== 'booking'} />
            {type === 'quote' ? <TextField name="tools" autoComplete="off" label="Current tools used optional" placeholder="Gmail, Sheets, WhatsApp, CRM, etc" /> : null}
          </>
        ) : null}

        {(type !== 'quote' || step === 4) ? (
          <>
            {type === 'quote' ? <SelectField name="timeline" label="Timeline" options={['ASAP', '2 to 4 weeks', '1 to 2 months', 'Flexible']} error={errors.timeline} /> : null}
            {type === 'quote' ? <SelectField name="budget" label="Budget optional" options={['Under R10k', 'R10k to R25k', 'R25k to R60k', 'R60k+']} /> : null}
          </>
        ) : null}

        {(type !== 'quote' || step === 5) ? (
          <>
            {type === 'quote' ? <CheckboxField name="consent" label="I agree to be contacted about this request." error={errors.consent} /> : null}
            <TurnstileWidget siteKey={CONFIG.turnstileSiteKey} onTokenChange={handleTurnstileTokenChange} error={errors.turnstile} />
          </>
        ) : null}

        <button className="rounded-button bg-blue px-6 py-3 font-semibold text-white transition hover:shadow-glow" type="submit">
          {status === 'loading' ? 'Submitting…' : type === 'quote' && step < 5 ? 'Continue' : type === 'contact' ? 'Send message' : type === 'booking' ? 'Request a time' : 'Submit request'}
        </button>

        {type === 'quote' && step > 1 && step < 5 ? (
          <button type="button" className="ml-3 rounded-button border border-stroke px-5 py-3 text-sm" onClick={() => setStep((s) => Math.max(1, s - 1))}>
            Back
          </button>
        ) : null}

        {status === 'success' ? (
          <div className="rounded-button border border-blue/40 bg-blue/10 p-4 text-sm">
            <p className="mb-3">Next steps are ready.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/work" variant="secondary">View Work</Button>
              <Button href="/book" variant="secondary">Book a Call</Button>
            </div>
          </div>
        ) : null}
      </form>

      {type === 'quote' ? (() => {
        const SelectedIcon = selectedVisual.icon;
        return <aside className="h-fit rounded-card border border-blue/30 bg-blue/5 p-4 lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-[0.16em] text-blue">Dynamic preview</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-text0">
            <SelectedIcon className="h-4 w-4 text-blue" />
            {selectedVisual.title}
          </div>
          <ul className="mt-3 space-y-2 text-sm text-text1">
            {selectedVisual.bullets.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </aside>;
      })() : null}
    </div>
  );
}
