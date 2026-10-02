import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-small-title">
          ARTISTE CONGOLAIS
        </p>

        <h1>
          BUT NA
          <br />
          FILET
        </h1>

        <p className="hero-description">
          Découvrez l'univers musical de But na Filet,
          ses chansons, ses vidéos, ses actualités
          et ses prochains concerts.
        </p>

        <div className="hero-buttons">

          <Link
            href="/discographie"
            className="btn btn-yellow"
          >
            DÉCOUVRIR SA MUSIQUE
          </Link>

          <Link
            href="/biographie"
            className="btn btn-white"
          >
            SA BIOGRAPHIE
          </Link>

        </div>

      </div>

    </section>
  );
}