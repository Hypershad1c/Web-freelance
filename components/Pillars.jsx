const pillars = [
  {
    num: "01",
    title: "Marketing émotionnel",
    desc: "Chaque bien est présenté comme un lieu de vie, pas une fiche technique — pour raccourcir la décision d'achat.",
  },
  {
    num: "02",
    title: "Vidéos immersives",
    desc: "Visites filmées et montées pour donner envie de venir, diffusées en priorité sur TikTok et Reels.",
  },
  {
    num: "03",
    title: "Branding premium",
    desc: "Une présentation cohérente sur chaque support pour installer une perception haut de gamme dès le départ.",
  },
];

export default function Pillars() {
  return (
    <section className="pillars">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Positionnement</span>
            <h2>Trois piliers pour vendre au-delà du prix au m².</h2>
          </div>
          <p>Le marché casablancais reste peu digitalisé. C&apos;est l&apos;écart que Domify comble.</p>
        </div>
        <div className="pillar-grid reveal">
          {pillars.map((p) => (
            <div className="pillar" key={p.num}>
              <span className="num mono">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
