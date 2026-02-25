import type { Metadata } from 'next';
import { SolutionTemplate } from '@/components/solution-template';
import { solutionPages } from '@/content/solutionPages';

const data = solutionPages['lead-capture'];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
};

export default function Page() {
  return <SolutionTemplate data={data} />;
}
