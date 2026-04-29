import { cn } from '@/lib/utils';

function BaseCard({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <article className={cn('system-card p-4 md:p-5', className)}>{children}</article>;
}

export function GlassCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <BaseCard {...props} className={cn('bg-surface-primary/70', props.className)} />;
}

export function GlowCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <BaseCard {...props} className={cn('bg-surface-elevated/90 system-border-glow', props.className)} />;
}

export function FeatureCard({ icon, title, description, className }: { icon: React.ReactNode; title: string; description: string; className?: string }) {
  return (
    <GlowCard className={cn('space-y-3', className)}>
      <div className="inline-flex rounded-xl border border-border-blue/45 bg-accent-primary/10 p-2.5 text-accent-primary">{icon}</div>
      <h3 className="text-system-h3">{title}</h3>
      <p className="text-system-body text-text-secondary">{description}</p>
    </GlowCard>
  );
}

export function VisualCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <GlassCard {...props} className={cn('overflow-hidden', props.className)} />;
}

export function ProofCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <GlassCard {...props} className={cn('border-border-strong/80', props.className)} />;
}

export function PricingCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <GlassCard {...props} className={cn('relative', props.className)} />;
}

export function FormCard(props: React.PropsWithChildren<{ className?: string }>) {
  return <GlassCard {...props} className={cn('backdrop-blur-xl', props.className)} />;
}

export function MetricCard({ label, value, trend, className }: { label: string; value: string; trend?: string; className?: string }) {
  return (
    <GlassCard className={cn('space-y-2', className)}>
      <p className="text-system-micro text-text-muted">{label}</p>
      <p className="text-2xl font-semibold text-text-primary md:text-3xl">{value}</p>
      {trend ? <p className="text-system-micro text-accent-success">{trend}</p> : null}
    </GlassCard>
  );
}
