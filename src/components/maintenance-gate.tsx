'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Clock3, Facebook, Globe, Instagram, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STORAGE_KEY = 'rapidrise_admin_access';

const MAINTENANCE_CONFIG = {
  companyName: 'Rapid Rise AI',
  email: 'team@rapidriseai.com',
  phoneDisplay: '+27 64 903 1234',
  phoneHref: 'tel:+27649031234',
  whatsappHref: 'https://wa.me/27649031234',
  websiteDisplay: 'rapidriseai.com',
  websiteHref: 'https://rapidriseai.com',
  socials: {
    facebook: 'https://www.facebook.com/people/Rapid-Rise-AI/61568527494461/',
    instagram: 'https://instagram.com/rapidriseai',
  },
};

export function MaintenanceGate() {
  const [hasAccess, setHasAccess] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'granted') setHasAccess(true);
  }, []);

  useEffect(() => {
    if (hasAccess) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [hasAccess]);

  const statusItems = useMemo<Array<[string, string, LucideIcon]>>(
    () => [
      ['Website upgrade', 'In progress', Clock3],
      ['Client projects', 'Active', Activity],
      ['New enquiries', 'Open', CheckCircle2],
      ['Support channels', 'Available', ShieldCheck],
    ],
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim() || isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
      const rawPayload = await response.text();
      let payload: { ok?: boolean; error?: string } = {};
      try {
        payload = rawPayload ? (JSON.parse(rawPayload) as { ok?: boolean; error?: string }) : {};
      } catch {
        payload = { error: rawPayload || response.statusText };
      }

      if (typeof payload.error === 'string' && /<html|<!doctype html/i.test(payload.error)) {
        payload.error = 'Server error while validating code (Cloudflare worker exception). Please try again shortly.';
      }

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? `Access check failed (${response.status}).`);
        return;
      }
      window.sessionStorage.setItem(STORAGE_KEY, 'granted');
      setHasAccess(true);
    } catch {
      setError('Unable to verify admin code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={`relative z-[9999] min-h-screen w-full bg-[#020617] text-white transition-transform duration-500 ease-in ${hasAccess ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      aria-hidden={hasAccess}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,211,238,0.2),transparent_42%),radial-gradient(circle_at_82%_22%,rgba(37,99,235,0.2),transparent_40%),linear-gradient(to_bottom,#020617,#050816_55%,#04060f)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col px-6 py-8 pb-24 sm:px-8 lg:px-10">
        <header className="flex flex-col items-start justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <p className="text-xl font-semibold tracking-tight">{MAINTENANCE_CONFIG.companyName}</p>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cyan-200">BUSINESS RUNNING AS NORMAL</span>
        </header>

        <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-2">
          <section>
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-200">Website Upgrade in Progress</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Something Better Is Coming</h1>
            <p className="mt-5 max-w-xl text-slate-300">We’re upgrading the Rapid Rise AI website to give you a faster, cleaner, and more useful experience.</p>
            <p className="mt-3 max-w-xl text-slate-300">Business is still running as normal. For quotes, support, project updates, or new enquiries, contact us directly below.</p>
            <p className="mt-3 max-w-xl text-slate-400">Rapid Rise AI builds practical business systems, automation, dashboards, websites, internal tools, client portals, lead capture systems, support assistants, Google Workspace automations, and AI training.</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={MAINTENANCE_CONFIG.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">WhatsApp Us</a>
              <a href={`mailto:${MAINTENANCE_CONFIG.email}`} className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-cyan-300/40 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Email Us</a>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_45px_rgba(56,189,248,0.14)] backdrop-blur">
            <h2 className="text-lg font-semibold">System Status</h2>
            <ul className="mt-5 space-y-4">
              {statusItems.map(([label, value, Icon]) => (
                <li key={String(label)} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3">
                  <span className="flex items-center gap-3 text-sm text-slate-200"><Icon aria-hidden className="h-4 w-4 text-cyan-300" />{label}</span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-cyan-100"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" aria-hidden />{value}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Contact Rapid Rise AI</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[{ icon: Mail, label: 'Email Us', value: MAINTENANCE_CONFIG.email, href: `mailto:${MAINTENANCE_CONFIG.email}` }, { icon: Phone, label: 'Call Us', value: MAINTENANCE_CONFIG.phoneDisplay, href: MAINTENANCE_CONFIG.phoneHref }, { icon: MessageCircle, label: 'WhatsApp Us', value: 'Message us directly', href: MAINTENANCE_CONFIG.whatsappHref }, { icon: Globe, label: 'Visit Website', value: MAINTENANCE_CONFIG.websiteDisplay, href: MAINTENANCE_CONFIG.websiteHref }].map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <p className="flex items-center gap-2 text-sm font-semibold"><item.icon aria-hidden className="h-4 w-4 text-cyan-300" />{item.label}</p>
                <p className="mt-2 text-sm text-slate-300">{item.value}</p>
              </a>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">Connect With Us</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {[{ label: 'Facebook', href: MAINTENANCE_CONFIG.socials.facebook, icon: Facebook }, { label: 'Instagram', href: MAINTENANCE_CONFIG.socials.instagram, icon: Instagram }].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit Rapid Rise AI on ${social.label}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-cyan-300/50 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <social.icon aria-hidden className="h-4 w-4 text-cyan-300" />{social.label}
              </a>
            ))}
          </div>
        </section>

        <footer className="pt-8 text-xs text-slate-400">© Rapid Rise AI. Business systems, automation, websites, and practical AI training.<br />Website upgrade in progress. We are still available for new enquiries and active client work.</footer>
      </div>

      <div className="absolute bottom-0 left-0 z-[10000] w-[310px] p-2 opacity-0 transition-opacity hover:opacity-100 focus-within:opacity-100">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 rounded-md border border-white/25 bg-black/80 p-2">
          <input type="password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Admin code" aria-label="Admin code" className="h-8 flex-1 rounded border border-white/20 bg-white/10 px-2 text-xs" autoComplete="off" />
          <button type="submit" disabled={isSubmitting} className="h-8 rounded bg-cyan-400 px-2 text-xs font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? 'Checking…' : 'Enter'}</button>
        </form>
        {error ? <p className="mt-1 text-[11px] text-rose-300">{error}</p> : null}
      </div>
    </div>
  );
}
