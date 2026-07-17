"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TestimonialCreateForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      clientName: form.get("clientName"),
      quoteFr: form.get("quoteFr"),
      rating: Number(form.get("rating")),
      isGoogleReview: form.get("isGoogleReview") === "on",
      featured: form.get("featured") === "on",
    };

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Une erreur est survenue.");
      return;
    }

    router.push(`/${locale}/dashboard/testimonials`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Nom du client</label>
        <input name="clientName" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Témoignage (FR)</label>
        <textarea name="quoteFr" required rows={3} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Note</label>
        <select name="rating" defaultValue="5" className="rounded-lg border border-stone-200 px-3 py-2 text-sm w-24">
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}/5</option>)}
        </select>
      </div>

      <div className="flex gap-6 text-sm text-stone-600">
        <label className="flex items-center gap-2"><input type="checkbox" name="isGoogleReview" /> Avis Google</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="featured" /> Mettre en avant</label>
      </div>

      <button type="submit" disabled={loading} className="self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50">
        {loading ? "Création..." : "Ajouter le témoignage"}
      </button>
    </form>
  );
}
