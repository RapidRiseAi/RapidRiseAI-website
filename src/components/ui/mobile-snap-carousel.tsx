import { cn } from '@/lib/utils';

export function MobileSnapCarousel({
  children,
  className,
  itemClassName,
}: React.PropsWithChildren<{ className?: string; itemClassName?: string }>) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={cn('relative -mx-4 md:mx-0', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg0 to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg0 to-transparent md:hidden" />
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:px-0">
        {items.map((item, index) => (
          <div key={index} className={cn('w-[84%] shrink-0 snap-start md:w-auto md:shrink md:snap-none', itemClassName)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
