import { Section } from '@/components/ui/section';
const date = new Date().toISOString().slice(0,10);
const sections = ['What cookies are','Cookies we use','Managing cookies','Third-party tools','Updates'];
export default function CookiesPage(){return <Section title="Cookie Policy" intro={`Last updated: ${date}`}><div className="space-y-6">{sections.map((s)=><div key={s}><h2 className="text-xl font-semibold mb-2">{s}</h2><p className="text-text1">This section describes {s.toLowerCase()} for this website, including analytics controls and consent behavior.</p></div>)}</div></Section>}
