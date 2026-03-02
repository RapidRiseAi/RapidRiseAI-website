'use client';

import { FormEvent, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckboxField, SelectField, TextArea, TextField } from './fields';
import { Toast } from '@/components/ui/toast';
import { CONFIG } from '@/lib/config';
import { getUtmPayload } from '@/lib/utils';
import { isEmail, isWhatsapp, required } from '@/lib/validation';
import { TurnstileWidget } from './turnstile-widget';

export function LeadForm({ type, selectedProduct = '' }: { type: 'quote' | 'contact' | 'booking'; selectedProduct?: string }) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const pathname = usePathname();
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const productSelection = (selectedProduct || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('product') || '' : '')).trim();

  async function submit(formData: FormData) {
    const full_name = String(formData.get('full_name') ?? '');
    const company = String(formData.get('company') ?? '');
    const email = String(formData.get('email') ?? '');
    const whatsapp = String(formData.get('whatsapp') ?? '');
    const description = String(formData.get('description') ?? '');
    const timeline = String(formData.get('timeline') ?? '');
    const consent = formData.get('consent') === 'on';
    const next: Record<string,string> = {};
    if (!required(full_name)) next.full_name = 'Please enter your name.';
    if (type === 'quote' && !required(company)) next.company = 'Please enter your company name.';
    if (!isEmail(email)) next.email = 'Please enter a valid email address.';
    if (!isWhatsapp(whatsapp)) next.whatsapp = 'Please enter a valid WhatsApp number.';
    if (type === 'quote' && requestTypes.length < 1) next.request_types = 'Please select at least one option.';
    if ((type === 'quote' || type === 'contact') && !required(description)) next.description = type === 'quote' ? 'Please add a short description.' : 'Please enter a message.';
    if (type === 'quote' && !required(timeline)) next.timeline = 'Please select a timeline.';
    if (type === 'quote' && !consent) next.consent = 'Please confirm consent.';
    setErrors(next); if (Object.keys(next).length) return;
    setStatus('loading');
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmPayload(params);
      const body = { path: type, source_page: pathname, ...utm, request_types: requestTypes, ...Object.fromEntries(formData.entries()), turnstileToken: 'client-token-placeholder' };
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('bad');
      setStatus('success');
    } catch { setStatus('error'); }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit(new FormData(event.currentTarget));
  }

  return <form onSubmit={handleSubmit} className="space-y-5">
    {type === 'quote' && productSelection ? <input type="hidden" name="selected_product" value={productSelection} /> : null}
    {status === 'success' ? <Toast message={type === 'quote' ? 'Request received. Thanks. We will review it and respond within 24 hours.' : type === 'contact' ? 'Message received. Thanks. We will reply within 24 hours.' : 'Request received. We will confirm a time within 24 hours.'} /> : null}
    {status === 'error' ? <Toast message="Something went wrong. Please try again." type="error" /> : null}
    <TextField name="full_name" label={type === 'booking' ? 'Name' : 'Full name'} placeholder="Your name" helper="Use your preferred contact name" error={errors.full_name} required />
    {type === 'quote' ? <TextField name="company" label="Company name" placeholder="Company or team name" error={errors.company} required /> : null}
    <TextField name="role" label={type === 'quote' ? 'Role optional' : type === 'booking' ? 'Preferred day/time' : 'WhatsApp (optional)'} placeholder={type === 'quote' ? 'Manager, Owner, Ops, Admin, etc' : ''} />
    <TextField name="email" label="Email" placeholder="you@company.com" helper="We send scope details here" error={errors.email} required />
    <TextField name="whatsapp" label="WhatsApp number" placeholder="+27 ..." helper="For quick updates if needed" error={errors.whatsapp} required />
    {type === 'quote' ? <TextField name="website" label="Website URL optional" placeholder="https://" /> : null}
    {type === 'quote' ? <fieldset><legend className="mb-2 text-sm text-text1">What do you want to build?</legend>{['Lead capture and follow up','Workflow automation and integrations','Smart Google Workspace','Web app or internal tool','Website build','Training and enablement'].map((option)=><label key={option} className="mb-2 flex gap-2 text-sm"><input type="checkbox" onChange={(e)=>setRequestTypes((prev)=>e.target.checked?[...prev,option]:prev.filter((p)=>p!==option))} />{option}</label>)}{errors.request_types ? <p className="text-sm text-red-400">{errors.request_types}</p> : null}</fieldset> : null}
    <TextArea name="description" label={type === 'contact' ? 'Message' : type === 'booking' ? 'Notes' : 'Describe your situation'} placeholder={type === 'quote' ? 'What is manual right now? What keeps going wrong? What would “better” look like?' : ''} error={errors.description} required={type !== 'booking'} />
    {type === 'quote' ? <TextField name="tools" label="Current tools used optional" placeholder="Gmail, Sheets, WhatsApp, booking tools, CRM, etc" /> : null}
    {type === 'quote' ? <SelectField name="timeline" label="Timeline" options={['ASAP','2 to 4 weeks','1 to 2 months','Flexible']} error={errors.timeline} /> : null}
    {type === 'quote' ? <SelectField name="budget" label="Budget optional" options={['Under R10k','R10k to R25k','R25k to R60k','R60k+']} /> : null}
    {type === 'quote' ? <CheckboxField name="consent" label="I agree to be contacted about this request." error={errors.consent} /> : null}
    <TurnstileWidget />
    <button className="rounded-button bg-blue px-6 py-3 font-semibold text-white transition hover:shadow-glow" type="submit">{status === 'loading' ? 'Submitting…' : type === 'contact' ? 'Send message' : type === 'booking' ? 'Request a time' : 'Submit request'}</button>
    {status === 'success' ? <div className="rounded-button border border-blue/40 bg-blue/10 p-4 text-sm"><p className="mb-3">Next steps are ready.</p><div className="flex flex-wrap gap-3"><Button href="/work" variant="secondary">View Work</Button><Button href="/book" variant="secondary">Book a Call</Button></div></div> : null}
  </form>;
}
