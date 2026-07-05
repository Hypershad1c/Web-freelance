import { quartiers } from "@/data/content";

export default function Quartiers() {
  return (
    <section className="quartiers" id="quartiers">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Zones couvertes</span>
            <h2>Un registre de quartiers, pas une carte générique.</h2>
          </div>
          <p>Six secteurs où la demande premium est la plus active à Casablanca.</p>
        </div>
        <div className="registry reveal">
          {quartiers.map((q) => (
            <div className="reg-row" key={q.idx}>
              <span className="idx">{q.idx}</span>
              <span className="name">{q.name}</span>
              <span className="desc">{q.desc}</span>
              <span className="price">{q.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
