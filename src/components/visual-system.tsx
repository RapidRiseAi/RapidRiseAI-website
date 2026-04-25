'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, CircleAlert, Gauge, Inbox, LayoutDashboard, Link2, MessageSquareText, Orbit, Repeat2, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const commandStates = [
  'New enquiry captured',
  'Auto reply sent',
  'Owner assigned',
  'Follow-up scheduled',
  'Quote ready',
  'Dashboard updated',
];

export function CommandCenterHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((p) => (p + 1) % commandStates.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Card className="relative overflow-hidden border-blue/40 p-5 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(45,124,255,0.35),transparent_38%)]" />
      <div className="relative grid gap-4 md:grid-cols-[1.35fr,1fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-stroke bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-text2">System activity</p>
            <span className="chip border-success/40 text-success"><span className="h-2 w-2 rounded-full bg-success" />Live</span>
          </div>
          {commandStates.map((step, i) => (
            <div key={step} className={cn('rounded-xl border p-3 text-sm transition', i === index ? 'border-blue/70 bg-blue/15 text-text0' : 'border-stroke bg-white/5 text-text1')}>
              {step}
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          <MetricCard icon={Inbox} label="Lead intake" value="12 new" tone="blue" />
          <MetricCard icon={MessageSquareText} label="Reply speed" value="2m 40s" tone="success" />
          <MetricCard icon={Workflow} label="Active workflows" value="8 running" tone="blue" />
          <MetricCard icon={LayoutDashboard} label="Visibility" value="Owner assigned" tone="success" />
        </div>
      </div>
    </Card>
  );
}

function MetricCard({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: 'blue' | 'success' }) {
  return (
    <div className="rounded-xl border border-stroke bg-white/5 p-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-text2">
        <span>{label}</span>
        <Icon className={cn('h-4 w-4', tone === 'blue' ? 'text-blue' : 'text-success')} />
      </div>
      <p className="mt-2 text-sm font-semibold text-text0">{value}</p>
    </div>
  );
}

const leaks = [
  ['Website enquiry', 'Slow reply'],
  ['WhatsApp message', 'No owner'],
  ['Email inbox', 'Manual copy'],
  ['Spreadsheet', 'No status'],
  ['Quote', 'Forgotten follow-up'],
  ['Report', 'No report'],
] as const;

export function BusinessLeakMap() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {leaks.map(([node, issue], i) => (
        <button
          key={node}
          type="button"
          onClick={() => setActive(i)}
          className={cn('rounded-xl border p-4 text-left transition', active === i ? 'border-blue/70 bg-blue/15' : 'border-stroke bg-white/5 hover:border-amber-400/60')}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-text2">{node}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-amber-300"><CircleAlert className="h-4 w-4" />{issue}</p>
          {active === i ? <p className="mt-3 text-xs text-blue">System layer applied. Tracked and routed.</p> : null}
        </button>
      ))}
    </div>
  );
}

const bento = [
  ['Lead Capture Engine', 'Turn enquiries into tracked opportunities.', Inbox],
  ['Operations Command Layer', 'Give your team one place to see what matters.', Gauge],
  ['Client and Team Portals', 'Track work without chasing updates.', Orbit],
  ['Google Workspace Automation', 'Connect Gmail, Sheets, Drive, and Calendar.', Link2],
  ['Quote and Document Generator', 'Generate clean quotes and approvals.', Repeat2],
  ['Support Assistant Starter', 'Answer faster and hand off smarter.', Sparkles],
  ['Websites That Convert', 'Turn traffic into clear actions.', ArrowRight],
  ['Training and Enablement', 'Help teams use systems with confidence.', ShieldCheck],
] as const;

export function FeatureBentoGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {bento.map(([title, text, Icon], i) => (
        <Card key={title} className={cn('border-white/10 p-4', i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1')}>
          <Icon className="h-5 w-5 text-blue" />
          <h3 className="mt-3 font-[var(--font-jakarta)] text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-text1">{text}</p>
        </Card>
      ))}
    </div>
  );
}

export function StickySystemStory() {
  const steps = [
    'Enquiry arrives',
    'System captures it',
    'Lead gets qualified',
    'Owner gets assigned',
    'Follow-up is scheduled',
    'Quote is triggered',
    'Dashboard updates',
    'Owner has visibility',
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => setActive((s) => (s + 1) % steps.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-[320px,1fr]">
      <div className="space-y-2">
        {steps.map((s, idx) => (
          <div key={s} className={cn('rounded-lg border px-3 py-2 text-sm', idx === active ? 'border-blue/70 bg-blue/15 text-text0' : 'border-stroke text-text1')}>
            {idx + 1}. {s}
          </div>
        ))}
      </div>
      <Card className="border-blue/40 p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-blue">Live stage</p>
        <h3 className="mt-2 text-2xl font-semibold font-[var(--font-jakarta)]">{steps[active]}</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {['Lead', 'Quote', 'Portal', 'Dashboard'].map((item, i) => (
            <div key={item} className={cn('rounded-lg border p-3 text-sm', i <= active % 4 ? 'border-success/50 bg-success/10' : 'border-stroke bg-white/5')}>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function TrustLayer() {
  const points = [
    'Registered South African company',
    'Clear scope before build',
    'Documentation and handover',
    'Built around current tools',
    'No bloated software',
    'Response within 24 hours',
    'Practical systems your team can use',
    'Ownership from day one',
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {points.map((point) => (
        <div key={point} className="rounded-xl border border-stroke bg-white/5 px-4 py-3 text-sm text-text1">{point}</div>
      ))}
      <Card className="md:col-span-2 border-blue/40 p-4">
        <p className="text-sm text-text1">Rapid Rise AI (Pty) Ltd · team@rapidriseai.com · +27 64 903 1234 · CIPC: 2024/727338/07 · Not VAT registered</p>
      </Card>
    </div>
  );
}

export function PageEndCta() {
  return (
    <Card className="border-blue/40 p-6 text-center">
      <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold">Stop the leaks. Build the system.</h2>
      <p className="mx-auto mt-3 max-w-2xl text-text1">Tell us what is manual, delayed, or hard to track. We will recommend the cleanest next step.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Button href="/quote" arrow>Request a Quote</Button>
        <Button href="/work" variant="secondary">View Work</Button>
      </div>
    </Card>
  );
}
