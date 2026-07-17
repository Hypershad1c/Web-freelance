import { SearchBar } from "@/components/forms/SearchBar";
import { getDictionary } from "@/i18n/dictionaries";

export function Hero({ locale, city }: { locale: string; city: string }) {
  const t = getDictionary(locale);
  const base = `/${locale}/${city}`;
  return (
    <section className="relative">
      <div className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-primary">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0F172A 0%, #16213E 45%, #0F172A 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 text-xs tracking-[0.35em] text-accent uppercase">
            {t.hero.tagline}
          </p>
          <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
            {t.hero.headlineLine1}
            <br />
            {t.hero.headlineLine2}
          </h1>
          <div className="mt-8 h-px w-24 bg-accent" />

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={`${base}/properties`}
              className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-primary hover:bg-white transition-colors"
            >
              {t.hero.ctaViewProperties}
            </a>
            <a
              href={`${base}/valuation`}
              className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white hover:border-accent hover:text-accent transition-colors"
            >
              {t.hero.ctaValuation}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-5xl px-6 -mt-10">
        <SearchBar locale={locale} city={city} />
      </div>
    </section>
  );
}
