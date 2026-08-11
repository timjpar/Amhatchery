"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type GalleryImage = { src: string; alt: string };

export function GalleryGrid({
  images,
  aspect = "square",
}: {
  images: GalleryImage[];
  /** Tile shape. "portrait" (3:4) suits portrait photos so they aren't cropped. */
  aspect?: "square" | "portrait";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const aspectClass = aspect === "portrait" ? "aspect-[3/4]" : "aspect-square";

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${img.alt} full screen`}
            className={`rounded-card ${aspectClass} relative overflow-hidden border cursor-zoom-in focus:outline-none focus-visible:ring-2`}
            style={{ borderColor: "var(--c-line)" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

/**
 * Rendered only once a tile has been clicked, so it never exists during SSR or
 * hydration — it can portal into document.body without a mounted guard.
 */
function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const next = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const prev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const img = images[index];

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 bg-black/90"
      style={{ touchAction: "pan-y" }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-3 right-3 sm:top-5 sm:right-5 h-11 w-11 rounded-full bg-black/60 text-white text-2xl leading-none flex items-center justify-center cursor-pointer hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white text-2xl items-center justify-center cursor-pointer hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="hidden sm:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white text-2xl items-center justify-center cursor-pointer hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ›
          </button>
        </>
      )}

      <div className="absolute inset-0 p-4 pt-16 pb-12 sm:px-20 sm:py-16 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority
            className="object-contain select-none"
            sizes="100vw"
          />
        </div>
      </div>

      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm pointer-events-none"
          aria-live="polite"
        >
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body,
  );
}
