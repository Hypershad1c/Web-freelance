import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";

type PropertyTranslation = { title: string; description: string; amenities: string[] };

type PropertyCardProps = {
  locale: string;
  city: string;
  slug: string;
  reference: string;
  price: number;
  surfaceM2: number;
  bedrooms: number;
  bathrooms: number;
  neighborhoodName: string;
  translations: Record<string, PropertyTranslation>;
  imageUrl?: string;
};

function formatMAD(price: number) {
  return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(price) + " DH";
}

export function PropertyCard({
  locale,
  city,
  slug,
  reference,
  price,
  surfaceM2,
  bedrooms,
  bathrooms,
  neighborhoodName,
  translations,
  imageUrl,
}: PropertyCardProps) {
  const localeT = translations[locale];
  const t = localeT?.title ? localeT : translations.fr;
  const dict = getDictionary(locale);

  return (
    <Link
      href={`/${locale}/${city}/properties/${slug}`}
      className="group block rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={t.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100 group-hover:scale-105 transition-transform duration-500" />
        )}
        <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 rounded-full bg-primary/90 backdrop-blur px-3 py-1 text-[11px] tracking-wider text-accent font-medium">
          {reference}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs text-stone-500 uppercase tracking-wide">{neighborhoodName}</p>
        <h3 className="mt-1 font-heading text-lg text-primary">{t.title}</h3>
        <p className="mt-2 text-accent font-semibold">{formatMAD(price)}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-stone-500">
          <span>{surfaceM2} {dict.propertyCard.m2}</span>
          <span>·</span>
          <span>{bedrooms} {dict.propertyCard.bedrooms}</span>
          <span>·</span>
          <span>{bathrooms} {dict.propertyCard.bathrooms}</span>
        </div>
      </div>
    </Link>
  );
}
