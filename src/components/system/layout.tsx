import { cn } from '@/lib/utils';

export function SiteShell({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('relative isolate overflow-hidden', className)}>{children}</div>;
}

export function Container({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('mx-auto w-full max-w-content px-4 md:px-8', className)}>{children}</div>;
}

export function SectionShell({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn('section-padding relative', className)}>{children}</section>;
}

export function PageHero({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn('hero-padding relative overflow-hidden', className)}>{children}</section>;
}

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? <p className="text-system-eyebrow text-accent-secondary">{eyebrow}</p> : null}
      <h2 className="mt-3 text-system-h2 text-text-primary">{title}</h2>
      {description ? <p className="mt-4 text-system-body text-text-secondary">{description}</p> : null}
    </div>
  );
}

export function SplitLayout({ left, right, className }: { left: React.ReactNode; right: React.ReactNode; className?: string }) {
  return <div className={cn('grid gap-5 lg:grid-cols-2 lg:gap-8', className)}>{left}{right}</div>;
}

export function BentoGrid({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-12', className)}>{children}</div>;
}

export function StickyScrollLayout({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('grid gap-4 lg:grid-cols-[1.2fr_0.8fr] [&>*:last-child]:lg:sticky [&>*:last-child]:lg:top-24', className)}>{children}</div>;
}

export function VisualPanel({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('system-glass-panel rounded-[22px] p-4 md:p-6', className)}>{children}</div>;
}

export function CTASection({ title, description, actions, className }: { title: string; description: string; actions: React.ReactNode; className?: string }) {
  return (
    <SectionShell className={className}>
      <Container>
        <VisualPanel className="border-border-blue/50">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-system-eyebrow text-accent-primary">System ready</p>
              <h2 className="mt-2 text-system-h2">{title}</h2>
              <p className="mt-3 text-system-body text-text-secondary">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">{actions}</div>
          </div>
        </VisualPanel>
      </Container>
    </SectionShell>
  );
}
