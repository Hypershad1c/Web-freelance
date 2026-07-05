import { funnel } from "@/data/content";

export default function Funnel() {
  return (
    <section className="funnel" id="tunnel">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Tunnel de vente</span>
            <h2>De la vidéo virale à la signature.</h2>
          </div>
        </div>
        <div className="funnel-track reveal">
          {funnel.map((f) => (
            <div className="funnel-step" key={f.n}>
              <span className="n mono">{f.n}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
