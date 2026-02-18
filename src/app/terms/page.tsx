import { LegalTemplate } from '@/components/legal-template';

const date = new Date().toISOString().slice(0,10);
const sections = ['Acceptance','Website purpose','No professional advice','Intellectual property','User submissions','Availability and changes','Third-party services','Limitation of liability','Governing law','Contact'];

export default function TermsPage(){return <LegalTemplate title="Website Terms of Use" date={date} sections={sections} body={()=>'These terms apply when you use this website and its forms, content, and tools.'} />}
