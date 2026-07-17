import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/contact`;
  return {
    title: `${t.pages.contactHeading} | Domify`,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  return (
    <div className="mx-auto max-w-5xl px-6 pt-12 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.nav.contact}</p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary mb-6">{t.pages.contactHeading}</h1>
        <ul className="space-y-3 text-sm text-stone-600">
          <li>Casablanca, Maroc</li>
          <li>contact@domify.ma</li>
          <li>{t.footer.hours}</li>
        </ul>
      </div>

      <Suspense fallback={<div className="rounded-2xl bg-white p-8 h-64 animate-pulse" />}>
        <ContactForm locale={params.locale} />
      </Suspense>
    </div>
  );
}
