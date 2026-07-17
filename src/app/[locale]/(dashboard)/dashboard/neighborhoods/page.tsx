import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardNeighborhoodsPage({ params }: { params: { locale: string } }) {
  const neighborhoods = await prisma.neighborhood.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-primary">Quartiers</h1>
        <Link
          href={`/${params.locale}/dashboard/neighborhoods/new`}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
        >
          + Ajouter un quartier
        </Link>
      </div>
      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Prix moyen/m²</th>
              <th className="px-4 py-3">Demande</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {neighborhoods.map((n) => (
              <tr key={n.id} className="border-t border-stone-100">
                <td className="px-4 py-3">{n.name}</td>
                <td className="px-4 py-3">
                  {n.avgPriceM2 ? `${new Intl.NumberFormat("fr-MA").format(n.avgPriceM2)} DH` : "—"}
                </td>
                <td className="px-4 py-3">{n.demandLevel ?? "—"}</td>
                <td className="px-4 py-3">
                  <Link href={`/${params.locale}/dashboard/neighborhoods/${n.id}/edit`} className="text-accent hover:underline">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
