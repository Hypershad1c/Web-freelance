import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialEditForm } from "@/components/forms/TestimonialEditForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();

  const t = (testimonial.translations as any)?.fr ?? { quote: "" };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Modifier le témoignage</h1>
      <TestimonialEditForm
        locale={params.locale}
        initial={{
          id: testimonial.id,
          clientName: testimonial.clientName,
          quoteFr: t.quote ?? "",
          rating: testimonial.rating,
          isGoogleReview: testimonial.isGoogleReview,
          featured: testimonial.featured,
        }}
      />
    </div>
  );
}
