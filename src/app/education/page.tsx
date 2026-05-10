import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { EducationExperience } from './education-experience';

export const metadata: Metadata = buildMetadata({
  title: 'Education | Rapid Rise AI',
  description: 'Practical AI, automation, and workflow training that helps teams adopt modern systems and execute with confidence.',
  path: '/education',
});

export default function EducationPage() {
  return <EducationExperience />;
}
