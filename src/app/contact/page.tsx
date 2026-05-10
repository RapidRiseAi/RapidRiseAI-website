import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactExperience } from './contact-experience';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | Rapid Rise AI',
  description: 'Contact Rapid Rise AI for general questions, partnerships, quick enquiries, or clear next steps on automation and workflow systems.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactExperience />;
}
