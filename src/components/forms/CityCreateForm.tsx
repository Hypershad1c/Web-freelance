"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CityCreateForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.get("name") }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error?.formErrors?.[0] ?? "Une erreur est survenue.");
      return;
    }

    router.push(`/${locale}/dashboard/cities`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Nom de la ville</label>
        <input name="name" required placeholder="ex: Marrakech" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        <p className="text-xs text-stone-400 mt-1">
          L'URL sera générée automatiquement (ex: "Marrakech" → /marrakech).
        </p>
      </div>

      <button type="submit" disabled={loading} className="self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50">
        {loading ? "Création..." : "Créer la ville"}
      </button>
    </form>
  );
}
