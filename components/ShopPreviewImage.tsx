"use client";

import Image from "next/image";

type ShopPreviewImageProps = {
  src: string;
  alt: string;
  categoryLabel: string;
};

export function ShopPreviewImage({ src, alt, categoryLabel }: ShopPreviewImageProps) {
  return (
    <div className="relative aspect-[4/3] select-none bg-[#111]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="pointer-events-none object-cover"
        draggable={false}
        loading="lazy"
      />
      <span className="absolute bottom-3 left-3 border border-white/20 bg-black/65 px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-white/75 backdrop-blur">
        {categoryLabel}
      </span>
    </div>
  );
}
