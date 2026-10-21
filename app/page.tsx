import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { gallery, heroImage } from "@/lib/gallery";
import { getPublishedCloudinaryPhotos } from "@/lib/cloudinary-photos";
import {
  absoluteUrl,
  photographerName,
  siteDescription,
  siteName,
  socialLinks
} from "@/lib/seo";

export default async function Home() {
  const cloudinaryPhotos = await getPublishedCloudinaryPhotos();
  // Cloudinary photos appear first; the bundled gallery remains as a permanent fallback.
  const allGallery = [...cloudinaryPhotos, ...gallery];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: photographerName,
        url: absoluteUrl("/"),
        jobTitle: "Photographer",
        image: absoluteUrl(`/${heroImage.src}`),
        sameAs: socialLinks
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteName,
        url: absoluteUrl("/"),
        description: siteDescription,
        inLanguage: "en-IN",
        publisher: {
          "@id": absoluteUrl("/#person")
        }
      },
      {
        "@type": "ImageGallery",
        "@id": absoluteUrl("/#gallery"),
        name: `${siteName} Photography Gallery`,
        url: absoluteUrl("/#gallery"),
        description:
          "Selected street, heritage, landscape, and nature photographs by Kunal Kapoor.",
        creator: {
          "@id": absoluteUrl("/#person")
        },
        image: allGallery.map((image) => ({
          "@type": "ImageObject",
          name: image.title,
          caption: image.alt,
          contentUrl: image.src.startsWith("http://") || image.src.startsWith("https://")
            ? image.src
            : absoluteUrl(`/${image.src}`),
          url: image.src.startsWith("http://") || image.src.startsWith("https://")
            ? image.src
            : absoluteUrl(`/${image.src}`),
          creator: {
            "@id": absoluteUrl("/#person")
          }
        }))
      },
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/#contact"),
        name: `Contact ${photographerName}`,
        url: absoluteUrl("/#contact"),
        mainEntity: {
          "@id": absoluteUrl("/#person")
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <section className="fade-in mx-auto max-w-5xl px-5 py-16 text-center sm:py-20 md:px-6 md:py-32">
          <p className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl md:text-7xl">
            iso.100.shots
          </p>
          <p className="mt-4 text-lg font-medium text-white/72 sm:text-xl md:mt-5 md:text-3xl">
            by Kunal Kapoor
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/58 md:text-xl">
            People, streets & everyday stories
          </p>
        </section>
        <Gallery items={allGallery} />
        <section
          id="about"
          className="fade-in mx-auto max-w-3xl scroll-mt-20 px-5 py-20 text-center sm:py-24 md:px-6 md:py-28"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-white/45">About</p>
          <h2 className="text-3xl font-medium tracking-normal text-fog md:text-5xl">
            Kunal Kapoor
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/42">
            Photographer | India
          </p>
          <p className="mt-8 text-base leading-8 text-white/62 md:text-lg">
            I capture everyday moments, people, and street life through natural
            light and real expressions. My work focuses on authenticity,
            simplicity, and unnoticed details from daily life.
          </p>
        </section>
        <section
          id="contact"
          className="fade-in scroll-mt-20 border-y border-white/10 bg-cover bg-center px-5 py-20 text-center sm:px-6 md:py-24"
         style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.72)), url('/images/nature-details/purple-lotus-closeup.jpg')"
            }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-white/45">Contact</p>
          <h2 className="text-3xl font-medium text-fog md:text-5xl">Let&apos;s work together</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
            Reach out to collaborate, or connect with me on Instagram to see my latest work.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 text-white/65">
            <p>
              Email:{" "}
              <a className="break-all transition hover:text-white" href="mailto:iso100shots.shop@gmail.com">
                iso100shots.shop@gmail.com
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                className="transition hover:text-white"
                href="https://instagram.com/iso.100.shots"
                target="_blank"
                rel="noreferrer"
              >
                instagram.com/iso.100.shots
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
