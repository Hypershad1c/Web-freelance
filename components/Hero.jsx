export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <span className="eyebrow mono">Casablanca — moyen à haut standing</span>
          <h1>
            Une adresse ne se vend pas.
            <br />
            <em>Elle se raconte.</em>
          </h1>
          <p className="lead">
            Domify accompagne la vente de biens moyen et haut standing à
            Casablanca, avec un marketing pensé pour créer une perception
            premium dès la première visite.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact">
              Discuter sur WhatsApp
            </a>
            <a className="btn btn-ghost" href="#biens">
              Voir les biens
            </a>
          </div>
        </div>
        <div className="hero-plan reveal">
          <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="360" height="460" stroke="#3A3F44" strokeWidth="1" />
            <line x1="20" y1="180" x2="380" y2="180" stroke="#3A3F44" strokeWidth="1" />
            <line x1="220" y1="20" x2="220" y2="180" stroke="#3A3F44" strokeWidth="1" />
            <line x1="20" y1="340" x2="380" y2="340" stroke="#3A3F44" strokeWidth="1" />
            <line x1="140" y1="180" x2="140" y2="480" stroke="#3A3F44" strokeWidth="1" />
            <line x1="260" y1="340" x2="260" y2="480" stroke="#3A3F44" strokeWidth="1" />
            <circle cx="60" cy="60" r="14" stroke="#A97C3F" strokeWidth="1.2" />
            <path d="M60 46 A14 14 0 0 1 74 60" stroke="#A97C3F" strokeWidth="1.2" />
            <rect x="250" y="60" width="90" height="60" stroke="#A97C3F" strokeWidth="1" />
            <text x="255" y="52" fill="#8C8A82" fontSize="9" fontFamily="var(--font-mono)">séjour</text>
            <text x="45" y="240" fill="#8C8A82" fontSize="9" fontFamily="var(--font-mono)">chambre 1</text>
            <text x="165" y="240" fill="#8C8A82" fontSize="9" fontFamily="var(--font-mono)">chambre 2</text>
            <text x="45" y="400" fill="#8C8A82" fontSize="9" fontFamily="var(--font-mono)">terrasse</text>
            <text x="285" y="400" fill="#8C8A82" fontSize="9" fontFamily="var(--font-mono)">cuisine</text>
          </svg>
          <div className="hero-plan-label mono">plan indicatif — 001</div>
        </div>
      </div>
    </section>
  );
}
