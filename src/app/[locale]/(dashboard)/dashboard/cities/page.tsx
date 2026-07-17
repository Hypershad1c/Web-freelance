import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardCitiesPage({ params }: { params: { locale: string } }) {
  const cities = await prisma.city.findMany({
    include: { _count: { select: { neighborhoods: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-primary">Villes</h1>
        <Link
          href={`/${params.locale}/dashboard/cities/new`}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
        >
          + Ajouter une ville
        </Link>
      </div>

      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Quartiers</th>
              <th className="px-4 py-3">Voir le site</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c.id} className="border-t border-stone-100">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-stone-500">/{c.slug}</td>
                <td className="px-4 py-3">{c._count.neighborhoods}</td>
                <td className="px-4 py-3">
                  <a
                    href={`/${params.locale}/${c.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Ouvrir ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* No edit/delete yet — renaming a city's slug after properties/
          neighborhoods link to it would break existing URLs, so this is
          deliberately create-only for now, not an oversight. */}
    </div>
  );
}
