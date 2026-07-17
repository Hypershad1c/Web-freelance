"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Initial = {
  id?: string;
  name?: string;
  cityId?: string;
  descriptionFr?: string;
  lifestyleFr?: string;
  avgPriceM2?: number;
  demandLevel?: string;
};

export function NeighborhoodForm({
  locale,
  cities,
  initial,
}: {
  locale: string;
  cities: { id: string; name: string }[];
  initial?: Initial;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      descriptionFr: form.get("descriptionFr"),
      lifestyleFr: form.get("lifestyleFr") || undefined,
      avgPriceM2: form.get("avgPriceM2") ? Number(form.get("avgPriceM2")) : undefined,
      demandLevel: form.get("demandLevel") || undefined,
    };
    if (!isEdit) {
      payload.name = form.get("name");
      payload.cityId = form.get("cityId");
    }

    const res = await fetch(
      isEdit ? `/api/neighborhoods/${initial!.id}` : "/api/neighborhoods",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error?.formErrors?.[0] ?? "Une erreur est survenue.");
      return;
    }

    router.push(`/${locale}/dashboard/neighborhoods`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {!isEdit && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-stone-500">Nom</label>
            <input name="name" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
          </div>

          {/* City selector only shows when there's a real choice to make.
              Right now there's one city, so this stays hidden and
              defaults automatically — add a second City row in the DB
              and this dropdown appears on its own, no code change needed. */}
          {cities.length > 1 ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-stone-500">Ville</label>
              <select name="cityId" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          ) : (
            <input type="hidden" name="cityId" value={cities[0]?.id ?? ""} />
          )}
        </>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Description (FR)</label>
        <textarea name="descriptionFr" defaultValue={initial?.descriptionFr} required rows={3} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Style de vie (FR)</label>
        <input name="lifestyleFr" defaultValue={initial?.lifestyleFr} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Prix moyen/m² (DH)</label>
          <input name="avgPriceM2" type="number" defaultValue={initial?.avgPriceM2} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Demande</label>
          <select name="demandLevel" defaultValue={initial?.demandLevel} className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
            <option value="">—</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50">
        {loading ? "Enregistrement..." : isEdit ? "Enregistrer" : "Créer le quartier"}
      </button>
    </form>
  );
}
