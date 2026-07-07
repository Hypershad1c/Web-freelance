import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";

const links = [
  { href: "#quartiers", label: "Quartiers" },
  { href: "#biens", label: "Biens" },
  { href: "#tunnel", label: "Comment ça marche" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header>
      <nav>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/logo.jpeg" alt="Domify" width={34} height={34} style={{ borderRadius: 4 }} />
          <span className="logo">
            domify<span>.</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#quartiers">Quartiers</a>
          <a href="#biens">Biens</a>
          <a href="#tunnel">Comment ça marche</a>
          <a href="#contact">Contact</a>
          <a href="/ar" style={{ color: "var(--bronze-light)" }}>
            العربية
          </a>
        </div>
        <a className="nav-cta" href="#contact">
          Parler à un conseiller
        </a>
        <MobileMenu
          links={links}
          langHref="/ar"
          langLabel="العربية"
          ctaHref="#contact"
          ctaLabel="Parler à un conseiller"
        />
      </nav>
    </header>
  );
}
