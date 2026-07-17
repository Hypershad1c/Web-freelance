import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${params.locale}/login`);
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-primary text-white/80 p-6 flex flex-col">
        <p className="font-heading text-xl text-white mb-8">Domify</p>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href={`/${params.locale}/dashboard`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Tableau de bord
          </Link>
          <Link href={`/${params.locale}/dashboard/properties`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Propriétés
          </Link>
          <Link href={`/${params.locale}/dashboard/cities`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Villes
          </Link>
          <Link href={`/${params.locale}/dashboard/leads`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Leads
          </Link>
          <Link href={`/${params.locale}/dashboard/blog`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Blog
          </Link>
          <Link href={`/${params.locale}/dashboard/neighborhoods`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Quartiers
          </Link>
          <Link href={`/${params.locale}/dashboard/testimonials`} className="rounded-lg px-3 py-2 hover:bg-white/10">
            Témoignages
          </Link>
        </nav>
        <p className="mt-auto text-xs text-white/40">
          Connecté : {session.user?.email}
        </p>
      </aside>
      <main className="flex-1 bg-[#FAF8F4] p-8">{children}</main>
    </div>
  );
}
