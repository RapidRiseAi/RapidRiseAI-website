import { Container } from './container';

export function Section({ title, intro, children }: React.PropsWithChildren<{ title?: string; intro?: string }>) {
  return (
    <section className="section-padding">
      <Container>
        {title ? <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2> : null}
        {intro ? <p className="text-text1 mb-8 max-w-3xl">{intro}</p> : null}
        {children}
      </Container>
    </section>
  );
}
