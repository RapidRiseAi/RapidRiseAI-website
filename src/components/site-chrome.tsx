'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, ArrowRight, BookOpen, BriefcaseBusiness, Building2, CircleDot, Contact2, GraduationCap, Home, Layers, Mail, Phone, ReceiptText, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from './ui/container';
import { Button } from './ui/button';
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
  if (pathname === '/') return null;
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

const footerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Process', href: '/#delivery-timeline-title' },
  { label: 'Pricing', href: '/products/pricing' },
  { label: 'Contact', href: '/contact' },
];

const footerSystems = [
  { label: 'Lead Capture and Follow Up', href: '/solutions/lead-capture' },
  { label: 'Workflow Automation', href: '/solutions/workflow-automation' },
  { label: 'Smart Google Workspace', href: '/solutions/google-workspace' },
  { label: 'Web Apps and Internal Tools', href: '/solutions/web-apps' },
  { label: 'Websites that Convert', href: '/solutions/websites' },
  { label: 'Training and Enablement', href: '/solutions/training' },
  { label: 'Support Assistant', href: '/solutions/lead-capture' },
];

const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

const companyDetailRows = [
  { label: 'Email', value: 'team@rapidriseai.com', href: 'mailto:team@rapidriseai.com', icon: Mail },
  { label: 'Phone', value: '+27 64 903 1234', href: 'tel:+27649031234', icon: Phone },
  { label: 'CIPC', value: '2024/727338/07', icon: Building2 },
  { label: 'VAT', value: 'Not VAT registered', icon: ReceiptText },
];

function FooterLinkColumn({ title, links, ariaLabel }: { title: string; links: Array<{ label: string; href: string }>; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className="space-y-4">
      <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-200/78">{title}</h2>
      <ul className="grid gap-3 text-sm text-slate-400">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <Link href={link.href} className="group inline-flex items-center gap-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 rounded-md">
              <span className="h-px w-0 bg-cyan-200 transition-all duration-200 group-hover:w-3" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterCompanyRecord() {
  return (
    <div className="mt-6 rounded-[24px] border border-cyan-300/16 bg-[rgba(4,13,28,0.72)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/76">Company record</p>
          <p className="mt-1 text-sm font-semibold text-white">Rapid Rise AI (Pty) Ltd</p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/24 bg-emerald-300/10 text-emerald-100">
          <ShieldCheck className="h-[18px] w-[18px]" />
        </span>
      </div>
      <div className="grid gap-3">
        {companyDetailRows.map(({ label, value, href, icon: Icon }) => {
          const content = (
            <>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-300/14 bg-cyan-300/8 text-cyan-100"><Icon className="h-4 w-4" /></span>
              <span>
                <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-slate-500">{label}</span>
                <span className="mt-0.5 block text-sm font-medium text-slate-200">{value}</span>
              </span>
            </>
          );

          return href ? (
            <a key={label} href={href} className="flex items-center gap-3 rounded-2xl border border-transparent p-1.5 transition hover:border-cyan-300/16 hover:bg-cyan-300/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
              {content}
            </a>
          ) : (
            <div key={label} className="flex items-center gap-3 p-1.5">{content}</div>
          );
        })}
      </div>
    </div>
  );
}

function FooterCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/24 bg-[radial-gradient(circle_at_72%_18%,rgba(0,180,255,0.12),transparent_36%),linear-gradient(180deg,rgba(6,18,34,0.94),rgba(2,8,18,0.98))] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.40),0_0_40px_rgba(0,145,255,0.10),inset_0_1px_0_rgba(255,255,255,0.06)] lg:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.62rem] font-semibold text-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(51,230,138,0.72)]" /> Systems built for real operations
        </span>
        <h2 className="mt-5 text-2xl font-semibold leading-tight text-white">Ready to fix the manual work?</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">Send the bottleneck. We will recommend the cleanest next step.</p>
        <Link href="/quote" className="group mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] px-5 text-sm font-bold text-white shadow-[0_14px_38px_rgba(14,165,255,0.30),inset_0_1px_0_rgba(255,255,255,0.34)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
          Request a Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
        <Link href="/work" className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-cyan-300/22 bg-white/[0.035] text-sm font-semibold text-slate-200 transition hover:border-cyan-200/56 hover:bg-cyan-300/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
          View Work
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8% 0px -8% 0px' },
    transition: { duration: reduceMotion ? 0 : 0.48, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer className="relative overflow-hidden border-t border-cyan-300/16 bg-[radial-gradient(circle_at_82%_20%,rgba(0,145,255,0.12),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(0,220,255,0.05),transparent_32%),#01050D] text-white shadow-[inset_0_1px_0_rgba(120,220,255,0.10),inset_0_32px_80px_rgba(0,145,255,0.05)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
      <div className="pointer-events-none absolute right-[8%] top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <Container className="relative py-16 lg:py-22">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div {...reveal(0.12)} className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
              <img src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" className="h-12 w-auto" />
              <span className="font-[var(--font-jakarta)] text-sm font-semibold uppercase tracking-[0.20em] text-white">Rapid Rise AI</span>
            </Link>
            <h2 className="mt-6 text-xl font-semibold text-white">Rapid Rise AI (Pty) Ltd</h2>
            <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-slate-300">Business automation and software systems</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/16 bg-[rgba(4,13,28,0.70)] px-3 py-2 text-sm font-semibold text-slate-200">
              <Activity className="h-4 w-4 text-cyan-200" /> Systems built for real operations
            </div>
            <FooterCompanyRecord />
          </motion.div>

          <motion.div {...reveal(0.22)} className="lg:col-span-2">
            <FooterLinkColumn title="Navigation" ariaLabel="Footer navigation" links={footerNavigation} />
          </motion.div>

          <motion.div {...reveal(0.32)} className="lg:col-span-3">
            <FooterLinkColumn title="Systems" ariaLabel="Footer systems" links={footerSystems} />
          </motion.div>

          <motion.div {...reveal(0.42)} className="order-first lg:order-none lg:col-span-3">
            <FooterCtaCard />
          </motion.div>
        </div>

        <div className="mt-12 border-t border-cyan-200/10 pt-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm leading-relaxed text-slate-500">
              <p>© {currentYear} Rapid Rise AI (Pty) Ltd. All rights reserved.</p>
              <p className="mt-1">Built around real business workflows.</p>
            </div>
            <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              {footerLegalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 rounded-md">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
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
