"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactForm({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const searchParams = useSearchParams();
  const propertyRef = searchParams.get("ref");
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
      notes: propertyRef
        ? `[Réf. ${propertyRef}] ${form.get("message")}`
        : form.get("message"),
      source: "CONTACT_FORM",
      preferredLocale: locale,
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
        <p className="font-heading text-xl text-primary mb-2">{t.pages.contactSuccessTitle}</p>
        <p className="text-sm text-stone-600">{t.pages.contactSuccessBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {propertyRef && (
        <p className="text-xs text-stone-500">
          {t.pages.regarding} <span className="text-accent font-medium">{propertyRef}</span>
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-xs text-stone-500">{t.forms.fullName}</label>
        <input id="fullName" name="fullName" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs text-stone-500">{t.forms.phone}</label>
          <input id="phone" name="phone" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-stone-500">{t.forms.email}</label>
          <input id="email" name="email" type="email" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-xs text-stone-500">{t.forms.message}</label>
        <textarea id="message" name="message" rows={4} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50"
      >
        {loading ? t.forms.sending : t.forms.send}
      </button>
    </form>
  );
}
