"use client";

import { useEffect, useState } from "react";
import { budgetRanges, quartiers, contact } from "@/data/content";

export default function LeadForm() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    budget: "",
    quartier: "",
  });

  // écoute les clics "je suis dans ce profil" envoyés depuis Personas
  useEffect(() => {
    function handlePersonaSelect(e) {
      setForm((f) => ({ ...f, budget: e.detail.budget }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    window.addEventListener("domify:persona-select", handlePersonaSelect);
    return () => window.removeEventListener("domify:persona-select", handlePersonaSelect);
  }, []);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nom || !form.telephone) return;

    const budgetLabel =
      budgetRanges.find((b) => b.value === form.budget)?.label || "non précisé";
    const quartierLabel = form.quartier || "non précisé";

    const message =
      `Bonjour, je suis ${form.nom}.\n` +
      `Téléphone : ${form.telephone}\n` +
      `Budget : ${budgetLabel}\n` +
      `Quartier recherché : ${quartierLabel}\n` +
      `Je souhaite être recontacté(e) au sujet d'un bien à Casablanca.`;

    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input
        type="text"
        placeholder="Nom complet"
        value={form.nom}
        onChange={update("nom")}
        required
        style={inputStyle}
      />
      <input
        type="tel"
        placeholder="Téléphone"
        value={form.telephone}
        onChange={update("telephone")}
        required
        style={inputStyle}
      />
      <select value={form.budget} onChange={update("budget")} style={inputStyle} required>
        <option value="" disabled>
          Budget
        </option>
        {budgetRanges.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>
      <select value={form.quartier} onChange={update("quartier")} style={inputStyle}>
        <option value="">Quartier (optionnel)</option>
        {quartiers.map((q) => (
          <option key={q.idx} value={q.name}>
            {q.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary" style={{ border: "none", cursor: "pointer" }}>
        Envoyer sur WhatsApp
      </button>
      <p style={{ fontSize: 11, color: "var(--stone-dim)" }}>
        Ouvre WhatsApp avec vos informations pré-remplies — aucune donnée n&apos;est stockée sur ce
        site pour l&apos;instant. Pour un vrai suivi de leads, brancher un CRM est recommandé (voir
        README).
      </p>
    </form>
  );
}

const inputStyle = {
  background: "var(--charcoal-2)",
  border: "1px solid var(--line)",
  color: "var(--cream)",
  padding: "12px 14px",
  borderRadius: 2,
  fontSize: 14,
  fontFamily: "var(--font-inter)",
};
