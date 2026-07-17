import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}): Promise<Metadata> {
  const neighborhood = await prisma.neighborhood.findUnique({ where: { slug: params.slug } });
  if (!neighborhood) return {};
  const url = `${SITE_URL}/${params.locale}/${params.city}/neighborhoods/${params.slug}`;
  return { title: `${neighborhood.name} | Domify`, alternates: { canonical: url } };
}

export default async function NeighborhoodDetailPage({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}) {
  const t = getDictionary(params.locale);
  const neighborhood = await prisma.neighborhood.findUnique({
    where: { slug: params.slug },
    include: {
      properties: {
        where: { status: "PUBLISHED" },
        include: { images: { orderBy: { position: "asc" }, take: 1 }, neighborhood: true },
      },
    },
  });

  if (!neighborhood) notFound();

  const localeT = (neighborhood.translations as any)?.[params.locale];
  const nt = localeT?.description ? localeT : (neighborhood.translations as any)?.fr;

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-24">
      <Breadcrumbs
        items={[
          { label: t.pages.allNeighborhoodsTitle, href: `/${params.locale}/${params.city}/neighborhoods` },
          { label: neighborhood.name },
        ]}
      />
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.explore}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-4">{neighborhood.name}</h1>
      {nt?.description && <p className="text-stone-600 max-w-2xl leading-relaxed mb-3">{nt.description}</p>}

      <div className="flex flex-wrap gap-6 text-sm text-stone-500 mb-10">
        {neighborhood.avgPriceM2 && (
          <span>~{new Intl.NumberFormat("fr-MA").format(neighborhood.avgPriceM2)} DH/m²</span>
        )}
        {nt?.lifestyle && <span>{nt.lifestyle}</span>}
      </div>

      {neighborhood.properties.length === 0 ? (
        <p className="text-stone-500">{t.pages.noPropertiesInArea}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhood.properties.map((p) => (
            <PropertyCard
              key={p.id}
              locale={params.locale}
              city={params.city}
              slug={p.slug}
              reference={p.reference}
              price={p.price}
              surfaceM2={p.surfaceM2}
              bedrooms={p.bedrooms}
              bathrooms={p.bathrooms}
              neighborhoodName={neighborhood.name}
              translations={p.translations as any}
              imageUrl={p.images[0]?.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
