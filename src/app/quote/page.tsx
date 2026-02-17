import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';

export default function QuotePage(){return <><Hero h1="Request a Quote" sub="Tell us what is manual, what keeps slipping through, and what outcome you want. We will scope the cleanest next step." />
<Section intro="Response within 24 hours. No spam."><LeadForm type="quote" /></Section></>}
