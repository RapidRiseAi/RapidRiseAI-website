import { Section } from '@/components/ui/section';

const date = new Date().toISOString().slice(0,10);
const sections = ['Introduction','Who we are','What information we collect','Where we collect it from','Why we collect it','How we share information','International transfers','Data security','Data retention','Your choices and rights','Marketing','Children','Changes to this policy'];

export default function PrivacyPage(){return <Section title="Privacy Policy" intro={`Last updated: ${date}`}><div className="space-y-6">{sections.map((s)=><div key={s}><h2 className="text-xl font-semibold mb-2">{s}</h2><p className="text-text1">This section explains our approach for {s.toLowerCase()} and how Rapid Rise AI (Pty) Ltd handles personal data in business enquiries and delivery workflows.</p></div>)}</div></Section>}
