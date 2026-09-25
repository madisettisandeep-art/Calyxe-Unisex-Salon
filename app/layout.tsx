import type { Metadata } from "next";
import "./globals.css";
import { SALON_INFO } from "@/data/salon-data";

export const metadata: Metadata = {
  title: "Calyxé Unisex Salon | Premium Salon in Hanamkonda",
  description:
    "Calyxé Unisex Salon in Hanamkonda. Experience premium hair, beauty and grooming services in a cinematic salon experience on Circuit House Road.",
  keywords: [
    "Calyxé Unisex Salon",
    "Calyxe salon Hanamkonda",
    "luxury salon Warangal",
    "hair salon Circuit House Road",
    "bridal makeover Hanamkonda",
    "hair spa Warangal",
    "best salon in Hanamkonda",
  ],
  authors: [{ name: "Calyxé Unisex Salon" }],
  openGraph: {
    title: "Calyxé Unisex Salon | Premium Salon in Hanamkonda",
    description:
      "Step into Calyxé. A digital cinematic walk-through of the premier hair, beauty, and grooming destination in Hanamkonda, Telangana.",
    url: "https://calyxe.in",
    siteName: "Calyxé Unisex Salon",
    images: [
      {
        url: "/walkthrough/scene_01_entrance.jpg",
        width: 1920,
        height: 1080,
        alt: "Calyxé Unisex Salon Exterior Entrance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calyxé Unisex Salon | Hanamkonda",
    description:
      "Step into Calyxé. Premium hair, beauty and grooming on Circuit House Road, Hanamkonda.",
    images: ["/walkthrough/scene_01_entrance.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Calyxé Unisex Salon",
    image: "https://calyxe.in/walkthrough/scene_01_entrance.jpg",
    telephone: SALON_INFO.phone,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2-6-986, Circuit House Road, near Sun Rise Hospital, KLN Reddy Colony, Subedari",
      addressLocality: "Hanamkonda",
      addressRegion: "Telangana",
      postalCode: "506001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.9949",
      longitude: "79.5603",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/walkthrough/scene_01_entrance.jpg" />
        <link rel="preload" as="image" href="/walkthrough/scene_02_doors.jpg" />
        <link rel="preload" as="image" href="/walkthrough/scene_03_reception.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="antialiased bg-brand-background text-brand-text min-h-screen selection:bg-brand-primary selection:text-white font-sans"
      >
        {children}
      </body>
    </html>
  );
}
