import { cn } from '@/lib/utils';

export function AnimatedGridBackground({ className }: { className?: string }) {
  return <div aria-hidden className={cn('pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]', className)} />;
}

export function RadialGlow({ className }: { className?: string }) {
  return <div aria-hidden className={cn('pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-glow-blue blur-3xl', className)} />;
}

export function NoiseTextureOverlay({ className }: { className?: string }) {
  return <div aria-hidden className={cn('pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:3px_3px]', className)} />;
}

export function SectionDividerGlow({ className }: { className?: string }) {
  return <div aria-hidden className={cn('mx-auto h-px w-full max-w-content bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent', className)} />;
}

export function SystemLinePattern({ className }: { className?: string }) {
  return <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(90deg,transparent,rgba(45,124,255,0.32),transparent)] opacity-70', className)} />;
}
