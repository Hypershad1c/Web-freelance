import { ValuationForm } from "@/components/forms/ValuationForm";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/valuation`;
  return {
    title: `${t.pages.valuationTitle} | Domify`,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default function ValuationPage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3 text-center">{t.pages.valuationEyebrow}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-3 text-center">{t.pages.valuationTitle}</h1>
      <p className="text-stone-600 text-center mb-10">{t.pages.valuationSubtitle}</p>
      <ValuationForm locale={params.locale} />
    </div>
  );
}
