import { TestimonialCreateForm } from "@/components/forms/TestimonialCreateForm";

export default function NewTestimonialPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Nouveau témoignage</h1>
      <TestimonialCreateForm locale={params.locale} />
    </div>
  );
}
