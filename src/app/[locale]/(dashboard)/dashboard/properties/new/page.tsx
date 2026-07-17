import { prisma } from "@/lib/prisma";
import { PropertyCreateForm } from "@/components/forms/PropertyCreateForm";

export default async function NewPropertyPage({ params }: { params: { locale: string } }) {
  const neighborhoods = await prisma.neighborhood.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Ajouter un bien</h1>
      <PropertyCreateForm
        locale={params.locale}
        neighborhoods={neighborhoods.map((n) => ({ id: n.id, name: n.name }))}
      />
    </div>
  );
}
