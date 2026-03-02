import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { FormPageLayout } from '@/components/forms/form-layout';

export default function QuotePage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Request a Quote"
        sub="Tell us what is manual, what keeps slipping through, and what outcome you want. We will scope the cleanest next step."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-request-a-quote-hero.jpg"
        alt="Request a quote hero image"
      />
      <Section>
        <FormPageLayout title="Request a Quote">
          <LeadForm type="quote" />
        </FormPageLayout>
      </Section>
    </>
  );
}
