import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Load Poppins with emphasis on light weights
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: "Maple Valley Observatory | Astrophotography & Astronomy",
    template: "%s | Maple Valley Observatory",
  },
  description: "Professional astrophotography and celestial imaging from Maple Valley, Washington. Explore deep sky objects, nebulas, galaxies, and terrestrial photography through our advanced telescope setups.",
  keywords: [
    "astrophotography",
    "astronomy",
    "telescope",
    "deep sky",
    "nebula",
    "galaxy",
    "Maple Valley",
    "Washington",
    "observatory",
    "celestial photography",
    "space photography",
    "night sky",
    "SeeStar S50",
    "Meade telescope"
  ],
  authors: [{ name: "Maple Valley Observatory" }],
  creator: "Maple Valley Observatory",
  publisher: "Maple Valley Observatory",
  metadataBase: new URL("https://maplevalleyobservatory.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maplevalleyobservatory.com", // Replace with your actual domain
    siteName: "Maple Valley Observatory",
    title: "Maple Valley Observatory | Astrophotography & Astronomy",
    description: "Astrophotography from Maple Valley, Washington. Explore deep sky objects, nebulas, galaxies, and terrestrial photography.",
    images: [
      {
        url: "/images/assets/NGC7000-Pelican-1.jpg", // Featured astrophoto
        width: 1200,
        height: 630,
        alt: "North America Nebula - Astrophotography by Maple Valley Observatory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Valley Observatory | Astrophotography & Astronomy",
    description: "Astrophotography and celestial imaging from Maple Valley, Washington.",
    images: ["/images/assets/NGC7000-Pelican-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-site-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maple Valley Observatory",
    "description": "Professional astrophotography and celestial imaging from Maple Valley, Washington",
    "url": "https://your-domain.com", // Replace with your actual domain
    "logo": "https://your-domain.com/images/logo/maple-valley-observatory-logo.png", // Replace with your actual domain
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "general"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maple Valley",
      "addressRegion": "WA",
      "addressCountry": "US"
    },
    "sameAs": [
      // Add your social media URLs when you have them
      // "https://www.facebook.com/your-page",
      // "https://www.instagram.com/your-account",
      // "https://twitter.com/your-account"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontWeight: 200, fontFamily: 'var(--font-poppins), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
