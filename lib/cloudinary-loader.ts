type CloudinaryLoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

/** Let Cloudinary resize/format/quality-optimize remote images before delivery. */
export function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderArgs) {
  const cleanSrc = src.replace(/\/(?:f_auto,q_auto|w_\d+,c_limit,f_auto,q_[^/]+)\//g, "/");
  return cleanSrc.replace(
    "/image/upload/",
    `/image/upload/w_${width},c_limit,f_auto,q_${quality ?? "auto"}/`
  );
}
