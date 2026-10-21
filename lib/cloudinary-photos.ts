import type { GalleryCategory, GalleryItem } from "@/lib/gallery";

type CloudinaryAsset = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  tags?: string[];
  context?: {
    custom?: Record<string, string>;
  };
  filename?: string;
};

const categories: GalleryCategory[] = [
  "people-stories",
  "framed-perspectives",
  "architecture-heritage",
  "landscapes-light",
  "nature-details"
];

function categoryForAsset(asset: CloudinaryAsset): GalleryCategory {
  const tags = (asset.tags ?? []).map((tag) => tag.toLowerCase());
  const categoryTag = tags.find((tag) => categories.includes(tag as GalleryCategory));
  return (categoryTag as GalleryCategory | undefined) ?? "landscapes-light";
}

function titleFromPublicId(publicId: string): string {
  const filename = publicId.split("/").pop() ?? publicId;
  return filename
    .replace(/[_-]+/g, " ")
    .replace(/\.[^.]+$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export async function getPublishedCloudinaryPhotos(): Promise<GalleryItem[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Cloudinary is optional: if credentials are absent, the local gallery remains available.
  if (!cloudName || !apiKey || !apiSecret) return [];

  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/resources/search`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        expression: "resource_type:image AND tags=portfolio",
        sort_by: [{ created_at: "desc" }],
        max_results: 100,
        with_field: ["context", "tags"]
      }),
      // New uploads appear on the site after a short cache window.
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      console.error("Cloudinary photo search failed:", response.status, await response.text());
      return [];
    }

    const data = (await response.json()) as { resources?: CloudinaryAsset[] };
    return (data.resources ?? [])
      .filter((asset) => Boolean(asset.secure_url && asset.public_id))
      .map((asset) => {
        const custom = asset.context?.custom ?? {};
        const title = custom.title?.trim() || titleFromPublicId(asset.public_id);
        return {
          src: asset.secure_url,
          width: asset.width,
          height: asset.height,
          category: categoryForAsset(asset),
          title,
          alt: custom.alt?.trim() || title,
          isHero: false
        };
      });
  } catch (error) {
    console.error("Unable to load photos from Cloudinary:", error);
    return [];
  }
}
