import { temoignages } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="temoignages">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Confiance</span>
            <h2>Ce que disent nos clients.</h2>
          </div>
        </div>
        <div className="temoin-grid reveal">
          {temoignages.map((t) => (
            <div className="temoin" key={t.who + t.role}>
              <span className="example-badge mono">Exemple à remplacer</span>
              <span className="quote-mark">&quot;</span>
              <p className="txt">{t.txt}</p>
              <div className="who">{t.who}</div>
              <div className="role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
