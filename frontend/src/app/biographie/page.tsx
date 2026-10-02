import "../home.css";
import { getBiographies } from "@/lib/api";

export default async function BiographiePage() {
  const biographies = await getBiographies();

  return (
    <main className="biographie-page">

      <section className="page-header">
        <h1>BIOGRAPHIE</h1>
        <p>Découvrez l'univers de But Na Filet.</p>
      </section>

      <section className="bio-content">

        {biographies.length === 0 ? (
          <div className="bio-block">
            <h2>AUCUNE BIOGRAPHIE</h2>
            <p>
              Aucun contenu biographique n'est disponible pour le moment.
            </p>
          </div>
        ) : (
          biographies
            .filter((bio: any) => bio.publie)
            .map((bio: any) => (
              <div className="bio-block" key={bio.id}>

                <h2>{bio.titre}</h2>

                <p>
                  {bio.contenu}
                </p>

                {bio.image && (
                  <img
                    src={bio.image}
                    alt={bio.titre}
                    className="bio-image"
                  />
                )}

              </div>
            ))
        )}

      </section>

    </main>
  );
}