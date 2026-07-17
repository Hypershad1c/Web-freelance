import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";

export async function NeighborhoodsSection({ locale, city, cityId }: { locale: string; city: string; cityId: string }) {
  const t = getDictionary(locale);
  const neighborhoods = await prisma.neighborhood.findMany({ where: { cityId }, take: 6 });

  return (
    <section className="bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.explore}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-10">
          {t.sections.neighborhoodsTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((n) => {
            const localeT = (n.translations as any)?.[locale];
            const nt = localeT?.description ? localeT : (n.translations as any)?.fr;
            return (
              <Link
                key={n.id}
                href={`/${locale}/${city}/neighborhoods/${n.slug}`}
                className="group rounded-2xl bg-white p-6 border border-stone-100 hover:border-accent transition-colors"
              >
                <h3 className="font-heading text-xl text-primary group-hover:text-accent transition-colors">
                  {n.name}
                </h3>
                {n.avgPriceM2 && (
                  <p className="mt-1 text-sm text-stone-500">
                    ~{new Intl.NumberFormat("fr-MA").format(n.avgPriceM2)} DH/m²
                  </p>
                )}
                {nt?.description && <p className="mt-3 text-sm text-stone-600 leading-relaxed">{nt.description}</p>}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
