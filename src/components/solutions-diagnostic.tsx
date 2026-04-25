'use client';

import { useMemo, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const modules = [
  { title: 'Lead Capture and Follow-Up', tag: 'We lose leads', best: 'Teams with slow response and no owner visibility.', href: '/solutions/lead-capture' },
  { title: 'Workflow Automation and Integrations', tag: 'We waste time on admin', best: 'Teams copying data between tools daily.', href: '/solutions/workflow-automation' },
  { title: 'Smart Google Workspace Systems', tag: 'We cannot track work', best: 'Ops teams running from Gmail, Sheets, and Drive.', href: '/solutions/google-workspace' },
  { title: 'Web Apps and Internal Tools', tag: 'We need a portal', best: 'Businesses that need one source of truth.', href: '/solutions/web-apps' },
  { title: 'Websites That Convert', tag: 'We need better quotes', best: 'Businesses with traffic but weak next-step flow.', href: '/solutions/websites' },
  { title: 'Training and Enablement', tag: 'We need staff training', best: 'Teams that need adoption after implementation.', href: '/solutions/training' },
] as const;

export function SolutionsDiagnostic() {
  const [diagnostic, setDiagnostic] = useState<(typeof modules)[number]['tag']>('We lose leads');
  const recommended = useMemo(() => modules.filter((m) => m.tag === diagnostic), [diagnostic]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {[...new Set(modules.map((m) => m.tag))].map((option) => (
          <button key={option} onClick={() => setDiagnostic(option)} className={`chip transition ${diagnostic === option ? 'border-blue/70 bg-blue/15 text-blue' : ''}`}>
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-blue/40 bg-blue/10 p-4 text-sm text-text1">
        Recommended now: <span className="font-semibold text-text0">{recommended.map((r) => r.title).join(' · ')}</span>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.title} className={diagnostic === module.tag ? 'border-blue/60' : ''}>
            <p className="text-xs uppercase tracking-[0.16em] text-blue">Best for</p>
            <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{module.title}</h3>
            <p className="mt-2 text-sm text-text1">{module.best}</p>
            <ul className="mt-3 space-y-1 text-sm text-text1">
              <li>• Problems solved with ownership and status</li>
              <li>• Includes practical workflows and handover</li>
              <li>• Example outputs shown in work proof</li>
            </ul>
            <Button href={module.href} className="mt-4" variant="secondary">Explore module</Button>
          </Card>
        ))}
      </div>
    </>
  );
}
