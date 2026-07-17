import { prisma } from "@/lib/prisma";
import { NeighborhoodForm } from "@/components/forms/NeighborhoodForm";

export default async function NewNeighborhoodPage({ params }: { params: { locale: string } }) {
  const cities = await prisma.city.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Nouveau quartier</h1>
      <NeighborhoodForm locale={params.locale} cities={cities} />
    </div>
  );
}
