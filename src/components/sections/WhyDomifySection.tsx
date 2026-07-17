import { getDictionary } from "@/i18n/dictionaries";

export function WhyDomifySection({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.sections.whyDomify}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-white mb-12 max-w-xl">
          {t.sections.whyDomifyTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.whyDomifyPoints.map((p) => (
            <div key={p.title}>
              <div className="h-px w-10 bg-accent mb-4" />
              <h3 className="font-heading text-lg text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
