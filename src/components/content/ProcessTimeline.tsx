import { Steps } from '@/components/ui/steps';

export type ProcessTimelineProps = React.ComponentProps<typeof Steps>;

export function ProcessTimeline(props: ProcessTimelineProps) {
  return <Steps {...props} />;
}
