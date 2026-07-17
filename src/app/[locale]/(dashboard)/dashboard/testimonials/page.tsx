import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteTestimonialButton } from "@/components/forms/DeleteTestimonialButton";

export default async function DashboardTestimonialsPage({ params }: { params: { locale: string } }) {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-primary">Témoignages</h1>
        <Link
          href={`/${params.locale}/dashboard/testimonials/new`}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
        >
          + Ajouter un témoignage
        </Link>
      </div>
      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Google Review</th>
              <th className="px-4 py-3">Mis en avant</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-t border-stone-100">
                <td className="px-4 py-3">{t.clientName}</td>
                <td className="px-4 py-3">{t.rating}/5</td>
                <td className="px-4 py-3">{t.isGoogleReview ? "Oui" : "Non"}</td>
                <td className="px-4 py-3">{t.featured ? "Oui" : "Non"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/${params.locale}/dashboard/testimonials/${t.id}/edit`} className="text-accent hover:underline">
                      Modifier
                    </Link>
                    <DeleteTestimonialButton testimonialId={t.id} name={t.clientName} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials.length === 0 && (
          <p className="p-8 text-center text-stone-500">Aucun témoignage pour le moment.</p>
        )}
      </div>
    </div>
  );
}
