import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'bg-blue text-white hover:brightness-110 hover:shadow-glow focus-visible:shadow-glow',
  secondary: 'border border-stroke bg-transparent text-text0 hover:bg-white/5',
  ghost: 'text-text1 hover:text-text0 hover:bg-white/5',
};

export function Button({ href, children, variant = 'primary', className, arrow = false }: { href: string; children: React.ReactNode; variant?: keyof typeof styles; className?: string; arrow?: boolean }) {
  return (
    <Link href={href} className={cn('inline-flex items-center justify-center gap-2 rounded-button px-5 py-3 text-sm font-semibold transition max-md:h-11 max-md:px-5 max-md:py-2.5 max-md:text-sm', styles[variant], className)}>
      {children}
      {arrow ? <ArrowRight className="h-4 w-4" /> : null}
    </Link>
  );
}
