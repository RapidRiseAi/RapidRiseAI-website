import { impactMetrics } from './HeroData';

export function ImpactSnapshotDesktop() {
  return (
    <div className="mt-16">
      <p className="mb-5 text-sm font-semibold tracking-[0.22em] text-cyan-300">IMPACT SNAPSHOT</p>
      <div className="grid grid-cols-4 gap-5">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.tag}
              className="rounded-2xl border border-white/15 bg-slate-950/65 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_38px_rgba(2,6,23,0.62)] transition hover:-translate-y-0.5 hover:border-cyan-300/50"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/85">
                  <Icon className={`h-5 w-5 ${metric.accent}`} />
                </span>
                <p className="text-sm font-semibold tracking-[0.22em] text-white/80">{metric.tag}</p>
              </div>
              <p className="mt-5 text-[3.6rem] font-semibold leading-none tracking-[-0.04em] text-white">{metric.value}</p>
              <p className="mt-3 text-[1.75rem] leading-tight text-slate-300">{metric.label}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
