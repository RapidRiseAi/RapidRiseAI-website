import { siteContent } from '@/content/siteContent';
import { SolutionTemplate } from '@/components/page-template';

export default function Page(){ return <SolutionTemplate content={siteContent.solutionPages['workflow-automation']} image={'/images/solutions/workflow-automation.svg'} />; }
