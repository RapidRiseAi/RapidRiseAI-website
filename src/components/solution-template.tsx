import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { Section } from '@/components/ui/section';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import type { SolutionPageData } from '@/content/solutionPages';
import { Hero } from '@/components/page-template';

export function SolutionTemplate({ data }: { data: SolutionPageData }) {
  return (
    <>
      <Hero compactMobile h1={data.h1} sub={data.subhead} cta2="View Work" visual={data.heroImage} alt={data.heroAlt} />

      <Section title="Problems">
        <MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">
          {data.problems.map((item) => (
            <Card key={item} className="text-sm text-text1">{item}</Card>
          ))}
        </MobileSnapCarousel>
      </Section>

      <Section title="What we build">
        <MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">
          {data.whatWeBuild.map((item) => (
            <Card key={item} className="text-sm text-text1">{item}</Card>
          ))}
        </MobileSnapCarousel>
      </Section>

      <Section title="Example workflow">
        <MobileSnapCarousel desktopClassName="md:grid-cols-2 lg:grid-cols-5" itemClassName="w-[84%] md:w-auto">
          {data.workflowSteps.map((step, index) => (
            <Card key={step} className="text-sm text-text1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue">Step {index + 1}</p>
              {step}
            </Card>
          ))}
        </MobileSnapCarousel>
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
