import Image from 'next/image';
import { ArrowRight, CircleAlert, CircleCheckBig, Workflow } from 'lucide-react';
import { Button } from './ui/button';
import { Container } from './ui/container';
import { FAQAccordion } from './ui/faq-accordion';
import { Section } from './ui/section';
import { Card } from './ui/card';
import { Pill } from './ui/pill';
import { MobileShowMoreList } from './ui/mobile-show-more';

export function Hero({
  h1,
  sub,
  cta2,
  cta2Href,
  trustCopy = 'Response within 24 hours · No spam · Clear handover',
  visual = '/images/hero/hero-visual.svg',
  mobileVisual,
  desktopVisual,
  alt = '',
  imageClassName = 'aspect-video w-full rounded-xl object-cover object-center md:object-contain',
  mobileImageClassName = 'h-full w-full object-cover object-center md:object-contain',
  mobileImageFrameClassName = 'aspect-video rounded-[18px] bg-surface-2',
  desktopImageFrameClassName = 'aspect-video',
  imageWidth = 1600,
  imageHeight = 900,
  imagePriority = true,
  compactMobile = false,
  id,
}: {
  h1: string;
  sub: string;
  cta2?: string;
  cta2Href?: string;
  trustCopy?: string;
  visual?: string;
  mobileVisual?: string;
  desktopVisual?: string;
  alt?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePriority?: boolean;
  mobileImageClassName?: string;
  mobileImageFrameClassName?: string;
  desktopImageFrameClassName?: string;
  compactMobile?: boolean;
  id?: string;
}) {
  const resolvedCta2Href = cta2Href ?? (cta2 === 'View Work' ? '/work' : cta2 === 'View Education' ? '/education' : cta2 === 'Contact' ? '/contact' : '/contact');

  return (
    <section id={id} className="hero-padding border-b border-stroke">
      <Container className={`grid items-center gap-8 max-md:gap-5 lg:grid-cols-2 ${compactMobile ? 'max-md:gap-4 max-md:pt-1' : ''}`}>
        <div className={compactMobile ? 'max-[640px]:order-2' : ''}>
          {compactMobile ? <p className="mb-2 hidden text-[12px] font-semibold uppercase tracking-[0.2em] text-blue max-[640px]:block">Business Systems</p> : null}
          <h1 className={`max-w-3xl font-[var(--font-jakarta)] text-4xl font-bold tracking-tight md:text-6xl ${compactMobile ? 'max-[640px]:text-[clamp(36px,9vw,44px)] max-[640px]:leading-[1.05] max-[640px]:tracking-[-0.02em]' : ''}`}>{h1}</h1>
          <p className={`mt-4 max-w-2xl text-base leading-7 text-text1 md:text-lg ${compactMobile ? 'max-[640px]:mt-2.5 max-[640px]:text-[15px] max-[640px]:leading-[1.5]' : ''}`}>{sub}</p>
          <div id="hero-cta-anchor" className={`mt-8 flex flex-wrap gap-3 max-md:mt-4 ${compactMobile ? 'max-[640px]:mt-4 max-[640px]:flex max-[640px]:gap-[10px]' : ''}`}>
            <Button href="/quote" arrow className={compactMobile ? 'max-[640px]:h-12 max-[640px]:flex-1 max-[640px]:rounded-[15px] max-[640px]:px-4 max-[640px]:text-[15px] max-[640px]:whitespace-nowrap' : ''}>Request a Quote</Button>
            {cta2 ? <Button href={resolvedCta2Href} variant="secondary" className={compactMobile ? 'max-[640px]:h-12 max-[640px]:flex-1 max-[640px]:rounded-[15px] max-[640px]:border-white/30 max-[640px]:bg-transparent max-[640px]:px-4 max-[640px]:text-[15px] max-[640px]:text-text0' : ''}>{cta2}</Button> : null}
          </div>
          <div className={`relative mt-5 ${compactMobile ? 'max-[640px]:mt-3' : ''}`}>
            {compactMobile ? (
              <p className="text-[12px] text-text2">{trustCopy}</p>
            ) : (
              <div className="flex gap-2 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:pb-1 max-md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap">
                <Pill>Response within 24 hours</Pill>
                <Pill>No spam</Pill>
                <Pill className="hidden">No pressure</Pill>
              </div>
            )}
          </div>
        </div>
        <Card className={`premium-hero-glow overflow-hidden border-blue/30 p-2 ${compactMobile ? 'max-[640px]:order-1' : ''}`}>
          <div className={`relative ${compactMobile ? mobileImageFrameClassName : desktopImageFrameClassName}`}>
            {compactMobile ? (
              <picture>
                <source media="(max-width: 640px)" srcSet={mobileVisual ?? visual} />
                <source media="(min-width: 641px)" srcSet={desktopVisual ?? visual} />
                <img src={desktopVisual ?? visual} alt={alt} className={mobileImageClassName} />
              </picture>
            ) : (
              <Image src={visual} alt={alt} width={imageWidth} height={imageHeight} className={imageClassName} priority={imagePriority} />
            )}
            {compactMobile ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" /> : null}
          </div>
        </Card>
      </Container>
    </section>
  );
}

export function ManualVsSystems() {
  const bad = ['Enquiries go cold while you are busy', 'Follow-ups get delayed or forgotten', 'Admin eats time that should go to revenue', 'Mistakes happen when data is copied by hand', 'Nothing is tracked properly, so nothing improves', 'The team relies on memory, not systems'];
  const good = ['Faster response times', 'Less admin and fewer handoffs', 'Fewer mistakes and less rework', 'Better tracking and visibility', 'Cleaner operations across teams and tools', 'A workflow that works even when staff are offline'];
  return (
    <Section label="Impact" title="Manual workflows cost more than they show.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-danger/50"><p className="mb-4 flex items-center gap-2 text-sm font-semibold text-danger"><CircleAlert className="h-4 w-4" />What it costs you when it stays manual</p><div className="grid gap-2 max-md:grid-cols-2 sm:grid-cols-2">{bad.map((x) => <div key={x} className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-text1 max-md:p-2.5 max-md:text-[13px] max-md:leading-5">{x}</div>)}</div></Card>
        <Card className="border-success/50"><p className="mb-4 flex items-center gap-2 text-sm font-semibold text-success"><CircleCheckBig className="h-4 w-4" />What you get with proper systems</p><div className="grid gap-2 max-md:grid-cols-2 sm:grid-cols-2">{good.map((x) => <div key={x} className="rounded-xl border border-success/30 bg-success/5 p-3 text-sm text-text1 max-md:p-2.5 max-md:text-[13px] max-md:leading-5">{x}</div>)}</div></Card>
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
          <Card className="h-fit lg:sticky lg:top-24"><p className="text-sm text-text1">Response within 24 hours</p><h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{content.cta}</h3><p className="mt-3 text-sm text-text1">Clean scope. No pressure.</p><Button href="/quote" className="mt-5 hidden w-full max-md:hidden md:inline-flex" arrow>Request a Quote</Button></Card>
        </div>
      </Section>
      <Section className="pt-0 max-md:hidden"><Card className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-text1">Ready to scope this workflow?</p><h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{content.cta}</h3></div><Button href="/quote" arrow>Request a Quote</Button></Card></Section>
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
      <MobileShowMoreList items={capabilities} />
    </Section>
  );
}

export function ArrowText() { return <ArrowRight className="h-4 w-4" />; }
