import { Section } from './ui/section';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function LegalTemplate({ title, date, sections, body }: { title: string; date: string; sections: string[]; body: (s: string) => string }) {
  return (
    <>
      <Section label="Legal" title={title} intro={`Last updated: ${date}`}>
        <div className="flex flex-wrap gap-3 max-md:mt-4">
          <Button href="/contact">Contact</Button>
          <Button href="/quote" variant="secondary">Request a Quote</Button>
        </div>
        <p className="mt-3 text-sm text-text1">Need clarification? We reply within 24 hours.</p>
      </Section>

      <Section className="pt-0" title="Contents">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          {sections.map((s, i) => <a key={s} href={`#s-${i}`} className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-stroke px-4 text-sm text-text1 hover:text-text0">{s}</a>)}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden h-fit rounded-card border border-stroke p-4 lg:sticky lg:top-24 lg:block">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue">Contents</p>
            <div className="space-y-1">{sections.map((s, i) => <a key={s} href={`#s-${i}`} className="block text-sm text-text1 hover:text-text0">{s}</a>)}</div>
          </aside>
          <div className="space-y-6">{sections.map((s, i)=><article id={`s-${i}`} key={s}><Card className="p-6"><h2 className="mb-2 font-[var(--font-jakarta)] text-2xl font-semibold">{s}</h2><p className="leading-7 text-text1">{body(s)}</p></Card></article>)}</div>
        </div>
      </Section>
    </>
  );
}
