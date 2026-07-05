export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          domify<span>.</span>
        </div>
        <div className="nav-links">
          <a href="#quartiers">Quartiers</a>
          <a href="#biens">Biens</a>
          <a href="#tunnel">Comment ça marche</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#contact">
          Parler à un conseiller
        </a>
      </nav>
    </header>
  );
}
