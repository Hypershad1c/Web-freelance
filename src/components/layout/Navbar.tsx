"use client";

import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "@/i18n/dictionaries";

const locales = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "EN" },
];

export function Navbar({ locale, city }: { locale: string; city: string }) {
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale);
  const base = `/${locale}/${city}`;
  const links = [
    { href: `${base}/properties`, label: t.nav.properties },
    { href: `${base}/neighborhoods`, label: t.nav.neighborhoods },
    { href: `/${locale}/cities`, label: t.nav.cities }, // cross-city — no city prefix, intentionally
    { href: `${base}/about`, label: t.nav.about },
    { href: `${base}/blog`, label: t.nav.blog },
    { href: `${base}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-100">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href={base} className="font-heading text-2xl tracking-wide text-primary">
          Domify
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-primary/80">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 text-xs text-primary/60">
          {locales.map((l, i) => (
            <span key={l.code} className="flex items-center gap-3">
              <Link
                href={`/${l.code}/${city}`}
                className={l.code === locale ? "text-accent font-semibold" : "hover:text-primary"}
              >
                {l.label}
              </Link>
              {i < locales.length - 1 && <span className="opacity-30">|</span>}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-stone-100"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-primary" fill="none" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-primary hover:bg-stone-50"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 px-3 pt-3 mt-2 border-t border-stone-100 text-xs text-primary/60">
            {locales.map((l, i) => (
              <span key={l.code} className="flex items-center gap-3">
                <Link
                  href={`/${l.code}/${city}`}
                  className={l.code === locale ? "text-accent font-semibold" : "hover:text-primary"}
                >
                  {l.label}
                </Link>
                {i < locales.length - 1 && <span className="opacity-30">|</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
