import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { Hero } from '@/components/page-template';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Products and Pricing | Rapid Rise AI',
  description: 'Choose a fixed-price system to remove manual work fast, or request a quote for custom builds and integrations. Response within 24 hours.',
  path: '/products/pricing',
});

const faqItems = [
  {
    q: 'Are the fixed-price products really fixed?',
    a: 'Yes, when the scope matches the product definition. If your setup needs more, we quote the add-ons first so there are no surprises.',
  },
  {
    q: 'What do you need to give a quote?',
    a: 'Your current process, the tools involved, and one person to confirm decisions and test.',
  },
  {
    q: 'Do you include software subscriptions?',
    a: 'No. Any third-party fees are billed directly to you. We will tell you upfront what is required.',
  },
  {
    q: 'How fast do you start?',
    a: 'Most products start as soon as access is confirmed. We reply within 24 hours.',
  },
  {
    q: 'Can we start with a product and expand later?',
    a: 'Yes. That is the point. Start small, prove value, then scale.',
  },
];

export default function ProductsPricingPage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Products and pricing that fit real operations."
        sub="Choose a fixed-price system for a fast win. For complex builds, we quote after a short workflow review."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-pricing-packages-quick-wins-core-system-scale.jpg"
        alt="Service packages: Quick Wins, Core System, Scale and Support"
        trustCopy="Response within 24 hours · No spam · Clear handover"
      />

      <Section title="Fixed-price products or custom quoted builds.">
        <p className="max-w-3xl text-base leading-7 text-text1">
          Some work is repeatable and can be priced upfront. Some work depends on your tools, volume, and rules. We do both.
        </p>
        <MobileSnapCarousel className="mt-6" desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Fixed-price products</h3>
            <p className="mt-3 text-text1">Clear scope. Clear timeline. Clear price.</p>
            <Button href="#fixed-price-products" variant="secondary" className="mt-5">
              Browse products
            </Button>
          </Card>
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Quoted builds</h3>
            <p className="mt-3 text-text1">For complex workflows, internal tools, and multi-step systems.</p>
            <Button href="#quoted-builds" variant="secondary" className="mt-5">
              How quoting works
            </Button>
          </Card>
        </MobileSnapCarousel>
      </Section>

      <Section title="Fixed-price products" intro="These are packaged systems with defined scope. If you need more, we extend it with add-ons or a custom quote.">
        <div id="fixed-price-products" />
        <MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">
          {[
            {
              title: 'Lead Follow-Up System',
              price: 'R3,500',
              timeline: '5 to 7 business days',
              bestFor: 'Businesses losing leads due to slow replies and no tracking.',
              includes: [
                'Lead capture intake (form or inbox)',
                'Auto-confirmation message',
                'Owner assignment and status tracking',
                'Reminder nudges until handled',
                'Basic reporting snapshot',
              ],
              notIncluded: 'Full CRM migration, complex segmentation rules, paid messaging fees.',
            },
            {
              title: 'Inbox Routing and Triage',
              price: 'R2,000',
              timeline: '3 to 5 business days',
              includes: [
                'Sorting rules (priority, topic, sender type)',
                'Auto-labeling and routing to the right owner',
                'Escalation for urgent messages',
                'Simple weekly summary',
              ],
            },
            {
              title: 'Custom Dashboard Starter',
              price: 'R6,000',
              timeline: '10 to 14 business days',
              includes: [
                'One dashboard view built for decision-making',
                'Pulls from multiple tools where possible',
                'Weekly delivery summary',
                'Basic access controls',
              ],
            },
            {
              title: 'Quote and Document Generator',
              price: 'R8,000',
              timeline: '7 to 10 business days',
              includes: [
                'Quote or document template setup',
                'Auto-fill from an intake form',
                'Approval step before sending',
                'File storage and naming rules',
              ],
            },
            {
              title: 'Client Portal Starter',
              price: 'R15,000',
              timeline: '2 to 3 weeks',
              includes: [
                'Simple portal for requests and status updates',
                'Admin view and basic reporting',
                'Clean structure for scaling later',
              ],
            },
            {
              title: 'Support Assistant Starter',
              price: 'R4,000',
              timeline: '2 weeks',
              includes: [
                'FAQ style assistant',
                'Smart handoff to your team',
                'Capture name, contact, and issue summary',
                'Basic reporting',
              ],
            },
          ].map((product) => (
            <Card key={product.title}>
              <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{product.title}</h3>
              <p className="mt-2 text-sm text-blue">{product.price}</p>
              <p className="mt-1 text-sm text-text1">Timeline: {product.timeline}</p>
              {'bestFor' in product ? <p className="mt-3 text-sm text-text1">Best for: {product.bestFor}</p> : null}
              <p className="mt-3 text-sm font-semibold text-text0">Includes:</p>
              <ul className="mt-2 space-y-2 text-sm text-text1">
                {product.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              {'notIncluded' in product ? <p className="mt-3 text-sm text-text1">Not included: {product.notIncluded}</p> : null}
              <Button href={`/quote?product=${encodeURIComponent(product.title)}`} className="mt-5">
                Select this product
              </Button>
            </Card>
          ))}
        </MobileSnapCarousel>
        <p className="mt-6 text-sm text-text1">
          Third-party subscriptions, messaging fees, and hosting are billed separately where applicable.
        </p>
      </Section>

      <Section title="Add-ons" intro="Use these to extend a fixed product without a full rebuild.">
        <MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">
          {[
            { name: 'Extra integration connection', price: 'R700 each' },
            { name: 'Extra workflow step or approval rule', price: 'R500 each' },
            { name: 'Team training session', price: 'R1,500 (60 minutes)' },
            { name: 'Priority delivery', price: 'From R2,000 (depends on schedule)' },
          ].map((addon) => (
            <Card key={addon.name}>
              <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{addon.name}</h3>
              <p className="mt-3 text-text1">{addon.price}</p>
            </Card>
          ))}
        </MobileSnapCarousel>
        <Button href="/quote" className="mt-6" arrow>
          Request a Quote
        </Button>
      </Section>

      <Section title="When we quote instead of using fixed pricing" intro="If the work depends on complex rules, multiple teams, or heavy data movement, fixed pricing stops being honest. That is when we quote.">
        <div id="quoted-builds" />
        <ul className="mb-8 space-y-2 text-text1">
          <li>• Multi-department workflows</li>
          <li>• Custom internal tools and apps</li>
          <li>• Complex integrations across many systems</li>
          <li>• Full websites with multiple pages and custom components</li>
          <li>• Migration and restructuring of large datasets</li>
        </ul>
        <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">How quoting works</h3>
        <MobileSnapCarousel className="mt-4" desktopClassName="md:grid-cols-3" itemClassName="w-[90%] md:w-auto">
          <Card>
            <p className="font-semibold">Step 1: Diagnose</p>
            <p className="mt-2 text-sm text-text1">We map your current workflow, the bottlenecks, and the outcome you want.</p>
          </Card>
          <Card>
            <p className="font-semibold">Step 2: Build</p>
            <p className="mt-2 text-sm text-text1">We automate and connect the moving parts. We test with real scenarios.</p>
          </Card>
          <Card>
            <p className="font-semibold">Step 3: Launch + handover</p>
            <p className="mt-2 text-sm text-text1">Your team gets documentation, short training, and ownership of the system.</p>
          </Card>
        </MobileSnapCarousel>
        <p className="mt-6 text-sm text-text1">You will always get a simplest viable option. No bloated scope.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/quote" arrow>
            Request a Quote
          </Button>
          <Button href="/book" variant="secondary">
            Book a Call
          </Button>
        </div>
      </Section>

      <Section title="Scale and Support" intro="For ongoing changes, monitoring, and improvements.">
        <MobileSnapCarousel desktopClassName="md:grid-cols-3" itemClassName="w-[90%] md:w-auto">
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Essential Support</h3>
            <p className="mt-2 text-blue">R2,000 / month</p>
            <ul className="mt-3 space-y-2 text-sm text-text1">
              <li>• Monitoring and small fixes</li>
              <li>• Monthly system health check</li>
              <li>• Response targets agreed upfront</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Growth Support</h3>
            <p className="mt-2 text-blue">R4,000 / month</p>
            <ul className="mt-3 space-y-2 text-sm text-text1">
              <li>• New workflows and improvements monthly</li>
              <li>• Ongoing reporting tweaks</li>
              <li>• Priority support window</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Ops Partner</h3>
            <p className="mt-2 text-blue">From R12,500 / month</p>
            <ul className="mt-3 space-y-2 text-sm text-text1">
              <li>• Continuous build queue</li>
              <li>• Process reviews and upgrades</li>
              <li>• Best for multi-team operations</li>
            </ul>
          </Card>
        </MobileSnapCarousel>
        <Button href="/quote" className="mt-6" arrow>
          Request a Quote
        </Button>
      </Section>

      <Section title="FAQ">
        <FAQAccordion items={faqItems} />
      </Section>

      <Section>
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold">Pick a product, or tell us the bottleneck.</h2>
            <p className="mt-3 text-text1">We will recommend the simplest path and price it clearly.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/quote" arrow>
              Request a Quote
            </Button>
            <Button href="/work" variant="secondary">
              View Work
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
