import { LegalTemplate } from '@/components/legal-template';

const date = new Date().toISOString().slice(0,10);
const sections = ['What cookies are','Cookies we use','Managing cookies','Third-party tools','Updates'];

export default function CookiesPage(){return <LegalTemplate title="Cookie Policy" date={date} sections={sections} body={(s)=>`This section describes ${s.toLowerCase()} for this website, including analytics controls and consent behavior.`} />}
