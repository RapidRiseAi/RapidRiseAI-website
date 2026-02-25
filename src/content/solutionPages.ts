export type SolutionPageData = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  heroImage: string;
  heroAlt: string;
  problems: string[];
  whatWeBuild: string[];
  workflowSteps: string[];
  delivery: {
    quickWinsTitle: string;
    quickWins: string[];
    coreSystemTitle: string;
    coreSystem: string[];
  };
  whatWeNeed: string[];
  faq: { q: string; a: string }[];
  finalCta: {
    headline: string;
    subhead: string;
    primary: string;
    secondary: string;
  };
};

export const solutionPages: Record<string, SolutionPageData> = {
  'lead-capture': {
    slug: 'lead-capture',
    metaTitle: 'Lead Capture and Follow Up Systems | Rapid Rise AI',
    metaDescription: 'Capture enquiries, route them instantly, and follow up reliably. Track every lead from first message to close.',
    eyebrow: 'SOLUTION',
    h1: 'Lead capture and follow up',
    subhead: 'Stop losing enquiries to slow replies. Track every lead, assign owners, and keep follow-ups consistent.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-lead-capture-hero.jpg',
    heroAlt: 'Lead capture and follow-up system dashboard',
    problems: [
      'Leads arrive from multiple channels and get missed',
      'Follow-ups depend on memory and time',
      'No single place to see status and next actions',
      'Reporting is manual and unreliable',
    ],
    whatWeBuild: [
      'Lead intake from forms, inbox, and messages',
      'Auto confirmation and next step prompts',
      'Owner assignment and status tracking',
      'Reminder rules until handled',
      'Escalation for urgent enquiries',
      'Simple weekly visibility for management',
    ],
    workflowSteps: ['Enquiry received', 'Owner assigned', 'Confirmation sent', 'Follow-up reminders triggered', 'Status tracked to won or lost'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['One lead flow and one tracking view', 'Basic assignment and reminders', 'Handover guide'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Multi-channel capture', 'Advanced routing rules', 'Reporting and QA', 'Team training and handover'],
    },
    whatWeNeed: ['Your current lead sources', 'Who should own leads and when to escalate', 'One person to test and approve'],
    faq: [
      { q: 'Can you work with our current tools?', a: 'Usually yes. If your tools can send emails, export data, or connect by API, we can integrate them.' },
      { q: 'Do you send messages for us?', a: 'We can automate the workflow and templates. Messaging costs and channels depend on your setup.' },
      { q: 'Will we be able to see what is happening?', a: 'Yes. We build clear tracking so status and ownership are visible.' },
      { q: 'Can we start small?', a: 'Yes. Quick Wins is designed to remove one bottleneck first.' },
    ],
    finalCta: {
      headline: 'Want your follow-ups to run on a system?',
      subhead: 'Tell us where leads come from and where they get stuck.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
  'workflow-automation': {
    slug: 'workflow-automation',
    metaTitle: 'Workflow Automation and Integrations | Rapid Rise AI',
    metaDescription: 'Connect your tools, remove manual handoffs, and keep data consistent across the business.',
    eyebrow: 'SOLUTION',
    h1: 'Workflow automation and integrations',
    subhead: 'Connect your tools end to end. Reduce copy-paste work. Keep data consistent.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-workflow-integrations-hero.jpg',
    heroAlt: 'Integration layer diagram connecting business tools',
    problems: ['Tools do not talk to each other', 'Data is duplicated and goes out of sync', 'Handoffs are manual and slow', 'Errors happen when steps are skipped'],
    whatWeBuild: [
      'Integration layer between key tools',
      'Triggers, handoffs, and routing rules',
      'Data sync with validation',
      'Alerts for failed steps',
      'Activity logs where possible',
      'Clean documentation and ownership',
    ],
    workflowSteps: ['Trigger event', 'Data validated', 'Records synced', 'Tasks created', 'Confirmation and logs'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['One integration with clear outcomes', 'Basic error handling', 'Handover guide'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Multiple integrations', 'Routing and approval rules', 'Logs, alerts, and reporting', 'Training and handover'],
    },
    whatWeNeed: ['List of tools involved', 'The exact handoff rules', 'Access to test accounts or sandbox'],
    faq: [
      { q: 'Do integrations break?', a: 'They can if tools change. We build error handling and offer support options.' },
      { q: 'Can you integrate custom software?', a: 'Yes, if it has an API or database access pattern we can work with.' },
      { q: 'Will this replace staff?', a: 'It removes repetitive admin. Your team focuses on higher value work.' },
      { q: 'How do you keep things secure?', a: 'Least access needed, clear ownership, documented handover.' },
    ],
    finalCta: {
      headline: 'Ready to remove manual handoffs?',
      subhead: 'Tell us which tools must connect and what must stay in sync.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
  'google-workspace': {
    slug: 'google-workspace',
    metaTitle: 'Smart Workspace Systems and Automations | Rapid Rise AI',
    metaDescription: 'Turn everyday email, files, docs, and calendars into structured systems with reliable rules and handovers.',
    eyebrow: 'SOLUTION',
    h1: 'Smart workspace systems and automations',
    subhead: 'Turn everyday admin into a structured system. Organise files, messages, and schedules with reliable rules.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-workspace-automation-hero.jpg',
    heroAlt: 'Workspace automation modules for email, files, calendar, and docs',
    problems: ['Inbox and files become messy fast', 'Naming and folder structures are inconsistent', 'Tasks and reminders depend on memory', 'Handover breaks when someone is away'],
    whatWeBuild: ['Structured filing rules', 'Template driven documents', 'Calendar triggers and reminders', 'Task and follow-up rules', 'Shared ownership and access control', 'Clear handover packs'],
    workflowSteps: ['Request submitted', 'Folder created', 'Template generated', 'Calendar reminder set', 'Status updated'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['One structured workflow', 'Templates and rules', 'Handover guide'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Multiple workflows', 'Standard operating structure', 'Reporting and controls', 'Training and handover'],
    },
    whatWeNeed: ['Your current folder and naming habits', 'Your must-have templates', 'Who owns what'],
    faq: [
      { q: 'Will it disrupt how we work?', a: 'We fit the system to your workflow and keep changes practical.' },
      { q: 'Can we phase it in?', a: 'Yes. Start with one workflow and expand.' },
      { q: 'Do we keep control?', a: 'Yes. Access and ownership stay with you.' },
      { q: 'Will my team understand it?', a: 'We deliver training and a handover pack.' },
    ],
    finalCta: {
      headline: 'Want a cleaner operating system for daily work?',
      subhead: 'Tell us what is messy and what must stay consistent.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
  'web-apps': {
    slug: 'web-apps',
    metaTitle: 'Web Apps and Internal Tools | Rapid Rise AI',
    metaDescription: 'Build internal software that matches your workflow: tracking, approvals, quoting, dashboards, and portals.',
    eyebrow: 'SOLUTION',
    h1: 'Web apps and internal tools',
    subhead: 'Build lightweight internal software for tracking, approvals, quoting, and dashboards. Designed around your process.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-web-apps-tools-hero.jpg',
    heroAlt: 'Internal tool dashboard showing queue and approvals',
    problems: ['Spreadsheets become fragile at scale', 'Status tracking is unclear', 'Approvals slow everything down', 'Reporting takes too long'],
    whatWeBuild: ['Internal dashboards and queues', 'Approval and audit friendly flows', 'Simple portals for teams or clients', 'Role based access', 'Clean data structures', 'Documentation and handover'],
    workflowSteps: ['Request created', 'Owner assigned', 'Approval captured', 'Status updated', 'Report generated'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['One internal view and one workflow', 'Basic access control', 'Handover guide'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Multiple modules and roles', 'Approvals and reporting', 'QA and training', 'Handover pack'],
    },
    whatWeNeed: ['Your current steps and bottlenecks', 'Roles and access rules', 'A tester who can approve quickly'],
    faq: [
      { q: 'Can it integrate with our tools?', a: 'Yes. We connect where practical and keep data consistent.' },
      { q: 'Will it be maintainable?', a: 'Yes. Clean structure, documentation, clear ownership.' },
      { q: 'Can clients access it?', a: 'Yes, with a portal if needed.' },
      { q: 'Do we own the system?', a: 'You own access and data. We provide clean handover.' },
    ],
    finalCta: {
      headline: 'Need a tool your team will actually use?',
      subhead: 'Tell us what you track today and what keeps breaking.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
  websites: {
    slug: 'websites',
    metaTitle: 'Websites that Convert | Rapid Rise AI',
    metaDescription: 'Websites built for clear positioning and enquiries. Clean CTAs, fast pages, and better tracking.',
    eyebrow: 'SOLUTION',
    h1: 'Websites that convert',
    subhead: 'Clear positioning. Strong CTA flow. Faster pages. Better enquiries.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-websites-convert-hero.jpg',
    heroAlt: 'Website preview with quote form and clean CTA flow',
    problems: ['Traffic does not turn into enquiries', 'Forms are unclear or too long', 'Trust signals are missing', 'No tracking on what works'],
    whatWeBuild: ['Clear page structure and CTA flow', 'Simple enquiry capture', 'Trust blocks and proof placement', 'Speed and mobile polish', 'Tracking and analytics basics', 'Clean handover for edits'],
    workflowSteps: ['Visitor lands', 'Clear offer shown', 'Simple form submitted', 'Lead routed', 'Follow-up triggered'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['Fix one page or one funnel', 'Improve forms and CTAs', 'Basic tracking'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Full site build or rebuild', 'Multiple pages and flows', 'Tracking and QA', 'Handover pack'],
    },
    whatWeNeed: ['Your offer and target audience', 'Your service list and priorities', 'A contact method to route leads'],
    faq: [
      { q: 'Can you improve our existing site?', a: 'Yes. We can upgrade conversion flow without rebuilding everything.' },
      { q: 'Do you handle hosting?', a: 'We can advise, but ownership stays with you.' },
      { q: 'Will it integrate with follow-up?', a: 'Yes. We can route enquiries into your system.' },
      { q: 'How fast can we launch?', a: 'Quick Wins is designed for fast impact.' },
    ],
    finalCta: {
      headline: 'Want more enquiries from the same traffic?',
      subhead: 'Tell us what you sell and where leads drop off.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
  training: {
    slug: 'training',
    metaTitle: 'Training and Enablement | Rapid Rise AI',
    metaDescription: 'Practical training that makes your team consistent: templates, SOPs, and system handover.',
    eyebrow: 'SOLUTION',
    h1: 'Training and enablement',
    subhead: 'Practical training, templates, and SOPs so your team can run the system confidently.',
    heroImage: '/images/solutions/rapid-rise-ai-solution-training-enablement-hero.jpg',
    heroAlt: 'Training and enablement slide with templates and SOPs',
    problems: ['Tools exist but are not used consistently', 'Processes live in people’s heads', 'Handover is slow and fragile', 'Quality varies by person'],
    whatWeBuild: ['Simple SOPs and checklists', 'Templates for repeated work', 'Role based handover packs', 'Short training sessions', 'Operating standards', 'Ongoing support options'],
    workflowSteps: ['Standard defined', 'Template created', 'Team trained', 'Handover delivered', 'Usage reviewed'],
    delivery: {
      quickWinsTitle: 'Quick Wins (2 weeks)',
      quickWins: ['One team workflow standardised', 'Templates and SOPs', 'Walkthrough session'],
      coreSystemTitle: 'Core System (4 to 6 weeks)',
      coreSystem: ['Multi-workflow enablement', 'Standards and governance', 'Training and handover packs', 'Support options'],
    },
    whatWeNeed: ['Who needs training and why', 'Your current process examples', 'A decision owner to approve standards'],
    faq: [
      { q: 'Is this only training?', a: 'No. We combine templates, SOPs, and system handover so it sticks.' },
      { q: 'Can you train non technical teams?', a: 'Yes. It is practical and process focused.' },
      { q: 'Do you provide recordings?', a: 'If the repo supports it, we can supply summaries and handover docs.' },
      { q: 'Can we add support?', a: 'Yes. Support options are available.' },
    ],
    finalCta: {
      headline: 'Want your team consistent and confident?',
      subhead: 'Tell us what keeps slipping through.',
      primary: 'Request a Quote',
      secondary: 'View Work',
    },
  },
};
