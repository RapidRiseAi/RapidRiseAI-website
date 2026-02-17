import { Button } from './ui/button';
import { Container } from './ui/container';
import { FAQAccordion } from './ui/faq-accordion';
import { Section } from './ui/section';

export function Hero({ h1, sub, cta2 }: { h1: string; sub: string; cta2?: string }) {
  return (
    <section className="section-padding border-b border-stroke">
      <Container>
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">{h1}</h1>
        <p className="mt-4 max-w-3xl text-text1">{sub}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button href="/quote">Request a Quote</Button>{cta2 ? <Button href={cta2 === 'View Work' ? '/work' : cta2 === 'View Education' ? '/education' : '/contact'} variant="secondary">{cta2}</Button> : null}</div>
        <p className="mt-3 text-sm text-text1">Response within 24 hours. No spam. No pressure.</p>
      </Container>
    </section>
  );
}

export function SolutionTemplate({ content }: { content: any }) {
  return (
    <>
      <Hero h1={content.hero.h1} sub={content.hero.sub} cta2="View Work" />
      <Section title="Typical problems"><ul className="space-y-2 text-text1">{content.problems.map((x: string) => <li key={x}>• {x}</li>)}</ul></Section>
      <Section title="What we build"><ul className="space-y-2 text-text1">{content.build.map((x: string) => <li key={x}>• {x}</li>)}</ul></Section>
      <Section title="Example workflows"><ul className="space-y-2 text-text1">{content.workflows.map((x: string) => <li key={x}>• {x}</li>)}</ul></Section>
      {content.tools?.length ? <Section title="Tools and environment"><ul className="space-y-2 text-text1">{content.tools.map((x: string) => <li key={x}>• {x}</li>)}</ul></Section> : null}
      {content.delivery?.length ? <Section title="Delivery options"><ul className="space-y-2 text-text1">{content.delivery.map((x: string) => <li key={x}>• {x}</li>)}</ul></Section> : null}
      {content.faq?.length ? <Section title="FAQ"><FAQAccordion items={content.faq} /></Section> : null}
      <Section title={content.cta}><Button href="/quote">Request a Quote</Button></Section>
    </>
  );
}
