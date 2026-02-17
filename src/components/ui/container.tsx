import { cn } from '@/lib/utils';

export function Container({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('mx-auto w-full max-w-content px-4 md:px-8', className)}>{children}</div>;
}
