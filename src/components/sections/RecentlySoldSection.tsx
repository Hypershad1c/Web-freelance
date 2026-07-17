import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";

function formatMAD(price: number) {
  return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(price) + " DH";
}

export async function RecentlySoldSection({ locale, cityId }: { locale: string; cityId: string }) {
  const t = getDictionary(locale);
  const sold = await prisma.property.findMany({
    where: { status: "SOLD", neighborhood: { cityId } },
    include: { neighborhood: true },
    take: 4,
    orderBy: { soldAt: "desc" },
  });

  if (sold.length === 0) return null; // no fake sold badges — nothing to show yet

  return (
    <section className="bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.recentlySold}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-10">
          {t.sections.recentlySoldTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sold.map((p) => {
            const t = (p.translations as any)?.[locale]?.title
              ? (p.translations as any)[locale]
              : (p.translations as any)?.fr;
            return (
              <div key={p.id} className="rounded-2xl border border-stone-100 p-5 relative">
                <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-[10px] tracking-wider text-accent font-medium">
                  {t.forms.soldBadge}
                </span>
                <p className="text-xs text-stone-500 uppercase tracking-wide">{p.neighborhood.name}</p>
                <h3 className="mt-1 font-heading text-base text-primary">{t.title}</h3>
                <p className="mt-2 text-sm text-stone-500">{formatMAD(p.price)}</p>
                {p.daysOnMarket && (
                  <p className="mt-1 text-xs text-stone-400">Vendu en {p.daysOnMarket} jours</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
