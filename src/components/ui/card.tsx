import { cn } from '@/lib/utils';

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('card-surface p-6 transition duration-300 hover:-translate-y-1', className)}>{children}</div>;
}
