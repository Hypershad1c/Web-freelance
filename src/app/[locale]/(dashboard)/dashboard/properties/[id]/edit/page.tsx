import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyEditForm } from "@/components/forms/PropertyEditForm";

export default async function EditPropertyPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const [property, neighborhoods] = await Promise.all([
    prisma.property.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { position: "asc" } } },
    }),
    prisma.neighborhood.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!property) notFound();

  const t = (property.translations as any)?.fr ?? { title: "", description: "" };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-2">Modifier {property.reference}</h1>
      <p className="text-xs text-stone-500 mb-6">
        Seul le contenu français est modifiable ici. Les traductions arabe et
        anglaise existantes sont préservées automatiquement.
      </p>
      <PropertyEditForm
        locale={params.locale}
        propertyId={property.id}
        neighborhoods={neighborhoods.map((n) => ({ id: n.id, name: n.name }))}
        initial={{
          type: property.type,
          status: property.status,
          price: property.price,
          surfaceM2: property.surfaceM2,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          hasPool: property.hasPool,
          hasParking: property.hasParking,
          hasGarden: property.hasGarden,
          neighborhoodId: property.neighborhoodId,
          featured: property.featured,
          titleFr: t.title ?? "",
          descriptionFr: t.description ?? "",
          images: property.images.map((img) => ({ id: img.id, url: img.url })),
        }}
      />
    </div>
  );
}
