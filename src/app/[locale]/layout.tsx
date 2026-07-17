import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME, SITE_PHONE } from "@/lib/site";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: {
      default: "Domify | Immobilier de standing à Casablanca",
      template: "%s",
    },
    description: "Biens médium et haut de gamme à Casablanca. Appartements, villas et riads sélectionnés par Domify.",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/casablanca`,
      languages: {
        fr: `${SITE_URL}/fr/casablanca`,
        ar: `${SITE_URL}/ar/casablanca`,
        en: `${SITE_URL}/en/casablanca`,
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={params.locale} dir={dir}>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: SITE_NAME,
            url: SITE_URL,
            telephone: SITE_PHONE,
            areaServed: {
              "@type": "City",
              name: "Casablanca",
            },
          }}
        />
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
