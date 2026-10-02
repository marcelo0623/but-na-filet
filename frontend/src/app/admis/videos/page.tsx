"use client";

import { useEffect, useState } from "react";
import "./videos.css";

const API_URL = "http://127.0.0.1:8000/api/videos/";

type Video = {
  id: number;
  titre: string;
  description: string;
  url: string;
  miniature: string | null;
  date_publication: string;
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function chargerVideos() {
    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
      setMessage("Impossible de charger les vidéos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerVideos();
  }, []);

  function reinitialiserFormulaire() {
    setTitre("");
    setDescription("");
    setUrl("");
    setEditingId(null);
  }

  async function enregistrerVideo(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");

    const donnees = {
      titre,
      description,
      url,
    };

    try {
      const endpoint = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage(
        editingId
          ? "Vidéo modifiée avec succès."
          : "Vidéo ajoutée avec succès."
      );

      reinitialiserFormulaire();
      await chargerVideos();
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    }
  }

  function modifierVideo(video: Video) {
    setEditingId(video.id);
    setTitre(video.titre);
    setDescription(video.description || "");
    setUrl(video.url);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function supprimerVideo(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette vidéo ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage("Vidéo supprimée avec succès.");

      await chargerVideos();
    } catch (error) {
      console.error(error);
      setMessage("Impossible de supprimer cette vidéo.");
    }
  }

  return (
    <main className="admin-videos">

      <div className="videos-header">
        <div>
          <p className="admin-small-title">
            ADMINISTRATION
          </p>

          <h1>VIDÉOS</h1>

          <p>
            Gérez les clips et vidéos de But Na Filet.
          </p>
        </div>

        <a href="/admin" className="back-button">
          ← RETOUR
        </a>
      </div>

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      <section className="video-form-card">

        <div className="section-title">
          <div>
            <h2>
              {editingId
                ? "MODIFIER LA VIDÉO"
                : "AJOUTER UNE VIDÉO"}
            </h2>

            <p>
              {editingId
                ? "Modification d'une vidéo existante"
                : "Ajouter une nouvelle vidéo"}
            </p>
          </div>
        </div>

        <form onSubmit={enregistrerVideo}>

          <div className="form-grid">

            <div className="form-group">
              <label>Titre de la vidéo</label>

              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex : Libération"
                required
              />
            </div>

            <div className="form-group">
              <label>Lien YouTube</label>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

          </div>

          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Description de la vidéo..."
              rows={5}
            />
          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="save-button"
            >
              {editingId
                ? "✓ ENREGISTRER LES MODIFICATIONS"
                : "+ AJOUTER LA VIDÉO"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={reinitialiserFormulaire}
              >
                ANNULER
              </button>
            )}

          </div>

        </form>
      </section>

      <section className="video-list-section">

        <div className="section-title">
          <div>
            <h2>VIDÉOS ENREGISTRÉES</h2>

            <p>
              {videos.length} vidéo
              {videos.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-message">
            Chargement des vidéos...
          </div>
        ) : videos.length === 0 ? (
          <div className="empty-message">
            Aucune vidéo enregistrée pour le moment.
          </div>
        ) : (
          <div className="video-list">

            {videos.map((video) => (
              <article
                className="video-admin-card"
                key={video.id}
              >

                <div className="video-info">

                  <div className="video-number">
                    #{video.id}
                  </div>

                  <div>
                    <h3>{video.titre}</h3>

                    <p>
                      {video.description || "Aucune description"}
                    </p>

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube-link"
                    >
                      ▶ Voir sur YouTube
                    </a>
                  </div>

                </div>

                <div className="action-buttons">

                  <button
                    className="edit-button"
                    onClick={() =>
                      modifierVideo(video)
                    }
                  >
                    Modifier
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      supprimerVideo(video.id)
                    }
                  >
                    Supprimer
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}