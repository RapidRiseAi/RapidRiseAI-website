import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { FormPageLayout } from '@/components/forms/form-layout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | Rapid Rise AI',
  description: 'Send a message for partnerships, questions, or quick enquiries. Use Request a Quote for scoped builds.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Hero
        h1="Send the message. We will map the next step."
        sub="For general questions, partnerships, or quick enquiries. Use Request a Quote for build scoping."
        cta2="Request a Quote"
        cta2Href="/quote"
        visual="/images/hero/rapid-rise-ai-contact-request-a-quote.jpg"
        alt="Contact and trust details"
        compactMobile
      />
      <Section>
        <FormPageLayout title="Contact Rapid Rise AI">
          <LeadForm type="contact" />
        </FormPageLayout>
      </Section>
    </>
  );
}
