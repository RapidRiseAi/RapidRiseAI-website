'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;
    document.body.dataset.mobileMenuOpen = open ? 'true' : 'false';
    window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open } }));

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (open) firstFocusable?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.dataset.mobileMenuOpen = 'false';
      window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: false } }));
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-bg0/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3 max-md:h-[58px] max-md:gap-2">
        <Link href="/" className="inline-flex items-center gap-[10px] font-[var(--font-jakarta)] text-sm font-semibold tracking-[0.18em] max-md:gap-1.5">
          <img src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" className="h-[44px] w-auto max-md:h-7" />
          <span className="brand-wordmark">RAPID RISE AI</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {siteContent.nav.items.map((item) => <Link key={item.href} href={item.href} className={cn('rounded-full px-3 py-2 text-sm transition', pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'bg-blue/15 text-blue' : 'text-text1 hover:text-text0')}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 max-md:gap-1.5">
          <Button href="/quote" className="px-4 py-2 max-md:h-9 max-md:px-3.5 max-md:py-1 max-md:text-[13px]">Request a Quote</Button>
          <button className="rounded-full border border-stroke p-2 md:hidden max-md:flex max-md:h-11 max-md:w-11 max-md:items-center max-md:justify-center max-md:p-0" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-4 w-4 max-md:h-4 max-md:w-4" /></button>
        </div>
      </Container>
      {open ? (
        <div className="fixed inset-0 z-[140] bg-black/70 md:hidden" onClick={() => setOpen(false)} aria-hidden="true">
          <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="absolute right-0 top-0 h-[100dvh] w-[88%] max-w-sm overflow-y-auto border-l border-stroke bg-bg0 p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Menu</p>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-1 hover:bg-white/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-text2">Solutions</p>
            <div className="space-y-2">
              {solutionLinks.map((link) => (
                <Link className="block rounded-lg border border-stroke px-3 py-2 text-sm" key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 space-y-1">
              {siteContent.nav.items.map((item) => (
                <Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" href="/book" onClick={() => setOpen(false)}>
                Book
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false);
  const fallbackShareUrl = CONFIG.botpressShareUrl || CONFIG.botpressEmbedUrl;

  useEffect(() => {
    window.botpressWebChat?.sendEvent?.({ type: 'hide' });

    return () => {
      window.botpressWebChat?.sendEvent?.({ type: 'hide' });
    };
  }, []);

  useEffect(() => {
    const handleMenuEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      setMenuOpen(Boolean(customEvent.detail?.open));
    };

    setMenuOpen(document.body.dataset.mobileMenuOpen === 'true');
    window.addEventListener('mobile-menu-state', handleMenuEvent);
    return () => {
      window.removeEventListener('mobile-menu-state', handleMenuEvent);
    };
  }, []);


  useEffect(() => {
    const handleStickyCtaEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible: boolean }>;
      setStickyCtaVisible(Boolean(customEvent.detail?.visible));
    };

    window.addEventListener('mobile-sticky-cta-visibility', handleStickyCtaEvent);
    return () => {
      window.removeEventListener('mobile-sticky-cta-visibility', handleStickyCtaEvent);
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
      className={cn(
        'fixed right-4 z-[125] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-blue text-white shadow-lg shadow-blue/25 transition hover:bg-[#1f6ff2] md:hidden',
        menuOpen || stickyCtaVisible ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
      style={{ bottom: 'calc(var(--mobile-cta-bar-height, 0px) + env(safe-area-inset-bottom) + 1rem)' }}
    >
      {isOpening ? <span className="text-xs">...</span> : <MessageCircle className="h-5 w-5" />}
    </button>
  );
}

export function MobileStickyCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const handleMenuEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      setMenuOpen(Boolean(customEvent.detail?.open));
    };

    setMenuOpen(document.body.dataset.mobileMenuOpen === 'true');
    window.addEventListener('mobile-menu-state', handleMenuEvent);
    return () => {
      window.removeEventListener('mobile-menu-state', handleMenuEvent);
    };
  }, []);

  useEffect(() => {
    const nextVisible = pastHero && !menuOpen && !nearFooter;
    setShow(nextVisible);
    window.dispatchEvent(new CustomEvent('mobile-sticky-cta-visibility', { detail: { visible: nextVisible } }));
  }, [menuOpen, nearFooter, pastHero]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    setPastHero(false);

    const hero = document.getElementById('home-hero') ?? document.querySelector('main section.hero-padding');
    const footer = document.querySelector('footer');
    const bar = document.getElementById('mobile-sticky-cta-bar');
    const setBarHeight = () => {
      if (!bar) return;
      document.documentElement.style.setProperty('--mobile-cta-bar-height', `${bar.offsetHeight}px`);
    };

    setBarHeight();
    const resizeObserver = bar ? new ResizeObserver(setBarHeight) : null;
    if (bar && resizeObserver) resizeObserver.observe(bar);

    if (!hero) {
      setPastHero(true);
    }

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            setPastHero(!entry.isIntersecting);
          },
          { threshold: 0.15 },
        )
      : null;

    if (hero && heroObserver) {
      heroObserver.observe(hero);
    }

    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => {
            setNearFooter(entry.isIntersecting);
          },
          { threshold: 0.08 },
        )
      : null;

    if (footer && footerObserver) {
      footerObserver.observe(footer);
    }

    return () => {
      heroObserver?.disconnect();
      footerObserver?.disconnect();
      resizeObserver?.disconnect();
      window.dispatchEvent(new CustomEvent('mobile-sticky-cta-visibility', { detail: { visible: false } }));
    };
  }, [pathname]);

  return (
    <div
      id="mobile-sticky-cta-bar"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[110] border-t border-stroke bg-bg0/85 px-4 pb-[calc(env(safe-area-inset-bottom)+0.45rem)] pt-2 backdrop-blur-xl transition duration-200 md:hidden',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <Container className="px-0">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-bg1/65 px-3 py-2">
          <Button href="/quote" className="h-12 flex-1 justify-center px-4 text-sm">
            Request a Quote
          </Button>
          <Link href="/work" className="inline-flex min-h-11 items-center justify-center py-1 text-sm font-medium text-text1 underline-offset-4 transition hover:text-text0 hover:underline">
            View Work
          </Link>
        </div>
      </Container>
    </div>
  );
}
