"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryItem } from "@/lib/gallery";

function imageSource(src: string) {
  return src.startsWith("http://") || src.startsWith("https://") ? src : `/${src.replace(/^\//, "")}`;
}

type LightboxProps = {
  image: GalleryItem | null;
  onClose: () => void;
};

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    if (!image) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 px-3 py-6 backdrop-blur-md sm:px-4 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-2xl leading-none text-white/70 transition hover:bg-white/10 hover:text-white sm:right-5 sm:top-5"
        type="button"
        aria-label="Close lightbox"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        &times;
      </button>
      <figure className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <div className="relative mx-auto h-[68svh] w-full overflow-hidden bg-charcoal sm:h-[72vh]">
          <Image
            src={imageSource(image.src)}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <figcaption className="mx-auto mt-5 max-w-3xl text-center">
          <h3 className="text-lg font-medium text-white sm:text-2xl">{image.title}</h3>
          <p className="mt-2 text-sm text-white/52">Selected work from iso.100.shots</p>
        </figcaption>
      </figure>
    </div>
  );
}
