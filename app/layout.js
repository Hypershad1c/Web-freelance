import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://domify.ma"; // à remplacer par le domaine réel une fois réservé

export const metadata = {
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
  alternates: { canonical: "/" },
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
};

// Données structurées Schema.org — aide Google à comprendre qu'il s'agit
// d'une agence immobilière locale et à afficher un résultat enrichi.
// Champs à compléter avec les vraies coordonnées avant mise en ligne.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Domify",
  description:
    "Agence de commercialisation immobilière, vente de biens moyen et haut standing à Casablanca.",
  url: siteUrl,
  areaServed: [
    "Californie, Casablanca",
    "Ain Diab, Casablanca",
    "Bouskoura",
    "CIL, Casablanca",
    "Maarif, Casablanca",
    "Racine, Casablanca",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  // telephone: "+212XXXXXXXXX", // à compléter — numéro réel requis pour l'enrichissement Google
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
