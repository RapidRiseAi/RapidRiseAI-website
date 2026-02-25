import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { Section } from '@/components/ui/section';
import type { SolutionPageData } from '@/content/solutionPages';

export function SolutionTemplate({ data }: { data: SolutionPageData }) {
  return (
    <>
      <section className="hero-padding border-b border-stroke">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">{data.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl font-[var(--font-jakarta)] text-4xl font-bold tracking-tight md:text-6xl">{data.h1}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text1 md:text-lg">{data.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote" arrow>
                Request a Quote
              </Button>
              <Button href="/work" variant="secondary">
                View Work
              </Button>
            </div>
            <p className="mt-5 text-sm text-text1">Response within 24 hours. No spam. No pressure. Clear handover.</p>
          </div>
          <Card className="overflow-hidden border-blue/30 p-2">
            <div className="relative aspect-video w-full">
              <Image src={data.heroImage} alt={data.heroAlt} fill className="object-cover object-center" priority sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </Card>
        </Container>
      </section>

      <Section title="Problems">
        <ul className="grid gap-3 md:grid-cols-2">
          {data.problems.map((item) => (
            <li key={item}>
              <Card className="text-sm text-text1">{item}</Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What we build">
        <ul className="grid gap-3 md:grid-cols-2">
          {data.whatWeBuild.map((item) => (
            <li key={item}>
              <Card className="text-sm text-text1">{item}</Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Example workflow">
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {data.workflowSteps.map((step, index) => (
            <li key={step}>
              <Card className="text-sm text-text1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue">Step {index + 1}</p>
                {step}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Delivery options">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{data.delivery.quickWinsTitle}</h3>
            <ul className="mt-4 space-y-2 text-sm text-text1">
              {data.delivery.quickWins.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{data.delivery.coreSystemTitle}</h3>
            <ul className="mt-4 space-y-2 text-sm text-text1">
              {data.delivery.coreSystem.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="What we need from you">
        <ul className="grid gap-3 md:grid-cols-3">
          {data.whatWeNeed.map((item) => (
            <li key={item}>
              <Card className="text-sm text-text1">{item}</Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Browse products and pricing">
        <div className="grid gap-3 md:grid-cols-2">
          <Link href="/products/pricing" className="block">
            <Card className="text-sm font-semibold text-text0 transition-colors hover:text-blue">
              Browse products and pricing
            </Card>
          </Link>
        </div>
      </Section>

      <Section title="FAQ">
        <FAQAccordion items={data.faq} />
      </Section>

      <Section className="pt-0">
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">{data.finalCta.headline}</h2>
            <p className="mt-2 text-sm text-text1">{data.finalCta.subhead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/quote" arrow>
              {data.finalCta.primary}
            </Button>
            <Button href="/work" variant="secondary">
              {data.finalCta.secondary}
            </Button>
          </div>
        </Card>
      </Section>

      <Section className="pt-0">
        <Container>
          <p className="text-sm text-text1">Optional: add an AI layer for drafting, routing, and support when it makes sense.</p>
        </Container>
      </Section>
    </>
  );
}
