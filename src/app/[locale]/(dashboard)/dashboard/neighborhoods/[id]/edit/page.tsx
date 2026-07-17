import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NeighborhoodForm } from "@/components/forms/NeighborhoodForm";

export default async function EditNeighborhoodPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const neighborhood = await prisma.neighborhood.findUnique({ where: { id: params.id } });
  if (!neighborhood) notFound();

  const t = (neighborhood.translations as any)?.fr ?? { description: "", lifestyle: "" };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Modifier {neighborhood.name}</h1>
      <NeighborhoodForm
        locale={params.locale}
        cities={[]}
        initial={{
          id: neighborhood.id,
          descriptionFr: t.description,
          lifestyleFr: t.lifestyle,
          avgPriceM2: neighborhood.avgPriceM2 ?? undefined,
          demandLevel: neighborhood.demandLevel ?? undefined,
        }}
      />
    </div>
  );
}
