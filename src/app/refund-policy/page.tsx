import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';

const policySections = [
  {
    title: '1. Overview',
    paragraphs: [
      'This Refund and Cancellation Policy applies to services and digital offerings provided by Rapid Rise AI (Pty) Ltd, including education and training services, software development services, AI automation services, chatbot solutions, consulting, and related digital deliverables.',
    ],
  },
  {
    title: '2. Service Nature',
    paragraphs: [
      'Because many of our services involve digital delivery, consulting time, custom development, implementation work, or access to training content, refund eligibility depends on the type of service purchased and the stage of delivery at the time a cancellation request is made.',
    ],
  },
  {
    title: '3. Custom Software and Project-Based Work',
    paragraphs: [
      'For custom software development, chatbot builds, automation projects, or any other project-based service, work usually begins after project confirmation, payment of a deposit, or written approval to proceed.',
    ],
  },
  {
    title: '4. Refunds for Project Work',
    bullets: [
      'Deposits and upfront project reservation fees are generally non-refundable once project planning, scoping, research, or development work has started.',
      'If a client cancels before work has started, any refund will be assessed case by case, less any administrative or third-party costs already incurred.',
      'If a project is cancelled after work has started, the client may be billed for work completed up to the cancellation date, and any refund will be limited to the unused portion of fees already paid, if applicable.',
      'Completed milestones, delivered files, approved concepts, and already-rendered services are non-refundable.',
    ],
  },
  {
    title: '5. Education, Training, and Digital Services',
    paragraphs: ['For education, training, workshops, consultations, and other digital service offerings:'],
    bullets: [
      'Consultation fees, once the consultation has taken place, are non-refundable.',
      'If a training session, coaching session, or workshop is cancelled by the client with reasonable notice before delivery, rescheduling may be offered at our discretion.',
      'Where access has already been granted to digital training materials, recordings, templates, or other downloadable resources, refunds are generally not available.',
      'If a paid educational event is cancelled by us before delivery, the client may choose a reschedule, credit, or refund.',
    ],
  },
  {
    title: '6. Cancellation Requests',
    paragraphs: [
      'Clients who wish to cancel a service must submit their request in writing as soon as possible. Once work has commenced, cancellation may still be accepted, but fees may apply for work already completed, time already allocated, or expenses already incurred.',
    ],
  },
  {
    title: '7. Company-Initiated Cancellations',
    paragraphs: [
      'If Rapid Rise AI (Pty) Ltd is unable to deliver a paid service for reasons within our control, the client may be offered either a rescheduled delivery, service credit, or a partial or full refund depending on the circumstances and the amount of work already completed.',
    ],
  },
  {
    title: '8. Non-Refundable Situations',
    bullets: [
      'Change of mind after work has commenced or digital access has been granted.',
      'Delays caused by the client, including delayed feedback, missing approvals, or failure to provide required materials.',
      'Requests for refunds on completed deliverables, completed sessions, or already-supplied digital products.',
      'Any circumstance where a refund is prohibited from being issued in full because part of the service has already been consumed or delivered.',
    ],
  },
  {
    title: '9. Chargebacks and Disputes',
    paragraphs: [
      'Clients are encouraged to contact us directly first so that we can review and resolve any payment or service issue in good faith before a formal payment dispute or chargeback is initiated.',
    ],
  },
  {
    title: '10. Contact and Resolution',
    paragraphs: [
      'Questions regarding refunds, cancellations, or service concerns should be submitted through the contact details made available on our website or through the official communication channel used for the project or service booking.',
    ],
  },
  {
    title: '11. Policy Updates',
    paragraphs: [
      'We may update this Refund and Cancellation Policy from time to time. The version published on our website at the time of purchase or engagement will apply unless otherwise required by law.',
      'This policy is intended to be fair and commercially reasonable while recognising the time-based and digital nature of the services we provide. Nothing in this policy limits any rights that may apply under applicable law.',
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Section label="Legal" title="Refund and Cancellation Policy" intro="Rapid Rise AI (Pty) Ltd · Effective date: 14 March 2026" />

      <Section className="pt-0" title="Contents">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          {policySections.map((section, i) => (
            <a
              key={section.title}
              href={`#s-${i}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-stroke px-4 text-sm text-text1 hover:text-text0"
            >
              {section.title.replace(/^\d+\.\s*/, '')}
            </a>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden h-fit rounded-card border border-stroke p-4 lg:sticky lg:top-24 lg:block">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue">Contents</p>
            <div className="space-y-1">
              {policySections.map((section, i) => (
                <a key={section.title} href={`#s-${i}`} className="block text-sm text-text1 hover:text-text0">
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            {policySections.map((section, i) => (
              <article id={`s-${i}`} key={section.title}>
                <Card className="space-y-4 p-6">
                  <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-text1">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5 text-text1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
