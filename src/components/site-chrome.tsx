'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, X } from 'lucide-react';
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

type BotpressWebChatController = {
  sendEvent?: (event: { type: string }) => void;
  on?: (eventName: string, listener: () => void) => void;
  off?: (eventName: string, listener: () => void) => void;
};

declare global {
  interface Window {
    botpress?: BotpressApi;
    botpressWebChat?: BotpressWebChatController;
  }
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-bg0/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3 max-md:h-12 max-md:gap-2">
        <Link href="/" className="inline-flex items-center gap-[10px] font-[var(--font-jakarta)] text-sm font-semibold tracking-[0.18em] max-md:gap-2">
          <img src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" className="h-[44px] w-auto max-md:h-8" />
          <span className="brand-wordmark">RAPID RISE AI</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {siteContent.nav.items.map((item) => <Link key={item.href} href={item.href} className={cn('rounded-full px-3 py-2 text-sm transition', pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'bg-blue/15 text-blue' : 'text-text1 hover:text-text0')}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 max-md:gap-1.5">
          <Button href="/quote" className="px-4 py-2 max-md:px-2.5 max-md:py-1.5 max-md:text-xs">Request a Quote</Button>
          <button className="rounded-full border border-stroke p-2 md:hidden max-md:p-1.5" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-4 w-4 max-md:h-3.5 max-md:w-3.5" /></button>
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

export function BotpressLauncher() {
  const [isOpening, setIsOpening] = useState(false);
  const fallbackShareUrl = CONFIG.botpressShareUrl || CONFIG.botpressEmbedUrl;

  useEffect(() => {
    window.botpressWebChat?.sendEvent?.({ type: 'hide' });

    return () => {
      window.botpressWebChat?.sendEvent?.({ type: 'hide' });
    };
  }, []);

  const openWithRetry = async () => {
    setIsOpening(true);
    const started = Date.now();
    while (Date.now() - started <= 3000) {
      if (window.botpressWebChat?.sendEvent) {
        window.botpressWebChat.sendEvent({ type: 'show' });
        setIsOpening(false);
        return;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 200));
    }
    if (fallbackShareUrl) {
      window.open(fallbackShareUrl, '_blank', 'noopener,noreferrer');
    }
    setIsOpening(false);
  };

  return (
    <button
      type="button"
      onClick={() => void openWithRetry()}
      aria-label="Open chat"
      className="fixed right-4 z-[120] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-blue text-white shadow-lg shadow-blue/25 transition hover:bg-[#1f6ff2] md:hidden"
      style={{ bottom: 'calc(var(--mobile-cta-bar-height, 0px) + env(safe-area-inset-bottom) + 1rem)' }}
    >
      {isOpening ? <span className="text-xs">...</span> : <MessageCircle className="h-5 w-5" />}
    </button>
  );
}

export function MobileStickyCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    setShow(false);

    const hero = document.querySelector('main section.hero-padding');
    const bar = document.getElementById('mobile-sticky-cta-bar');
    const setBarHeight = () => {
      if (!bar) return;
      document.documentElement.style.setProperty('--mobile-cta-bar-height', `${bar.offsetHeight}px`);
    };

    setBarHeight();
    const resizeObserver = bar ? new ResizeObserver(setBarHeight) : null;
    if (bar && resizeObserver) resizeObserver.observe(bar);

    if (!hero) {
      setShow(true);
      return () => {
        resizeObserver?.disconnect();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(hero);
    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      id="mobile-sticky-cta-bar"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[110] border-t border-stroke bg-bg0/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl transition duration-200 md:hidden',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <Container className="px-0">
        <div className="space-y-2">
          <Button href="/quote" className="w-full justify-center">
            Request a Quote
          </Button>
          <Link href="/work" className="block text-center text-sm font-medium text-text1 underline-offset-4 transition hover:text-text0 hover:underline">
            View Work
          </Link>
        </div>
      </Container>
    </div>
  );
}
