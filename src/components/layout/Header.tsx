'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/siteContent';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

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
          {siteContent.nav.items.map((item) => (
            <Link key={item.href} href={item.href} className={cn('rounded-full px-3 py-2 text-sm transition', pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'bg-blue/15 text-blue' : 'text-text1 hover:text-text0')}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 max-md:gap-1.5">
          <Button href="/quote" className="px-4 py-2 max-md:hidden">Request a Quote</Button>
          <button className="rounded-full border border-stroke p-2 md:hidden max-md:flex max-md:h-11 max-md:w-11 max-md:items-center max-md:justify-center max-md:p-0" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-4 w-4 max-md:h-4 max-md:w-4" /></button>
        </div>
      </Container>
      <MobileMenu open={open} panelRef={panelRef} onClose={() => setOpen(false)} />
    </header>
  );
}
