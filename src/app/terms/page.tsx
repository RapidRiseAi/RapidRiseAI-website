import { Section } from '@/components/ui/section';
const date = new Date().toISOString().slice(0,10);
const sections = ['Acceptance','Website purpose','No professional advice','Intellectual property','User submissions','Availability and changes','Third-party services','Limitation of liability','Governing law','Contact'];
export default function TermsPage(){return <Section title="Website Terms of Use" intro={`Last updated: ${date}`}><div className="space-y-6">{sections.map((s)=><div key={s}><h2 className="text-xl font-semibold mb-2">{s}</h2><p className="text-text1">These terms apply when you use this website and its forms, content, and tools.</p></div>)}</div></Section>}
