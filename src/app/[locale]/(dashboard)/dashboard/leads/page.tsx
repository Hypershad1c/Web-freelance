import { prisma } from "@/lib/prisma";

export default async function DashboardLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Leads</h1>
      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Reçu le</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-stone-100">
                <td className="px-4 py-3">{l.fullName}</td>
                <td className="px-4 py-3">{l.phone}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-xs">{l.source}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/20 text-accent px-2 py-1 text-xs font-medium">
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-stone-500">{l.notes}</td>
                <td className="px-4 py-3 text-stone-500">
                  {new Intl.DateTimeFormat("fr-MA", { dateStyle: "short", timeStyle: "short" }).format(l.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="p-8 text-center text-stone-500">Aucun lead pour le moment.</p>
        )}
      </div>
      {/* Status changes, assignment to agents, CRM sync trigger — not
          built. Read-only view of what's already in the database. */}
    </div>
  );
}
