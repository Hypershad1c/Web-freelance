"use client";

import { personas } from "@/data/content";

// budget doit correspondre aux value de budgetRanges dans data/content.js
const personaBudgetMap = {
  "Jeunes couples": "700k-1.5M",
  "Cadres et entrepreneurs": "2M-5M",
  "Investisseurs et diaspora": "5M+",
};

export default function Personas() {
  function selectPersona(title) {
    window.dispatchEvent(
      new CustomEvent("domify:persona-select", {
        detail: { budget: personaBudgetMap[title] || "" },
      })
    );
  }

  return (
    <section className="personas">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Pour qui</span>
            <h2>Trois profils, trois discours différents.</h2>
          </div>
          <p>Le ton et le canal changent selon qui regarde l&apos;annonce.</p>
        </div>
        <div className="persona-grid reveal">
          {personas.map((p) => (
            <div className="persona" key={p.title}>
              <span className="range mono">{p.range}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <button
                onClick={() => selectPersona(p.title)}
                style={{
                  marginTop: 16,
                  background: "none",
                  border: "1px solid var(--line)",
                  color: "var(--bronze-light)",
                  fontSize: 12,
                  padding: "8px 14px",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                Je suis dans ce profil →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
