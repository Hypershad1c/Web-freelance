import Image from "next/image";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1693532088390-d278b7cefed0?fm=jpg&q=75&w=1200&auto=format&fit=crop",
    alt: "Architecture urbaine à Casablanca",
  },
  {
    src: "https://images.unsplash.com/photo-1519594445471-0e5f86b3fb09?fm=jpg&q=75&w=800&auto=format&fit=crop",
    alt: "Vue côtière au Maroc",
  },
  {
    src: "https://images.unsplash.com/photo-1624805151765-35bc8b2c9623?fm=jpg&q=75&w=800&auto=format&fit=crop",
    alt: "Façade d'immeuble moderne",
  },
];

export default function AmbianceGallery({ lang = "fr" }) {
  const caption =
    lang === "ar"
      ? "الدار البيضاء — صور توضيحية عامة، خالية من حقوق النشر (Unsplash). ليست صورًا لعقارات حقيقية معروضة."
      : "Casablanca — photos d'illustration générale, libres de droits (Unsplash). Ne représentent pas de biens réels en vente.";

  return (
    <section className="ambiance">
      <div className="wrap">
        <div className="ambiance-grid reveal">
          {photos.map((p) => (
            <div key={p.src}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 50vw, 33vw" />
            </div>
          ))}
        </div>
        <p className="ambiance-caption reveal">{caption}</p>
      </div>
    </section>
  );
}
