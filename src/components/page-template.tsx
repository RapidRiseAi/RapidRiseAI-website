import Image from 'next/image';
import { ArrowRight, CircleAlert, CircleCheckBig, Sparkles, Workflow } from 'lucide-react';
import { Button } from './ui/button';
import { Container } from './ui/container';
import { FAQAccordion } from './ui/faq-accordion';
import { Section } from './ui/section';
import { Card } from './ui/card';
import { Pill } from './ui/pill';

export function Hero({ h1, sub, cta2, visual = '/images/hero/hero-visual.svg', alt = '' }: { h1: string; sub: string; cta2?: string; visual?: string; alt?: string }) {
  return (
    <section className="hero-padding border-b border-stroke">
      <Container className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="max-w-3xl font-[var(--font-jakarta)] text-4xl font-bold tracking-tight md:text-6xl">{h1}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text1 md:text-lg">{sub}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button href="/quote" arrow>Request a Quote</Button>{cta2 ? <Button href={cta2 === 'View Work' ? '/work' : cta2 === 'View Education' ? '/education' : '/contact'} variant="secondary">{cta2}</Button> : null}</div>
          <div className="mt-5 flex flex-wrap gap-2"><Pill>Response within 24 hours</Pill><Pill>No spam</Pill><Pill>No pressure</Pill></div>
        </div>
        <Card className="overflow-hidden border-blue/30 p-2">
          <Image src={visual} alt={alt} width={800} height={600} className="h-full w-full rounded-xl object-cover" priority />
        </Card>
      </Container>
    </section>
  );
}

export function ManualVsSystems() {
  const bad = ['Enquiries go cold while you are busy','Follow-ups get delayed or forgotten','Admin eats time that should go to revenue','Mistakes happen when data is copied by hand','Nothing is tracked properly, so nothing improves','The team relies on memory, not systems'];
  const good = ['Faster response times','Less admin and fewer handoffs','Fewer mistakes and less rework','Better tracking and visibility','Cleaner operations across teams and tools','A workflow that works even when staff are offline'];
  return (
    <Section label="Impact" title="Manual workflows cost more than they show.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-danger/50"><p className="mb-4 flex items-center gap-2 text-sm font-semibold text-danger"><CircleAlert className="h-4 w-4" />What it costs you when it stays manual</p><div className="grid gap-3 sm:grid-cols-2">{bad.map((x)=><div key={x} className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-text1">{x}</div>)}</div></Card>
        <Card className="border-success/50"><p className="mb-4 flex items-center gap-2 text-sm font-semibold text-success"><CircleCheckBig className="h-4 w-4" />What you get with proper systems</p><div className="grid gap-3 sm:grid-cols-2">{good.map((x)=><div key={x} className="rounded-xl border border-success/30 bg-success/5 p-3 text-sm text-text1">{x}</div>)}</div></Card>
      </div>
    </Section>
  );
}

export function SolutionTemplate({ content, image }: { content: any; image: string }) {
  return (
    <>
      <Hero h1={content.hero.h1} sub={content.hero.sub} cta2="View Work" visual={image} />
      <Section label="Overview" title="Typical problems">
        <div className="grid gap-3 md:grid-cols-2">{content.problems.map((x: string) => <Card key={x} className="text-sm text-text1">{x}</Card>)}</div>
      </Section>
      <Section title="What we build">
        <div className="grid gap-3 md:grid-cols-2">{content.build.map((x: string) => <Card key={x} className="text-sm text-text1">{x}</Card>)}</div>
      </Section>
      <Section title="Example workflows">
        <div className="grid gap-4 md:grid-cols-3">{content.workflows.map((x: string) => <Card key={x}><Workflow className="mb-4 h-5 w-5 text-blue" /><p className="text-sm text-text1">{x}</p></Card>)}</div>
      </Section>
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {content.tools?.length ? <div><p className="mb-3 text-sm font-semibold text-blue">Tools and environment</p><div className="grid gap-3 md:grid-cols-2">{content.tools.map((x: string) => <Card key={x} className="text-sm text-text1">{x}</Card>)}</div></div> : null}
            {content.delivery?.length ? <div><p className="mb-3 text-sm font-semibold text-blue">Delivery options</p><div className="grid gap-3 md:grid-cols-2">{content.delivery.map((x: string) => <Card key={x} className="text-sm text-text1">{x}</Card>)}</div></div> : null}
            {content.faq?.length ? <div><p className="mb-3 text-sm font-semibold text-blue">FAQ</p><FAQAccordion items={content.faq} /></div> : null}
          </div>
          <Card className="h-fit lg:sticky lg:top-24"><p className="text-sm text-text1">Response within 24 hours</p><h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{content.cta}</h3><p className="mt-3 text-sm text-text1">Clean scope. No pressure.</p><Button href="/quote" className="mt-5 w-full" arrow>Request a Quote</Button></Card>
        </div>
      </Section>
      <Section className="pt-0"><Card className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-text1">Ready to scope this workflow?</p><h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{content.cta}</h3></div><Button href="/quote" arrow>Request a Quote</Button></Card></Section>
    </>
  );
}

export function ProofStrip() {
  const capabilities = [
    'Workflow automation across your business',
    'Tool integrations and data sync',
    'Lead capture and fast follow-up systems',
    'Inbox and enquiry routing',
    'Customer support assistants and smart handoff',
    'Smart workspace systems and automations (email, files, calendar, docs)',
    'Custom dashboards and reporting (multi-tool visibility)',
    'Internal portals and client portals',
    'Web apps and internal tools (built for your workflow)',
    'Quote, invoice, and document generation',
    'Onboarding and handover systems (clients or staff)',
    'Approvals and compliance flows',
    'Scheduling and booking automation',
    'Recurring reminders and renewals',
    'Training, SOPs, and enablement (so your team can run it)',
  ];

  return (
    <Section label="Capabilities" title="Built for real operations">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => (
          <div
            key={item}
            className="flex min-h-9 items-center gap-2 rounded-[14px] border border-stroke/80 bg-[color:color-mix(in_srgb,var(--bg-2)_76%,transparent)] px-3 py-2 text-[13px] leading-[1.3] text-text1 shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ArrowText() { return <ArrowRight className="h-4 w-4" />; }
