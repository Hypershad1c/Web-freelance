import { CityCreateForm } from "@/components/forms/CityCreateForm";

export default function NewCityPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Nouvelle ville</h1>
      <CityCreateForm locale={params.locale} />
    </div>
  );
}
