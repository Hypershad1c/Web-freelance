"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  locale: string;
  neighborhoods: { id: string; name: string }[];
};

export function PropertyCreateForm({ locale, neighborhoods }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploading(true);

    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error ?? "Échec de l'upload.");
          continue;
        }
        setImages((prev) => [...prev, data.url]);
      } catch {
        setUploadError("Échec de l'upload. Vérifiez votre connexion.");
      }
    }
    setUploading(false);
    e.target.value = ""; // allow re-selecting the same file
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      reference: form.get("reference"),
      type: form.get("type"),
      price: Number(form.get("price")),
      surfaceM2: Number(form.get("surfaceM2")),
      bedrooms: Number(form.get("bedrooms")),
      bathrooms: Number(form.get("bathrooms")),
      hasPool: form.get("hasPool") === "on",
      hasParking: form.get("hasParking") === "on",
      hasGarden: form.get("hasGarden") === "on",
      neighborhoodId: form.get("neighborhoodId"),
      titleFr: form.get("titleFr"),
      descriptionFr: form.get("descriptionFr"),
      featured: form.get("featured") === "on",
      images,
    };

    const res = await fetch("/api/properties", {
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
        data.error?.formErrors?.[0] ??
          (firstFieldError ? `${firstFieldError[0]}: ${(firstFieldError[1] as string[])[0]}` : "Une erreur est survenue.")
      );
      return;
    }

    router.push(`/${locale}/dashboard/properties`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-stone-500 -mb-2">
        Seul le contenu français est requis ici. Les versions arabe et anglaise
        sont créées vides et doivent être complétées séparément — ne pas les
        traduire automatiquement, surtout pour le Darija.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Référence (ex: DOM-0011)" name="reference" required />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Type</label>
          <select name="type" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
            <option value="APARTMENT">Appartement</option>
            <option value="VILLA">Villa</option>
            <option value="RIVAD">Riad</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="LAND">Terrain</option>
            <option value="OFFICE">Bureau</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Quartier</label>
        <select name="neighborhoodId" required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      <Field label="Titre (FR)" name="titleFr" required />
      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Description (FR)</label>
        <textarea name="descriptionFr" required rows={4} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Field label="Prix (DH)" name="price" type="number" required />
        <Field label="Surface (m²)" name="surfaceM2" type="number" required />
        <Field label="Chambres" name="bedrooms" type="number" required />
        <Field label="Sdb" name="bathrooms" type="number" required />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-stone-500">Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-stone-400">Envoi en cours...</p>}
        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {images.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-20 w-20 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs"
                  aria-label="Supprimer cette photo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-6 text-sm text-stone-600">
        <label className="flex items-center gap-2"><input type="checkbox" name="hasPool" /> Piscine</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="hasParking" /> Parking</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="hasGarden" /> Jardin</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="featured" /> Mettre en avant</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50"
      >
        {loading ? "Création..." : "Créer le bien"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-stone-500">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
      />
    </div>
  );
}
