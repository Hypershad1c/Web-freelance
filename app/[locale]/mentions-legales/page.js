export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Domify.",
};

export default function MentionsLegales() {
  return (
    <section style={{ padding: "160px 0 100px" }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 32, marginBottom: 32 }}>Mentions légales</h1>

        <p style={{ color: "var(--stone-dim)", marginBottom: 24, fontSize: 13 }}>
          Contenu à compléter avant mise en ligne — les champs ci-dessous sont
          des emplacements réservés, pas des informations réelles.
        </p>

        <h2 style={{ fontSize: 18, margin: "28px 0 10px" }}>Éditeur du site</h2>
        <p style={{ color: "var(--stone-dim)", fontSize: 14 }}>
          Raison sociale : [à compléter]<br />
          Forme juridique : [à compléter]<br />
          Siège social : [adresse complète à compléter]<br />
          RC : [numéro de registre de commerce]<br />
          ICE : [identifiant commun de l&apos;entreprise]<br />
        </p>

        <h2 style={{ fontSize: 18, margin: "28px 0 10px" }}>
          Carte professionnelle d&apos;agent immobilier
        </h2>
        <p style={{ color: "var(--stone-dim)", fontSize: 14 }}>
          Numéro de carte professionnelle : [à compléter]<br />
          Obligatoire pour exercer l&apos;intermédiation immobilière au Maroc —
          à afficher avant toute publicité active pour les biens.
        </p>

        <h2 style={{ fontSize: 18, margin: "28px 0 10px" }}>Hébergement</h2>
        <p style={{ color: "var(--stone-dim)", fontSize: 14 }}>
          Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        </p>

        <h2 style={{ fontSize: 18, margin: "28px 0 10px" }}>Contact</h2>
        <p style={{ color: "var(--stone-dim)", fontSize: 14 }}>
          Email : [à compléter]<br />
          Téléphone : [à compléter]
        </p>
      </div>
    </section>
  );
}
