import { siteContent } from '@/content/siteContent';
import { SolutionTemplate } from '@/components/page-template';

export default function Page(){ return <SolutionTemplate content={siteContent.solutionPages['training']} image={'/images/solutions/training.svg'} />; }
