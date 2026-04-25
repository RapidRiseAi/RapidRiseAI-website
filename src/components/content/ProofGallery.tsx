import { WorkProofGallery } from '@/components/ui/work-proof-gallery';

export type ProofGalleryProps = React.ComponentProps<typeof WorkProofGallery>;

export function ProofGallery(props: ProofGalleryProps) {
  return <WorkProofGallery {...props} />;
}
