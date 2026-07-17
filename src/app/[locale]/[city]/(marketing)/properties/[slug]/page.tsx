import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

function formatMAD(price: number) {
  return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(price) + " DH";
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { neighborhood: true, images: { take: 1, orderBy: { position: "asc" } } },
  });
  if (!property) return {};

  const translations = property.translations as any;
  const t = translations[params.locale]?.title ? translations[params.locale] : translations.fr;
  const title = `${t.title} — ${formatMAD(property.price)} | Domify`;
  const description = t.description?.slice(0, 155) ?? "";
  const url = `${SITE_URL}/${params.locale}/${params.city}/properties/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: property.images[0] ? [property.images[0].url] : undefined },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}) {
  const dict = getDictionary(params.locale);
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { neighborhood: true, images: { orderBy: { position: "asc" } } },
  });

  if (!property || property.status === "DRAFT") notFound();

  const translations = property.translations as any;
  const localeT = translations[params.locale];
  const t = localeT?.title ? localeT : translations.fr;
  const whatsappNumber = "212600000000";
  const base = `/${params.locale}/${params.city}`;
  const pageUrl = `${SITE_URL}${base}/properties/${params.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: t.title,
          description: t.description,
          url: pageUrl,
          datePosted: property.createdAt,
          image: property.images.map((img) => img.url),
          address: {
            "@type": "PostalAddress",
            addressLocality: property.neighborhood.name,
            addressRegion: "Casablanca",
            addressCountry: "MA",
          },
          offers: { "@type": "Offer", price: property.price, priceCurrency: "MAD" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: dict.nav.properties, item: `${SITE_URL}${base}/properties` },
            { "@type": "ListItem", position: 2, name: t.title, item: pageUrl },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: dict.nav.properties, href: `${base}/properties` }, { label: t.title }]} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <div className="md:col-span-2 aspect-[4/3] rounded-2xl bg-gradient-to-br from-stone-200 to-stone-100 overflow-hidden relative flex items-center justify-center text-stone-400 text-sm">
          {property.images[0] ? (
            <Image src={property.images[0].url} alt={t.title} fill className="object-cover" sizes="66vw" />
          ) : (
            dict.pages.noPhoto
          )}
        </div>
        <div className="grid grid-rows-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl bg-stone-100 overflow-hidden relative">
              {property.images[i] && (
                <Image src={property.images[i].url} alt="" fill className="object-cover" sizes="33vw" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-[11px] tracking-wider text-accent font-medium mb-4">
            {property.reference}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl text-primary">{t.title}</h1>
          <p className="mt-2 text-stone-500">{property.neighborhood.name}, Casablanca</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-stone-600 border-y border-stone-100 py-4">
            <span>{property.surfaceM2} {dict.propertyCard.m2}</span>
            <span>{property.bedrooms} {dict.forms.bedroomsField}</span>
            <span>{property.bathrooms} {dict.forms.bathroomsField}</span>
            {property.hasPool && <span>{dict.forms.pool}</span>}
            {property.hasParking && <span>{dict.forms.parking}</span>}
            {property.hasGarden && <span>{dict.forms.garden}</span>}
          </div>

          <p className="mt-6 text-stone-700 leading-relaxed">{t.description}</p>

          {t.amenities?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl text-primary mb-3">{dict.pages.amenities}</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm text-stone-600">
                {t.amenities.map((a: string) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-32 h-fit rounded-2xl border border-stone-100 p-6">
          <p className="text-2xl font-semibold text-primary">{formatMAD(property.price)}</p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Bonjour, je suis intéressé(e) par le bien ${property.reference} (${t.title}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white text-center hover:opacity-90 transition-opacity"
            >
              {dict.pages.contactWhatsApp}
            </a>
            <a
              href={`${base}/contact?ref=${property.reference}`}
              className="rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary text-center hover:bg-primary hover:text-white transition-colors"
            >
              {dict.pages.scheduleVisit}
            </a>
            {property.brochureUrl && (
              <a href={property.brochureUrl} className="text-sm text-accent underline text-center">
                {dict.pages.downloadBrochure}
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
