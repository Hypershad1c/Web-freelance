import { Fraunces, Inter, Cairo, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces-ar",
  display: "swap",
});

const cairoBody = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  variable: "--font-inter-ar",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://domify.ma";
const LOCALES = ["fr", "ar"];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const { locale } = params;

  if (locale === "ar") {
    return {
      metadataBase: new URL(siteUrl),
      title: "دوميفي — وكالة عقارية راقية بالدار البيضاء",
      description:
        "بيع عقارات متوسطة وراقية بالدار البيضاء: كاليفورنيا، عين الذياب، بوسكورة، سي آي إل، المعاريف، الراسين.",
      alternates: {
        canonical: "/ar",
        languages: { "ar-MA": "/ar", "fr-MA": "/" },
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
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Domify — Agence immobilière premium à Casablanca",
      template: "%s | Domify",
    },
    description:
      "Vente de biens moyen et haut standing à Casablanca : Californie, Ain Diab, Bouskoura, CIL, Maarif, Racine. Visites filmées, accompagnement WhatsApp.",
    keywords: [
      "agence immobilière Casablanca",
      "vente appartement Casablanca",
      "villa à vendre Ain Diab",
      "appartement Californie Casablanca",
      "immobilier haut standing Casablanca",
    ],
    alternates: {
      canonical: "/",
      languages: { "fr-MA": "/", "ar-MA": "/ar" },
    },
    openGraph: {
      type: "website",
      locale: "fr_MA",
      url: siteUrl,
      siteName: "Domify",
      title: "Domify — Agence immobilière premium à Casablanca",
      description:
        "Vente de biens moyen et haut standing à Casablanca. Visites filmées, accompagnement WhatsApp du premier contact à la signature.",
    },
    robots: { index: true, follow: true },
    icons: { icon: "/logo.jpeg", apple: "/logo.jpeg" },
  };
}

function jsonLdFor(locale) {
  if (locale === "ar") {
    return {
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
      address: { "@type": "PostalAddress", addressLocality: "الدار البيضاء", addressCountry: "MA" },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Domify",
    description:
      "Agence de commercialisation immobilière, vente de biens moyen et haut standing à Casablanca.",
    url: siteUrl,
    inLanguage: "fr",
    areaServed: [
      "Californie, Casablanca",
      "Ain Diab, Casablanca",
      "Bouskoura",
      "CIL, Casablanca",
      "Maarif, Casablanca",
      "Racine, Casablanca",
    ],
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  if (!LOCALES.includes(locale)) {
    notFound();
  }
  const isAr = locale === "ar";
  const jsonLd = jsonLdFor(locale);

  return (
    <html lang={locale} dir={isAr ? "rtl" : "ltr"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={
          isAr
            ? `${cairo.variable} ${cairoBody.variable} ${plexMono.variable} rtl`
            : `${fraunces.variable} ${inter.variable} ${plexMono.variable}`
        }
        style={
          isAr
            ? { "--font-fraunces": "var(--font-fraunces-ar)", "--font-inter": "var(--font-inter-ar)" }
            : undefined
        }
      >
        {children}
        <WhatsAppFloat lang={isAr ? "ar" : "fr"} />
      </body>
    </html>
  );
}
