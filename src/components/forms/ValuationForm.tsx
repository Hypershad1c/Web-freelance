"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/dictionaries";

export function ValuationForm({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email") || undefined,
      intent: "SELLING",
      source: "VALUATION_FORM",
      preferredLocale: locale,
      notes: `Adresse: ${form.get("propertyAddress")} | ${form.get("surfaceM2")}m² | ${form.get("bedrooms")}ch/${form.get("bathrooms")}sdb`,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError(t.forms.genericError);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="font-heading text-xl text-primary mb-2">{t.pages.valuationSuccessTitle}</p>
        <p className="text-sm text-stone-600">{t.pages.valuationSuccessBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-xs text-stone-500">{t.forms.fullName}</label>
          <input id="fullName" name="fullName" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs text-stone-500">{t.forms.phone}</label>
          <input id="phone" name="phone" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-stone-500">{t.forms.email}</label>
        <input id="email" name="email" type="email" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="propertyAddress" className="text-xs text-stone-500">{t.forms.propertyAddress}</label>
        <input id="propertyAddress" name="propertyAddress" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="surfaceM2" className="text-xs text-stone-500">{t.forms.surface}</label>
          <input id="surfaceM2" name="surfaceM2" type="number" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="bedrooms" className="text-xs text-stone-500">{t.forms.bedroomsField}</label>
          <input id="bedrooms" name="bedrooms" type="number" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="bathrooms" className="text-xs text-stone-500">{t.forms.bathroomsField}</label>
          <input id="bathrooms" name="bathrooms" type="number" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
      >
        {loading ? t.forms.sending : t.forms.submitValuation}
      </button>
    </form>
  );
}
