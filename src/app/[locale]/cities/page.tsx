import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/cities`;
  return { title: `${t.nav.cities} | Domify`, alternates: { canonical: url }, openGraph: { url } };
}

export default async function CitiesPage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const cities = await prisma.city.findMany({
    include: {
      neighborhoods: {
        orderBy: { name: "asc" },
        include: { _count: { select: { properties: true } } },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.nav.cities}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-12">{t.nav.cities}</h1>

      <div className="flex flex-col gap-12">
        {cities.map((city) => (
          <div key={city.id}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-heading text-2xl text-primary">{city.name}</h2>
              <Link
                href={`/${params.locale}/${city.slug}`}
                className="text-sm text-accent hover:underline"
              >
                {t.hero.ctaViewProperties} →
              </Link>
            </div>

            {city.neighborhoods.length === 0 ? (
              <p className="text-sm text-stone-400">
                {/* No dictionary key exists for this exact empty state yet —
                    reusing noPropertiesInArea's tone rather than adding a
                    barely-different key for one sentence. */}
                —
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {city.neighborhoods.map((n) => (
                  <Link
                    key={n.id}
                    href={`/${params.locale}/${city.slug}/neighborhoods/${n.slug}`}
                    className="rounded-xl border border-stone-100 p-4 hover:border-accent transition-colors"
                  >
                    <p className="font-medium text-primary">{n.name}</p>
                    <p className="text-xs text-stone-500 mt-1">
                      {n._count.properties} {n._count.properties === 1 ? t.pages.resultsFound_one : t.pages.resultsFound_other}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
