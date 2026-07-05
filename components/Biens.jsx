import { biens } from "@/data/content";

const planSvgs = {
  apartment: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <polygon points="0,180 90,90 160,150 230,60 300,150 300,225 0,225" fill="none" stroke="#3A3F44" />
      <circle cx="240" cy="40" r="18" fill="none" stroke="#A97C3F" />
    </svg>
  ),
  villa: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <rect x="60" y="80" width="180" height="100" fill="none" stroke="#3A3F44" />
      <polygon points="60,80 150,40 240,80" fill="none" stroke="#3A3F44" />
      <line x1="150" y1="40" x2="150" y2="180" stroke="#3A3F44" />
    </svg>
  ),
  duplex: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <rect x="40" y="60" width="90" height="120" fill="none" stroke="#3A3F44" />
      <rect x="150" y="90" width="110" height="90" fill="none" stroke="#3A3F44" />
    </svg>
  ),
};

export default function Biens() {
  return (
    <section className="biens" id="biens">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="tag">Sélection</span>
            <h2>Biens en vedette.</h2>
          </div>
          <p>Emplacements réservés — à remplacer par vos annonces et photos réelles.</p>
        </div>
        <span className="biens-note mono reveal">
          Contenu d&apos;exemple — remplacer par vos vraies annonces avant mise en ligne
        </span>
        <div className="biens-grid reveal">
          {biens.map((b) => (
            <div className="biens-card" key={b.title}>
              <div className="biens-visual">
                <span className="biens-tag">Exemple</span>
                {planSvgs[b.plan]}
              </div>
              <div className="biens-body">
                <h3>{b.title}</h3>
                <div className="loc mono">{b.loc}</div>
                <div className="biens-meta">
                  <span>{b.surface}</span>
                  <span className="price">{b.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
