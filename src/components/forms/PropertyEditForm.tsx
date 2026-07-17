"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Initial = {
  type: string;
  status: string;
  price: number;
  surfaceM2: number;
  bedrooms: number;
  bathrooms: number;
  hasPool: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  neighborhoodId: string;
  featured: boolean;
  titleFr: string;
  descriptionFr: string;
  images: { id: string; url: string }[];
};

type Props = {
  locale: string;
  propertyId: string;
  neighborhoods: { id: string; name: string }[];
  initial: Initial;
};

export function PropertyEditForm({ locale, propertyId, neighborhoods, initial }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState(initial.images);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
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
        setNewImages((prev) => [...prev, data.url]);
      } catch {
        setUploadError("Échec de l'upload.");
      }
    }
    setUploading(false);
    e.target.value = "";
  }

  function removeExistingImage(id: string) {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImageIds((prev) => [...prev, id]);
  }

  function removeNewImage(url: string) {
    setNewImages((prev) => prev.filter((u) => u !== url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      type: form.get("type"),
      status: form.get("status"),
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
      newImages,
      removedImageIds,
    };

    const res = await fetch(`/api/properties/${propertyId}`, {
      method: "PATCH",
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

    router.push(`/${locale}/dashboard/properties`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Type</label>
          <select name="type" defaultValue={initial.type} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
            <option value="APARTMENT">Appartement</option>
            <option value="VILLA">Villa</option>
            <option value="RIVAD">Riad</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="LAND">Terrain</option>
            <option value="OFFICE">Bureau</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Statut</label>
          <select name="status" defaultValue={initial.status} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
            <option value="DRAFT">Brouillon</option>
            <option value="PUBLISHED">Publié</option>
            <option value="UNDER_OFFER">Sous offre</option>
            <option value="SOLD">Vendu</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Quartier</label>
        <select name="neighborhoodId" defaultValue={initial.neighborhoodId} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Titre (FR)</label>
        <input name="titleFr" defaultValue={initial.titleFr} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-stone-500">Description (FR)</label>
        <textarea name="descriptionFr" defaultValue={initial.descriptionFr} required rows={4} className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Prix (DH)</label>
          <input name="price" type="number" defaultValue={initial.price} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Surface (m²)</label>
          <input name="surfaceM2" type="number" defaultValue={initial.surfaceM2} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Chambres</label>
          <input name="bedrooms" type="number" defaultValue={initial.bedrooms} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-500">Sdb</label>
          <input name="bathrooms" type="number" defaultValue={initial.bathrooms} required className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-6 text-sm text-stone-600">
        <label className="flex items-center gap-2"><input type="checkbox" name="hasPool" defaultChecked={initial.hasPool} /> Piscine</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="hasParking" defaultChecked={initial.hasParking} /> Parking</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="hasGarden" defaultChecked={initial.hasGarden} /> Jardin</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={initial.featured} /> Mettre en avant</label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-stone-500">Photos</label>
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-20 w-20 object-cover rounded-lg" />
                <button type="button" onClick={() => removeExistingImage(img.id)} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs" aria-label="Supprimer">×</button>
              </div>
            ))}
          </div>
        )}
        <input type="file" accept="image/*" multiple onChange={handleFileChange} disabled={uploading} className="text-sm mt-1" />
        {uploading && <p className="text-xs text-stone-400">Envoi en cours...</p>}
        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
        {newImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {newImages.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-20 w-20 object-cover rounded-lg" />
                <button type="button" onClick={() => removeNewImage(url)} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs" aria-label="Supprimer">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="mt-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors disabled:opacity-50">
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
