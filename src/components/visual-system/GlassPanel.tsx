import { Card } from '@/components/ui/card';

export function GlassPanel({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <Card className={`bg-bg1/70 backdrop-blur-xl ${className}`}>{children}</Card>;
}
