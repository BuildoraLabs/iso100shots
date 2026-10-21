"use client";

import { useMemo, useState } from "react";
import {
  categoryLabels,
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem
} from "@/lib/gallery";
import { Lightbox } from "@/components/Lightbox";

type Filter = "all" | GalleryCategory;

type GalleryProps = {
  items?: GalleryItem[];
};

function imageSource(src: string) {
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : `/${src.replace(/^\//, "")}`;
}

export function Gallery({ items = gallery }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const visibleImages = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((image) => image.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <section
      id="gallery"
      className="scroll-mt-20 border-y border-white/10 bg-[linear-gradient(180deg,#080807_0%,#11100d_48%,#060606_100%)] py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <p className="mb-7 text-sm uppercase tracking-[0.32em] text-white/45">Gallery</p>
      </div>

      <div className="mb-7">
        <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-4 pb-2 sm:px-6 lg:flex-wrap lg:px-8 [&::-webkit-scrollbar]:hidden">
          {galleryCategories.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                className={`shrink-0 border px-4 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-200 sm:tracking-[0.18em] ${
                  isActive
                    ? "border-white bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.14)]"
                    : "border-white/25 bg-white/[0.03] text-white/68 hover:border-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {categoryLabels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* CSS columns keep a natural masonry flow; no fixed-height rows or image cropping. */}
        <div
          className={
            activeFilter === "all"
              ? "columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-3"
              : "columns-1 gap-5 sm:columns-2 lg:columns-2 2xl:columns-2"
          }
        >
          {visibleImages.map((image) => {
            const isCloudinary = /^(https?:)?\/\/res\.cloudinary\.com\//i.test(image.src);
            return (
              <button
                key={image.src}
                type="button"
                className="group relative mb-5 inline-block w-full break-inside-avoid overflow-hidden border border-white/10 bg-white/[0.035] text-left shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={isCloudinary ? image.src : imageSource(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    // Don't leave an empty black card when an image URL is invalid or unavailable.
                    const card = event.currentTarget.closest("button");
                    if (card) card.remove();
                  }}
                  className="block h-auto w-full brightness-[0.96] contrast-[1.04] saturate-[1.08] transition duration-500 group-hover:brightness-100 group-hover:saturate-[1.12]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 opacity-100 transition duration-300 sm:p-5 lg:opacity-0 lg:group-hover:opacity-100">
                  <span className="line-clamp-2 block text-sm font-medium leading-5 text-white sm:text-base">
                    {image.title}
                  </span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.16em] text-white/80 sm:text-xs sm:tracking-[0.2em]">
                    {categoryLabels[image.category]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
