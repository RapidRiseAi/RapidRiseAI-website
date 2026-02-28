'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
};

type WorkProofGalleryProps = {
  images: GalleryImage[];
  projectTitle: string;
};

export function WorkProofGallery({ images, projectTitle }: WorkProofGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const totalSlides = images.length;
  const activeImage = images[activeIndex];

  const goPrev = () => setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  const goNext = () => setActiveIndex((current) => (current + 1) % totalSlides);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }

      if (event.key === 'ArrowLeft') {
        goPrev();
      }

      if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isModalOpen]);

  const renderDots = (location: 'inline' | 'modal') =>
    images.map((image, index) => (
      <button
        key={`${location}-${image.alt}-${index}`}
        type="button"
        className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? 'bg-blue' : 'bg-white/35 hover:bg-white/60'}`}
        onClick={() => setActiveIndex(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ));

  return (
    <>
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl border border-stroke">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1200}
            height={675}
            className="aspect-video w-full object-cover object-center"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <span className="rounded-full border border-stroke bg-bg1/85 px-3 py-1 text-xs text-text1">
              {activeIndex + 1} / {totalSlides}
            </span>
          </div>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-stroke bg-bg1/90 p-2 text-text0 hover:bg-bg2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-stroke bg-bg1/90 p-2 text-text0 hover:bg-bg2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">{renderDots('inline')}</div>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-stroke px-4 py-2 text-xs text-text0 transition hover:bg-white/5"
          >
            Open gallery
          </button>
        </div>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-6xl" onMouseDown={(event) => event.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close gallery"
              className="absolute right-3 top-3 z-10 rounded-full border border-stroke bg-bg1/90 p-2 text-text0 hover:bg-bg2"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden rounded-xl border border-stroke bg-bg1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={1600}
                height={900}
                className="aspect-video w-full object-contain"
                priority={false}
              />
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-stroke bg-bg1/90 p-2 text-text0 hover:bg-bg2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-stroke bg-bg1/90 p-2 text-text0 hover:bg-bg2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">{renderDots('modal')}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
