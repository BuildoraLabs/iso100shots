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

// Camera filenames such as "NIK_1481" or "IMG 0042" make poor titles and useless alt text.
function looksLikeCameraFilename(value: string): boolean {
  return /^(?:[a-z]{1,5}[\s_-]?)?\d{3,}$/i.test(value.trim());
}

function canonicalCloudinaryUrl(url: string): string {
  // Different delivery transformations can point to the same underlying asset.
  return url
    .replace(/\/image\/upload\/(?:[^/]+\/)*(?=v\d+\/)/, "/image/upload/")
    .split("?")[0]
    .toLowerCase();
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
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      console.error("Cloudinary photo search failed:", response.status, await response.text());
      return [];
    }

    const data = (await response.json()) as { resources?: CloudinaryAsset[] };
    const seen = new Set<string>();

    return (data.resources ?? [])
      .filter((asset) => Boolean(asset.secure_url && asset.public_id))
      .filter((asset) => {
        const key = asset.public_id.toLowerCase() || canonicalCloudinaryUrl(asset.secure_url);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((asset) => {
        const custom = asset.context?.custom ?? {};
        const metadataTitle = custom.title?.trim() || custom.caption?.trim();
        const metadataAlt = custom.alt?.trim() || custom.description?.trim();
        const filenameTitle = titleFromPublicId(asset.public_id);

        if (!metadataTitle) {
          console.warn(
            `Cloudinary asset "${asset.public_id}" has no title/caption in its contextual metadata.`
          );
        }

        const title =
          metadataTitle ||
          (looksLikeCameraFilename(filenameTitle) ? "Untitled photograph" : filenameTitle);

        return {
          src: asset.secure_url,
          width: asset.width,
          height: asset.height,
          category: categoryForAsset(asset),
          title,
          alt: metadataAlt || metadataTitle || `${title} by Kunal Kapoor`,
          isHero: false
        };
      });
  } catch (error) {
    console.error("Unable to load photos from Cloudinary:", error);
    return [];
  }
}
