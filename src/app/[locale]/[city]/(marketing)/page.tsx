import { Hero } from "@/components/sections/Hero";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { NeighborhoodsSection } from "@/components/sections/NeighborhoodsSection";
import { WhyDomifySection } from "@/components/sections/WhyDomifySection";
import { RecentlySoldSection } from "@/components/sections/RecentlySoldSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MortgageCalculator } from "@/components/sections/MortgageCalculator";
import { requireCity } from "@/lib/city";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const url = `${SITE_URL}/${params.locale}/${params.city}`;
  return { alternates: { canonical: url }, openGraph: { url } };
}

export default async function HomePage({ params }: { params: { locale: string; city: string } }) {
  const city = await requireCity(params.city);

  return (
    <>
      <Hero locale={params.locale} city={params.city} />
      <FeaturedProperties locale={params.locale} city={params.city} cityId={city.id} />
      <WhyDomifySection locale={params.locale} />
      <NeighborhoodsSection locale={params.locale} city={params.city} cityId={city.id} />
      <RecentlySoldSection locale={params.locale} cityId={city.id} />
      <TestimonialsSection locale={params.locale} />
      <MortgageCalculator locale={params.locale} />
    </>
  );
}
