'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { CONFIG } from '@/lib/config';

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
      ? new IntersectionObserver(([entry]) => {
          setPastHero(!entry.isIntersecting);
        }, { threshold: 0.15 })
      : null;

    if (hero && heroObserver) {
      heroObserver.observe(hero);
    }

    const footerObserver = footer
      ? new IntersectionObserver(([entry]) => {
          setNearFooter(entry.isIntersecting);
        }, { threshold: 0.08 })
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

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <MobileStickyCtaBar />
      <BotpressLauncher />
    </>
  );
}
