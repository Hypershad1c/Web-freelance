import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";
import { requireCity } from "@/lib/city";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/neighborhoods`;
  return {
    title: `${t.pages.allNeighborhoodsTitle} | Domify`,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function NeighborhoodsIndexPage({ params }: { params: { locale: string; city: string } }) {
  const t = getDictionary(params.locale);
  const city = await requireCity(params.city);
  const neighborhoods = await prisma.neighborhood.findMany({ where: { cityId: city.id }, orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-24">
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.explore}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-10">{t.pages.allNeighborhoodsTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((n) => {
          const localeT = (n.translations as any)?.[params.locale];
          const nt = localeT?.description ? localeT : (n.translations as any)?.fr;
          return (
            <Link
              key={n.id}
              href={`/${params.locale}/${params.city}/neighborhoods/${n.slug}`}
              className="rounded-2xl border border-stone-100 p-6 hover:border-accent transition-colors"
            >
              <h2 className="font-heading text-xl text-primary">{n.name}</h2>
              {n.avgPriceM2 && (
                <p className="mt-1 text-sm text-stone-500">
                  ~{new Intl.NumberFormat("fr-MA").format(n.avgPriceM2)} DH/m²
                </p>
              )}
              {nt?.description && <p className="mt-3 text-sm text-stone-600">{nt.description}</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
