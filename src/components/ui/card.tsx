import { cn } from '@/lib/utils';

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('card-surface p-6 transition duration-300 max-[640px]:rounded-2xl max-[640px]:p-4', className)}>{children}</div>;
}
