import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { Button } from '@/components/ui/button';

export default function ContactPage(){return <><Hero h1="Contact" sub="Prefer a quote request? Use the Request a Quote form for faster scoping." />
<Section><div className="mb-4 flex gap-3"><Button href="/quote">Request a Quote</Button><Button href="/book" variant="secondary">Book a Call</Button></div><h2 className="text-2xl font-semibold mb-2">Send a message</h2><p className="mb-6 text-text1">We reply within 24 hours.</p><LeadForm type="contact" /></Section></>}
