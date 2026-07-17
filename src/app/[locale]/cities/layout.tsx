import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { prisma } from "@/lib/prisma";

export default async function CitiesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Navbar/Footer need *a* city to build their Properties/Neighborhoods/etc.
  // links with — this page is the one exception that spans all cities, so
  // it just picks the first one as that anchor. Not used for any actual
  // data filtering on this page itself.
  const firstCity = await prisma.city.findFirst({ orderBy: { name: "asc" } });
  const cityForNav = firstCity?.slug ?? "casablanca";

  return (
    <>
      <Navbar locale={params.locale} city={cityForNav} />
      <main>{children}</main>
      <Footer locale={params.locale} city={cityForNav} />
      <WhatsAppButton locale={params.locale} />
    </>
  );
}
