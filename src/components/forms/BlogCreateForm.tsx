"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlogCreateForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      titleFr: form.get("titleFr"),
      excerptFr: form.get("excerptFr"),
      bodyFr: form.get("bodyFr"),
      category: form.get("category") || undefined,
      published: form.get("published") === "on",
    };

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      const fieldErrors = data.error?.fieldErrors;
      const firstFieldError = fieldErrors
        ? Object.entries(fieldErrors).find(([, v]) => Array.isArray(v) && v.length > 0)
        : null;
      setError(
        firstFieldError
          ? `${firstFieldError[0]}: ${(firstFieldError[1] as string[])[0]}`
          : "Une erreur est survenue."
      );
      return;
    }

    router.push(`/${locale}/dashboard/blog`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <p className="text-xs text-stone-500 -mb-2">
        Seul le contenu français est requis ici. Les versions arabe et anglaise
        sont créées vides et doivent être complétées séparément.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Titre (FR)</label>
        <input name="titleFr" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Catégorie</label>
        <select name="category" className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          <option value="">Aucune</option>
          <option value="buying">Guide d'achat</option>
          <option value="selling">Guide de vente</option>
          <option value="taxes">Fiscalité</option>
          <option value="investment">Investissement</option>
          <option value="comparison">Comparaison de quartiers</option>
          <option value="market-trends">Tendances du marché</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Extrait (FR)</label>
        <textarea name="excerptFr" required rows={2} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Contenu (FR)</label>
        <textarea name="bodyFr" required rows={10} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm text-stone-600">
        <input type="checkbox" name="published" /> Publier immédiatement
      </label>

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50"
      >
        {loading ? "Création..." : "Créer l'article"}
      </button>
    </form>
  );
}
