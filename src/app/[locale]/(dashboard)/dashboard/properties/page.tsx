import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeletePropertyButton } from "@/components/forms/DeletePropertyButton";

export default async function DashboardPropertiesPage({
  params,
}: {
  params: { locale: string };
}) {
  const properties = await prisma.property.findMany({
    include: { neighborhood: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-primary">Propriétés</h1>
        <Link
          href={`/${params.locale}/dashboard/properties/new`}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
        >
          + Ajouter un bien
        </Link>
      </div>

      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Quartier</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => {
              const t = (p.translations as any)?.fr;
              return (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 text-accent font-medium">{p.reference}</td>
                  <td className="px-4 py-3">{t?.title ?? "—"}</td>
                  <td className="px-4 py-3">{p.neighborhood.name}</td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat("fr-MA").format(p.price)} DH
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${params.locale}/dashboard/properties/${p.id}/edit`}
                        className="text-accent hover:underline"
                      >
                        Modifier
                      </Link>
                      <DeletePropertyButton propertyId={p.id} reference={p.reference} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Delete action — not built yet. Use status = ARCHIVED via edit form
          as a soft-delete workaround for now. */}
    </div>
  );
}
