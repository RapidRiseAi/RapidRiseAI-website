'use client';

import Link from 'next/link';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Clock3, Facebook, Globe, Instagram, Linkedin, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STORAGE_KEY = 'rapidrise_admin_access';

const MAINTENANCE_CONTACT = {
  email: 'team@rapidriseai.com',
  phoneDisplay: '+27 64 903 1234',
  phoneHref: 'tel:+27649031234',
  whatsappHref: 'https://wa.me/27649031234',
  websiteDisplay: 'rapidriseai.com',
  websiteHref: 'https://rapidriseai.com',
  socials: {
    facebook: 'https://facebook.com/rapidriseai',
    instagram: 'https://instagram.com/rapidriseai',
    linkedin: 'https://linkedin.com/company/rapid-rise-ai',
  },
};

export function MaintenanceGate({ children }: { children: ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'granted') setHasAccess(true);
  }, []);

  useEffect(() => {
    if (!hasAccess) {
      document.title = 'Website Upgrade in Progress | Rapid Rise AI';
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', 'Rapid Rise AI is upgrading its website. Business is still running as normal. Contact us by WhatsApp, phone, or email.');
    }
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
    setError('');
    const response = await fetch('/api/admin-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
    const payload = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) return setError(payload.error ?? 'Invalid admin code.');
    window.sessionStorage.setItem(STORAGE_KEY, 'granted');
    setHasAccess(true);
  }

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04060f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.18),transparent_42%),linear-gradient(to_bottom,#030712,#050914_45%,#04060f)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col items-start justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <p className="text-xl font-semibold tracking-tight">Rapid Rise AI</p>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cyan-200">SUPPORT STILL AVAILABLE</span>
        </header>

        <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-2">
          <section>
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-200">Website Upgrade in Progress</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Something Better Is Coming</h1>
            <p className="mt-5 max-w-xl text-slate-300">We’re upgrading the Rapid Rise AI website to give you a faster, cleaner, and more useful experience.</p>
            <p className="mt-3 max-w-xl text-slate-300">Business is still running as normal. For quotes, support, project updates, or new enquiries, contact us directly below.</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={MAINTENANCE_CONTACT.whatsappHref} className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">WhatsApp Us</Link>
              <Link href={`mailto:${MAINTENANCE_CONTACT.email}`} className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-cyan-300/40 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Email Us</Link>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_45px_rgba(56,189,248,0.12)] backdrop-blur">
            <h2 className="text-lg font-semibold">System Status</h2>
            <ul className="mt-5 space-y-4">
              {statusItems.map(([label, value, Icon]) => (
                <li key={String(label)} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3">
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
            {[{ icon: Mail, label: 'Email Us', value: MAINTENANCE_CONTACT.email, href: `mailto:${MAINTENANCE_CONTACT.email}` }, { icon: Phone, label: 'Call Us', value: MAINTENANCE_CONTACT.phoneDisplay, href: MAINTENANCE_CONTACT.phoneHref }, { icon: MessageCircle, label: 'WhatsApp Us', value: 'Message us directly', href: MAINTENANCE_CONTACT.whatsappHref }, { icon: Globe, label: 'Visit Website', value: MAINTENANCE_CONTACT.websiteDisplay, href: MAINTENANCE_CONTACT.websiteHref }].map((item) => (
              <Link key={item.label} href={item.href} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <p className="flex items-center gap-2 text-sm font-semibold"><item.icon aria-hidden className="h-4 w-4 text-cyan-300" />{item.label}</p>
                <p className="mt-2 text-sm text-slate-300">{item.value}</p>
              </Link>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">Connect With Us</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {[{ label: 'Facebook', href: MAINTENANCE_CONTACT.socials.facebook, icon: Facebook }, { label: 'Instagram', href: MAINTENANCE_CONTACT.socials.instagram, icon: Instagram }, { label: 'LinkedIn', href: MAINTENANCE_CONTACT.socials.linkedin, icon: Linkedin }].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit Rapid Rise AI on ${social.label}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-cyan-300/50 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <social.icon aria-hidden className="h-4 w-4 text-cyan-300" />{social.label}
              </a>
            ))}
          </div>
        </section>

        <footer className="pt-8 text-xs text-slate-400">© Rapid Rise AI. Business systems, automation, websites, and practical AI training.</footer>
      </div>

      <div className="fixed bottom-2 left-2 h-10 w-10 opacity-0 hover:opacity-100 focus-within:opacity-100">
        <form onSubmit={handleSubmit} className="flex w-[250px] items-center gap-2 rounded-md border border-white/25 bg-black/75 p-2">
          <input type="password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Admin code" aria-label="Admin code" className="h-8 flex-1 rounded border border-white/20 bg-white/10 px-2 text-xs" />
          <button type="submit" className="h-8 rounded bg-cyan-400 px-2 text-xs font-semibold text-slate-900">Enter</button>
        </form>
        {error ? <p className="mt-1 text-[11px] text-rose-300">{error}</p> : null}
      </div>
    </div>
  );
}
