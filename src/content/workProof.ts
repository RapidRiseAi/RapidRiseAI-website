export type WorkProofType = 'client' | 'internal' | 'demo';

export type WorkProofProject = {
  id: string;
  title: string;
  type: WorkProofType;
  builtForLabel: string;
  tags: string[];
  problem: string;
  build: string;
  outcome: string;
  images: Array<{ src: string; alt: string }>;
};

const PLACEHOLDER_IMAGE = '/images/work/to-be-replaced.jpg';

function createPlaceholderSlides(projectName: string) {
  return Array.from({ length: 5 }, (_, index) => ({
    src: PLACEHOLDER_IMAGE,
    alt: `${projectName} screenshot ${index + 1}`,
  }));
}

function getProjectImages(params: { projectName: string; realImages?: Array<{ src: string; alt: string }> }) {
  if (params.realImages?.length) {
    return params.realImages;
  }

  return createPlaceholderSlides(params.projectName);
}

// TODO: Replace placeholder slides with real image lists when assets are added.
// Use these filename prefixes for consistency:
// - tj-service-repairs- (jpg/png)
// - petguardian-quote- (jpg/png)
// - hotel-faq-bot- (jpg/png)
export const workProofProjects: WorkProofProject[] = [
  {
    id: 'tj-service-repairs',
    title: 'Business management system with a client dashboard',
    type: 'client',
    builtForLabel: 'TJ Service & Repairs',
    tags: ['Web app', 'Dashboard', 'Workflows'],
    problem: 'Operations were tracked manually and status was hard to see at a glance.',
    build: 'A management system with a client dashboard and structured tracking.',
    outcome: 'Cleaner tracking and better visibility across jobs and updates.',
    images: getProjectImages({ projectName: 'TJ Service & Repairs system' }),
  },
  {
    id: 'petguardian-quote',
    title: 'Quote request and follow-up system',
    type: 'internal',
    builtForLabel: 'Internal (PetGuardian)',
    tags: ['Intake', 'Tracking', 'Follow-up'],
    problem: 'Quote requests needed a structured intake and consistent follow-up.',
    build: 'A simple quote request flow that captures details and tracks status.',
    outcome: 'Faster response and cleaner tracking from request to close.',
    images: getProjectImages({ projectName: 'PetGuardian quote system' }),
  },
  {
    id: 'hotel-faq-bot',
    title: 'Hotel FAQ chatbot that can handle bookings',
    type: 'demo',
    builtForLabel: 'Demo',
    tags: ['Support', 'Bookings', 'Handoff'],
    problem: 'Guests need fast answers and booking help without waiting for staff.',
    build: 'A website FAQ bot that answers questions, captures booking intent, and hands off with context.',
    outcome: 'Faster responses and fewer repetitive questions for the team.',
    images: getProjectImages({ projectName: 'Hotel FAQ chatbot demo' }),
  },
];

export function getWorkProofTypeLabel(type: WorkProofType) {
  const typeMap: Record<WorkProofType, string> = {
    client: 'Client',
    internal: 'Internal',
    demo: 'Demo',
  };

  return typeMap[type];
}
