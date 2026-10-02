import "../home.css";
import { getVideos } from "@/lib/api";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <main className="videos-page">

      {/* EN-TÊTE */}
      <section className="videos-header">
        <h1>VIDÉOS</h1>

        <p>
          Découvrez les clips, performances et vidéos de But Na Filet.
        </p>
      </section>

      {/* CONTENU */}
      <section className="videos-content">

        <div className="videos-title">
          <h2>MES VIDÉOS</h2>
        </div>

        {videos.length === 0 ? (
          <div className="video-empty">
            <p>Aucune vidéo disponible pour le moment.</p>
          </div>
        ) : (
          <div className="videos-grid">

            {videos.map((video: any) => (
              <article
                className="video-card"
                key={video.id}
              >

                <div className="video-image">

                  {video.miniature ? (
                    <img
                      src={video.miniature}
                      alt={video.titre}
                    />
                  ) : (
                    <img
                      src="/images/img.jpg"
                      alt={video.titre}
                    />
                  )}

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-button"
                  >
                    ▶
                  </a>

                </div>

                <div className="video-info">

                  <h3>{video.titre}</h3>

                  {video.description && (
                    <p>{video.description}</p>
                  )}

                  <span>
                    {new Date(video.date_publication).getFullYear()}
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