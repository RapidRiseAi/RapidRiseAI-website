import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { FormPageLayout } from '@/components/forms/form-layout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Quote | Rapid Rise AI',
  description: 'System Diagnostic Intake. Tell us what is manual, delayed, or hard to track and we will scope the cleanest next step.',
  path: '/quote',
});

export default function QuotePage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Show us the leak. We will scope the system."
        sub="Tell us what is manual, delayed, or hard to track. We will recommend the cleanest next step."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-request-a-quote-hero.jpg"
        alt="System diagnostic intake panel"
      />
      <Section>
        <FormPageLayout title="System Diagnostic Intake">
          <LeadForm type="quote" />
        </FormPageLayout>
      </Section>
    </>
  );
}
