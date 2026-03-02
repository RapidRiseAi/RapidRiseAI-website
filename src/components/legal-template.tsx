import { Hero } from './page-template';
import { Section } from './ui/section';
import { MobileSnapCarousel } from './ui/mobile-snap-carousel';

export function LegalTemplate({ title, date, sections, body }: { title: string; date: string; sections: string[]; body: (s: string) => string }) {
  return (
    <>
      <Hero
        compactMobile
        h1={title}
        sub={`Last updated: ${date}. Review each section below for the full policy details.`}
        cta2="Contact"
        visual="/images/hero/rapid-rise-ai-about-build-philosophy-systems.jpg"
        alt="Policy documentation and compliance planning"
      />
      <Section label="Legal" title={title} intro={`Last updated: ${date}`}>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden h-fit rounded-card border border-stroke p-4 lg:sticky lg:top-24 lg:block">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue">Contents</p>
            <div className="space-y-1">{sections.map((s, i) => <a key={s} href={`#s-${i}`} className="block text-sm text-text1 hover:text-text0">{s}</a>)}</div>
          </aside>
          <MobileSnapCarousel desktopClassName="lg:block" itemClassName="w-[92%] lg:w-auto" showPagination={false}>
            <div className="space-y-6">{sections.map((s, i)=><article id={`s-${i}`} key={s} className="rounded-card border border-stroke p-6"><h2 className="font-[var(--font-jakarta)] text-2xl font-semibold mb-2">{s}</h2><p className="leading-7 text-text1">{body(s)}</p></article>)}</div>
          </MobileSnapCarousel>
        </div>
      </Section>
    </>
  );
}
