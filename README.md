iso.100.shots — Photography Portfolio
A Next.js App Router + TypeScript + Tailwind CSS portfolio for Kunal Kapoor.
Image delivery and fallback
The site uses Cloudinary for additional portfolio photographs and keeps the original bundled images in `public/images/` as a fallback. If Cloudinary credentials are missing, the Cloudinary API is unavailable, or no assets are tagged for the portfolio, the existing local gallery still renders.
Publish a photo from Cloudinary
Upload the image in the Cloudinary Media Library.
Add the tag `portfolio` to make it eligible for the website gallery.
Optionally add one category tag to control the gallery filter:
`people-stories`
`framed-perspectives`
`architecture-heritage`
`landscapes-light`
`nature-details`
Optionally add asset context metadata named `title` and `alt` for a custom title and accessible alt text. If absent, the title is generated from the asset's public ID.
Allow up to 60 seconds for the site's cache to refresh.
Only images tagged `portfolio` are fetched. The integration uses Cloudinary's server-side Search API; API credentials must never be exposed in browser code.
Environment variables
Add these in Vercel → Project → Settings → Environment Variables for Preview and Production:
`CLOUDINARY_CLOUD_NAME` — `ptgwbnv7`
`CLOUDINARY_API_KEY` — from Cloudinary Console → Settings → API Keys
`CLOUDINARY_API_SECRET` — from the same API Keys page; keep it private
Redeploy after adding or changing environment variables. Do not commit real credentials to Git or put the API secret in a variable starting with `NEXT_PUBLIC_`.
For local development, copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local`.
Development
```bash
npm install
npm run dev
```
Production build
```bash
npm run build
npm start
```
Deployment notes
Vercel remains connected to the existing Git repository and domain.
Test Cloudinary changes in a Preview deployment before merging to `main`.
`components/Gallery.tsx` displays the Cloudinary images first and then the existing local gallery, so the existing collection remains available if the Cloudinary request fails.
`lib/cloudinary-photos.ts` handles missing credentials and API errors by returning an empty list; the static gallery remains the fallback.
Main structure
`app/page.tsx` — homepage, structured data, About and Contact sections
`components/Hero.tsx` — hero photograph
`components/Gallery.tsx` — gallery filters and image lightbox
`lib/gallery.ts` — bundled fallback photo metadata
`lib/cloudinary-photos.ts` — Cloudinary gallery integration
`next.config.ts` — remote image host configuration
