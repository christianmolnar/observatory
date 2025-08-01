import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://www.maplevalleyobservatory.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.maplevalleyobservatory.com",
    siteName: "Maple Valley Observatory",
    title: "Maple Valley Observatory | Astrophotography & Astronomy",
    description: "Astrophotography from Maple Valley, Washington. Explore deep sky objects, nebulas, galaxies, and terrestrial photography.",
    images: [
      {
        url: "https://www.maplevalleyobservatory.com/images/og-preview.jpg", // Featured astrophoto
        width: 1200,
        height: 675,
        alt: "North America Nebula - Astrophotography by Maple Valley Observatory",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Valley Observatory | Astrophotography & Astronomy",
    description: "Astrophotography and celestial imaging from Maple Valley, Washington.",
    images: ["https://www.maplevalleyobservatory.com/images/og-preview.jpg"],
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
    "url": "https://www.maplevalleyobservatory.com",
    "logo": "https://www.maplevalleyobservatory.com/images/logo/maple-valley-observatory-logo.png",
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
        {/* Raw Open Graph meta tags for better Facebook compatibility */}
        <meta property="fb:app_id" content="1396805241625567" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.maplevalleyobservatory.com/" />
        <meta property="og:title" content="Maple Valley Observatory | Astrophotography & Astronomy" />
        <meta property="og:description" content="Astrophotography from Maple Valley, Washington. Explore deep sky objects, nebulas, galaxies, and terrestrial photography." />
        <meta property="og:image" content="https://www.maplevalleyobservatory.com/images/og-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="Maple Valley Observatory" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maple Valley Observatory | Astrophotography & Astronomy" />
        <meta name="twitter:description" content="Astrophotography and celestial imaging from Maple Valley, Washington." />
        <meta name="twitter:image" content="https://www.maplevalleyobservatory.com/images/og-preview.jpg" />
        
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
