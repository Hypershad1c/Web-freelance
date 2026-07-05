import { Cairo, IBM_Plex_Mono } from "next/font/google";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./styles.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces", // réutilise la même variable que la police display FR
  display: "swap",
});

const cairoBody = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  variable: "--font-inter", // réutilise la même variable que la police body FR
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://domify.ma";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "دوميفي — وكالة عقارية راقية بالدار البيضاء",
  description:
    "بيع عقارات متوسطة وراقية بالدار البيضاء: كاليفورنيا، عين الذياب، بوسكورة، سي آي إل، المعاريف، الراسين.",
  alternates: {
    canonical: "/ar",
    languages: {
      "ar-MA": "/ar",
      "fr-MA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: `${siteUrl}/ar`,
    siteName: "Domify",
    title: "دوميفي — وكالة عقارية راقية بالدار البيضاء",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.jpeg", apple: "/logo.jpeg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "دوميفي",
  description: "وكالة تسويق عقاري، بيع عقارات متوسطة وراقية بالدار البيضاء.",
  url: `${siteUrl}/ar`,
  inLanguage: "ar",
  areaServed: [
    "كاليفورنيا، الدار البيضاء",
    "عين الذياب، الدار البيضاء",
    "بوسكورة",
    "سي آي إل، الدار البيضاء",
    "المعاريف، الدار البيضاء",
    "الراسين، الدار البيضاء",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "الدار البيضاء",
    addressCountry: "MA",
  },
};

export default function ArabicRootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cairo.variable} ${cairoBody.variable} ${plexMono.variable} rtl`}>
        {children}
        <WhatsAppFloat lang="ar" />
      </body>
    </html>
  );
}
