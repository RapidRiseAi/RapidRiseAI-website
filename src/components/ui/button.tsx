import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'system-btn system-btn-primary',
  secondary: 'system-btn system-btn-secondary',
  ghost: 'system-btn system-btn-ghost',
};

export function Button({ href, children, variant = 'primary', className, arrow = false }: { href: string; children: React.ReactNode; variant?: keyof typeof styles; className?: string; arrow?: boolean }) {
  return (
    <Link href={href} className={cn('group', styles[variant], 'max-[640px]:h-12 max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-sm', className)}>
      {children}
      {arrow ? <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /> : null}
    </Link>
  );
}
