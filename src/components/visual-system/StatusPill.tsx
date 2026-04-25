import { Pill } from '@/components/ui/pill';

export function StatusPill({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <Pill className={`border-blue/40 bg-blue/10 text-blue ${className}`}>{children}</Pill>;
}
