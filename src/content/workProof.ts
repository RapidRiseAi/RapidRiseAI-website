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

const WORKSHOP_CLIENT_PORTAL_IMAGES = [
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-01.png',
    alt: 'Workshop client portal dashboard overview',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-02.png',
    alt: 'Workshop client portal job status board',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-03.png',
    alt: 'Workshop client portal customer profile and vehicle details',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-04.png',
    alt: 'Workshop client portal booking and scheduling view',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-05.png',
    alt: 'Workshop client portal service request form',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-06.png',
    alt: 'Workshop client portal workflow and approval steps',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-07.png',
    alt: 'Workshop client portal invoicing and payment summary',
  },
  {
    src: '/images/work/workshop-client-portal/workshop-client-portal-08.png',
    alt: 'Workshop client portal mobile-responsive layout',
  },
];

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

// TODO: Replace placeholder slides with real image lists for the remaining projects.
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
    images: getProjectImages({
      projectName: 'TJ Service & Repairs system',
      realImages: WORKSHOP_CLIENT_PORTAL_IMAGES,
    }),
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
