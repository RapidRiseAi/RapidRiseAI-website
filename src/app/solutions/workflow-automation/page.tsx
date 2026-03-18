import type { Metadata } from 'next';
import { SolutionTemplate } from '@/components/solution-template';
import { solutionPages } from '@/content/solutionPages';
import { buildMetadata } from '@/lib/seo';

const data = solutionPages['workflow-automation'];

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: '/solutions/workflow-automation',
});

export default function Page() {
  return <SolutionTemplate data={data} />;
}
