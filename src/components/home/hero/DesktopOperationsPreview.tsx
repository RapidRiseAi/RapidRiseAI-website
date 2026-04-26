import { heroMetrics, processSteps } from './HeroData';

function LivePill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1.5 text-base font-medium text-emerald-300">
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" />
      Live system
    </span>
  );
}

function SignalGraph() {
  return (
    <div className="relative mt-9 h-[220px] overflow-hidden rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.2),transparent_44%),radial-gradient(circle_at_80%_22%,rgba(37,99,235,0.14),transparent_34%)]">
      <svg viewBox="0 0 840 240" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="signal-line-desktop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path d="M0 174 C58 170, 90 204, 128 194 C170 183, 210 182, 248 125 C286 74, 328 120, 364 132 C410 148, 452 112, 492 124 C544 141, 598 160, 650 142 C708 122, 756 90, 840 106" stroke="url(#signal-line-desktop)" strokeWidth="4" fill="none" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]" />
        {[128, 248, 364, 492, 650, 756].map((x, i) => (
          <circle key={x} cx={x} cy={[194, 125, 132, 124, 142, 90][i]} r="5" fill="#dbeafe" className="motion-safe:animate-pulse" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[54%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 bg-cyan-400/10" />
      <div className="absolute left-1/2 top-[54%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 motion-safe:animate-pulse" />
      <div className="absolute left-1/2 top-[54%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15" />
      <div className="absolute left-1/2 top-[54%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.95)]" />
    </div>
  );
}

export function DesktopOperationsPreview() {
  return (
    <div className="relative rounded-[30px] border border-cyan-400/40 bg-slate-950/55 p-8 shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_24px_90px_rgba(2,6,23,0.88),0_0_40px_rgba(14,116,255,0.2)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10" />
      <div className="pointer-events-none absolute inset-x-14 bottom-0 h-20 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.4),transparent_70%)]" />
      <div className="relative flex items-center justify-between">
        <p className="text-sm font-semibold tracking-[0.24em] text-white/85">OPERATIONS PREVIEW</p>
        <LivePill />
      </div>

      <div className="relative mt-7 grid grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/10 bg-slate-950/45 py-4">
        {heroMetrics.map((metric) => (
          <div key={metric.label} className="px-2 text-center">
            <p className="text-[4.1rem] font-semibold leading-none tracking-[-0.04em] text-white">
              <span className={metric.accent ?? ''}>{metric.value}</span>
            </p>
            <p className="mt-2 text-3xl font-medium text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>

      <SignalGraph />

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="contents">
              <div className="text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-950/70">
                  <Icon className={`h-7 w-7 ${step.accent}`} />
                </span>
                <p className="mt-3 text-xl text-slate-300">{step.label}</p>
              </div>
              {index < processSteps.length - 1 ? <span className="text-3xl text-white/40">→</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
