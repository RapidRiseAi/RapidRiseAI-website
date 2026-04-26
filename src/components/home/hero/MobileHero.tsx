import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';
import { heroCopy, trustItems } from './HeroData';
import { MobileOperationsPreview } from './MobileOperationsPreview';

export function MobileHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#030917] px-4 pb-10 pt-4 sm:px-5 xl:hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24),transparent_70%)]" />

      <div className="relative mx-auto max-w-[520px] rounded-[28px] border border-white/15 bg-slate-950/55 p-4 shadow-[0_16px_50px_rgba(2,6,23,0.72)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" width={38} height={38} className="h-9 w-auto" />
            <span className="text-[1.9rem] font-semibold tracking-[0.08em] text-white">RAPID RISE AI</span>
          </Link>
          <button type="button" aria-label="Open menu" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-900/75 text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="pt-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-cyan-300">{heroCopy.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.8rem,12vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            {heroCopy.headlineLead}
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{heroCopy.headlineAccent}</span>
          </h1>
          <p className="mt-4 max-w-[96%] text-[1.88rem] leading-[1.32] text-slate-300">{heroCopy.body}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={heroCopy.primaryCta.href}
              className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl border border-blue-400/50 bg-gradient-to-r from-blue-500 to-blue-600 px-5 text-[1.95rem] font-medium text-white shadow-[0_0_30px_rgba(37,99,235,0.34)]"
            >
              {heroCopy.primaryCta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href={heroCopy.secondaryCta.href} className="inline-flex min-h-[58px] w-full items-center justify-center rounded-2xl border border-white/20 bg-slate-900/65 px-5 text-[1.95rem] font-medium text-white">
              {heroCopy.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/55 px-3 py-2.5">
                  <Icon className={`h-4 w-4 ${item.accent}`} />
                  <span className="text-sm text-slate-300">{item.label}</span>
                </div>
              );
            })}
          </div>

          <MobileOperationsPreview />
        </div>
      </div>

      <div className="pointer-events-none relative mx-auto mt-5 h-12 max-w-[520px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.5),transparent_70%)]" />
    </section>
  );
}
