'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
  isOpen?: boolean | (() => boolean);
  webchat?: {
    open?: () => void;
    close?: () => void;
    isOpen?: boolean | (() => boolean);
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
          <span className="brand-wordmark">RAPID RISE AI</span>
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

function enforceBotpressFabVisibility() {
  const host = document.querySelector<HTMLElement>('#fab-root');
  const shadowRoot = host?.shadowRoot;
  const launcher = shadowRoot?.querySelector<HTMLElement>('.bpFabWrapper, .bpFab, #fab-root');

  if (!host || !launcher) return false;

  const hostStyle = window.getComputedStyle(host);
  const launcherStyle = window.getComputedStyle(launcher);
  const rect = launcher.getBoundingClientRect();

  const hasGeometry = rect.width >= 36 && rect.height >= 36;
  const styleVisible = launcherStyle.visibility !== 'hidden' && launcherStyle.display !== 'none' && launcherStyle.opacity !== '0';
  const hostVisible = hostStyle.visibility !== 'hidden' && hostStyle.display !== 'none';

  return hasGeometry && styleVisible && hostVisible;
}

export function BotpressLauncher() {
  const [showFallback, setShowFallback] = useState(false);
  const readyEvents = useMemo(() => ['ready', 'webchat:ready', 'webchat:initialized'], []);
  const fallbackGracePeriodMs = 6000;
  const visibilityPollMs = 500;
  const requiredStableSamples = 2;

  useEffect(() => {
    const bootStartedAt = Date.now();
    let lastCandidate = false;
    let stableSamples = 0;

    const syncFallbackVisibility = () => {
      const nativeVisible = enforceBotpressFabVisibility();

      if (nativeVisible) {
        lastCandidate = false;
        stableSamples = 0;
        setShowFallback(false);
        return;
      }

      const afterGracePeriod = Date.now() - bootStartedAt >= fallbackGracePeriodMs;
      const shouldShowFallback = afterGracePeriod && !nativeVisible;

      if (shouldShowFallback !== lastCandidate) {
        lastCandidate = shouldShowFallback;
        stableSamples = 1;
        return;
      }

      stableSamples += 1;
      if (stableSamples >= requiredStableSamples) {
        setShowFallback(shouldShowFallback);
      }
    };

    const interval = window.setInterval(syncFallbackVisibility, visibilityPollMs);
    syncFallbackVisibility();

    readyEvents.forEach((eventName) => window.botpress?.on?.(eventName, syncFallbackVisibility));

    const observer = new MutationObserver(syncFallbackVisibility);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    window.addEventListener('resize', syncFallbackVisibility);

    const onVisibilityChange = () => {
      if (!document.hidden) syncFallbackVisibility();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      readyEvents.forEach((eventName) => window.botpress?.off?.(eventName, syncFallbackVisibility));
      window.clearInterval(interval);
      window.removeEventListener('resize', syncFallbackVisibility);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, [readyEvents, fallbackGracePeriodMs, requiredStableSamples, visibilityPollMs]);

  const openBotpress = () => {
    const chatApi = window.botpress?.webchat;
    chatApi?.open?.();
    if (!chatApi?.open) {
      window.botpress?.open?.();
    }
    if (!chatApi?.open && !window.botpress?.open) {
      window.botpress?.toggle?.();
    }
  };

  if (!showFallback) return null;

  return (
    <button
      type="button"
      onClick={openBotpress}
      aria-label="Open chat"
      className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-blue px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/30 transition hover:bg-[#1f6ff2]"
    >
      Chat with us
    </button>
  );
}
