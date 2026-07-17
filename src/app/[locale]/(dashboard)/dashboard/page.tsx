import { prisma } from "@/lib/prisma";

export default async function DashboardHomePage() {
  const [propertyCount, leadCount, newLeadCount] = await Promise.all([
    prisma.property.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-6">
          <p className="text-3xl font-semibold text-primary">{propertyCount}</p>
          <p className="text-sm text-stone-500 mt-1">Propriétés</p>
        </div>
        <div className="rounded-2xl bg-white p-6">
          <p className="text-3xl font-semibold text-primary">{leadCount}</p>
          <p className="text-sm text-stone-500 mt-1">Leads (total)</p>
        </div>
        <div className="rounded-2xl bg-white p-6">
          <p className="text-3xl font-semibold text-accent">{newLeadCount}</p>
          <p className="text-sm text-stone-500 mt-1">Nouveaux leads</p>
        </div>
      </div>
      {/* Real analytics (traffic, conversion rates, lead sources breakdown)
          from the brief's "Analytics" requirement — not built. This is
          a data summary, not analytics. */}
    </div>
  );
}
