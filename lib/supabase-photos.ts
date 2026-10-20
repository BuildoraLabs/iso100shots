import type { GalleryCategory, GalleryItem } from "@/lib/gallery";

type SupabasePhoto = {
  id: string;
  title: string;
  slug: string;
  caption: string | null;
  alt_text: string | null;
  image_path: string;
  image_url: string | null;
  category: string | null;
  status: string;
  featured: boolean | null;
  created_at: string | null;
};

const categoryMap: Record<string, GalleryCategory> = {
  "people-stories": "people-stories",
  people: "people-stories",
  "framed-perspectives": "framed-perspectives",
  "architecture-heritage": "architecture-heritage",
  architecture: "architecture-heritage",
  heritage: "architecture-heritage",
  "landscapes-light": "landscapes-light",
  landscape: "landscapes-light",
  landscapes: "landscapes-light",
  sunset: "landscapes-light",
  "nature-details": "nature-details",
  nature: "nature-details",
  wildlife: "nature-details"
};

function toGalleryCategory(category: string | null): GalleryCategory {
  if (!category) return "landscapes-light";
  return categoryMap[category.trim().toLowerCase()] ?? "landscapes-light";
}

export async function getPublishedSupabasePhotos(): Promise<GalleryItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Keep the current gallery working until the Vercel environment variables are configured.
  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const endpoint = new URL("/rest/v1/photos", supabaseUrl);
    endpoint.searchParams.set(
      "select",
      "id,title,slug,caption,alt_text,image_path,image_url,category,status,featured,created_at"
    );
    endpoint.searchParams.set("status", "eq.published");
    endpoint.searchParams.set("order", "created_at.desc");

    const response = await fetch(endpoint.toString(), {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      // Refresh published images regularly without rebuilding the website.
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      console.error("Supabase photo query failed:", response.status, await response.text());
      return [];
    }

    const photos = (await response.json()) as SupabasePhoto[];

    return photos
      .filter((photo) => photo.status === "published")
      .filter((photo) => Boolean(photo.image_url || photo.image_path))
      .map((photo) => ({
        src: photo.image_url || photo.image_path,
        category: toGalleryCategory(photo.category),
        title: photo.title,
        alt: photo.alt_text || photo.caption || photo.title,
        isHero: Boolean(photo.featured)
      }));
  } catch (error) {
    console.error("Unable to load photos from Supabase:", error);
    return [];
  }
}
