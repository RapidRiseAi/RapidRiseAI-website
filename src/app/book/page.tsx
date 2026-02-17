import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';

export default function BookPage(){return <><Hero h1="Book a Call" sub="If you want, we can walk through your workflow and identify quick wins." />
<Section><LeadForm type="booking" /></Section></>}
