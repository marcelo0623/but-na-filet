import "../home.css";

const galerie = [
  {
    id: 1,
    titre: "But Na Filet a bosolo tv ",
    image: "/images/ac.jpg",
  },
  {
    id: 2,
    titre: "Concert de But Na Filet",
    image: "/images/o.jpg",
  },
  {
    id: 3,
    titre: "But Na Filet",
    image: "/images/y.jpg",
  },
  {
    id: 4,
    titre: "Performance live",
    image: "/images/af.jpg",
  },
  {
    id: 5,
    titre: "But Na Filet",
    image: "/images/mr.jpg",
  },
  {
    id: 6,
    titre: "Concert",
    image: "/images/photo6.jpg",
  },
];

export default function GaleriePage() {
  return (
    <main className="galerie-page">

      <section className="galerie-header">
        <h1>GALERIE</h1>

        <p>
          Découvrez les moments, concerts et souvenirs de But Na Filet.
        </p>
      </section>

      <section className="galerie-content">

        <div className="galerie-title">
          <h2>MES PHOTOS</h2>
        </div>

        <div className="gallery-grid">

          {galerie.map((photo) => (
            <article
              key={photo.id}
              className="gallery-card"
            >
              <div className="gallery-image">

                <img
                  src={photo.image}
                  alt={photo.titre}
                />

              </div>

              <div className="gallery-info">
                <h3>{photo.titre}</h3>
              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}