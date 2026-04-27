import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export function PrimaryButton({ href, children, className, loading }: ButtonProps) {
  return (
    <Link href={href} aria-disabled={loading} className={cn('group system-btn system-btn-primary', loading && 'pointer-events-none opacity-70', className)}>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SecondaryButton({ href, children, className }: ButtonProps) {
  return <Link href={href} className={cn('group system-btn system-btn-secondary', className)}>{children}</Link>;
}

export function GhostButton({ href, children, className }: ButtonProps) {
  return <Link href={href} className={cn('group system-btn system-btn-ghost', className)}>{children}</Link>;
}

export function IconButton({ href, icon, className, label }: { href: string; icon: React.ReactNode; className?: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className={cn('inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-secondary text-text-primary transition hover:border-border-blue hover:text-accent-primary', className)}>
      {icon}
    </Link>
  );
}
