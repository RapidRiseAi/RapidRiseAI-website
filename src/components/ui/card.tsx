import { cn } from '@/lib/utils';

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('card-surface p-6 transition duration-300 max-[640px]:rounded-2xl max-[640px]:p-4 max-[640px]:hover:translate-y-0 md:hover:-translate-y-1', className)}>{children}</div>;
}
