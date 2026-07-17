"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteBlogPostButton({ postId, title }: { postId: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Supprimer définitivement "${title}" ? Action irréversible.`);
    if (!confirmed) return;

    setLoading(true);
    const res = await fetch(`/api/blog/${postId}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      alert("Échec de la suppression.");
      return;
    }
    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="text-red-500 hover:underline disabled:opacity-50">
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
