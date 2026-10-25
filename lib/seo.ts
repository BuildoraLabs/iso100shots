// The apex domain redirects to www, so www is the canonical host.
export const siteUrl = "https://www.iso100shots.com";

export const siteName = "iso.100.shots";

export const photographerName = "Kunal Kapoor";

export const siteDescription =
  "A photography portfolio by Kunal Kapoor featuring street photography, people stories, Indian heritage architecture, landscapes, and quiet nature details.";

export const seoKeywords = [
  "iso.100.shots",
  "Kunal Kapoor photography",
  "India photographer",
  "street photography India",
  "travel photography India",
  "Udaipur photography",
  "heritage architecture photography",
  "landscape photography",
  "nature photography",
  "photography portfolio"
];

export const socialLinks = [
  "https://instagram.com/iso.100.shots",
  "https://500px.com/p/KunalKapoor",
  "https://gurushots.com/Kunal.K7/photos"
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
