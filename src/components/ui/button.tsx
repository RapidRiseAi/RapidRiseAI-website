import Link from 'next/link';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'bg-blue text-white hover:shadow-glow hover:brightness-110',
  secondary: 'bg-white/5 text-text0 border border-stroke hover:bg-white/10',
  ghost: 'bg-transparent text-text0 hover:bg-white/5',
};

export function Button({ href, children, variant = 'primary', className }: { href: string; children: React.ReactNode; variant?: keyof typeof styles; className?: string }) {
  return (
    <Link href={href} className={cn('inline-flex items-center justify-center rounded-button px-5 py-3 font-semibold transition', styles[variant], className)}>
      {children}
    </Link>
  );
}
