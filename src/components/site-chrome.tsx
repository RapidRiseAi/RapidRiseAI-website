'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { siteContent } from '@/content/siteContent';
import { cn } from '@/lib/utils';
import { CONFIG } from '@/lib/config';

const solutionLinks = [
  { label: 'Lead Capture and Follow Up', href: '/solutions/lead-capture' },
  { label: 'Workflow Automation and Integrations', href: '/solutions/workflow-automation' },
  { label: 'Smart Google Workspace', href: '/solutions/google-workspace' },
  { label: 'Web Apps and Internal Tools', href: '/solutions/web-apps' },
  { label: 'Websites that Convert', href: '/solutions/websites' },
  { label: 'Training and Enablement', href: '/solutions/training' },
];

type BotpressApi = {
  on?: (eventName: string, listener: () => void) => void;
  off?: (eventName: string, listener: () => void) => void;
  webchat?: {
    open?: () => void;
    close?: () => void;
  };
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
};

declare global {
  interface Window {
    botpress?: BotpressApi;
  }
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-bg0/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-[10px] font-[var(--font-jakarta)] text-sm font-semibold tracking-[0.18em]">
          <img src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" className="h-[44px] w-auto" />
          <span>RAPID RISE AI</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {siteContent.nav.items.map((item) => <Link key={item.href} href={item.href} className={cn('rounded-full px-3 py-2 text-sm transition', pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'bg-blue/15 text-blue' : 'text-text1 hover:text-text0')}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/quote" className="px-4 py-2">Request a Quote</Button>
          <button className="rounded-full border border-stroke p-2 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-4 w-4" /></button>
        </div>
      </Container>
      {open ? <div className="fixed inset-0 z-50 bg-black/70 md:hidden" onClick={() => setOpen(false)}><aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto border-l border-stroke bg-bg0 p-5" onClick={(e) => e.stopPropagation()}><div className="mb-4 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Menu</p><button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button></div><p className="mb-3 text-sm text-text2">Solutions</p><div className="space-y-2">{solutionLinks.map((link) => <Link className="block rounded-lg border border-stroke px-3 py-2 text-sm" key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</div><div className="mt-5 space-y-1">{siteContent.nav.items.map((item) => <Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" href="/book" onClick={() => setOpen(false)}>Book</Link></div></aside></div> : null}
    </header>
  );
}

export function Footer() {
  const f = siteContent.footer;
  return (
    <footer className="border-t border-stroke py-12">
      <Container className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-[var(--font-jakarta)] text-lg">{f.company}</p>
          <p className="mt-2 text-sm text-text1">{f.tagline}</p>
        </div>
        <div className="space-y-1 text-sm text-text1"><p>Email: {f.email}</p><p>Phone: {f.phone}</p><p>CIPC: {f.cipc}</p><p>{f.vat}</p></div>
        <div className="flex flex-wrap gap-4 text-sm text-text1">{f.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
      </Container>
    </footer>
  );
}

export function CookieBanner() {
  if (!CONFIG.analyticsEnabled) return null;
  return <div className="fixed inset-x-4 bottom-4 z-40 rounded-card border border-stroke bg-bg1 p-4 text-sm text-text1">This site uses cookies for analytics.</div>;
}

function closeBotpressIfOpen() {
  const botpress = window.botpress;

  botpress?.close?.();
  botpress?.webchat?.close?.();
}

export function BotpressLauncher() {
  useEffect(() => {
    let didSetDefaultClosed = false;

    const setDefaultClosed = () => {
      if (didSetDefaultClosed) return;

      closeBotpressIfOpen();
      didSetDefaultClosed = true;
    };

    const readyEvents = ['ready', 'webchat:ready', 'webchat:initialized'];
    readyEvents.forEach((eventName) => window.botpress?.on?.(eventName, setDefaultClosed));

    // Handle the case where Botpress is already ready by the time this effect runs.
    setDefaultClosed();

    return () => {
      readyEvents.forEach((eventName) => window.botpress?.off?.(eventName, setDefaultClosed));
    };
  }, []);

  return null;
}
