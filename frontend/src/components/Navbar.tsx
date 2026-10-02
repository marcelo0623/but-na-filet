import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="site-navbar">
      <div className="navbar-container">

        {/* LOGO À GAUCHE */}
        <Link href="/" className="brand">
          <span className="brand-logo">Bf</span>
          <span className="brand-name">BUT NA FILET OFFICIEL</span>
        </Link>

        {/* MENU À DROITE */}
        <div className="nav-menu">
          <Link href="/">ACCUEIL</Link>
          <Link href="/biographie">BIOGRAPHIE</Link>
          <Link href="/discographie">DISCOGRAPHIE</Link>
          <Link href="/videos">VIDÉOS</Link>
          <Link href="/galerie">GALERIE</Link>
          <Link href="/concerts">CONCERTS</Link>
          <Link href="/contact">CONTACT</Link>
        </div>

      </div>
    </nav>
  );
}