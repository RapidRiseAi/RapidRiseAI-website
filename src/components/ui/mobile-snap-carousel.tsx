'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function MobileSnapCarousel({
  children,
  className,
  itemClassName,
  showPagination = true,
  desktopClassName,
}: React.PropsWithChildren<{ className?: string; itemClassName?: string; showPagination?: boolean; desktopClassName?: string }>) {
  const items = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const setMobile = () => setIsMobile(media.matches);
    setMobile();
    media.addEventListener('change', setMobile);
    return () => media.removeEventListener('change', setMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !viewportRef.current) return;

    const cards = viewportRef.current.querySelectorAll<HTMLElement>('[data-carousel-item="true"]');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;
        const nextIndex = Number(mostVisible.target.getAttribute('data-carousel-index') ?? 0);
        if (Number.isFinite(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        root: viewportRef.current,
        threshold: [0.55, 0.8, 1],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [items.length, isMobile]);

  return (
    <div className={cn('relative -mx-4 md:mx-0', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-bg0/70 to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-bg0/70 to-transparent md:hidden" />
      <div ref={viewportRef} className={cn('flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:px-0', desktopClassName)}>
        <div aria-hidden className="w-[5%] shrink-0 md:hidden" />
        {items.map((item, index) => (
          <div key={index} data-carousel-item="true" data-carousel-index={index} className={cn('w-[85%] shrink-0 snap-center md:w-auto md:shrink md:snap-none', itemClassName)}>
            {item}
          </div>
        ))}
        <div aria-hidden className="w-[5%] shrink-0 md:hidden" />
      </div>
      {isMobile && showPagination && items.length > 1 ? (
        <div className="mt-2.5 flex items-center justify-center gap-1.5 md:hidden" aria-hidden>
          {items.map((_, index) => (
            <span key={index} className={cn('h-1.5 rounded-full transition-all', activeIndex === index ? 'w-5 bg-blue' : 'w-1.5 bg-white/30')} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
