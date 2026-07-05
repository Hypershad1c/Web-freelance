// Contenu du site. À terme, ces tableaux peuvent venir d'une API/CMS
// (Sanity, Airtable, etc.) au lieu d'être en dur ici.

export const quartiers = [
  { idx: "01", name: "Californie", desc: "Résidentiel familial, forte demande cadres et entrepreneurs.", price: "2M–5M MAD" },
  { idx: "02", name: "Ain Diab", desc: "Front de mer, villas et appartements haut standing.", price: "5M+ MAD" },
  { idx: "03", name: "Bouskoura", desc: "Villas et lotissements neufs, cible jeunes couples et primo-accédants.", price: "700k–1.5M MAD" },
  { idx: "04", name: "CIL", desc: "Quartier calme et central, bon rapport emplacement/prix.", price: "1.5M–3M MAD" },
  { idx: "05", name: "Maarif", desc: "Central et commerçant, forte liquidité à la revente.", price: "1.5M–4M MAD" },
  { idx: "06", name: "Racine", desc: "Standing établi, recherché par la diaspora et les investisseurs.", price: "2M–6M MAD" },
];

// placeholder: à remplacer par de vraies annonces + vraies photos avant mise en ligne
export const biens = [
  { title: "Appartement 3 chambres", loc: "Californie, Casablanca", surface: "120 m² · 3 ch.", price: "2 450 000 MAD", plan: "apartment" },
  { title: "Villa avec piscine", loc: "Ain Diab, Casablanca", surface: "380 m² · 5 ch.", price: "7 900 000 MAD", plan: "villa" },
  { title: "Duplex neuf", loc: "Bouskoura, Casablanca", surface: "145 m² · 3 ch.", price: "1 250 000 MAD", plan: "duplex" },
];

export const personas = [
  { range: "700k – 1.5M MAD", title: "Jeunes couples", desc: "Premier achat, sensibles au financement et à la projection de vie — contenu rassurant et pédagogique." },
  { range: "2M – 5M MAD", title: "Cadres et entrepreneurs", desc: "Recherchent le gain de temps et le statut — présentation soignée, réponse rapide sur WhatsApp." },
  { range: "5M+ MAD", title: "Investisseurs et diaspora", desc: "Décision à distance — vidéos immersives et dossier complet indispensables avant la visite." },
];

export const funnel = [
  { n: "01", title: "Attirer", desc: "Contenu court sur TikTok et Reels." },
  { n: "02", title: "Rediriger", desc: "Vers WhatsApp Business." },
  { n: "03", title: "Qualifier", desc: "Budget, quartier, échéance." },
  { n: "04", title: "Visiter", desc: "Planification de la visite." },
  { n: "05", title: "Signer", desc: "Closing et mandat." },
];

// placeholder: à remplacer par de vrais témoignages
export const temoignages = [
  { txt: "Nous avons vendu notre appartement à Maarif en trois semaines, avec un accompagnement clair du premier appel à la signature.", who: "Nom du client", role: "Vendeur, Maarif" },
  { txt: "La vidéo de visite nous a permis de nous décider sans nous déplacer avant le dernier rendez-vous.", who: "Nom du client", role: "Acheteur, diaspora" },
  { txt: "Réponse rapide sur WhatsApp et visites bien organisées — exactement ce qu'il nous fallait avec notre emploi du temps.", who: "Nom du client", role: "Acheteurs, Californie" },
];

export const budgetRanges = [
  { value: "700k-1.5M", label: "700k – 1.5M MAD" },
  { value: "1.5M-2M", label: "1.5M – 2M MAD" },
  { value: "2M-5M", label: "2M – 5M MAD" },
  { value: "5M+", label: "5M+ MAD" },
];

export const contact = {
  whatsapp: "+212 6XX XX XX XX",
  whatsappNumber: "2126XXXXXXXX", // format international sans + ni espaces, requis pour wa.me
  email: "contact@domify.ma",
  zone: "Casablanca — Ain Diab, Maarif, Racine…",
};
