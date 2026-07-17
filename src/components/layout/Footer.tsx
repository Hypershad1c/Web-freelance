import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale, city }: { locale: string; city: string }) {
  const t = getDictionary(locale);
  const base = `/${locale}/${city}`;

  return (
    <footer className="bg-primary text-white/70 py-16">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-heading text-2xl text-white mb-3">Domify</p>
          <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="text-accent mb-3 uppercase tracking-wide text-xs">{t.footer.navigation}</p>
          <ul className="space-y-2">
            <li><Link href={`${base}/properties`} className="hover:text-white">{t.nav.properties}</Link></li>
            <li><Link href={`${base}/neighborhoods`} className="hover:text-white">{t.nav.neighborhoods}</Link></li>
            <li><Link href={`${base}/blog`} className="hover:text-white">{t.nav.blog}</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-accent mb-3 uppercase tracking-wide text-xs">{t.footer.domify}</p>
          <ul className="space-y-2">
            <li><Link href={`${base}/about`} className="hover:text-white">{t.nav.about}</Link></li>
            <li><Link href={`${base}/valuation`} className="hover:text-white">{t.hero.ctaValuation}</Link></li>
            <li><Link href={`${base}/contact`} className="hover:text-white">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-accent mb-3 uppercase tracking-wide text-xs">{t.footer.contact}</p>
          <ul className="space-y-2">
            <li>Casablanca, Maroc</li>
            <li>contact@domify.ma</li>
            <li>{t.footer.hours}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-white/10 text-xs text-white/40">
        © {new Date().getFullYear()} Domify. {t.footer.rights}
      </div>
    </footer>
  );
}
