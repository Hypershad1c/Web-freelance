import { personas } from "@/data/content";

export default function Personas() {
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
