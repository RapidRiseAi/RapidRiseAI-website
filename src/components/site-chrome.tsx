'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, BriefcaseBusiness, CircleDot, Contact2, GraduationCap, Home, Layers, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { siteContent } from '@/content/siteContent';
import { cn } from '@/lib/utils';
import { CONFIG } from '@/lib/config';

const desktopNav = [
  { label: 'Solutions', href: '/solutions', micro: 'System Library' },
  { label: 'Work', href: '/work', micro: 'Proof Gallery' },
  { label: 'Pricing', href: '/products/pricing', micro: 'Build Options' },
  { label: 'Education', href: '/education', micro: 'Training Layer' },
  { label: 'About', href: '/about', micro: 'Operating Philosophy' },
  { label: 'Contact', href: '/contact', micro: 'Message Us' },
];

const mobileMenuItems = [
  { href: '/', title: 'Home', label: 'Command Center', micro: 'See the system in action', icon: Home },
  { href: '/solutions', title: 'Solutions', label: 'System Library', micro: 'Pick the leak to fix', icon: Layers },
  { href: '/work', title: 'Work', label: 'Proof Gallery', micro: 'View builds and demos', icon: BriefcaseBusiness },
  { href: '/products/pricing', title: 'Pricing', label: 'Build Options', micro: 'Fixed products and custom scope', icon: Sparkles },
  { href: '/education', title: 'Education', label: 'Training Layer', micro: 'Help your team adopt modern tools', icon: GraduationCap },
  { href: '/about', title: 'About', label: 'Operating Philosophy', micro: 'How we build', icon: BookOpen },
  { href: '/contact', title: 'Contact', label: 'Message Us', micro: 'Ask a question', icon: Contact2 },
  { href: '/quote', title: 'Quote', label: 'Start a Build', micro: 'Request a clear scope', icon: ArrowRight },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;
    document.body.dataset.mobileMenuOpen = open ? 'true' : 'false';
    window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open } }));

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (open) firstFocusable?.focus();
    if (!open) menuButtonRef.current?.focus();

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
    const onTabTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onEsc);
    window.addEventListener('keydown', onTabTrap);
    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('keydown', onTabTrap);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[120] px-2 pt-2 md:px-4">
      <Container
        className={cn(
          'relative flex h-16 items-center justify-between gap-3 rounded-2xl border border-transparent transition-all duration-300 max-md:h-[58px] max-md:gap-2',
          scrolled ? 'border-border-subtle bg-surface-primary/85 shadow-[0_12px_36px_rgba(0,0,0,0.38)] backdrop-blur-xl' : 'bg-background-primary/70',
        )}
      >
        <Link href="/" className="inline-flex items-center gap-[10px] rounded-lg px-2 py-1 font-[var(--font-jakarta)] text-sm font-semibold tracking-[0.18em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary max-md:gap-1.5">
          <img src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" className="h-[44px] w-auto max-md:h-7" />
          <span className="brand-wordmark">RAPID RISE AI</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {desktopNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
                  isActive ? 'text-accent-primary' : 'text-text1 hover:text-text0',
                )}
              >
                <span>{item.label}</span>
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-accent-primary/70 opacity-0 transition group-hover:opacity-100" />
                <span className={cn('pointer-events-none absolute left-1/2 top-[calc(100%+2px)] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-primary transition', isActive ? 'opacity-100' : 'opacity-0')} />
                <span className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-border-subtle bg-background-secondary px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-text-muted group-hover:block">
                  {item.micro}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 max-md:gap-1.5">
          <div className="hidden items-center gap-2 rounded-full border border-border-subtle bg-surface-secondary/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-text2 lg:inline-flex">
            <CircleDot className="h-3.5 w-3.5 animate-pulse text-accent-success" />
            Response within 24h
          </div>
          <Button href="/quote" className="px-4 py-2 max-md:hidden">Request a Quote</Button>
          <button
            ref={menuButtonRef}
            className="relative rounded-full border border-stroke p-2 md:hidden max-md:flex max-md:h-11 max-md:w-11 max-md:items-center max-md:justify-center max-md:p-0"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-system-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={cn('absolute h-[1.5px] w-5 bg-white transition', open ? 'rotate-45' : '-translate-y-[5px]')} />
            <span className={cn('absolute h-[1.5px] w-5 bg-white transition', open ? 'opacity-0' : 'opacity-100')} />
            <span className={cn('absolute h-[1.5px] w-5 bg-white transition', open ? '-rotate-45' : 'translate-y-[5px]')} />
          </button>
        </div>
      </Container>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/70 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          >
            <motion.aside
              id="mobile-system-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: 16, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-2 overflow-y-auto rounded-2xl border border-border-subtle bg-background-primary/95 p-4 pb-[calc(env(safe-area-inset-bottom)+1.1rem)] backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-system-eyebrow text-accent-primary">System menu</p>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-secondary/70 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-text2">
                  <CircleDot className="h-3 w-3 animate-pulse text-accent-success" />
                  Systems open
                </div>
              </div>
              <div className="grid gap-2.5">
                {mobileMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.02 * index }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'group flex items-center gap-3 rounded-2xl border p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
                          active ? 'border-border-blue bg-accent-primary/10' : 'border-border-subtle bg-surface-primary/70',
                        )}
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-secondary text-accent-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-text-primary">{item.title}</span>
                          <span className="block text-[11px] uppercase tracking-[0.16em] text-accent-secondary">{item.label}</span>
                          <span className="mt-1 block text-sm text-text-secondary">{item.micro}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-accent-primary" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-4 rounded-2xl border border-border-subtle bg-surface-secondary/60 p-3"
              >
                <Button href="/quote" className="h-12 w-full justify-center">Request a Quote</Button>
                <div className="mt-3 text-sm text-text-secondary">
                  <p>team@rapidriseai.com</p>
                  <p>+27 64 903 1234</p>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let stickyVisible = false;

    const applyBotpressOffset = () => {
      const host = document.querySelector<HTMLElement>('#fab-root');
      const shadow = host?.shadowRoot;
      const fabWrapper = shadow?.querySelector<HTMLElement>('.bpFabWrapper');
      const messagePreview = shadow?.querySelector<HTMLElement>('#message-preview-root');

      if (!fabWrapper) return;

      if (window.innerWidth >= 768 || !stickyVisible) {
        fabWrapper.style.removeProperty('bottom');
        messagePreview?.style.removeProperty('bottom');
        return;
      }

      const barHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--mobile-cta-bar-height')
        .trim() || '0px';
      const launcherBottom = `calc(${barHeight} + env(safe-area-inset-bottom) + 16px)`;

      fabWrapper.style.setProperty('bottom', launcherBottom, 'important');
      messagePreview?.style.setProperty('bottom', `calc(${launcherBottom} + 76px)`, 'important');
    };

    const handleCtaVisibility = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible: boolean }>;
      stickyVisible = Boolean(customEvent.detail?.visible);
      applyBotpressOffset();
    };

    window.addEventListener('mobile-sticky-cta-visibility', handleCtaVisibility);

    const intervalId = window.setInterval(applyBotpressOffset, 500);
    applyBotpressOffset();

    return () => {
      window.removeEventListener('mobile-sticky-cta-visibility', handleCtaVisibility);
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
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

  if (pathname === '/') {
    return null;
  }

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
