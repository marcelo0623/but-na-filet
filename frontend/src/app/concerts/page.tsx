import "../home.css";
import { getConcerts } from "@/lib/api";

export default async function ConcertsPage() {
  const concerts = await getConcerts();

  return (
    <main className="concerts-page">

      {/* EN-TÊTE */}
      <section className="concerts-header">
        <h1>CONCERTS</h1>

        <p>
          Retrouvez les prochains concerts et événements de But Na Filet.
        </p>
      </section>

      {/* CONTENU */}
      <section className="concerts-content">

        <div className="concerts-title">
          <h2>PROCHAINS CONCERTS</h2>
        </div>

        {concerts.length === 0 ? (
          <div className="concert-empty">
            <p>Aucun concert disponible pour le moment.</p>
          </div>
        ) : (
          <div className="concerts-grid">

            {concerts.map((concert: any) => (
              <article
                key={concert.id}
                className="concert-card"
              >

                <div className="concert-image">
                  <img
                    src="/images/kw.jpg"
                    alt={`Concert But Na Filet à ${concert.ville}`}
                  />
                </div>

                <div className="concert-info">

                  <span className="concert-date">
                    {new Date(concert.date).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>

                  <h3>{concert.ville}</h3>

                  <p>{concert.lieu}</p>

                  {concert.description && (
                    <p>{concert.description}</p>
                  )}

                  <span className="concert-status">
                    {concert.statut === "a_venir"
                      ? "À venir"
                      : concert.statut === "termine"
                      ? "Terminé"
                      : "Annulé"}
                  </span>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}