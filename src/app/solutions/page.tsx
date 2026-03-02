import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Button } from '@/components/ui/button';

export default function SolutionsPage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Choose your outcome."
        sub="We build systems that reduce admin, speed up response, and make operations easier to run."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-workflow-automation-integrations-hero.jpg"
        alt="Workflow automation integrations diagram"
      />
      <Section label="Solutions" title="What do you want to improve?">
        <FeatureGrid
          items={[
            {
              title: 'Lead capture and follow up',
              description: 'Capture enquiries, route them, and keep follow-ups reliable.',
              href: '/solutions/lead-capture',
            },
            {
              title: 'Workflow automation and integrations',
              description: 'Connect tools, remove handoffs, and keep data in sync.',
              href: '/solutions/workflow-automation',
            },
            {
              title: 'Smart workspace systems and automations',
              description: 'Organise files, docs, and calendars with practical rules.',
              href: '/solutions/google-workspace',
            },
            {
              title: 'Web apps and internal tools',
              description: 'Build internal dashboards, approvals, and portals.',
              href: '/solutions/web-apps',
            },
            {
              title: 'Websites that convert',
              description: 'Improve CTA flow and enquiry capture across key pages.',
              href: '/solutions/websites',
            },
            {
              title: 'Training and enablement',
              description: 'Equip teams with SOPs, templates, and handover.',
              href: '/solutions/training',
            },
          ]}
        />
      </Section>
      <Section>
        <div className="card-surface p-8">
          <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Not sure what you need?</h3>
          <p className="mt-3 max-w-2xl text-text1">
            Tell us what is currently manual and what keeps slipping through. We will recommend the cleanest next step.
          </p>
          <Button href="/quote" className="mt-5" arrow>
            Request a Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
