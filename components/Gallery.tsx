"use client";

import Image from "next/image";
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
  return src.startsWith("http://") || src.startsWith("https://") ? src : `/${src.replace(/^\//, "")}`;
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
      className="scroll-mt-20 overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#080807_0%,#11100d_48%,#060606_100%)] py-16 sm:py-20 md:py-28"
    >
      <div className="fade-in mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.32em] text-white/45">Gallery</p>
            {   /*  <h2 className="text-3xl font-medium text-fog sm:text-4xl md:text-6xl">
              Select frames
            </h2> */}
          </div>
         {   /*  <p className="max-w-md text-sm leading-6 text-white/56 sm:text-base">
            Light, streets, heritage, and small moments arranged with a little
            more breathing room on touch screens.
          </p> */}
        </div>
      </div>

      <div className="mb-8 overflow-hidden md:mb-10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-2 md:flex-wrap md:px-8 [&::-webkit-scrollbar]:hidden">
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

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {visibleImages.map((image, index) => {
            const isFeature = index % 7 === 0;
            return (
              <button
                key={image.src}
                type="button"
                className={`group relative block w-full overflow-hidden border border-white/10 bg-white/[0.035] text-left shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.055] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  isFeature ? "sm:col-span-2 xl:col-span-2" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <span
                  className={`relative block w-full ${
                    isFeature ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3] sm:aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={imageSource(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover brightness-[0.96] contrast-[1.04] saturate-[1.08] transition duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:saturate-[1.16]"
                    sizes={
                      isFeature
                        ? "(min-width: 1280px) 66vw, (min-width: 640px) 100vw, 100vw"
                        : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/24" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/45 to-transparent p-4 transition duration-500 sm:p-5 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <span className="line-clamp-2 block text-sm font-medium leading-5 text-white sm:text-base">
                      {image.title}
                    </span>
                    <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.16em] text-white/58 sm:text-xs sm:tracking-[0.2em]">
                      {categoryLabels[image.category]}
                    </span>
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
