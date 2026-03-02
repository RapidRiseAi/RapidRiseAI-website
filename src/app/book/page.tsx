import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { FormPageLayout } from '@/components/forms/form-layout';

export default function BookPage(){return <><Hero h1="Book a Call" sub="If you want, we can walk through your workflow and identify quick wins." cta2="View Work" visual="/images/hero/book-a-call-hero.jpg" alt="Consultation planning session" compactMobile imageClassName="aspect-video w-full rounded-xl object-cover object-center" mobileImageClassName="h-full w-full object-cover object-center" />
<Section><FormPageLayout title="Book a Call"><LeadForm type="booking" /></FormPageLayout></Section></>}
