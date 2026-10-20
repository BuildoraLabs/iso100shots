import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
  absoluteUrl,
  photographerName,
  seoKeywords,
  siteDescription,
  siteName,
  siteUrl,
  socialLinks
} from "@/lib/seo";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | Photography Portfolio by ${photographerName}`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: photographerName, url: absoluteUrl("/") }],
  creator: photographerName,
  publisher: siteName,
  category: "photography",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: `${siteName} | Photography Portfolio by ${photographerName}`,
    description: siteDescription,
    images: [
      {
        url: "/images/landscapes-light/udaipur-sunset-orange-gradient.jpg",
        width: 1200,
        height: 630,
        alt: "Orange sunset gradient over Udaipur with warm evening light across the lake."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Photography Portfolio by ${photographerName}`,
    description: siteDescription,
    images: ["/images/landscapes-light/udaipur-sunset-orange-gradient.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/favicon.ico"
  },
  other: {
    "profile:first_name": "Kunal",
    "profile:last_name": "Kapoor",
    "og:see_also": socialLinks.join(", ")
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
