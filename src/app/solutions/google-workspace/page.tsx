import type { Metadata } from 'next';
import { SolutionTemplate } from '@/components/solution-template';
import { solutionPages } from '@/content/solutionPages';
import { buildMetadata } from '@/lib/seo';

const data = solutionPages['google-workspace'];

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: '/solutions/google-workspace',
});

export default function Page() {
  return <SolutionTemplate data={data} />;
}
