import "../home.css";
import { getMusiques } from "@/lib/api";

export default async function DiscographiePage() {
  const musiques = await getMusiques();

  return (
    <main className="discographie-page">

      {/* EN-TÊTE */}
      <section className="discographie-header">
        <h1>DISCOGRAPHIE</h1>

        <p>
          Découvrez les œuvres musicales de But Na Filet.
        </p>
      </section>


      {/* DISCOGRAPHIE */}
      <section className="discographie-content">

        <div className="discographie-title">
          <h2>PROJETS MUSICAUX</h2>
        </div>


        {musiques.length === 0 ? (
          <div className="album-empty">
            <p>Aucune musique disponible pour le moment.</p>
          </div>
        ) : (
          <div className="albums-grid">

            {musiques.map((musique: any) => (

              <article
                className="album-card"
                key={musique.id}
              >

                <div className="album-image">

                  {musique.pochette ? (
                    <img
                      src={musique.pochette}
                      alt={musique.titre}
                    />
                  ) : (
                    <img
                      src="/images/d.jpg"
                      alt={musique.titre}
                    />
                  )}

                </div>


                <div className="album-info">

                  <h3>{musique.titre}</h3>

                  {musique.album && (
                    <span>{musique.album}</span>
                  )}

                  {musique.artiste && (
                    <p>{musique.artiste}</p>
                  )}


                  {musique.lien_spotify && (
                    <a
                      href={musique.lien_spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="listen-button"
                    >
                      ÉCOUTER
                    </a>
                  )}

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}