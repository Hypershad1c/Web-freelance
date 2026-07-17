"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePropertyButton({ propertyId, reference }: { propertyId: string; reference: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Supprimer définitivement ${reference} ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    setLoading(true);
    const res = await fetch(`/api/properties/${propertyId}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      alert("Échec de la suppression.");
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:underline disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
