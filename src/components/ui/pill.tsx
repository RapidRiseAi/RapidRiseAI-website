import { cn } from '@/lib/utils';

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('chip border-stroke text-text1', className)}>{children}</span>;
}
