import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { FormPageLayout } from '@/components/forms/form-layout';

export default function ContactPage(){return <><Hero h1="Contact" sub="Prefer a quote request? Use the Request a Quote form for faster scoping." visual="/images/hero/rapid-rise-ai-contact-request-a-quote.jpg" alt="Request a quote contact module" compactMobile />
<Section><FormPageLayout title="Send a message"><LeadForm type="contact" /></FormPageLayout></Section></>}
