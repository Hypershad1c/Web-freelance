import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";

export async function TestimonialsSection({ locale }: { locale: string }) {
  const dict = getDictionary(locale);
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  if (testimonials.length === 0) return null; // no fake reviews — section just doesn't render

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3 text-center">{dict.sections.testimonials}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
          {dict.sections.testimonialsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => {
            const translated = (testimonial.translations as any)?.[locale];
            const quote = translated?.quote || (testimonial.translations as any)?.fr?.quote;
            return (
              <div key={testimonial.id} className="rounded-2xl border border-stone-100 p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">"{quote}"</p>
                <p className="text-sm font-medium text-primary">{testimonial.clientName}</p>
                {testimonial.isGoogleReview && (
                  <p className="text-xs text-stone-400">{dict.forms.googleReview}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
