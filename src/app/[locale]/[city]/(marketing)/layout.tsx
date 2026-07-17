import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; city: string };
}) {
  return (
    <>
      <Navbar locale={params.locale} city={params.city} />
      <main>{children}</main>
      <Footer locale={params.locale} city={params.city} />
      <WhatsAppButton locale={params.locale} />
    </>
  );
}
