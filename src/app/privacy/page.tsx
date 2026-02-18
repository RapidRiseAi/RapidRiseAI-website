import { LegalTemplate } from '@/components/legal-template';

const date = new Date().toISOString().slice(0,10);
const sections = ['Introduction','Who we are','What information we collect','Where we collect it from','Why we collect it','How we share information','International transfers','Data security','Data retention','Your choices and rights','Marketing','Children','Changes to this policy'];

export default function PrivacyPage(){return <LegalTemplate title="Privacy Policy" date={date} sections={sections} body={(s)=>`This section explains our approach for ${s.toLowerCase()} and how Rapid Rise AI (Pty) Ltd handles personal data in business enquiries and delivery workflows.`} />}
