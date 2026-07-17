import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchBar } from "@/components/forms/SearchBar";
import { getDictionary } from "@/i18n/dictionaries";
import { requireCity } from "@/lib/city";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/properties`;
  return {
    title: `${t.pages.ourProperties} | Domify`,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: { locale: string; city: string };
  searchParams: { location?: string; type?: string; bedrooms?: string };
}) {
  const t = getDictionary(params.locale);
  const city = await requireCity(params.city);

  const where: Prisma.PropertyWhereInput = {
    status: "PUBLISHED",
    neighborhood: { cityId: city.id },
  };

  if (searchParams.location) where.neighborhood = { slug: searchParams.location, cityId: city.id };
  if (searchParams.type) where.type = searchParams.type as any;
  if (searchParams.bedrooms) where.bedrooms = { gte: Number(searchParams.bedrooms) };

  const properties = await prisma.property.findMany({
    where,
    include: { neighborhood: true, images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  const resultsLabel = properties.length === 1 ? t.pages.resultsFound_one : t.pages.resultsFound_other;

  return (
    <div className="pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-6 mb-10">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.pages.catalogue}</p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary mb-8">{t.pages.ourProperties}</h1>
        <SearchBar
          locale={params.locale}
          city={params.city}
          defaultLocation={searchParams.location}
          defaultType={searchParams.type}
          defaultBedrooms={searchParams.bedrooms}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm text-stone-500 mb-6">{properties.length} {resultsLabel}</p>

        {properties.length === 0 ? (
          <p className="text-stone-500 py-16 text-center">{t.pages.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
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
                neighborhoodName={p.neighborhood.name}
                translations={p.translations as any}
                imageUrl={p.images[0]?.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
