import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getDictionary } from "@/i18n/dictionaries";

export async function FeaturedProperties({ locale, city, cityId }: { locale: string; city: string; cityId: string }) {
  const t = getDictionary(locale);
  const properties = await prisma.property.findMany({
    where: { featured: true, status: "PUBLISHED", neighborhood: { cityId } },
    include: { neighborhood: true, images: { orderBy: { position: "asc" }, take: 1 } },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  if (properties.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-stone-500">{t.sections.noFeatured}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.featured}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary">{t.sections.featuredTitle}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard
            key={p.id}
            locale={locale}
            city={city}
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
    </section>
  );
}
