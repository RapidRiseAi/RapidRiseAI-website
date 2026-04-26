import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DesktopOperationsPreview } from './DesktopOperationsPreview';
import { heroCopy, navItems, trustItems } from './HeroData';
import { ImpactSnapshotDesktop } from './ImpactSnapshotDesktop';

export function DesktopHero() {
  return (
    <section className="relative hidden overflow-hidden border-b border-white/10 bg-[#030917] pb-16 pt-6 xl:block">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="pointer-events-none absolute right-[-18%] top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_68%)]" />

      <div className="relative mx-auto max-w-[1520px] px-8 2xl:px-12">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-6 py-4 backdrop-blur-md">
          <Link href="/" className="inline-flex items-center gap-4">
            <Image src="/brand/rapid-rise-ai-logo.png" alt="Rapid Rise AI" width={48} height={48} className="h-11 w-auto" />
            <span className="text-4xl font-semibold tracking-[0.08em] text-white">RAPID RISE AI</span>
          </Link>
          <nav className="flex items-center gap-12">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-xl text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={heroCopy.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/15 px-6 py-3 text-xl font-medium text-blue-200 transition hover:border-blue-300/70 hover:bg-blue-500/25"
          >
            {heroCopy.primaryCta.label}
            <ArrowRight className="h-6 w-6" />
          </Link>
        </header>

        <div className="mt-12 grid grid-cols-[minmax(530px,0.9fr)_minmax(700px,1.1fr)] items-start gap-12">
          <div className="min-w-0 pt-6">
            <p className="text-sm font-semibold tracking-[0.24em] text-cyan-300">{heroCopy.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(3.4rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              {heroCopy.headlineLead}
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{heroCopy.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[2rem] leading-[1.35] text-slate-300">{heroCopy.body}</p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href={heroCopy.primaryCta.href}
                className="inline-flex min-h-[64px] min-w-[250px] items-center justify-center gap-2 rounded-2xl border border-blue-400/50 bg-gradient-to-r from-blue-500 to-blue-600 px-8 text-2xl font-medium text-white shadow-[0_0_35px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5"
              >
                {heroCopy.primaryCta.label}
                <ArrowRight className="h-6 w-6" />
              </Link>
              <Link
                href={heroCopy.secondaryCta.href}
                className="inline-flex min-h-[64px] min-w-[230px] items-center justify-center rounded-2xl border border-white/20 bg-slate-950/55 px-8 text-2xl font-medium text-white transition hover:border-cyan-300/45"
              >
                {heroCopy.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-4 gap-2 border-y border-white/10 py-4">
              {trustItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 px-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70">
                      <Icon className={`h-5 w-5 ${item.accent}`} />
                    </span>
                    <span className="text-xl leading-tight text-slate-300">{item.label}</span>
                    {index < trustItems.length - 1 ? <span className="ml-auto h-10 w-px bg-white/15" /> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <DesktopOperationsPreview />
        </div>

        <ImpactSnapshotDesktop />
      </div>
    </section>
  );
}
