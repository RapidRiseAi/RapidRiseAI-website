import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Products and Pricing | Rapid Rise AI',
  description: 'Pick a fixed-price system or request a custom quote for complex operations.',
  path: '/products/pricing',
});

const products = [
  ['Lead Follow-Up System', 'R3,500', '5 to 7 business days'],
  ['Inbox Routing and Triage', 'R2,000', '3 to 5 business days'],
  ['Custom Dashboard Starter', 'R6,000', '10 to 14 business days'],
  ['Quote and Document Generator', 'R8,000', '7 to 10 business days'],
  ['Client Portal Starter', 'R15,000', '2 to 3 weeks'],
  ['Support Assistant Starter', 'R4,000', '2 weeks'],
] as const;

export default function ProductsPricingPage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Pick the system that fixes the leak."
        sub="Start with a fixed-price build or request a custom scope for complex operations."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-pricing-packages-quick-wins-core-system-scale.jpg"
        alt="Rapid Rise AI products and pricing view"
      />

      <Section label="Products" title="Fast Wins, Operational Control, Client Experience, Support and Scale.">
        <div className="grid gap-4 md:grid-cols-2">
          {products.map(([title, price, timeline]) => (
            <Card key={title} className="border-white/15">
              <p className="text-xs uppercase tracking-[0.16em] text-blue">Fixed price</p>
              <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-lg text-text0">{price}</p>
              <p className="mt-1 text-sm text-text1">Timeline: {timeline}</p>
              <ul className="mt-3 space-y-1 text-sm text-text1">
                <li>• Best for practical workflow bottlenecks</li>
                <li>• Includes setup, test, and handover basics</li>
                <li>• Not included: major migrations or complex multi-team logic</li>
              </ul>
              <Button href={`/quote?product=${encodeURIComponent(title)}`} className="mt-4">Select this product</Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section label="Add-ons" title="Extend without a full rebuild.">
        <div className="grid gap-3 md:grid-cols-2">
          {['Extra integration connection: R700 each', 'Extra workflow step or approval rule: R500 each', 'Team training session: R1,500 for 60 minutes', 'Priority delivery: from R2,000'].map((item) => (
            <Card key={item} className="p-4 text-sm text-text1">{item}</Card>
          ))}
        </div>
      </Section>

      <Section label="Quoted builds" title="When fixed pricing stops being honest.">
        <Card>
          <p className="text-text1">Complex workflows, internal tools, multi-step systems, and larger data migrations need quoted builds. We scope cleanly before we build.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/quote" arrow>Request a Quote</Button>
            <Button href="/contact" variant="secondary">Talk to us first</Button>
          </div>
        </Card>
      </Section>

      <Section label="Support plans" title="Scale and support">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Essential Support', 'R2,000 per month'],
            ['Growth Support', 'R4,000 per month'],
            ['Ops Partner', 'from R12,500 per month'],
          ].map(([name, price]) => (
            <Card key={name}>
              <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{name}</h3>
              <p className="mt-2 text-blue">{price}</p>
              <p className="mt-3 text-sm text-text1">Monitoring, fixes, and ongoing workflow improvements.</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
