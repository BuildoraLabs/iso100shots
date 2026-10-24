import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ShopPreviewImage } from "@/components/ShopPreviewImage";
import { gallery, categoryLabels } from "@/lib/gallery";
import type { GalleryCategory } from "@/lib/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Shop | Fine-Art Prints & Hospitality Photography",
  description:
    "Explore a curated selection of photographs by Kunal Kapoor for homes, hotels and hospitality spaces. Enquire about prints and commercial licensing.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Photo Shop | iso.100.shots",
    description:
      "A curated selection of photography for considered interiors and hospitality spaces.",
    url: "https://iso100shots.com/shop",
    type: "website"
  }
};

function useCase(category: GalleryCategory) {
  const copy: Record<GalleryCategory, string> = {
    "people-stories":
      "A human moment can bring warmth and a sense of place to a reading corner, café, or relaxed hospitality space.",
    "framed-perspectives":
      "Layered views and strong composition create a thoughtful focal point for a lounge, reception, or guest room.",
    "architecture-heritage":
      "Architectural detail can add a sense of history and local character to a hotel lobby, corridor, or heritage-inspired interior.",
    "landscapes-light":
      "Open horizons, reflective water and warm natural light create a calm focal point for a bedroom, lounge, spa, or guest room.",
    "nature-details":
      "Botanical forms and natural textures bring a quiet accent to bedrooms, wellness areas, and nature-led interiors."
  };
  return copy[category];
}

function imageSource(src: string) {
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : `/${src.replace(/^\//, "")}`;
}

// Curated manually from the existing static gallery. Keep the full portfolio untouched.
const shopPhotoTitles = [
  "Purple Lotus Closeup",
  "Udaipur Sunset Orange Gradient",
  "Sunset With Light Breaking Through",
  "Where The Water Rests",
  "Framed Lake View Through Leaves",
  "Green Canopy Walkway",
  "Udaipur Lake Sunset Lights"
];

const shopPhotos = shopPhotoTitles
  .map((title) => gallery.find((photo) => photo.title === title))
  .filter((photo): photo is (typeof gallery)[number] => Boolean(photo));

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pb-20 pt-28 text-[#f5f5f0] sm:pt-32">
        <section className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-white/45">
            The print & licensing catalogue
          </p>
          <div className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-[1.3fr_0.7fr] md:items-end md:pb-16">
            <div>
              <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-7xl">
                Photographs that make a space feel like somewhere.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 md:text-lg">
                A considered selection of flowers, landscapes and quiet natural scenes by Kunal Kapoor.
                Explore photographs that could complement a home, hotel, resort or wellness space.
              </p>
            </div>
            <div className="border border-white/12 bg-white/[0.035] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">For homes & hospitality</p>
              <p className="mt-3 text-lg leading-7 text-white/82">
                Looking for artwork for guest rooms, a lobby, restaurant or resort?
              </p>
              <a
                className="mt-5 inline-flex border border-white/30 px-4 py-3 text-xs uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black"
                href="mailto:iso100shots.shop@gmail.com?subject=Photography%20print%20or%20hospitality%20licensing%20enquiry"
              >
                Discuss a project <span className="ml-3" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/42">Curated selection</p>
              <h2 className="mt-2 text-2xl font-medium sm:text-3xl">Artwork for considered spaces</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-white/45">
              A small selection chosen for interiors, guest rooms and hospitality spaces.
            </p>
          </div>

          <div className="mb-8 border-y border-white/10 py-5 sm:py-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Prints & licensing</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
              Pricing is discussed individually based on print size, quantity, intended display and licensing rights.
              These are watermarked previews for enquiry only; no payment or direct download is available yet.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shopPhotos.map((photo) => (
              <article key={photo.src} className="overflow-hidden border border-white/10 bg-white/[0.025]">
                <ShopPreviewImage
                  src={imageSource(photo.src)}
                  alt={photo.alt}
                  categoryLabel={categoryLabels[photo.category]}
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white sm:text-xl">{photo.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{useCase(photo.category)}</p>
                  <a
                    className="mt-5 flex w-full items-center justify-between border border-white/25 px-4 py-3 text-xs uppercase tracking-[0.15em] text-white/85 transition hover:border-white hover:bg-white hover:text-black"
                    href={`mailto:iso100shots.shop@gmail.com?subject=${encodeURIComponent(`Enquiry about ${photo.title}`)}&body=${encodeURIComponent(`Hi Kunal,\n\nI am interested in "${photo.title}". Please share print options and/or commercial licensing details for my intended use.\n\nIntended use: `)}`}
                  >
                    Enquire about this photo <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-3 md:py-14">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/42">01 / For your home</p>
              <h2 className="mt-3 text-xl font-medium">A personal focal point</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">Ask about print sizes, framing and finishes to suit your wall and room.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/42">02 / For hotels & resorts</p>
              <h2 className="mt-3 text-xl font-medium">Artwork with a sense of place</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">Enquire about multi-room print projects and commercial image licensing. Final quotes depend on quantities, usage and rights.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/42">03 / Clear rights</p>
              <h2 className="mt-3 text-xl font-medium">Preview first, agree terms</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">This is an enquiry-only catalogue. No checkout, payment or automatic file delivery is enabled yet.</p>
            </div>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-white/35">
            All photographs © Kunal Kapoor / iso.100.shots. Please enquire before reproducing or using an image commercially.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
