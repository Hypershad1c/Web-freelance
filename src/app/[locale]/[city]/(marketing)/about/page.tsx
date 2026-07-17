import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/about`;
  return { title: `${t.pages.aboutTitle} | Domify`, alternates: { canonical: url }, openGraph: { url } };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.nav.about}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-6">{t.pages.aboutTitle}</h1>
      <p className="text-stone-600 leading-relaxed mb-4">{t.pages.aboutP1}</p>
      <p className="text-stone-600 leading-relaxed">{t.pages.aboutP2}</p>
    </div>
  );
}
