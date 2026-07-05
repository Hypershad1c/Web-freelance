"use client";

import { useEffect, useState } from "react";
import { budgetRanges, quartiers, contact } from "@/data/content";

export default function LeadForm({ lang = "fr" }) {
  const t =
    lang === "ar"
      ? {
          nom: "الاسم الكامل",
          tel: "الهاتف",
          budget: "الميزانية",
          quartier: "الحي (اختياري)",
          submit: "إرسال عبر واتساب",
          note:
            "يفتح واتساب مع معلوماتك المدخلة مسبقا — لا يتم تخزين أي بيانات على هذا الموقع حاليا.",
          msgIntro: (nom) => `مرحبا، أنا ${nom}.`,
          msgTel: (t) => `الهاتف: ${t}`,
          msgBudget: (b) => `الميزانية: ${b}`,
          msgQuartier: (q) => `الحي المطلوب: ${q}`,
          msgClosing: "أرغب في أن يتم التواصل معي بخصوص عقار في الدار البيضاء.",
          nonPrecise: "غير محدد",
        }
      : {
          nom: "Nom complet",
          tel: "Téléphone",
          budget: "Budget",
          quartier: "Quartier (optionnel)",
          submit: "Envoyer sur WhatsApp",
          note:
            "Ouvre WhatsApp avec vos informations pré-remplies — aucune donnée n'est stockée sur ce site pour l'instant. Pour un vrai suivi de leads, brancher un CRM est recommandé (voir README).",
          msgIntro: (nom) => `Bonjour, je suis ${nom}.`,
          msgTel: (t) => `Téléphone : ${t}`,
          msgBudget: (b) => `Budget : ${b}`,
          msgQuartier: (q) => `Quartier recherché : ${q}`,
          msgClosing: "Je souhaite être recontacté(e) au sujet d'un bien à Casablanca.",
          nonPrecise: "non précisé",
        };

  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    budget: "",
    quartier: "",
  });

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

    const budgetLabel = budgetRanges.find((b) => b.value === form.budget)?.label || t.nonPrecise;
    const quartierLabel = form.quartier || t.nonPrecise;

    const message = [
      t.msgIntro(form.nom),
      t.msgTel(form.telephone),
      t.msgBudget(budgetLabel),
      t.msgQuartier(quartierLabel),
      t.msgClosing,
    ].join("\n");

    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input
        type="text"
        placeholder={t.nom}
        value={form.nom}
        onChange={update("nom")}
        required
        style={inputStyle}
      />
      <input
        type="tel"
        placeholder={t.tel}
        value={form.telephone}
        onChange={update("telephone")}
        required
        style={inputStyle}
      />
      <select value={form.budget} onChange={update("budget")} style={inputStyle} required>
        <option value="" disabled>
          {t.budget}
        </option>
        {budgetRanges.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>
      <select value={form.quartier} onChange={update("quartier")} style={inputStyle}>
        <option value="">{t.quartier}</option>
        {quartiers.map((q) => (
          <option key={q.idx} value={q.name}>
            {q.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary" style={{ border: "none", cursor: "pointer" }}>
        {t.submit}
      </button>
      <p style={{ fontSize: 11, color: "var(--stone-dim)" }}>{t.note}</p>
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
